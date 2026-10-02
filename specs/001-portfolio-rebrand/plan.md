# Implementation Plan: Portfolio Rebrand — Monochrome + Crimson

**Branch**: `001-portfolio-rebrand` | **Date**: 2026-10-02 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/001-portfolio-rebrand/spec.md`

## Summary

Replace the Next.js portfolio with a single-page static site. Content is
rendered statically from a curated blueprint (research.md); vanilla JS
enriches repo cards from the GitHub API and handles the menu, active-nav
highlighting, and the contact form. Tailwind compiles in CI; GitHub Actions
deploys to Pages.

## Technical Context

**Language/Version**: HTML5, CSS (Tailwind v3.4 via CLI), JavaScript ES6+ (inline, no deps); Node ESM build script

**Primary Dependencies**: devDependencies only — `tailwindcss@^3.4` (CSS build) plus `eta` (template), `js-yaml` (content), `marked` (prose) for the build-time renderer; zero runtime dependencies

**Storage**: N/A — static site; repo stats fetched at runtime with fallbacks baked into markup; contact submissions POSTed to an external form service, nothing persisted here

**Testing**: manual browser checklist (quickstart.md) + Lighthouse against spec SC-001/SC-002

**Target Platform**: GitHub Pages (static hosting), evergreen browsers; build on Node 22 in CI (`npm ci && npm run build`), local Node ≥ 18

**Project Type**: static single-page site

**Performance Goals**: Lighthouse ≥ 95 ×4 (SC-001); page weight < 60 KB excl. fonts/photo (SC-002); CSS < 30 KB minified (constitution V)

**Constraints**: constitution I–V — no frameworks, static-first (fully usable with JS off, SC-003), tokenized design, a11y, perf budget

**Scale/Scope**: 7 content sections + header/footer, 6 curated repos + 2 client-work cards, 1 contact form, single page

No NEEDS CLARIFICATION remain — all open questions were resolved in the
spec's Clarifications session (2026-10-02).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status |
|---|---|
| I Zero-framework | PASS — no runtime deps; build-time renderer codified in constitution v1.1.0 |
| II Static-first | PASS — all content (incl. repo stats) baked into generated HTML; form POSTs natively via `action` |
| III Tokens | PASS — config tokens backed by CSS custom properties, both themes |
| IV A11y | PASS — skip link, ARIA, reduced-motion; keyboard walkthrough verified (T029) |
| V Perf budget | PASS — ~23 KB CSS, no external JS, Lighthouse 100×4 measured |
| VI Truthful content | PASS — title mirrors the bio verbatim, Experience dates match the résumé, Bangkok consistent, certs verifiable (CKA URL pending) |

## Project Structure

### Documentation (this feature)

```text
specs/001-portfolio-rebrand/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)

```text
thixpin.github.io/
├── index.html                  # build artifact (gitignored): rendered from the template
├── src/index.eta               # the page template: structure + presentation only
├── src/input.css               # Tailwind layers, component classes, theme CSS variables
├── build/render.mjs            # build-time renderer: YAML/Markdown + GitHub API → index.html
├── content/                    # owner-editable portfolio content
│   ├── site.yml                # profile, title, SEO, socials, contact, availability
│   ├── capabilities.yml
│   ├── experience.yml
│   ├── projects.yml            # curated repos (selection/order/fallbacks) + client work
│   ├── credentials.yml
│   └── about.md                # hero prose (Markdown)
├── tailwind.config.js          # design tokens referencing the CSS variables
├── package.json                # devDependencies + render/build scripts
├── assets/
│   ├── css/style.css           # build artifact (gitignored)
│   ├── favicons/
│   ├── images/                 # thixpin.jpg (640px), og-preview.png
│   └── resume.pdf
├── .github/workflows/deploy.yml
└── .nojekyll
```

**Structure Decision**: single flat static-site tree at the repo root — one
HTML page, one CSS input, one config; no src/tests split because there is no
compiled application code (constitution I) and validation is the manual
checklist in quickstart.md.

## Phases

### Phase 0 — Foundation
Design tokens in `tailwind.config.js`; component classes (`.card`, `.tag`,
`.btn-*`, `.nav-link`, `.field`, `.section`) in `src/input.css`; asset
migration from old repo (favicons, photo downscaled to 640px, OG image,
résumé); npm build pipeline.

### Phase 1 — Static page (US1, US2 static, US4)
`index.html` complete with all sections (incl. Experience timeline with
current dates from the résumé), static repo-card fallback data, skip link,
landmarks, SEO/OG/Twitter/JSON-LD metadata with bio-derived title and
absolute URLs on `https://www.thixpin.me/`. Page must pass the JS-disabled
test at the end of this phase.

### Phase 2 — Enhancement JS (US2 live, US3)
Inline script: mobile menu (aria-expanded, Escape), IntersectionObserver
active-nav, GitHub API enrichment with catch-and-ignore fallback, contact
form (validate → POST to the form-service `action`, mailto fallback on
POST failure), year stamp.

### Phase 4 — Content pipeline, theming & build enrichment (added 2026-10-02)
Content externalized to `content/` YAML/Markdown; `build/render.mjs` renders
`src/index.eta` → `index.html` (gitignored artifact) and enriches curated
repo cards from the GitHub API at build time with YAML fallbacks; runtime
GitHub fetch removed. Light/Dark themes via CSS custom properties +
`data-theme`, header toggle, system default, localStorage persistence,
head init snippet against FOUC.

### Phase 3 — CI/CD & migration
`deploy.yml` (build → stage `_site` → upload → deploy), `.gitignore`,
README. Migration steps for the existing repo documented in quickstart.md.
Custom domain (user-executed): Settings → Pages = `www.thixpin.me` plus a
DNS CNAME record `www` → `thixpin.github.io`; no `CNAME` file (ignored by
Actions-based deploys).

## Decisions & Tradeoffs

1. **Tailwind CLI over Play CDN** — production requirement wins; CDN is a
   dev-only JIT runtime (research.md).
2. **Curated allowlist + build-time enrichment (revised 2026-10-02)** —
   repo selection/order/custom copy stay in `content/projects.yml`; the
   build fetches `GET /repos/thixpin/{name}` per curated repo
   (`Promise.allSettled`, ~10 s timeout, per-repo YAML fallback, build never
   fails on API errors) using the Actions-provided `GITHUB_TOKEN` when set.
   No browser API calls — stats are as fresh as the last deploy.
3. **Form service POST (clarified 2026-10-02)** — the endpoint lives in the
   form's `action`, so native submit works without JS; mailto is the JS-side
   fallback on POST failure. The owner provisions the service account; no
   fabricated endpoint ID ships.
4. **Single page over per-section routes** — six sections don't justify
   routing; anchors + sticky nav give equivalent wayfinding.
5. **Experience timeline kept (clarified 2026-10-02)** — rebuilt with
   current, accurate dates matching the résumé PDF (FR-009); stale entries
   never ship.
6. **Eta + js-yaml + marked over a static-site framework** — three tiny
   devDependencies and one Node script satisfy build-time rendering without
   migrating to Astro/React; the shipped site is unchanged in kind
   (constitution I amended v1.1.0 to codify the build step).
7. **Themes via CSS custom properties + `data-theme`** — tokens keep their
   Tailwind names; `prefers-color-scheme` provides the no-JS default, the
   head snippet applies the persisted choice pre-paint, `display=optional`
   fonts stay. No Education section added (approved content unchanged).

## Complexity Tracking

None — no constitution violations requiring justification.
