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
 state.liked=new Set();state.occasion=Math.max(0,Math.min(2,Number(new URLSearchParams(location.search).get('occasion'))||0));state.energy=['Confident','Relaxed','Polished'][state.occasion];state.index=state.occasion;
 outfits.splice(0,outfits.length,...[0,1,2].map(i=>{const o=privatePick(i,false);return {ids:o.pieces.map(id=>privateIndex[id])};}));
 outfitPool.clear();for(let i=0;i<3;i++)for(const impression of impressions)for(const alt of [0,1]){const o=privatePick(i,Boolean(alt));outfitPool.set(`${i}:${impression}:${alt}`,{ids:o.pieces.map(id=>privateIndex[id]),sheet:privateSheet(o)});}
}

function today(){return public_today();}

async function preloadShoppingImages(){return;}
