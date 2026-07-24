import { PageShell } from "@/components/PageShell";
import { CountryCard } from "@/components/cards/CountryCard";
import { WarningBox } from "@/components/ui/WarningBox";
import { getPublishedCountries } from "@/lib/data/public-content";

export const metadata = {
  title: "Countries",
};

export default async function CountriesPage() {
  const { source, items } = await getPublishedCountries();

  return (
    <PageShell
      title="Country Availability"
      description="Priority country shells. Live country rows load from Supabase when configured."
    >
      {source === "demo" ? (
        <div className="mb-6">
          <WarningBox variant="info" title="Using demo data">
            Connect Supabase and apply migrations to replace placeholders with published country
            records.
          </WarningBox>
        </div>
      ) : null}
      <div className="grid gap-5 sm:grid-cols-2">
        {items.map((item) => (
          <CountryCard key={item.name} {...item} />
        ))}
      </div>
    </PageShell>
  );
}
