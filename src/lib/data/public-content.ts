import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import type {
  CategoryRow,
  CountryRow,
  OpportunityRow,
  PlatformRow,
  RiskWarningRow,
} from "@/types/database";
import {
  demoCategories,
  demoCountries,
  demoOpportunities,
  demoPlatforms,
  demoRisks,
} from "@/lib/demo-content";
import type { AvailabilityStatus, SkillLevel, StartupCostLevel } from "@/lib/types";

export type DataSource = "supabase" | "demo";

export async function getPublishedCategories(): Promise<{
  source: DataSource;
  items: {
    href: string;
    title: string;
    summary: string;
    riskLevel: CategoryRow["risk_level"];
  }[];
}> {
  if (!hasSupabaseEnv()) {
    return { source: "demo", items: demoCategories };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("categories")
      .select("name, slug, summary, risk_level, display_order")
      .eq("status", "published")
      .order("display_order", { ascending: true });

    if (error || !data?.length) {
      return { source: "demo", items: demoCategories };
    }

    return {
      source: "supabase",
      items: data.map((row) => ({
        href: `/categories/${row.slug}`,
        title: row.name,
        summary: row.summary,
        riskLevel: row.risk_level,
      })),
    };
  } catch {
    return { source: "demo", items: demoCategories };
  }
}

export async function getPublishedCountries(): Promise<{
  source: DataSource;
  items: {
    href: string;
    name: string;
    summary: string;
    status: "available" | "verify" | "limited" | "unavailable" | "unknown";
  }[];
}> {
  if (!hasSupabaseEnv()) {
    return { source: "demo", items: demoCountries };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("countries")
      .select("name, slug, summary")
      .eq("status", "published")
      .order("name", { ascending: true });

    if (error || !data?.length) {
      return { source: "demo", items: demoCountries };
    }

    return {
      source: "supabase",
      items: (data as CountryRow[]).map((row) => ({
        href: `/countries/${row.slug}`,
        name: row.name,
        summary: row.summary ?? "",
        status: "available" as const,
      })),
    };
  } catch {
    return { source: "demo", items: demoCountries };
  }
}

export async function getPublishedRiskWarnings(): Promise<{
  source: DataSource;
  items: {
    href: string;
    title: string;
    summary: string;
    riskLevel: RiskWarningRow["severity"];
    scamRisk: RiskWarningRow["severity"];
  }[];
}> {
  if (!hasSupabaseEnv()) {
    return { source: "demo", items: demoRisks };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("risk_warnings")
      .select("title, slug, description, severity, warning_type")
      .eq("status", "published")
      .order("severity", { ascending: false });

    if (error || !data?.length) {
      return { source: "demo", items: demoRisks };
    }

    return {
      source: "supabase",
      items: data.map((row) => ({
        href: `/risks/${row.slug}`,
        title: row.title,
        summary: row.description,
        riskLevel: row.severity,
        scamRisk: row.warning_type === "scam" ? row.severity : "medium",
      })),
    };
  } catch {
    return { source: "demo", items: demoRisks };
  }
}

export async function getPublishedOpportunities(): Promise<{
  source: DataSource;
  items: {
    href: string;
    title: string;
    summary: string;
    score: number;
    riskLevel: OpportunityRow["risk_level"];
    skillLevel: SkillLevel;
    startupCost: StartupCostLevel;
  }[];
}> {
  if (!hasSupabaseEnv()) {
    return { source: "demo", items: demoOpportunities };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("opportunities")
      .select(
        "name, slug, summary, bcentx_score, risk_level, skill_required_level, startup_cost_level",
      )
      .eq("status", "published")
      .order("bcentx_score", { ascending: false });

    if (error || !data?.length) {
      return { source: "demo", items: demoOpportunities };
    }

    return {
      source: "supabase",
      items: data.map((row) => ({
        href: `/opportunities/${row.slug}`,
        title: row.name,
        summary: row.summary,
        score: Math.round(Number(row.bcentx_score ?? 0)),
        riskLevel: row.risk_level,
        skillLevel: row.skill_required_level as SkillLevel,
        startupCost: row.startup_cost_level as StartupCostLevel,
      })),
    };
  } catch {
    return { source: "demo", items: demoOpportunities };
  }
}

export async function getPublishedPlatforms(): Promise<{
  source: DataSource;
  items: {
    href: string;
    title: string;
    summary: string;
    availability: AvailabilityStatus;
    lastVerified: string;
  }[];
}> {
  if (!hasSupabaseEnv()) {
    return { source: "demo", items: demoPlatforms };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("platforms")
      .select("name, slug, summary, last_verified_at, has_affiliate_program")
      .eq("status", "published")
      .order("name", { ascending: true });

    if (error || !data?.length) {
      return { source: "demo", items: demoPlatforms };
    }

    return {
      source: "supabase",
      items: (data as Pick<
        PlatformRow,
        "name" | "slug" | "summary" | "last_verified_at" | "has_affiliate_program"
      >[]).map((row) => ({
        href: `/platforms/${row.slug}`,
        title: row.name,
        summary: row.summary,
        availability: "verify" as const,
        lastVerified: row.last_verified_at ?? "Not verified",
      })),
    };
  } catch {
    return { source: "demo", items: demoPlatforms };
  }
}
