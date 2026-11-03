const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const code=fs.readFileSync('assets/js/editorial-slider.js','utf8');
class Element {
 constructor(){this.hidden=false;this.inert=false;this.attrs={};this.listeners={};this.children=[];this.style={setProperty:(k,v)=>this.style[k]=v};this.classes=new Set();this.classList={add:(...v)=>v.forEach(x=>this.classes.add(x)),remove:(...v)=>v.forEach(x=>this.classes.delete(x)),toggle:(x,on)=>on?this.classes.add(x):this.classes.delete(x)};}
 setAttribute(k,v){this.attrs[k]=String(v)} removeAttribute(k){delete this.attrs[k]} append(x){this.children.push(x)}
 addEventListener(k,fn){(this.listeners[k]??=[]).push(fn)} emit(k,e={}){for(const fn of this.listeners[k]||[])fn(e)}
 contains(){return false}setPointerCapture(){}
}
function setup(reduced=false){
 let now=0,id=0;const tasks=new Map(),doc=new Element();doc.hidden=false;doc.createElement=()=>new Element();
 const motion=new Element();motion.matches=reduced;const root=new Element();
 const groups={'.ofs-scene':Array.from({length:5},()=>new Element()),'.ofs-word':Array.from({length:5},()=>new Element()),'.ofs-copy':Array.from({length:5},()=>new Element()),'[data-index]':Array.from({length:5},()=>new Element()),'[data-step]':[-1,1].map(n=>Object.assign(new Element(),{dataset:{step:String(n)}}))};
 for(const key of ['.ofs-scene','.ofs-word','.ofs-copy'])groups[key].forEach((el,i)=>el.hidden=i!==0);
 const singles=Object.fromEntries(['.ofs-progress span','.ofs-counter','.ofs-status','.ofs-play'].map(s=>[s,new Element()]));root.querySelectorAll=s=>groups[s]||[];root.querySelector=s=>singles[s];
 const ctx={window:{matchMedia:()=>motion},document:doc,Date:{now:()=>now},setTimeout:(fn,ms)=>{tasks.set(++id,{fn,at:now+ms});return id},clearTimeout:i=>tasks.delete(i)};
 vm.runInNewContext(code,ctx);const slides=Array.from({length:5},(_,i)=>({id:i,title:'Look '+i,keyword:'Style '+i,subtitle:'Description',image:'local.svg',ctaText:'Browse',ctaUrl:'#category-tiles'}));
 const slider=new ctx.window.OaheeEditorialSlider(root,slides);
 function advance(ms){const end=now+ms;while(true){const next=[...tasks].filter(([,t])=>t.at<=end).sort((a,b)=>a[1].at-b[1].at)[0];if(!next)break;tasks.delete(next[0]);now=next[1].at;next[1].fn();}now=end;}
 return {slider,root,groups,singles,doc,motion,advance,tasks};
}
let f=setup();f.groups['[data-step]'][1].emit('click');assert.equal(f.slider.currentIndex,1);assert(f.slider.isAnimating);f.advance(1000);assert(f.groups['.ofs-scene'][0].hidden);assert(!f.groups['.ofs-scene'][1].hidden);
f.groups['[data-step]'][0].emit('click');f.advance(1000);assert.equal(f.slider.currentIndex,0);f.slider.step(-1);f.advance(1000);assert.equal(f.slider.currentIndex,4);f.slider.step(1);f.advance(1000);assert.equal(f.slider.currentIndex,0);
f.groups['[data-index]'][3].emit('click');f.advance(1000);assert.equal(f.slider.currentIndex,3);assert.equal(f.groups['[data-index]'][3].attrs['aria-pressed'],'true');
f=setup();f.advance(2999);assert.equal(f.slider.currentIndex,0);f.advance(1);assert.equal(f.slider.currentIndex,1);f.advance(1000);assert(!f.slider.isAnimating);
f=setup();f.root.emit('pointerenter',{pointerType:'mouse'});f.advance(3000);assert.equal(f.slider.currentIndex,1);f.advance(3000);assert.equal(f.slider.currentIndex,2);f.advance(3000);assert.equal(f.slider.currentIndex,3);
f=setup();f.slider.step(1);f.advance(2999);assert.equal(f.slider.currentIndex,1);f.advance(1);assert.equal(f.slider.currentIndex,2);
f=setup();f.root.emit('focusin');f.advance(3000);assert.equal(f.slider.currentIndex,1);
f=setup();f.doc.hidden=true;f.doc.emit('visibilitychange');f.advance(10000);assert.equal(f.slider.currentIndex,0);f.doc.hidden=false;f.doc.emit('visibilitychange');f.advance(3000);assert.equal(f.slider.currentIndex,1);
f=setup();f.singles['.ofs-play'].emit('click');f.advance(10000);assert.equal(f.slider.currentIndex,0);f.singles['.ofs-play'].emit('click');f.advance(0);assert.equal(f.slider.currentIndex,1);
f=setup();f.root.emit('keydown',{key:'ArrowLeft',preventDefault(){}});f.advance(1000);assert.equal(f.slider.currentIndex,4);
f=setup();f.slider.step(1);f.slider.step(1);f.slider.step(1);f.advance(2000);assert.equal(f.slider.currentIndex,3);assert.equal(f.groups['.ofs-scene'].filter(el=>!el.hidden).length,1);
f=setup();const target={closest:()=>null};f.root.emit('pointerdown',{button:0,clientX:220,clientY:100,pointerId:1,target});f.root.emit('pointerup',{clientX:100,clientY:105});f.advance(1000);assert.equal(f.slider.currentIndex,1);
f=setup();f.root.emit('pointerdown',{button:0,clientX:220,clientY:100,pointerId:1,target});f.root.emit('pointermove',{clientX:210,clientY:180,pointerId:1});f.root.emit('pointerup',{clientX:100,clientY:200});assert.equal(f.slider.currentIndex,0);
f=setup(true);f.advance(10000);assert.equal(f.slider.currentIndex,0);f.slider.step(1);f.advance(180);assert(!f.slider.isAnimating);
const css=fs.readFileSync('assets/css/editorial-slider.css','utf8');assert.equal((css.match(/{/g)||[]).length,(css.match(/}/g)||[]).length);assert(css.includes('max-width:480px'));assert(css.includes('prefers-reduced-motion'));
console.log('Passed: next/previous, thumbnails, looping both ways, autoplay, hover/focus continuation, visibility, 3000ms manual restart, pause/play, keyboard, rapid clicks, swipe, vertical-scroll rejection, reduced-motion and CSS checks.');
