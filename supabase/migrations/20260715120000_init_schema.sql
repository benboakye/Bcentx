-- Bcentx MVP schema: extensions, enums, tables, indexes, updated_at trigger
-- Sprint 3 — apply via Supabase SQL editor or `supabase db push`

create extension if not exists "pgcrypto";
create extension if not exists "pg_trgm";

-- Enums
create type user_role as enum ('user', 'researcher', 'editor', 'admin', 'owner');

create type content_status as enum (
  'draft',
  'review',
  'published',
  'needs_update',
  'archived',
  'rejected'
);

create type level_scale as enum ('none', 'low', 'medium', 'high', 'very_high');

create type skill_level as enum ('low', 'medium', 'high', 'expert');

create type risk_level as enum ('low', 'medium', 'high', 'very_high', 'critical');

create type time_to_income as enum (
  'immediate',
  'short_term',
  'medium_term',
  'long_term',
  'uncertain'
);

create type liquidity_level as enum (
  'high',
  'medium',
  'low',
  'very_low',
  'not_applicable'
);

create type availability_status as enum (
  'available',
  'limited',
  'unavailable',
  'unknown',
  'verify'
);

create type commission_type as enum (
  'fixed',
  'percentage',
  'recurring',
  'revenue_share',
  'hybrid',
  'unknown'
);

create type warning_type as enum (
  'scam',
  'financial',
  'legal',
  'tax',
  'immigration',
  'platform',
  'security',
  'ethical',
  'compliance',
  'general'
);

-- Tables
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  full_name text,
  role user_role not null default 'user',
  country_code text,
  avatar_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table categories (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  name text not null,
  slug text unique not null,
  summary text not null,
  full_overview text,
  icon_name text,
  risk_level risk_level not null default 'medium',
  beginner_friendly boolean not null default false,
  display_order integer not null default 0,
  status content_status not null default 'draft',
  seo_title text,
  seo_description text,
  canonical_url text,
  last_verified_at date,
  created_by uuid references profiles(id),
  updated_by uuid references profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table opportunities (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references categories(id) on delete restrict,
  name text not null,
  slug text unique not null,
  summary text not null,
  description text,
  how_money_is_made text,
  how_money_is_lost text,
  best_for text,
  not_suitable_for text,
  startup_cost_level level_scale not null default 'medium',
  capital_required_level level_scale not null default 'medium',
  skill_required_level skill_level not null default 'medium',
  time_to_income time_to_income not null default 'uncertain',
  scalability level_scale not null default 'medium',
  risk_level risk_level not null default 'medium',
  scam_risk_level risk_level not null default 'medium',
  liquidity_level liquidity_level not null default 'not_applicable',
  beginner_friendly boolean not null default false,
  estimated_time_horizon text,
  bcentx_score numeric(5,2) check (bcentx_score >= 0 and bcentx_score <= 100),
  editorial_verdict text,
  required_disclaimer text,
  status content_status not null default 'draft',
  seo_title text,
  seo_description text,
  canonical_url text,
  last_verified_at date,
  created_by uuid references profiles(id),
  updated_by uuid references profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table platforms (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  website_url text,
  platform_type text not null,
  summary text not null,
  description text,
  pricing_summary text,
  fee_notes text,
  country_restrictions text,
  payout_methods text,
  risk_notes text,
  trust_rating numeric(5,2) check (trust_rating >= 0 and trust_rating <= 100),
  has_affiliate_program boolean not null default false,
  status content_status not null default 'draft',
  seo_title text,
  seo_description text,
  last_verified_at date,
  created_by uuid references profiles(id),
  updated_by uuid references profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table countries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  iso_code text unique not null,
  slug text unique not null,
  region text,
  currency_code text,
  summary text,
  payment_notes text,
  tax_notes text,
  regulator_notes text,
  risk_notes text,
  official_sources jsonb not null default '[]'::jsonb,
  status content_status not null default 'draft',
  seo_title text,
  seo_description text,
  last_verified_at date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table opportunity_platforms (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid not null references opportunities(id) on delete cascade,
  platform_id uuid not null references platforms(id) on delete cascade,
  relevance_score numeric(5,2) check (relevance_score >= 0 and relevance_score <= 100),
  notes text,
  created_at timestamptz not null default now(),
  unique(opportunity_id, platform_id)
);

create table country_availability (
  id uuid primary key default gen_random_uuid(),
  country_id uuid not null references countries(id) on delete cascade,
  opportunity_id uuid references opportunities(id) on delete cascade,
  platform_id uuid references platforms(id) on delete cascade,
  availability_status availability_status not null default 'unknown',
  notes text,
  official_source_url text,
  last_verified_at date,
  created_at timestamptz not null default now(),
  check (opportunity_id is not null or platform_id is not null)
);

create table affiliate_programs (
  id uuid primary key default gen_random_uuid(),
  platform_id uuid not null references platforms(id) on delete cascade,
  program_name text not null,
  affiliate_url text,
  commission_type commission_type not null default 'unknown',
  commission_details text,
  cookie_duration text,
  payout_methods text,
  payout_threshold text,
  country_restrictions text,
  promotional_rules text,
  disclosure_required boolean not null default true,
  status content_status not null default 'review',
  last_verified_at date,
  created_by uuid references profiles(id),
  updated_by uuid references profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table risk_warnings (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  warning_type warning_type not null default 'general',
  severity risk_level not null default 'medium',
  description text not null,
  recommended_action text,
  official_source_url text,
  status content_status not null default 'published',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table opportunity_risks (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid not null references opportunities(id) on delete cascade,
  risk_warning_id uuid not null references risk_warnings(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(opportunity_id, risk_warning_id)
);

create table roadmaps (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  category_id uuid references categories(id) on delete set null,
  opportunity_id uuid references opportunities(id) on delete set null,
  country_id uuid references countries(id) on delete set null,
  user_type text,
  summary text,
  steps jsonb not null default '[]'::jsonb,
  status content_status not null default 'draft',
  seo_title text,
  seo_description text,
  last_verified_at date,
  created_by uuid references profiles(id),
  updated_by uuid references profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  body text,
  category_id uuid references categories(id) on delete set null,
  opportunity_id uuid references opportunities(id) on delete set null,
  platform_id uuid references platforms(id) on delete set null,
  country_id uuid references countries(id) on delete set null,
  author_id uuid references profiles(id),
  status content_status not null default 'draft',
  seo_title text,
  seo_description text,
  canonical_url text,
  published_at timestamptz,
  last_verified_at date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table sources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  url text not null,
  source_type text,
  publisher text,
  country_id uuid references countries(id) on delete set null,
  notes text,
  last_checked_at date,
  created_at timestamptz not null default now()
);

create table content_sources (
  id uuid primary key default gen_random_uuid(),
  source_id uuid not null references sources(id) on delete cascade,
  category_id uuid references categories(id) on delete cascade,
  opportunity_id uuid references opportunities(id) on delete cascade,
  platform_id uuid references platforms(id) on delete cascade,
  article_id uuid references articles(id) on delete cascade,
  notes text,
  created_at timestamptz not null default now(),
  check (
    category_id is not null
    or opportunity_id is not null
    or platform_id is not null
    or article_id is not null
  )
);

create table saved_opportunities (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  opportunity_id uuid not null references opportunities(id) on delete cascade,
  notes text,
  created_at timestamptz not null default now(),
  unique(user_id, opportunity_id)
);

create table admin_audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references profiles(id),
  action text not null,
  table_name text,
  record_id uuid,
  old_data jsonb,
  new_data jsonb,
  created_at timestamptz not null default now()
);

-- Indexes
create index categories_status_display_order_idx on categories (status, display_order);
create index categories_name_trgm_idx on categories using gin (name gin_trgm_ops);

create index opportunities_category_id_idx on opportunities (category_id);
create index opportunities_status_score_idx on opportunities (status, bcentx_score desc);
create index opportunities_name_trgm_idx on opportunities using gin (name gin_trgm_ops);

create index platforms_status_idx on platforms (status);
create index platforms_name_trgm_idx on platforms using gin (name gin_trgm_ops);

create index countries_status_region_idx on countries (status, region);
create index country_availability_country_id_idx on country_availability (country_id);
create index country_availability_opportunity_id_idx on country_availability (opportunity_id);
create index country_availability_platform_id_idx on country_availability (platform_id);

create index articles_status_published_at_idx on articles (status, published_at desc);
create index roadmaps_status_idx on roadmaps (status);
create index risk_warnings_status_severity_idx on risk_warnings (status, severity);
create index affiliate_programs_platform_id_idx on affiliate_programs (platform_id);
create index sources_url_idx on sources (url);

-- updated_at helper
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_set_updated_at
before update on profiles
for each row execute function set_updated_at();

create trigger categories_set_updated_at
before update on categories
for each row execute function set_updated_at();

create trigger opportunities_set_updated_at
before update on opportunities
for each row execute function set_updated_at();

create trigger platforms_set_updated_at
before update on platforms
for each row execute function set_updated_at();

create trigger countries_set_updated_at
before update on countries
for each row execute function set_updated_at();

create trigger affiliate_programs_set_updated_at
before update on affiliate_programs
for each row execute function set_updated_at();

create trigger risk_warnings_set_updated_at
before update on risk_warnings
for each row execute function set_updated_at();

create trigger roadmaps_set_updated_at
before update on roadmaps
for each row execute function set_updated_at();

create trigger articles_set_updated_at
before update on articles
for each row execute function set_updated_at();
