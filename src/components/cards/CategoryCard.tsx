import Link from "next/link";
import { RiskBadge } from "@/components/ui/Badge";
import type { RiskLevel } from "@/lib/types";

const accentByRisk: Record<
  RiskLevel,
  {
    card: string;
    border: string;
    accent: string;
    hoverAccent: string;
    hoverShadow: string;
  }
> = {
  low: {
    card: "bg-[#f3faf5]",
    border: "border-bcentx-green/25",
    accent: "border-l-bcentx-green",
    hoverAccent: "hover:border-l-bcentx-green-dark",
    hoverShadow: "hover:shadow-[0_10px_28px_rgba(27,20,94,0.12)]",
  },
  medium: {
    card: "bg-[#fffaf0]",
    border: "border-risk-amber/25",
    accent: "border-l-risk-amber",
    hoverAccent: "hover:border-l-[#b45309]",
    hoverShadow: "hover:shadow-[0_10px_28px_rgba(27,20,94,0.12)]",
  },
  high: {
    card: "bg-[#fff5f5]",
    border: "border-risk-red/20",
    accent: "border-l-risk-red",
    hoverAccent: "hover:border-l-[#b91c1c]",
    hoverShadow: "hover:shadow-[0_10px_28px_rgba(27,20,94,0.12)]",
  },
  very_high: {
    card: "bg-[#fff5f5]",
    border: "border-risk-red/25",
    accent: "border-l-risk-red",
    hoverAccent: "hover:border-l-[#b91c1c]",
    hoverShadow: "hover:shadow-[0_10px_28px_rgba(27,20,94,0.12)]",
  },
  critical: {
    card: "bg-[#fff1f1]",
    border: "border-risk-red/30",
    accent: "border-l-risk-red",
    hoverAccent: "hover:border-l-[#991b1b]",
    hoverShadow: "hover:shadow-[0_10px_28px_rgba(27,20,94,0.14)]",
  },
};

export function CategoryCard({
  href,
  title,
  summary,
  riskLevel,
}: {
  href: string;
  title: string;
  summary: string;
  riskLevel: RiskLevel;
}) {
  const accent = accentByRisk[riskLevel];

  return (
    <Link
      href={href}
      className={`group block rounded-xl border border-l-4 p-5 text-inherit no-underline shadow-[0_2px_10px_rgba(27,20,94,0.06)] transition-all duration-200 ease-out hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bcentx-green sm:p-6 ${accent.card} ${accent.border} ${accent.accent} ${accent.hoverAccent} ${accent.hoverShadow}`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-xl font-semibold tracking-tight text-bcentx-blue">
          {title}
        </h3>
        <RiskBadge level={riskLevel} variant="typical" />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-foreground/75">{summary}</p>
      <span className="mt-5 inline-flex items-center text-sm font-semibold text-bcentx-green transition-colors group-hover:text-bcentx-green-dark">
        Explore category
        <span aria-hidden className="ml-1 transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </span>
    </Link>
  );
}
