import { PageShell } from "@/components/PageShell";
import { RiskWarningCard } from "@/components/cards/RiskWarningCard";
import { WarningBox } from "@/components/ui/WarningBox";
import { getPublishedRiskWarnings } from "@/lib/data/public-content";

export const metadata = {
  title: "Risk Warnings",
};

export default async function RisksPage() {
  const { source, items } = await getPublishedRiskWarnings();

  return (
    <PageShell
      title="Risk & Scam Warnings"
      description="Foundational risk warnings. Live rows load from Supabase when configured."
    >
      <div className="mb-6 space-y-4">
        <WarningBox variant="danger" title="Stay skeptical">
          If someone promises guaranteed returns, pressure you to pay urgently, or blocks questions —
          walk away and verify independently.
        </WarningBox>
        {source === "demo" ? (
          <WarningBox variant="info" title="Using demo data">
            Connect Supabase and apply migrations to load published risk warning records.
          </WarningBox>
        ) : null}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {items.map((item) => (
          <RiskWarningCard key={item.title} {...item} />
        ))}
      </div>
    </PageShell>
  );
}
