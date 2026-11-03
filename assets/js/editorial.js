/* Original Oahee presentation: broad marketplace collections, editorial browsing. */
(() => {
 'use strict';
 const $=s=>document.querySelector(s);
 const paths={search:'m21 21-4.4-4.4 M19 10.5a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0',user:'M20 21v-2a7 7 0 0 0-14 0v2 M13 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8',heart:'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8',bag:'M5 7h14l1 14H4L5 7 M8 7V5a4 4 0 0 1 8 0v2',grid:'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z'};
 const icon=name=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[name]}"/></svg>`;
 $('#search-form>span').innerHTML=icon('search');$('.search-button').innerHTML=icon('search')+'<span>Search</span>';
 document.querySelectorAll('.main-header .header-action').forEach((button,i)=>{const span=button.querySelector('span');const badge=span.querySelector('.cart-count');span.innerHTML=icon(['user','heart','bag'][i]);if(badge)span.append(badge);});
 $('#all-categories').innerHTML=icon('grid')+'<b>All Categories</b><span aria-hidden="true">⌄</span>';
 const navCategories=[...document.querySelectorAll('#category-tiles>.category-tile')].map(card=>[card.querySelector('strong').textContent,card.dataset.category]);
 $('#search-category').innerHTML='<option value="all">All</option>'+navCategories.map(([title,id])=>`<option value="${id}">${title}</option>`).join('');
 $('#mega-menu').innerHTML=navCategories.map(([title,id])=>`<a href="#category-tiles" data-category="${id}"><b>${title}</b></a>`).join('');
 const navToggle=$('#nav-toggle'),navigation=$('.navigation');
 function toggleNav(open){navigation.classList.toggle('nav-open',open);navToggle.setAttribute('aria-expanded',String(open));navToggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');}
 navToggle.addEventListener('click',()=>toggleNav(navToggle.getAttribute('aria-expanded')!=='true'));
 $('#nav-links').addEventListener('click',e=>{if(e.target.closest('a'))toggleNav(false);});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&navToggle.getAttribute('aria-expanded')==='true'){toggleNav(false);navToggle.focus();}});
 document.addEventListener('click',e=>{if(!e.target.closest('header'))toggleNav(false);});
 window.matchMedia('(min-width: 1025px)').addEventListener('change',e=>{if(e.matches)toggleNav(false);});
 document.body.classList.add('editorial-storefront');
})();
