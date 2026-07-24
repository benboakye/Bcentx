import { createClient } from "@/lib/supabase/server";
import type { RiskWarningRow } from "@/types/database";

const RISK_WARNING_SELECT =
  "id, title, slug, warning_type, severity, description, recommended_action, official_source_url, status, created_at, updated_at";

export async function listAdminRiskWarnings(): Promise<RiskWarningRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("risk_warnings")
    .select(RISK_WARNING_SELECT)
    .order("severity", { ascending: false })
    .order("title", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as RiskWarningRow[];
}

export async function getAdminRiskWarning(
  id: string,
): Promise<RiskWarningRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("risk_warnings")
    .select(RISK_WARNING_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return (data as RiskWarningRow | null) ?? null;
}
