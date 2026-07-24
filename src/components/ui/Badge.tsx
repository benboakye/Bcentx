import type { ReactNode } from "react";
import type {
  AvailabilityStatus,
  RiskLevel,
  SkillLevel,
  StartupCostLevel,
} from "@/lib/types";
import {
  availabilityLabels,
  riskLabels,
  skillLabels,
  startupCostLabels,
  typicalRiskLabels,
} from "@/lib/types";

type BadgeTone = "neutral" | "green" | "blue" | "amber" | "red";

const toneClasses: Record<BadgeTone, string> = {
  neutral: "bg-bcentx-blue-soft text-bcentx-blue",
  green: "bg-bcentx-green-soft text-bcentx-green-dark",
  blue: "bg-bcentx-blue/10 text-bcentx-blue",
  amber: "bg-risk-amber-soft text-risk-amber",
  red: "bg-risk-red-soft text-risk-red",
};

function Badge({
  children,
  tone = "neutral",
  className = "",
}: {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${toneClasses[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

function riskTone(level: RiskLevel): BadgeTone {
  if (level === "low") return "green";
  if (level === "medium") return "amber";
  return "red";
}

export function RiskBadge({
  level,
  variant = "default",
}: {
  level: RiskLevel;
  variant?: "default" | "typical";
}) {
  const label =
    variant === "typical" ? typicalRiskLabels[level] : riskLabels[level];
  return <Badge tone={riskTone(level)}>{label}</Badge>;
}

export function ScamRiskBadge({ level }: { level: RiskLevel }) {
  return <Badge tone={riskTone(level)}>Scam risk: {riskLabels[level]}</Badge>;
}

export function SkillLevelBadge({ level }: { level: SkillLevel }) {
  return <Badge tone="blue">{skillLabels[level]}</Badge>;
}

export function StartupCostBadge({ level }: { level: StartupCostLevel }) {
  return <Badge tone="neutral">{startupCostLabels[level]}</Badge>;
}

export function CountryAvailabilityBadge({
  status,
}: {
  status: AvailabilityStatus;
}) {
  const tone: BadgeTone =
    status === "available" ? "green" : status === "unavailable" ? "red" : "amber";
  return <Badge tone={tone}>{availabilityLabels[status]}</Badge>;
}

export function ScoreBadge({ score }: { score: number }) {
  const tone: BadgeTone = score >= 70 ? "green" : score >= 40 ? "amber" : "red";
  return <Badge tone={tone}>Bcentx score: {score}</Badge>;
}

export { Badge };
