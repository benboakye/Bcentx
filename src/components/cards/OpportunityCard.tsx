import { CardLink } from "@/components/ui/Card";
import {
  RiskBadge,
  ScoreBadge,
  SkillLevelBadge,
  StartupCostBadge,
} from "@/components/ui/Badge";
import type { RiskLevel, SkillLevel, StartupCostLevel } from "@/lib/types";

export function OpportunityCard({
  href,
  title,
  summary,
  score,
  riskLevel,
  skillLevel,
  startupCost,
}: {
  href: string;
  title: string;
  summary: string;
  score: number;
  riskLevel: RiskLevel;
  skillLevel: SkillLevel;
  startupCost: StartupCostLevel;
}) {
  return (
    <CardLink href={href}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="text-lg font-semibold text-bcentx-blue">{title}</h3>
        <ScoreBadge score={score} />
      </div>
      <p className="mt-2 text-sm leading-relaxed text-foreground/80">{summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <RiskBadge level={riskLevel} />
        <SkillLevelBadge level={skillLevel} />
        <StartupCostBadge level={startupCost} />
      </div>
    </CardLink>
  );
}
