# Oahee storefront

Original, buildless Bangladesh marketplace preview. Open `http://localhost/Oahee/` through XAMPP, or serve this directory using PHP. No npm dependencies or framework required.

## Current design

Latest navigation follows the user-supplied Evaly screenshot's two-row hierarchy: Oahee logo, category-scoped search with a Search button, sign-in/wishlist/cart; below, All Categories and a horizontally browsable category rail. `assets/css/marketplace-header.css` supersedes the previous single-row navigation rules. Mobile puts search on its own row and keeps category links swipeable. The search category selector actually filters the sample catalog. Branding remains Oahee navy/peach.

Approved brand palette: midnight navy `#10253F` and warm peach `#EDAA78`, taken from the first banner. `assets/css/brand.css` centralizes these colors and applies them to logos, buttons, navigation states, badges, category accents, purchase steps, dialogs, wishlist, footer and focus indicators. White and neutral grays remain supporting surfaces; semantic product availability colors remain distinct.

Banner placement correction: the two-slide full-width promotional carousel is independent of the document introduction. Page order is header → banner carousel → original document H1/introduction → categories and the remaining document sections. The carousel contains promotional text, not the page H1. The original document title and introduction are preserved in a separate section within main.

The header is followed by one full-viewport-width carousel with two slides, replacing the previous contained hero. `assets/js/hero-slider.js` and `assets/css/hero-slider.css` supply arrows, slide dots, swipe/keyboard navigation, a pause button and 6.5-second automatic rotation. Rotation pauses on hover/focus and hidden tabs, and starts paused with reduced-motion preferences. Inactive slides are hidden and inert. Both slides use the supplied homepage topics; the rest of the homepage section scope is unchanged.

Navigation now follows a simple one-row structure: logo, Home, Shop, Categories dropdown, About us, Contact, compact search, account and cart. Mobile uses an accessible hamburger menu and a full-width search field. Existing category, search and cart dialogs remain functional. Header utility controls are visually removed; delivery location is accessible in the footer. Typography uses Outfit for headings, Plus Jakarta Sans for interface/body text and Noto Sans Bengali for Bengali text, with system fallbacks.

The user-selected design is premium navy, white and subtle orange. `assets/css/premium.css` replaces the previous editorial theme, with a rebuilt header/search, SVG action icons, aligned product showcase hero, image-led category cards, numbered purchase steps, navy seller panel, trust layout and FAQ accordions. Responsive rules cover desktop, tablet and two-column mobile category browsing. `assets/js/editorial.js` now applies this presentation. The old `editorial.css` is inactive.

## Current homepage scope

Only sections from the supplied homepage document are shown: hero, categories, how it works, seller information, trust, shopping benefits and FAQs. Extra deals, campaigns, trending collections, category merchandising, brands, new arrivals, recommendations, recently viewed, editorial introduction, newsletter and payment strips were removed. Header/footer navigation remains. Search, wishlist and category results open in a dialog rather than adding homepage sections.

## Files and components

- Current visual presentation uses `assets/css/editorial.css` and `assets/js/editorial.js`: a full-width multi-category campaign, warm ivory/violet palette, image-led introduction, category discovery, product collections and an editorial trust section. The user-requested Girosto reference informed broad browsing patterns only; its source, branding, copy and imagery were not reused. The manual campaign slider is replaced by the multi-product hero in this presentation. Existing cart, search, wishlist and catalog controls remain available.

- Homepage copy now follows the user-supplied `Oahee Homepage.zip`: metadata, hero, eight described categories, how it works, selling, trust, shopping benefits and five FAQ accordions. Copy lives in `data/homepage.js`; `assets/js/homepage.js` presents it with `assets/css/homepage-content.css`. Claims about connected payments, real reviews, seller onboarding and support were adapted to the actual demo status. No phone number was supplied, so the contact CTA explains availability rather than dialing an invented number.

- `index.html`: semantic homepage, header, campaign hero, category navigation, trust strip, deals, merchandising, brands, newsletter, footer and native dialog shells.
- `assets/css/storefront.css`: design tokens, product cards, page layouts and responsive rules at 1450, 1200, 1024, 768 and 480px. Two product columns at 360px, three on tablets, four to six on desktop. Safe-area-aware mobile navigation.
- `data/catalog.js`: replaceable sample categories, products, brands and Bangladesh divisions/districts.
- `assets/js/storefront.js`: keyboard search, filters, category mega menu, manual campaign slider, product previews, local wishlist/cart/history and location selection.
- `index.php`: lightweight PHP entry point; does not require Laravel to preview.

## Laravel migration

Move assets into `public/assets` and the catalog endpoint behind a ProductController. Split the HTML into `resources/views/layouts/storefront.blade.php`, header/footer includes, `components/product-card.blade.php`, and homepage sections. Replace static asset references with `asset()`, links with named `route()` calls and product fragment preview URLs with `route('products.show', $product->slug)`. Existing preview fragments are intentional: no fake product routes are registered.

Replace `window.OAHEE` with a safely serialized `Js::from()` catalog or API response. Keep fields `id`, `name`, `category`, `brand`, `price`, `old`, `rating`, `reviews`, `image`, `badge`, `delivery`, `stock` consistent or adapt the rendering layer. Use integer minor units in production and recalculate prices and stock on the server. Current display prices are BDT whole taka.

Suggested routes: `/shop`, `/category/{slug}`, `/product/{slug}`, `/brand/{slug}`, `/offers`, `/flash-deals`, `/cart`, `/checkout`. Add server-side cart validation, authentication, CSRF protection, inventory, delivery serviceability/fees and order persistence. Store translated strings in `lang/en` and `lang/bn`; add an appropriate Bengali font when translations are provided. Payments need separate verified bKash, Nagad and card provider integrations. No payment method is connected in this preview.

## Demo boundaries / assets

All product titles, reviews, ratings, prices, discounts, stock, brands and campaigns are illustrative. Countdown is an explicitly labelled demo countdown. Merchandising sections include a primary category selection and cross-category discovery products. Recently viewed uses only products actually opened in this browser. Cart, wishlist, recent searches and selected area stay in browser localStorage. No fake user history, real authentication, newsletter submission, purchases, geolocation or personalised recommendations.

Images are externally hosted Unsplash illustrative photographs; no competitor banners, logos or source assets are used. Production needs approved product photography, complete product specifications, policies, support details and app/social destinations. Download and optimize approved assets into `public/assets/img` for reliable production delivery and self-host fonts. External fonts currently use Google Fonts; system fonts provide fallback. Actual shipping/returns eligibility must be set by the merchant before launch.

## Homepage section images

Edit `data/section-images.js` to replace the four section photographs. Each entry (`how`, `seller`, `trust`, `reasons`) accepts `src`, `alt`, and `position`.

For example, place your photo at `assets/img/seller.jpg`, set `seller.src` to `assets/img/seller.jpg`, and update its `alt` description. Use `position: 'center'` or `'center top'` to control cropping. Landscape photos work well for How it works and Seller; portrait photos suit Trust. Images fill their panels automatically, and layouts stack on mobile.

Section layouts are implemented in `assets/js/section-layouts.js` and `assets/css/section-layouts.css`. Current photos are illustrative external images. This is a static site; replacing images is done through these files.

## Video-style homepage hero

The active homepage carousel is `assets/js/editorial-slider.js` with `assets/css/editorial-slider.css`. Edit the five campaigns in `data/editorial-slides.js` (background image, highlighted keyword, description and CTA).

The supplied video informed the interaction: a stationary headline prefix, vertical word reveal and four alternating horizontal image bands. The old thumbnail-strip presentation is replaced by full-background scenes and compact numbered navigation. Oahee content and the Luna palette are retained; no footage or assets from the reference video are included.

Autoplay waits five seconds after a completed transition, pauses on hover/focus/hidden tabs, and waits until at least eight seconds after a manual action. Reduced motion disables autoplay and uses short opacity transitions. Use the circular control to pause/play. Background images include the local user-provided fan photo and existing external Unsplash image URLs; self-host approved photos for production.

Run `node tests/editorial-slider.test.cjs` for interaction/state checks. Native browser visual verification remains separate from these simulated DOM tests.

## Editing visible text (current source of truth)

Edit headings, paragraphs, category descriptions, FAQ questions/answers, button labels and hero campaign copy directly in `index.html`. The homepage no longer loads `data/homepage.js` or `assets/js/homepage.js`; those are legacy sources and do not control displayed copy.

The hero is also authored in HTML. Keep the five `.ofs-scene` backgrounds, five `.ofs-word` labels and five `.ofs-copy` blocks in matching order. `data/editorial-slides.js` reads this markup instead of owning the text; `assets/js/editorial-slider.js` only adds animation behaviour. Existing 3-second autoplay and horizontal band transitions are preserved.

Section layouts are now static HTML. `assets/js/section-layouts.js` only applies optional image configuration from `data/section-images.js`. Category scrolling clones the authored category cards without replacing their content.

Checks: `node tests/html-content.test.cjs` and `node tests/editorial-slider.test.cjs`.

## Homepage copy audit

H1 through FAQ copy was checked against `Oahee Homepage.zip / OaheeHomepage.html`. Fifteen modified paragraphs were restored, four Trust label colons were restored, and extra eyebrow/launch notes and the added FAQ introduction were removed. The approved words now live directly in `index.html`.

`node tests/homepage-copy.test.cjs` checks all 81 authored content fields (heading text, category/list titles, paragraphs, FAQ questions, CTA labels and search placeholder) against `tests/fixtures/homepage-copy.json`, extracted from the supplied ZIP. Only HTML entities and whitespace are normalized. Source heading wording is preserved while existing section heading levels/layout are retained. Campaigns above H1 and the footer are outside this content audit.

## Current logo colour system

`assets/css/oahee-brand.css` loads last and defines the current orange/blue UI, sampled from the supplied Oahee logo: orange `#F24A03`, blue `#0F386E`. Actions use orange; headings use blue. Dark button labels and darker orange hover states preserve text contrast. This supersedes the earlier Luna palette while retaining existing layout, imagery and interactions.
