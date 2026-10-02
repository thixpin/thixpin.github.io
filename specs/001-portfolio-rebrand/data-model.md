# Data Model: Portfolio Rebrand

No database — every entity is authored in `content/` (YAML structured data,
Markdown prose) and rendered into static HTML at build time (FR-012). This
documents the shape, validation rules, and the one build-time transition.

## RepoCard

Curated open-source project card (6 instances, FR-004, US2). Authored in
`content/projects.yml`: `name` (must equal the GitHub repo name exactly),
curated `description`/`language`/`stars` fallbacks, optional `badge`,
`forks`/`homepage`/`topics` fallbacks, and ordering.

**Build-time transition**: `fallback` → `enriched`. `build/render.mjs`
overwrites a field only when `GET /repos/thixpin/{name}` returns 200; on any
failure that repo's YAML fallback renders (contracts/github-api.md).
Fallback stars must never exceed reality (constitution VI). No runtime
transition exists — the browser makes no GitHub calls.

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
