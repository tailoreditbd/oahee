/* Read authored HTML; index.html is the single source for campaign copy. */
(() => {
 const root=document.querySelector('#oahee-fashion-editorial');
 const scenes=[...root.querySelectorAll('.ofs-scene')];
 const words=[...root.querySelectorAll('.ofs-word')];
 const copies=[...root.querySelectorAll('.ofs-copy')];
 window.OAHEE_EDITORIAL_SLIDES=scenes.map((scene,i)=>({
  id:scene.dataset.slideId,
  title:scene.dataset.title,
  keyword:words[i].textContent.trim(),
  subtitle:copies[i].querySelector('p').textContent.trim(),
  image:scene.querySelector('img').getAttribute('src'),
  ctaText:copies[i].querySelector('a').textContent.trim(),
  ctaUrl:copies[i].querySelector('a').getAttribute('href')
 }));
})();
