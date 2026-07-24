"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireStaffProfile } from "@/lib/auth";
import { slugify } from "@/lib/admin/slug";
import { createClient } from "@/lib/supabase/server";
import type {
  ContentStatus,
  LevelScale,
  LiquidityLevel,
  RiskLevel,
  SkillLevel,
  TimeToIncome,
} from "@/types/database";

export type OpportunityActionState = {
  error?: string;
  success?: string;
};

const LEVEL_SCALES: LevelScale[] = ["none", "low", "medium", "high", "very_high"];
const SKILL_LEVELS: SkillLevel[] = ["low", "medium", "high", "expert"];
const RISK_LEVELS: RiskLevel[] = [
  "low",
  "medium",
  "high",
  "very_high",
  "critical",
];
const TIME_TO_INCOME: TimeToIncome[] = [
  "immediate",
  "short_term",
  "medium_term",
  "long_term",
  "uncertain",
];
const LIQUIDITY_LEVELS: LiquidityLevel[] = [
  "high",
  "medium",
  "low",
  "very_low",
  "not_applicable",
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

function includes<T extends string>(list: T[], value: string): value is T {
  return list.includes(value as T);
}

function parsePayload(formData: FormData) {
  const categoryId = readString(formData, "category_id");
  const name = readString(formData, "name");
  const slugInput = readString(formData, "slug");
  const summary = readString(formData, "summary");
  const startupCost = readString(formData, "startup_cost_level");
  const capital = readString(formData, "capital_required_level");
  const skill = readString(formData, "skill_required_level");
  const timeToIncome = readString(formData, "time_to_income");
  const scalability = readString(formData, "scalability");
  const riskLevel = readString(formData, "risk_level");
  const scamRisk = readString(formData, "scam_risk_level");
  const liquidity = readString(formData, "liquidity_level");
  const status = readString(formData, "status");
  const scoreRaw = readString(formData, "bcentx_score");

  if (!categoryId || !name || !summary) {
    return { error: "Category, name, and summary are required." } as const;
  }
  if (!includes(LEVEL_SCALES, startupCost) || !includes(LEVEL_SCALES, capital)) {
    return { error: "Choose valid cost levels." } as const;
  }
  if (!includes(SKILL_LEVELS, skill)) {
    return { error: "Choose a valid skill level." } as const;
  }
  if (!includes(TIME_TO_INCOME, timeToIncome)) {
    return { error: "Choose a valid time-to-income value." } as const;
  }
  if (!includes(LEVEL_SCALES, scalability)) {
    return { error: "Choose a valid scalability level." } as const;
  }
  if (!includes(RISK_LEVELS, riskLevel) || !includes(RISK_LEVELS, scamRisk)) {
    return { error: "Choose valid risk levels." } as const;
  }
  if (!includes(LIQUIDITY_LEVELS, liquidity)) {
    return { error: "Choose a valid liquidity level." } as const;
  }
  if (!includes(CONTENT_STATUSES, status)) {
    return { error: "Choose a valid status." } as const;
  }

  let bcentxScore: number | null = null;
  if (scoreRaw) {
    const parsed = Number.parseFloat(scoreRaw);
    if (!Number.isFinite(parsed) || parsed < 0 || parsed > 100) {
      return { error: "Bcentx score must be between 0 and 100." } as const;
    }
    bcentxScore = Math.round(parsed * 100) / 100;
  }

  const slug = slugify(slugInput || name);
  if (!slug) {
    return { error: "Slug could not be generated from the name." } as const;
  }

  return {
    payload: {
      category_id: categoryId,
      name,
      slug,
      summary,
      description: readOptional(formData, "description"),
      how_money_is_made: readOptional(formData, "how_money_is_made"),
      how_money_is_lost: readOptional(formData, "how_money_is_lost"),
      best_for: readOptional(formData, "best_for"),
      not_suitable_for: readOptional(formData, "not_suitable_for"),
      startup_cost_level: startupCost,
      capital_required_level: capital,
      skill_required_level: skill,
      time_to_income: timeToIncome,
      scalability,
      risk_level: riskLevel,
      scam_risk_level: scamRisk,
      liquidity_level: liquidity,
      beginner_friendly: formData.get("beginner_friendly") === "on",
      estimated_time_horizon: readOptional(formData, "estimated_time_horizon"),
      bcentx_score: bcentxScore,
      editorial_verdict: readOptional(formData, "editorial_verdict"),
      required_disclaimer: readOptional(formData, "required_disclaimer"),
      status,
      seo_title: readOptional(formData, "seo_title"),
      seo_description: readOptional(formData, "seo_description"),
      canonical_url: readOptional(formData, "canonical_url"),
      last_verified_at: readOptional(formData, "last_verified_at"),
    },
  } as const;
}

function revalidateOpportunityPaths(slug?: string) {
  revalidatePath("/admin/opportunities");
  revalidatePath("/admin");
  revalidatePath("/opportunities");
  revalidatePath("/");
  if (slug) {
    revalidatePath(`/opportunities/${slug}`);
  }
}

export async function createOpportunity(
  _prev: OpportunityActionState,
  formData: FormData,
): Promise<OpportunityActionState> {
  const { profile, allowed } = await requireStaffProfile();
  if (!profile || !allowed) {
    return { error: "Staff access required." };
  }

  const parsed = parsePayload(formData);
  if ("error" in parsed) {
    return { error: parsed.error };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("opportunities").insert({
    ...parsed.payload,
    created_by: profile.id,
    updated_by: profile.id,
  });

  if (error) {
    return { error: error.message };
  }

  revalidateOpportunityPaths(parsed.payload.slug);
  redirect("/admin/opportunities?created=1");
}

export async function updateOpportunity(
  id: string,
  _prev: OpportunityActionState,
  formData: FormData,
): Promise<OpportunityActionState> {
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
    .from("opportunities")
    .update({
      ...parsed.payload,
      updated_by: profile.id,
    })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidateOpportunityPaths(parsed.payload.slug);
  redirect("/admin/opportunities?updated=1");
}

export async function archiveOpportunity(
  id: string,
): Promise<OpportunityActionState> {
  const { profile, allowed } = await requireStaffProfile();
  if (!profile || !allowed) {
    return { error: "Staff access required." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("opportunities")
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

  revalidateOpportunityPaths(data?.slug);
  redirect("/admin/opportunities?archived=1");
}
