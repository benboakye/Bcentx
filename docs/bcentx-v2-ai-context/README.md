# Bcentx 2.0 AI Build Context

This folder is the working instruction center for Cursor, GitHub Copilot, and any AI coding assistant used to build Bcentx 2.0.

Bcentx 1.0 is a useful static prototype. Bcentx 2.0 should be rebuilt as a structured web application while preserving the strongest parts of the original brand, theme, and learning-centre feel.

## Main Goal

Build Bcentx 2.0 as a global wealth intelligence platform that helps users discover, compare, and evaluate legitimate wealth-building opportunities.

The platform should be honest, risk-aware, country-aware, and structured around data, not random blog pages.

## Build Direction

Use this direction unless the project owner changes it:

- Frontend: Next.js
- Styling: Tailwind CSS
- Database: Supabase PostgreSQL
- Auth: Supabase Auth
- Hosting: Vercel
- Admin: Custom dashboard
- Content model: database-driven categories, opportunities, platforms, countries, risks, roadmaps, articles, and sources

## V1 Theme Preservation

Preserve the V1 visual direction:

- Deep blue / navy as the trust color
- Green as the action and growth color
- Light blue backgrounds
- White cards
- Rounded cards
- Clean educational layout
- Learning-centre style guidance
- Calm, helpful copywriting

V1 color references:

```css
--primary-blue: #1b145e;
--secondary-blue: #6c757d;
--light-blue: #e9f5ff;
--primary-green: #28a745;
--secondary-green: #218838;
--light-green: #d4edda;
```

## Important Rule

Do not build Bcentx 2.0 as a simple static blog.

The MVP must be a structured application with reusable components, database records, filters, scoring, risk warnings, and an admin dashboard.

## Files in This Folder

- `V1_REUSE_AND_MIGRATION_PLAN.md` explains what to keep from Version 1 and what to rebuild.
- `SPRINT_1_TASKS.md` defines the first implementation sprint.
- `GIT_WORKFLOW.md` defines how development should be tracked with Git.
- `BUILD_TASK_LOG.md` is the running log for what has been done and what is next.
- `DECISIONS.md` stores major product and technical decisions.

## How AI Assistants Should Use This Folder

Before writing code, read this folder and follow it.

When making meaningful changes:

1. Update the relevant task status.
2. Record important decisions in `DECISIONS.md`.
3. Keep commits small and clear.
4. Do not remove V1 assets unless the project owner approves.
5. Do not expose secrets or API keys.
6. Do not add risky financial claims or guaranteed-income language.

## Current Status

Planning package is complete. The next stage is implementation.

Start with Sprint 1: project foundation, Next.js setup, Tailwind setup, Supabase connection, and first database structure.