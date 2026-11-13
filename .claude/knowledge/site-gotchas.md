# Site gotchas (portfolio code)

### Custom class names that collide with Tailwind utilities
- Area: `src/app/globals.css`, any component · Trigger: naming a plain CSS class
- A class called `fixed` got Tailwind's `position: fixed` and the hero "á" floated over the "s".
- Before naming a class, check it isn't a Tailwind utility (`fixed`, `hidden`, `block`, `contents`, `grow`…). Prefix custom ones (`decode-fixed`).
- Last updated: 2026-10-14

### Zero-size background tiles paint hairlines in Chrome at 1x
- Area: highlighter effects (the name decode) · Trigger: animating `background-size` from `0%`
- At DPR 1 Chrome drew 1px slivers at the tile edge on huge type.
- Inline/multi-line text: slide a 200%-wide half-transparent gradient with `background-position`, parked at `calc(100% - 4px)` (at exactly `100%` the stroke's edge leaks a 1px sliver at the left of every link, seen at 2x). Single glyph: pseudo-element + `transform: scaleX()`.
- Last updated: 2026-11-13

### Grid items with a row but no column create implicit columns
- Area: hero grid · Trigger: `lg:row-start-1` on an item whose neighbour is explicitly placed in the same row
- Auto-placement looks for a free column span; if none fits it adds implicit columns and the layout explodes. Always pair `row-start` with `col-start` when items overlap on purpose.
- Last updated: 2026-10-14

### Fonts: subsets are preloaded, and OG images can't use variable fonts
- Area: `src/lib/fonts.ts`, `src/lib/og.tsx` · Trigger: adding a subset or a font to OG images
- next/font preloads every subset listed: `latin-ext` cost 84 KB and ~0.9 s of mobile LCP for no glyph we use (`latin` covers Italian/Spanish accents, ’ and U+FFFD).
- Satori (next/og) needs static TTFs: instances live in `src/assets/fonts/` (Google Fonts CSS API, `wdth,wght@62.5,800`). OG routes export `generateStaticParams` so they prerender at build.
- Last updated: 2026-10-14

### `latin1` in the browser is not latin1
- Area: `features/projects/figures/encoding-figure.tsx` · Trigger: decoding bytes with `TextDecoder`
- WHATWG maps the label `latin1`/`iso-8859-1` to windows-1252, so `new TextDecoder("latin1")` would hide exactly the bug the figure shows. Strict ISO-8859-1 is decoded by hand (`String.fromCharCode`).
- Last updated: 2026-10-14

### Language switch must not move the reader
- Area: `components/layout/locale-switch.tsx`, `app/[locale]/layout.tsx` · Trigger: touching the locale links, navigation or scroll CSS
- Next treats /en ↔ /es as a new page and scrolls to the top; with `scroll-behavior: smooth` that became a 1-second glide. Fix: `scroll={false}` + restore the element under the header (child-index path from `<main>` + viewport offset) in a layout effect; `data-scroll-behavior="smooth"` on `<html>` (Next 16 opt-in) so route changes jump while in-page anchors still glide.
- At the very end of a page, switching to a shorter language clamps to the bottom (expected).
- Guarded by `e2e/locale-switch.e2e.ts` (fails without the fix, verified). In Playwright use a real `page.mouse.click` on the sticky header: `locator.click()` scrolls it "into view" first and fakes a jump.
- Last updated: 2026-10-14

### `sr-only` text escapes horizontal scrollers
- Area: figures with `overflow-x-auto` (scopes table) · Trigger: a positioned ancestor outside the scroller
- `sr-only` is `position: absolute`. If its containing block is outside the scroller, the scroller doesn't clip it and the page grows sideways (the Libretto page was 470px wide on a 375px phone).
- Give every scroller `relative`. Guarded by `e2e/pages.e2e.ts` (no horizontal overflow on any page).
- Last updated: 2026-11-13

### A language switch re-renders the root layout: no React `<script>` there
- Area: `app/[locale]/layout.tsx` · Trigger: rendering an executable `<script>` (the theme script) in the layout
- `/en` ↔ `/es` is a client navigation that re-renders the `[locale]` root layout. React then creates every `<script>` itself, can't run it, and logs "Encountered a script tag while rendering React component" (dev overlay). `next/script` `beforeInteractive` renders a `<script>` too. Data blocks (`type="application/ld+json"`) are exempt.
- Fix: ship the theme script as HTML inside `<div hidden dangerouslySetInnerHTML>`: the parser runs it on the first load, before paint; on the client React only sets that HTML.
- Last updated: 2026-11-13

### Social previews keep the old picture while the image URL stays the same
- Area: `app/[locale]/opengraph-image.tsx`, `projects/[slug]/opengraph-image.tsx`, `lib/og.tsx` · Trigger: redesigning the OG images
- Next's `?<hash>` on the og:image URL is a hash of the route file's source, not of the picture. Change only `lib/og.tsx` and the URL stays the same, so LinkedIn (even after Post Inspector re-scrapes the page) keeps its cached image.
- When the picture changes, touch each route file too. LinkedIn Featured items keep the image from when they were added: remove and re-add them after the new URL is live.
- Last updated: 2026-11-13
