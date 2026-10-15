# CLAUDE.md — nicolasamorosi.com

Guidance for Claude Code (and any developer) working on this repo: the personal site of
Nicolás Amorosi, full-stack engineer. **This repository is public** — treat every file as
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
- Every user-facing string exists in `en` and `es`. Long-form content is typed data in
  `src/content` (`Localized<T>` makes a missing translation a type error); interface strings
  live in `src/i18n/messages/{en,es}.json` (keys type-checked against `en.json`).

---

## Stack

- **Next.js 16** (App Router, Turbopack, `proxy.ts`) + **React 19** + **TypeScript strict**
  (`noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`).
- **Tailwind CSS 4**, CSS-first: tokens in `src/app/globals.css`; the default palette and type
  scale are reset, so only the site's tokens exist.
- **next-intl 4**: `en` at `/` (default), `es` at `/es`; locale detection on `/`.
- Fully static: every page and Open Graph image is prerendered. Client components only for
  real interactivity (hero decode, theme toggle, locale switch, clock, copy button, the two
  interactive figures).

## Structure

```text
src/
├── app/[locale]/          # routes: home and projects/[slug]; OG images per page
├── features/<area>/       # home, projects (index, case study, figures), experience
├── components/ui/         # primitives without domain (Section, Figure)
├── components/layout/     # header, footer, theme toggle, locale switch
├── content/               # typed bilingual data: projects, experience, profile
├── i18n/                  # routing, request config, navigation, messages
├── assets/fonts/          # static Archivo instances for next/og (Satori can't read variable fonts)
└── lib/                   # site constants, fonts, dates, metadata, OG renderer
e2e/                       # Playwright checks that need a real browser
```

Rules: kebab-case files; a feature never imports another feature (routes compose them);
repeated JSX becomes a primitive; Server Components by default.

## Design system

- **Concept:** the hero decodes the name from mojibake (`NicolÃ¡s` → `Nicolás`) once per
  visit — the legacy-migration case study told in one gesture. That's the one bold moment;
  everything else stays quiet.
- **Color:** ink `#13213C` on paper `#F1F2EF` by day, paper on ink `#0C1322` by night, via
  `light-dark()` tokens — no `dark:` variants anywhere. One accent, highlighter `#F4D23C`,
  always *behind* ink (never text on paper).
- **Type:** Archivo variable; its width axis is the hierarchy — 62% display, 75% headings,
  100% text (`type-*` utilities). IBM Plex Mono only for literal code and bytes.
  Bringhurst scale (12 14 16 18 21 24 36 48 60 72).
- **Layout:** a margin column (sticky section titles) and a content column; work is an index
  of rows, not cards; each project has its own drawing.
- **Motion:** only the hero decode plays unprompted; everything else answers an action.
  `prefers-reduced-motion` skips it.

## Quality bar

WCAG AA (palette checked: body text ≥ 6.5:1), keyboard reachable with visible focus, mobile
from 320px, Lighthouse ≥ 95 in every category, per-page metadata with hreflang, OG images,
sitemap, robots, JSON-LD `Person`. Check visual changes in light, dark and at 375px.

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
