"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireStaffProfile } from "@/lib/auth";
import { slugify } from "@/lib/admin/slug";
import { createClient } from "@/lib/supabase/server";
import type { ContentStatus } from "@/types/database";

export type PlatformActionState = {
  error?: string;
};

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

function parsePayload(formData: FormData) {
  const name = readString(formData, "name");
  const slugInput = readString(formData, "slug");
  const platformType = readString(formData, "platform_type");
  const summary = readString(formData, "summary");
  const status = readString(formData, "status") as ContentStatus;
  const trustRaw = readString(formData, "trust_rating");

  if (!name || !platformType || !summary) {
    return { error: "Name, platform type, and summary are required." } as const;
  }
  if (!CONTENT_STATUSES.includes(status)) {
    return { error: "Choose a valid status." } as const;
  }

  let trustRating: number | null = null;
  if (trustRaw) {
    const parsed = Number.parseFloat(trustRaw);
    if (!Number.isFinite(parsed) || parsed < 0 || parsed > 100) {
      return { error: "Trust rating must be between 0 and 100." } as const;
    }
    trustRating = Math.round(parsed * 100) / 100;
  }

  const slug = slugify(slugInput || name);
  if (!slug) {
    return { error: "Slug could not be generated from the name." } as const;
  }

  return {
    payload: {
      name,
      slug,
      website_url: readOptional(formData, "website_url"),
      platform_type: platformType,
      summary,
      description: readOptional(formData, "description"),
      pricing_summary: readOptional(formData, "pricing_summary"),
      fee_notes: readOptional(formData, "fee_notes"),
      country_restrictions: readOptional(formData, "country_restrictions"),
      payout_methods: readOptional(formData, "payout_methods"),
      risk_notes: readOptional(formData, "risk_notes"),
      trust_rating: trustRating,
      has_affiliate_program: formData.get("has_affiliate_program") === "on",
      status,
      seo_title: readOptional(formData, "seo_title"),
      seo_description: readOptional(formData, "seo_description"),
      last_verified_at: readOptional(formData, "last_verified_at"),
    },
  } as const;
}

function revalidatePlatformPaths(slug?: string) {
  revalidatePath("/admin/platforms");
  revalidatePath("/admin");
  revalidatePath("/platforms");
  revalidatePath("/");
  if (slug) {
    revalidatePath(`/platforms/${slug}`);
  }
}

export async function createPlatform(
  _prev: PlatformActionState,
  formData: FormData,
): Promise<PlatformActionState> {
  const { profile, allowed } = await requireStaffProfile();
  if (!profile || !allowed) {
    return { error: "Staff access required." };
  }

  const parsed = parsePayload(formData);
  if ("error" in parsed) {
    return { error: parsed.error };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("platforms").insert({
    ...parsed.payload,
    created_by: profile.id,
    updated_by: profile.id,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePlatformPaths(parsed.payload.slug);
  redirect("/admin/platforms?created=1");
}

export async function updatePlatform(
  id: string,
  _prev: PlatformActionState,
  formData: FormData,
): Promise<PlatformActionState> {
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
    .from("platforms")
    .update({
      ...parsed.payload,
      updated_by: profile.id,
    })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePlatformPaths(parsed.payload.slug);
  redirect("/admin/platforms?updated=1");
}

export async function archivePlatform(id: string): Promise<PlatformActionState> {
  const { profile, allowed } = await requireStaffProfile();
  if (!profile || !allowed) {
    return { error: "Staff access required." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("platforms")
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

  revalidatePlatformPaths(data?.slug);
  redirect("/admin/platforms?archived=1");
}
