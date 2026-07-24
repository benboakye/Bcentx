import { createClient } from "@/lib/supabase/server";
import type { CountryRow } from "@/types/database";

const COUNTRY_SELECT =
  "id, name, iso_code, slug, region, currency_code, summary, payment_notes, tax_notes, regulator_notes, risk_notes, official_sources, status, seo_title, seo_description, last_verified_at, created_at, updated_at";

export async function listAdminCountries(): Promise<CountryRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("countries")
    .select(COUNTRY_SELECT)
    .order("name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as CountryRow[];
}

export async function getAdminCountry(id: string): Promise<CountryRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("countries")
    .select(COUNTRY_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return (data as CountryRow | null) ?? null;
}
