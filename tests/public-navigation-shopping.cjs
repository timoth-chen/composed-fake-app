const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const base=process.env.APP_URL||'http://127.0.0.1:4173';
const capture=process.env.CAPTURE_DIR||'.cache/qa/public-navigation-shopping';
fs.mkdirSync(capture,{recursive:true});
(async()=>{const browser=await chromium.launch({headless:true,channel:'chrome'});try{
 for(const viewport of [{width:1919,height:998},{width:1440,height:900},{width:768,height:1024},{width:390,height:844},{width:360,height:800}]){
  const page=await browser.newPage({viewport});const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto(base+'/?qa=public-navigation-shopping');await page.waitForSelector('[data-tab="Today"]');
  for(const tab of ['Today','Shopping']){await page.locator(`[data-tab="${tab}"]`).click();const back=page.locator('.demo-links').getByRole('link',{name:'Back to Composed',exact:true});const apply=page.locator('.demo-links').getByRole('link',{name:'Apply for the 14-day pilot',exact:true});assert.equal(await back.getAttribute('href'),'https://composed-landing-page.onrender.com/');assert.equal(await apply.getAttribute('href'),'https://composed-landing-page.onrender.com/?open=pilot');assert.ok(await back.isVisible());assert.ok(await apply.isVisible());}
  const layout=await page.evaluate(()=>{const box=selector=>{const r=document.querySelector(selector).getBoundingClientRect();return{x:r.x,y:r.y,right:r.right,bottom:r.bottom,width:r.width}};return{shell:box('.app-shell'),header:box('.app-shell>header'),back:box('.demo-links a:first-child'),apply:box('.demo-apply'),settings:box('.settings-menu>summary'),notice:box('.demo-context')}});
  assert.ok(layout.apply.x-layout.back.right>=8,'header actions have a readable gap');assert.ok(layout.settings.x-layout.apply.right>=8||layout.apply.y-layout.settings.bottom>=4,'pilot action is separated from Settings');assert.ok(layout.notice.x>=layout.shell.x+18-0.5,'notice has a left inset');assert.ok(layout.notice.right<=layout.shell.right-18+0.5,'notice has a right inset');assert.ok(layout.notice.width>0);assert.match(await page.locator('.demo-context').innerText(),/example clothing.*not your wardrobe/i);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);assert.deepEqual(errors,[]);await page.screenshot({path:path.join(capture,`${viewport.width}x${viewport.height}.png`),fullPage:true});await page.close();
 }
 const page=await browser.newPage({viewport:{width:1440,height:900}});await page.goto(base);await page.waitForSelector('[data-tab="Today"]');
 for(const [occasion, impression, heading] of [[0,'Confident','Everyday'],[3,'Polished','Work'],[2,'Confident','Date night']]){
  await page.locator(`input[name=occasion][value="${occasion}"]`).check();
  await page.locator(`input[name=impression][value="${impression}"]`).check();
  await page.locator('#lock-tomorrow').click();
  await page.locator('.stylist-pick').waitFor();
  assert.equal(await page.locator('.stylist-pick h2').innerText(),`${heading} outfit`);
  await page.locator('#change-choices').click();
 }
 await page.locator('[data-tab="Shopping"]').click();
 const chooseStyle=value=>page.evaluate(style=>saveMyStyle(style,true),value);
 await chooseStyle('East Asian Minimalist');
 for(const [index,owned,pair] of [
  [0,'Black bomber','Dark indigo straight jeans'],
  [1,'Olive cotton overshirt','Slate pleated trousers'],
  [2,'Stone straight trousers','Black leather loafers'],
 ]){
  await page.locator(`[data-purchase="${index}"]`).click();
  assert.ok((await page.locator('.shop-advice').innerText()).includes(pair));
  await page.locator('#shop-alternative').click();
  assert.equal(await page.locator('.shop-photo figcaption').innerText(),owned);
  await page.locator('#shop-result').click();
  await page.locator('#shop-back').click();
 }
 const tiers={
  'East Asian Minimalist':[89,92,70,85],
  Workwear:[72,92,70,41],
  Streetwear:[89,73,48,85],
  Minimalist:[89,92,70,85],
  Classic:[43,73,87,69],
  'Smart Casual':[43,46,87,41],
 };
 for(const [style,scores] of Object.entries(tiers)){
  await chooseStyle(style);
  for(const [index,score] of scores.entries()){
   await page.locator(`[data-purchase="${index}"]`).click();
   assert.equal(await page.getByRole('meter').getAttribute('aria-valuenow'),String(score));
   await page.locator('#shop-back').click();
  }
 }
 for(const [style, score, title, reason] of [
  ['Workwear',41,'Why I’d pass',/sturdy finish.*White leather sneakers/],
  ['Smart Casual',41,'Why I’d pass',/polished smart-casual/],
  ['East Asian Minimalist',85,'Why it works',/Stone suede loafers.*White leather sneakers/],
 ]){
  await chooseStyle(style);
  await page.locator('[data-purchase="3"]').click();
  assert.equal(await page.getByRole('meter').getAttribute('aria-valuenow'),String(score));
  const advice=page.locator('.shop-advice > div').filter({has:page.getByText(title,{exact:true})});
  assert.match(await advice.locator('dd').innerText(),reason);
  await page.locator('#shop-back').click();
 }
 const inspect=async style=>{await chooseStyle(style);const rows=[];for(let i=0;i<4;i++){await page.locator(`[data-purchase="${i}"]`).click();rows.push({name:await page.locator('.shop-product h3').innerText(),verdict:await page.locator('.shop-verdict h2').innerText(),score:(await page.locator('.shop-score').innerText()).match(/\d+% · (?:Strong|Moderate|Weak)/)?.[0]||null,reason:await page.locator('.shop-verdict p').last().innerText()});await page.locator('#shop-back').click();}return rows;};
 const none=await inspect('No preference'),eastAsian=await inspect('East Asian Minimalist');assert.deepEqual(none.map(x=>x.verdict),['I’d skip it','I’d skip it','I’d skip it','Worth trying on']);assert.ok(none.every(x=>x.score===null));assert.deepEqual(eastAsian.map(x=>x.score),['89% · Strong','92% · Strong','70% · Moderate','85% · Strong']);assert.deepEqual(eastAsian.map(x=>x.verdict),['I’d skip it','I’d skip it','I’d skip it','Worth trying on']);fs.writeFileSync(path.join(capture,'shopping-matrix.json'),JSON.stringify({none,eastAsian},null,2)+'\n');await page.screenshot({path:path.join(capture,'shopping-east-asian.png'),fullPage:true});await page.close();console.log(`PASS ${base}: separated public navigation and inset notice at five viewports; Shopping verdicts remain preference- and wardrobe-dependent.`);
}finally{await browser.close();}})().catch(error=>{console.error(error);process.exitCode=1});
