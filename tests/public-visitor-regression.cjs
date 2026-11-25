const assert = require('node:assert/strict');
const { chromium } = require('playwright');

async function main() {
 const browser = await chromium.launch({ channel: 'chrome' });
 try {
  const context = await browser.newContext({acceptDownloads:true, viewport:{width:390,height:844}, hasTouch:true});
  const page = await context.newPage();
  page.setDefaultTimeout(12000);
  const at = selector => page.locator(selector);
  const tab = name => at(`[data-tab="${name}"]`).click();
  const base = process.env.APP_URL || 'https://composed-fake-app.onrender.com';
  await page.goto(base);
  const response = await page.request.get(await at('.demo-links a:first-child').getAttribute('href'));
  assert.ok(response.ok());
  const pilot = await page.context().newPage();
  await pilot.goto(await at('.demo-apply').getAttribute('href'));
  await pilot.getByRole('dialog').filter({hasText:/pilot/i}).waitFor();
  await pilot.close();
  await at('#lock-tomorrow').click();
  const original = await at('.model-turn-sheet').getAttribute('src');
  await at('#another-outfit').click();
  await page.waitForFunction(src=>document.querySelector('.model-turn-sheet')?.getAttribute('src')!==src, original);
  for(const angle of ['Right side','Back','Left side','Front']){
   await at('#model-next').click();
   assert.ok((await at('.model-turn-sheet').getAttribute('alt')).startsWith(angle+' view of '));
  }
  await at('#refine-pick').click();
  await at('#cancel-piece-swap').click();
  await at('.piece-swap-panel').waitFor({state:'detached'});
  await at('#accept-outfit').click();
  await at('[data-log=wore]').click();
  await at('#undo-wear').click();
  await at('[data-log=wore][aria-pressed=false]').waitFor();
  await at('#refine-pick').click();
  await at('[data-swap-to]').first().click();
  const pieces = await at('.swap-preview .outfit-piece-thumb span').allTextContents();
  await at('#apply-piece-swap').click();
  await at('.builder').waitFor();
  const draft = () => at('.builder .outfit-piece-thumb span').allTextContents();
  assert.deepEqual(await draft(),pieces);
  await page.reload();
  await tab('Wardrobe');
  assert.deepEqual(await draft(),pieces);
  await at('#save-fit').click();
  await at('[data-filter=Shoes]').click();
  await at('[data-wardrobe-view=Rack]').click();
  await at('.shoe-drawer').waitFor();
  await at('[data-wardrobe-view=List]').click();
  await at('.settings-menu summary').first().click();
  const [download] = await Promise.all([page.waitForEvent('download'),at('#settings-export').click()]);
  assert.equal(download.suggestedFilename(),'composed-wardrobe.json');
  await page.keyboard.press('Escape');
  await tab('Shopping');
  await at('[data-purchase="3"]').click();
  await at('[data-shopping-record=save]').click();
  await at('[data-shopping-record=buy]').click();
  await at('[data-shopping-record=add]').click();
  await at('#shop-view-wardrobe').click();
  await at('.item-name').filter({hasText:'Light grey canvas slip-ons'}).waitFor();
  await at('.settings-menu summary').first().click();
  await at('#theme-mobile').click();
  assert.ok(await at('body.dark').count());
  await page.reload();
  assert.ok(await at('body.dark').count());
  await at('[data-timing=soon]').click();
  await at('#lock-tomorrow').click();
  await at('#accept-outfit').click();
  await at('#view-plan-log').click();
  await at('[data-plan-date]').waitFor();
  await page.reload();
  await tab('Log');
  await at('[data-plan-date]').waitFor();
  await at('[data-plan-date]').click();
  await at('.stylist-pick').waitFor();
  console.log('PASS public visitor regression');
 } finally {
  await browser.close();
 }
}

main().catch(error=>{console.error(error); process.exitCode=1;});
