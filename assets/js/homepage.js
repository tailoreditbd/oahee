(() => {
 'use strict';
 const c=window.OAHEE_HOMEPAGE;
 const $=s=>document.querySelector(s);
 const escape=s=>String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
 const items=list=>list.map(([title,text])=>`<li><strong>${escape(title)}</strong><p>${escape(text)}</p></li>`).join('');
 document.title=c.title;
 $('meta[name="description"]').content=c.description;
 $('#search').placeholder='Search for products, brands, or categories.';
 $('.hero h1').textContent=c.title;
 $('.hero h1').classList.add('content-headline');
 $('.hero-copy p').textContent=c.introduction;
 $('.hero-copy p').classList.add('content-introduction');
 $('.hero-copy .button').innerHTML='Start Shopping <span>↗</span>';
 $('.hero-copy .button').insertAdjacentHTML('afterend','<a class="hero-secondary" href="#sell-on-oahee">Sell on Oahee ↗</a>');
 const categorySection=$('#category-tiles').closest('section');
 categorySection.querySelector('h2').textContent='Shop online by category';
 categorySection.querySelector('.section-heading p').textContent='Whatever you are looking for, Oahee brings thousands of listings from independent sellers and businesses into one easy place to browse. Pick a category to get started.';
 $('#browse-categories').textContent='Browse All Categories ↗';
 $('#category-tiles').classList.add('content-categories');
 $('#category-tiles').innerHTML=c.categories.map(([title,id,description])=>{const category=window.OAHEE.categories.find(x=>x[1]===id);return `<a class="category-tile" href="#category-tiles" data-category="${id}"><img src="https://images.unsplash.com/${category[3]}?w=640&auto=format&fit=crop&q=85" alt="" width="640" height="640" loading="lazy"><strong>${escape(title)}</strong><p>${escape(description)}</p></a>`;}).join('');
 $('#homepage-content').innerHTML=`
 <section class="section how-it-works"><div class="section-heading"><div><span class="eyebrow">FROM SEARCH TO DOORSTEP</span><h2>How Oahee works</h2><p>Buying online should not feel complicated. Here is how to get from search to doorstep in four steps.</p></div></div><ol class="content-steps">${items(c.steps)}</ol></section>
 <section id="sell-on-oahee" class="section seller-section"><div><span class="eyebrow">YOUR PRODUCTS. NEW POSSIBILITIES.</span><h2>Sell online on Oahee</h2><p>Turn what you make, source, or no longer need into income. Oahee puts your products in front of shoppers who are already searching for them.</p><button class="button" data-info="Seller registration and listing tools are planned. Become a Seller will be available once seller onboarding is connected.">Become a Seller ↗</button><small>Seller tools are planned for launch.</small></div><ul>${items(c.seller)}</ul></section>
 <section class="section content-trust"><div class="section-heading"><div><h2>A Marketplace Built on Trust</h2><p>Your peace of mind matters as much as your purchase. Oahee works to keep every transaction clear, secure, and fair.</p></div></div><ul class="content-grid">${items(c.trust)}</ul></section>
 <section class="section content-reasons"><div class="section-heading"><div><h2>Why shop on Oahee</h2><p>Oahee is built to make online shopping simple, fair, and safe, whether you are buying a single gift or stocking up for the month.</p></div></div><ul class="content-grid">${items(c.reasons)}</ul><button class="text-button contact-cta" data-info="Oahee’s support phone number has not been supplied yet. Contact details will be published before launch.">Call Us Today ↗</button></section>
 <section class="section faq-section"><div><span class="eyebrow">A LITTLE MORE TO KNOW</span><h2>FAQs about Oahee</h2><p>Shopping, selling, and everything in between.</p></div><div>${c.faqs.map(([q,a])=>`<details><summary>${escape(q)}</summary><p>${escape(a)}</p></details>`).join('')}</div></section>`;
})();
