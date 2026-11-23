// Standalone Timothy static build. Never writes to the public dist directory.
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),output=path.join(root,'timothy-dist');
const {page,privateApp,sharedStylesheet}=require('./serve-local-private.cjs');
const write=(file,data)=>{const target=path.join(output,file);fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,data);};
fs.rmSync(output,{recursive:true,force:true});
write('index.html',page().replaceAll('Timothy’s private wardrobe · Local only','Timothy’s wardrobe').replace('<title>Composed — Your day, considered.</title>','<title>Composed · Timothy’s wardrobe</title>'));
write('__timothy/shared-app.js',privateApp().replaceAll('Timothy’s private wardrobe · Local only','Timothy’s wardrobe'));
for(const file of ['catalogue.js','shared-private.css'])write('__timothy/'+file,fs.readFileSync(path.join(root,'local-private/timothy',file)));
for(const name of ['style','landing-reference','source-rail','app-shell','today-first','composed-ui'])write('__shared/'+name+'.css',sharedStylesheet(name+'.css'));
const media=path.join(root,'public/wardrobe-timothy');
for (const directory of ['rotation','rack']) {
 fs.cpSync(path.join(media,directory),path.join(output,'wardrobe-timothy',directory),{recursive:true});
}
for (const weight of ['400','500','600','700']) {
 const file='archivo-'+weight+'.ttf';
 write('wardrobe-timothy/'+file,fs.readFileSync(path.join(media,file)));
}
fs.cpSync(path.join(root,'dist/assets/brand'),path.join(output,'assets/brand'),{recursive:true});
// These public product photos are shared shopping candidates, never owned pieces.
fs.cpSync(path.join(root,'dist/assets/shopping'),path.join(output,'assets/shopping'),{recursive:true});
write('assets/today/morning-knit.jpg',fs.readFileSync(path.join(root,'dist/assets/today/morning-knit.jpg')));
console.log('Timothy static site built in timothy-dist: approved personal portraits and four-angle views.');
