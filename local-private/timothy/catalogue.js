// Private catalogue. Never imported by the public dist app.
export const items = [
 {id:'hoodie',name:'Washed charcoal Stüssy Taipei hoodie',type:'Tops',colour:'Grey',style:'Streetwear',photo:null},
 {id:'light-jeans',name:'Light-wash wide-leg jeans',type:'Bottoms',colour:'Blue',style:'Streetwear',photo:null},
 {id:'runner',name:'Grey New Balance 996 runner',type:'Shoes',colour:'Grey',style:'Sporty',photo:null},
 {id:'henley',name:'Cream textured henley',type:'Tops',colour:'Cream',style:'Classic',photo:null},
 {id:'indigo-trousers',name:'Dark indigo wide pleated trousers',type:'Bottoms',colour:'Navy',style:'East Asian Minimalist',photo:null},
 {id:'clogs',name:'Black BEAMS 50th Anniversary × Birkenstock clogs',type:'Shoes',colour:'Black',style:'East Asian Minimalist',photo:null},
 {id:'roger',name:'White On Roger sneakers',type:'Shoes',colour:'White',style:'Minimalist',photo:null},
 {id:'polo',name:'Black knit polo',type:'Tops',colour:'Black',style:'Smart casual',photo:null},
 {id:'black-trousers',name:'Black wide trousers',type:'Bottoms',colour:'Black',style:'Minimalist',photo:null},
 {id:'tiger',name:'Onitsuka Tiger cream / navy',type:'Shoes',colour:'Cream',style:'Classic',photo:null},
 {id:'jacket',name:'Dark-green plaid Barbour jacket',type:'Layers',colour:'Olive',style:'Classic',photo:null},
 {id:'shirt',name:'Dark navy button-down shirt',type:'Tops',colour:'Navy',style:'Classic',photo:null},
];
items.forEach((item,index)=>{item.photoCell=index;});
export const byId = Object.fromEntries(items.map(item=>[item.id,item]));
export const occasions = ['Everyday / work','Casual','Date night'];
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
 date:{id:'date',number:3,title:'Dark lines, an open plaid layer',occasion:2,come:'Polished',pieces:['jacket','shirt','black-trousers','tiger'],
  why:'For date night, the navy button-down and black trousers give you an understated base. The plaid Barbour adds structure, and the cream and navy Onitsuka Tigers soften the finish.',
  steps:['Keep the jacket open. Let the navy shirt show to make a cleaner line down the front.','Let the black wide trousers fall straight, with no fabric dragging beneath the shoes.','Finish with the cream and navy Onitsuka Tigers, with the trousers resting just above the soles.'],
  note:'Keep the jacket open. The dark inner line carries the proportions; the plaid and cream shoes add the detail.'},
};
export const primaryByOccasion = ['everyday','casual','date'];
// Full alternates use only Timothy's own pieces and change top, bottom and shoes.
export const alternateByOccasion = ['casual','everyday','everyday'];
export function pick(occasion, alternate) {
 return looks[(alternate ? alternateByOccasion : primaryByOccasion)[occasion]];
}
