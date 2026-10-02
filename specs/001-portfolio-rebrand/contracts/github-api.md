# Contract: GitHub REST API (consumed)

Enriches static repo cards at runtime (FR-004, US2). Read-only, unauthenticated.

## Request

```
GET https://api.github.com/users/thixpin/repos?per_page=100
Accept: application/vnd.github+json
```

One request per page load, fired after DOMContentLoaded.

## Fields consumed

| JSON field | Maps to |
|---|---|
| `name` | card match key (`data-repo`) |
| `description` | card description |
| `language` | `data-field="language"` |
| `stargazers_count` | `data-field="stars"` |
| `html_url` | card link (verification only; static href is authoritative) |

All other fields ignored. Cards whose `data-repo` has no match in the
response keep their static content.

## Failure modes (all → silent catch, static fallback persists)

| Mode | Trigger | Behavior |
|---|---|---|
| Rate limit | 403 (60 req/h/IP unauthenticated) | no retry, no console error surfaced to user; status line keeps fallback wording |
| Network / offline | fetch rejects | same |
| Non-200 / malformed JSON | anything else | same |

Spec SC-004: the caught API failure is the only permitted failed request.
