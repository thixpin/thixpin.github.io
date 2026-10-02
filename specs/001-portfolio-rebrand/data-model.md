# Data Model: Portfolio Rebrand

No database — every entity is authored statically in `index.html`. This
documents the shape, validation rules, and the one runtime state transition.

## RepoCard

Curated open-source project card (6 instances, FR-004, US2).

| Field | Source | Notes |
|---|---|---|
| `data-repo` | static | key — must equal the GitHub repo name exactly |
| name, description | static, enriched | fallback text in markup |
| language | static, enriched | `data-field="language"` hook |
| stars | static, enriched | `data-field="stars"` hook; fallback must never exceed reality (constitution VI) |
| url | static | `https://github.com/thixpin/<repo>` |

**State transition**: `static` → `enriched`. Enrichment overwrites a field
only when the GitHub API call returns 200 and the repo matches `data-repo`;
on 403/network/non-200 the static state persists (contracts/github-api.md).

## ClientWorkCard

2 instances; fully static (name, role, summary, tech tags). No links to
private work; claims verifiable per constitution VI.

## ContactSubmission

Transient — never persisted on this site (US3, FR-010).

| Field | Validation |
|---|---|
| name | required, non-empty |
| email | required, valid email format |
| message | required, non-empty |

Submitted via POST to the form service (contracts/form-service.md); on POST
failure JS composes a `mailto:` with the same three fields.

## ExperienceEntry

Timeline row (FR-009).

| Field | Rule |
|---|---|
| role, organization | required |
| start, end | required; `end` may be "Present"; **dates must match `assets/resume.pdf`** |
| summary | 1–2 lines |

Constraint: no stale entries ship (constitution VI, spec clarification
2026-10-02).

## CredentialBadge

| Field | Rule |
|---|---|
| label, issuer | required |
| verification URL | required — Credly/GCP/LFCS/GitHub; must verify (constitution VI) |

Includes the "AWS Community Builder" badge (FR-008).

## CapabilityCard

6 instances: title, 1–2 line description, mono tech tags. Static only.

## NavSection

| Field | Rule |
|---|---|
| id | section anchor, unique |
| label | nav link text |
| active | exactly one link carries `aria-current` at a time, driven by IntersectionObserver (FR-002); without JS, no `aria-current` is set and plain anchors still work |
