# Bcentx 2.0

Global wealth intelligence platform — discover, compare, and evaluate legitimate wealth-building opportunities with risk awareness and country context.

> Wealth-building intelligence, without the hype.

## Status

Sprint 6 affiliate transparency work on `feature/affiliate-programs`.

- **Active app:** Next.js (App Router) + TypeScript + Tailwind at repository root
- **Data and auth:** Supabase schema, published-content reads, staff authentication, and core admin CRUD
- **Current feature:** Affiliate program administration and disclosed platform links
- **V1 archive:** `legacy/v1-static-site/` (static HTML/CSS/JS prototype)
- **Freeze tag:** `v1-static-freeze`

## Stack

| Layer | Tool |
|---|---|
| Frontend | Next.js |
| Styling | Tailwind CSS |
| Database | Supabase PostgreSQL |
| Auth | Supabase Auth |
| Hosting | Vercel |

## Develop locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Docs for builders

- `docs/ai-context/README.md` — AI / developer command center
- `docs/build-log/BUILD_LOG.md` — session progress
- `docs/build-log/DECISIONS.md` — major product/technical decisions
- `.cursor/rules/bcentx.mdc` — Cursor rules

## Branching

```text
main                       # V1 freeze (do not overwrite carelessly)
develop                    # Intended V2 integration branch
feature/auth-admin         # Completed V2 foundation through core admin CRUD
feature/affiliate-programs # Current Sprint 6 work
```

## Trust rules

No guaranteed-income claims, no personalized financial/legal/tax advice, disclose affiliates, keep risk warnings visible.
