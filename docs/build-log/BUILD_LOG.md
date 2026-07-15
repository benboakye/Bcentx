# Bcentx Build Log

## Current Build Status

- Current phase: Sprint 1 — project foundation
- Current branch: `feature/project-setup`
- Last completed task: Initialize Next.js App Router + Tailwind foundation with V1 archive
- Next task: Merge `feature/project-setup` → `develop` after review; then design-system polish / Supabase prep (Sprint 2+)
- Blockers: None

---

## Session Log

### 2026-07-15 - Sprint 1 project foundation

**Branch:** `feature/project-setup` (from `develop`)  
**Goal:** Archive V1 safely and scaffold Bcentx 2.0 Next.js foundation without building post-MVP features

**Files changed:**

- Created tag `v1-static-freeze` on `main` commit
- Moved `Bcentxfiles/` and `Docs/` → `legacy/v1-static-site/`
- Scaffolded Next.js 16 + TypeScript + Tailwind 4 at repo root
- Added theme tokens, Header/Footer, homepage, route shells
- Copied brand assets to `public/brand/` and `public/favicon/`
- Added `docs/ai-context/`, `docs/build-log/`, Cursor rules, Copilot instructions, PR template

**What was done:**

1. Kept `main` as V1; tagged `v1-static-freeze`
2. Created `develop` and `feature/project-setup`
3. Archived V1 static site into `legacy/v1-static-site/`
4. Initialized Next.js App Router project at repository root (not inside legacy HTML)
5. Applied V1 blue/green theme tokens in Tailwind CSS
6. Added public layout shells and MVP route placeholders
7. Added AI context and build/decision logs (condensed; not full Drive dump)
8. Did **not** add Supabase schema depth, full admin, AI, subscriptions, or content import

**Checks run:**

- `npm run build` — success (14 static routes including home + shells)

**Issues found:**

- None blocking; only condensed MVP docs were copied into-repo (full Drive package stays outside)

**Decisions made:**

- See `DECISIONS.md` — archive + branch strategy, App Router, Tailwind theme mapping

**Next step:**

- PR `feature/project-setup` → `develop`
- Sprint 2+: theme refinements, env stubs, Supabase project connection (schema in dedicated sprint)

**Commit message:**

`chore: initialize Bcentx v2 project foundation`
