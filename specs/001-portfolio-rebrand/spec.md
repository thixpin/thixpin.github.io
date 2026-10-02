# Feature Specification: Portfolio Rebrand — Monochrome + Crimson

**Feature Branch**: `001-portfolio-rebrand`
**Status**: Draft — working scaffold exists; pending approval
**Input**: Rebrand and rebuild thixpin's portfolio as a static single-page
site (HTML5 + Tailwind v3 + vanilla JS) deployed to GitHub Pages, replacing
the Next.js site.

## User Scenarios

### US1 — Recruiter scans the profile (Priority: P1)
A recruiter lands on the page, understands within 10 seconds who Soe Thura
is (Software Engineer & DevOps), sees availability
status, and can reach the résumé and contact actions from the sticky header.

**Acceptance**: Hero shows name, title, availability ping, and two CTAs
above the fold on a 375 px viewport; résumé opens in a new tab.

### US2 — Engineer evaluates the work (Priority: P1)
A fellow engineer reviews the capabilities grid and project showcase,
follows repo links to GitHub, and sees live star counts and languages.

**Acceptance**: Six curated repos render with name, description, language,
stars, and link. Stats refresh from the GitHub API when reachable; static
fallback values render otherwise (JS off, rate-limited, offline).

### US3 — Client makes contact (Priority: P2)
A potential client submits the contact form or uses direct links
(email, GitHub, LinkedIn).

**Acceptance**: Form validates name/email/message, reports status via
`aria-live`, and POSTs to the form service endpoint in the form's `action`
(native submit works with JS disabled); if the POST fails, JS falls back
to composing a mailto. Social links carry accessible names.

### US4 — Visitor with assistive tech (Priority: P1)
A keyboard or screen-reader user navigates all sections.

**Acceptance**: Skip link, landmark roles, focus-visible rings, menu toggle
announces expanded state, reduced-motion preference disables animations.

## Clarifications

### Session 2026-10-02

- Q: Which domain should be the site's canonical URL — `https://thixpin.github.io/`
  or the old site's `www.thixpin.me`? → A: `https://www.thixpin.me/`
- Q: What should the hero title under your name say — the brief's "Cloud
  Solution Architect & Senior DevOps Engineer" or a title derived from your
  live GitHub bio? → A: Derive from the bio: "Software Engineer & DevOps
  Engineer", with "AWS Community Builder" as a credential badge
- Q: Should the rebuilt site drop the old Experience timeline section,
  keeping only a compact Credentials badge row? → A: No — keep an Experience
  timeline section with refreshed, current dates (Credentials row also stays)
- Q: Should the hero title say "Software Engineer & DevOps Engineer" or the
  bio's literal "Software Engineer & DevOps"? → A: The literal bio string,
  "Software Engineer & DevOps", used consistently (Principle VI mirror)
- Q: Should the contact form stick with composing a mailto email by default,
  or should a form-submission service be set up now? → A: Set up a form
  service now (e.g., Formspree); POST is the default, mailto is the fallback

## Functional Requirements

- FR-001: Single `index.html`, sections: Header, Hero, Capabilities,
  Projects (OSS + client work), Experience, Credentials, Contact, Footer.
- FR-002: Sticky translucent header with desktop nav, mobile toggle menu,
  and active-section highlighting (IntersectionObserver).
- FR-003: Hero includes animated crimson status ping reading
  "Available for Infrastructure & Platform Engineering".
- FR-004: Repo cards enrich from
  `https://api.github.com/users/thixpin/repos` with graceful degradation.
- FR-005: Card hover raises the card with crimson glow
  `0 0 20px rgba(239,68,68,0.15)`.
- FR-006: SEO: title/description, canonical URL `https://www.thixpin.me/`,
  Open Graph + Twitter cards (absolute image URLs on that domain), JSON-LD
  Person schema. The custom domain is configured in repo Settings → Pages
  plus a DNS CNAME record `www` → `thixpin.github.io` (user-executed; a
  `CNAME` file is ignored when deploying via a GitHub Actions workflow).
- FR-007: Deployed by GitHub Actions to GitHub Pages on push to `main`.
- FR-008: Hero title reads "Software Engineer & DevOps", mirroring the live
  GitHub bio verbatim (Principle VI); "AWS Community Builder" renders as a
  badge in the Credentials row.
- FR-009: Experience timeline lists roles with current, accurate dates that
  match the résumé PDF (Principle VI); no stale entries ship.
- FR-010: Contact form's `action` is the form service POST endpoint
  (owner-provisioned; e.g., Formspree), so submission works natively with
  JavaScript disabled. JS enhances with validation, sending states, and
  mailto composition as the fallback when the POST fails.

## Success Criteria

- SC-001: Lighthouse ≥ 95 Performance / Accessibility / Best Practices / SEO.
- SC-002: Page weight (excl. fonts/photo) < 60 KB.
- SC-003: Fully usable with JavaScript disabled.
- SC-004: Clean console; no failed requests besides an optionally
  rate-limited GitHub API call, which is caught and handled.
