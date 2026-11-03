/* Build the public static site only; exclude local notes, tests and PHP. */
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),output=path.join(root,'dist','oahee');
fs.mkdirSync(output,{recursive:true});
fs.copyFileSync(path.join(root,'index.html'),path.join(output,'index.html'));
for(const directory of ['assets','data'])fs.cpSync(path.join(root,directory),path.join(output,directory),{recursive:true});
fs.writeFileSync(path.join(output,'.nojekyll'),'');
const html=fs.readFileSync(path.join(output,'index.html'),'utf8');
const references=[...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(m=>m[1]).filter(s=>!s.startsWith('#')&&!/^(https?:|mailto:|tel:|data:)/.test(s)&&s!=='./');
for(const ref of references){const relative=ref.split(/[?#]/)[0];if(!fs.existsSync(path.join(output,relative)))throw Error('Missing deployment asset: '+relative);}
console.log('Static site ready: '+output+' ('+references.length+' local references verified)');
