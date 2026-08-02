"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireStaffProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import type { CommissionType, ContentStatus } from "@/types/database";

export type AffiliateActionState = {
  error?: string;
};

const COMMISSION_TYPES: CommissionType[] = [
  "fixed",
  "percentage",
  "recurring",
  "revenue_share",
  "hybrid",
  "unknown",
];

const CONTENT_STATUSES: ContentStatus[] = [
  "draft",
  "review",
  "published",
  "needs_update",
  "archived",
  "rejected",
];

function readString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function readOptional(formData: FormData, key: string) {
  const value = readString(formData, key);
  return value.length > 0 ? value : null;
}

function readHttpUrl(formData: FormData, key: string) {
  const value = readOptional(formData, key);
  if (!value) return { value: null } as const;

  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return { error: "Affiliate URL must use http or https." } as const;
    }
    return { value: url.toString() } as const;
  } catch {
    return { error: "Enter a valid affiliate URL." } as const;
  }
}

function parsePayload(formData: FormData) {
  const platformId = readString(formData, "platform_id");
  const programName = readString(formData, "program_name");
  const commissionType = readString(formData, "commission_type") as CommissionType;
  const status = readString(formData, "status") as ContentStatus;
  const affiliateUrl = readHttpUrl(formData, "affiliate_url");
  const lastVerifiedAt = readOptional(formData, "last_verified_at");

  if (!platformId || !programName) {
    return { error: "Platform and program name are required." } as const;
  }
  if (!COMMISSION_TYPES.includes(commissionType)) {
    return { error: "Choose a valid commission type." } as const;
  }
  if (!CONTENT_STATUSES.includes(status)) {
    return { error: "Choose a valid status." } as const;
  }
  if ("error" in affiliateUrl) {
    return { error: affiliateUrl.error } as const;
  }
  if (status === "published" && !lastVerifiedAt) {
    return {
      error: "Published affiliate programs require a last verified date.",
    } as const;
  }

  return {
    payload: {
      platform_id: platformId,
      program_name: programName,
      affiliate_url: affiliateUrl.value,
      commission_type: commissionType,
      commission_details: readOptional(formData, "commission_details"),
      cookie_duration: readOptional(formData, "cookie_duration"),
      payout_methods: readOptional(formData, "payout_methods"),
      payout_threshold: readOptional(formData, "payout_threshold"),
      country_restrictions: readOptional(formData, "country_restrictions"),
      promotional_rules: readOptional(formData, "promotional_rules"),
      // Trust rule: disclosure is always required for affiliate relationships.
      disclosure_required: true,
      status,
      last_verified_at: lastVerifiedAt,
    },
  } as const;
}

async function revalidateAffiliatePaths(platformIds: string[]) {
  revalidatePath("/admin/affiliates");
  revalidatePath("/admin");
  revalidatePath("/platforms");
  revalidatePath("/legal");

  const uniquePlatformIds = [...new Set(platformIds.filter(Boolean))];
  if (uniquePlatformIds.length === 0) return;

  const supabase = await createClient();
  const { data } = await supabase
    .from("platforms")
    .select("id, slug")
    .in("id", uniquePlatformIds);

  for (const platform of data ?? []) {
    if (platform.slug) {
      revalidatePath(`/platforms/${platform.slug}`);
    }
  }
}

export async function createAffiliateProgram(
  _prev: AffiliateActionState,
  formData: FormData,
): Promise<AffiliateActionState> {
  const { profile, allowed } = await requireStaffProfile();
  if (!profile || !allowed) {
    return { error: "Staff access required." };
  }

  const parsed = parsePayload(formData);
  if ("error" in parsed) {
    return { error: parsed.error };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("affiliate_programs").insert({
    ...parsed.payload,
    created_by: profile.id,
    updated_by: profile.id,
  });

  if (error) {
    return { error: error.message };
  }

  await revalidateAffiliatePaths([parsed.payload.platform_id]);
  redirect("/admin/affiliates?created=1");
}

export async function updateAffiliateProgram(
  id: string,
  _prev: AffiliateActionState,
  formData: FormData,
): Promise<AffiliateActionState> {
  const { profile, allowed } = await requireStaffProfile();
  if (!profile || !allowed) {
    return { error: "Staff access required." };
  }

  const parsed = parsePayload(formData);
  if ("error" in parsed) {
    return { error: parsed.error };
  }

  const supabase = await createClient();
  const { data: existing, error: existingError } = await supabase
    .from("affiliate_programs")
    .select("platform_id")
    .eq("id", id)
    .maybeSingle();

  if (existingError) {
    return { error: existingError.message };
  }

  const { error } = await supabase
    .from("affiliate_programs")
    .update({
      ...parsed.payload,
      updated_by: profile.id,
    })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  await revalidateAffiliatePaths([
    existing?.platform_id ?? "",
    parsed.payload.platform_id,
  ]);
  redirect("/admin/affiliates?updated=1");
}

export async function archiveAffiliateProgram(
  id: string,
): Promise<AffiliateActionState> {
  const { profile, allowed } = await requireStaffProfile();
  if (!profile || !allowed) {
    return { error: "Staff access required." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("affiliate_programs")
    .update({
      status: "archived",
      updated_by: profile.id,
    })
    .eq("id", id)
    .select("platform_id")
    .maybeSingle();

  if (error) {
    return { error: error.message };
  }

  if (data?.platform_id) {
    await revalidateAffiliatePaths([data.platform_id as string]);
  }
  redirect("/admin/affiliates?archived=1");
}
