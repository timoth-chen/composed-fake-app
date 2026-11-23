const assert = require('node:assert/strict');
const path = require('node:path');
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

const site = 'http://composed.test';
const personal=process.env.DEMO!=='public';
const capture = process.env.CAPTURE_DIR;
const delay = ms => new Promise(resolve=>setTimeout(resolve,ms));

async function exercise(browser,width) {
 const page=await browser.newPage({viewport:{width,height:844},hasTouch:true,acceptDownloads:true});
 const errors=[];
 page.on('pageerror',error=>errors.push(error.message));
 page.on('response',response=>{if(response.status()>=400)errors.push(response.url());});
 await page.route(site+'/**',async route=>{
  const file=new URL(route.request().url()).pathname;
  if(file.includes('/rotation/'))await delay(file.endsWith('.png')?300:140);
  await route.fulfill({path:path.resolve(personal?'timothy-dist':'dist','.'+(file==='/'?'/index.html':file))});
 });
 const at=selector=>page.locator(selector);
 const tab=name=>at(`[data-tab="${name}"]`).click();
 const shot=async name=>{if(capture)await page.screenshot({path:path.join(capture,`after-${width}-${name}.png`),animations:'disabled'});};
 const pick=async (occasion,impression)=>{
  await at(`[name=occasion][value="${occasion}"]`).check();
  await at(`[name=impression][value="${impression}"]`).check();
  await at('#lock-tomorrow').click();
  await at('#model-viewer').waitFor();
 };
 const front=()=>at(personal?'[data-frame="0"]':'.model-turn-sheet').getAttribute('src');
 const settings=async()=>{if(!await at('.settings-menu').evaluate(x=>x.open))await at('.settings-menu summary').click();};
 try {
  await page.goto(site);
  await at('#outfit-intake').waitFor();
  await shot('today');
  assert.equal(await at('[data-timing=now]').getAttribute('aria-pressed'),'true');
  await pick(2,'Polished');
  assert.match(await front(),personal?/barbour-front/:/^assets\//);
  if(personal)assert.deepEqual(await at('.outfit-piece-thumb span').allTextContents(),['Navy shirt','Barbour','Black trousers','Tigers']);
  await shot('pick');
  const viewer=at('#model-viewer');
  const angle=()=>at('#model-turn-hint').innerText();
  const checkFrame=async()=>assert.equal(await at(personal?'[data-frame]:visible':'.model-turn-sheet:visible').count(),1);
  for(const text of ['Right side','Back','Left side','Front']){
   await at('#model-next').click();
   assert.equal(await angle(),text+' · Four views');
   await checkFrame();
  }
  await viewer.scrollIntoViewIfNeeded();
  const box=await viewer.boundingBox();
  for(const [from,to] of [[25,box.width-25],[box.width-25,25]]){
   await page.mouse.move(box.x+from,box.y+80);
   await page.mouse.down();
   await page.mouse.move(box.x+to,box.y+80,{steps:10});
   await page.mouse.up();
   await checkFrame();
   assert.doesNotMatch(await angle(),/undefined/);
  }
  await viewer.focus();
  await page.keyboard.press('Home');
  const cdp=await page.context().newCDPSession(page);
  const point={x:box.x+box.width/2,y:box.y+90};
  await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[point]});
  await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{...point,x:point.x-60}]});
  await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
  assert.match(await angle(),/Right side/);
  await at('.daily-why').scrollIntoViewIfNeeded();
  await shot('nigel-and-wear');
  await at('#accept-outfit').click();
  await at('[data-log=wore]').click();
  await at('#toast').waitFor();
  assert.match(await at('#toast').innerText(),/Added to your wear log/);
  await at('#toast').waitFor({state:'hidden',timeout:3500});
  await at('#save-recommendation').click();
  await at('#toast-dismiss').click();
  await at('#toast').waitFor({state:'hidden'});
  await at('#another-outfit').scrollIntoViewIfNeeded();
  const scrollTop=await at('#screen').evaluate(screen=>screen.scrollTop);
  const scrollSamples=await at('#another-outfit').evaluate(async button=>{
   const screen=document.querySelector('#screen');
   for(let i=0;i<8;i++)button.click();
   await new Promise(requestAnimationFrame);
   return screen.scrollTop;
  });
  assert.ok(scrollSamples>=scrollTop-120,'alternate does not scroll to the top');
  await page.waitForFunction(()=>document.querySelector('#another-outfit')?.textContent==='See previous pick');
  if(personal)assert.match(await front(),/henley/);
  assert.match(await at('.pick-context').innerText(),/Date night · Polished/);
  assert.equal(await at('#another-outfit').isEnabled(),true);
  await at('#refine-pick').click();
  await at('#save-fit').click();
  await at('[data-filter=Tops]').click();
  await at('.list-display [data-piece]').first().click();
  await tab('Log');
  const fit=at('.log-collection').filter({has:at('h3').getByText('Saved fits',{exact:true})});
  assert.match(await fit.innerText(),personal?/Cream textured henley/:/·/);
  assert.doesNotMatch(await fit.innerText(),/Stüssy/);
  await page.reload();
  await tab('Log');
  assert.match(await at('#screen').innerText(),/WORE IT · 1/i);
  assert.match(await fit.innerText(),personal?/Cream textured henley/:/·/);
  await tab('Today');
  await at('[data-timing=soon]').click();
  for(const date of ['2099-04-10','2099-04-15']){
   if(!await at('#plan-date').count())await at('[name=day][value=other]').check();
   await at('#plan-date').fill(date);
   await pick(2,'Polished');
   assert.match(await at('.pick-context').innerText(),new RegExp(date.endsWith('10')?'Apr 10':'Apr 15'));
   await at('#accept-outfit').click();
   assert.equal(await at('[data-log]').count(),0);
   assert.equal(await at('#wear-plan').count(),0);
   await at('#change-choices').click();
  }
  await tab('Log');
  assert.equal(await at('[data-plan-date]').count(),2);
  await at('[data-plan-date="2099-04-10"]').click();
  await viewer.waitFor();
  assert.match(await at('.pick-confirmation').innerText(),/Outfit planned/);
  await tab('Wardrobe');
  await at('.hanger-button').first().tap();
  await at('#rail-like').click();
  assert.match(await at('#toast').innerText(),/Added to favourites/);
  await at('#toast-dismiss').click();
  await shot('wardrobe');
  await tab('Shopping');
  assert.match(await at('#screen').innerText(),/Should I get this/);
  await settings();
  await at('#theme-mobile').click();
  assert.equal(await at('body').evaluate(x=>x.classList.contains('dark')),true);
  await at('.settings-menu summary').click();
  await shot('shopping-dark');
  await settings();
  const download=page.waitForEvent('download');
  await at('#settings-export').click();
  const file=await download;
  assert.equal(file.suggestedFilename(),'composed-wardrobe.json');
  const data=JSON.parse(require('node:fs').readFileSync(await file.path(),'utf8'));
  assert.equal(data.schemaVersion,1);
  assert.equal(data.pieces.length,personal?12:21);
  assert.match(await at('#toast').innerText(),/Wardrobe export started/);
  await at('#toast-dismiss').click();
  await at('#record-mode').click();
  assert.equal(await at('body').evaluate(x=>x.classList.contains('record-mode')),true);
  await settings();
  await at('#reset-demo').click();
  assert.equal(await at('#outfit-intake').count(),1);
  await pick(2,'Polished');
  assert.equal(await at('#accept-outfit').isEnabled(),true);
  await at('#accept-outfit').click();
  await at('[data-log=skipped]').click();
  await settings();
  await at('#record-mode').click();
  await tab('Log');
  assert.match(await at('#screen').innerText(),/WORE IT · 1/i);
  assert.match(await at('#screen').innerText(),/DIDN’T WEAR IT · 0/i);
  await tab('Today');
  await at('#change-choices').click();
  await pick(1,'Relaxed');
  if(personal){
   assert.match(await front(),/stussy/);
   assert.match(await at('.photo-note').innerText(),/white undershirt/);
  }
  await at('#change-choices').click();
  await pick(3,'Polished');
  assert.match(await at('.pick-context').innerText(),/Work · Polished/);
  assert.match(await at('.daily-why').innerText(),/office dress code/);
  assert.equal(await at('#another-outfit').isDisabled(),true);
  assert.match(await front(),personal?/barbour-front/:/turn-date/);
  await shot('casual');
  await page.reload();
  assert.equal(await at('body').evaluate(x=>x.classList.contains('dark')),true);
  await tab('Log');
  assert.equal(await at('[data-plan-date]').count(),2);
  assert.match(await at('#screen').innerText(),/Liked garments/);
  if(width===390){
   await page.evaluate(key=>localStorage.setItem(key+'.planned-outfit',JSON.stringify({occasion:2,energy:'Polished',alternate:false})),personal?'composed.private.timothy.v1':'composed.wardrobe.v1');
   await page.reload();
   await tab('Log');
   await at('#recover-plan').click();
   assert.equal(await at('#plan-date').inputValue(),'');
   await at('#plan-date').fill('2099-05-02');
   await at('#lock-tomorrow').click();
   await at('#accept-outfit').click();
   await tab('Log');
   assert.equal(await at('#recover-plan').count(),0);
   assert.equal(await at('[data-plan-date="2099-05-02"]').count(),1);
  }
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
  assert.deepEqual(errors,[]);
  console.log(`PASS ${personal?'personal':'public'} ${width}px`);
 } finally {await page.close();}
}
(async()=>{
 const browser=await chromium.launch({channel:'chrome'});
 try {for(const width of [375,390,430,1280])await exercise(browser,width);}
 finally {await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
