# Tasks: Portfolio Rebrand — Monochrome + Crimson

**Input**: Design documents from `specs/001-portfolio-rebrand/` (plan.md, spec.md, data-model.md, contracts/, research.md)

**Tests**: Not requested — validation is the manual checklist (quickstart.md), covered in the Polish phase.

**Organization**: Tasks are grouped by user story. `[x]` = done in the current scaffold; `[ ]` = pending (including reworks reopened by the 2026-10-02 clarifications). "(was Txxx)" maps to the pre-regeneration task IDs.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files/sections, no dependencies)
- **[Story]**: US1–US4 from spec.md

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Repo skeleton, design tokens, build pipeline

- [x] T001 Create repo skeleton (`assets/`, `src/`, `.github/workflows/`, `.specify/`, `specs/`), add `.nojekyll` (was T001)
- [x] T002 [P] Migrate assets from old repo into `assets/`: favicons, `thixpin.jpg` (downscaled to 640px), `og-preview.png`, `resume.pdf` (was T002)
- [x] T003 [P] `tailwind.config.js` design tokens: bg/surface/line/ink/muted/accent, fonts, `shadow-glow`, `max-w-site` (was T003)
- [x] T004 `src/input.css`: base layer (focus ring, selection, reduced-motion) + component classes (`.card`, `.card-interactive`, `.tag`, `.btn-primary`, `.btn-ghost`, `.nav-link`, `.field`, `.section`, `.eyebrow`), `.bg-grid` utility (was T004)
- [x] T005 `package.json` with `tailwindcss@^3.4` and `dev`/`build`/`serve` scripts; verify `npm run build` exits 0 (was T005)

**Checkpoint**: build pipeline green, tokens available to all markup.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: The `index.html` shell every story's section lives in

**Note**: T006 gates deployment (constitution VI) and final acceptance of every story's SEO/metadata — not section work, which is largely scaffold-complete.

- [X] T006 Document head rework in `index.html`: title/meta/OG/Twitter/JSON-LD use the literal bio title "Software Engineer & DevOps" (FR-008) and absolute URLs on `https://www.thixpin.me/` (canonical, `og:url`, `og:image`/`twitter:image`); favicons, Google Fonts (preconnect + swap) (was T006)
- [x] T007 Sticky header in `index.html`: logo mark, desktop nav, résumé CTA, mobile toggle button (`aria-expanded`/`aria-controls`), hidden mobile nav panel (was T007)
- [x] T008 Footer in `index.html`: year, source link, back-to-top (was T013)

**Checkpoint**: page shell valid — story sections can be filled in parallel.

---

## Phase 3: User Story 1 — Recruiter scans the profile (Priority: P1) 🎯 MVP

**Goal**: Recruiter understands within 10 s who Soe Thura is, sees availability, reaches résumé and contact from the sticky header.

**Independent Test**: On a 375 px viewport, hero shows name, title, availability ping, and two CTAs above the fold; résumé opens in a new tab.

- [X] T009 [US1] Hero rework in `index.html`: crimson status ping ("Available for Infrastructure & Platform Engineering", FR-003), name + title "Software Engineer & DevOps" (FR-008), positioning copy, two CTAs, proof-strip `<dl>`, framed portrait (grayscale → color on hover) (was T008)
- [X] T010 [US1] Experience timeline section in `index.html`: ExperienceEntry rows (role, organization, start, end-or-"Present", 1–2 line summary) — **dates must match `assets/resume.pdf`** (FR-009, data-model.md); no stale entries ship; add nav link + section anchor (was T029)
- [X] T011 [US1] Credentials rework in `index.html`: linked cert badge row (Credly/GCP/LFCS/GitHub — verification URL required per data-model.md CredentialBadge) + "AWS Community Builder" badge (FR-008), community line (instructor, Myanmar Unicode Area, Kalaung) (was T011) — note: CKA badge added 2026-10-02, pending its Credly URL

**Checkpoint**: US1 acceptance passes independently — MVP ready.

---

## Phase 4: User Story 2 — Engineer evaluates the work (Priority: P1)

**Goal**: Capabilities grid and project showcase with repo links; live stats when the API is reachable, static fallback otherwise.

**Independent Test**: Six curated repos render name/description/language/stars/link with JS off; with JS on and API reachable, stats refresh.

- [x] T012 [US2] Capabilities grid in `index.html`: 6 cards per research.md blueprint with mono tech tags (was T009)
- [x] T013 [US2] Projects section in `index.html`: 6 static repo cards (`data-repo` must equal the GitHub repo name exactly; fallback stars/language in markup **must never exceed reality**, data-model.md RepoCard) + 2 client-work cards (was T010)
- [x] T014 [US2] GitHub API enrichment in `index.html` inline JS per `contracts/github-api.md`: one GET after DOMContentLoaded, update stars/language/description on matching cards only on 200; silent catch on 403/network/non-200 keeps static state; status line update (was T017)

**Checkpoint**: US2 passes with and without the API.

---

## Phase 5: User Story 4 — Visitor with assistive tech (Priority: P1)

**Goal**: Keyboard and screen-reader users navigate all sections.

**Independent Test**: Skip link works, landmarks present, focus rings visible, menu toggle announces expanded state, reduced-motion disables animations.

- [x] T015 [US4] A11y pass over `index.html`: skip link, landmark roles, `main[tabindex="-1"]`, focus-visible rings, alt text on all images (was T014)
- [x] T016 [US4] Mobile menu toggle in `index.html` inline JS: `aria-expanded` state sync, close on link click and Escape, focus return (was T015)
- [x] T017 [US4] Active-section nav highlighting via IntersectionObserver (`aria-current`, exactly one active link; plain anchors work without JS — data-model.md NavSection) (was T016)

**Checkpoint**: keyboard/screen-reader walkthrough clean.

---

## Phase 6: User Story 3 — Client makes contact (Priority: P2)

**Goal**: Form submits to the form service (native POST works with JS off); direct links always available.

**Independent Test**: With JS off, submitting the form POSTs natively to the service; with JS on, invalid input is reported via `aria-live`, success resets the form, POST failure composes a mailto.

- [x] T018 [US3] Contact section markup in `index.html`: direct links (email/GitHub/LinkedIn with accessible names) + semantic form (labels, required name/email/message, email format, `aria-live` status region) (was T012)
- [ ] T019 [US3] (user-executed) Get a Web3Forms access key (web3forms.com, free plan) and paste it into the hidden `access_key` input in `index.html` — no fabricated key ships (was T030)
- [X] T020 [US3] Contact form rework in `index.html` per `contracts/form-service.md`: `method="POST" action="https://api.web3forms.com/submit"` + hidden `access_key`/`subject`/`from_name` + `botcheck` honeypot so native submit works with JS disabled (FR-010); inline JS validates (`aria-invalid` + focus first invalid), sends JSON with `Accept: application/json` and sending state, mailto composition fallback on non-2xx/network failure — live sends gated on T019 (was T018)

**Checkpoint**: US3 passes on both paths.

---

## Phase 7: Polish & Cross-Cutting Concerns

- [x] T021 [P] Dynamic year stamp in `index.html` inline JS (was T019)
- [x] T022 [P] `.github/workflows/deploy.yml`: npm ci → Tailwind build → stage `_site` (no node_modules) → configure/upload/deploy Pages, `pages` concurrency group (was T020)
- [x] T023 [P] `.gitignore`: node_modules, built CSS, .DS_Store (was T021)
- [X] T024 [P] `README.md`: project intro, local dev, deploy notes (was T022)
- [ ] T025 (user-executed) Repo migration + custom domain per quickstart.md: archive old Next.js code on a branch, switch Pages source to "GitHub Actions", push new tree, set custom domain `www.thixpin.me` in Settings → Pages, create DNS CNAME `www` → `thixpin.github.io` (FR-006; no `CNAME` file — ignored by Actions deploys) — **requires T006 and T009 complete first (constitution VI gate)** (was T023)
- [X] T026 Local build + serve per quickstart.md; Chrome check: console clean, ping animates, fonts load (SC-004) (was T024) — verified 2026-10-02: build green, served 200, console clean via Lighthouse errors-in-console audit (headless Chrome), render verified by screenshot
- [ ] T027 JS-disabled / API-blocked test per quickstart.md: all content renders from static fallback; contact form submits natively to the form-service endpoint (SC-003, FR-010) (was T025) — partial 2026-10-02: static fallback verified by markup inspection + curl markers; native form POST untestable until the T019 access key lands
- [X] T028 Responsive check per quickstart.md at 375px / 768px / 1280px; no horizontal scroll (was T026) — verified 2026-10-02: scrollWidth == innerWidth measured at all three widths
- [ ] T029 Keyboard walkthrough per quickstart.md: skip link, menu toggle, every interactive element reachable, focus visible (was T027) — pending: needs an interactive browser (Chrome extension not connected this session)
- [X] T030 Lighthouse run per quickstart.md; meet SC-001 (≥95 ×4) and SC-002 (<60 KB page weight excl. fonts/photo) (was T028) — verified 2026-10-02: 100/100/100/100 (FCP 0.9 s, LCP 1.5 s, CLS 0); page weight 13.7 KB gzipped transfer (64.4 KB raw — flag: SC-002 reading)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: done
- **Foundational (Phase 2)**: T006 pending — blocks final acceptance of all stories (head metadata), though section work can proceed in `index.html`
- **User Stories (Phases 3–6)**: independent of each other once Phase 2 is done; priority order US1 → US2 → US4 → US3
- **Polish (Phase 7)**: T025 additionally gated on T006 + T009 (constitution VI — the old title must not deploy); T026–T030 after all desired stories

### Story-Internal Dependencies

- T020 depends on T019 (real endpoint)
- T010 content sourced from `assets/resume.pdf` (T002)

### Parallel Opportunities

- All `index.html` tasks share one file — execute them sequentially (T006 → T009 → T010 → T011 → T020), never in parallel
- Genuinely parallel tracks (different files/owners): {`index.html` work} ∥ T019 (user provisions the endpoint) ∥ T024 (`README.md`)
- T026–T029 can run in one validation session; T030 last

## Parallel Example

```bash
# While the index.html rework proceeds sequentially, launch in parallel:
Task: "(user) Provision form service account and record the endpoint"   # T019
Task: "Write README.md: project intro, local dev, deploy notes"         # T024
```

## Implementation Strategy

### MVP First (User Story 1 Only)

1. T006 (head rework — foundational)
2. T009 → T010 → T011 (sequential — same file)
3. **STOP and VALIDATE**: US1 independent test on 375 px viewport
4. US2/US4 are already scaffold-complete; re-verify, then US3 once T019 lands

### Incremental Delivery

Each story checkpoint is independently testable; deploy (T025) only after T006 + T009 clear the constitution VI gate. Remaining effort is concentrated in: T006, T009–T011, T019–T020, T024–T030.

## Notes

- `[x]` tasks were verified in the scaffold before the 2026-10-02 clarifications; reworked requirements reopened T006, T009, T011, T020
- Old→new ID map kept inline as "(was Txxx)" — plan.md and quickstart.md references updated to the new IDs
