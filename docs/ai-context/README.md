# Bcentx 2.0 AI Build Context

This folder is the working instruction center for Cursor, GitHub Copilot, and any AI coding assistant used to build Bcentx 2.0.

Bcentx 1.0 is archived at `legacy/v1-static-site/`. Bcentx 2.0 is rebuilt as a structured Next.js application while preserving brand, theme, and Learning Centre feel.

## Main Goal

Build Bcentx 2.0 as a global wealth intelligence platform that helps users discover, compare, and evaluate legitimate wealth-building opportunities.

The platform should be honest, risk-aware, country-aware, and structured around data — not random blog pages.

## Build Direction

- Frontend: Next.js (App Router)
- Styling: Tailwind CSS
- Database: Supabase PostgreSQL (later sprints)
- Auth: Supabase Auth (later sprints)
- Hosting: Vercel
- Admin: Custom dashboard (later sprints)
- Content model: database-driven categories, opportunities, platforms, countries, risks, roadmaps, articles, and sources

## V1 Theme Preservation

- Deep blue / navy trust color: `#1b145e`
- Green action / growth: `#28a745` / `#218838`
- Light blue backgrounds: `#e9f5ff`
- White cards, rounded cards, calm educational layout
- Learning-centre style guidance and beginner-friendly copy

## Important Rules

- Do not build Bcentx 2.0 as a simple static blog.
- Do not add post-MVP features early (AI chatbot, subscriptions, community, portfolio, wallets, investment execution).
- Do not expose secrets or API keys.
- Do not write guaranteed-income or risk-free claims.
- Affiliate commission must never affect editorial scoring.

## Files in This Folder

- `README.md` — this file
- `V1_THEME_PRESERVATION.md` — theme and UI reuse guide
- `MVP_FOLDER_SCOPE.md` — which planning areas matter for MVP
- `GIT_WORKFLOW.md` — branch, commit, and session workflow summary

Also see:

- `docs/build-log/BUILD_LOG.md`
- `docs/build-log/DECISIONS.md`
- `.cursor/rules/bcentx.mdc`
- `.github/copilot-instructions.md`

## Current Status

Sprint 1 foundation is in progress / completed on `feature/project-setup`.

Next after Sprint 1: design-system refinements, then Supabase connection and schema (later sprint — not Sprint 1 depth).
