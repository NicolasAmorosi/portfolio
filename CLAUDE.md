# CLAUDE.md · nicolasamorosi.com

Guidance for Claude Code (and any developer) working on this repo: the personal site of
Nicolás Amorosi, full-stack engineer. **This repository is public**: treat every file as
something a recruiter or an interviewer will read.

Chat with Nicolás in Spanish; code, comments, commit messages and docs in English.

---

## Content rules (read before touching `src/content` or messages)

- **Facts come from a private knowledge base** kept outside this repo. Never invent or
  estimate metrics, titles, dates or employers; if a sentence needs a fact that isn't
  already on the site, ask.
- **Client code is private.** Case studies describe problem → constraints → what was built →
  the hard part → result → stack. No code, no internal names, hostnames, IPs, bucket or
  database names, no other people's names or emails, and never an open weakness of a live
  system (tell what was done, not what was broken).
- One project is described anonymously on purpose (the real-estate scheduling SaaS): keep it
  unnamed.
- **Screenshots of client systems** only from a demo whose every name and number is invented
  (Libretto's help-guide demo institution), never from a dev or production database, and
  say so in the alt text.
- Every user-facing string exists in `en`, `es`, `it` and `pt`. Long-form content is typed data in
  `src/content` (`Localized<T>` makes a missing translation a type error); interface strings
  live in `src/i18n/messages/{en,es}.json` (keys type-checked against `en.json`).
- **No em dashes (U+2014) in anything people read**: content, messages, metadata, docs and
  code comments. Don't swap in a spaced en dash or hyphen for the same pause; rewrite with a
  comma, colon, parentheses or two sentences. In Spanish this includes the raya around
  incisos. En dashes stay only inside ranges (2023–2024). Em dashes read as AI-written.

---

## Stack

- **Next.js 16** (App Router, Turbopack, `proxy.ts`) + **React 19** + **TypeScript strict**
  (`noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`).
- **Tailwind CSS 4**, CSS-first: tokens in `src/app/globals.css`; the default palette and type
  scale are reset, so only the site's tokens exist.
- **next-intl 4**: `en` at `/` (default), `es`, `it` and `pt` (Brazil) at `/es`, `/it`, `/pt`;
  locale detection on `/`.
- Fully static: every page and Open Graph image is prerendered. Client components only for
  real interactivity (name decode, theme toggle, locale switch, copy button, the two
  interactive figures).

## Structure

```text
src/
├── app/[locale]/          # routes: home and projects/[slug]; OG images per page
├── features/<area>/       # home, projects (index, case study, figures), experience
├── components/ui/         # primitives without domain (Section, Figure)
├── components/layout/     # header, footer, theme toggle, locale switch
├── content/               # typed multilingual data: projects, experience, profile
├── i18n/                  # routing, request config, navigation, messages
├── assets/fonts/          # static Archivo instances for next/og (Satori can't read variable fonts)
├── assets/screenshots/    # real screenshots: public code, or a demo whose data is all invented
└── lib/                   # site constants, fonts, dates, metadata, OG renderer
e2e/                       # Playwright checks that need a real browser
```

Rules: kebab-case files; a feature never imports another feature (routes compose them);
repeated JSX becomes a primitive; Server Components by default.

## Design system

- **Direction (since 2026-11-13):** an engineer's page, not a designer's portfolio. It leads
  with facts (name, role, what I'm building now, availability, contact), shows work as a
  dated list with one line of numbers per item, and proves things with real artifacts (the
  interactive figures, real screenshots) instead of decoration. References: paco.me,
  leerob.com, mitchellh.com, rsms.me/work, tonsky.me.
- **Wide screens (xl+) use the sides** (`components/ui/scroll-spy.tsx`): a rail on the left
  marks the section and project being read, and a blueprint plate on the right shows what
  the text is about: the á and its bytes, each project's screenshot or drawing with its
  numbers, the experience timeline with the role in view, the stack as layers, three time
  zones on a live clock. Elements opt in with `data-spy`; plates are composed in the route.
- **Concept:** the name decodes from mojibake (`NicolÃ¡s` → `Nicolás`) once per visit, at
  heading size, and the note under the intro explains it and links the migration case study.
  It is the only thing that moves on its own; the rail and the plates answer the scroll
  (lines plot themselves in), and `prefers-reduced-motion` turns that off.
- **Color:** ink `#13213C` on paper `#F1F2EF` by day, paper on ink `#0C1322` by night, via
  `light-dark()` tokens; no `dark:` variants anywhere. Two accents: highlighter `#F4D23C`,
  always *behind* ink (never text on paper): the á, link and row hovers, the rail marker,
  selection, and inside figures and plates to point at what matters; and blueprint blue
  `#21487F` (`#172F57` at night) with light lines, only for the plates.
- **Type:** Archivo at its normal width (no `wdth` axis loaded); hierarchy from size and
  weight 600 only. IBM Plex Mono only for literal code and bytes. Scale 12 14 16 17 21 36.
- **Layout:** one reading column of 40rem (`column` utility) inside the page gutter
  (`shell`), small plain section labels, rules between list rows. Figures and screenshots
  step out of the column on wide screens (`lg:-mx-32`, screenshots up to 60rem). The home
  page on xl is rail · column · plate (8.5/38/21rem, 10/40/26rem on 2xl); header and footer
  span the same frame. From 100rem the root font grows to 17px.
- **Don't bring back** what reads as templated or AI-made: giant display type, cards, big
  stat numbers with tiny labels, pills, colored status dots or left borders, gradients,
  content that fades in on scroll, buttons where a link will do, "X, not Y" headings.

## Quality bar

WCAG AA (palette checked: body text ≥ 6.5:1), keyboard reachable with visible focus, mobile
from 320px, Lighthouse ≥ 95 in every category, per-page metadata with hreflang, OG images,
sitemap, robots, JSON-LD `Person`. Check visual changes in light, dark and at 375px.
Guards: `src/content/no-em-dash.test.ts` (no U+2014 in any source text) and
`e2e/pages.e2e.ts` (no horizontal overflow and a share image on every page, both locales).

Before changing anything visual, read `.claude/knowledge/site-gotchas.md`.

## Commands

```bash
pnpm dev         # http://localhost:3000
pnpm build       # every page and OG image is prerendered (SSG)
pnpm start       # serve the build
pnpm lint        # ESLint (next core-web-vitals + typescript)
pnpm typecheck   # next typegen + tsc --noEmit
pnpm test        # Vitest unit tests
pnpm test:e2e    # Playwright vs the production build on :3200, installed Chrome
```

CI (`.github/workflows/ci.yml`) runs lint, typecheck, unit and e2e on every push and PR.

## Deploy

Vercel, production domain `nicolasamorosi.com`. `site.url` in `src/lib/site.ts` drives
canonical URLs, sitemap and OG links.

## Git

Conventional Commits in English (`feat(web): …`, `feat(content): …`, `fix(web): …`,
`chore: …`, `docs: …`, `ci: …`). Commit only when asked. Nothing private ever enters
this repo: no `.env*`, no CVs other than the public one in `public/`, no salary or
third-party data.
