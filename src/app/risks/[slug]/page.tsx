import { PageShell } from "@/components/PageShell";
import { RiskBadge, ScamRiskBadge } from "@/components/ui/Badge";
import { WarningBox } from "@/components/ui/WarningBox";
import { getPublishedRiskWarnings } from "@/lib/data/public-content";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function RiskDetailPage({ params }: Props) {
  const { slug } = await params;
  const { items } = await getPublishedRiskWarnings();
  const warning = items.find((item) => item.href === `/risks/${slug}`);

  if (!warning) {
    notFound();
  }

  return (
    <PageShell title={warning.title} description={warning.summary}>
      <div className="mb-6 flex flex-wrap gap-2">
        <RiskBadge level={warning.riskLevel} />
        <ScamRiskBadge level={warning.scamRisk} />
      </div>
      <WarningBox variant="danger" title="Educational warning">
        This page explains a common risk pattern. It is not personalized advice. Slug: {slug}
      </WarningBox>
    </PageShell>
  );
}
