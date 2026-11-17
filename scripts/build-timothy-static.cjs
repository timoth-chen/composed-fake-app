// Standalone Timothy static build. Never writes to the public dist directory.
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),output=path.join(root,'timothy-dist');
const {page,privateApp,pieceSvg}=require('./serve-local-private.cjs');
const write=(file,data)=>{const target=path.join(output,file);fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,data);};
fs.rmSync(output,{recursive:true,force:true});
write('index.html',page().replaceAll('Timothy’s private wardrobe · Local only','Timothy’s wardrobe').replace('<title>Composed — Your day, considered.</title>','<title>Composed · Timothy’s wardrobe</title>'));
write('__timothy/shared-app.js',privateApp().replaceAll('Timothy’s private wardrobe · Local only','Timothy’s wardrobe'));
for(const file of ['catalogue.js','shared-private.css'])write('__timothy/'+file,fs.readFileSync(path.join(root,'local-private/timothy',file)));
for(const name of ['style','landing-reference','source-rail','app-shell','today-first'])write('__shared/'+name+'.css',fs.readFileSync(path.join(root,'dist',name+'.css'),'utf8').replace(/^@import[^\n]+\n/gm,''));
for(let id=0;id<11;id++)write('__timothy/piece/'+id+'.svg',pieceSvg(id));
const allowed=['casual-headless-v1.png','everyday-clogs-headless-v1.png','everyday-roger-headless-v1.png','date-headless-v1.png','pieces-atlas-v1.png','trousers-fit-v2.png',...['400','500','600','700'].map(w=>'archivo-'+w+'.ttf')];
for(const file of allowed)write('wardrobe-timothy/'+file,fs.readFileSync(path.join(root,'public/wardrobe-timothy',file)));
fs.cpSync(path.join(root,'dist/assets/brand'),path.join(output,'assets/brand'),{recursive:true});
console.log('Timothy static site built in timothy-dist: 11 pieces, 3 first picks, headless views.');
