import { CardLink } from "@/components/ui/Card";
import { RiskBadge, ScamRiskBadge } from "@/components/ui/Badge";
import type { RiskLevel } from "@/lib/types";

export function RiskWarningCard({
  href,
  title,
  summary,
  riskLevel,
  scamRisk,
}: {
  href: string;
  title: string;
  summary: string;
  riskLevel: RiskLevel;
  scamRisk: RiskLevel;
}) {
  return (
    <CardLink href={href}>
      <h3 className="text-lg font-semibold text-bcentx-blue">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-foreground/80">{summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <RiskBadge level={riskLevel} />
        <ScamRiskBadge level={scamRisk} />
      </div>
    </CardLink>
  );
}
