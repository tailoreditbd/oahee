const fs=require('node:fs'),assert=require('node:assert/strict');
const fixture=JSON.parse(fs.readFileSync('tests/fixtures/homepage-copy.json','utf8'));
const decode=s=>s.replace(/&#(x[0-9a-f]+|\d+);/gi,(_,n)=>String.fromCodePoint(n[0].toLowerCase()==='x'?parseInt(n.slice(1),16):Number(n))).replace(/&(?:amp|lt|gt|quot|apos|nbsp);/g,m=>({'&amp;':'&','&lt;':'<','&gt;':'>','&quot;':'"','&apos;':"'",'&nbsp;':' '})[m]);
const plain=s=>decode(s.replace(/<[^>]*>/g,'')).replace(/\s+/g,' ').trim();
const html=fs.readFileSync('index.html','utf8');const main=html.slice(html.indexOf('<main '),html.indexOf('</main>')).replace(/<section[^>]*data-content-copy="categories"[^>]*>[\s\S]*?<\/section>/g,'');
const actual={};
for(const tag of ['h1','h2','strong','summary','p'])actual[tag]=[...main.matchAll(new RegExp('<'+tag+'\\b[^>]*>([\\s\\S]*?)<\\/'+tag+'>','g'))].map(m=>plain(m[1]));
const actions=[...main.matchAll(/<(a|button)\b([^>]*)>([\s\S]*?)<\/\1>/g)];
actual.buttons=actions.filter(m=>/class="button"|id="browse-categories"|class="text-button contact-cta"/.test(m[2])||(/href="#sell-on-oahee"/.test(m[2]))).map(m=>plain(m[3].replace(/<span aria-hidden="true">[\s\S]*?<\/span>/g,'')));
actual.buttons=actual.buttons.filter(label=>label!=='Search');
actual.placeholder=[decode(main.match(/id="discovery-search"[^>]*placeholder="([^"]*)"/)[1])];
let total=0;
for(const [role,expected] of Object.entries(fixture.expected)){
 if(role==='buttons')assert.deepEqual([...actual[role]].sort(),[...expected].sort(),'Button text differs from ZIP');
 else assert.deepEqual(actual[role],expected,role+' differs from ZIP');
 total+=expected.length;
}
assert(!main.includes('Seller tools are planned for launch.'));
assert(!main.includes('Shopping, selling, and everything in between.'));
console.log(`Passed: all ${total} content fields match the supplied ZIP exactly after HTML entity/whitespace normalization.`);
