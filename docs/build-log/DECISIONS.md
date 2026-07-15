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
**Status:** active

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
