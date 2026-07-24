import { PageShell } from "@/components/PageShell";
import { CountryAvailabilityBadge } from "@/components/ui/Badge";
import { WarningBox } from "@/components/ui/WarningBox";
import { getPublishedCountries } from "@/lib/data/public-content";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function CountryDetailPage({ params }: Props) {
  const { slug } = await params;
  const { items } = await getPublishedCountries();
  const country = items.find((item) => item.href === `/countries/${slug}`);

  if (!country) {
    notFound();
  }

  return (
    <PageShell title={country.name} description={country.summary}>
      <div className="mb-6">
        <CountryAvailabilityBadge status={country.status} />
      </div>
      <WarningBox variant="caution" title="Verify locally">
        Country guidance is educational and can change. Always confirm tax, platform, and regulatory
        details with official sources. Slug: {slug}
      </WarningBox>
    </PageShell>
  );
}
