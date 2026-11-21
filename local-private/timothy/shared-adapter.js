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
  material: 'Not tagged', fit: 'Not tagged', pattern: 'Plain', seasons: [], occasions: [], notes: '',
 }));
}
function privateSelected(){return privatePick(state.occasion,state.alternate);}
function privateSheet(o){return '/wardrobe-timothy/'+(o.id==='everyday'?'everyday-'+(o.pieces.includes('roger')?'roger':'clogs'):o.id)+'-headless-v1.png';}
function current(){const o=privateSelected();return {name:o.title,short:o.id==='casual'?'Casual':o.id==='date'?'Date night':'Everyday',ids:privateIds(o),weather:weatherLabel(),image:privateSheet(o),sheet:privateSheet(o),isSheet:true,composed:false,why:o.why,line:o.why,steps:o.steps,stylistNote:o.note,goal:'Your own pieces, considered together.',style:items[privateIndex[o.pieces[0]]].style,requireLayer:false,reasonGroups:[{title:'The combination',text:o.why.split('. ')[0].replace(/\.$/,'')+'.'},...o.steps.slice(0,2).map((text,i)=>({title:['The top','The lower line'][i],text}))]};}
function garment(p){return `<img src="/__timothy/piece/${p.id}.svg" alt="${escapeHTML(p.name)}" width="320" height="320">`;}
function railPhoto(p){return {front:`/__timothy/piece/${p.id}.svg`,side:`/__timothy/piece/${p.id}.svg`};}
function mixPrimaryStyle(p){return p.style;}
function mixMainColour(p){return p.colour;}
function compatible(p){return state.fit.includes(p.id)||!state.fit.some(id=>items[id].cat===p.cat);}
function smallChanges(){return [];}
function verdict(){return `<div class="shopping-workspace"><h2>Worth it?</h2><p class="sub">Check it against your wardrobe.</p><div class="reason-card"><h3>Insufficient</h3><p>No candidate item has been supplied for your private wardrobe.</p></div></div>`;}
function preloadTodayModels(){for(const alternate of [false,true]){const image=new Image();image.src=privateSheet(privatePick(state.occasion,alternate));image.decode().catch(()=>{});}}
function initialisePrivate() {
 const query = new URLSearchParams(location.search);
 const occasion = Number(query.get('occasion'));
 state.recordingEntry = query.get('recording') === '1';
 state.occasion = state.recordingEntry ? 2 :
  query.has('occasion') && Number.isInteger(occasion) && occasion >= 0 && occasion < 3 ? occasion : 1;
 state.privateTimingChosen = false;
 state.energy = ['Confident','Relaxed','Polished'][state.occasion];
 state.index = state.occasion;
}
function wearBarVisible(){return state.timing!=='tomorrow';}
async function render(){
 const scroll = state.preserveScroll;
 state.preserveScroll = null;
 await shared_render();
 if (scroll != null) $('#screen').scrollTop = scroll;
}

async function preloadShoppingImages(){return;}

function todayTiming(){return `<div class="today-timing" role="group" aria-label="Outfit day">${['now','tomorrow'].map(mode=>btn(mode==='now'?'Another outfit for today':'Outfit for tomorrow',`data-timing="${mode}" aria-pressed="${Boolean(state.privateTimingChosen&&state.timing===mode)}"`,state.privateTimingChosen&&state.timing===mode?'active':'')).join('')}</div>${`<p class="outfit-day-label">${state.timing==='tomorrow'?"Tomorrow’s outfit":"Today’s outfit"} ${btn('Change choices','id="change-choices"','change-choices')}</p>`}`;}
function bind(){
 shared_bind();
 const choices = $('.recording-choices');
 if (choices) choices.ontoggle = () => { if (choices.isConnected) state.recordingChoicesOpen = choices.open; };
 if($('#occasion')){if(state.draftOccasion!==undefined)$('#occasion').value=String(state.draftOccasion);$('#occasion').onchange=e=>{state.draftOccasion=+e.target.value;state.todayTouched=true;};}
 if($('#energy')){if(state.draftCome!==undefined)$('#energy').value=state.draftCome;$('#energy').onchange=e=>{state.draftCome=e.target.value;state.todayTouched=true;};}
 if($('#another-outfit'))$('#another-outfit').onclick=()=>{state.preserveScroll=$('#screen').scrollTop;state.alternate=!state.alternate;state.modelAngle=0;state.swap=null;state.reasonIndex=0;render();};
 document.querySelectorAll('[data-timing]').forEach(button=>button.onclick=()=>{
  const mode=button.dataset.timing,repeat=state.privateTimingChosen&&state.timing===mode;
  state.privateTimingChosen=true;state.todayTouched=true;state.timing=mode;state.morning=false;state.timingEditing=false;
  state.occasion=state.draftOccasion??(mode==='tomorrow'?2:1);state.energy=state.draftCome??(mode==='tomorrow'?'Polished':'Relaxed');state.index=state.occasion;
  state.alternate=repeat?!state.alternate:false;state.modelAngle=0;state.swap=null;state.reasonIndex=0;
  render();$('#screen').scrollTop=0;
 });
}
