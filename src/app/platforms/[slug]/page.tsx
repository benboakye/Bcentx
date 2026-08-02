import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { CountryAvailabilityBadge } from "@/components/ui/Badge";
import {
  AffiliateDisclosureBox,
  LastVerifiedDate,
  WarningBox,
} from "@/components/ui/WarningBox";
import { listPublishedAffiliateProgramsForPlatform } from "@/lib/admin/affiliate-programs";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import type { AffiliateProgramRow, PlatformRow } from "@/types/database";

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

  let affiliates: AffiliateProgramRow[] = [];
  try {
    affiliates = await listPublishedAffiliateProgramsForPlatform(platform.id);
  } catch {
    affiliates = [];
  }

  const showAffiliateDisclosure =
    platform.has_affiliate_program || affiliates.length > 0;

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
        {showAffiliateDisclosure ? <AffiliateDisclosureBox /> : null}
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

        {affiliates.length > 0 ? (
          <section className="rounded-xl border border-bcentx-blue/10 bg-[#f7fbff] p-5">
            <h2 className="text-lg font-semibold text-bcentx-blue">
              Affiliate programs
            </h2>
            <p className="mt-2 text-sm text-bcentx-gray">
              Some links below may be affiliate links. Commission never changes Bcentx
              editorial scores.
            </p>
            <ul className="mt-4 space-y-4">
              {affiliates.map((program) => (
                <li
                  key={program.id}
                  className="rounded-lg border border-bcentx-blue/10 bg-white p-4"
                >
                  <p className="font-semibold text-bcentx-blue">{program.program_name}</p>
                  <p className="mt-1 text-xs capitalize text-bcentx-gray">
                    Commission type: {program.commission_type.replaceAll("_", " ")}
                  </p>
                  {program.last_verified_at ? (
                    <div className="mt-2">
                      <LastVerifiedDate date={program.last_verified_at} />
                    </div>
                  ) : null}
                  {program.commission_details ? (
                    <p className="mt-2 whitespace-pre-wrap text-sm text-foreground/80">
                      {program.commission_details}
                    </p>
                  ) : null}
                  {program.cookie_duration ? (
                    <p className="mt-2 text-sm text-foreground/80">
                      <strong>Cookie duration:</strong> {program.cookie_duration}
                    </p>
                  ) : null}
                  {program.country_restrictions ? (
                    <p className="mt-2 whitespace-pre-wrap text-sm text-foreground/80">
                      <strong>Country restrictions:</strong>{" "}
                      {program.country_restrictions}
                    </p>
                  ) : null}
                  {program.affiliate_url ? (
                    <div className="mt-3">
                      <a
                        href={program.affiliate_url}
                        target="_blank"
                        rel="sponsored nofollow noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-md border border-bcentx-blue/20 bg-card px-3 py-1.5 text-sm font-semibold text-bcentx-blue no-underline transition-colors hover:bg-bcentx-blue-soft"
                      >
                        Visit program (affiliate link)
                      </a>
                      <p className="mt-2 text-xs text-bcentx-gray">
                        Affiliate disclosure applies. Always do your own research.
                      </p>
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </PageShell>
  );
}
