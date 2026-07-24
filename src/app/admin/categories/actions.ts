"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireStaffProfile } from "@/lib/auth";
import { slugify } from "@/lib/admin/slug";
import { createClient } from "@/lib/supabase/server";
import type { ContentStatus, RiskLevel } from "@/types/database";

export type CategoryActionState = {
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

function readString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function readOptional(formData: FormData, key: string) {
  const value = readString(formData, key);
  return value.length > 0 ? value : null;
}

function parseRiskLevel(value: string): RiskLevel | null {
  return RISK_LEVELS.includes(value as RiskLevel) ? (value as RiskLevel) : null;
}

function parseStatus(value: string): ContentStatus | null {
  return CONTENT_STATUSES.includes(value as ContentStatus)
    ? (value as ContentStatus)
    : null;
}

function parsePayload(formData: FormData) {
  const name = readString(formData, "name");
  const code = readString(formData, "code");
  const slugInput = readString(formData, "slug");
  const summary = readString(formData, "summary");
  const riskLevel = parseRiskLevel(readString(formData, "risk_level"));
  const status = parseStatus(readString(formData, "status"));
  const displayOrderRaw = readString(formData, "display_order");
  const displayOrder = Number.parseInt(displayOrderRaw || "0", 10);

  if (!name || !code || !summary) {
    return { error: "Code, name, and summary are required." } as const;
  }
  if (!riskLevel) {
    return { error: "Choose a valid risk level." } as const;
  }
  if (!status) {
    return { error: "Choose a valid status." } as const;
  }
  if (!Number.isFinite(displayOrder)) {
    return { error: "Display order must be a number." } as const;
  }

  const slug = slugify(slugInput || name);
  if (!slug) {
    return { error: "Slug could not be generated from the name." } as const;
  }

  return {
    payload: {
      code,
      name,
      slug,
      summary,
      full_overview: readOptional(formData, "full_overview"),
      icon_name: readOptional(formData, "icon_name"),
      risk_level: riskLevel,
      beginner_friendly: formData.get("beginner_friendly") === "on",
      display_order: displayOrder,
      status,
      seo_title: readOptional(formData, "seo_title"),
      seo_description: readOptional(formData, "seo_description"),
      canonical_url: readOptional(formData, "canonical_url"),
      last_verified_at: readOptional(formData, "last_verified_at"),
    },
  } as const;
}

function revalidateCategoryPaths(slug?: string) {
  revalidatePath("/admin/categories");
  revalidatePath("/admin");
  revalidatePath("/categories");
  revalidatePath("/");
  if (slug) {
    revalidatePath(`/categories/${slug}`);
  }
}

export async function createCategory(
  _prev: CategoryActionState,
  formData: FormData,
): Promise<CategoryActionState> {
  const { profile, allowed } = await requireStaffProfile();
  if (!profile || !allowed) {
    return { error: "Staff access required." };
  }

  const parsed = parsePayload(formData);
  if ("error" in parsed) {
    return { error: parsed.error };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("categories").insert({
    ...parsed.payload,
    created_by: profile.id,
    updated_by: profile.id,
  });

  if (error) {
    return { error: error.message };
  }

  revalidateCategoryPaths(parsed.payload.slug);
  redirect("/admin/categories?created=1");
}

export async function updateCategory(
  id: string,
  _prev: CategoryActionState,
  formData: FormData,
): Promise<CategoryActionState> {
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
    .from("categories")
    .update({
      ...parsed.payload,
      updated_by: profile.id,
    })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidateCategoryPaths(parsed.payload.slug);
  redirect(`/admin/categories?updated=1`);
}

export async function archiveCategory(id: string): Promise<CategoryActionState> {
  const { profile, allowed } = await requireStaffProfile();
  if (!profile || !allowed) {
    return { error: "Staff access required." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .update({
      status: "archived",
      updated_by: profile.id,
    })
    .eq("id", id)
    .select("slug")
    .maybeSingle();

  if (error) {
    return { error: error.message };
  }

  revalidateCategoryPaths(data?.slug);
  redirect("/admin/categories?archived=1");
}
