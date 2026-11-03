(() => {
 'use strict';
 document.querySelectorAll('.category-tiles.content-categories').forEach(track=>{
 const shell=document.createElement('div');
 shell.className='category-slider';
 shell.setAttribute('role','region');
 shell.setAttribute('aria-label','Shop online by category');
 track.before(shell);
 shell.append(track);
 track.tabIndex=0;
 track.setAttribute('aria-label','Categories. Use arrow keys to browse.');
 const browse=track.closest('section').querySelector('.text-button');
 browse.className='button category-browse';
 browse.textContent='Browse All Categories';
 shell.after(browse);
 const originals=[...track.children];
 originals.forEach(card=>{
  const clone=card.cloneNode(true);
  clone.setAttribute('aria-hidden','true');
  clone.tabIndex=-1;
  track.append(clone);
 });
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 let frame=0,last=0,position=0,touching=false;
 const cycle=()=>track.children[originals.length].offsetLeft-track.children[0].offsetLeft;
 function stop(){cancelAnimationFrame(frame);frame=0;last=0;}
 function tick(time){
  const distance=cycle();
  if(last&&distance){
   position=(position+Math.min(time-last,64)*.035)%distance;
   track.scrollLeft=position;
  }
  last=time;
  frame=requestAnimationFrame(tick);
 }
 function start(){
  stop();
  if(reduced.matches||document.hidden||touching||shell.contains(document.activeElement))return;
  position=track.scrollLeft;
  frame=requestAnimationFrame(tick);
 }
 track.addEventListener('keydown',event=>{
  if(event.target!==track)return;
  if(event.key==='ArrowLeft'||event.key==='ArrowRight'){
   event.preventDefault();
   track.scrollBy({left:(event.key==='ArrowRight'?1:-1)*(originals[0].offsetWidth+24),behavior:'instant'});
  }
 });
 shell.addEventListener('focusin',stop);
 shell.addEventListener('focusout',event=>{if(!shell.contains(event.relatedTarget))start();});
 track.addEventListener('touchstart',()=>{touching=true;stop();},{passive:true});
 ['touchend','touchcancel'].forEach(type=>track.addEventListener(type,()=>{touching=false;start();},{passive:true}));
 document.addEventListener('visibilitychange',start);
 reduced.addEventListener('change',start);
 start();
 });
})();
