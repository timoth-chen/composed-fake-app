const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

const personal = process.env.DEMO !== 'public';
const root = path.resolve(personal ? 'timothy-dist' : 'dist');
const site = process.env.APP_URL || 'http://composed.test';
const capture = process.env.CAPTURE_DIR;

async function exercise(browser, width, height) {
 const page = await browser.newPage({viewport:{width,height},timezoneId:'America/Toronto'});
 page.setDefaultTimeout(7000);
 const errors = [];
 const failed = [];
 page.on('pageerror',error=>errors.push(error.message));
 page.on('response',response=>{if(response.status()>=400)failed.push(response.url());});
 if(!process.env.APP_URL)await page.route(site+'/**',route=>{
  const pathname=new URL(route.request().url()).pathname;
  return route.fulfill({path:path.join(root,pathname==='/'?'index.html':pathname)});
 });
 const at=selector=>page.locator(selector);
 const choose=(name,value)=>at(`input[name="${name}"][value="${value}"]`).check();
 const shot=async(name)=>{if(capture)await page.screenshot({path:path.join(capture,`${personal?'personal':'public'}-${width}-${name}.png`),animations:'disabled'});};
 const leapCases=[
  ['2026-01-31T23:59:59-05:00','Feb 1, 2026'],
  ['2026-02-01T00:00:01-05:00','Feb 2, 2026'],
  ['2026-12-31T23:59:59-05:00','Jan 1, 2027'],
  ['2026-03-07T23:59:59-05:00','Mar 8, 2026'],
  ['2026-11-01T00:00:01-04:00','Nov 2, 2026'],
 ];
 try {
  if(width===390){
   for(const [instant,expected] of leapCases){
    await page.clock.setFixedTime(new Date(instant));
    await page.goto(site);
    await at('[data-timing=soon]').click();
    assert.equal(await at('#plan-date').count(),0);
    assert.match(await at('input[value=tomorrow] + span').innerText(),new RegExp(expected));
   }
  }
  await page.clock.setFixedTime(new Date('2026-11-22T12:00:00-05:00'));
  await page.goto(site);
  const settings=at('.settings-menu summary');
  assert.equal(await at('[data-timing=now]').getAttribute('aria-pressed'),'true');
  assert.deepEqual(await at('input[name=impression]').evaluateAll(nodes=>nodes.map(node=>node.value)),['Confident','Relaxed','Polished']);
  assert.equal(await at('input[name=occasion]').count(),4);
  const rows=await at('.occasion-chips label').evaluateAll(labels=>labels.map(el=>el.getBoundingClientRect().top));
  assert.ok(Math.abs(rows[0]-rows[1])<2&&Math.abs(rows[2]-rows[3])<2&&rows[2]>rows[0]);
  await at('input[name=occasion]:checked').focus();
  await page.keyboard.press('ArrowRight');
  assert.equal(await at('input[name=occasion]:checked').inputValue(),'1');
  await at('#more-impressions').focus();
  await page.keyboard.press('Enter');
  await choose('impression','Approachable');
  await at('#more-impressions').click();
  assert.equal(await at('#more-impressions').getAttribute('aria-expanded'),'false');
  assert.equal(await at('input[name=impression]:checked').inputValue(),'Approachable');
  assert.equal(await at('#extra-impressions').isVisible(),false);
  await choose('impression','Confident');
  await choose('occasion','0');
  await at('#screen').evaluate(el=>el.scrollTop=0);
  await shot('today-light');
  await at('#lock-tomorrow').click();
  await at('#model-viewer').waitFor();
  const model=at(personal?'[data-frame="0"]':'.model-turn-sheet');
  const before=await model.getAttribute('src');
  assert.match(before,personal?/wardrobe-timothy/:/^assets\//);
  await settings.focus();
  await page.keyboard.press('Enter');
  assert.equal(await settings.getAttribute('aria-expanded'),'true');
  await at('#my-style').selectOption('Streetwear');
  await shot('my-style-light');
  await page.keyboard.press('Escape');
  await at('.settings-menu:not([open])').waitFor();
  assert.equal(await settings.getAttribute('aria-expanded'),'false');
  assert.equal(await settings.evaluate(el=>el===document.activeElement),true);
  assert.equal(await model.getAttribute('src'),before);
  await at('#change-choices').click();
  await at('#lock-tomorrow').click();
  await at('#model-viewer').waitFor();
  if(personal){
   assert.match(before,/henley/);
   assert.match(await model.getAttribute('src'),/stussy/);
   assert.match(await at('.daily-why').innerText(),/Streetwear preference/);
  }
  await at('[data-tab=Shopping]').click();
  await at(`[data-purchase="${personal?3:0}"]`).click();
  assert.match(await at('.shop-flow').innerText(),new RegExp('Streetwear · '+(personal?85:89)+'% illustrative match'));
  assert.match(await at('.shop-flow').innerText(),/I’d skip it/);
  assert.match(await at('.shop-flow').innerText(),/Personal fit/);
  await settings.click();
  await at('#theme-mobile').click();
  await page.keyboard.press('Escape');
  assert.equal(await at('body').evaluate(el=>el.classList.contains('dark')),true);
  await shot('shopping-dark');
  await page.reload();
  await settings.click();
  assert.equal(await at('#my-style').inputValue(),'Streetwear');
  await page.keyboard.press('Escape');
  await at('[data-timing=soon]').click();
  assert.match(await at('[name=day]:checked + span').innerText(),/Tomorrow.*Nov 23, 2026/);
  assert.equal(await at('#plan-date').count(),0);
  await shot('plan-dark');
  await choose('day','other');
  await at('#plan-date').fill('2026-12-01');
  await choose('occasion','2');
  await at('#more-impressions').click();
  await choose('impression','Low-key');
  await at('[data-tab=Wardrobe]').click();
  await at('[data-tab=Today]').click();
  assert.equal(await at('#plan-date').inputValue(),'2026-12-01');
  assert.equal(await at('input[name=occasion]:checked').inputValue(),'2');
  assert.equal(await at('input[name=impression]:checked').inputValue(),'Low-key');
  await at('#lock-tomorrow').click();
  await at('#model-viewer').waitFor();
  await at('#accept-outfit').click();
  await at('#view-plan-log').click();
  await at('[data-plan-date="2026-12-01"]').click();
  await at('#model-viewer').waitFor();
  assert.equal(await at('[data-log]').count(),0);
  await at('#change-choices').click();
  assert.equal(await at('#plan-date').inputValue(),'2026-12-01');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth&&document.querySelector('#screen').scrollWidth<=document.querySelector('#screen').clientWidth),true);
  assert.deepEqual(errors,[]);
  assert.deepEqual(failed,[]);
  console.log(`PASS ${personal?'personal':'public'} ${width}×${height}, light/dark, keyboard, local dates, plan and My Style`);
 }finally{await page.close();}
}

(async()=>{
 if(capture)fs.mkdirSync(capture,{recursive:true});
 const browser=await chromium.launch({channel:'chrome'});
 try {
  for(const viewport of [[402,874],[390,844],[375,667],[320,568]]) await exercise(browser,...viewport);
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
