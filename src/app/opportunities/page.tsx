import { PageShell } from "@/components/PageShell";
import { OpportunityCard } from "@/components/cards/OpportunityCard";
import { WarningBox } from "@/components/ui/WarningBox";
import { getPublishedOpportunities } from "@/lib/data/public-content";

export const metadata = {
  title: "Opportunities",
};

export default async function OpportunitiesPage() {
  const { source, items } = await getPublishedOpportunities();

  return (
    <PageShell
      title="Opportunities"
      description="Compare wealth-building paths with scores, skill needs, and risk labels. High scores never mean guaranteed income."
    >
      <div className="mb-6 space-y-4">
        <WarningBox variant="caution">
          Educational comparison only. Results depend on skill, capital, timing, and risk —
          never treat a Bcentx score as a promise of returns.
        </WarningBox>
        {source === "demo" ? (
          <WarningBox variant="info" title="Using demo data">
            Publish opportunities in Admin to replace these placeholder examples.
          </WarningBox>
        ) : null}
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        {items.map((item) => (
          <OpportunityCard key={item.title} {...item} />
        ))}
      </div>
    </PageShell>
  );
}
