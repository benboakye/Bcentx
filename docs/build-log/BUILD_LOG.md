# Bcentx Build Log

## Current Build Status

- Current phase: Sprint 5 — Admin CRUD + linking
- Current branch: `feature/auth-admin`
- Last completed task: Opportunity↔platform links + country availability CRUD
- Next task: Commit Sprint 4–5; optional affiliate programs / content import
- Blockers: none

---

## Session Log

### 2026-07-19 - Sprint 5: Linking layer

**Branch:** `feature/auth-admin`  
**Goal:** Connect countries/platforms/opportunities for availability context

**What was done:**

1. Opportunity edit: multi-select platform linker (`opportunity_platforms`)
2. `/admin/availability` CRUD for `country_availability`
3. Admin hub + nav: Availability module

**Checks run:**

- `npx tsc --noEmit` — success

**Next step:**

- Commit auth + admin CRUD sprint

**Suggested commit message:**

`feat: add platform links and country availability admin`

---

### 2026-07-19 - Sprint 5: Platforms & countries admin CRUD

**Branch:** `feature/auth-admin`  
**Goal:** Finish core staff content modules

**What was done:**

1. Countries admin list / create / edit / archive
2. Platforms admin list / create / edit / archive
3. Public `/platforms` published reads + `/platforms/[slug]` detail
4. Admin hub split into Platforms + Countries cards; nav updated

**Checks run:**

- `npx tsc --noEmit` — success
- `npm run build` — blocked by `.next` file lock while `npm run dev` is running (EPERM); retry after stopping dev if needed

**Next step:**

- Commit auth + admin CRUD sprint
- Optional: country availability / opportunity-platform links

**Suggested commit message:**

`feat: add admin platforms and countries CRUD`

---

### 2026-07-19 - Sprint 5: Opportunities admin CRUD

**Branch:** `feature/auth-admin`  
**Goal:** Core opportunity records for staff + published public reads

**What was done:**

1. `OpportunityRow` types + admin list/form/actions (category select, scores, risk fields)
2. `/admin/opportunities` create / edit / archive
3. Public `/opportunities` loads published rows (demo fallback)
4. Public `/opportunities/[slug]` detail page
5. Admin hub + nav updated

**Checks run:**

- `npm run build` — success

**Next step:**

- Platforms & countries admin CRUD

**Suggested commit message:**

`feat: add admin opportunities CRUD`

---

### 2026-07-19 - Sprint 5: Risk warnings admin CRUD

**Branch:** `feature/auth-admin`  
**Goal:** Second staff content module — manage risk warnings end-to-end

**What was done:**

1. Extended `RiskWarningRow` with `official_source_url` + timestamps
2. `/admin/risk-warnings` list with type / severity / status
3. `/admin/risk-warnings/new` and `/admin/risk-warnings/[id]/edit` forms
4. Server actions for create, update, archive
5. Admin hub + layout nav updated

**Checks run:**

- `npm run build` — success

**Next step:**

- Opportunities admin CRUD

**Suggested commit message:**

`feat: add admin risk warnings CRUD`

---

### 2026-07-17 - Sprint 5 start: Categories admin CRUD

**Branch:** `feature/auth-admin`  
**Goal:** First staff content module — manage categories end-to-end

**What was done:**

1. Extended `CategoryRow` types for full schema fields
2. `/admin/categories` list with status / risk badges
3. `/admin/categories/new` and `/admin/categories/[id]/edit` forms
4. Server actions for create, update, archive (soft-delete via `status`)
5. Admin hub link + layout nav for Categories
6. Login password show/hide eye (carry-over from auth session)

**Checks run:**

- `npm run build` — success

**Next step:**

- Verify Categories CRUD in browser against live Supabase
- Risk warnings admin CRUD

**Suggested commit message:**

`feat: add admin categories CRUD`

---

### 2026-07-15 - Sprint 4 auth / admin protection

**Branch:** `feature/auth-admin`  
**Goal:** Protect `/admin` with Supabase Auth + staff roles without building full CRUD yet

**What was done:**

1. Middleware session refresh + redirect for `/admin` and `/login`
2. `/login` email/password sign-in and sign-up
3. `/auth/callback` route for code exchange
4. Admin layout role gate (`researcher` | `editor` | `admin` | `owner`)
5. Profile auto-create trigger SQL (`APPLY_AUTH_TRIGGER.sql`)
6. Admin dashboard shell confirming protection works
7. Category visual contrast improvements retained from prior session

**Checks run:**

- `npm run build` — success (Next 16 notes middleware→proxy deprecation; still functional)

**Next step:**

- Apply `supabase/APPLY_AUTH_TRIGGER.sql`
- Enable Email provider
- Sign up, promote to owner, verify `/admin`

**Suggested commit message:**

`feat: add Supabase auth and protect admin routes`

---

### Earlier sprints

- Sprint 3: Supabase schema + seed + published reads
- Sprint 2: Design system
- Sprint 1: Next.js foundation + V1 archive
