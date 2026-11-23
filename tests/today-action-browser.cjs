const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const personal=process.env.DEMO!=='public';
const url=process.env.APP_URL||'http://composed.test';
const root=path.resolve(personal?'timothy-dist':'dist');
const captures=process.env.CAPTURE_DIR;

async function check(browser,width,height){
 const page=await browser.newPage({viewport:{width,height},hasTouch:true,reducedMotion:'reduce',timezoneId:'America/Toronto'});
 const errors=[];
 page.on('pageerror',error=>errors.push(error.message));
 page.on('response',response=>{if(response.status()>=400)errors.push(response.url());});
 if(!process.env.APP_URL)await page.route(url+'/**',route=>{
  const pathname=new URL(route.request().url()).pathname;
  return route.fulfill({path:path.join(root,pathname==='/'?'index.html':pathname)});
 });
 const at=selector=>page.locator(selector);
 const tab=name=>at(`[data-tab="${name}"]`).click();
 const shot=async name=>{
  if(!captures||![320,390].includes(width))return;
  await at('#screen img').evaluateAll(imgs=>Promise.all(imgs.map(img=>img.decode())));
  await page.screenshot({path:path.join(captures,`${personal?'personal':'public'}-${width}-${name}.png`),animations:'disabled'});
 };
 const visibleAction=async selector=>{
  const [button,screen]=await Promise.all([at(selector).boundingBox(),at('#screen').boundingBox()]);
  assert.ok(button&&button.y>=screen.y&&button.y+button.height<=screen.y+screen.height,`action at ${button?.y}, screen ends at ${screen.y+screen.height}`);
 };
 try{
  await page.goto(url);
  assert.match(await at('.stylist-intake h2').innerText(),/What are we dressing for/);
  await shot('today');
  await at('#lock-tomorrow').click();
  await at('#model-viewer').waitFor();
  await visibleAction('#accept-outfit');
  await shot('recommendation');
  const photo=at(personal?'[data-frame="0"]':'.model-turn-sheet');
  const initial=await photo.getAttribute('src');
  assert.match(initial,personal?/wardrobe-timothy/:/^assets\//);
  await at('#model-next').click();
  assert.equal(await at('#model-viewer').getAttribute('aria-valuenow'),'90');
  await at('#model-viewer').focus();
  await page.keyboard.press('End');
  assert.equal(await at('#model-viewer').getAttribute('aria-valuenow'),'270');
  await page.keyboard.press('Home');
  assert.equal(await at('#model-viewer').getAttribute('aria-valuenow'),'0');
  await at('#screen').evaluate(screen=>screen.scrollTop=0);
  const accept=await at('#accept-outfit').boundingBox();
  await page.mouse.click(accept.x+accept.width/2,accept.y+accept.height/2);
  await page.getByRole('button',{name:'Mark as worn',exact:true}).waitFor();
  assert.equal(await at('#screen').evaluate(screen=>screen.scrollTop),0);
  await visibleAction('[data-log=wore]');
  await shot('accepted');
  if(width===320){
   await at('#screen').evaluate(screen=>screen.scrollTop=screen.scrollHeight);
   await at('.pick-primary-docked[data-log=wore]').waitFor();
   assert.equal(await at('[data-log=wore]').count(),1);
   const [pinned,screen,nav]=await Promise.all([at('#today-primary-dock').boundingBox(),at('#screen').boundingBox(),at('#tabs').boundingBox()]);
   assert.ok(pinned.y>=screen.y+screen.height-1 && pinned.y+pinned.height<=nav.y+1);
   await at('#screen').evaluate(screen=>screen.scrollTop=0);
   await at('[data-log=wore]:not(.pick-primary-docked)').waitFor();
  }
  assert.equal(await at('#undo-wear').count(),0);
  await tab('Log');
  assert.match(await at('#screen').innerText(),/WORE IT · 0/i);
  await tab('Today');
  await visibleAction('[data-log=wore]');
  await at('[data-log=wore]').click();
  await at('#undo-wear').click();
  await tab('Log');
  assert.match(await at('#screen').innerText(),/WORE IT · 0/i);
  await tab('Today');
  await at('[data-log=wore]').click();
  await at('[data-log=skipped]').click();
  await at('#skip-reason').selectOption('Plans changed');
  await at('#undo-wear').click();
  await tab('Log');
  assert.match(await at('#screen').innerText(),/WORE IT · 1/i);
  assert.match(await at('#screen').innerText(),/DIDN’T WEAR IT · 0/i);
  await tab('Today');
  await at('#another-outfit').click();
  await page.getByRole('button',{name:'See previous pick'}).waitFor();
  assert.notEqual(await photo.getAttribute('src'),initial);
  await at('#change-choices').click();
  await at('[data-timing=soon]').click();
  assert.match(await at('input[value=tomorrow]+span').innerText(),/Tomorrow/);
  await at('#lock-tomorrow').click();
  await at('#accept-outfit').click();
  assert.equal(await at('[data-log]').count(),0);
  await at('#view-plan-log').click();
  assert.equal(await at('[data-plan-date]').count(),1);
  await page.reload();
  await tab('Log');
  assert.match(await at('#screen').innerText(),/WORE IT · 1/i);
  assert.equal(await at('[data-plan-date]').count(),1);
  await at('.settings-menu summary').click();
  await at('#theme-mobile').click();
  await at('#my-style').selectOption('Classic');
  await page.keyboard.press('Escape');
  await tab('Today');
  assert.match(await at('.today-style-summary').innerText(),/Classic/);
  await at('#edit-today-style').click();
  assert.equal(await at('#my-style').evaluate(el=>document.activeElement===el),true);
  await page.keyboard.press('Escape');
  assert.equal(await at('body').evaluate(el=>el.classList.contains('dark')),true);
  await shot('today-dark');
  await at('.settings-menu summary').click();
  await at('#theme-mobile').click();
  await page.keyboard.press('Escape');
  await shot('today-style');
  await at('.settings-menu summary').click();
  await at('#theme-mobile').click();
  await page.keyboard.press('Escape');
  await at('[name=occasion][value="1"]').check();
  await at('#lock-tomorrow').click();
  await at('#model-viewer').waitFor();
  const [action,screen]=await Promise.all([at('#accept-outfit').boundingBox(),at('#screen').boundingBox()]);
  assert.ok(action.y+action.height<=screen.y+screen.height+90,'long titles require at most a short scroll');
  await at('#accept-outfit').scrollIntoViewIfNeeded();
  if(!await at('.pick-primary-docked').count())await visibleAction('#accept-outfit');
  await shot('recommendation-dark');
  assert.deepEqual(errors,[]);
  console.log(`PASS ${personal?'personal':'public'} ${width}×${height}, visible actions, acceptance, correction, plans and persistence`);
 }finally{await page.close();}
}
(async()=>{
 if(captures)fs.mkdirSync(captures,{recursive:true});
 const browser=await chromium.launch({channel:'chrome'});
 try{
  for(const [width,height] of [[320,568],[375,667],[390,844],[402,874],[768,1024],[1280,900]])await check(browser,width,height);
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
