"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireStaffProfile } from "@/lib/auth";
import { slugify } from "@/lib/admin/slug";
import { createClient } from "@/lib/supabase/server";
import type { ContentStatus, RiskLevel, WarningType } from "@/types/database";

export type RiskWarningActionState = {
  error?: string;
  success?: string;
};

const RISK_LEVELS: RiskLevel[] = [
  "low",
  "medium",
  "high",
  "very_high",
  "critical",
];

const CONTENT_STATUSES: ContentStatus[] = [
  "draft",
  "review",
  "published",
  "needs_update",
  "archived",
  "rejected",
];

const WARNING_TYPES: WarningType[] = [
  "scam",
  "financial",
  "legal",
  "tax",
  "immigration",
  "platform",
  "security",
  "ethical",
  "compliance",
  "general",
];

function readString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function readOptional(formData: FormData, key: string) {
  const value = readString(formData, key);
  return value.length > 0 ? value : null;
}

function parsePayload(formData: FormData) {
  const title = readString(formData, "title");
  const slugInput = readString(formData, "slug");
  const description = readString(formData, "description");
  const warningType = readString(formData, "warning_type") as WarningType;
  const severity = readString(formData, "severity") as RiskLevel;
  const status = readString(formData, "status") as ContentStatus;

  if (!title || !description) {
    return { error: "Title and description are required." } as const;
  }
  if (!WARNING_TYPES.includes(warningType)) {
    return { error: "Choose a valid warning type." } as const;
  }
  if (!RISK_LEVELS.includes(severity)) {
    return { error: "Choose a valid severity." } as const;
  }
  if (!CONTENT_STATUSES.includes(status)) {
    return { error: "Choose a valid status." } as const;
  }

  const slug = slugify(slugInput || title);
  if (!slug) {
    return { error: "Slug could not be generated from the title." } as const;
  }

  return {
    payload: {
      title,
      slug,
      description,
      warning_type: warningType,
      severity,
      status,
      recommended_action: readOptional(formData, "recommended_action"),
      official_source_url: readOptional(formData, "official_source_url"),
    },
  } as const;
}

function revalidateRiskPaths(slug?: string) {
  revalidatePath("/admin/risk-warnings");
  revalidatePath("/admin");
  revalidatePath("/risks");
  revalidatePath("/");
  if (slug) {
    revalidatePath(`/risks/${slug}`);
  }
}

export async function createRiskWarning(
  _prev: RiskWarningActionState,
  formData: FormData,
): Promise<RiskWarningActionState> {
  const { profile, allowed } = await requireStaffProfile();
  if (!profile || !allowed) {
    return { error: "Staff access required." };
  }

  const parsed = parsePayload(formData);
  if ("error" in parsed) {
    return { error: parsed.error };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("risk_warnings").insert(parsed.payload);

  if (error) {
    return { error: error.message };
  }

  revalidateRiskPaths(parsed.payload.slug);
  redirect("/admin/risk-warnings?created=1");
}

export async function updateRiskWarning(
  id: string,
  _prev: RiskWarningActionState,
  formData: FormData,
): Promise<RiskWarningActionState> {
  const { profile, allowed } = await requireStaffProfile();
  if (!profile || !allowed) {
    return { error: "Staff access required." };
  }

  const parsed = parsePayload(formData);
  if ("error" in parsed) {
    return { error: parsed.error };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("risk_warnings")
    .update(parsed.payload)
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidateRiskPaths(parsed.payload.slug);
  redirect("/admin/risk-warnings?updated=1");
}

export async function archiveRiskWarning(
  id: string,
): Promise<RiskWarningActionState> {
  const { profile, allowed } = await requireStaffProfile();
  if (!profile || !allowed) {
    return { error: "Staff access required." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("risk_warnings")
    .update({ status: "archived" })
    .eq("id", id)
    .select("slug")
    .maybeSingle();

  if (error) {
    return { error: error.message };
  }

  revalidateRiskPaths(data?.slug);
  redirect("/admin/risk-warnings?archived=1");
}
