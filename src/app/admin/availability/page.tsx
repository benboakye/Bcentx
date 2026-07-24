import Link from "next/link";
import { DeleteAvailabilityButton } from "@/app/admin/availability/delete-button";
import { listAdminCountryAvailability } from "@/lib/admin/country-availability";
import { CountryAvailabilityBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { CountryAvailabilityListRow } from "@/types/database";

export const metadata = {
  title: "Admin · Availability",
};

export default async function AdminAvailabilityPage({
  searchParams,
}: {
  searchParams: Promise<{
    created?: string;
    updated?: string;
    deleted?: string;
  }>;
}) {
  const params = await searchParams;
  let rows: CountryAvailabilityListRow[] = [];
  let loadError: string | null = null;

  try {
    rows = await listAdminCountryAvailability();
  } catch (err) {
    loadError =
      err instanceof Error ? err.message : "Failed to load availability.";
  }

  const flash =
    params.created === "1"
      ? "Availability record created."
      : params.updated === "1"
        ? "Availability record updated."
        : params.deleted === "1"
          ? "Availability record deleted."
          : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-bcentx-green-dark">
            <Link href="/admin" className="hover:underline">
              Admin
            </Link>{" "}
            / Availability
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-bcentx-blue">
            Country availability
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-bcentx-gray">
            Record whether a platform or opportunity works in a country — with
            verification dates and sources.
          </p>
        </div>
        <Button href="/admin/availability/new" variant="primary">
          New record
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
      ) : rows.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-bcentx-blue/20 bg-white px-6 py-10 text-center text-sm text-bcentx-gray">
          No availability records yet.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-bcentx-blue/10 bg-white shadow-[0_4px_20px_rgba(27,20,94,0.06)]">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-bcentx-blue/10 bg-[#f7fbff] text-xs uppercase tracking-wide text-bcentx-gray">
              <tr>
                <th className="px-4 py-3 font-semibold">Country</th>
                <th className="px-4 py-3 font-semibold">Target</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Verified</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-bcentx-blue/5 last:border-0"
                >
                  <td className="px-4 py-3">
                    <p className="font-semibold text-bcentx-blue">
                      {row.countries?.name ?? "—"}
                    </p>
                    <p className="text-xs text-bcentx-gray">
                      {row.countries?.iso_code}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-bcentx-gray">
                    {row.opportunities?.name
                      ? `Opportunity: ${row.opportunities.name}`
                      : null}
                    {row.opportunities?.name && row.platforms?.name ? (
                      <br />
                    ) : null}
                    {row.platforms?.name
                      ? `Platform: ${row.platforms.name}`
                      : null}
                    {!row.opportunities?.name && !row.platforms?.name
                      ? "—"
                      : null}
                  </td>
                  <td className="px-4 py-3">
                    <CountryAvailabilityBadge status={row.availability_status} />
                  </td>
                  <td className="px-4 py-3 text-bcentx-gray">
                    {row.last_verified_at ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <Button
                        href={`/admin/availability/${row.id}/edit`}
                        variant="secondary"
                        size="sm"
                      >
                        Edit
                      </Button>
                      <DeleteAvailabilityButton id={row.id} />
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
