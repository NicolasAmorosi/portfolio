# Site gotchas (portfolio code)

### Custom class names that collide with Tailwind utilities
- Area: `src/app/globals.css`, any component · Trigger: naming a plain CSS class
- A class called `fixed` got Tailwind's `position: fixed` and the hero "á" floated over the "s".
- Before naming a class, check it isn't a Tailwind utility (`fixed`, `hidden`, `block`, `contents`, `grow`…). Prefix custom ones (`decode-fixed`).
- Last updated: 2026-10-14

### Zero-size background tiles paint hairlines in Chrome at 1x
- Area: highlighter effects (`.link`, `.highlight`, hero decode) · Trigger: animating `background-size` from `0%`
- At DPR 1 Chrome drew 1px slivers at the tile edge on huge type.
- Inline/multi-line text: slide a 200%-wide half-transparent gradient with `background-position`. Single glyph: pseudo-element + `transform: scaleX()`.
- Last updated: 2026-10-14

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
- At the very end of a page, switching to a shorter language clamps to the bottom — expected.
- Guarded by `e2e/locale-switch.e2e.ts` (fails without the fix, verified). In Playwright use a real `page.mouse.click` on the sticky header: `locator.click()` scrolls it "into view" first and fakes a jump.
- Last updated: 2026-10-14
