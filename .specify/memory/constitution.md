# thixpin.github.io Constitution

## Core Principles

### I. Zero-Framework Discipline
The site ships semantic HTML5, one compiled Tailwind CSS file, and one inline
vanilla-JS block. No runtime frameworks, no bundlers, no client-side routing.
A feature that needs more than this does not belong on this site.

### II. Static-First, Enhance Later
Every section must render complete and correct with JavaScript disabled or the
GitHub API unavailable. JS only *enhances* (live repo stats, menu toggle,
form handling); it never gates content.

### III. Design Tokens Are Law
All colors, fonts, and shadows live in `tailwind.config.js` (`bg`, `surface`,
`line`, `ink`, `muted`, `accent`, `shadow-glow`). No hard-coded hex values in
markup. Crimson (`accent`) is reserved for focal points: status dot, key
badges, primary hover states, highlighted tech terms.

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

**Version**: 1.0.0 | **Ratified**: 2026-10-02
