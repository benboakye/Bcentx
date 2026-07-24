-- ===== supabase\migrations\20260715120000_init_schema.sql =====
-- Bcentx MVP schema: extensions, enums, tables, indexes, updated_at trigger
-- Sprint 3 â€” apply via Supabase SQL editor or `supabase db push`

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


-- ===== supabase\migrations\20260715120100_rls_policies.sql =====
-- Bcentx MVP RLS helpers and policies
-- Public reads published content only. Editors write via can_edit_content().

alter table profiles enable row level security;
alter table categories enable row level security;
alter table opportunities enable row level security;
alter table platforms enable row level security;
alter table countries enable row level security;
alter table opportunity_platforms enable row level security;
alter table country_availability enable row level security;
alter table affiliate_programs enable row level security;
alter table risk_warnings enable row level security;
alter table opportunity_risks enable row level security;
alter table roadmaps enable row level security;
alter table articles enable row level security;
alter table sources enable row level security;
alter table content_sources enable row level security;
alter table saved_opportunities enable row level security;
alter table admin_audit_logs enable row level security;

create or replace function current_user_role()
returns user_role as $$
  select role from profiles where id = auth.uid();
$$ language sql security definer set search_path = public;

create or replace function is_admin_or_owner()
returns boolean as $$
  select exists (
    select 1 from profiles
    where id = auth.uid()
      and role in ('admin', 'owner')
      and is_active = true
  );
$$ language sql security definer set search_path = public;

create or replace function can_edit_content()
returns boolean as $$
  select exists (
    select 1 from profiles
    where id = auth.uid()
      and role in ('researcher', 'editor', 'admin', 'owner')
      and is_active = true
  );
$$ language sql security definer set search_path = public;

-- Profiles
create policy "Users can read own profile"
on profiles for select
to authenticated
using (id = auth.uid() or is_admin_or_owner());

create policy "Users can update own profile"
on profiles for update
to authenticated
using (id = auth.uid())
with check (
  id = auth.uid()
  and role = (select role from profiles where id = auth.uid())
);

create policy "Admins can update any profile"
on profiles for update
to authenticated
using (is_admin_or_owner())
with check (is_admin_or_owner());

-- Published public reads
create policy "Public can read published categories"
on categories for select
using (status = 'published' or can_edit_content());

create policy "Public can read published opportunities"
on opportunities for select
using (status = 'published' or can_edit_content());

create policy "Public can read published platforms"
on platforms for select
using (status = 'published' or can_edit_content());

create policy "Public can read published countries"
on countries for select
using (status = 'published' or can_edit_content());

create policy "Public can read published articles"
on articles for select
using (status = 'published' or can_edit_content());

create policy "Public can read published risk warnings"
on risk_warnings for select
using (status = 'published' or can_edit_content());

create policy "Public can read published roadmaps"
on roadmaps for select
using (status = 'published' or can_edit_content());

create policy "Public can read published affiliate programs"
on affiliate_programs for select
using (status = 'published' or can_edit_content());

create policy "Public can read opportunity platforms for published rows"
on opportunity_platforms for select
using (
  exists (
    select 1 from opportunities o
    where o.id = opportunity_id and (o.status = 'published' or can_edit_content())
  )
);

create policy "Public can read opportunity risks for published rows"
on opportunity_risks for select
using (
  exists (
    select 1 from opportunities o
    where o.id = opportunity_id and (o.status = 'published' or can_edit_content())
  )
);

create policy "Public can read country availability for published targets"
on country_availability for select
using (
  exists (
    select 1 from countries c
    where c.id = country_id and (c.status = 'published' or can_edit_content())
  )
);

create policy "Public can read sources"
on sources for select
using (true);

create policy "Public can read content sources"
on content_sources for select
using (true);

-- Editor writes (content tables)
create policy "Editors can insert categories"
on categories for insert to authenticated
with check (can_edit_content());

create policy "Editors can update categories"
on categories for update to authenticated
using (can_edit_content()) with check (can_edit_content());

create policy "Editors can insert opportunities"
on opportunities for insert to authenticated
with check (can_edit_content());

create policy "Editors can update opportunities"
on opportunities for update to authenticated
using (can_edit_content()) with check (can_edit_content());

create policy "Editors can insert platforms"
on platforms for insert to authenticated
with check (can_edit_content());

create policy "Editors can update platforms"
on platforms for update to authenticated
using (can_edit_content()) with check (can_edit_content());

create policy "Editors can insert countries"
on countries for insert to authenticated
with check (can_edit_content());

create policy "Editors can update countries"
on countries for update to authenticated
using (can_edit_content()) with check (can_edit_content());

create policy "Editors can insert articles"
on articles for insert to authenticated
with check (can_edit_content());

create policy "Editors can update articles"
on articles for update to authenticated
using (can_edit_content()) with check (can_edit_content());

create policy "Editors can insert roadmaps"
on roadmaps for insert to authenticated
with check (can_edit_content());

create policy "Editors can update roadmaps"
on roadmaps for update to authenticated
using (can_edit_content()) with check (can_edit_content());

create policy "Editors can insert risk warnings"
on risk_warnings for insert to authenticated
with check (can_edit_content());

create policy "Editors can update risk warnings"
on risk_warnings for update to authenticated
using (can_edit_content()) with check (can_edit_content());

create policy "Editors can insert affiliate programs"
on affiliate_programs for insert to authenticated
with check (can_edit_content());

create policy "Editors can update affiliate programs"
on affiliate_programs for update to authenticated
using (can_edit_content()) with check (can_edit_content());

create policy "Editors can insert sources"
on sources for insert to authenticated
with check (can_edit_content());

create policy "Editors can update sources"
on sources for update to authenticated
using (can_edit_content()) with check (can_edit_content());

create policy "Editors can manage opportunity platforms"
on opportunity_platforms for all to authenticated
using (can_edit_content()) with check (can_edit_content());

create policy "Editors can manage opportunity risks"
on opportunity_risks for all to authenticated
using (can_edit_content()) with check (can_edit_content());

create policy "Editors can manage country availability"
on country_availability for all to authenticated
using (can_edit_content()) with check (can_edit_content());

create policy "Editors can manage content sources"
on content_sources for all to authenticated
using (can_edit_content()) with check (can_edit_content());

-- Saved opportunities (user-owned)
create policy "Users can read own saved opportunities"
on saved_opportunities for select to authenticated
using (user_id = auth.uid());

create policy "Users can insert own saved opportunities"
on saved_opportunities for insert to authenticated
with check (user_id = auth.uid());

create policy "Users can delete own saved opportunities"
on saved_opportunities for delete to authenticated
using (user_id = auth.uid());

-- Audit logs: admins only
create policy "Admins can read audit logs"
on admin_audit_logs for select to authenticated
using (is_admin_or_owner());

create policy "Admins can insert audit logs"
on admin_audit_logs for insert to authenticated
with check (is_admin_or_owner());


-- ===== supabase\migrations\20260715120200_seed_core.sql =====
-- Core MVP seed: 12 categories, priority countries, foundational risk warnings
-- Opportunity deep-seed comes in a later content sprint

insert into categories (code, name, slug, summary, risk_level, beginner_friendly, display_order, status)
values
('CAT-001', 'Careers and Employment', 'careers-and-employment', 'Employment, career development, remote work, salary growth, and professional advancement pathways.', 'low', true, 1, 'published'),
('CAT-002', 'Freelancing and Professional Services', 'freelancing-and-professional-services', 'Skill-based service income through freelancing, agencies, consulting, and professional service delivery.', 'medium', true, 2, 'published'),
('CAT-003', 'Business and Entrepreneurship', 'business-and-entrepreneurship', 'Business creation, small business models, entrepreneurship, and scalable commercial ventures.', 'medium', true, 3, 'published'),
('CAT-004', 'Digital Economy', 'digital-economy', 'Online income models, digital platforms, creator economy, e-commerce, and internet-based business models.', 'medium', true, 4, 'published'),
('CAT-005', 'Financial Markets and Trading', 'financial-markets-and-trading', 'Trading, financial markets, speculation, technical analysis, market platforms, and trading risk education.', 'very_high', false, 5, 'published'),
('CAT-006', 'Investing and Wealth Management', 'investing-and-wealth-management', 'Long-term investing, portfolio building, wealth management, financial planning, and investment literacy.', 'medium', false, 6, 'published'),
('CAT-007', 'Real Estate', 'real-estate', 'Property ownership, rental income, REITs, land, property development, and real estate-related wealth paths.', 'medium', false, 7, 'published'),
('CAT-008', 'Affiliate and Performance Marketing', 'affiliate-and-performance-marketing', 'Affiliate programs, referral income, CPA marketing, performance partnerships, and ethical promotion models.', 'medium', true, 8, 'published'),
('CAT-009', 'Education and Knowledge Monetization', 'education-and-knowledge-monetization', 'Tutoring, online courses, coaching, consulting, digital products, and knowledge-based income.', 'medium', true, 9, 'published'),
('CAT-010', 'Technology and Innovation', 'technology-and-innovation', 'Software, AI, cybersecurity, SaaS, open source, technical freelancing, and innovation commercialization.', 'medium', true, 10, 'published'),
('CAT-011', 'Alternative Investments', 'alternative-investments', 'Alternative assets including precious metals, collectibles, private markets, royalties, and digital assets.', 'very_high', false, 11, 'published'),
('CAT-012', 'Passive Income and Royalties', 'passive-income-and-royalties', 'Income-generating assets, royalties, licensing, digital products, semi-passive systems, and recurring revenue.', 'medium', true, 12, 'published')
on conflict (code) do nothing;

insert into countries (name, iso_code, slug, region, currency_code, summary, status)
values
('Ghana', 'GH', 'ghana', 'Africa', 'GHS', 'Ghana-focused guidance for digital income, local business, freelancing, education, real estate, and payment access.', 'published'),
('Canada', 'CA', 'canada', 'North America', 'CAD', 'Canada-focused guidance for careers, education, investing, taxes, benefits, platforms, and online income.', 'published'),
('United States', 'US', 'united-states', 'North America', 'USD', 'United States-focused guidance for platforms, investing, employment, affiliate programs, business, and compliance.', 'published'),
('Nigeria', 'NG', 'nigeria', 'Africa', 'NGN', 'Nigeria-focused guidance for digital income, freelancing, fintech, creator economy, and scam awareness.', 'published'),
('Kenya', 'KE', 'kenya', 'Africa', 'KES', 'Kenya-focused guidance for mobile-first digital income, entrepreneurship, freelancing, and local platforms.', 'published'),
('South Africa', 'ZA', 'south-africa', 'Africa', 'ZAR', 'South Africa-focused guidance for careers, business, investing, real estate, and online income.', 'published'),
('United Kingdom', 'GB', 'united-kingdom', 'Europe', 'GBP', 'UK-focused guidance for employment, freelancing, investing, tax, platforms, and financial promotion caution.', 'published'),
('India', 'IN', 'india', 'Asia', 'INR', 'India-focused guidance for technology, freelancing, education, startup paths, and platform access.', 'published'),
('Australia', 'AU', 'australia', 'Oceania', 'AUD', 'Australia-focused guidance for careers, investing, business, digital income, and tax awareness.', 'published'),
('United Arab Emirates', 'AE', 'united-arab-emirates', 'Middle East', 'AED', 'UAE-focused guidance for business, tax residency education, technology, real estate, and international income.', 'published')
on conflict (iso_code) do nothing;

insert into risk_warnings (title, slug, warning_type, severity, description, recommended_action, status)
values
('No Guaranteed Income', 'no-guaranteed-income', 'financial', 'high', 'No legitimate wealth-building path can guarantee income or profit. Results depend on skill, capital, timing, execution, market conditions, and risk.', 'Avoid any platform or person promising guaranteed income.', 'published'),
('Scam and Fraud Risk', 'scam-and-fraud-risk', 'scam', 'critical', 'Many online income, trading, crypto, passive income, and investment opportunities are used by scammers to exploit beginners.', 'Verify official sources, avoid pressure tactics, and never send money to unverified schemes.', 'published'),
('Affiliate Disclosure Required', 'affiliate-disclosure-required', 'compliance', 'medium', 'Affiliate links create a financial relationship that must be disclosed clearly to users.', 'Display a clear affiliate disclosure near affiliate links and on disclosure pages.', 'published'),
('Tax Advice Disclaimer Required', 'tax-advice-disclaimer-required', 'tax', 'high', 'Tax rules vary by country and user circumstances. Bcentx content must not be treated as personal tax advice.', 'Advise users to verify official tax authority guidance or consult a qualified tax professional.', 'published'),
('Legal Advice Disclaimer Required', 'legal-advice-disclaimer-required', 'legal', 'high', 'Legal requirements vary by country, business type, platform, and industry. Bcentx should not provide personal legal advice.', 'Use legal disclaimers and link to official sources where possible.', 'published'),
('High Capital Loss Risk', 'high-capital-loss-risk', 'financial', 'critical', 'Some opportunities can lead to partial or total loss of capital, especially trading, crypto, startup investing, private markets, and leveraged strategies.', 'Only risk money you can afford to lose and consult qualified professionals when needed.', 'published'),
('Platform Availability May Change', 'platform-availability-may-change', 'platform', 'medium', 'Platforms may change country availability, fees, payout methods, affiliate terms, and account rules without notice.', 'Verify platform information from official pages before acting.', 'published'),
('Unlicensed Financial Advice Risk', 'unlicensed-financial-advice-risk', 'compliance', 'critical', 'Providing personalized financial or investment advice may require licensing in many jurisdictions.', 'Keep content educational and general. Do not give personalized recommendations.', 'published')
on conflict (slug) do nothing;

