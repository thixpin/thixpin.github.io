# Research: Brand System & Content Blueprint

## Decision Log

### Color palette — "Monochrome + Crimson"

| Token | Hex | Usage |
|---|---|---|
| `bg` | `#09090B` | Page background |
| `surface` | `#121215` | Cards, header chip, form |
| `line` | `#27272A` | Borders, dividers |
| `ink` | `#FAFAFA` | Headings, primary text |
| `muted` | `#A1A1AA` | Body copy, secondary text |
| `accent` | `#EF4444` | Status ping, key badges, hovers, tech highlights |
| `accent-strong` | `#DC2626` | Reserved for pressed/active accents |

Contrast (WCAG): `ink` on `bg` 18.9:1 (AAA), `muted` on `bg` 8.3:1 (AAA),
`accent` on `bg` 4.6:1 (AA for the large/mono text it's used on).
Crimson stays below ~5% of painted pixels — it reads as a signal, not a theme.

### Typography

- **Plus Jakarta Sans** (400/500/600/700/800) — UI, headings, body.
  Geometric-humanist, reads crisp on dark backgrounds.
- **JetBrains Mono** (400/500) — logo mark, eyebrows, tags, stats, repo names.
  Signals "infrastructure engineer" without a terminal gimmick.
- Delivery: Google Fonts, `preconnect` + `display=swap`; system stacks as
  fallback (`ui-sans-serif` / `ui-monospace`).

Rejected: Inter + Fira Code (default-looking), Space Grotesk (too display-y
for long copy).

### Tech approach

- Tailwind v3 **CLI build**, not the Play CDN: the CDN is a ~300 KB runtime
  JIT that warns against production use. CI compiles a ~22 KB minified
  stylesheet. (User spec allowed "CDN or build setup"; build wins on the
  "production, fast-loading" requirement.)
- GitHub API: unauthenticated = 60 req/h per IP. Therefore repo cards are
  **statically rendered with baked-in fallback stats** and only *enriched*
  by `fetch()`. Raw top-N-by-stars was rejected: the account's 113 repos
  include forks and scratch repos.

## Content blueprint (from live GitHub profile, Oct 2026)

**Identity**: Soe Thura (@thixpin) · Yangon, Myanmar · AWS Community Builder ·
"Software Engineer & DevOps | Building tools for agentic software development"
· hireable: true.

**Positioning (clarified 2026-10-02, FR-008)**: Software Engineer & DevOps
(literal bio string; supersedes the brief's "Cloud Solution Architect &
Senior DevOps Engineer"). Hero: availability ping → name → title → paragraph bridging cloud
platforms (AWS/GCP, IaC, CI/CD, Kubernetes, observability) and agentic
tooling → CTAs → proof strip (since 2010 · AWS+GCP certified · AWS CB).

**Capabilities grid (6)**: Cloud Architecture / Infrastructure as Code /
CI-CD & Platform / Containers & Kubernetes / Observability & SRE / Agentic
Developer Tooling.

**Curated repos (allowlist)**:
| Repo | Why | Fallback stats |
|---|---|---|
| `pitway` | Flagship, "currently building" | ★20, TypeScript |
| `agentic-basic` | Most starred | ★63, Python |
| `md2book` | Featured on profile README | ★3, TypeScript |
| `claude-config` | Agentic workflow credibility | ★8, Shell |
| `Virama-JS` | Myanmar Unicode legacy | ★7, JavaScript |
| `Myanmar-UniPress` | WordPress.org plugin | ★7, PHP |

**Client work (from previous site, kept)**: Pocket (AWS, CodeDeploy,
AutoScaling), Heal by Pun Hlaing (serverless telemedicine backend).

**Credentials**: AWS SAA / DVA / CLF (Credly), GCP ACE, LFCS, GitHub
Foundations, Datadog DPN; AWS Community Builder; DevOps/SRE instructor
(DevKTOps); co-founder Myanmar Unicode Area; writing at kalaung.org.

**Dropped from old site**: full experience timeline (dates stale, 8 entries
of résumé detail — the PDF résumé covers it), Lottie animations, custom
cursor, wife page, per-section routes. Single page, four anchors.
