import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { CountryAvailabilityBadge } from "@/components/ui/Badge";
import {
  AffiliateDisclosureBox,
  LastVerifiedDate,
  WarningBox,
} from "@/components/ui/WarningBox";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import type { PlatformRow } from "@/types/database";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const platform = await getPlatformBySlug(slug);
  return {
    title: platform?.name ?? "Platform",
  };
}

async function getPlatformBySlug(slug: string): Promise<PlatformRow | null> {
  if (!hasSupabaseEnv()) {
    return null;
  }

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("platforms")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();
    return (data as PlatformRow | null) ?? null;
  } catch {
    return null;
  }
}

export default async function PlatformDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const platform = await getPlatformBySlug(slug);

  if (!platform) {
    notFound();
  }

  return (
    <PageShell title={platform.name} description={platform.summary}>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <CountryAvailabilityBadge status="verify" />
        <span className="rounded-full bg-bcentx-blue-soft px-2.5 py-0.5 text-xs font-semibold capitalize text-bcentx-blue">
          {platform.platform_type}
        </span>
        {platform.last_verified_at ? (
          <LastVerifiedDate date={platform.last_verified_at} />
        ) : null}
      </div>

      <div className="mb-6 space-y-4">
        <WarningBox variant="caution" title="Verify before you act">
          Platform terms, fees, and country availability change. Confirm details on the
          official site.
        </WarningBox>
        {platform.has_affiliate_program ? <AffiliateDisclosureBox /> : null}
      </div>

      <div className="space-y-6 text-sm leading-relaxed text-foreground/85">
        {platform.website_url ? (
          <p>
            Official site:{" "}
            <a href={platform.website_url} target="_blank" rel="noopener noreferrer">
              {platform.website_url}
            </a>
          </p>
        ) : null}
        {platform.description ? (
          <section>
            <h2 className="text-lg font-semibold text-bcentx-blue">Overview</h2>
            <p className="mt-2 whitespace-pre-wrap">{platform.description}</p>
          </section>
        ) : null}
        {platform.pricing_summary ? (
          <section>
            <h2 className="text-lg font-semibold text-bcentx-blue">Pricing</h2>
            <p className="mt-2 whitespace-pre-wrap">{platform.pricing_summary}</p>
          </section>
        ) : null}
        {platform.fee_notes ? (
          <section>
            <h2 className="text-lg font-semibold text-bcentx-blue">Fees</h2>
            <p className="mt-2 whitespace-pre-wrap">{platform.fee_notes}</p>
          </section>
        ) : null}
        {platform.country_restrictions ? (
          <section>
            <h2 className="text-lg font-semibold text-bcentx-blue">Country restrictions</h2>
            <p className="mt-2 whitespace-pre-wrap">{platform.country_restrictions}</p>
          </section>
        ) : null}
        {platform.payout_methods ? (
          <section>
            <h2 className="text-lg font-semibold text-bcentx-blue">Payout methods</h2>
            <p className="mt-2 whitespace-pre-wrap">{platform.payout_methods}</p>
          </section>
        ) : null}
        {platform.risk_notes ? (
          <section>
            <h2 className="text-lg font-semibold text-bcentx-blue">Risk notes</h2>
            <p className="mt-2 whitespace-pre-wrap">{platform.risk_notes}</p>
          </section>
        ) : null}
      </div>
    </PageShell>
  );
}
