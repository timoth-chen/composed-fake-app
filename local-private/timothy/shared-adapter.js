// Data used only by the personal build.
const privateIndex = Object.fromEntries(privateItems.map((piece, index) => [piece.id, index]));
const privateColours = {Black:'#1b1d1f',Grey:'#999a92',Navy:'#273342',Blue:'#71818a',Cream:'#e4ddce',White:'#eeece5',Olive:'#7b846c'};
const styleMixColours = privateColours;
function privateIds(look) {
 return look.pieces.map(id => privateIndex[id]);
}
function personalItems() {
 return privateItems.map((piece, id) => ({
  id, privateId: piece.id, name: piece.name, imageKey: piece.name.toLowerCase(), cat: piece.type.toLowerCase(),
  color: privateColours[piece.colour], colour: piece.colour, style: piece.style,
  material: piece.id==='runner'?'Suede and mesh':'Not tagged', fit: ['light-jeans','indigo-trousers','black-trousers'].includes(piece.id)?'Wide leg':'Not tagged', pattern: 'Plain', seasons: [], occasions: [], notes: '',
 }));
}
const rackArtwork = new Set(['hoodie','henley','shirt','jacket','light-jeans','indigo-trousers','black-trousers']);
const portraitNames = {casual:'stussy',everyday:'henley',date:'barbour'};

function availableImpressions(occasion) {
 return [
  ['Confident','Approachable','Relaxed'],
  ['Relaxed','Approachable','Confident'],
  ['Polished','Confident','Low-key'],
 ][occasion];
}

function privateFrames(look) {
 const name = portraitNames[look.id];
 return ['front','facing-right','back','facing-left'].map(angle =>
  `/wardrobe-timothy/rotation/${name}-${angle}.${name==='barbour'&&angle==='front'?'png':'webp'}`
 );
}

function current() {
 const look = privatePick(state.occasion,state.alternate);
 return {name:look.title,short:look.title,ids:privateIds(look),frames:privateFrames(look),why:look.why,steps:look.steps};
}

function garment(piece) {
 const src = `/wardrobe-timothy/rack/${piece.privateId}-front.webp`;
 return `<img src="${src}" alt="${escapeHTML(piece.name)}" width="320" height="320">`;
}

function railPhoto(piece) {
 if (piece.privateId==='polo') {
  const front = '/wardrobe-timothy/rack/polo-front.webp';
  return {front,side:front};
 }
 if (!rackArtwork.has(piece.privateId)) return null;
 const prefix = `/wardrobe-timothy/rack/${piece.privateId}`;
 return {front:`${prefix}-front.webp`,side:`${prefix}-side.webp`};
}
function mixPrimaryStyle(piece){return piece.style;}
function mixMainColour(piece){return piece.colour;}
function compatible(piece){return state.fit.includes(piece.id)||!state.fit.some(id=>items[id].cat===piece.cat);}
function smallChanges(){return [];}

const privateShopCases = [
 {id:'runner', label:'Grey runners', verdict:'Already covered', why:'Your grey New Balance runners already fill this role. They work with the Stüssy hoodie and light-wash jeans for a soft, casual finish.'},
 {id:'clogs', label:'Black clogs', verdict:'Skip it', why:'You already have black BEAMS clogs. They give the cream henley and pleated trousers an easy finish. A similar pair adds little to that combination.'},
 {id:'tiger', label:'Court sneakers', verdict:'Worth trying on', why:'If you are replacing your current cream and navy pair, check that the low profile still works with your wide black trousers and that the fit is comfortable.'},
];

function verdict() {
 const candidate = privateShopCases[state.verdict];
 return `<section class="shopping-workspace"><h2>Nigel’s Buy Verdict</h2><p class="sub">Sample shopping advice using pieces from your wardrobe.</p>
  <div class="pick-secondary">${privateShopCases.map(({label},index)=>btn(label,`data-purchase="${index}" aria-pressed="${state.verdict===index}"`,state.verdict===index?'active':'')).join('')}</div>
  <div class="reason-card private-verdict"><h3>${candidate.verdict}</h3><div class="outfit-piece-thumb">${garment(items[privateIndex[candidate.id]])}<span>${escapeHTML(items[privateIndex[candidate.id]].name)}</span></div><p>${candidate.why}</p></div></section>`;
}

const privatePreloaded = new Map();
function preloadTodayModels() {
 if (!window.Image) return;
 for (const src of current().frames) {
  if (privatePreloaded.has(src)) continue;
  const image = new Image();
  image.src = src;
  privatePreloaded.set(src,image);
  image.decode().catch(()=>privatePreloaded.delete(src));
 }
}

function initialisePrivate() {
 const query = new URLSearchParams(location.search);
 const occasion = Number(query.get('occasion'));
 if (query.has('occasion') && Number.isInteger(occasion) && occasion>=0 && occasion<3) {
  state.occasion = occasion;
  state.index = occasion;
  state.energy = availableImpressions(occasion)[0];
 }
 if (query.get('recording')==='1') $('#record-mode')?.click();
}

async function preloadShoppingImages(){}
