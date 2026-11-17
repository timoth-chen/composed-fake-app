// Private data adapter for the shared public app. Never shipped in public dist.
function privateSelected(){return privatePick(state.occasion,state.alternate);}
function privateSheet(o){return '/wardrobe-timothy/'+(o.id==='everyday'?'everyday-'+(o.pieces.includes('roger')?'roger':'clogs'):o.id)+'-headless-v1.png';}
function current(){const o=privateSelected();return {name:o.title,short:o.id==='casual'?'Casual':o.id==='date'?'Date night':'Everyday',ids:o.pieces.map(id=>privateIndex[id]),weather:weatherLabel(),image:privateSheet(o),sheet:privateSheet(o),isSheet:true,composed:false,why:o.why,line:o.why,steps:o.steps,stylistNote:o.note,goal:'Your own pieces, considered together.',style:items[privateIndex[o.pieces[0]]].style,requireLayer:false,reasonGroups:o.steps.slice(0,3).map((text,i)=>({title:['The top','The lower line','The finish'][i],text}))};}
function garment(p){return `<img src="/__timothy/piece/${p.id}.svg" alt="${escapeHTML(p.name)}" width="320" height="320">`;}
function railPhoto(p){return {front:`/__timothy/piece/${p.id}.svg`,side:`/__timothy/piece/${p.id}.svg`};}
function mixPrimaryStyle(p){return p.style;}
function mixMainColour(p){return p.colour;}
function compatible(p){return state.fit.includes(p.id)||!state.fit.some(id=>items[id].cat===p.cat);}
function smallChanges(){return [];}
function verdict(){return `<div class="shopping-workspace"><h2>Worth it?</h2><p class="sub">Check it against your wardrobe.</p><div class="reason-card"><h3>Insufficient</h3><p>No candidate item has been supplied for your private wardrobe.</p></div></div>`;}
function preloadTodayModels(){for(const alternate of [false,true]){const image=new Image();image.src=privateSheet(privatePick(state.occasion,alternate));image.decode().catch(()=>{});}}
function initialisePrivate(){
 items.splice(0,items.length,...privateItems.map((p,id)=>({id,privateId:p.id,name:p.name,cat:p.type.toLowerCase(),color:privateColours[p.colour]||'#999a92',colour:p.colour,style:p.style,imageKey:p.name.toLowerCase(),material:'Not tagged',fit:'Not tagged',pattern:'Plain',seasons:[],occasions:[],notes:''})));
 state.privateGenerated=true;state.privateTimingChosen=false;state.liked=new Set();state.occasion=Math.max(0,Math.min(2,new URLSearchParams(location.search).has('occasion')?Number(new URLSearchParams(location.search).get('occasion'))||0:1));state.energy=['Confident','Relaxed','Polished'][state.occasion];state.index=state.occasion;
 outfits.splice(0,outfits.length,...[0,1,2].map(i=>{const o=privatePick(i,false);return {ids:o.pieces.map(id=>privateIndex[id])};}));
 outfitPool.clear();for(let i=0;i<3;i++)for(const impression of impressions)for(const alt of [0,1]){const o=privatePick(i,Boolean(alt));outfitPool.set(`${i}:${impression}:${alt}`,{ids:o.pieces.map(id=>privateIndex[id]),sheet:privateSheet(o)});}
}

function today(){
 if(state.privateGenerated)return public_today();
 const previous=state.view;state.view='Outfit';let header=todayView().replace(/<div class="segmented" aria-label="Today views">[\s\S]*?<\/div>/,'');state.view=previous;
 header=header.slice(0,header.indexOf('<div class="purpose-weather">'));
 return `<div class="today-flow"><section class="daily-outfit">${header}${todayTiming()}</section></div>`;
}
function outfitVisible(){return Boolean(state.privateGenerated);}
function wearBarVisible(){return Boolean(state.privateGenerated)&&state.timing!=='tomorrow';}
async function render(){const scroll=state.preserveScroll;state.preserveScroll=null;await public_render();if(scroll!==undefined&&scroll!==null)$('#screen').scrollTop=scroll;}


async function preloadShoppingImages(){return;}

function todayTiming(){return `<div class="today-timing" role="group" aria-label="Outfit day">${['now','tomorrow'].map(mode=>btn(mode==='now'?'Another outfit for today':'Outfit for tomorrow',`data-timing="${mode}" aria-pressed="${Boolean(state.privateTimingChosen&&state.timing===mode)}"`,state.privateTimingChosen&&state.timing===mode?'active':'')).join('')}</div>${!state.privateGenerated?'':`<p class="outfit-day-label">${state.timing==='tomorrow'?"Tomorrow’s outfit":"Today’s outfit"} ${btn('Change choices','id="change-choices"','change-choices')}</p>`}`;}
function bind(){
 public_bind();
 if($('#occasion')){if(state.draftOccasion!==undefined)$('#occasion').value=String(state.draftOccasion);$('#occasion').onchange=e=>{state.draftOccasion=+e.target.value;state.todayTouched=true;};}
 if($('#energy')){if(state.draftCome!==undefined)$('#energy').value=state.draftCome;$('#energy').onchange=e=>{state.draftCome=e.target.value;state.todayTouched=true;};}
 if($('#another-outfit'))$('#another-outfit').onclick=()=>{state.preserveScroll=$('#screen').scrollTop;state.alternate=!state.alternate;state.modelAngle=0;state.swap=null;state.reasonIndex=0;render();};
 document.querySelectorAll('[data-timing]').forEach(button=>button.onclick=()=>{
  const mode=button.dataset.timing,repeat=state.privateTimingChosen&&state.timing===mode;
  state.privateGenerated=true;state.privateTimingChosen=true;state.todayTouched=true;state.timing=mode;state.morning=false;state.timingEditing=false;
  state.occasion=state.draftOccasion??(mode==='tomorrow'?2:1);state.energy=state.draftCome??(mode==='tomorrow'?'Polished':'Relaxed');state.index=state.occasion;
  state.alternate=repeat?!state.alternate:false;state.modelAngle=0;state.swap=null;state.reasonIndex=0;
  render();$('#screen').scrollTop=0;
 });
}
