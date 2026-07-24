"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireStaffProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import type { AvailabilityStatus } from "@/types/database";

export type AvailabilityActionState = {
  error?: string;
};

const STATUSES: AvailabilityStatus[] = [
  "available",
  "limited",
  "unavailable",
  "unknown",
  "verify",
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
  const countryId = readString(formData, "country_id");
  const opportunityId = readOptional(formData, "opportunity_id");
  const platformId = readOptional(formData, "platform_id");
  const status = readString(formData, "availability_status") as AvailabilityStatus;

  if (!countryId) {
    return { error: "Country is required." } as const;
  }
  if (!opportunityId && !platformId) {
    return { error: "Select an opportunity and/or a platform." } as const;
  }
  if (!STATUSES.includes(status)) {
    return { error: "Choose a valid availability status." } as const;
  }

  return {
    payload: {
      country_id: countryId,
      opportunity_id: opportunityId,
      platform_id: platformId,
      availability_status: status,
      notes: readOptional(formData, "notes"),
      official_source_url: readOptional(formData, "official_source_url"),
      last_verified_at: readOptional(formData, "last_verified_at"),
    },
  } as const;
}

function revalidateAvailabilityPaths() {
  revalidatePath("/admin/availability");
  revalidatePath("/admin");
  revalidatePath("/countries");
  revalidatePath("/platforms");
  revalidatePath("/opportunities");
}

export async function createCountryAvailability(
  _prev: AvailabilityActionState,
  formData: FormData,
): Promise<AvailabilityActionState> {
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
    .from("country_availability")
    .insert(parsed.payload);

  if (error) {
    return { error: error.message };
  }

  revalidateAvailabilityPaths();
  redirect("/admin/availability?created=1");
}

export async function updateCountryAvailability(
  id: string,
  _prev: AvailabilityActionState,
  formData: FormData,
): Promise<AvailabilityActionState> {
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
    .from("country_availability")
    .update(parsed.payload)
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidateAvailabilityPaths();
  redirect("/admin/availability?updated=1");
}

export async function deleteCountryAvailability(
  id: string,
): Promise<AvailabilityActionState> {
  const { profile, allowed } = await requireStaffProfile();
  if (!profile || !allowed) {
    return { error: "Staff access required." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("country_availability")
    .delete()
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidateAvailabilityPaths();
  redirect("/admin/availability?deleted=1");
}
