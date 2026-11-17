// Private catalogue. Never imported by the public dist app.
export const items = [
 {id:'hoodie',name:'Grey Stussy Taipei hoodie',type:'Tops',colour:'Grey',style:'Streetwear',photo:null},
 {id:'light-jeans',name:'Light wash wide jeans',type:'Bottoms',colour:'Blue',style:'Streetwear',photo:null},
 {id:'runner',name:'Grey New Balance 996 runner',type:'Shoes',colour:'Grey',style:'Sporty',photo:null},
 {id:'henley',name:'Cream waffle henley',type:'Tops',colour:'Cream',style:'Classic',photo:null},
 {id:'indigo-trousers',name:'Dark indigo wide pleated trousers',type:'Bottoms',colour:'Navy',style:'East Asian Minimalist',photo:null},
 {id:'clogs',name:'Black BEAMS clogs',type:'Shoes',colour:'Black',style:'East Asian Minimalist',photo:null},
 {id:'roger',name:'White On Roger sneakers',type:'Shoes',colour:'White',style:'Minimalist',photo:null},
 {id:'polo',name:'Black knit polo',type:'Tops',colour:'Black',style:'Smart casual',photo:null},
 {id:'black-trousers',name:'Black wide trousers',type:'Bottoms',colour:'Black',style:'Minimalist',photo:null},
 {id:'tiger',name:'Onitsuka Tiger cream / navy',type:'Shoes',colour:'Cream',style:'Classic',photo:null},
 {id:'jacket',name:'Barbour plaid jacket, open',type:'Layers',colour:'Olive',style:'Classic',photo:null},
];
items.forEach((item,index)=>{item.photoCell=index;});
export const byId = Object.fromEntries(items.map(item=>[item.id,item]));
export const occasions = ['Everyday / work','Casual afternoon','Date night'];
export const comesAcross = ['Confident','Approachable','Polished','Relaxed','Sharp','Low-key','Not sure'];
export const looks = {
 casual:{id:'casual',number:1,title:'Casual, with room to move',occasion:1,come:'Relaxed',pieces:['hoodie','light-jeans','runner'],
  why:'The grey hoodie and grey runners frame the light wash jeans without adding a strong colour break. The wide jeans have room through the leg, while the ribbed hoodie hem gives the top a clear finish.',
  steps:['Let the hoodie sit naturally at the hip; keep the hood down.','Wear the light wash wide jeans with the legs falling straight.','Lace the grey New Balance runners and keep the jeans clear of the ground.'],
  note:'Keep the relaxed volume through the jeans and let the hoodie hem define the top.'},
 everyday:{id:'everyday',number:2,title:'Soft texture, a confident line',occasion:0,come:'Confident',pieces:['henley','indigo-trousers','clogs'],
  why:'The cream waffle henley brings texture and light above the dark indigo pleats. The wide trousers give the lower half a deliberate shape; black BEAMS clogs ground it without making the outfit formal.',
  steps:['Leave the top henley button open and let the waffle fabric fall without pulling.','Set the pleated trousers at the waist and keep the front pleats straight.','Finish with black BEAMS clogs, with the trouser hems clear of the soles.'],
  note:'Let the henley texture do the work. Keep the trouser front tidy rather than adding another layer.'},
 date:{id:'date',number:3,title:'Dark lines, an open plaid layer',occasion:2,come:'Polished',pieces:['polo','black-trousers','tiger','jacket'],
  why:'The black knit polo and wide black trousers make one continuous dark line. Worn open, the Barbour plaid jacket frames that line instead of closing it off. The cream and navy Onitsuka Tigers give the outfit a lighter finish.',
  steps:['Keep the black knit polo collar open and its hem sitting neatly at the hip.','Let the black wide trousers fall straight, with no fabric dragging beneath the shoes.','Wear the Barbour plaid jacket open so the black polo stays visible.','Finish with the cream and navy Onitsuka Tigers, with the trousers resting just above the soles.'],
  note:'Keep the jacket open. The dark inner line carries the proportions; the plaid and cream shoes add the detail.'},
};
export const primaryByOccasion = ['everyday','casual','date'];
// Full alternates use only Timothy's own pieces and change top, bottom and shoes.
export const alternateByOccasion = ['date','everyday','everyday'];
export function pick(occasion,alternate,whiteShoes=null){
 const base=looks[(alternate?alternateByOccasion:primaryByOccasion)[occasion]];
 const look={...base,pieces:[...base.pieces],steps:[...base.steps]};
 if(base.id==='everyday'&&(whiteShoes??(occasion===1&&alternate))){
  look.pieces=look.pieces.map(id=>id==='clogs'?'roger':id);
  look.why='The cream waffle henley and white On Roger sneakers lighten the dark indigo wide pleated trousers. The henley texture and the trouser pleats keep the outfit considered while the white shoes make the finish casual.';
  look.steps[2]='Finish with white On Roger sneakers, keeping the trouser hems clear of the soles.';
 }
 return look;
}
export const before = {title:'My usual: long tee, jacket, joggers and running shoes',photo:'before-usual.webp'};
