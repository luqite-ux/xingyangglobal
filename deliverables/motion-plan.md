# Motion plan

Generated: 2026-11-16T08:57:02.317Z

The plan uses four bounded scenes, distinct from recent furniture/filter/plastics patterns. All reveal state is triggered by real viewport entry; no global timeout may mark unseen sections complete.

| ID | Scene | Purpose | Desktop | 390px | Reduced motion |
|---|---|---|---|---|---|
| XY-M01 | Hero flour-flow field | Connect grain/flour processing to the machinery story without altering equipment facts | Lightweight Three.js points/flow behind live copy and real banner subject; pointer input only adds subtle drift | Static layered SVG/gradient; no WebGL requirement | Static composition, no autoplay |
| XY-M02 | Machine-path schematic | Show intake → processing → output as an explanatory motif | SVG/Canvas path draws once when the process section enters view | Step cards fade in without path tracing | Full diagram immediately visible |
| XY-M03 | Product/spec reveal | Help buyers compare families and model tables | Bounded in-view stagger (max 4 visible items), spec rows reveal in reading order | Short opacity/translate reveal; no hover dependency | Immediate content, no stagger |
| XY-M04 | Controls and navigation | Make menus, cards, FAQ and CTAs responsive | 120–220ms focus/hover/press feedback; stable layout | Same press/focus response; direct reading | Color/focus feedback only |

External candidates evaluated: Motion inView for lifecycle-safe one-time viewport entry (candidate to adopt); Three.js Points/BufferGeometry for the bounded flour-flow hero (candidate to adopt after performance budget); GSAP ScrollTrigger pin/scrub and continuous full-machine 3D rotation are rejected because they add mobile/performance and product-authenticity risk.

Verification targets: desktop and 390px; prefers-reduced-motion; delayed scroll after 16 seconds; late sections must animate only after entering view; no horizontal overflow; controls remain keyboard reachable; WebGL failure leaves complete static content.
