# thixpin.github.io

Personal portfolio of Soe Thura (@thixpin) — a static single-page site built
with semantic HTML5, Tailwind CSS v3 (CLI build), and a single inline
vanilla-JS block. No frameworks, no bundlers.

Live at <https://www.thixpin.me/> (served by GitHub Pages).

## Local development

```bash
npm install     # installs tailwindcss (only dependency)
npm run dev     # Tailwind watch → assets/css/style.css
npm run serve   # http://localhost:8080 (separate terminal)
```

One-off production build: `npm run build` (minified CSS).
`assets/css/style.css` is a build artifact — gitignored, compiled in CI.

## Deployment

Every push to `main` builds and deploys via GitHub Actions
(`.github/workflows/deploy.yml`) with Pages source set to "GitHub Actions".
The custom domain `www.thixpin.me` is configured in Settings → Pages plus a
DNS CNAME `www` → `thixpin.github.io` — no `CNAME` file (ignored by
Actions-based deploys).

## Content guarantees

Content mirrors the live GitHub profile and verifiable credentials; repo
cards carry static fallback stats that JS enriches from the GitHub API when
reachable. The site is fully usable with JavaScript disabled. Governance
lives in `.specify/memory/constitution.md`; the feature spec and task list
live in `specs/001-portfolio-rebrand/`.
