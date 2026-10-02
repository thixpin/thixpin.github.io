# Contract: GitHub REST API (consumed at build time)

Enriches curated repo cards during the build (FR-004, US2). Read-only.
**The browser never calls this API** — revised 2026-10-02; enrichment moved
from runtime to `build/render.mjs`.

## Request (one per curated repo in `content/projects.yml`)

```
GET https://api.github.com/repos/thixpin/{name}
Accept: application/vnd.github+json
Authorization: Bearer $GITHUB_TOKEN   # only when the env var is set (CI)
```

Issued with `Promise.allSettled` and an `AbortController` timeout (~10 s).
In GitHub Actions the automatic `GITHUB_TOKEN` is passed as an env var to
the build step (1,000 req/h; nothing to configure, never written to output).
Local builds work unauthenticated (60 req/h is ample for 6 repos).

## Fields consumed

| JSON field | Maps to | Fallback (content/projects.yml) |
|---|---|---|
| `description` | card description | curated description |
| `language` | language label | curated language |
| `stargazers_count` | stars | curated stars (must never exceed reality — constitution VI) |
| `forks_count` | forks | curated forks (optional) |
| `html_url` | card link | `https://github.com/thixpin/<name>` |
| `homepage` | "Live ↗" link when non-empty | curated homepage (optional) |
| `topics` | up to 3 extra tags | curated topics (optional) |

## Failure modes (per repo, never fails the build)

| Mode | Behavior |
|---|---|
| 403 / 429 rate limit | that repo keeps its YAML fallback; CI `::warning::` |
| Network / timeout / non-200 / bad JSON | same |

When the API succeeds and a live value differs from the fallback, the build
logs one line per field (e.g. `pitway stars: fallback 20 → live 23`) so the
owner can refresh fallbacks occasionally.
