"use server";

import { revalidatePath } from "next/cache";
import { requireStaffProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export type LinkActionState = {
  error?: string;
  success?: string;
};

export async function syncOpportunityPlatforms(
  opportunityId: string,
  _prev: LinkActionState,
  formData: FormData,
): Promise<LinkActionState> {
  const { profile, allowed } = await requireStaffProfile();
  if (!profile || !allowed) {
    return { error: "Staff access required." };
  }

  const selected = formData
    .getAll("platform_ids")
    .filter((value): value is string => typeof value === "string" && value.length > 0);

  const supabase = await createClient();

  const { data: existing, error: existingError } = await supabase
    .from("opportunity_platforms")
    .select("id, platform_id")
    .eq("opportunity_id", opportunityId);

  if (existingError) {
    return { error: existingError.message };
  }

  const currentIds = new Set((existing ?? []).map((row) => row.platform_id as string));
  const nextIds = new Set(selected);

  const toRemove = (existing ?? [])
    .filter((row) => !nextIds.has(row.platform_id as string))
    .map((row) => row.id as string);

  const toAdd = selected.filter((id) => !currentIds.has(id));

  if (toRemove.length > 0) {
    const { error } = await supabase
      .from("opportunity_platforms")
      .delete()
      .in("id", toRemove);
    if (error) {
      return { error: error.message };
    }
  }

  if (toAdd.length > 0) {
    const { error } = await supabase.from("opportunity_platforms").insert(
      toAdd.map((platformId) => ({
        opportunity_id: opportunityId,
        platform_id: platformId,
      })),
    );
    if (error) {
      return { error: error.message };
    }
  }

  revalidatePath(`/admin/opportunities/${opportunityId}/edit`);
  revalidatePath("/admin/opportunities");
  revalidatePath("/opportunities");
  return { success: "Linked platforms updated." };
}
