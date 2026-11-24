const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const base=process.env.APP_URL||'http://127.0.0.1:4173';
const capture=process.env.CAPTURE_DIR||'.cache/qa/public-navigation-shopping';
fs.mkdirSync(capture,{recursive:true});
(async()=>{const browser=await chromium.launch({headless:true,channel:'chrome'});try{
 for(const viewport of [{width:1440,height:900},{width:390,height:844},{width:360,height:800}]){
  const page=await browser.newPage({viewport});const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto(base+'/?qa=public-navigation-shopping');await page.waitForSelector('[data-tab="Today"]');
  for(const tab of ['Today','Shopping']){await page.locator(`[data-tab="${tab}"]`).click();const back=page.locator('.demo-links').getByRole('link',{name:'Back to Composed',exact:true});const apply=page.locator('.demo-links').getByRole('link',{name:'Apply for the 14-day pilot',exact:true});assert.equal(await back.getAttribute('href'),'https://composed-landing-page.onrender.com/');assert.equal(await apply.getAttribute('href'),'https://composed-landing-page.onrender.com/?open=pilot');assert.ok(await back.isVisible());assert.ok(await apply.isVisible());}
  assert.match(await page.locator('.demo-context').innerText(),/example clothing.*not your wardrobe/i);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);assert.deepEqual(errors,[]);await page.screenshot({path:path.join(capture,`${viewport.width}x${viewport.height}.png`),fullPage:true});await page.close();
 }
 const page=await browser.newPage({viewport:{width:1440,height:900}});await page.goto(base);await page.waitForSelector('[data-tab="Today"]');await page.locator('[data-tab="Shopping"]').click();
 const chooseStyle=value=>page.evaluate(style=>saveMyStyle(style,true),value);
 const inspect=async style=>{await chooseStyle(style);const rows=[];for(let i=0;i<4;i++){await page.locator(`[data-purchase="${i}"]`).click();rows.push({name:await page.locator('.shop-product h3').innerText(),verdict:await page.locator('.shop-verdict h2').innerText(),score:(await page.locator('.shop-score').innerText()).match(/\d+% · (?:Strong|Moderate|Weak)/)?.[0]||null,reason:await page.locator('.shop-verdict p').last().innerText()});await page.locator('#shop-back').click();}return rows;};
 const none=await inspect('No preference'),eastAsian=await inspect('East Asian Minimalist');assert.deepEqual(none.map(x=>x.verdict),['I’d skip it','I’d skip it','I’d skip it','Worth trying on']);assert.ok(none.every(x=>x.score===null));assert.deepEqual(eastAsian.map(x=>x.score),['89% · Strong','92% · Strong','70% · Moderate','85% · Strong']);assert.deepEqual(eastAsian.map(x=>x.verdict),['I’d skip it','I’d skip it','I’d skip it','Worth trying on']);fs.writeFileSync(path.join(capture,'shopping-matrix.json'),JSON.stringify({none,eastAsian},null,2)+'\n');await page.screenshot({path:path.join(capture,'shopping-east-asian.png'),fullPage:true});await page.close();console.log(`PASS ${base}: return links on Today/Shopping at three viewports; Shopping verdicts remain preference- and wardrobe-dependent.`);
}finally{await browser.close();}})().catch(error=>{console.error(error);process.exitCode=1});
