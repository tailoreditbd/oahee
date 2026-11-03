/* Search behaviour only. Introduction content is authored in index.html. */
(() => {
 'use strict';
 const form=document.querySelector('.intro-search');
 form.addEventListener('submit',event=>{
  event.preventDefault();
  document.querySelector('#search').value=form.querySelector('input').value.trim();
  document.querySelector('#search-form').requestSubmit();
 });
})();
