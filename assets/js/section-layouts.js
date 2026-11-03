/* Layout and captions are HTML. Optional image configuration remains supported. */
(() => {
 'use strict';
 document.querySelectorAll('[data-section-image]').forEach(img=>{
  const image=window.OAHEE_SECTION_IMAGES?.[img.dataset.sectionImage];
  if(!image)return;
  img.src=image.src;img.alt=image.alt;
  img.style.objectPosition=image.position||'center';
 });
})();
