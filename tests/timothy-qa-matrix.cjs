const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const base=process.env.APP_URL||'http://composed.test';
const output=process.env.CAPTURE_DIR||'.';
const scores={
 'No preference':[null,null,null,null],
 'East Asian Minimalist':[89,92,70,85],
 Workwear:[72,92,70,41],
 Streetwear:[89,73,48,85],
 Minimalist:[89,92,70,85],
 Classic:[43,73,87,69],
 'Smart Casual':[43,46,87,41],
};

(async()=>{
 const browser=await chromium.launch({channel:'chrome'});
 try{
  const page=await browser.newPage({viewport:{width:390,height:844},hasTouch:true});
  if(!process.env.APP_URL)await page.route(base+'/**',route=>{
   const pathname=new URL(route.request().url()).pathname;
   const file=path.resolve('timothy-dist','.'+(pathname==='/'?'/index.html':pathname));
   return fs.existsSync(file)?route.fulfill({path:file}):route.fulfill({status:404,body:'Missing'});
  });
  const at=s=>page.locator(s);
  const tab=name=>at(`[data-tab="${name}"]`).click();
  await page.goto(base);
  const integrity=await page.evaluate(async()=>{
   const {items,looks}=await import('/__timothy/catalogue.js');
   const files=await Promise.all(items.map(async piece=>{
    const url='/wardrobe-timothy/rack/'+piece.id;
    const [front,side]=await Promise.all(['-front.webp','-side.webp'].map(suffix=>fetch(url+suffix).then(r=>r.ok&&r.headers.get('content-type')?.startsWith('image/'))));
    return {...piece,front,side};
   }));
   return {files,looks};
  });
  assert.equal(integrity.files.length,12);
  assert.ok(integrity.files.every(p=>p.front&&p.colour&&p.type));
  for(const look of Object.values(integrity.looks))assert.ok(look.pieces.every(id=>integrity.files.some(p=>p.id===id)));
  const looks=[];
  for(let occasion=0;occasion<4;occasion++){
   const impressions=['Confident','Approachable','Polished','Relaxed','Low-key',...(occasion===3?[]:['Sharp','Not sure'])];
   for(const impression of impressions){
    await at(`[name=occasion][value="${occasion}"]`).check();
    const input=at(`[name=impression][value="${impression}"]`);
    if(!await input.count())await at('#more-impressions').click();
    await input.check();
    await at('#lock-tomorrow').click();
    await at('[data-frame="0"]').waitFor();
    const frames=await at('[data-frame]').evaluateAll(nodes=>nodes.map(n=>({src:n.getAttribute('src'),alt:n.alt,decoded:n.naturalWidth>0})));
    assert.equal(frames.length,4);
    assert.ok(frames.every(f=>f.decoded));
    const garments=await at('.daily-outfit + .pick-details .outfit-piece-thumb').evaluateAll(nodes=>nodes.map(n=>n.title));
    assert.ok(garments.length>=3);
    assert.ok(garments.every(name=>integrity.files.some(p=>p.name===name)&&frames.every(f=>f.alt.includes(name))));
    looks.push({occasion,impression,garments,frames,why:await at('.daily-why p').innerText()});
    await at('#change-choices').click();
   }
  }
  const shopping=[];
  for(const [style,expected] of Object.entries(scores)){
   await page.evaluate(value=>localStorage.setItem('composed.private.timothy.v1.my-style',value),style);
   await page.reload();
   await tab('Shopping');
   for(let i=0;i<4;i++){
    await at(`[data-purchase="${i}"]`).click();
    const meter=page.getByRole('meter');
    const score=await meter.count()?Number(await meter.getAttribute('aria-valuenow')):null;
    assert.equal(score,expected[i]);
    const verdict=await at('.shop-verdict h2').innerText();
    assert.equal(verdict,i===1||i===3||(score!==null&&score<55)?'I’d skip it':'Worth trying on');
    shopping.push({style,candidate:await at('.shop-product h3').innerText(),score,verdict,reason:await at('.shop-verdict p').last().innerText()});
    if(style==='East Asian Minimalist'&&i===3)await page.screenshot({path:path.join(output,'shopping-390.png')});
    await at('#shop-back').click();
   }
  }
  await at('[data-purchase="0"]').click();
  await at('[data-shopping-record=save]').click();
  await at('[data-shopping-record=buy]').click();
  await at('[data-shopping-record=add]').click();
  await at('#shop-view-wardrobe').click();
  await at('.item-name').filter({hasText:'Black bomber jacket'}).waitFor();
  fs.writeFileSync(path.join(output,'timothy-matrix.json'),JSON.stringify({integrity,looks,shopping},null,2));
  console.log('PASS personal data, 26 outfit contexts, 28 shopping cells, save, purchase and add');
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1});
