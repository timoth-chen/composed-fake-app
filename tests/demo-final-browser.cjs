const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

const personal = process.env.DEMO === 'personal';
const url = process.env.APP_URL || (personal?'http://localhost:8000/?wardrobe=timothy':'http://localhost:4173');
const capture = process.env.CAPTURE_DIR;
const label = personal ? 'personal' : 'public';

async function run(browser, width) {
 const page = await browser.newPage({viewport:{width,height:844}, hasTouch:true});
 const errors = [];
 const failed = [];
 page.on('pageerror', error=>errors.push(error.message));
 page.on('response', response=>{
  if (new URL(response.url()).origin===new URL(url).origin && response.status()>=400) failed.push(response.url());
 });
 const at = selector=>page.locator(selector);
 const tab = name=>at(`[data-tab="${name}"]`).click();
 const shot = async (name, target)=>{
  if (!capture) return;
  if (target) await at(target).scrollIntoViewIfNeeded();
  await at('#toast.show').waitFor({state:'detached'});
  await page.screenshot({path:path.join(capture,`${label}-${width}-${name}.png`), animations:'disabled'});
 };
 const checkLayout = async ()=>{
  assert.equal(await page.evaluate(()=>{
   const screen=document.querySelector('#screen');
   return document.documentElement.scrollWidth<=innerWidth && screen.scrollWidth<=screen.clientWidth;
  }),true,'only the rack scrolls horizontally');
 };
 const choose = async timing=>{
  await at(`[data-timing="${timing}"]`).click();
  await at('#occasion').selectOption('2');
  await at('#energy').selectOption('Polished');
 };
 try {
  await page.goto(url);
  await at('.stylist-intake').waitFor();
  await at('#record-mode').click();
  assert.equal(await at('body').evaluate(e=>e.classList.contains('record-mode')),true);
  assert.equal(await at('.app-shell footer').isVisible(),false);
  await at('#record-mode').click();
  await checkLayout();
  await shot('01-today');
  await choose('now');
  await shot('02-choices');
  await at('#lock-tomorrow').click();
  await at('#model-viewer').waitFor();
  await checkLayout();
  assert.match(await at('.pick-context').innerText(),/Date night · Polished/);
  assert.equal(await at('.outfit-piece-thumb').count()>2,true);
  if (personal) {
   const image = at('[data-frame="0"]');
   assert.match(await image.getAttribute('src'),/barbour-front\.png$/);
   assert.deepEqual(await at('.outfit-piece-thumb span').allTextContents(),[
    'Dark-green plaid Barbour jacket','Dark navy button-down shirt','Black wide trousers','Onitsuka Tiger cream / navy',
   ]);
  } else {
   assert.equal(await at('.model-turn-sheet').count(),1);
   assert.equal((await page.content()).includes('wardrobe-timothy'),false);
  }
  const turns = await at('#model-viewer img').evaluateAll(images=>images.every(img=>img.complete&&img.naturalWidth>0));
  assert.equal(turns,true);
  await shot('03-front');
  const model = at('#model-viewer');
  const dimensions = await model.boundingBox();
  for (const [i,angle] of ['Right side','Back','Left side','Front'].entries()) {
   await at('#model-next').click();
   assert.match(await model.getAttribute('aria-valuetext'),new RegExp('^'+angle));
   assert.equal((await model.boundingBox()).height,dimensions.height);
   if (personal) assert.equal(await at(`[data-frame="${(i+1)%4}"]`).isVisible(),true);
   if (i<3 && width===390) await shot('04-angle-'+(i+1));
  }
  await model.focus();
  await page.keyboard.press('ArrowLeft');
  assert.match(await model.getAttribute('aria-valuetext'),/^Left side/);
  await page.keyboard.press('Home');
  const box = await model.boundingBox();
  await page.mouse.move(box.x+box.width/2,box.y+80);
  await page.mouse.down();
  await page.mouse.move(box.x+box.width/2-52,box.y+80,{steps:5});
  await page.mouse.up();
  assert.match(await model.getAttribute('aria-valuetext'),/^Right side/);
  await page.keyboard.press('Home');
  const cdp = await page.context().newCDPSession(page);
  const touch = (type, touchPoints)=>cdp.send('Input.dispatchTouchEvent',{type,touchPoints});
  const start = {x:box.x+box.width/2,y:box.y+100};
  await touch('touchStart',[start]);
  await touch('touchMove',[{x:start.x-48,y:start.y}]);
  await touch('touchEnd',[]);
  assert.match(await model.getAttribute('aria-valuetext'),/^Right side/);
  assert.match(await at('.daily-why').innerText(),/Why I picked this for you/);
  assert.match(await at('.daily-wear').innerText(),personal?/Leave the jacket open/:/Wear it like this/);
  await shot('05-wardrobe-pieces','.outfit-piece-strip');
  await shot('06-nigel-and-wear','.daily-wear');
  assert.equal(await at('[data-log]').count(),0);
  await at('#accept-outfit').click();
  await at('[data-log="wore"]').waitFor();
  await shot('07-accepted','.pick-actions');
  await tab('Log');
  assert.match(await at('#screen').innerText(),/WORE IT · 0/i);
  await tab('Today');
  await at('[data-log="skipped"]').click();
  await at('#skip-reason').selectOption('Plans changed');
  await tab('Log');
  assert.match(await at('#screen').innerText(),/Plans changed/);
  await tab('Today');
  await at('[data-log="wore"]').click();
  await at('[data-log="wore"][aria-pressed="true"]').waitFor();
  const beforeName = await at('.outfit-piece-thumb span').first().innerText();
  await at('#save-recommendation').click();
  await at('#save-recommendation:disabled').waitFor();
  await tab('Log');
  assert.match(await at('#screen').innerText(),/WORE IT · 1/i);
  assert.ok((await at('.log-collection').first().innerText()).includes(beforeName));
  await shot('log');
  await tab('Today');
  const before = await at('.outfit-piece-thumb span').allTextContents();
  await at('#another-outfit').click();
  await page.waitForFunction(previous=>Array.from(document.querySelectorAll('.outfit-piece-thumb span'),e=>e.textContent).join()!==previous,before.join());
  assert.match(await model.getAttribute('aria-valuetext'),/^Front/);
  assert.match(await at('.pick-context').innerText(),/Date night · Polished/);
  await tab('Wardrobe');
  assert.equal(await at('.shoe-drawer').count(),1);
  assert.equal(await at('.hanger-button.face').count(),0);
  const garments = at('.hanger-button');
  assert.deepEqual(await at('.rail-group-label').allTextContents(),['tops','layers','bottoms']);
  await checkLayout();
  await shot('wardrobe-side');
  await garments.first().hover();
  assert.equal(await garments.first().evaluate(e=>e.classList.contains('face')),true);
  await at('#theme-mobile').hover();
  assert.equal(await at('.hanger-button.face').count(),0);
  await garments.first().tap();
  assert.equal(await garments.first().getAttribute('aria-pressed'),'true');
  await shot('wardrobe-front','#rail-caption');
  await at('#rail-edit').click();
  await at('#piece-editor').waitFor();
  await at('#cancel-editor').click();
  await tab('Shopping');
  for (const i of [0,1,2]) {
   await at(`[data-purchase="${i}"]`).click();
   await at(`[data-purchase="${i}"][aria-pressed="true"]`).waitFor();
  }
  await checkLayout();
  await shot('shopping');
  await at('#theme-mobile').click();
  assert.equal(await at('body').evaluate(e=>e.classList.contains('dark')),true);
  await shot('shopping-dark');
  await tab('Today');
  await at('#change-choices').click();
  await choose('tomorrow');
  await at('#lock-tomorrow').click();
  await at('#accept-outfit').click();
  await at('#wear-plan').waitFor();
  await page.reload();
  await at('#wear-plan').waitFor();
  assert.match(await at('.pick-context').innerText(),/Tomorrow/);
  assert.equal(await at('[data-log]').count(),0);
  await at('#theme-mobile').click();
  await shot('planned-dark');
  await at('#wear-plan').click();
  await at('[data-log="wore"]').waitFor();
  await at('#refine-pick').click();
  assert.match(await at('.builder').innerText(),/Clothing-only preview/);
  assert.equal(await at('#model-viewer').count(),0);
  const oldShoes = await at('.builder [data-piece-category="shoes"] span').innerText();
  await at('[data-filter="Shoes"]').click();
  for (const shoe of await at('.item button[data-piece]').all()) {
   if ((await shoe.innerText()).includes(oldShoes)) continue;
   await shoe.click();
   break;
  }
  assert.notEqual(await at('.builder [data-piece-category="shoes"] span').innerText(),oldShoes);
  await at('#critique').click();
  assert.match(await at('.nigel-critique').innerText(),/Sample feedback/);
  await shot('refinement','.builder');
  if (personal && width===390) {
   await tab('Today');
   for (const [occasion,impression,outfit] of [['0','Confident','henley'],['1','Relaxed','stussy']]) {
    await at('#change-choices').click();
    await at('#occasion').selectOption(occasion);
    await at('#energy').selectOption(impression);
    await at('#lock-tomorrow').click();
    await at('[data-frame="0"][src*="'+outfit+'"]').waitFor();
    assert.equal(await at('[data-frame]').evaluateAll(frames=>frames.length===4&&frames.every(img=>img.naturalWidth===1086&&img.naturalHeight===1448)),true);
    await shot('extra-'+outfit);
   }
  }
  assert.deepEqual(errors,[]);
  assert.deepEqual(failed,[]);
  console.log(`PASS ${label}, ${width}px: intake, image decoding, rotation via arrow, keyboard, drag and touch, synced alternate, acceptance, feedback, saved outfits, rack, Shopping, theme and persisted plan`);
 } finally {
  await page.close();
 }
}

(async()=>{
 if (capture) fs.mkdirSync(capture,{recursive:true});
 const browser=await chromium.launch({channel:'chrome',headless:true});
 try {
  for (const width of [375,390,430,1280]) await run(browser,width);
 } finally {
  await browser.close();
 }
})().catch(error=>{console.error(error);process.exitCode=1;});
