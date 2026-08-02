import { createClient } from "@/lib/supabase/server";
import type {
  AffiliateProgramListRow,
  AffiliateProgramRow,
} from "@/types/database";

const AFFILIATE_PROGRAM_SELECT =
  "id, platform_id, program_name, affiliate_url, commission_type, commission_details, cookie_duration, payout_methods, payout_threshold, country_restrictions, promotional_rules, disclosure_required, status, last_verified_at, created_by, updated_by, created_at, updated_at";

function normalizePlatform(
  value:
    | AffiliateProgramListRow["platforms"]
    | { name: string; slug: string }[]
    | null
    | undefined,
): AffiliateProgramListRow["platforms"] {
  if (!value) return null;
  return Array.isArray(value) ? (value[0] ?? null) : value;
}

export async function listAdminAffiliatePrograms(): Promise<
  AffiliateProgramListRow[]
> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("affiliate_programs")
    .select(`${AFFILIATE_PROGRAM_SELECT}, platforms(name, slug)`)
    .order("updated_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((row) => {
    const raw = row as AffiliateProgramListRow & {
      platforms:
        | AffiliateProgramListRow["platforms"]
        | { name: string; slug: string }[]
        | null;
    };

    return {
      ...raw,
      platforms: normalizePlatform(raw.platforms),
    };
  });
}

export async function getAdminAffiliateProgram(
  id: string,
): Promise<AffiliateProgramRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("affiliate_programs")
    .select(AFFILIATE_PROGRAM_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return (data as AffiliateProgramRow | null) ?? null;
}

export async function listPublishedAffiliateProgramsForPlatform(
  platformId: string,
): Promise<AffiliateProgramRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("affiliate_programs")
    .select(AFFILIATE_PROGRAM_SELECT)
    .eq("platform_id", platformId)
    .eq("status", "published")
    .order("program_name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as AffiliateProgramRow[];
}
