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
