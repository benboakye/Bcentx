import { CardLink } from "@/components/ui/Card";
import { SkillLevelBadge } from "@/components/ui/Badge";
import type { SkillLevel } from "@/lib/types";

export function RoadmapCard({
  href,
  title,
  summary,
  skillLevel,
  steps,
}: {
  href: string;
  title: string;
  summary: string;
  skillLevel: SkillLevel;
  steps: number;
}) {
  return (
    <CardLink href={href}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="text-lg font-semibold text-bcentx-blue">{title}</h3>
        <SkillLevelBadge level={skillLevel} />
      </div>
      <p className="mt-2 text-sm leading-relaxed text-foreground/80">{summary}</p>
      <p className="mt-4 text-xs font-medium text-bcentx-gray">{steps} guided steps</p>
    </CardLink>
  );
}
