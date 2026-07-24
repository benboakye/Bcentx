import { createClient } from "@/lib/supabase/server";
import type {
  CountryAvailabilityListRow,
  CountryAvailabilityRow,
} from "@/types/database";

const AVAILABILITY_SELECT =
  "id, country_id, opportunity_id, platform_id, availability_status, notes, official_source_url, last_verified_at, created_at";

function normalizeJoin<T extends { name: string }>(
  value: T | T[] | null | undefined,
): T | null {
  if (!value) return null;
  return Array.isArray(value) ? (value[0] ?? null) : value;
}

export async function listAdminCountryAvailability(): Promise<
  CountryAvailabilityListRow[]
> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("country_availability")
    .select(
      `${AVAILABILITY_SELECT}, countries(name, iso_code), opportunities(name), platforms(name)`,
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((row) => {
    const raw = row as CountryAvailabilityListRow & {
      countries:
        | CountryAvailabilityListRow["countries"]
        | { name: string; iso_code: string }[]
        | null;
      opportunities:
        | CountryAvailabilityListRow["opportunities"]
        | { name: string }[]
        | null;
      platforms:
        | CountryAvailabilityListRow["platforms"]
        | { name: string }[]
        | null;
    };

    return {
      ...raw,
      countries: normalizeJoin(raw.countries),
      opportunities: normalizeJoin(raw.opportunities),
      platforms: normalizeJoin(raw.platforms),
    };
  });
}

export async function getAdminCountryAvailability(
  id: string,
): Promise<CountryAvailabilityRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("country_availability")
    .select(AVAILABILITY_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return (data as CountryAvailabilityRow | null) ?? null;
}

export async function listCountryOptions(): Promise<
  { id: string; name: string; iso_code: string }[]
> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("countries")
    .select("id, name, iso_code")
    .neq("status", "archived")
    .order("name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}
