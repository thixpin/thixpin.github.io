# Contract: Form service (consumed)

Contact form submission (FR-010, US3). The concrete endpoint is provisioned
by the owner (task T019) and recorded as the form's `action`; exact response
shape and redirect behavior follow the provider's docs for that endpoint —
nothing provider-specific is assumed here.

## Native path (JavaScript disabled — SC-003)

```html
<form id="contact-form" method="POST" action="{endpoint}">
```

Browser submits `application/x-www-form-urlencoded` with fields `name`,
`email`, `message`. The provider's own success/error page is the response —
acceptable, since JS-off is the degraded path.

## Enhanced path (JavaScript enabled)

1. Constraint validation first: required fields + email format; on failure
   set `aria-invalid`, focus the first invalid field, report via the
   `aria-live` status region. No request is sent.
2. `fetch(form.action, { method: "POST", headers: { Accept: "application/json" }, body: FormData })`
   with the submit button disabled and a "sending" state.
3. **2xx** → success message in the `aria-live` region, form reset.
4. **Non-2xx or network error** → fallback: compose
   `mailto:thixpin@gmail.com` with the same fields in subject/body, and say
   so in the `aria-live` region.

## Rules

- Never ship a fabricated endpoint ID (plan Decision 3).
- The endpoint is public by nature (visible in markup) — not a secret.
- Spam handling (honeypot/captcha) is whatever the chosen provider offers;
  configure per its docs when T019 runs.
