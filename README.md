# thixpin.github.io

Personal portfolio of Soe Thura (@thixpin) — a static single-page site built
with semantic HTML5, Tailwind CSS v3 (CLI build), and a single inline
vanilla-JS block. No frameworks, no bundlers.

Live at <https://www.thixpin.me/> (served by GitHub Pages).

## Editing content

All portfolio content lives in `content/` — YAML for structured data
(profile/SEO in `site.yml`, `experience.yml`, `projects.yml`,
`credentials.yml`, `capabilities.yml`) and Markdown for prose
(`about.md`). Edit those files and rebuild; never edit `index.html`
(a generated build artifact) or hard-code content in `src/index.eta`.

## Local development

```bash
npm install     # dev-only deps: tailwindcss, eta, js-yaml, marked
npm run render  # content + template → index.html
npm run dev     # render once, then Tailwind watch → assets/css/style.css
npm run serve   # http://localhost:8080 (separate terminal)
```

One-off production build: `npm run build` (render + minified CSS).
`index.html` and `assets/css/style.css` are build artifacts — gitignored,
compiled in CI. Tailwind watch does not re-render the template; run
`npm run render` again after content/template edits.

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
