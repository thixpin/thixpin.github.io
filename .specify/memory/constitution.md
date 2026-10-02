# thixpin.github.io Constitution

## Core Principles

### I. Zero-Framework Discipline
The site ships semantic HTML5, one compiled Tailwind CSS file, and one inline
vanilla-JS block, plus a tiny synchronous theme-init snippet in `<head>` and
declarative attribute handlers for resource loading (e.g. the async-fonts
`onload`). The HTML is generated at build time from content files
(YAML/Markdown) by a small Node script. No runtime frameworks, no bundlers,
no client-side routing. A feature that needs more than this does not belong
on this site.

### II. Static-First, Enhance Later
Every section must render complete and correct with JavaScript disabled.
All content — including GitHub repo stats, fetched at build time — is baked
into the generated HTML. JS only *enhances* (menu toggle, active-nav, theme
switching, form handling); it never gates content, and the browser never
calls the GitHub API.

### III. Design Tokens Are Law
All colors, fonts, and shadows live in `tailwind.config.js`, backed by CSS
custom properties in `src/input.css` that define both the dark and light
themes (`bg`, `surface`, `line`, `ink`, `muted`, `accent`, `shadow-glow`).
No hard-coded hex values in markup. Crimson (`accent`) is reserved for focal
points: status dot, key badges, primary hover states, highlighted tech terms.

### IV. Accessibility Is Non-Negotiable
Semantic landmarks, skip link, visible focus rings, `aria-expanded`/
`aria-controls` on the menu toggle, `aria-live` status regions,
alt text on all images, and `prefers-reduced-motion` support. Keyboard-only
navigation must reach every interactive element.

### V. Performance Budget
One CSS file (< 30 KB minified), no external JS, system fallbacks for both
Google Fonts, images sized for their rendered dimensions. Target Lighthouse
≥ 95 on all four categories.

### VI. Truthful Content
Profile claims, project descriptions, and certifications mirror the live
GitHub profile and verifiable credentials. Fallback repo stats may lag
reality; they must never exceed it.

## Workflow

- Source of truth: `main` branch of `thixpin/thixpin.github.io`.
- `assets/css/style.css` is a build artifact — gitignored, compiled in CI.
- Every push to `main` deploys via `.github/workflows/deploy.yml`.
- Validate locally with `npm run build && npm run serve` before pushing.

## Governance

This constitution governs all amendments to the site. Changes that violate a
principle require amending the constitution first, in the same PR, with
rationale.

**Version**: 1.1.0 | **Ratified**: 2026-10-02 | **Amended**: 2026-10-02 —
build-time content pipeline (YAML/Markdown → generated HTML), build-time
GitHub enrichment replacing runtime fetches, dual-theme tokens via CSS
custom properties, and the head theme-init snippet. Rationale: owner-editable
content and theme support requested for release; all shipped-site guarantees
(static-first, a11y, perf budget) are unchanged or strengthened.
