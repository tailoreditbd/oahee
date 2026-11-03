/* Video-inspired horizontal-band hero. Original Oahee content and imagery. */
(() => {
 'use strict';
 class OaheeEditorialSlider {
  constructor(root,slides){
   this.root=root;this.slides=slides;this.currentIndex=0;this.previousIndex=0;this.isAnimating=false;this.queued=null;
   this.timer=null;this.nextAt=Date.now()+3000;this.userPaused=false;
   this.motion=window.matchMedia('(prefers-reduced-motion: reduce)');this.render();this.bind();this.schedule();
  }
  render(){
   // Copy and markup are authored in index.html; only animation bands are generated.
   this.scenes=[...this.root.querySelectorAll('.ofs-scene')];this.words=[...this.root.querySelectorAll('.ofs-word')];this.copies=[...this.root.querySelectorAll('.ofs-copy')];this.dots=[...this.root.querySelectorAll('[data-index]')];this.progress=this.root.querySelector('.ofs-progress span');
   // Four fixed-size bands share one full-size image. Only the clipped bands move.
   this.scenes.forEach((scene,i)=>{for(let band=0;band<4;band++){
    const slice=document.createElement('span');slice.className='ofs-band';slice.style.setProperty('--band',band);
    const image=document.createElement('img');image.src=this.slides[i].image;image.alt='';image.width=1600;image.height=1000;slice.append(image);scene.append(slice);
   }});
  }
  go(index,manual=false,direction=1){
   if(manual){this.nextAt=Date.now()+3000;this.stop();}
   const next=(index%this.slides.length+this.slides.length)%this.slides.length;
   if(this.isAnimating){this.queued={index:next,direction};return;}
   if(next===this.currentIndex){this.schedule();return;}
   this.stop();this.nextAt=Date.now()+3000;this.isAnimating=true;this.previousIndex=this.currentIndex;this.currentIndex=next;
   this.root.style.setProperty('--ofs-direction',direction);this.root.classList.add('is-changing');
   const old=this.previousIndex;
   this.scenes[next].hidden=false;this.scenes[next].classList.add('is-entering');
   this.scenes[old].classList.add('is-leaving');
   this.words[old].classList.add('is-leaving');this.words[old].setAttribute('aria-hidden','true');
   this.words[next].hidden=false;this.words[next].removeAttribute('aria-hidden');this.words[next].classList.add('is-entering');
   this.copies[old].classList.add('is-leaving');this.copies[old].inert=true;
   this.copies[next].hidden=false;this.copies[next].inert=false;this.copies[next].classList.add('is-entering');
   this.dots.forEach((dot,i)=>dot.setAttribute('aria-pressed',String(i===next)));
   this.root.querySelector('.ofs-counter').textContent=`0${next+1} / 0${this.slides.length}`;
   if(manual)this.root.querySelector('.ofs-status').textContent=`${next+1} of ${this.slides.length}: ${this.slides[next].title}`;
   setTimeout(()=>{
    [this.scenes,this.words,this.copies].forEach(list=>{list[old].hidden=true;list[old].classList.remove('is-leaving','is-current');list[next].classList.remove('is-entering');});
    this.scenes[next].classList.add('is-current');this.root.classList.remove('is-changing');this.isAnimating=false;
    const queued=this.queued;this.queued=null;if(queued&&queued.index!==next)this.go(queued.index,false,queued.direction);else this.schedule();
   },this.motion.matches?180:1000);
  }
  step(delta,manual=true){this.go((this.queued?.index??this.currentIndex)+delta,manual,delta);}
  stop(){clearTimeout(this.timer);this.timer=null;this.progress.style.animation='none';}
  schedule(){
   this.stop();if(this.userPaused||document.hidden||this.isAnimating||this.motion.matches)return;
   const wait=Math.max(0,this.nextAt-Date.now());
   this.progress.style.setProperty('--ofs-wait',`${wait}ms`);void this.progress.offsetWidth;this.progress.style.animation='ofs-progress var(--ofs-wait) linear both';
   this.timer=setTimeout(()=>this.step(1,false),wait);
  }
  bind(){
   this.root.querySelectorAll('[data-step]').forEach(button=>button.addEventListener('click',()=>this.step(Number(button.dataset.step))));
   this.dots.forEach((button,i)=>button.addEventListener('click',()=>this.go(i,true,i<this.currentIndex?-1:1)));
   this.root.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();this.step(e.key==='ArrowRight'?1:-1);}});
   const play=this.root.querySelector('.ofs-play');play.addEventListener('click',()=>{this.userPaused=!this.userPaused;play.setAttribute('aria-label',this.userPaused?'Play slideshow':'Pause slideshow');this.root.classList.toggle('is-paused',this.userPaused);this.schedule();});
   this.root.addEventListener('pointerdown',e=>{if(e.button!==0||e.target.closest('button,a'))return;this.drag={x:e.clientX,y:e.clientY,id:e.pointerId};this.stop();});
   this.root.addEventListener('pointerup',e=>{if(!this.drag)return;const dx=e.clientX-this.drag.x,dy=e.clientY-this.drag.y;this.drag=null;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.5)this.step(dx<0?1:-1);else this.schedule();});
   this.root.addEventListener('pointercancel',()=>{this.drag=null;this.schedule();});
   this.root.addEventListener('pointermove',e=>{if(!this.drag)return;const dx=e.clientX-this.drag.x,dy=e.clientY-this.drag.y;if(Math.abs(dy)>15&&Math.abs(dy)>Math.abs(dx)){this.drag=null;this.schedule();}else if(Math.abs(dx)>15&&Math.abs(dx)>Math.abs(dy)*1.5){this.root.setPointerCapture(e.pointerId);}});
   document.addEventListener('visibilitychange',()=>{this.nextAt=Date.now()+3000;this.schedule();});this.motion.addEventListener('change',()=>{this.nextAt=Date.now()+3000;this.schedule();});
  }
 }
 window.OaheeEditorialSlider=OaheeEditorialSlider;
 if(!window.OAHEE_EDITORIAL_SLIDES?.length)return;
 const root=document.querySelector('#oahee-fashion-editorial');
 if(!root)return;
 const header=document.querySelector('header');
 const fitViewport=()=>root.style.setProperty('--oahee-header-height',header.getBoundingClientRect().height+'px');
 fitViewport();
 const headerObserver=new ResizeObserver(fitViewport);headerObserver.observe(header);

 window.oaheeEditorial=new OaheeEditorialSlider(root,window.OAHEE_EDITORIAL_SLIDES);
})();
