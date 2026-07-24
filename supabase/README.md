# Bcentx Supabase

SQL migrations for the Bcentx 2.0 MVP live in `migrations/`.

## Apply (Supabase Dashboard)

1. Create a Supabase project.
2. Open **SQL Editor**.
3. Run in order:
   - `migrations/20260715120000_init_schema.sql`
   - `migrations/20260715120100_rls_policies.sql`
   - `migrations/20260715120200_seed_core.sql`

## Apply (Supabase CLI)

```bash
npx supabase link --project-ref <your-project-ref>
npx supabase db push
```

## Local app env

Copy `.env.local.example` to `.env.local` and add:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (or classic `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

Never commit the service role key. Do not put it in `NEXT_PUBLIC_*` variables.

## Auth (Sprint 4)

1. In Supabase Dashboard → **Authentication** → **Providers**, enable **Email**.
2. Run `APPLY_AUTH_TRIGGER.sql` (or migration `20260715200000_profile_on_signup.sql`) so new users get a `profiles` row.
3. Open `/login`, create your staff account.
4. Promote yourself in SQL Editor:

```sql
update profiles
set role = 'owner'
where email = 'you@example.com';
```

5. Visit `/admin` — middleware requires a session; layout requires a staff role (`researcher`, `editor`, `admin`, or `owner`).

## What this sprint includes

- Core enums and tables from the Database Schema plan
- RLS helpers and published-only public reads
- Seed: 12 categories, 10 countries, foundational risk warnings
- Auth trigger + admin route protection

## Not in this sprint

- Full opportunity content import
- Admin dashboard CRUD forms
