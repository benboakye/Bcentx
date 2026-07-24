import Link from "next/link";
import { ArchiveCountryButton } from "@/app/admin/countries/archive-button";
import { listAdminCountries } from "@/lib/admin/countries";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { ContentStatus, CountryRow } from "@/types/database";

export const metadata = {
  title: "Admin · Countries",
};

function statusTone(status: ContentStatus) {
  if (status === "published") return "green" as const;
  if (status === "archived" || status === "rejected") return "red" as const;
  if (status === "review" || status === "needs_update") return "amber" as const;
  return "neutral" as const;
}

function statusLabel(status: ContentStatus) {
  return status.replaceAll("_", " ");
}

export default async function AdminCountriesPage({
  searchParams,
}: {
  searchParams: Promise<{
    created?: string;
    updated?: string;
    archived?: string;
  }>;
}) {
  const params = await searchParams;
  let countries: CountryRow[] = [];
  let loadError: string | null = null;

  try {
    countries = await listAdminCountries();
  } catch (err) {
    loadError =
      err instanceof Error ? err.message : "Failed to load countries.";
  }

  const flash =
    params.created === "1"
      ? "Country created."
      : params.updated === "1"
        ? "Country updated."
        : params.archived === "1"
          ? "Country archived."
          : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-bcentx-green-dark">
            <Link href="/admin" className="hover:underline">
              Admin
            </Link>{" "}
            / Countries
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-bcentx-blue">
            Countries
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-bcentx-gray">
            Country context for availability, payments, and local risk notes.
          </p>
        </div>
        <Button href="/admin/countries/new" variant="primary">
          New country
        </Button>
      </div>

      {flash ? (
        <p className="rounded-md bg-bcentx-green-soft px-3 py-2 text-sm text-bcentx-green-dark">
          {flash}
        </p>
      ) : null}

      {loadError ? (
        <p className="rounded-md bg-risk-red-soft px-3 py-2 text-sm text-risk-red" role="alert">
          {loadError}
        </p>
      ) : countries.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-bcentx-blue/20 bg-white px-6 py-10 text-center text-sm text-bcentx-gray">
          No countries yet. Create one or apply the seed SQL.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-bcentx-blue/10 bg-white shadow-[0_4px_20px_rgba(27,20,94,0.06)]">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-bcentx-blue/10 bg-[#f7fbff] text-xs uppercase tracking-wide text-bcentx-gray">
              <tr>
                <th className="px-4 py-3 font-semibold">Country</th>
                <th className="px-4 py-3 font-semibold">Region</th>
                <th className="px-4 py-3 font-semibold">Currency</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {countries.map((country) => (
                <tr
                  key={country.id}
                  className="border-b border-bcentx-blue/5 last:border-0"
                >
                  <td className="px-4 py-3">
                    <p className="font-semibold text-bcentx-blue">{country.name}</p>
                    <p className="text-xs text-bcentx-gray">
                      {country.iso_code} · {country.slug}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-bcentx-gray">
                    {country.region ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-bcentx-gray">
                    {country.currency_code ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    <Badge tone={statusTone(country.status)}>
                      {statusLabel(country.status)}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <Button
                        href={`/admin/countries/${country.id}/edit`}
                        variant="secondary"
                        size="sm"
                      >
                        Edit
                      </Button>
                      {country.status !== "archived" ? (
                        <ArchiveCountryButton
                          id={country.id}
                          name={country.name}
                        />
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
