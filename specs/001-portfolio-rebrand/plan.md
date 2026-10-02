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

**Language/Version**: HTML5, CSS (Tailwind v3.4 via CLI), JavaScript ES6+ (inline, no deps)

**Primary Dependencies**: `tailwindcss@^3.4` (devDependency, CLI build only); no runtime dependencies

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
| I Zero-framework | PASS — no runtime deps |
| II Static-first | PASS — fallback data baked into markup; form POSTs natively via `action` |
| III Tokens | PASS — all colors via config tokens |
| IV A11y | PASS — skip link, ARIA, reduced-motion |
| V Perf budget | PASS — 22 KB CSS, no external JS |
| VI Truthful content | PENDING — hero title + head metadata rework (T006/T009) to mirror the GitHub bio per FR-008; certs verifiable |

Gate result: PASS — the one PENDING row is a tracked implementation gap
(open tasks T006/T009), not a plan-level violation; nothing has deployed to
`main`, and those tasks must complete before T025 pushes.

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
├── index.html                  # entire site: markup + inline JS
├── src/input.css               # Tailwind layers + component classes
├── tailwind.config.js          # design tokens (colors, fonts, glow)
├── package.json                # tailwindcss devDependency, build scripts
├── assets/
│   ├── css/style.css           # build artifact (gitignored)
│   ├── favicons/               # carried over from old repo
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

### Phase 3 — CI/CD & migration
`deploy.yml` (build → stage `_site` → upload → deploy), `.gitignore`,
README. Migration steps for the existing repo documented in quickstart.md.
Custom domain (user-executed): Settings → Pages = `www.thixpin.me` plus a
DNS CNAME record `www` → `thixpin.github.io`; no `CNAME` file (ignored by
Actions-based deploys).

## Decisions & Tradeoffs

1. **Tailwind CLI over Play CDN** — production requirement wins; CDN is a
   dev-only JIT runtime (research.md).
2. **Allowlist + enrichment over dynamic top-N** — survives the 60 req/h
   unauthenticated API limit and a 113-repo account full of forks.
3. **Form service POST (clarified 2026-10-02)** — the endpoint lives in the
   form's `action`, so native submit works without JS; mailto is the JS-side
   fallback on POST failure. The owner provisions the service account; no
   fabricated endpoint ID ships.
4. **Single page over per-section routes** — six sections don't justify
   routing; anchors + sticky nav give equivalent wayfinding.
5. **Experience timeline kept (clarified 2026-10-02)** — rebuilt with
   current, accurate dates matching the résumé PDF (FR-009); stale entries
   never ship.

## Complexity Tracking

None — no constitution violations requiring justification.
