import { createClient } from "@/lib/supabase/server";
import type { PlatformRow } from "@/types/database";

const PLATFORM_SELECT =
  "id, name, slug, website_url, platform_type, summary, description, pricing_summary, fee_notes, country_restrictions, payout_methods, risk_notes, trust_rating, has_affiliate_program, status, seo_title, seo_description, last_verified_at, created_by, updated_by, created_at, updated_at";

export async function listAdminPlatforms(): Promise<PlatformRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("platforms")
    .select(PLATFORM_SELECT)
    .order("name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as PlatformRow[];
}

export async function getAdminPlatform(id: string): Promise<PlatformRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("platforms")
    .select(PLATFORM_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return (data as PlatformRow | null) ?? null;
}
