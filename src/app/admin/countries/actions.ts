"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireStaffProfile } from "@/lib/auth";
import { slugify } from "@/lib/admin/slug";
import { createClient } from "@/lib/supabase/server";
import type { ContentStatus } from "@/types/database";

export type CountryActionState = {
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
  const isoCode = readString(formData, "iso_code").toUpperCase();
  const slugInput = readString(formData, "slug");
  const status = readString(formData, "status") as ContentStatus;

  if (!name || !isoCode) {
    return { error: "Name and ISO code are required." } as const;
  }
  if (isoCode.length < 2 || isoCode.length > 3) {
    return { error: "ISO code should be 2–3 letters (e.g. GH, CA)." } as const;
  }
  if (!CONTENT_STATUSES.includes(status)) {
    return { error: "Choose a valid status." } as const;
  }

  const slug = slugify(slugInput || name);
  if (!slug) {
    return { error: "Slug could not be generated from the name." } as const;
  }

  return {
    payload: {
      name,
      iso_code: isoCode,
      slug,
      region: readOptional(formData, "region"),
      currency_code: readOptional(formData, "currency_code")?.toUpperCase() ?? null,
      summary: readOptional(formData, "summary"),
      payment_notes: readOptional(formData, "payment_notes"),
      tax_notes: readOptional(formData, "tax_notes"),
      regulator_notes: readOptional(formData, "regulator_notes"),
      risk_notes: readOptional(formData, "risk_notes"),
      status,
      seo_title: readOptional(formData, "seo_title"),
      seo_description: readOptional(formData, "seo_description"),
      last_verified_at: readOptional(formData, "last_verified_at"),
    },
  } as const;
}

function revalidateCountryPaths(slug?: string) {
  revalidatePath("/admin/countries");
  revalidatePath("/admin");
  revalidatePath("/countries");
  revalidatePath("/");
  if (slug) {
    revalidatePath(`/countries/${slug}`);
  }
}

export async function createCountry(
  _prev: CountryActionState,
  formData: FormData,
): Promise<CountryActionState> {
  const { profile, allowed } = await requireStaffProfile();
  if (!profile || !allowed) {
    return { error: "Staff access required." };
  }

  const parsed = parsePayload(formData);
  if ("error" in parsed) {
    return { error: parsed.error };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("countries").insert(parsed.payload);

  if (error) {
    return { error: error.message };
  }

  revalidateCountryPaths(parsed.payload.slug);
  redirect("/admin/countries?created=1");
}

export async function updateCountry(
  id: string,
  _prev: CountryActionState,
  formData: FormData,
): Promise<CountryActionState> {
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
    .from("countries")
    .update(parsed.payload)
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidateCountryPaths(parsed.payload.slug);
  redirect("/admin/countries?updated=1");
}

export async function archiveCountry(id: string): Promise<CountryActionState> {
  const { profile, allowed } = await requireStaffProfile();
  if (!profile || !allowed) {
    return { error: "Staff access required." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("countries")
    .update({ status: "archived" })
    .eq("id", id)
    .select("slug")
    .maybeSingle();

  if (error) {
    return { error: error.message };
  }

  revalidateCountryPaths(data?.slug);
  redirect("/admin/countries?archived=1");
}
