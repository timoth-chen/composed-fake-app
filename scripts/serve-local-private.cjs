// Loopback-only development server. Nothing here changes dist or Render.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const {privateApp}=require("./prepare-timothy-app.cjs");

const dist = path.join(root, 'dist');
const media = path.join(root, 'public', 'wardrobe-timothy');
const privateCode = path.join(root, 'local-private', 'timothy');
const mime = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.woff2':'font/woff2','.mov':'video/quicktime','.mp4':'video/mp4'};
function resolveUnder(base,relative){const file=path.resolve(base,relative);return file.startsWith(base+path.sep)?file:null;}
function page(){return fs.readFileSync(path.join(dist,'index.html'),'utf8').replace(/<div id="screen"[\s\S]*?<div id="today-views"/, '<div id="screen" class="screen-today"></div><div id="today-views"').replace(/<script src="app[^"]*\.js"><\/script>/,'<script type="module" src="/__timothy/shared-app.js"></script>').replace(/<link rel="preload"[^>]*>/g,'').replace(/href="(style|landing-reference|source-rail|app-shell|today-first|composed-ui)(?:\.[a-f0-9]+)?\.css"/g,'href="/__shared/$1.css"').replace('</head>','<link rel="stylesheet" href="/__timothy/shared-private.css"></head>').replace('Wardrobe edits stay in this browser. Demo log resets on reload.','Timothy’s private wardrobe · Local only');}
function pieceSvg(id){const corrected=id===1||id===4,file=path.join(media,corrected?'trousers-fit-v2.png':'pieces-atlas-v1.png'),buffer=fs.readFileSync(file),w=buffer.readUInt32BE(16),h=buffer.readUInt32BE(20),cols=corrected?2:4,rows=corrected?1:3,index=corrected?(id===1?0:1):id,cw=w/cols,ch=h/rows;return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${index%cols*cw} ${Math.floor(index/cols)*ch} ${cw} ${ch}"><image width="${w}" height="${h}" href="data:image/png;base64,${buffer.toString('base64')}"/></svg>`;}
const server=http.createServer((req,res)=>{
 const url=new URL(req.url,'http://localhost');
 if(!['localhost','127.0.0.1','[::1]'].includes(url.hostname)||!['localhost','127.0.0.1','[::1]'].includes(new URL('http://'+req.headers.host).hostname)){res.writeHead(403);return res.end('Local access only');}
 res.setHeader('Cache-Control','no-store');
 if((url.pathname==='/'||url.pathname==='/index.html')&&url.searchParams.get('wardrobe')==='timothy'){res.setHeader('Content-Type',mime['.html']);return res.end(page());}
 if(/^\/__shared\/(style|landing-reference|source-rail|app-shell|today-first|composed-ui)\.css$/.test(url.pathname)){res.setHeader('Content-Type',mime['.css']);return res.end(fs.readFileSync(path.join(dist,path.basename(url.pathname)),'utf8').replace(/^@import[^\n]+\n/gm,''));}
 if(url.pathname==='/__timothy/shared-app.js'){res.setHeader('Content-Type',mime['.js']);return res.end(privateApp());}
 if(/^\/__timothy\/piece\/\d+\.svg$/.test(url.pathname)){const id=Number(path.basename(url.pathname,'.svg'));if(id>10){res.writeHead(404);return res.end();}res.setHeader('Content-Type',mime['.svg']);return res.end(pieceSvg(id));}
 let file;
 if(url.pathname.startsWith('/wardrobe-timothy/'))file=resolveUnder(media,decodeURIComponent(url.pathname.slice('/wardrobe-timothy/'.length)));
 else if(url.pathname==='/__timothy/vendor/OrbitControls.js')file=path.join(root,'node_modules/three/examples/jsm/controls/OrbitControls.js');
 else if(/^\/__timothy\/vendor\/three\.(?:module|core)\.js$/.test(url.pathname))file=path.join(root,'node_modules/three/build',path.basename(url.pathname));
 else if(url.pathname.startsWith('/__timothy/'))file=resolveUnder(privateCode,decodeURIComponent(url.pathname.slice('/__timothy/'.length)));
 else file=resolveUnder(dist,url.pathname==='/'?'index.html':decodeURIComponent(url.pathname.slice(1)));
 try{if(!file||!fs.statSync(file).isFile())throw Error('missing');res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');const size=fs.statSync(file).size;const range=req.headers.range;if(range&&/bytes=\d*-\d*/.test(range)){const[start,end]=range.replace('bytes=','').split('-').map(Number),last=end||size-1;if(start<0||last>=size||start>last){res.writeHead(416);return res.end();}res.writeHead(206,{'Content-Range':`bytes ${start}-${last}/${size}`,'Accept-Ranges':'bytes','Content-Length':last-start+1});fs.createReadStream(file,{start,end:last}).pipe(res);}else{res.setHeader('Content-Length',size);fs.createReadStream(file).pipe(res);}}catch{res.writeHead(404);res.end('Not found');}
});
if(require.main===module){
server.listen(Number(process.env.PORT||8000),'127.0.0.1',()=>console.log(`Local only: http://localhost:${server.address().port}/?wardrobe=timothy\nPublic demo: http://localhost:${server.address().port}/`));

const ipv6=http.createServer((req,res)=>server.emit('request',req,res));
ipv6.on('error',error=>console.error('IPv6 loopback listener:',error.message));
ipv6.listen(Number(process.env.PORT||8000),'::1');

}
module.exports={page,privateApp,pieceSvg};
