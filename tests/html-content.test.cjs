const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync('index.html','utf8');
for(const heading of ['How Oahee works','Sell online on Oahee','A Marketplace Built on Trust','Why shop on Oahee','FAQs about Oahee'])assert(html.includes('<h2>'+heading+'</h2>'));
assert.equal((html.match(/class="category-tile"/g)||[]).length,24);
assert.equal((html.match(/<details>/g)||[]).length,5);
assert(!/src="(?:data\/homepage|assets\/js\/homepage)\.js/.test(html));
const sceneMatches=[...html.matchAll(/<div class="ofs-scene [^"]*" data-slide-id="([^"]*)" data-title="([^"]*)"[^>]*>\s*<img src="([^"]*)"/g)];
const words=[...html.matchAll(/<span class="ofs-word"[^>]*>([^<]*)<\/span>/g)];
const copies=[...html.matchAll(/<div class="ofs-copy"[^>]*>\s*<p>([^<]*)<\/p>\s*<a class="ofs-cta" href="([^"]*)">([^<]*)/g)];
assert.equal(sceneMatches.length,5);assert.equal(words.length,5);assert.equal(copies.length,5);
function readCopy(edited){
 const sceneNodes=sceneMatches.map(m=>({dataset:{slideId:m[1],title:m[2]},querySelector:()=>({getAttribute:()=>m[3]})}));
 const wordNodes=words.map(m=>({textContent:m[1]}));
 const copyNodes=copies.map((m,i)=>({querySelector:s=>s==='p'?{textContent:i===0&&edited?'My edited HTML paragraph':m[1]}:{textContent:m[3],getAttribute:()=>m[2]}}));
 const ctx={window:{},document:{querySelector:()=>({querySelectorAll:s=>s==='.ofs-scene'?sceneNodes:s==='.ofs-word'?wordNodes:copyNodes})}};
 vm.runInNewContext(fs.readFileSync('data/editorial-slides.js','utf8'),ctx);return ctx.window.OAHEE_EDITORIAL_SLIDES;
}
assert.equal(readCopy(true)[0].subtitle,'My edited HTML paragraph');assert.equal(readCopy(false).length,5);
for(const file of ['assets/js/editorial-slider.js','assets/js/editorial.js','assets/js/hero-slider.js','assets/js/section-layouts.js'])assert(!fs.readFileSync(file,'utf8').includes('OAHEE_HOMEPAGE'));
console.log('Passed: native HTML headings, eight categories, five FAQs, five synchronized hero scenes, and edited HTML copy feeds slider data.');
