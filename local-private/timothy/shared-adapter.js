// Data used only by the personal build.
const privateIndex = Object.fromEntries(privateItems.map((piece, index) => [piece.id, index]));
const privateColours = {Black:'#1b1d1f',Grey:'#999a92',Navy:'#273342',Blue:'#71818a',Cream:'#e4ddce',White:'#eeece5',Olive:'#7b846c'};
const styleMixColours = privateColours;
function privateIds(look) {
 return look.pieces.map(id => privateIndex[id]);
}
const shortNames={hoodie:'Stüssy hoodie','light-jeans':'Wide jeans',runner:'New Balance',henley:'Cream henley','indigo-trousers':'Indigo trousers',clogs:'BEAMS clogs',jacket:'Barbour',shirt:'Navy shirt','black-trousers':'Black trousers',tiger:'Tigers'};
function personalItems() {
 return privateItems.map((piece, id) => ({
  id, privateId: piece.id, shortName:shortNames[piece.id], name: piece.name, imageKey: piece.name.toLowerCase(), cat: piece.type.toLowerCase(),
  color: privateColours[piece.colour], colour: piece.colour, style: piece.style,
  material: piece.id==='runner'?'Suede and mesh':'Not tagged', fit: ['light-jeans','indigo-trousers','black-trousers'].includes(piece.id)?'Wide leg':'Not tagged', pattern: 'Plain', seasons: [], occasions: [], notes: '',
 }));
}
const rackArtwork = new Set(['hoodie','henley','shirt','jacket','light-jeans','indigo-trousers','black-trousers']);
const portraitNames = {casual:'stussy',everyday:'henley',date:'barbour'};

const advice = {
 casual:{
  Relaxed:'The roomy jeans and soft hoodie leave you room to move.',
  Confident:'The charcoal hoodie gives the wide denim a strong, simple outline.',
  Polished:'Keep this to informal plans. The muted trainers pull the denim and hoodie together without dressing them up.',
  Approachable:'The familiar hoodie and trainers take the edge off the wide denim.',
  Sharp:'The ribbed hoodie hem and straight fall of the jeans keep the silhouette clear for a casual setting.',
  'Not sure':'Start with familiar denim, a soft hoodie and comfortable trainers for casual plans.',
  'Low-key':'Charcoal and faded denim keep the outfit quiet, even with a roomy shape.',
 },
 everyday:{
  Relaxed:'The henley softens the pleated trousers, and the clogs keep the whole thing easy.',
  Confident:'The dark pleats give the outfit structure. The cream henley keeps that shape from feeling stiff.',
  Polished:'The pleats give you a tidy line. Keep the henley neckline and trouser front simple so that line reads.',
  Approachable:'Cream softens the contrast with the navy, and the textured henley makes the outfit feel easy to wear.',
  Sharp:'Keep the front pleats straight and the dark hems clear of the clogs for a clean line.',
  'Not sure':'The textured henley and dark pleats are an easy starting point for everyday plans.',
  'Low-key':'The texture does the work up close. You can keep the rest simple with the dark trousers and clogs.',
 },
 date:{
  Relaxed:'The open jacket and cream trainers make the dark base feel easygoing.',
  Confident:'The plaid has enough personality to stand on its own. The black trousers give it a steady base.',
  Polished:'The plaid adds personality without making the outfit feel dressed up. The navy shirt and black trousers keep it grounded.',
  Approachable:'The cream trainers soften the dark outfit, and wearing the jacket open keeps the plaid from feeling formal.',
  Sharp:'The navy shirt and black trousers make a neat line inside the open jacket.',
  'Not sure':'Start with the dark shirt and trousers, with the jacket open and cream trainers for an easy finish.',
  'Low-key':'Keep the navy shirt and black trousers as the base. The plaid is the one detail that catches the eye.',
 },
};

function privateFrames(look) {
 const name = portraitNames[look.id];
 return ['front','facing-right','back','facing-left'].map(angle =>
  `/wardrobe-timothy/rotation/${name}-${angle}.${name==='barbour'&&angle==='front'?'png':'webp'}`
 );
}

function current() {
 const work=state.occasion===3;
 const look = privatePick(work?2:state.occasion,state.alternate);
 const titles={casual:'Stüssy and wide denim',everyday:'Cream henley and pleats',date:'Plaid over navy'};
 const openings=['For an everyday plan,','For a casual outing,','For date night,','For a casual workplace,'];
 const contexts={
  casual:' a hoodie and trainers work best when the dress code is casual.',
  everyday:' the pleated trousers give you room to dress up or down.',
  date:' the open jacket gives the outfit just enough shape.',
 };
 return {name:titles[look.id],ids:privateIds(look),frames:privateFrames(look),contextual:true,
  photoNote:look.id==='casual'?'The lookbook photo also shows a white undershirt.':null,
  why:work?openings[3]+' the navy button-down and black trousers give you a tidy base. The open Barbour and cream trainers suit a relaxed office dress code.':advice[look.id][state.energy]+' '+openings[state.occasion]+contexts[look.id],steps:look.steps};
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

const cases = [
 {id:'runner', label:'Grey runners', word:'Already covered', styleFit:84,
  why:'The low-profile grey suede and mesh fit your casual wardrobe.',
  adds:'Your grey New Balance runners already fill this role.',
  alternative:'Wear the New Balance runners you own.',
  with:'The Stüssy hoodie and light-wash jeans.'},
 {id:'clogs', label:'Black clogs', word:'Skip it', styleFit:78,
  why:'A simple dark clog sits comfortably under the wide pleats.',
  adds:'Your black BEAMS clogs already give you this option.',
  alternative:'Try your BEAMS clogs before buying a similar pair.',
  with:'The cream henley and indigo pleated trousers.'},
 {id:'tiger', label:'Court sneakers', word:'Check the fit', styleFit:81,
  why:'A cream and navy court sneaker lightens the dark trousers.',
  adds:'A similar pair makes sense only if you need to replace your Onitsuka Tigers.',
  alternative:'Compare the pair with your existing Tigers.',
  with:'The navy button-down, black wide trousers and open Barbour.',
  check:'Walk a few steps and check that the heel stays secure and the trouser hem clears the sole.'},
];

function shoppingCandidate(index) {
 const candidate=cases[index];
 const piece=items[privateIndex[candidate.id]];
 return {...candidate,name:piece.name,photo:`/wardrobe-timothy/rack/${piece.privateId}-front.webp`};
}

const privatePreloaded = new Map();
function preloadTodayModels() {
 if (!window.Image) return;
 const frameSets=[0,1,2].map(occasion=>privateFrames(privatePick(occasion,false)));
 for (const src of [...frameSets.map(frames=>frames[0]),...frameSets.flatMap(frames=>frames.slice(1))]) {
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
