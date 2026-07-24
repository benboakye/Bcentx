import type { ReactNode } from "react";

type WarningVariant = "info" | "caution" | "danger";

const variantClasses: Record<WarningVariant, string> = {
  info: "border-bcentx-blue/25 border-l-4 border-l-bcentx-blue bg-white text-bcentx-blue shadow-sm",
  caution:
    "border-risk-amber/35 border-l-4 border-l-risk-amber bg-risk-amber-soft text-risk-amber",
  danger: "border-risk-red/35 border-l-4 border-l-risk-red bg-risk-red-soft text-risk-red",
};

const variantLabels: Record<WarningVariant, string> = {
  info: "Good to know",
  caution: "Caution",
  danger: "Risk warning",
};

export function WarningBox({
  variant = "caution",
  title,
  children,
}: {
  variant?: WarningVariant;
  title?: string;
  children: ReactNode;
}) {
  return (
    <aside
      className={`rounded-xl border px-4 py-3 text-sm leading-relaxed ${variantClasses[variant]}`}
      role="note"
    >
      <p className="font-semibold">{title ?? variantLabels[variant]}</p>
      <div className="mt-1 opacity-90">{children}</div>
    </aside>
  );
}

export function AffiliateDisclosureBox() {
  return (
    <WarningBox variant="info" title="Affiliate disclosure">
      Some links may be affiliate links. Affiliate relationships never change Bcentx
      editorial scores or recommendations. Always do your own research.
    </WarningBox>
  );
}

export function LastVerifiedDate({ date }: { date: string }) {
  return (
    <p className="text-xs text-bcentx-gray">
      Last verified: <time dateTime={date}>{date}</time>
    </p>
  );
}
