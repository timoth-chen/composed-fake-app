const $=s=>document.querySelector(s);
const items=[
['Burgundy knit polo','tops','#722c40','Considered',95],['Dark indigo straight jeans','bottoms','#202c3d','Everyday',120],['Black suede clogs','shoes','#292823','Relaxed',110],['Ink navy heavyweight T-shirt','tops','#202939','Everyday',55],['Black tailored shorts','bottoms','#252724','Considered',85],['White leather sneakers','shoes','#e6e6df','Everyday',130],['White heavyweight T-shirt','tops','#eeece5','Everyday',45],['Stone straight trousers','bottoms','#b8ae97','Considered',115],['Slate pleated trousers','bottoms','#53565a','Considered',140],['Sage cotton shirt','tops','#919b83','Relaxed',90],['Black crewneck knit','tops','#2b2d28','Considered',105],['Oatmeal cardigan','layers','#c2b89f','Relaxed',130],['Washed denim shirt','tops','#70828a','Everyday',95],['Navy chore jacket','layers','#303c46','Everyday',150],['Black bomber','layers','#30332d','Everyday',160],['Olive cotton overshirt','layers','#6d7453','Relaxed',125],['Black leather loafers','shoes','#292823','Considered',165],['Stone suede loafers','shoes','#b2a38a','Considered',145],['Grey cotton sweatshirt','tops','#999a92','Relaxed',75],['Olive fatigue trousers','bottoms','#74785e','Relaxed',110],['Grey New Balance 996 runner','shoes','#82858a','Everyday']
].map((a,id)=>({id,name:a[0],cat:a[1],color:a[2],style:a[3],cost:a[4]}));
const metadataKey='composed.wardrobe.v1';
items.forEach(p=>{p.imageKey=p.name.toLowerCase();p.colour=p.color;p.material='Not tagged';p.fit='Not tagged';p.pattern='Plain';p.seasons=[];p.occasions=[];p.notes='';});
try{const saved=JSON.parse(localStorage.getItem(metadataKey)||'[]');if(Array.isArray(saved))saved.forEach(row=>{const p=items.find(p=>p.id===row.id);if(!p)return;for(const key of ['material','fit','pattern','notes','colour'])if(typeof row[key]==='string'&&!(p.id===20&&key==='colour'&&row[key]==='#e4dfd3'))p[key]=row[key].slice(0,500);if(!(p.id===20&&row.name==='Off-white minimal runner')&&typeof row.name==='string'&&/^[^<>"&`]{1,80}$/.test(row.name))p.name=row.name;if(['tops','bottoms','shoes','layers'].includes(row.cat))p.cat=row.cat;for(const key of ['seasons','occasions'])if(Array.isArray(row[key]))p[key]=row[key].filter(x=>typeof x==='string').slice(0,12);});}catch{}
function escapeHTML(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function wardrobeData(){return {schemaVersion:1,pieces:items.map(({id,name,cat,colour,material,fit,pattern,seasons,occasions,notes})=>({id,name,category:cat,colour,material,fit,pattern,seasons,occasions,notes}))};}
function saveWardrobe(){try{localStorage.setItem(metadataKey,JSON.stringify(items));return true;}catch{return false;}}
const outfits=[{name:'The everyday, elevated.',short:'Denim',ids:[0,1,2],weather:'17° · Cool afternoon',image:'assets/denim.png',why:'A textured knit brings softness to straight denim. The dark clogs keep the whole line grounded.',line:'A little texture. An easy silhouette. Entirely you.',steps:['Start with the straight jeans. Let the hem sit just above the clogs.','Wear the knit polo untucked; leave the top button open.','Slip into the black suede clogs. Keep the rest simple.']},{name:'An easier kind of afternoon.',short:'Casual shorts',ids:[3,4,5],weather:'23° · Warm afternoon',image:'assets/shorts.png',why:'Tailored shorts with a heavyweight navy tee. White sneakers lighten the dark outfit.',line:'Dark on top, light at the feet. Easy proportions.',steps:['Put on the black tailored shorts; keep the waist clean.','Add the heavyweight navy tee, falling just below the waistband.','Finish with white leather sneakers to lighten the dark outfit.']}];
outfits.push({"name": "Olive layers", "short": "Date night", "ids": [15, 6, 8, 16], "weather": "16\u00b0 \u00b7 Cool evening", "image": "assets/date-night.png", "why": "Your everyday overshirt, with pleated trousers and loafers. The white tee keeps the layers light and easy.", "line": "Open layers and a polished shoe.", "steps": ["Overshirt open.", "Tee short and fully untucked.", "Trousers clear of the loafers."], "requireLayer": true, "stylistNote": "The loafers give familiar pieces an evening feel."});
outfits.forEach((outfit,i)=>outfit.image=`assets/mannequin-cutout-${i}.png`);
const landingDetails=[{"goal": "Goal: longer lines, without dressing up.", "style": "Relaxed minimal", "subtitle": "Burgundy & indigo", "reasonGroups": [{"title": "Colour, kept simple", "itemIds": ["top-09"], "text": "A short burgundy knit brings colour and balances your longer torso."}, {"title": "One clean line", "itemIds": ["bottom-03"], "text": "Straight indigo denim keeps the leg line clean and unbroken."}, {"title": "Keep the line going", "itemIds": ["shoe-04"], "text": "Dark clogs blend into the jeans and keep the finish relaxed."}], "tips": ["Polo open at the collar.", "Keep the knit short and untucked.", "Jeans just over the clogs."]}, {"goal": "Goal: a taller-looking line, kept casual.", "style": "Japanese minimal", "subtitle": "Navy & black", "reasonGroups": [{"title": "A clearer waistline", "itemIds": ["top-11"], "text": "A short navy tee balances your longer torso and keeps the palette understated."}, {"title": "A cleaner leg line", "itemIds": ["bottom-06"], "text": "Black shorts above the knee leave more leg visible, with a relaxed fit."}, {"title": "A light finish", "itemIds": ["shoe-01"], "text": "White leather sneakers add contrast and keep the finish casual."}], "tips": ["Tee untucked, at upper hip.", "Shorts just above the knee.", "Low socks with the sneakers."]}, {"goal": "Goal: a taller-looking line for date night.", "style": "Soft tailoring", "subtitle": "Olive layers", "reasonGroups": [{"title": "Layers that frame", "itemIds": ["outer-02", "top-01"], "text": "Open layers create a vertical line; a short tee clears the waist."}, {"title": "A straighter silhouette", "itemIds": ["bottom-05"], "text": "Straight pleats continue the line without clinging."}, {"title": "An evening finish", "itemIds": ["shoe-03"], "text": "Dark loafers continue that line and suit date night."}], "tips": ["Overshirt open.", "Tee short and fully untucked.", "Trousers clear of the loafers."]}];
outfits.forEach((o,i)=>Object.assign(o,{goal:landingDetails[i].goal,style:landingDetails[i].style,subtitle:landingDetails[i].subtitle,reasonGroups:landingDetails[i].reasonGroups,steps:landingDetails[i].tips}));
const lookProfiles={
Approachable:{ids:[6,7,2],sheet:'assets/look-approachable.png',why:'A white heavyweight tee opens up the palette. Stone straight trousers and black suede clogs keep the proportions easy and grounded.',steps:['Start with the stone straight trousers, with a clean break at the foot.','Wear the white heavyweight T-shirt untucked, ending at the upper hip.','Finish with the black suede clogs.'],reasons:['The white heavyweight tee gives the outfit a lighter, open feel.','Stone straight trousers keep a clean, easy line through the leg.','Black suede clogs ground the lighter clothes without making them formal.']},
Polished:{ids:[0,8,17],sheet:'assets/look-polished.png',why:'The burgundy knit polo and slate pleats make a considered, relaxed line. Stone suede loafers add a softer polished finish.',steps:['Put on the slate pleated trousers, letting the pleats fall naturally.','Add the burgundy knit polo, short and untucked with the collar open.','Wear the stone suede loafers with the trouser hems clear of the shoes.'],reasons:['The burgundy knit brings texture without adding fuss.','Slate pleated trousers give the outfit a clean, considered shape.','Stone suede loafers soften the finish while keeping it polished.']},
Relaxed:{ids:[9,19,5],sheet:'assets/look-relaxed.png',why:'A sage cotton shirt and olive fatigue trousers keep the shape loose and practical. White leather sneakers lighten the muted greens.',steps:['Start with the olive fatigue trousers, sitting comfortably at the waist.','Wear the sage cotton shirt untucked and leave the collar open.','Add the white leather sneakers and let the trouser hems sit neatly above them.'],reasons:['A sage cotton shirt makes the top half feel open and relaxed.','Olive fatigue trousers give the outfit room to move.','White leather sneakers keep the muted greens light and casual.']},
Sharp:{ids:[10,7,17],sheet:'assets/look-sharp.png',why:'A black crewneck knit makes a clean top line against stone straight trousers. Stone suede loafers keep the lower half quiet and deliberate.',steps:['Put on the stone straight trousers and straighten the front line.','Add the black crewneck knit with a neat, untucked hem.','Finish with the stone suede loafers, keeping the trouser hem clear.'],reasons:['The black crewneck knit creates a simple, defined upper half.','Stone straight trousers add a clear contrast and an unbroken leg line.','Stone suede loafers continue the light lower line with a neat finish.']},
'Low-key':{ids:[3,1,2],sheet:'assets/look-low-key.png',why:'An ink navy heavyweight tee and dark indigo denim keep the palette quiet. Black suede clogs complete the same grounded line.',steps:['Start with the dark indigo straight jeans, with the hems just over the clogs.','Wear the ink navy heavyweight T-shirt untucked at the upper hip.','Slip into the black suede clogs and keep the finishing simple.'],reasons:['An ink navy tee keeps the top half understated.','Dark indigo straight jeans carry the same quiet palette down.','Black suede clogs keep the finish relaxed and tonal.']},
'Not sure':{ids:[12,8,5],sheet:'assets/look-not-sure.png',why:'A washed denim shirt gives slate pleated trousers a familiar, easy feel. White leather sneakers keep the combination straightforward.',steps:['Put on the slate pleated trousers and let the fabric fall straight.','Add the washed denim shirt, untucked with the top button open.','Finish with white leather sneakers and keep the hems neat.'],reasons:['The washed denim shirt is a familiar, easy starting point.','Slate pleated trousers give the shirt a considered foundation.','White leather sneakers keep the finished outfit approachable.']}
};
const profileTags={Approachable:'White & stone',Polished:'Burgundy & slate',Relaxed:'Sage & olive',Sharp:'Black & stone','Low-key':'Navy & indigo','Not sure':'Denim & slate'};
const occasions=['Everyday','Casual','Date night','Work'];
const impressions=['Confident','Approachable','Polished','Relaxed','Sharp','Low-key','Not sure'];
const dayWeather={today:null,tomorrow:null};
function weatherLabel(){const value=dayWeather[state.timing==='tomorrow'?'tomorrow':'today'];return value||'Toronto · Weather unavailable';}
async function refreshWeather(){
 try{const response=await fetch('https://api.open-meteo.com/v1/forecast?latitude=43.6532&longitude=-79.3832&current=temperature_2m,weather_code&daily=temperature_2m_max,weather_code&timezone=America%2FToronto&forecast_days=2');if(!response.ok)throw Error('Weather unavailable');const data=await response.json();
 const describe=code=>code===0?'Clear':code<=3?'Cloudy':code<=48?'Fog':code<=67?'Rain':code<=77?'Snow':code<=82?'Showers':code<=86?'Snow showers':'Thunderstorms';
 if(Number.isFinite(data.current?.temperature_2m))dayWeather.today=`Toronto · ${Math.round(data.current.temperature_2m)}° · ${describe(data.current.weather_code)}`;
 if(Number.isFinite(data.daily?.temperature_2m_max?.[1]))dayWeather.tomorrow=`Toronto · Tomorrow ${Math.round(data.daily.temperature_2m_max[1])}° high · ${describe(data.daily.weather_code[1])}`;
 if(state.tab==='Today')render();
 }catch{/* Never present a fixed demo temperature as live weather. */}
}

function greeting(date=new Date()){const hour=date.getHours();return hour<12?'Good morning.':hour<18?'Good afternoon.':'Good evening.';}
// Stable context-keyed catalogue. Reserve every original photographic look first.
const outfitPool=new Map(),usedLooks=new Set();
function lookKey(ids){return [...ids].sort((a,b)=>a-b).join(',');}
function reserveLook(key,ids,source){outfitPool.set(key,{ids:[...ids],source});usedLooks.add(lookKey(ids));}
outfits.forEach((o,i)=>reserveLook(`${i}:Confident:0`,o.ids,{base:i}));
Object.entries(lookProfiles).forEach(([key,p])=>reserveLook(`0:${key}:0`,p.ids,{profile:key}));
const tops=[0,3,6,9,10,12],bottoms=[1,4,7,8,19],shoes=[2,5,16,17];
function nextLook(occasion,impression,alternate,first){const offset=impressions.indexOf(impression);const candidates=[];for(let t=0;t<tops.length;t++)for(let b=0;b<bottoms.length;b++)for(let f=0;f<shoes.length;f++){const ids=[tops[(t+offset)%tops.length],bottoms[(b+occasion+offset)%bottoms.length],shoes[(f+offset+occasion)%shoes.length]];if(occasion!==1&&ids.includes(4))continue;if(alternate&&first&&ids.some(id=>first.includes(id)))continue;if(!usedLooks.has(lookKey(ids)))candidates.push(ids);}return candidates[0];}
for(const occasion of [0,1,2])for(const impression of impressions){const key=`${occasion}:${impression}:0`;if(!outfitPool.has(key))reserveLook(key,nextLook(occasion,impression,false));}
for(const occasion of [0,1,2])for(const impression of impressions){const key=`${occasion}:${impression}:1`,first=outfitPool.get(`${occasion}:${impression}:0`).ids;reserveLook(key,nextLook(occasion,impression,true,first));}
// Runner first pick for Casual / Relaxed; retained as an Everyday / Relaxed alternate.
outfitPool.get('0:Relaxed:1').ids=[10,8,20];
outfitPool.set('1:Relaxed:0',{ids:[10,1,20],copy:{
 short:'Black knit & indigo',
 why:'The black crewneck knit keeps the top half soft and simple. Dark indigo straight jeans give it an easy, unbroken line. Grey suede-and-mesh New Balance 996 runners add a cushioned, casual finish without a bright colour contrast.',
 line:'A soft black knit, straight indigo denim and grey runners. Comfortable, quiet and ready for a casual afternoon.',
 steps:['Wear the black crewneck knit untucked, with the ribbed hem sitting at the hip.','Let the dark indigo straight jeans fall naturally; keep the hems just clear of the runners.','Lace the Grey New Balance 996 runners comfortably. Let the grey suede and mesh be the only extra detail.'],
 stylistNote:'Nigel: keep the knit untucked and the jeans straight. The grey runners make this a relaxed everyday outfit; no extra layer is needed at 17°.',
 reasonGroups:[{title:'A soft, simple top',text:'The black crewneck knit gives you a clean upper half without looking dressed up.'},{title:'Straight, easy denim',text:'Dark indigo straight jeans keep the line comfortable and familiar beneath the knit.'},{title:'A proper casual runner',text:'Grey suede, mesh and a chunky dark-soled runner make the finish clearly casual, while the quiet grey sits easily with black and indigo.'}]
}});
// Retain the old first pick's shirt and trousers with a different shoe, changing all three slots from the new first pick.
outfitPool.set('1:Relaxed:1',{ids:[9,19,17]});
// Complete outfit photographs: never assemble mannequin bodies from image slices.
const cleanOutfitCatalog=[{"key":"0:Confident:0","ids":[0,1,2],"sheet":"assets/turn-denim.png","changedWeather":false,"wholePhoto":true},{"key":"1:Confident:0","ids":[3,19,5,11],"sheet":"assets/clean-outfits/1-confident-0.png","changedWeather":true,"wholePhoto":false},{"key":"2:Confident:0","ids":[15,6,8,16],"sheet":"assets/turn-date.png","changedWeather":false,"wholePhoto":true},{"key":"0:Approachable:0","ids":[6,7,2,13],"sheet":"assets/clean-outfits/0-approachable-0.png","changedWeather":true,"wholePhoto":false},{"key":"0:Polished:0","ids":[0,8,17],"sheet":"assets/look-polished.png","changedWeather":false,"wholePhoto":true},{"key":"0:Relaxed:0","ids":[9,19,5],"sheet":"assets/look-relaxed.png","changedWeather":false,"wholePhoto":true},{"key":"0:Sharp:0","ids":[10,7,17],"sheet":"assets/look-sharp.png","changedWeather":false,"wholePhoto":true},{"key":"0:Low-key:0","ids":[3,1,2,13],"sheet":"assets/clean-outfits/0-low-key-0.png","changedWeather":true,"wholePhoto":false},{"key":"0:Not sure:0","ids":[12,8,5],"sheet":"assets/look-not-sure.png","changedWeather":false,"wholePhoto":true},{"key":"1:Approachable:0","ids":[3,7,16,11],"sheet":"assets/clean-outfits/1-approachable-0.png","changedWeather":true,"wholePhoto":false},{"key":"1:Polished:0","ids":[6,8,17,11],"sheet":"assets/clean-outfits/1-polished-0.png","changedWeather":true,"wholePhoto":false},{"key":"1:Relaxed:0","ids":[10,1,20],"sheet":"assets/look-grey-runner-casual.png","changedWeather":false,"wholePhoto":true},{"key":"1:Sharp:0","ids":[10,1,5],"sheet":"assets/clean-outfits/1-sharp-0.png","changedWeather":false,"wholePhoto":false},{"key":"1:Low-key:0","ids":[12,19,16],"sheet":"assets/clean-outfits/1-low-key-0.png","changedWeather":true,"wholePhoto":false},{"key":"1:Not sure:0","ids":[0,7,17],"sheet":"assets/clean-outfits/1-not-sure-0.png","changedWeather":false,"wholePhoto":false},{"key":"2:Approachable:0","ids":[3,8,17,15],"sheet":"assets/clean-outfits/2-approachable-0.png","changedWeather":true,"wholePhoto":false},{"key":"2:Polished:0","ids":[6,19,2,15],"sheet":"assets/clean-outfits/2-polished-0.png","changedWeather":true,"wholePhoto":false},{"key":"2:Relaxed:0","ids":[9,1,5],"sheet":"assets/clean-outfits/2-relaxed-0.png","changedWeather":false,"wholePhoto":false},{"key":"2:Sharp:0","ids":[10,7,16],"sheet":"assets/clean-outfits/2-sharp-0.png","changedWeather":false,"wholePhoto":false},{"key":"2:Low-key:0","ids":[12,7,17],"sheet":"assets/clean-outfits/2-low-key-0.png","changedWeather":false,"wholePhoto":false},{"key":"2:Not sure:0","ids":[0,8,2],"sheet":"assets/clean-outfits/2-not-sure-0.png","changedWeather":false,"wholePhoto":false},{"key":"0:Confident:1","ids":[3,7,5,13],"sheet":"assets/clean-outfits/0-confident-1.png","changedWeather":true,"wholePhoto":false},{"key":"0:Approachable:1","ids":[3,8,5,13],"sheet":"assets/clean-outfits/0-approachable-1.png","changedWeather":true,"wholePhoto":false},{"key":"0:Polished:1","ids":[6,7,16,13],"sheet":"assets/clean-outfits/0-polished-1.png","changedWeather":true,"wholePhoto":false},{"key":"0:Relaxed:1","ids":[10,8,20],"sheet":"assets/look-grey-runner-everyday.png","changedWeather":false,"wholePhoto":true},{"key":"0:Sharp:1","ids":[12,19,2],"sheet":"assets/clean-outfits/0-sharp-1.png","changedWeather":false,"wholePhoto":false},{"key":"0:Low-key:1","ids":[12,7,5],"sheet":"assets/clean-outfits/0-low-key-1.png","changedWeather":false,"wholePhoto":false},{"key":"0:Not sure:1","ids":[0,7,16],"sheet":"assets/clean-outfits/0-not-sure-1.png","changedWeather":false,"wholePhoto":false},{"key":"1:Confident:1","ids":[0,7,2],"sheet":"assets/clean-outfits/1-confident-1.png","changedWeather":false,"wholePhoto":false},{"key":"1:Approachable:1","ids":[6,8,2,11],"sheet":"assets/clean-outfits/1-approachable-1.png","changedWeather":true,"wholePhoto":false},{"key":"1:Polished:1","ids":[9,19,16],"sheet":"assets/clean-outfits/1-polished-1.png","changedWeather":false,"wholePhoto":false},{"key":"1:Relaxed:1","ids":[9,19,17],"sheet":"assets/clean-outfits/1-relaxed-1.png","changedWeather":false,"wholePhoto":false},{"key":"1:Sharp:1","ids":[12,19,17],"sheet":"assets/clean-outfits/1-sharp-1.png","changedWeather":true,"wholePhoto":false},{"key":"1:Low-key:1","ids":[0,7,5],"sheet":"assets/clean-outfits/1-low-key-1.png","changedWeather":false,"wholePhoto":false},{"key":"1:Not sure:1","ids":[3,8,2,11],"sheet":"assets/clean-outfits/1-not-sure-1.png","changedWeather":true,"wholePhoto":false},{"key":"2:Confident:1","ids":[0,19,17],"sheet":"assets/clean-outfits/2-confident-1.png","changedWeather":false,"wholePhoto":false},{"key":"2:Approachable:1","ids":[6,19,5,15],"sheet":"assets/clean-outfits/2-approachable-1.png","changedWeather":true,"wholePhoto":false},{"key":"2:Polished:1","ids":[9,1,16],"sheet":"assets/clean-outfits/2-polished-1.png","changedWeather":false,"wholePhoto":false},{"key":"2:Relaxed:1","ids":[10,7,2],"sheet":"assets/clean-outfits/2-relaxed-1.png","changedWeather":false,"wholePhoto":false},{"key":"2:Sharp:1","ids":[12,8,17],"sheet":"assets/clean-outfits/2-sharp-1.png","changedWeather":false,"wholePhoto":false},{"key":"2:Low-key:1","ids":[0,8,5],"sheet":"assets/clean-outfits/2-low-key-1.png","changedWeather":false,"wholePhoto":false},{"key":"2:Not sure:1","ids":[3,19,5,15],"sheet":"assets/clean-outfits/2-not-sure-1.png","changedWeather":true,"wholePhoto":false}];
function coolDayGuidance(ids){
 const top=items[ids.find(id=>items[id].cat==='tops')],bottom=items[ids.find(id=>items[id].cat==='bottoms')],shoe=items[ids.find(id=>items[id].cat==='shoes')],layer=items[ids.find(id=>items[id].cat==='layers')];
 const coverage=layer?`At 17°C, the ${layer.name.toLowerCase()} adds light coverage over your ${top.name.toLowerCase()}.`:`The long-sleeved ${top.name.toLowerCase()} gives you light coverage for a cool 17°C day.`;
 const steps=[`Wear the ${top.name.toLowerCase()} untucked, with the hem sitting at the upper hip.`,...(layer?[`Wear the ${layer.name.toLowerCase()} open over the top; keep the sleeves comfortably at the wrist.`]:[]),`Let the ${bottom.name.toLowerCase()} fall straight, with the hems clear of your shoes.`,`Finish with the ${shoe.name.toLowerCase()}.`];
 return {short:`${layer?layer.name:top.name} & ${bottom.name}`,line:`${coverage} Full-length trousers keep the lower half covered.`,why:`${coverage} ${bottom.name} keep a comfortable, full-length line, and ${shoe.name.toLowerCase()} finish the outfit without adding a bright contrast.`,steps,stylistNote:layer?`Nigel: keep the light layer open at 17°C. You can close it if it feels breezy and remove it indoors.`:`Nigel: long sleeves and full-length trousers suit this cool 17°C day. Add a light layer if you feel the chill.`,reasonGroups:[{title:'Light coverage for 17°C',text:coverage},{title:'Full-length, comfortable trousers',text:`${bottom.name} cover your legs and keep the line comfortable for a cool day.`},{title:'A considered finish',text:`${shoe.name} work with the colours and shape of this outfit.`}]};
}
for(const row of cleanOutfitCatalog){const entry=outfitPool.get(row.key);entry.ids=[...row.ids];entry.sheet=row.sheet;if(row.changedWeather){delete entry.source;entry.copy=coolDayGuidance(row.ids);}}
function workOutfit() {
 const entry = outfitPool.get('2:Confident:0');
 return {...outfits[2],ids:entry.ids,sheet:entry.sheet,isSheet:true,contextual:true,
  why:'For a relaxed office dress code, the olive overshirt adds light structure over the white tee. Slate pleats and black loafers finish the outfit.'};
}
function selectedProfile(selection=state){return outfitPool.get(`${selection.occasion}:${selection.energy}:${+selection.alternate}`)?.source?.profile||null;}
const turnSheets=['denim','casual','date'];
const state={tab:'Today',todayTouched:false,timing:'now',planDate:'',morning:false,timingEditing:true,view:'Outfit',occasion:0,energy:'Confident',index:0,alternate:false,swap:null,filter:'All',liked:new Set(),anchor:null,fit:[],saved:[],logs:[],verdict:0,mix:'Owned',mixOpen:true,wardrobeView:'Rack',reasonIndex:0,editing:null,critique:null,savedIndex:null,railSelected:null,modelAngle:0};
const icons={Today:'<circle cx="12" cy="12" r="4"/><path d="M12 1v3m0 16v3M1 12h3m16 0h3M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2"/>',Wardrobe:'<path d="m8 3-5 3 2 6 3-1v10h8V11l3 1 2-6-5-3c0 4-8 4-8 0Z"/>',Shopping:'<path d="M6 3h12v18H6zM9 8h6m-6 4h6m-6 4 2 2 4-4"/>',Log:'<path d="M5 3h14v18H5zM9 7h6m-6 5h6m-6 5h4"/>'};
const garmentImages={"black bomber jacket": "assets/wardrobe/outer-01-front-320.webp", "olive cotton overshirt": "assets/wardrobe/outer-02-front-320.webp", "navy unstructured blazer": "assets/wardrobe/outer-03-front-320.webp", "charcoal wool coat": "assets/wardrobe/outer-04-front-320.webp", "white heavyweight t-shirt": "assets/wardrobe/top-01-front-320.webp", "washed black t-shirt": "assets/wardrobe/top-02-front-320.webp", "navy and ecru striped t-shirt": "assets/wardrobe/top-03-front-320.webp", "white oxford shirt": "assets/wardrobe/top-04-front-320.webp", "pale blue relaxed shirt": "assets/wardrobe/top-05-front-320.webp", "heather grey hoodie": "assets/wardrobe/top-06-front-320.webp", "charcoal crewneck sweater": "assets/wardrobe/top-07-front-320.webp", "beige pleated trousers": "assets/wardrobe/bottom-01-front-320.webp", "black wide straight trousers": "assets/wardrobe/bottom-02-front-320.webp", "dark indigo straight jeans": "assets/wardrobe/bottom-03-front-320.webp", "olive fatigue trousers": "assets/wardrobe/bottom-04-front-320.webp", "white leather sneakers": "assets/wardrobe/shoe-01-front-320.webp", "grey suede sneakers": "assets/wardrobe/shoe-02-front-320.webp", "black leather loafers": "assets/wardrobe/shoe-03-front-320.webp", "cobalt merino sweater": "assets/wardrobe/top-08-front-320.webp", "burgundy knit polo": "assets/wardrobe/top-09-front-320.webp", "emerald overshirt": "assets/wardrobe/top-10-front-320.webp", "black denim jacket": "assets/wardrobe/outer-05-front-320.webp", "slate pleated trousers": "assets/wardrobe/bottom-05-front-320.webp", "black suede clogs": "assets/wardrobe/shoe-04-front-320.webp", "black chelsea boots": "assets/wardrobe/shoe-05-front-320.webp", "black canvas sneakers": "assets/wardrobe/shoe-06-front-320.webp", "black tailored shorts": "assets/wardrobe/bottom-06-front-320.webp", "ink navy heavyweight t-shirt": "assets/wardrobe/top-11-front-320.webp", "charcoal tapered ankle trousers": "assets/wardrobe/bottom-07-front-320.webp", "midnight navy cargo trousers": "assets/wardrobe/bottom-08-front-320.webp"};
function stoneLoaferThumbnail(p){return `<img src="assets/stone-loafers-owned.png" alt="${escapeHTML(p.name)}" loading="lazy" width="640" height="640">`;}
function garment(p){if(p.id===20)return `<img src="assets/grey-nb-996-runner.png" alt="${escapeHTML(p.name)}" loading="lazy" width="640" height="640">`;if(p.id===11)return `<img src="assets/rack/oatmeal-cardigan.png" alt="${escapeHTML(p.name)}" width="320" height="320" loading="eager">`;if(p.id===17)return stoneLoaferThumbnail(p);if(garmentImages[p.imageKey||p.name.toLowerCase()])return `<img src="${garmentImages[p.imageKey||p.name.toLowerCase()]}" alt="${p.name}" loading="lazy" width="320" height="320">`;let shape=p.cat==='tops'||p.cat==='layers'?'<path d="m33 15-21 11 10 27 13-5v66h60V48l13 5 10-27-21-11-17-5c-5 12-16 12-21 0Z"/>':p.cat==='bottoms'?'<path d="M33 12h64l5 101H76L65 48 54 113H28Z"/>':'<path d="M21 61c4-17 9-28 18-28 13 0 10 22 26 28l38 14c12 5 13 19 0 22H24c-17 0-19-24-3-36Z"/><path d="m44 42 37 17c14 6 21-2 21-13l-4-23c-4-10-17-10-22-2L64 34Z"/>';return `<svg viewBox="0 0 130 130" role="img" aria-label="${p.name}"><g fill="${p.color}" stroke="#000" stroke-opacity=".13" stroke-width="1.5">${shape}</g><path d="M43 24v74m43-74v74" stroke="#fff" stroke-opacity=".12" fill="none"/></svg>`}
function btn(t,a,cls=''){return `<button class="${cls}" ${a}>${t}</button>`}function dismissToast(){
 clearTimeout(window.toastTimer);
 $('#toast').classList.remove('show');
}
function toast(message, persistent=false){
 dismissToast();
 $('#toast-message').textContent=message;
 $('#toast').classList.add('show');
 if(!persistent)window.toastTimer=setTimeout(dismissToast,2500);
}
function current(){if(state.occasion===3)return workOutfit();const key=`${state.occasion}:${state.energy}:`;const first=outfitPool.get(key+0),second=outfitPool.get(key+1);const entry=rankedAlternate(first.ids,second.ids)?second:first;const base=outfits[state.occasion];let o;if(entry.source?.base!==undefined)o={...outfits[entry.source.base]};else if(entry.source?.profile){const key=entry.source.profile,p=lookProfiles[key];o={...base,stylistNote:undefined,line:p.why,short:profileTags[key],ids:p.ids,image:p.sheet,sheet:p.sheet,isSheet:true,why:p.why,steps:p.steps,reasonGroups:p.reasons.map((text,i)=>({title:['The top','The lower line','The finish'][i],text}))};}else {const [top,bottom,shoe]=entry.ids.map(id=>items[id]);const texts=[`${top.name} sets a ${state.energy.toLowerCase()} tone for ${occasions[state.occasion].toLowerCase()}.`,`${bottom.name} keep a straight, comfortable line below the top.`,`${shoe.name} finish the outfit in a ${shoe.style.toLowerCase()} way.`];o={...base,stylistNote:undefined,ids:entry.ids,short:`${top.name} & ${bottom.name}`,composed:true,isSheet:false,why:texts.join(' '),line:texts[1],steps:[`Wear the ${top.name.toLowerCase()} untucked, with the hem sitting neatly at the hip.`,`Add the ${bottom.name.toLowerCase()}; let the fabric fall naturally.`,`Finish with the ${shoe.name.toLowerCase()}, keeping the hems clear of the shoes.`],reasonGroups:texts.map((text,i)=>({title:['The top','The lower line','The finish'][i],text}))};}if(entry.copy)o={...o,...entry.copy};return {...o,composed:false,isSheet:true,sheet:entry.sheet,weather:weatherLabel(),requireLayer:false};}
// Small changes are suggestions only, never a hidden mutation of the worn outfit.
function ids(){return [...current().ids];}
function smallChanges(){const shown=ids();return shown.filter(from=>items[from].cat!=='bottoms').map(from=>{const preferred=items[from].cat==='tops'?6:items[from].cat==='shoes'?(from===5?2:5):items[from].cat==='layers'?13:7;const replacement=(!shown.includes(preferred)&&items[preferred].cat===items[from].cat?items[preferred]:items.find(p=>p.cat===items[from].cat&&!shown.includes(p.id)));return replacement?{from,to:replacement.id,note:`Consider ${replacement.name} instead of ${items[from].name}. This is a note only; the displayed outfit and wear log stay as shown.`}:null;}).filter(Boolean).slice(0,2);}
let rackCarousel;
let modelRenderRevision=0;
let committedTodayState=null;
const todayRenderKeys=['rankStyle','occasion','energy','index','alternate','swap','modelAngle','reasonIndex','timing','timingEditing','planDate'];
async function render({top=false}={}){const previousTab=$('#screen').className;const revision=++modelRenderRevision;if(state.tab==='Today'&&outfitVisible())preloadTodayModels();let content=({Today:today,Wardrobe:wardrobe,Shopping:verdict,Log:log})[state.tab]();let views=state.tab==='Today'?content.match(/<div class="segmented" aria-label="Today views">[\s\S]*?<\/div>/)?.[0]:'';if(views)content=content.replace(views,'');let page=null;
if(state.tab==='Today'&&outfitVisible()&&window.Image){page=document.createElement('div');page.className='page';page.innerHTML=content;const viewer=page.querySelector('#model-viewer');if(viewer){const screen=$('#screen'),bar=$('#today-wear-bar');screen.setAttribute('aria-busy','true');const enabled=[...screen.querySelectorAll('.stylist-pick button:not(:disabled), #outfit-intake button:not(:disabled)')];enabled.forEach(button=>button.disabled=true);if(committedTodayState){if($('#occasion'))$('#occasion').value=String(committedTodayState.occasion);if($('#energy'))$('#energy').value=committedTodayState.energy;}try{await Promise.all([...viewer.querySelectorAll('img')].map(image=>image.decode()));const sheet=viewer.querySelector('.model-turn-sheet');if(sheet?.naturalWidth)viewer.querySelector('.model-turn-clip').style.aspectRatio=String(sheet.naturalWidth/4/sheet.naturalHeight);}catch(error){if(revision===modelRenderRevision){if(committedTodayState)Object.assign(state,committedTodayState);screen.removeAttribute('aria-busy');enabled.forEach(button=>button.disabled=false);toast('Outfit image could not load. Please try again.');}return;}if(revision!==modelRenderRevision)return;}}
if(revision!==modelRenderRevision)return;if(rackCarousel){rackCarousel.destroy();rackCarousel=null;}$('#tabs').innerHTML=Object.keys(icons).map(t=>btn(`<svg viewBox="0 0 24 24" aria-hidden="true">${icons[t]}</svg>${t}`,`data-tab="${t}" aria-current="${t===state.tab?'page':'false'}"`,t===state.tab?'active':'')).join('');$('#screen').className='screen-'+state.tab.toLowerCase();$('#screen').classList.toggle('today-has-wear-bar',state.tab==='Today'&&wearBarVisible());if(page)$('#screen').replaceChildren(page);else $('#screen').innerHTML=`<div class="page">${content}</div>`;$('#screen').removeAttribute('aria-busy');if(top||previousTab!==$('#screen').className){$('#screen').scrollTo({top:0,behavior:'instant'});dismissToast();}$('#today-views').innerHTML=views||'';$('#today-views').hidden=!views;const footer=document.querySelector('.app-shell>footer');if(footer)footer.textContent=state.tab==='Wardrobe'?'Wardrobe edits stay in this browser.':state.tab==='Log'?'Activity is stored in this browser.':'Wardrobe edits stay in this browser. Demo log resets on reload.';let wearBar=$('#today-wear-bar');if(state.tab==='Today'&&wearBarVisible()){if(!wearBar){wearBar=document.createElement('div');wearBar.id='today-wear-bar';$('#tabs').before(wearBar);}wearBar.innerHTML=todayWearBar();wearBar.inert=false;}else if(wearBar)wearBar.remove();if(state.tab==='Today')committedTodayState=Object.fromEntries(todayRenderKeys.map(key=>[key,state[key]]));applyRecordingPresentation();bind();bindToday();bindEditor();mountRack();if(window.requestAnimationFrame)bindModelViewer();}
const historyKey = metadataKey + '.history.v2';
const stylePreferenceKey = metadataKey + '.my-style';
const legacyPlanKey = metadataKey + '.planned-outfit';
const categories = ['tops','layers','bottoms','shoes'];
let accepted = new Set();
let plans = [];
let undatedPlan = null;
let savedFits = [];
let darkPreference = false;
const aesthetics = ['No preference','East Asian Minimalist','Streetwear','Smart Casual','Classic','Workwear'];
let myStyle = aesthetics[0];
const primaryImpressions = ['Confident','Relaxed','Polished'];
function fitStyleScore(ids, aesthetic) {
 return ids.reduce((score,id)=>score+(pieceStyles(items[id]).includes(aesthetic)?1:0),0);
}
function pieceStyles(piece) {
 const label=mixPrimaryStyle(piece).toLowerCase();
 const extra=/chore|barbour|overshirt|work jacket/i.test(piece.name)?['Workwear']:[];
 return [...aesthetics.filter(style=>style.toLowerCase()===label),...extra];
}
function rankedAlternate(first, second) {
 const style=state.rankStyle||aesthetics[0];
 const preferSecond=style!==aesthetics[0]&&fitStyleScore(second,style)>fitStyleScore(first,style);
 return Boolean(state.alternate)!==preferSecond;
}
function styleExplanation(outfit) {
 const style=state.rankStyle;
 if(!style||style===aesthetics[0])return '';
 const match=outfit.ids.map(id=>items[id]).find(piece=>pieceStyles(piece).includes(style));
 return match?` The ${match.name.toLowerCase()} brings in your ${style} preference.`:
  ` The photographed options for this occasion are limited. This pick answers the occasion, with no clear ${style} match in the outfit shown.`;
}
function tomorrowDate(now = new Date()) {
 const tomorrow=new Date(now);
 tomorrow.setDate(tomorrow.getDate()+1);
 return localDate(tomorrow);
}
let recordingActivity = null;

function localDate(date = new Date()) {
 return [date.getFullYear(),date.getMonth()+1,date.getDate()].map(part=>String(part).padStart(2,'0')).join('-');
}
function validDate(value) {
 return typeof value==='string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && localDate(new Date(value+'T12:00:00'))===value;
}
function displayDate(value) {
 return new Intl.DateTimeFormat('en',{weekday:'short',month:'short',day:'numeric',year:'numeric'}).format(new Date(value+'T12:00:00'));
}
function orderPieces(ids) {
 return [...ids].sort((a,b)=>categories.indexOf(items[a].cat)-categories.indexOf(items[b].cat));
}
function validFit(ids) {
 return Array.isArray(ids)&&ids.length>0&&ids.length<=items.length&&new Set(ids).size===ids.length&&ids.every(id=>Number.isInteger(id)&&items[id]);
}
function persist() {
 if(recordingActivity)return;
 try {
  localStorage.setItem(historyKey,JSON.stringify({saved:state.saved,savedFits,logs:state.logs,liked:[...state.liked],plans,accepted:[...accepted],dark:darkPreference,draft:state.fit,anchor:state.anchor}));
  return true;
 } catch {return false;}
}
function validPlanChoices(plan) {
 return plan&&Number.isInteger(plan.occasion)&&occasions[plan.occasion]&&availableImpressions(plan.occasion).includes(plan.energy)&&typeof plan.alternate==='boolean';
}
function loadPlan() {
 try {
  const storedStyle=localStorage.getItem(stylePreferenceKey);
  if(aesthetics.includes(storedStyle))myStyle=storedStyle;
 } catch {}
 try {
  const previous=JSON.parse(localStorage.getItem(legacyPlanKey));
  if(validPlanChoices(previous))undatedPlan=previous;
 } catch {}
 let saved;
 try { saved=JSON.parse(localStorage.getItem(historyKey)); } catch {}
 if (!saved || typeof saved!=='object') return;
 const rows=key=>Array.isArray(saved[key])?saved[key]:[];
 state.saved=rows('saved').filter(validFit).map(orderPieces);
 savedFits=rows('savedFits').filter(validFit).map(orderPieces);
 state.logs=rows('logs').filter(row=>row&&validDate(row.date)&&validFit(row.ids)&&['wore','skipped'].includes(row.type)&&typeof row.name==='string');
 state.liked=new Set(rows('liked').filter(id=>Number.isInteger(id)&&items[id]));
 accepted=new Set(rows('accepted').filter(key=>typeof key==='string'));
 plans=rows('plans').filter(plan=>validPlanChoices(plan)&&validDate(plan.date));
 darkPreference=saved.dark===true;
 if(validFit(saved.draft)&&saved.draft.includes(saved.anchor)) {
  state.fit=orderPieces(saved.draft);
  state.anchor=saved.anchor;
 }
}
function outfitDate() {
 return state.timing==='soon'?state.planDate:localDate();
}
function outfitKey() {
 return [outfitDate(),state.occasion,state.energy,...orderPieces(ids())].join(':');
}
function outfitVisible() {
 return Boolean(state.timing) && !state.timingEditing;
}

function wearBarVisible() {
 return false;
}

function todayWearBar() {
 return '';
}

function todayTiming() {
 return `<div class="today-timing" role="group" aria-label="Outfit timing">${[['now','Dress now'],['soon','Plan ahead']].map(([mode,label])=>btn(label,`data-timing="${mode}" aria-pressed="${state.timing===mode}"`,state.timing===mode?'active':'')).join('')}</div>`;
}

function availableImpressions(occasion) {
 return occasion === 3 ? ['Confident','Approachable','Polished','Relaxed','Low-key'] : impressions;
}

function impressionOptions() {
 const supported=availableImpressions(state.occasion);
 const primary=primaryImpressions.filter(name=>supported.includes(name));
 const extra=supported.filter(name=>!primary.includes(name));
 const chips=names=>names.map(name=>choiceChip('impression',name,name,state.energy===name)).join('');
 return `<div class="choice-chips impressions">${chips(primary)}${extra.includes(state.energy)&&!state.moreImpressions?chips([state.energy]):''}</div>
  <button type="button" id="more-impressions" aria-expanded="${Boolean(state.moreImpressions)}" aria-controls="extra-impressions">${state.moreImpressions?'Fewer options':'More options'}</button>
  <div class="choice-chips" id="extra-impressions" ${state.moreImpressions?'':'hidden'}>${state.moreImpressions?chips(extra):''}</div>`;
}
function choiceChip(group,value,label,checked) {
 return `<label class="choice-chip"><input type="radio" name="${group}" value="${value}" ${checked?'checked':''}><span>${label}</span></label>`;
}
function planDateControls() {
 const tomorrow=tomorrowDate();
 const other=state.otherDate||state.recoveringPlan||state.planDate!==tomorrow;
 return `<fieldset><legend>Outfit date</legend><div class="choice-chips date-chips">
  ${choiceChip('day','tomorrow','Tomorrow · '+displayDate(tomorrow),!other)}
  ${choiceChip('day','other','Other date',other)}
 </div>${other?`<label for="plan-date">Choose a date</label><input id="plan-date" type="date" required min="${localDate()}" value="${state.planDate}">`:''}</fieldset>`;
}
function today() {
 if (!outfitVisible()) {
  return `<section class="stylist-intake">
   <h2>Let’s get dressed.</h2>
   ${todayTiming()}
   <form id="outfit-intake" class="stylist-form">
    ${state.timing==='soon'?planDateControls():''}
    <fieldset><legend>Occasion</legend><div class="choice-chips occasion-chips">${occasions.map((name,i)=>choiceChip('occasion',i,name,state.occasion===i)).join('')}</div></fieldset>
    <fieldset><legend>How do you want to come across?</legend><div id="impression-options">${impressionOptions()}</div></fieldset>
    <button class="primary" id="lock-tomorrow">Find my outfit</button>
   </form>
  </section>`;
 }
 const o = current();
 const isAccepted = accepted.has(outfitKey());
 const planned=state.timing==='soon';
 const canLog=outfitDate()<=localDate();
 const saved = state.saved.some(fit=>fit.join(',')===orderPieces(o.ids).join(','));
 const lead = ({Confident:'You wanted to look confident.',Approachable:'You wanted an approachable look.',Polished:'You wanted to look polished.',Relaxed:'You wanted to look relaxed.',Sharp:'You wanted a sharper look.','Low-key':'You wanted to keep it low-key.'})[state.energy];
 const swaps = smallChanges();
 const wear = currentWearLog();
 return `<article class="today-flow stylist-pick">
  <section class="daily-outfit" aria-label="Nigel’s pick">
   <div class="pick-tools">${btn('‹','id="change-choices" aria-label="Change styling choices"')}<span class="stylist-label">Nigel’s pick</span>${btn(`<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h12v16l-6-4-6 4z" fill="${saved?'currentColor':'none'}" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>`,`id="save-recommendation" aria-label="${saved?'Outfit saved':'Save outfit'}" ${saved?'disabled':''}`)}</div>
   <p class="pick-context">${occasions[state.occasion]} · ${state.energy}${planned?' · '+displayDate(outfitDate()):''}</p>
   <h2>${escapeHTML(o.short||o.name)}</h2>
   <div class="pick-photo">${modelViewer(o)}
   <p class="frame-status" id="model-turn-hint">${['Front','Right side','Back','Left side'][state.modelAngle]} · Four views</p></div></section>
   <div class="pick-details"><section>
   <p class="section-label wardrobe-source">From your wardrobe</p>
   <div class="outfit-piece-strip">${orderPieces(o.ids).map(id=>`<div class="outfit-piece-thumb" title="${escapeHTML(items[id].name)}">${garment(items[id])}<span>${escapeHTML(items[id].shortName||items[id].name)}</span></div>`).join('')}</div>
   ${o.photoNote?`<p class="photo-note">${escapeHTML(o.photoNote)}</p>`:''}
  </section>
  <section class="daily-why"><p class="stylist-label">Nigel</p><h3>Why I picked this for you</h3><p>${o.contextual?'':lead?lead+' ':''}${escapeHTML(o.why+styleExplanation(o))}</p></section>
  <section class="daily-wear"><h3><span aria-hidden="true">↳</span> Wear it like this</h3><p>${escapeHTML(o.steps[0])}</p>
   ${o.steps.length>1?`<details><summary>More styling tips</summary><ul>${o.steps.slice(1).map(step=>`<li>${escapeHTML(step)}</li>`).join('')}</ul></details>`:''}
  </section>
  <section class="pick-actions" aria-label="Outfit actions">
   ${btn(isAccepted?(planned?'Outfit planned':'Outfit accepted'):(planned?'Plan this outfit':'I’ll wear this'),`id="accept-outfit" ${isAccepted?'disabled':''}`,'primary')}
   ${isAccepted&&planned?btn('View in Log','id="view-plan-log"'):''}
   ${isAccepted&&canLog?`<div class="wear-confirmation">${btn('Wore it',`data-log="wore" aria-pressed="${hasLoggedCurrent('wore')}"`)}${btn('Didn’t wear it',`data-log="skipped" aria-pressed="${hasLoggedCurrent('skipped')}"`)}</div>`:''}
   ${isAccepted&&canLog&&wear?.type==='skipped'?`<label for="skip-reason">Why didn’t you wear it? (Optional)</label><select id="skip-reason"><option value="">Choose a reason</option>${skipReasons.map(reason=>`<option ${wear.reason===reason?'selected':''}>${reason}</option>`).join('')}</select>`:''}
   <div class="pick-secondary">${btn(state.alternate||state.occasion===3?'No more picks for this plan':'Another outfit',`id="another-outfit" ${state.alternate||state.occasion===3?'disabled':''}`)}${btn('Change a piece','id="refine-pick"')}</div>
   ${swaps.length?`<details class="change-piece"><summary>Nigel’s styling alternatives</summary><p>Styling suggestions for the outfit shown.</p>${swaps.map(({from,to,note})=>btn(escapeHTML(items[to].name),`data-swap="${from},${to}" data-note="${escapeHTML(note)}"`)).join(' ')}${state.swap?`<p>${escapeHTML(state.swap.note)}</p>`:''}</details>`:''}
  </section></div>
 </article>`;
}

function bindToday() {
 const form=$('#outfit-intake');
 if(form){
  const bindImpressions=()=>{
   $('#more-impressions').onclick=()=>{
    state.moreImpressions=!state.moreImpressions;
    $('#impression-options').innerHTML=impressionOptions();
    bindImpressions();
    $('#more-impressions').focus();
   };
  };
  bindImpressions();
  form.onchange=event=>{
   const fields=new FormData(form);
   state.occasion=Number(fields.get('occasion'));
   state.energy=fields.get('impression');
   if(!availableImpressions(state.occasion).includes(state.energy))state.energy=availableImpressions(state.occasion)[0];
   if(event.target.name==='occasion'){
    $('#impression-options').innerHTML=impressionOptions();
    bindImpressions();
   }
   if(event.target.name==='impression'&&!state.moreImpressions&&$('#impression-options .impressions').children.length>primaryImpressions.length){
    $('#impression-options').innerHTML=impressionOptions();
    bindImpressions();
    form.querySelector('input[name="impression"]:checked')?.focus();
   }
   if(event.target.name==='day'){
    state.otherDate=fields.get('day')==='other';
    state.planDate=state.otherDate?'':tomorrowDate();
    render().then(()=>($('[name="day"]:checked'))?.focus({preventScroll:true}));
   }
   if(event.target.id==='plan-date')state.planDate=event.target.value;
  };
  form.onsubmit=event=>{
   event.preventDefault();
   const fields=new FormData(form);
   state.occasion=Number(fields.get('occasion'));
   state.energy=fields.get('impression');
   if(state.timing==='soon')state.planDate=$('#plan-date')?.value||tomorrowDate();
   state.rankStyle=myStyle;
   state.timingEditing=false;
   choose();
   render({top:true});
  };
 }
 document.querySelectorAll('[data-timing]').forEach(button=>button.onclick=()=>{
  if(state.timing===button.dataset.timing)return;
  state.timing=button.dataset.timing;
  if(state.timing==='soon'&&!state.planDate){state.planDate=tomorrowDate();state.otherDate=false;}
  render().then(()=>$('[data-timing][aria-pressed="true"]')?.focus({preventScroll:true}));
 });
 if($('#view-plan-log'))$('#view-plan-log').onclick=()=>{state.tab='Log';render({top:true}).then(()=>$('#tabs [data-tab="Log"]').focus());};
 if($('#change-choices'))$('#change-choices').onclick=()=>{
  state.timingEditing=true;
  render({top:true}).then(()=>$('#outfit-intake input')?.focus({preventScroll:true}));
 };
 if($('#skip-reason'))$('#skip-reason').onchange=event=>{
  currentWearLog().reason=event.target.value;
  persist();
 };
 if($('#accept-outfit'))$('#accept-outfit').onclick=()=>{
  accepted.add(outfitKey());
  if(state.timing==='soon'){
   const plan={date:outfitDate(),occasion:state.occasion,energy:state.energy,alternate:state.alternate,rankStyle:state.rankStyle};
   plans=plans.filter(row=>row.date!==plan.date);
   plans.push(plan);
   if(state.recoveringPlan&&!recordingActivity&&persist()){
    undatedPlan=null;
    state.recoveringPlan=false;
    try{localStorage.removeItem(legacyPlanKey);}catch{}
   }
  }
  persist();
  render();
 };
 if($('#recover-plan'))$('#recover-plan').onclick=()=>{
  Object.assign(state,{tab:'Today',timing:'soon',timingEditing:true,planDate:'',otherDate:true,occasion:undatedPlan.occasion,energy:undatedPlan.energy,recoveringPlan:true});
  render({top:true}).then(()=>$('#plan-date')?.focus({preventScroll:true}));
 };
 document.querySelectorAll('[data-plan-date]').forEach(button=>button.onclick=()=>{
  const plan=plans.find(row=>row.date===button.dataset.planDate);
  Object.assign(state,plan,{tab:'Today',timing:'soon',planDate:plan.date,otherDate:plan.date!==tomorrowDate(),rankStyle:aesthetics.includes(plan.rankStyle)?plan.rankStyle:aesthetics[0],index:plan.occasion,modelAngle:0,timingEditing:false});
  render({top:true});
 });
 if ($('#refine-pick')) $('#refine-pick').onclick = ()=>{
  if(state.fit.length && !window.confirm('Replace the active draft with this outfit?')) return;
  state.fit = orderPieces(ids());
  state.anchor = state.fit.find(id=>items[id].cat==='tops') ?? state.fit[0];
  state.savedIndex = null;
  state.critique = null;
  state.filter = 'All';
  state.wardrobeView = 'List';
  state.tab = 'Wardrobe';
  persist();
  render();
  $('#screen').scrollTop = 0;
 };
 if ($('#save-recommendation')) $('#save-recommendation').onclick = ()=>{
  state.saved.push(orderPieces(ids()));
  persist();
  render();
  toast('Outfit saved.');
 };
}
function frameViewer(outfit) {
 const labels = ['Front','Right side','Back','Left side'];
 const angle = state.modelAngle;
 return `<div class="photo-wrap model-viewer frame-viewer" id="model-viewer" role="slider" tabindex="0" aria-label="Turn outfit model" aria-valuemin="0" aria-valuemax="270" aria-valuenow="${angle*90}" aria-valuetext="${labels[angle]}" aria-describedby="model-turn-hint">
  <div class="outfit-frames">${outfit.frames.map((src,i)=>`<img draggable="false" src="${src}" data-frame="${i}" alt="${labels[i]} view of ${escapeHTML(outfit.name)}" ${i===angle?'':'hidden'} width="1086" height="1448">`).join('')}</div>
  ${btn('‹','id="model-prev" aria-label="Previous angle"','model-turn-arrow model-turn-prev')}${btn('›','id="model-next" aria-label="Next angle"','model-turn-arrow model-turn-next')}

 </div>`;
}
function modelViewer(o){if(o.frames)return frameViewer(o);const sheet=o.sheet||`assets/turn-${turnSheets[state.index]}.png`;const label=['Front','Right side','Back','Left side'][state.modelAngle];const useSheet=o.isSheet||state.modelAngle!==0;return `<div class="photo-wrap model-viewer" id="model-viewer" role="slider" tabindex="0" aria-label="Turn outfit model" aria-valuemin="0" aria-valuemax="270" aria-valuenow="${state.modelAngle*90}" aria-valuetext="${label} view, ${o.short}" aria-describedby="model-turn-hint"><img class="outfit-photo" src="${o.isSheet?sheet:o.image}" alt="Faceless mannequin wearing ${o.ids.map(i=>items[i].name).join(', ')}" style="visibility:${useSheet?'hidden':'visible'}"><div class="model-turn-overlay" ${useSheet?'':'hidden'}><div class="model-turn-clip"><img class="model-turn-sheet" draggable="false" src="${sheet}" alt="${label} view of ${o.ids.map(i=>items[i].name).join(', ')}" style="transform:translateX(-${state.modelAngle*25}%)"></div></div>${btn('‹','id="model-prev" aria-label="Previous angle"','model-turn-arrow model-turn-prev')}${btn('›','id="model-next" aria-label="Next angle"','model-turn-arrow model-turn-next')}</div>`;}
function bindModelViewer(){const viewer=$('#model-viewer');if(!viewer)return;const labels=['Front','Right side','Back','Left side'];const show=angle=>{if($('#screen').getAttribute('aria-busy')==='true')return;state.modelAngle=((angle%labels.length)+labels.length)%labels.length;if(viewer.classList.contains('frame-viewer')){viewer.querySelectorAll('[data-frame]').forEach(frame=>frame.hidden=Number(frame.dataset.frame)!==state.modelAngle);}else{const useSheet=current().isSheet||state.modelAngle!==0;viewer.querySelector('.outfit-photo').style.visibility=useSheet?'hidden':'visible';viewer.querySelector('.model-turn-overlay').hidden=!useSheet;viewer.querySelector('.model-turn-sheet').style.transform=`translateX(-${state.modelAngle*25}%)`;viewer.querySelector('.model-turn-sheet').alt=`${labels[state.modelAngle]} view of ${current().short}`;}$('#model-turn-hint').textContent=`${labels[state.modelAngle]} · Four views`;viewer.setAttribute('aria-valuenow',String(state.modelAngle*90));viewer.setAttribute('aria-valuetext',`${labels[state.modelAngle]} view, ${current().short}`);};const image=viewer.querySelector('.model-turn-sheet');image?.decode().then(()=>{viewer.querySelector('.model-turn-clip').style.aspectRatio=String(image.naturalWidth/4/image.naturalHeight);}).catch(()=>{$('#model-turn-hint').textContent='Turn views unavailable. Please reload.';});$('#model-prev').onclick=()=>show(state.modelAngle-1);$('#model-next').onclick=()=>show(state.modelAngle+1);viewer.onkeydown=e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();show(state.modelAngle+(e.key==='ArrowRight'?1:-1));}else if(e.key==='Home'){e.preventDefault();show(0);}};let drag=null;viewer.onpointerdown=e=>{if(!e.isPrimary||e.button!==0||e.target.closest('button'))return;drag={x:e.clientX,y:e.clientY,index:state.modelAngle,id:e.pointerId};};viewer.onpointermove=e=>{if(!drag||e.pointerId!==drag.id)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(Math.abs(dy)>Math.abs(dx)&&Math.abs(dy)>12){drag=null;return;}if(Math.abs(dx)>12){if(!viewer.hasPointerCapture(e.pointerId))viewer.setPointerCapture(e.pointerId);show(drag.index+Math.sign(-dx)*Math.max(1,Math.round(Math.abs(dx)/45)));}};viewer.onlostpointercapture=()=>{drag=null;};viewer.onpointerup=viewer.onpointercancel=e=>{if(viewer.hasPointerCapture(e.pointerId))viewer.releasePointerCapture(e.pointerId);drag=null;};}
function reasonCards(o){const active=state.reasonIndex%o.reasonGroups.length;return `<div class="reason-cards" role="group" aria-label="Why this outfit works">${o.reasonGroups.map((r,i)=>btn(`<strong>${r.title}</strong><span>${r.text}</span>`,`data-reason="${i}" aria-pressed="${active===i}"`,active===i?'reason-card active':'reason-card')).join('')}</div>`;}
function wardrobeEditor(){const p=items[state.editing];const input=(key,label)=>`<label>${label}<input name="${key}" value="${escapeHTML(p[key])}" maxlength="${key==='name'?80:100}"></label>`;const select=(key,label,options)=>`<label>${label}<select name="${key}">${options.map(v=>`<option value="${v}" ${p[key]===v?'selected':''}>${v}</option>`).join('')}</select></label>`;return `<section class="wardrobe-edit-panel" aria-labelledby="edit-title"><div class="editor-title"><div><p class="section-label">PIECE ${String(p.id+1).padStart(2,'0')}</p><h3 id="edit-title">The details matter.</h3></div>${btn('×','id="close-editor" aria-label="Close clothing editor"')}</div><div class="editor-preview">${garment(p)}</div><form id="piece-editor"><div class="editor-fields">${input('name','Piece name')}${select('cat','Category',['tops','bottoms','shoes','layers'])}${input('colour','Colour')}${input('material','Material')}${select('fit','Fit',['Not tagged','Slim','Regular','Relaxed','Oversized','Straight','Tapered'])}${select('pattern','Pattern',['Plain','Striped','Checked','Printed','Textured','Other'])}<label>Seasons<input name="seasons" value="${escapeHTML(p.seasons.join(', '))}" placeholder="Spring, summer"></label><label>Occasions<input name="occasions" value="${escapeHTML(p.occasions.join(', '))}" placeholder="Everyday, work"></label><label class="full">Notes<textarea name="notes" rows="3" maxlength="500" placeholder="Fit notes, care, or details to remember">${escapeHTML(p.notes)}</textarea></label></div><p class="editor-message" id="editor-message" role="status">Use commas to separate season and occasion tags.</p><div class="actions">${btn('Save details','type="submit"','primary')}${btn('Cancel','type="button" id="cancel-editor"')}</div></form></section>`;}
function applyPieceEdits(id,values){if(!/^[^<>"&`]{1,80}$/.test(values.name?.trim()||''))throw Error('Use a piece name of 1–80 characters without markup.');if(!['tops','bottoms','shoes','layers'].includes(values.cat))throw Error('Choose a valid category.');const p=items[id];p.name=values.name.trim();p.cat=values.cat;for(const key of ['colour','material','fit','pattern','notes'])p[key]=String(values[key]||'').trim().slice(0,key==='notes'?500:100);for(const key of ['seasons','occasions'])p[key]=String(values[key]||'').split(',').map(x=>x.trim()).filter(Boolean).slice(0,12);return saveWardrobe();}
function bindEditor(){document.querySelectorAll('[data-edit-piece]').forEach(b=>b.onclick=()=>{state.editing=+b.dataset.editPiece;render();$('#screen').scrollTop=0;});for(const id of ['close-editor','cancel-editor'])if($('#'+id))$('#'+id).onclick=()=>{state.editing=null;render();};if($('#piece-editor'))$('#piece-editor').onsubmit=e=>{e.preventDefault();const values=Object.fromEntries(new FormData(e.currentTarget));try{const saved=applyPieceEdits(state.editing,values);state.editing=null;render();toast(saved?'Clothing details saved on this browser.':'Details updated for this session. Browser storage is unavailable.');}catch(error){$('#editor-message').textContent=error.message;}};if($('#export-wardrobe'))$('#export-wardrobe').onclick=exportWardrobe;}
function compatible(p){if(p.id===20){if(state.fit.includes(p.id))return true;if(state.fit.some(id=>items[id].cat==='shoes'))return false;return state.fit.some(id=>[1,3,6,9,12,18,19,4].includes(id))&&!state.fit.some(id=>[8,15].includes(id));}if(!state.fit.length)return true;let anchor=items[state.anchor];return p.id===state.anchor||!state.fit.some(id=>items[id].cat===p.cat)&&(anchor.style===p.style||p.style==='Everyday'||anchor.style==='Everyday'||['shoes','layers'].includes(p.cat))}
function complete(){return (current().requireLayer?['tops','bottoms','shoes','layers']:['tops','bottoms','shoes']).every(c=>state.fit.some(i=>items[i].cat===c))}
function wardrobe(){let shown=items.filter(p=>(state.filter==='All'||p.cat===state.filter.toLowerCase()));return `<div class="topline"><span>YOUR CLOSET</span><span>${items.length} PIECES</span></div><h2>Your wardrobe</h2><p class="sub">Browse your pieces or build an outfit from the rack.</p><div class="wardrobe-tools">${btn('Export wardrobe','id="export-wardrobe"')}<span>Wardrobe edits stay in this browser.</span></div><div class="wardrobe-view-toggle" role="group" aria-label="Wardrobe display">${['Rack','List'].map(v=>btn(v,`data-wardrobe-view="${v}" aria-pressed="${state.wardrobeView===v}"`,state.wardrobeView===v?'active':'')).join('')}</div>${state.editing!==null?wardrobeEditor():''}${state.anchor!==null?`<div class="builder"><strong>Build around ${escapeHTML(items[state.anchor].name)}</strong><p>Clothing-only preview</p><div class="outfit-piece-strip">${state.fit.map(id=>`<div class="outfit-piece-thumb" data-piece-category="${items[id].cat}">${garment(items[id])}<span>${escapeHTML(items[id].name)}</span></div>`).join('')}</div><p>${complete()?('Your outfit is ready to review.'):'Choose '+(current().requireLayer?['tops','bottoms','shoes','layers']:['tops','bottoms','shoes']).filter(c=>!state.fit.some(i=>items[i].cat===c)).join(', ')+'. Choose a piece for each missing slot.'}</p>${complete()?btn('Save fit','id="save-fit"','primary')+btn('Ask Nigel','id="critique"'):''}${btn('Start over','id="clear-fit"','text-button')}<p>Choose another piece in the list to replace a piece in the same category.</p>${state.critique?`<section class="nigel-critique" aria-label="Nigel critique"><strong>Nigel’s Look Check</strong><p>Sample feedback based on the selected pieces.</p><p>${state.critique}</p>${btn('Dismiss','id="dismiss-critique"')}</section>`:''}</div>`:'<div class="hint">BUILD A FIT · Tap a piece to make it your starting point. Tap ♡ to keep it in your rotation.</div>'}<div class="filters">${['All','Tops','Bottoms','Shoes','Layers'].map(f=>btn(f,`data-filter="${f}"`,state.filter===f?'active':'')).join('')}</div><p class="rack-instruction">${state.wardrobeView==='Rack'?'Swipe to browse · tap a garment to turn it forward':'Your pieces, at a glance · tap to build a fit'}</p>${state.wardrobeView==='Rack'?landingRail(shown):`<div class="wardrobe-display ${state.wardrobeView==='Rack'?'rack-display':'list-display'}" aria-label="${state.wardrobeView==='Rack'?'Clothing rack':'Wardrobe list'}"><div class="rack-track">${shown.map(p=>`<article class="item ${p.cat==='shoes'?'shelf-item':'hanging-item'} ${state.fit.includes(p.id)?'selected':''}">${btn(`<div class="garment">${p.cat!=='shoes'?'<svg class="rack-hanger" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 6a2 2 0 1 0 -4 0c0 1.667 .67 3 2 4h-.008l7.971 4.428a2 2 0 0 1 1.029 1.749v.823a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-.823a2 2 0 0 1 1.029 -1.749l7.971 -4.428"/></svg>':''}${garment(p)}</div><span class="item-name">${p.name}</span><small>${escapeHTML(mixPrimaryStyle(p))}${state.fit.includes(p.id)?' · Selected':state.anchor!==null&&compatible(p)?' · Compatible':''}</small>`,`data-piece="${p.id}" aria-label="Build a fit with ${p.name}"`)}${btn(state.liked.has(p.id)?'♥':'♡',`data-like="${p.id}" aria-label="${state.liked.has(p.id)?'Unlike':'Like'} ${p.name}" aria-pressed="${state.liked.has(p.id)}"`,'like')}${btn('Edit details',`data-edit-piece="${p.id}" aria-label="Edit ${p.name}"`,'edit-piece')}</article>`).join('')}</div></div>${state.wardrobeView==='Rack'?`<div class="rack-navigation">${btn('←','data-rack-step="-1" aria-label="Previous garment"')}<span id="rack-position">Swipe or drag to browse</span>${btn('→','data-rack-step="1" aria-label="Next garment"')}</div>`:''}`}${savedFits.length?`<p class="section-label">Saved fits · ${savedFits.length}</p>${savedFits.map((f,i)=>`<p class="note">Fit ${i+1} · ${f.map(id=>items[id].name).join(', ')}</p>`).join('')}`:''}`}
const cases=[{"id":14,"word":"Skip it","styleFit":82,"unlocks":0,"why":"Yes, it fits your style. Short hem balances your longer torso, clean shape fits Japanese minimal, and black fits your cool, deep winter colours.","adds":"You already own a black bomber with this shape and colour, so this one would duplicate it.","checks":["Short hem balances your longer torso.","Clean shape fits Japanese minimal.","Black fits your cool, deep winter colours."]},{"id":15,"word":"Skip it","styleFit":38,"unlocks":0,"why":"The olive cotton overshirt works as an open layer over your white heavyweight tee, with slate pleated trousers and black leather loafers for Date night.","adds":"You already own this olive cotton overshirt and use it in Date night outfits. Another one would repeat that role.","checks":["The upper-hip hem keeps the open layers balanced.","The relaxed overshirt works with the pleats and loafers for Date night.","Olive, white and slate make the same considered palette as your Date night pick."]},{"id":null,"name":"Light grey canvas slip-ons","image":"assets/purchase-light-canvas.png","word":"Worth trying on","styleFit":87,"unlocks":2,"why":"A low-profile canvas slip-on suits your relaxed outfits. Light grey keeps the colour quiet, and the simple shape works with straight trousers or tailored shorts.","adds":"A light canvas shoe you do not own. Your stone suede loafers cover a smarter finish; these add a breathable casual option.","with":"The ink navy heavyweight T-shirt and black tailored shorts, or your dark indigo straight jeans.","check":"Walk a few steps: your heel should stay secure without rubbing, and the canvas should not press across your toes.","checks":["The low profile balances straight trousers and tailored shorts.","Canvas keeps the finish simple and casual.","Light grey works with navy, black and indigo."]}];
function shoppingCandidate(index) {
 const c=cases[index];
 const labels=['Jacket','Overshirt','Slip-ons'];
 const alternatives=['Wear your black bomber instead of adding a second one.','Use the olive cotton overshirt you already own.','Try your white leather sneakers first.'];
 const pairings=['Your white heavyweight T-shirt and dark indigo straight jeans.','Your white heavyweight T-shirt, slate pleated trousers and black leather loafers.'];
 return {...c,label:labels[index],why:index===0?'The short hem and clean shape work with straight denim, and black pairs easily with the rest of this wardrobe.':c.why,name:c.name||items[c.id].name,photo:c.image||`assets/purchase-${index}.webp`,
  alternative:alternatives[index],with:c.with||pairings[index]};
}
function suggestedShoppingStyles(index) {
 return [{Streetwear:90,Workwear:72,'East Asian Minimalist':82},{Workwear:88,Classic:64},{Classic:78,'East Asian Minimalist':87,'Smart Casual':67}][index];
}
function verdict(){
 const candidate=shoppingCandidate(state.verdict);
 const profile=candidate.styles||suggestedShoppingStyles(state.verdict);
 const target=myStyle===aesthetics[0]?'your wardrobe':myStyle;
 const score=myStyle===aesthetics[0]?candidate.styleFit:profile[myStyle];
 const sections=[['Style compatibility',candidate.why],['Observed fit','Fit has not been assessed. Check the garment in person.'],['Wardrobe value',candidate.adds],['Try instead',candidate.alternative],['Wear it with',candidate.with]];
 return `<section class="shopping-workspace"><h2>Nigel’s Buy Verdict</h2>
  <p class="sub">Sample shopping advice based on this wardrobe. The style-match score is illustrative.</p>
  <div class="shopping-options" role="group" aria-label="Possible purchase">${cases.map((_,index)=>btn(escapeHTML(shoppingCandidate(index).label),`data-purchase="${index}" aria-pressed="${state.verdict===index}"`,state.verdict===index?'active':'')).join('')}</div>
  <div class="shopping-body"><div class="verdict-image purchase-photo"><img src="${candidate.photo}" alt="${escapeHTML(candidate.name)}"></div>
  <div class="shopping-answer"><h3 class="verdict-word">${escapeHTML(candidate.word)}</h3><h4>${escapeHTML(candidate.name)}</h4>
  <p class="match">${score===undefined?`No scored ${escapeHTML(target)} example for this item.`:`${score}% sample style match · ${escapeHTML(target)}`}</p>
  ${sections.map(([title,copy])=>`<div class="detail"><strong>${title}</strong>${escapeHTML(copy)}</div>`).join('')}
  ${candidate.check?`<details class="detail"><summary>Try-on demonstration</summary><ol><li>Try it in store with the outfit above.</li><li>${escapeHTML(candidate.check)}</li></ol></details>`:''}
  </div></div></section>`;
}
// Log-only primary styles inferred from the existing demo garments; legacy tags elsewhere remain untouched.
const styleMixNames=['Minimalist','East Asian Minimalist','Smart casual','Streetwear','Classic','Quiet luxury','Sporty','Creative'];
const styleMixPieceTags=[
 ['Smart casual','Burgundy'],['Classic','Navy'],['East Asian Minimalist','Black'],['Minimalist','Navy'],['Smart casual','Black'],['Minimalist','White'],['Minimalist','White'],['Classic','Stone'],['East Asian Minimalist','Grey'],['Classic','Sage'],['Minimalist','Black'],['Classic','Oatmeal'],['Classic','Blue'],['East Asian Minimalist','Navy'],['Streetwear','Black'],['East Asian Minimalist','Olive'],['Smart casual','Black'],['Smart casual','Stone'],['Streetwear','Grey'],['East Asian Minimalist','Olive'],['Sporty','Grey']
];
const styleMixColours={Black:'#292823',Navy:'#202939',White:'#eeece5',Stone:'#b8ae97',Grey:'#82858a',Burgundy:'#722c40',Olive:'#6d7453',Sage:'#919b83',Oatmeal:'#c2b89f',Blue:'#70828a',Green:'#4d7653',Brown:'#785b44',Red:'#a84646',Pink:'#cf929d',Purple:'#84688e',Yellow:'#d3b45a',Orange:'#c78149'};
function mixPrimaryStyle(piece){const tags=[piece.primaryStyle,...(Array.isArray(piece.styleTags)?piece.styleTags:[]),piece.style];return tags.find(tag=>styleMixNames.includes(tag))||styleMixPieceTags[piece.id]?.[0]||'Unclassified';}
function mixMainColour(piece){
 const value=String(piece.colour||piece.color||'').trim(),lower=value.toLowerCase();
 if(lower===String(piece.color).toLowerCase())return styleMixPieceTags[piece.id]?.[1]||'Unclassified';
 const named=[[/\b(burgundy|maroon|wine)\b/,'Burgundy'],[/\b(navy|indigo)\b/,'Navy'],[/\b(slate|charcoal|grey|gray)\b/,'Grey'],[/\b(stone|taupe|beige)\b/,'Stone'],[/\b(oatmeal|ecru|cream|off[ -]?white)\b/,'Oatmeal'],[/\bblack\b/,'Black'],[/\bwhite\b/,'White'],[/\bolive\b/,'Olive'],[/\bsage\b/,'Sage'],[/\bblue\b/,'Blue'],[/\bgreen\b/,'Green'],[/\bbrown\b/,'Brown'],[/\bred\b/,'Red'],[/\bpink\b/,'Pink'],[/\bpurple\b/,'Purple'],[/\byellow\b/,'Yellow'],[/\borange\b/,'Orange']];
 const alias=named.find(([pattern])=>pattern.test(lower));if(alias)return alias[1];
 if(/^#[0-9a-f]{3}(?:[0-9a-f]{3})?$/i.test(value)){const hex=value.length===4?'#'+value.slice(1).split('').map(c=>c+c).join(''):value;const rgb=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16));const max=Math.max(...rgb),min=Math.min(...rgb);if(max<65)return 'Black';if(min>225)return 'White';if(max-min<25)return 'Grey';let best='Grey',distance=Infinity;for(const [label,colour]of Object.entries(styleMixColours)){const candidate=[1,3,5].map(i=>parseInt(colour.slice(i,i+2),16)),d=rgb.reduce((sum,n,i)=>sum+(n-candidate[i])**2,0);if(d<distance){best=label;distance=d;}}return best;}
 return value?value.slice(0,60):'Unclassified';
}
function mixBreakdown(pieces,key,order){const counts=new Map();for(const piece of pieces){const label=key(piece);counts.set(label,(counts.get(label)||0)+1);}return [...counts].sort((a,b)=>{const ai=order.indexOf(a[0]),bi=order.indexOf(b[0]);return (ai<0?999:ai)-(bi<0?999:bi)||a[0].localeCompare(b[0]);});}
function styleMixData(pieces){const types=['Tops','Bottoms','Layers','Shoes'],labels={tops:'Tops',bottoms:'Bottoms',layers:'Layers',shoes:'Shoes'};return {total:pieces.length,unique:new Set(pieces.map(p=>p.id)).size,styles:mixBreakdown(pieces,mixPrimaryStyle,styleMixNames),colours:mixBreakdown(pieces,mixMainColour,Object.keys(styleMixColours)),types:types.map(label=>[label,pieces.filter(p=>labels[p.cat]===label).length])};}
const styleMixChartPalette=['var(--accent)','var(--ink)','#7b846c','#b8ae97','#999a92','#c2b89f','#e4ddce'];
function mixChartColour(label,kind,index){if(kind==='colour'){const colours={Black:'var(--ink)',Navy:'#273342',White:'#eeece5',Stone:'#b8ae97',Grey:'#999a92',Burgundy:'var(--accent)',Olive:'#7b846c',Sage:'#919b83',Oatmeal:'#c2b89f',Blue:'#71818a'};return colours[label]||styleMixChartPalette[index%styleMixChartPalette.length];}const order=kind==='style'?styleMixNames:['Tops','Bottoms','Layers','Shoes'];return styleMixChartPalette[Math.max(0,order.indexOf(label))%styleMixChartPalette.length];}
function mixPie(entries,total,kind,unit){const cx=160,cy=150,r=60;let angle=-Math.PI/2;const slices=entries.filter(([,n])=>n>0).map(([label,count],index)=>{const start=angle,end=angle+count/total*Math.PI*2;angle=end;const mid=(start+end)/2,side=Math.cos(mid)>=0?1:-1;return {label,count,index,start,end,mid,side,y:cy+Math.sin(mid)*100};});for(const side of [-1,1]){const labels=slices.filter(s=>s.side===side).sort((a,b)=>a.y-b.y);for(let i=0;i<labels.length;i++)labels[i].y=Math.max(labels[i].y,i?labels[i-1].y+44:28);if(labels.length&&labels.at(-1).y>272){labels.at(-1).y=272;for(let i=labels.length-2;i>=0;i--)labels[i].y=Math.min(labels[i].y,labels[i+1].y-44);}}const paths=slices.map(s=>{const x1=cx+Math.cos(s.start)*r,y1=cy+Math.sin(s.start)*r,x2=cx+Math.cos(s.end)*r,y2=cy+Math.sin(s.end)*r,percent=Math.round(s.count/total*100),d=s.count===total?`M ${cx-r} ${cy} a ${r} ${r} 0 1 0 ${r*2} 0 a ${r} ${r} 0 1 0 ${-r*2} 0`:`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${s.end-s.start>Math.PI?1:0} 1 ${x2} ${y2} Z`;return `<path class="mix-pie-slice" d="${d}" fill="${mixChartColour(s.label,kind,s.index)}"><title>${escapeHTML(s.label)}: ${s.count} ${s.count===1?'piece':'pieces'}, ${percent}%</title></path>`;}).join('');const labels=slices.map(s=>{const x=s.side>0?238:82,anchor=s.side>0?'start':'end',words=s.label==='East Asian Minimalist'?['East Asian','Minimalist']:s.label==='Smart casual'?['Smart casual']:[s.label],percent=Math.round(s.count/total*100),startY=s.y-(words.length-1)*7;return `<g class="mix-pie-callout"><polyline points="${cx+Math.cos(s.mid)*r},${cy+Math.sin(s.mid)*r} ${cx+Math.cos(s.mid)*72},${cy+Math.sin(s.mid)*72} ${x-s.side*5},${s.y}"/><text x="${x}" y="${startY}" text-anchor="${anchor}">${words.map((word,i)=>`<tspan x="${x}" dy="${i?15:0}">${escapeHTML(word)}</tspan>`).join('')}<tspan class="mix-pie-percent" x="${x}" dy="16">${percent}%</tspan></text></g>`;}).join('');return `<div class="mix-pie-wrap"><svg class="mix-pie" viewBox="0 0 320 300" role="img" aria-label="${state.mix} ${kind}: ${total} ${unit}" data-pie-total="${total}">${total?paths+labels:`<circle cx="160" cy="150" r="60" fill="var(--line)"/>`}</svg></div>`;}
function mixTakeaway(data){const pieces=`${data.total} ${data.total===1?'piece':'pieces'}`;if(!data.total)return state.mix==='Worn'?'No worn pieces yet':state.mix==='Liked'?'No liked pieces yet':'No owned pieces yet';if(state.mix!=='Owned')return `${state.mix}: ${pieces}, ${data.styles.map(([name,count])=>`${name} ${count}`).join(', ')}`;const top=Math.max(...data.styles.map(([,count])=>count)),leaders=data.styles.filter(([,count])=>count===top).map(([name])=>name),colours=[...data.colours].sort((a,b)=>b[1]-a[1]).slice(0,2).map(([name,count])=>`${name} ${count}`).join(', ');return `Your style: ${leaders.join(' & ')} ${leaders.length>1?'lead':'leads'}, ${top}${leaders.length>1?' each':''} · ${colours} · ${pieces}`;}
function styleMix(pieces){const data=styleMixData(pieces),worn=state.mix==='Worn',unit=count=>worn&&data.total>0?(count===1?'piece wear':'piece wears'):(count===1?'piece':'pieces'),totalLabel=`${data.total} ${unit(data.total)}`;const rows=(entries,kind)=>entries.map(([label,count])=>`<div class="mix-row" data-mix-row="${kind}">${kind==='colour'?`<span class="mix-colour-dot" style="background:${styleMixColours[label]||'#b8b4aa'}" aria-hidden="true"></span>`:''}<span class="mix-name">${escapeHTML(label)}</span><span class="mix-count">${count}</span></div>`).join('');const card=(title,entries,kind)=>`<section class="mix-breakdown" data-breakdown="${kind}" aria-label="${title}"><h4>${title}</h4>${rows(entries.filter(([,count])=>count>0),kind)}</section>`;return `<section class="style-mix-panel" aria-labelledby="style-mix-heading"><h3 id="style-mix-heading">Style Mix</h3><p class="sub">Inferred from your pieces and what you wear and like. One primary style per piece.</p><div class="segmented" role="group" aria-label="Style Mix source">${['Owned','Worn','Liked'].map(v=>btn(v,`data-mix="${v}" aria-pressed="${state.mix===v}"`,state.mix===v?'active':'')).join('')}</div><details class="mix-disclosure"${state.mixOpen?' open':''}><summary>${escapeHTML(mixTakeaway(data))}</summary><div class="mix-detail"><div class="mix-summary"><strong>${state.mix} · <span data-mix-selected-total="${data.total}">${totalLabel}</span></strong></div>${data.total===0?`<p class="mix-empty">${state.mix==='Worn'?'Your mix appears after you log an outfit.':state.mix==='Liked'?'Your mix appears after you like a piece.':'No owned pieces yet.'}</p>`:''}<div class="mix-breakdowns">${card('STYLE',data.styles,'style')}${card('COLOUR',data.colours,'colour')}${card('CLOTHING TYPE',data.types,'type')}</div></div></details></section>`;}
function log(){let worn=state.logs.filter(l=>l.type==='wore'),skipped=state.logs.filter(l=>l.type==='skipped'),used=new Set(worn.flatMap(l=>l.ids)),mix=state.mix==='Owned'?items:state.mix==='Liked'?items.filter(p=>state.liked.has(p.id)):worn.flatMap(l=>l.ids.map(id=>items[id]));let counts={};worn.forEach(l=>l.ids.forEach(id=>counts[id]=(counts[id]||0)+1));let sorted=Object.keys(counts).sort((a,b)=>counts[b]-counts[a]);return `<h2>Your outfit log</h2><p class="sub">Track what you wore, saved and liked.</p><div class="stats"><div class="stat"><b>${new Set(state.logs.map(log=>log.date)).size}</b><span>Days logged</span></div><div class="stat"><b>${used.size} <small>of ${items.length}</small></b><span>Closet pieces worn</span></div></div>${[['WORE IT',worn],['DIDN’T WEAR IT',skipped]].map(([title,logs])=>`<p class="section-label">${title} · ${logs.length}</p>${logs.length?logs.map(l=>`<div class="log-row">${l.name}<br><small>${l.ids.map(i=>items[i].name).join(' · ')}<br>${displayDate(l.date)}${l.reason?' · '+escapeHTML(l.reason):''}</small></div>`).join(''):'<p class="empty">No outfits logged here yet.</p>'}`).join('')}<p class="section-label">PIECE WEAR COUNTS</p>${sorted.length?sorted.map(id=>`<div class="log-row">${items[id].name}<br><small>${counts[id]} ${counts[id]===1?'wear':'wears'}</small></div>`).join(''):'<p class="empty">Log a wear to see all the pieces you have worn.</p>'}${styleMix(mix)}
 <section class="log-collection"><h3>Saved outfits</h3>${state.saved.length?state.saved.map(fit=>`<div class="log-row">${fit.map(id=>escapeHTML(items[id].name)).join(' · ')}</div>`).join(''):'<p class="empty">No outfits saved yet.</p>'}</section>
 <section class="log-collection"><h3>Saved fits</h3>${savedFits.map(fit=>`<p>${fit.map(id=>escapeHTML(items[id].name)).join(' · ')}</p>`).join('')||'<p class="empty">No fits saved yet.</p>'}</section>
 <section class="log-collection"><h3>Planned outfits</h3>${undatedPlan&&!recordingActivity?btn('Choose a date for your previous plan','id="recover-plan"'):''}${[...plans].sort((a,b)=>a.date.localeCompare(b.date)).map(plan=>btn(`${displayDate(plan.date)} · ${occasions[plan.occasion]}`,`data-plan-date="${plan.date}"`)).join('')||'<p class="empty">No outfits planned yet.</p>'}</section>
 <section class="log-collection"><h3>Liked garments</h3>${state.liked.size?[...state.liked].map(id=>`<div class="log-row">${escapeHTML(items[id].name)}</div>`).join(''):'<p class="empty">No garments liked yet.</p>'}</section>
 <div class="hint">Activity is stored in this browser.</div>`}
function choose(){state.index=state.occasion;state.alternate=false;state.swap=null;state.modelAngle=0;state.reasonIndex=0}
// Adapted from composed-landing-page/scripts/components/wardrobe-rail.js.
// Rack-only photographs; the shared wardrobe/list thumbnails remain unchanged.
const rackOnlyPhotos={7:'stone-trousers',9:'sage-shirt',10:'black-knit',11:'oatmeal-cardigan',12:'denim-shirt',13:'navy-chore',18:'grey-sweatshirt'};
function railPhoto(p){if(rackOnlyPhotos[p.id])return {front:`assets/rack/${rackOnlyPhotos[p.id]}.png`,side:`assets/rack/side/${rackOnlyPhotos[p.id]}.png`};if(p.id===14)return {front:'assets/wardrobe/outer-01-front-960.webp',side:'assets/wardrobe/outer-01-side-640.webp'};const source=garmentImages[p.imageKey]||garmentImages[p.name.toLowerCase()];return source?{front:source.replace('-front-320','-front-960'),side:source.replace('-front-320','-side-640')}:null;}
function railGarments(shown){const rank=id=>{const i=outfits.flatMap(o=>o.ids).indexOf(id);return i<0?999:i;};return shown.filter(p=>p.cat!=='shoes').sort((a,b)=>['tops','layers','bottoms'].indexOf(a.cat)-['tops','layers','bottoms'].indexOf(b.cat)||rank(a.id)-rank(b.id));}
function railActions(p){return `<div><h3 id="rail-name">${p.name}</h3><p>${[p.cat,p.colour,p.material,p.fit].filter(value=>value&&value!=='Not tagged').map(escapeHTML).join(' · ')}</p></div><div class="rail-controls">${btn('←','id="rail-prev" aria-label="Previous garment"')}<span id="rail-counter"></span>${btn('→','id="rail-next" aria-label="Next garment"')}</div><div class="rail-piece-actions">${btn('Build an outfit','id="rail-build"','primary')}${btn('Edit details','id="rail-edit"')}${btn(state.liked.has(p.id)?'♥ Liked':'♡ Like','id="rail-like"')}</div>`;}
function landingRail(shown){const garments=railGarments(shown);if(!garments.some(p=>p.id===state.railSelected))state.railSelected=null;const selected=garments.find(p=>p.id===state.railSelected);return `<div class="landing-rail">${garments.length?`<div class="photographic-rail" aria-label="Clothing rail"><div class="hanger-track"><div class="photographic-rail-bar" aria-hidden="true"></div>${garments.map((p,i)=>{const photo=railPhoto(p),front=photo?.front,side=photo?.side,detail=front;const group=i===0||p.cat!==garments[i-1].cat;return btn(`<span class="rail-photographs">${front?`<img class="rail-product-front" src="${detail}" alt="${p.name}" width="320" height="320"><img class="rail-product-side" src="${side}" alt="" aria-hidden="true" width="640" height="640" loading="eager">`:`<span class="rail-product-front">${garment(p)}</span><span class="rail-product-side drawn-side">${garment(p)}</span>`}</span>${group?`<span class="rail-group-label" aria-hidden="true">${p.cat}</span>`:''}`,`data-rail="${p.id}" data-category="${p.cat==='bottoms'?(p.imageKey.includes('jeans')?'jeans':p.imageKey.includes('shorts')?'shorts':'trousers'):'outerwear'}" aria-label="Face forward: ${p.name}" aria-pressed="${p.id===state.railSelected}"`,'hanger-button'+(p.id===state.railSelected?' face':'')+(group&&i?' rail-group-start':''));}).join('')}</div></div><div class="rail-caption" id="rail-caption">${selected?railActions(selected):'<p>Select a garment to see its details.</p>'}</div>`:''}${shown.some(p=>p.cat==='shoes')?`<details class="landing-shoe-shelf shoe-drawer" open><summary>Shoe drawer <small>${shown.filter(p=>p.cat==='shoes').length} pairs</small></summary><div class="shoe-shelf">${shown.filter(p=>p.cat==='shoes').map(p=>`<article class="shelf-item">${btn(`${garment(p)}<span>${p.name}</span>`,`data-piece="${p.id}" aria-label="Build a fit with ${p.name}"`)}${btn('Edit details',`data-edit-piece="${p.id}"`,'edit-piece')}${btn(state.liked.has(p.id)?'♥':'♡',`data-like="${p.id}" aria-label="Like ${p.name}"`)}</article>`).join('')}</div></details>`:''}</div>`;}
function mountRack(){const rail=$('.photographic-rail');if(!rail)return;rail.querySelectorAll('img').forEach(img=>img.decode().then(()=>img.classList.add('photo-ready')).catch(()=>{}));const garments=railGarments(items.filter(p=>(state.filter==='All'||p.cat===state.filter.toLowerCase())));const buttons=[...rail.querySelectorAll('[data-rail]')];let selected=garments.findIndex(p=>p.id===state.railSelected);const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
function show(index){const p=garments[index];buttons.forEach((b,i)=>{b.classList.toggle('face',i===index);b.setAttribute('aria-pressed',String(i===selected));});$('#rail-caption').innerHTML=p?railActions(p):'<p>Select a garment to see its details.</p>';if(!p)return;$('#rail-counter').textContent=`${String(index+1).padStart(2,'0')} / ${garments.length}`;$('#rail-prev').disabled=selected===0;$('#rail-next').disabled=selected===garments.length-1;$('#rail-prev').onclick=()=>select(selected-1,true);$('#rail-next').onclick=()=>select(selected+1,true);$('#rail-build').onclick=()=>{state.anchor=p.id;state.fit=[p.id];state.critique=null;render({top:true});};$('#rail-edit').onclick=()=>{state.editing=p.id;render();$('#screen').scrollTop=0;};$('#rail-like').onclick=()=>{const id=p.id;toggleLike(id);show(selected);};}
function select(index,scroll=false){selected=Math.max(0,Math.min(garments.length-1,index));state.railSelected=garments[selected].id;show(selected);if(scroll)rail.scrollTo({left:Math.max(0,buttons[selected].offsetLeft-rail.clientWidth/2+90),behavior:reduced?'instant':'smooth'});}
buttons.forEach((b,i)=>{b.onclick=()=>select(i);});rail.onpointerleave=()=>show(selected);rail.onpointercancel=()=>show(selected);rail.onfocusout=e=>{if(!rail.contains(e.relatedTarget))show(selected);};rail.onkeydown=e=>{const targets={ArrowLeft:selected-1,ArrowRight:selected+1,Home:0,End:garments.length-1};if(e.key in targets){e.preventDefault();select(targets[e.key],true);buttons[selected].focus({preventScroll:true});}};show(selected);}
function selectFitPiece(id){
 if(state.anchor===null || items[id].cat===items[state.anchor].cat) state.anchor=id;
 state.fit=orderPieces([...state.fit.filter(existing=>items[existing].cat!==items[id].cat),id]);
 state.critique=null;
 persist();
}
function toggleLike(id){
 const removing=state.liked.has(id);
 if(removing)state.liked.delete(id);else state.liked.add(id);
 persist();
 toast(removing?'Removed from favourites.':'Added to favourites.');
}
function logDate(){return outfitDate();}
function currentWearLog(){
 return state.logs.find(log=>log.date===logDate()&&orderPieces(log.ids).join(',')===orderPieces(ids()).join(','));
}
function hasLoggedCurrent(type){return currentWearLog()?.type===type;}
const skipReasons = ['Too formal','Too casual','Not my style','Fit or comfort concern','Clothing unavailable','Plans changed','Other'];
function hasWornCurrent(){return hasLoggedCurrent('wore');}
function toggleAlternate(){if(state.alternate||state.occasion===3)return;state.alternate=true;state.modelAngle=0;state.swap=null;state.reasonIndex=0;render();}
function bind(){if($('.mix-disclosure'))$('.mix-disclosure').ontoggle=e=>{state.mixOpen=e.currentTarget.open;};document.querySelectorAll('[data-tab]').forEach(b=>b.onclick=async()=>{if(b.dataset.tab==='Shopping')await preloadShoppingImages();dismissToast();state.tab=b.dataset.tab;render({top:true})});document.querySelectorAll('[data-wardrobe-view]').forEach(b=>b.onclick=()=>{state.wardrobeView=b.dataset.wardrobeView;render()});document.querySelectorAll('[data-purchase]').forEach(b=>b.onclick=async()=>{const index=+b.dataset.purchase;await preloadShoppingImages();state.verdict=index;render()});document.querySelectorAll('[data-reason]').forEach(b=>b.onclick=()=>{state.reasonIndex=+b.dataset.reason;render()});document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>{state.view=b.dataset.view;render()});if($('#another-outfit'))$('#another-outfit').onclick=()=>{state.todayTouched=true;toggleAlternate();};document.querySelectorAll('[data-log]').forEach(b=>b.onclick=()=>{state.todayTouched=true;const date=logDate(),existing=currentWearLog();if(existing?.type===b.dataset.log)return;if(existing){existing.type=b.dataset.log;delete existing.reason;}else state.logs.push({type:b.dataset.log,ids:[...ids()],name:occasions[state.occasion],date});persist();render();toast(b.dataset.log==='wore'?'Added to your wear log.':'Logged as not worn.');});document.querySelectorAll('[data-swap]').forEach(b=>b.onclick=()=>{let [from,to]=b.dataset.swap.split(',').map(Number);state.swap={from,to,note:b.dataset.note};const scroll=$('#screen').scrollTop;render().then(()=>{const details=$('.change-piece');if(details)details.open=true;$('#screen').scrollTop=scroll;})});document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{state.filter=b.dataset.filter;render()});document.querySelectorAll('[data-like]').forEach(b=>b.onclick=()=>{let id=+b.dataset.like;toggleLike(id);render()});document.querySelectorAll('[data-piece]').forEach(b=>b.onclick=()=>{selectFitPiece(+b.dataset.piece);render()});if($('#clear-fit'))$('#clear-fit').onclick=()=>{state.anchor=null;state.fit=[];state.savedIndex=null;state.critique=null;persist();render()};if($('#save-fit'))$('#save-fit').onclick=()=>{
 const snapshot=orderPieces(state.fit);
 if(!savedFits.some(fit=>fit.join(',')===snapshot.join(',')))savedFits.push(snapshot);
 persist();render();toast('Fit saved.');
};if($('#critique'))$('#critique').onclick=()=>{
 const bottom=items[state.fit.find(id=>items[id].cat==='bottoms')];
 const shoe=items[state.fit.find(id=>items[id].cat==='shoes')];
 const denim=/jean|denim/i.test(bottom.name);
 state.critique=`What works: ${bottom.name} ${denim?'make this a casual starting point':'set the shape of the outfit'}. Check how the hem falls over your ${shoe.name} as you walk. If it catches under the heel, ${denim?'try a single cuff':'pin the hem temporarily to compare a shorter length'}.`;
 render();
};if($('#dismiss-critique'))$('#dismiss-critique').onclick=()=>{state.critique=null;render();};if($('#purchase'))$('#purchase').onchange=e=>{state.verdict=+e.target.value;render()};document.querySelectorAll('[data-mix]').forEach(b=>b.onclick=()=>{state.mix=b.dataset.mix;render()})}
const preloadedModelSources=new Set();
function preloadTodayModels(){if(!window.Image)return;if(state.occasion===3){const image=new Image();image.src=workOutfit().sheet;image.decode().catch(()=>{});return;}for(const alternate of [0,1]){const src=outfitPool.get(`${state.occasion}:${state.energy}:${alternate}`)?.sheet;if(!src||preloadedModelSources.has(src))continue;preloadedModelSources.add(src);const image=new Image();image.src=src;image.decode().catch(()=>{preloadedModelSources.delete(src);});}}
function preloadRail(){if(!window.Image)return;for(const p of items.filter(p=>p.cat!=='shoes')){const photo=railPhoto(p);if(!photo)continue;for(const src of new Set([photo.front,photo.side])){const image=new Image();image.src=src;image.decode().catch(()=>{});}}}
function clearRecordingActivity(){
 state.saved=[];state.logs=[];state.liked=new Set();state.fit=[];state.anchor=null;state.critique=null;plans=[];savedFits=[];accepted=new Set();
}
function setRecording(active){
 if(active && !recordingActivity){
  recordingActivity={saved:state.saved,logs:state.logs,liked:state.liked,fit:state.fit,anchor:state.anchor,critique:state.critique,plans,savedFits,accepted};
  clearRecordingActivity();
 }else if(!active && recordingActivity){
  ({plans,savedFits,accepted}=recordingActivity);
  Object.assign(state,{saved:recordingActivity.saved,logs:recordingActivity.logs,liked:recordingActivity.liked,fit:recordingActivity.fit,anchor:recordingActivity.anchor,critique:recordingActivity.critique});
  recordingActivity=null;
 }
 document.body.classList.toggle('record-mode',active);
 $('#record-mode').setAttribute('aria-pressed',String(active));
 $('#record-mode').textContent=active?'Exit recording':'Clean recording';
 $('.settings-menu').open=false;
 dismissToast();
 window.getSelection?.().removeAllRanges();
 render();
}
$('#record-mode').onclick=()=>setRecording(!recordingActivity);

preloadRail();
loadPlan();
function theme(){
 const dark=document.body.classList.toggle('dark',darkPreference);
 $('#theme-mobile').setAttribute('aria-pressed',String(dark));
 $('#theme-mobile').setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');
 $('link[rel="icon"]').href=`assets/brand/composed-icon-${dark?'dark':'light'}.webp`;
}
const styleSelect=$('#my-style');
styleSelect.replaceChildren(...aesthetics.map(style=>new Option(style,style)));
styleSelect.value=myStyle;
styleSelect.onchange=()=>{
 myStyle=styleSelect.value;
 let saved=false;
 try{localStorage.setItem(stylePreferenceKey,myStyle);saved=true;}catch{}
 if(state.tab==='Shopping')render();
 toast(saved?'My Style saved.':'My Style updated for this session.');
};
const settingsMenu=$('.settings-menu');
const settingsButton=settingsMenu.querySelector('summary');
const syncSettings=()=>settingsButton.setAttribute('aria-expanded',String(settingsMenu.open));
settingsMenu.ontoggle=syncSettings;
settingsButton.onclick=event=>{
 event.preventDefault();
 settingsMenu.open=!settingsMenu.open;
 syncSettings();
};
document.addEventListener('keydown',event=>{
 if(event.key!=='Escape'||!settingsMenu.open)return;
 event.preventDefault();
 settingsMenu.open=false;
 syncSettings();
 settingsButton.focus();
});
$('#theme-mobile').onclick=()=>{darkPreference=!darkPreference;theme();persist();};
$('#toast-dismiss').onclick=dismissToast;
function resetFlow(){
 Object.assign(state,{tab:'Today',timing:'now',planDate:'',otherDate:false,moreImpressions:false,rankStyle:aesthetics[0],timingEditing:true,recoveringPlan:false,occasion:0,energy:availableImpressions(0)[0],alternate:false,modelAngle:0,fit:[],anchor:null,critique:null});
 $('.settings-menu').open=false;
 dismissToast();
 render({top:true});
}
$('#reset-demo').onclick=()=>{if(!recordingActivity)setRecording(true);else clearRecordingActivity();resetFlow();};
$('#clear-history').onclick=()=>{
 if(recordingActivity){toast('Exit recording to clear browser history.');return;}
 if(!window.confirm('Clear saved outfits, fits, plans, favourites and wear history from this browser?'))return;
 state.saved=[];state.logs=[];state.liked.clear();accepted.clear();plans=[];savedFits=[];undatedPlan=null;state.fit=[];state.anchor=null;
 try{localStorage.removeItem(legacyPlanKey);}catch{}
 persist();
 resetFlow();
};
let exportLocked=false;
function exportWardrobe(){
 if(exportLocked)return;
 exportLocked=true;
 const controls=['#settings-export','#export-wardrobe'];
 for(const selector of controls) if($(selector))$(selector).disabled=true;
 let url, link;
 try{
  url=URL.createObjectURL(new Blob([JSON.stringify(wardrobeData(),null,2)],{type:'application/json'}));
  link=document.createElement('a');
  link.href=url;
  link.download='composed-wardrobe.json';
  document.body.append(link);
  link.click();
  toast('Wardrobe export started.',true);
 }catch{
  toast('Wardrobe export failed. Please try again.',true);
 }finally{
  link?.remove();
  setTimeout(()=>{if(url)URL.revokeObjectURL(url);exportLocked=false;for(const selector of controls)if($(selector))$(selector).disabled=false;},1200);
 }
}
$('#settings-export').onclick=exportWardrobe;
theme();
preloadTodayModels();
render();

function applyRecordingPresentation(){const lines=['Swaps come from your 21-piece demo wardrobe.','Sample advice based on this wardrobe.','Activity is stored in this browser.','Wardrobe edits stay in this browser.'];document.querySelectorAll('#screen p,#screen span,#screen .hint').forEach(el=>{if(lines.includes(el.textContent.trim()))el.setAttribute('data-recording-demo','');});}
let shoppingImagesReady;
function preloadShoppingImages(){if(!window.Image)return Promise.resolve();if(!shoppingImagesReady)shoppingImagesReady=Promise.all(cases.map((c,i)=>{const image=new Image();image.src=c.image||`assets/purchase-${i}.webp`;return image.decode();})).catch(()=>{shoppingImagesReady=null;});return shoppingImagesReady;}
preloadShoppingImages();
