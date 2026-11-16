# v0 full-site generation prompt — Xingyang Global

Create a complete, editable Next.js 16 App Router frontend for the verified customer below. This is the first full-site design pass. Return the full multi-route source, not an image-only concept and not a single landing page.

## User-authored visual direction — preserve verbatim

“网站设计风格参考 https://openai.com/index/gpt-6-astra/ ，但是不要黑色调的。在制作时要灵活采用three.js脚本，不要弄那种死气沉沉的css出来。”

Interpret this as a request for the reference page’s spatial polish, editorial rhythm, layered motion and contemporary interactive feeling—not its branding or content. The delivered site must not use a black overall palette. Use a luminous warm off-white base, mineral blue, stainless silver and restrained flour/orange accents. Dark customer-supplied banner artwork may appear as individual campaign slides, but the header, surrounding sections and overall identity stay light. Avoid a generic blue-tech template, repetitive identical cards, cheap glow, excessive pills/rounded corners and lifeless static CSS-only composition.

Use Three.js selectively and purposefully: an original, lightweight flour/grain-flow point field behind the Hero copy and/or a bounded process-path scene can add depth. Keep all real machine images as factual anchors. Do not synthesize or rotate a fake 3D machine. Mobile, low-power, WebGL failure and `prefers-reduced-motion` modes must fall back to complete static layered artwork with no lost content or controls.

## Customer facts

- Verified Chinese legal name: 荥阳市面粉机械制造厂.
- Delivery-only faithful English display name: Xingyang City Flour Machinery Manufacturing Factory. This is a derived direct translation, not a claim of an officially registered English name.
- Domain: xingyangglobal.com.
- Formal public email: info@xingyangglobal.com.
- Phone: +86 135 2358 4804.
- Address: Gaocun, Xingyang, Henan, China.
- Founded: 2002.
- Verified manufacturing facts: 3,000 m² site, two workshops, three warehouses, one automated line, one customized line, stated production capacity of 300 units per month.
- Verified product families: Multi-function Pulverizers, Stainless Steel Pulverizers, Wood Crushers, Stainless Steel Mixers, Fiber Filling Machines.
- Verified application domains: agriculture, forestry and food processing.
- Verified MOQ: one machine.
- First release language: English. Preserve locale-aware data interfaces and route/metadata patterns for later languages, but do not expose empty language pages or a language switcher yet.
- No official Logo was supplied. Use a clean text wordmark “XINGYANG / FLOUR MACHINERY” consistently in the header/footer. Create a matching temporary square `XY` favicon from the same typography and palette. Do not use a v0, Vercel, Next.js or template icon.

Do not publish a fixed lead time because supplied answers conflict (10 versus 15 days). Do not promise sample availability because supplied answers conflict. Never publish warranty, guarantee, warranties, guaranteed, 质保, 保修 or equivalent commitments. Do not invent certifications, customer names/logos, projects, export countries, reviews, prices, inventory, equipment, parameters or performance figures.

## Required assets and factual boundaries

All three attached `banner-1.jpg`, `banner-2.jpg`, and `banner-3.jpg` are mandatory Hero slides. Use each exactly once in the carousel; do not discard, replace or hide any slide. They are customer-supplied campaign artwork, but they are not proof that every depicted factory, robot or production line belongs to the customer. Never label them “our actual factory/line” or derive new capability claims from their pixels.

The five attached `product-*.jpg` images are representative real catalogue samples for layout design only. They do not define the total future product count. Build an extensible product/category/detail template because Codex will integrate all supplied product media and backend data after source takeover.

Hero messages are fixed in `banner-message-plan.json` and must remain meaningfully different:

1. “Grinding and Mixing Equipment Built Around Real Process Needs” → `/products`.
2. “Turn Material Requirements Into a Clear Equipment Plan” → `/products`.
3. “One Catalogue for Grinding, Crushing, Mixing and Filling Tasks” → `/contact?intent=model-selection`.

Use real DOM text and controls over the images. Do not bake English copy into artwork. Each slide needs accessible manual controls, keyboard/touch operation, pause behavior and reduced-motion behavior. Do not apply a universal full-frame dark overlay or filter that hides machine/factory subjects. Use only a localized text-safety treatment. At 390px, recrop around the meaningful subject or move copy beneath the image when the source has no safe area.

## Information architecture

Visible top navigation must explicitly include: Home, Products, Applications, Manufacturing, About, News, Contact. The Logo/wordmark also links Home.

Create independent routes and reusable templates:

- `/` Home.
- `/products` catalogue with real category filters.
- `/products/[slug]` product detail template with gallery, overview, structured specifications, applications, selection notes and product-context RFQ.
- `/applications` and useful application sections/routes for agriculture, forestry and food processing without invented claims.
- `/manufacturing` for verified facility/capacity facts and a neutral order workflow.
- `/about`.
- `/news` and `/news/[slug]`; use the visible label exactly “News”. With no published articles, render a polished honest empty state—no demo posts.
- `/contact` with RFQ UI.
- Prepare backend-driven `/cases` and `/certificates` route templates, but do not promote them in navigation or show fake public cards while no real records exist.
- `/admin` is only a future proxy entry. Do not implement Supabase, authentication, R2, deployment or shared-admin backend in v0.

## Homepage story — use stable section IDs

Implement at least these ten effective sections, each adding new buyer information rather than repeating slogans:

1. `hero` — equipment scope, manufacturer identity and next actions; three mandatory banners.
2. `product-families` — five comparable family entries. Each whole card, image and title must enter its real non-empty category state/route with keyboard and 390px touch support.
3. `selection-guide` — explain model choice through material, expected output, capacity, power/voltage and contact material. Use readable structured table/card patterns, not unverifiable values.
4. `applications` — three consistent application dimensions: agriculture, forestry, food processing.
5. `manufacturing-proof` — 2002, 3,000 m², two workshops, three warehouses, two production-line types and 300 units/month. Use semantic line icons/diagrams rather than number-only text cards.
6. `workflow` — Inquiry → Technical Confirmation → Production Scheduling → Pre-shipment Inspection. This is a neutral process explanation, not a timing or warranty promise.
7. `quality-and-fit` — what the buyer should provide and how suitability is checked from material/output requirements; no certification badge.
8. `about` — legal identity, address, manufacturer background and a route to About.
9. `faq` — include MOQ one machine and practical model-selection questions; omit conflicting lead-time/sample statements and all warranty language.
10. `final-rfq` — contextual route into the RFQ.

News empty state, header, footer and duplicate CTA strips do not count as effective sections. Certificates, cases and clients do not count because no source evidence was supplied.

## Products and selection content

Use these real public category names and targets:

- Multi-function Pulverizers → `/products?category=multi-function-pulverizers`; broad grinding family with supplied models and output examples.
- Stainless Steel Pulverizers → `/products?category=stainless-steel-pulverizers`; stainless contact/build variants where supported by product source.
- Wood Crushers → `/products?category=wood-crushers`; wood/straw processing family.
- Stainless Steel Mixers → `/products?category=stainless-steel-mixers`; supplied 15/30/50/100/200 kg model range and batch-mixing context.
- Fiber Filling Machines → `/products?category=fiber-filling-machines`; image-supported identity only; do not invent structured specifications.

Make the product image the visual subject. Product cards and detail galleries use `object-fit: contain` or an equivalent complete-subject treatment on a clean, continuous light stage. Do not crop hoppers, outlets, motors, attachments or parameter labels. Avoid white framed-photo boxes inside white cards; images must visually merge with their section. No grey-to-black gradient is allowed to hide image boundaries.

The supplied verified examples that may later populate structured tables include wood-crusher model 420 facts and mixer model 15/30/50/100/200 facts; do not add values not explicitly present in source. Model 1500 was mentioned without a verified parameter row and must not receive invented specs.

## Visual and interaction system

- Typography: contemporary editorial grotesk for English headings, readable neutral sans for body; strong but not oversized industrial headings; clear numeric/spec hierarchy.
- Layout: generous but useful whitespace, asymmetric editorial grids, thin technical rules, restrained data labels, real machine subjects at meaningful size.
- Color: warm off-white surfaces; deep mineral blue text/structure; stainless grey; controlled flour/orange accent. Do not make the whole site dark or black.
- Information cards for workflow, capabilities and applications must each use a semantically distinct, unified line icon or geometric symbol. No emoji and no repeated generic icon.
- Every public major section must have a perceptible in-view entrance in normal-motion mode. Trigger only when the section actually enters the viewport. Never use a fixed/global timeout to pre-mark unseen sections as revealed or completed. The fallback may restore visibility but must not consume later motion.
- Bound card stagger to visible items and reading order. Keep first content and CTA immediately usable. No scroll hijacking, long pinned sections, magnetic cursor, continuous flashing or uncontrolled particle load.
- Navigation, product dropdown/mobile drawer, FAQ, cards, links and buttons need hover, focus-visible, press and disabled/error states. Mobile navigation must close without focus traps.
- Meet WCAG AA contrast, 44px touch targets and a single meaningful H1 per page.

## RFQ UI

Design a short but useful RFQ with name, email, phone/WhatsApp (optional), company (optional), product/category, application/material, desired capacity/output, quantity and message. Product detail RFQs must visibly carry the product context. Include a clear 4-character image CAPTCHA placeholder component with input and refresh affordance; Codex will connect the server-issued atomic challenge later. Do not use `alert`, `console.log` or `setTimeout` as a fake successful submission. Provide explicit idle, submitting, success and error UI states without claiming a backend exists in v0.

## Delivery quality

Return clean, maintainable Next.js 16 App Router source with sensible Server/Client boundaries, reusable components, accessible interactions, responsive desktop and 390px layouts, image optimization, metadata scaffolding, locale-ready interfaces and no default framework branding. Do not include checkout, cart, payment or prices. Do not use third-party peer assets, customer logos, claims or text. The result must be visually complete enough for real screenshot review, while backend, full customer media, Supabase, R2 and Production integration remain for Codex after download.
