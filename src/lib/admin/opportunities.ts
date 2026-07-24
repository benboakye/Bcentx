import { createClient } from "@/lib/supabase/server";
import type { OpportunityListRow, OpportunityRow } from "@/types/database";

const OPPORTUNITY_SELECT = `
  id, category_id, name, slug, summary, description,
  how_money_is_made, how_money_is_lost, best_for, not_suitable_for,
  startup_cost_level, capital_required_level, skill_required_level,
  time_to_income, scalability, risk_level, scam_risk_level, liquidity_level,
  beginner_friendly, estimated_time_horizon, bcentx_score, editorial_verdict,
  required_disclaimer, status, seo_title, seo_description, canonical_url,
  last_verified_at, created_by, updated_by, created_at, updated_at
`;

export async function listAdminOpportunities(): Promise<OpportunityListRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("opportunities")
    .select(`${OPPORTUNITY_SELECT}, categories(name, slug)`)
    .order("updated_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((row) => {
    const raw = row as OpportunityListRow & {
      categories:
        | OpportunityListRow["categories"]
        | { name: string; slug: string }[]
        | null;
    };
    const category = Array.isArray(raw.categories)
      ? (raw.categories[0] ?? null)
      : (raw.categories ?? null);

    return {
      ...raw,
      categories: category,
    };
  });
}

export async function getAdminOpportunity(
  id: string,
): Promise<OpportunityRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("opportunities")
    .select(OPPORTUNITY_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return (data as OpportunityRow | null) ?? null;
}

export async function listCategoryOptions(): Promise<
  { id: string; name: string; code: string }[]
> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, code")
    .neq("status", "archived")
    .order("display_order", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}
