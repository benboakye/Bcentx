import { createClient } from "@/lib/supabase/server";
import type { CategoryRow } from "@/types/database";

const CATEGORY_SELECT =
  "id, code, name, slug, summary, full_overview, icon_name, risk_level, beginner_friendly, display_order, status, seo_title, seo_description, canonical_url, last_verified_at, created_by, updated_by, created_at, updated_at";

export async function listAdminCategories(): Promise<CategoryRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select(CATEGORY_SELECT)
    .order("display_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as CategoryRow[];
}

export async function getAdminCategory(id: string): Promise<CategoryRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select(CATEGORY_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return (data as CategoryRow | null) ?? null;
}
