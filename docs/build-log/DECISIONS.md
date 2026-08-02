# Bcentx Decision Log

## Decision 001 - V1 archive and branch strategy

**Date:** 2026-07-15  
**Decision:** Keep `main` as untouched V1 for now; tag `v1-static-freeze`; build V2 on `develop` / `feature/*`; archive V1 into `legacy/v1-static-site/` on the V2 branch.  
**Reason:** Safest migration — preserves a recoverable V1 while allowing a clean Next.js root app.  
**Alternatives considered:** New separate repository for V2; building Next.js inside `Bcentxfiles/`; overwriting V1 on `main` immediately.  
**Impact:** Contributors work on feature branches off `develop`; `main` remains V1 until an explicit cutover.  
**Status:** active

---

## Decision 002 - Next.js App Router at repository root

**Date:** 2026-07-15  
**Decision:** Scaffold Bcentx 2.0 with Next.js App Router, TypeScript, and Tailwind CSS at the repo root.  
**Reason:** Matches the approved MVP stack and Vercel deployment path; App Router supports layouts, metadata, and future server actions.  
**Alternatives considered:** Pages Router; Vite SPA; keeping static HTML as primary app.  
**Impact:** Application code lives under `src/`; V1 HTML is reference-only under `legacy/`.  
**Status:** active

---

## Decision 003 - Theme tokens from V1 CSS variables

**Date:** 2026-07-15  
**Decision:** Map V1 CSS variables into Tailwind theme colors (`bcentx-blue`, `bcentx-green`, soft backgrounds) in `globals.css`.  
**Reason:** Preserve brand trust identity while enabling reusable utility classes.  
**Alternatives considered:** Exact CSS-file port without Tailwind tokens; redesigning colors.  
**Impact:** Components should use `bcentx-*` color utilities; risk amber/red tokens reserved for later.  
**Status:** superseded by Decision 006 (tokens added)

---

## Decision 004 - Condensed in-repo docs only

**Date:** 2026-07-15  
**Decision:** Copy only MVP-critical AI context and build-log docs into `docs/ai-context/` and `docs/build-log/`; do not commit the full Google Drive package.  
**Reason:** Keeps the repo lean and reduces AI confusion from research/monetization/AI-system folders.  
**Alternatives considered:** Commit entire Drive zip contents.  
**Impact:** Full planning package remains outside the repo (local Drive/zip); agent reads condensed context first.  
**Status:** active

---

## Decision 005 - Ignore stale `bcentx-v2-ai-context` remote branch

**Date:** 2026-07-15  
**Decision:** Do not use or clean up remote branch `bcentx-v2-ai-context` unless the owner explicitly requests it.  
**Reason:** Sprint 1 establishes fresh docs on `feature/project-setup`; avoiding accidental merges of incomplete prior work.  
**Alternatives considered:** Merge that branch first.  
**Impact:** Single source of truth for AI context is `docs/ai-context/` on the current feature branch.  
**Status:** active

---

## Decision 006 - Design system before Supabase schema

**Date:** 2026-07-15  
**Decision:** Complete a reusable UI design system (tokens, badges, cards, warnings, buttons, hero) with static demo content before implementing Supabase schema depth.  
**Reason:** Lets us validate trust-first UX patterns early while keeping database work in a dedicated sprint.  
**Alternatives considered:** Jump straight to Supabase migrations; build full pages with one-off markup.  
**Impact:** Route shells now preview real components; demo content in `src/lib/demo-content.ts` is temporary and must be replaced by DB records later. Risk amber/red tokens are now active.  
**Status:** active

---

## Decision 007 - Supabase schema + published-only RLS before auth UI

**Date:** 2026-07-15  
**Decision:** Land full MVP SQL schema, RLS helpers, and core seed now; keep auth/admin UI for the next sprint. Public pages fall back to demo content when env vars are missing.  
**Reason:** Matches the MVP build order and unblocks data modeling without waiting on admin screens.  
**Alternatives considered:** Delay schema until auth exists; use Prisma/Firebase instead of Supabase.  
**Impact:** Developers apply `supabase/migrations/*` to a project, then set `NEXT_PUBLIC_SUPABASE_*`. Service role keys stay server-only forever.  
**Status:** active

---

## Decision 008 - Staff-role admin gate before CRUD

**Date:** 2026-07-15  
**Decision:** Protect `/admin` with Supabase Auth session middleware plus server-side staff role checks (`researcher`/`editor`/`admin`/`owner`). New signups default to `user` and must be promoted via SQL.  
**Reason:** Secure the admin surface early without delaying for full content forms.  
**Alternatives considered:** Open admin with only a shared password; build CRUD before auth.  
**Impact:** Owners promote accounts in SQL; Email provider must be enabled in Supabase Auth.  
**Status:** active

---

## Decision 009 - Archive instead of hard-delete for categories

**Date:** 2026-07-17  
**Decision:** Admin Categories CRUD uses `status = 'archived'` instead of SQL DELETE.  
**Reason:** RLS has insert/update policies for editors but no delete policy; opportunities FK `on delete restrict` would also block hard deletes.  
**Alternatives considered:** Add delete RLS + cascade rules; omit remove entirely.  
**Impact:** Archived categories leave public pages; staff can still see and restore them by editing status.  
**Status:** active

---

## Decision 010 - Verified and disclosed affiliate publication

**Date:** 2026-08-02

**Decision:** Manage affiliate relationships as structured `affiliate_programs` records. Always require disclosure, accept only HTTP(S) destination URLs, and require a verification date before publication.

**Reason:** Affiliate revenue must remain separate from editorial scoring, while users need clear, current terms before following a monetized link.

**Alternatives considered:** Platform-level affiliate flags only; unrestricted affiliate URLs; publishing unverified program records.

**Impact:** Staff manage affiliate records through `/admin/affiliates`; published platform pages display a disclosure, relevant terms, verification dates, and sponsored link attributes.

**Status:** active
