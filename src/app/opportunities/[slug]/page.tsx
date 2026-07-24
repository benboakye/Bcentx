import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import {
  RiskBadge,
  ScoreBadge,
  ScamRiskBadge,
  SkillLevelBadge,
  StartupCostBadge,
} from "@/components/ui/Badge";
import { WarningBox } from "@/components/ui/WarningBox";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import type { OpportunityRow } from "@/types/database";
import type { SkillLevel, StartupCostLevel } from "@/lib/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const opportunity = await getOpportunityBySlug(slug);
  return {
    title: opportunity?.name ?? "Opportunity",
  };
}

async function getOpportunityBySlug(slug: string): Promise<OpportunityRow | null> {
  if (!hasSupabaseEnv()) {
    return null;
  }

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("opportunities")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();
    return (data as OpportunityRow | null) ?? null;
  } catch {
    return null;
  }
}

export default async function OpportunityDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const opportunity = await getOpportunityBySlug(slug);

  if (!opportunity) {
    notFound();
  }

  return (
    <PageShell title={opportunity.name} description={opportunity.summary}>
      <div className="mb-6 flex flex-wrap gap-2">
        {opportunity.bcentx_score != null ? (
          <ScoreBadge score={Math.round(Number(opportunity.bcentx_score))} />
        ) : null}
        <RiskBadge level={opportunity.risk_level} />
        <ScamRiskBadge level={opportunity.scam_risk_level} />
        <SkillLevelBadge level={opportunity.skill_required_level as SkillLevel} />
        <StartupCostBadge
          level={opportunity.startup_cost_level as StartupCostLevel}
        />
      </div>

      <WarningBox variant="caution" title="Not personalized advice">
        This page is educational. It is not financial, legal, or tax advice, and it does
        not guarantee income.
      </WarningBox>

      {opportunity.required_disclaimer ? (
        <div className="mt-4">
          <WarningBox variant="info" title="Disclaimer">
            {opportunity.required_disclaimer}
          </WarningBox>
        </div>
      ) : null}

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-foreground/85">
        {opportunity.description ? (
          <section>
            <h2 className="text-lg font-semibold text-bcentx-blue">Overview</h2>
            <p className="mt-2 whitespace-pre-wrap">{opportunity.description}</p>
          </section>
        ) : null}
        {opportunity.how_money_is_made ? (
          <section>
            <h2 className="text-lg font-semibold text-bcentx-blue">How money is made</h2>
            <p className="mt-2 whitespace-pre-wrap">{opportunity.how_money_is_made}</p>
          </section>
        ) : null}
        {opportunity.how_money_is_lost ? (
          <section>
            <h2 className="text-lg font-semibold text-bcentx-blue">How money can be lost</h2>
            <p className="mt-2 whitespace-pre-wrap">{opportunity.how_money_is_lost}</p>
          </section>
        ) : null}
        {opportunity.best_for ? (
          <section>
            <h2 className="text-lg font-semibold text-bcentx-blue">Best for</h2>
            <p className="mt-2 whitespace-pre-wrap">{opportunity.best_for}</p>
          </section>
        ) : null}
        {opportunity.not_suitable_for ? (
          <section>
            <h2 className="text-lg font-semibold text-bcentx-blue">Not suitable for</h2>
            <p className="mt-2 whitespace-pre-wrap">{opportunity.not_suitable_for}</p>
          </section>
        ) : null}
        {opportunity.editorial_verdict ? (
          <section>
            <h2 className="text-lg font-semibold text-bcentx-blue">Editorial verdict</h2>
            <p className="mt-2 whitespace-pre-wrap">{opportunity.editorial_verdict}</p>
          </section>
        ) : null}
      </div>
    </PageShell>
  );
}
