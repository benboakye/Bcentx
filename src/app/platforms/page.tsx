import { PageShell } from "@/components/PageShell";
import { PlatformCard } from "@/components/cards/PlatformCard";
import { AffiliateDisclosureBox, WarningBox } from "@/components/ui/WarningBox";
import { getPublishedPlatforms } from "@/lib/data/public-content";

export const metadata = {
  title: "Platforms & Tools",
};

export default async function PlatformsPage() {
  const { source, items } = await getPublishedPlatforms();

  return (
    <PageShell
      title="Platforms & Tools"
      description="Compare tools with fees, restrictions, and verification dates. Always confirm current terms yourself."
    >
      <div className="mb-6 space-y-4">
        <AffiliateDisclosureBox />
        {source === "demo" ? (
          <WarningBox variant="info" title="Using demo data">
            Publish platforms in Admin to replace these placeholder examples.
          </WarningBox>
        ) : null}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {items.map((item) => (
          <PlatformCard key={item.title} {...item} />
        ))}
      </div>
    </PageShell>
  );
}
