import { createClient } from "@/lib/supabase/server";
import type { OpportunityPlatformRow } from "@/types/database";

export async function listPlatformOptions(): Promise<
  { id: string; name: string; platform_type: string }[]
> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("platforms")
    .select("id, name, platform_type")
    .neq("status", "archived")
    .order("name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function listOpportunityPlatformLinks(
  opportunityId: string,
): Promise<OpportunityPlatformRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("opportunity_platforms")
    .select("id, opportunity_id, platform_id, relevance_score, notes, created_at")
    .eq("opportunity_id", opportunityId);

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as OpportunityPlatformRow[];
}

export async function listOpportunityOptions(): Promise<
  { id: string; name: string }[]
> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("opportunities")
    .select("id, name")
    .neq("status", "archived")
    .order("name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}
