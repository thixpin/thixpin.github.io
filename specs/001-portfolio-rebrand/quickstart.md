# Quickstart: Develop & Deploy thixpin.github.io

## Spec-Kit setup (once)

This repo ships hand-written Spec-Kit artifacts (`.specify/memory/constitution.md`,
`specs/001-portfolio-rebrand/`). To get the `/speckit.*` slash commands and
templates, run:

```bash
uvx --from git+https://github.com/github/spec-kit.git specify init --here --ai claude
```

Check afterwards whether init replaced `.specify/memory/constitution.md`
with its template; if so, restore this repo's version (or run
`/speckit.constitution` and paste the six principles back in).

## Local development

```bash
npm install          # installs tailwindcss (only dependency)
npm run dev          # Tailwind watch → assets/css/style.css
npm run serve        # http://localhost:8080 (separate terminal)
```

One-off production build:

```bash
npm run build        # minified CSS
```

## Deploying to GitHub Pages (migration from the Next.js site)

The repo `thixpin/thixpin.github.io` currently holds the Next.js site.
These steps replace it while keeping history.

### 1. Preserve the old site

```bash
cd old-repo
git checkout -b legacy-nextjs
git push origin legacy-nextjs      # old site stays browsable on this branch
```

### 2. Switch Pages to GitHub Actions

GitHub → `thixpin/thixpin.github.io` → **Settings → Pages →
Build and deployment → Source: GitHub Actions**.
(While the source is "Deploy from branch", pushing this tree would serve raw
files without CI-built CSS.)

### 3. Replace the tree on `main` (no force-push, history preserved)

Work inside the existing clone (`old-repo/`), which already has the remote:

```bash
cd old-repo
git checkout main
git rm -rq .                               # remove old tracked files
cp -R ../thixpin.github.io/. .             # bring in the new site (incl. dotfiles)
rm -rf node_modules                        # don't commit local installs
git add -A
git commit -m "feat: rebuild portfolio as static HTML + Tailwind (monochrome/crimson rebrand)"
git push origin main
```

Linear history, no rewrite: the Next.js site remains in history and on
`legacy-nextjs`.

### 4. Verify

- Actions tab → "Deploy to GitHub Pages" run is green.
- https://thixpin.github.io loads with styles (CSS built in CI); after the
  custom-domain step below, https://www.thixpin.me serves the site.
- Share a link in Slack/Twitter to confirm the OG card renders.

## Custom domain (required — canonical is `https://www.thixpin.me/`)

Per spec FR-006 / task T025. Do **not** add a `CNAME` file — it is ignored
when Pages deploys via a GitHub Actions workflow; the domain is configured
in repo settings instead:

1. DNS: `CNAME www → thixpin.github.io`.
2. Settings → Pages → Custom domain: `www.thixpin.me`, then enable
   **Enforce HTTPS** (wait for the DNS check to pass).
3. `rel=canonical`, `og:url`, and `og:image`/`twitter:image` absolute URLs
   in `index.html` use `https://www.thixpin.me/` (task T006).

## Contact form backend (required — task T019 → T020)

Per spec FR-010: create a form service form (e.g. Formspree), then set the
real endpoint as the `action` of `<form id="contact-form">` so native POST
works with JavaScript disabled. JS enhances with validation and sending
states and composes a `mailto:` only as fallback when the POST fails.
Never commit a fabricated endpoint ID.

## Updating content

| What | Where |
|---|---|
| Hero copy / availability line | `index.html` hero section |
| Curated repos | `#repo-grid` cards (`data-repo` must equal the GitHub repo name); fallback stars/language in the card body |
| Capabilities, certs, client work | corresponding `index.html` sections |
| Colors / fonts / glow | `tailwind.config.js` tokens |
| Component styles | `src/input.css` `@layer components` |
