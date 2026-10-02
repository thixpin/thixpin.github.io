# Contract: Web3Forms (consumed)

Contact form submission (FR-010, US3). Provider decided 2026-10-02:
**Web3Forms free plan**. The form's `action` is the fixed endpoint
`https://api.web3forms.com/submit`; the site is identified by the hidden
`access_key` input. The checked-in value is empty: the owner stores the key
as the `WEB3FORMS_ACCESS_KEY` Actions secret (task T019) and `deploy.yml`
injects it into the staged `index.html` at build time — the key never
enters Git, and a fabricated value never ships.

## Form fields

| Field | Kind | Notes |
|---|---|---|
| `access_key` | hidden, required | owner-provisioned Web3Forms key (public by nature) |
| `subject`, `from_name` | hidden, optional | email subject/sender label |
| `botcheck` | hidden checkbox honeypot | must stay unchecked; excluded from the JS payload |
| `name`, `email`, `message` | visible, required | email format validated |

## Native path (JavaScript disabled — SC-003)

`<form method="POST" action="https://api.web3forms.com/submit">` submits
url-encoded; Web3Forms shows its own success page (the free plan cannot
redirect cross-domain, so no `redirect` field is set).

## Enhanced path (JavaScript enabled)

1. Constraint validation first (`aria-invalid`, focus first invalid,
   `aria-live` status). No request on failure.
2. `fetch(form.action, { method: "POST", headers: { "Content-Type":
   "application/json", Accept: "application/json" }, body: JSON.stringify(data) })`
   with the submit button disabled and a "Sending…" state; `botcheck`
   deleted from the payload.
3. **2xx** → success message in the `aria-live` region, form reset.
4. **Non-2xx or network error** (including an empty `access_key`) →
   fallback: compose `mailto:thixpin@gmail.com` with the same fields and
   say so in the `aria-live` region.

## Rules

- The `access_key` is public (visible in markup) — not a secret.
- Spam handling: the `botcheck` honeypot; further provider options per
  Web3Forms docs when T019 runs.
