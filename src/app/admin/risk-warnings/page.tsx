import Link from "next/link";
import { ArchiveRiskWarningButton } from "@/app/admin/risk-warnings/archive-button";
import { listAdminRiskWarnings } from "@/lib/admin/risk-warnings";
import { Badge, RiskBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { ContentStatus, RiskWarningRow } from "@/types/database";

export const metadata = {
  title: "Admin · Risk warnings",
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

export default async function AdminRiskWarningsPage({
  searchParams,
}: {
  searchParams: Promise<{
    created?: string;
    updated?: string;
    archived?: string;
  }>;
}) {
  const params = await searchParams;
  let warnings: RiskWarningRow[] = [];
  let loadError: string | null = null;

  try {
    warnings = await listAdminRiskWarnings();
  } catch (err) {
    loadError =
      err instanceof Error ? err.message : "Failed to load risk warnings.";
  }

  const flash =
    params.created === "1"
      ? "Risk warning created."
      : params.updated === "1"
        ? "Risk warning updated."
        : params.archived === "1"
          ? "Risk warning archived."
          : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-bcentx-green-dark">
            <Link href="/admin" className="hover:underline">
              Admin
            </Link>{" "}
            / Risk warnings
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-bcentx-blue">
            Risk warnings
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-bcentx-gray">
            Reusable scam and risk notices. Only published rows appear on public
            pages.
          </p>
        </div>
        <Button href="/admin/risk-warnings/new" variant="primary">
          New risk warning
        </Button>
      </div>

      {flash ? (
        <p className="rounded-md bg-bcentx-green-soft px-3 py-2 text-sm text-bcentx-green-dark">
          {flash}
        </p>
      ) : null}

      {loadError ? (
        <p
          className="rounded-md bg-risk-red-soft px-3 py-2 text-sm text-risk-red"
          role="alert"
        >
          {loadError}
        </p>
      ) : warnings.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-bcentx-blue/20 bg-white px-6 py-10 text-center text-sm text-bcentx-gray">
          No risk warnings yet. Create the first one or apply the seed SQL.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-bcentx-blue/10 bg-white shadow-[0_4px_20px_rgba(27,20,94,0.06)]">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-bcentx-blue/10 bg-[#f7fbff] text-xs uppercase tracking-wide text-bcentx-gray">
              <tr>
                <th className="px-4 py-3 font-semibold">Title</th>
                <th className="px-4 py-3 font-semibold">Type</th>
                <th className="px-4 py-3 font-semibold">Severity</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {warnings.map((warning) => (
                <tr
                  key={warning.id}
                  className="border-b border-bcentx-blue/5 last:border-0"
                >
                  <td className="px-4 py-3">
                    <p className="font-semibold text-bcentx-blue">
                      {warning.title}
                    </p>
                    <p className="text-xs text-bcentx-gray">{warning.slug}</p>
                  </td>
                  <td className="px-4 py-3 capitalize text-bcentx-gray">
                    {warning.warning_type.replaceAll("_", " ")}
                  </td>
                  <td className="px-4 py-3">
                    <RiskBadge level={warning.severity} />
                  </td>
                  <td className="px-4 py-3">
                    <Badge tone={statusTone(warning.status)}>
                      {statusLabel(warning.status)}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <Button
                        href={`/admin/risk-warnings/${warning.id}/edit`}
                        variant="secondary"
                        size="sm"
                      >
                        Edit
                      </Button>
                      {warning.status !== "archived" ? (
                        <ArchiveRiskWarningButton
                          id={warning.id}
                          title={warning.title}
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
