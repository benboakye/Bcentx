import Link from "next/link";
import { ArchiveAffiliateButton } from "@/app/admin/affiliates/archive-button";
import { listAdminAffiliatePrograms } from "@/lib/admin/affiliate-programs";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { WarningBox } from "@/components/ui/WarningBox";
import type { AffiliateProgramListRow, ContentStatus } from "@/types/database";

export const metadata = {
  title: "Admin · Affiliates",
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

export default async function AdminAffiliatesPage({
  searchParams,
}: {
  searchParams: Promise<{
    created?: string;
    updated?: string;
    archived?: string;
  }>;
}) {
  const params = await searchParams;
  let programs: AffiliateProgramListRow[] = [];
  let loadError: string | null = null;

  try {
    programs = await listAdminAffiliatePrograms();
  } catch (err) {
    loadError =
      err instanceof Error ? err.message : "Failed to load affiliate programs.";
  }

  const flash =
    params.created === "1"
      ? "Affiliate program created."
      : params.updated === "1"
        ? "Affiliate program updated."
        : params.archived === "1"
          ? "Affiliate program archived."
          : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-bcentx-green-dark">
            <Link href="/admin" className="hover:underline">
              Admin
            </Link>{" "}
            / Affiliates
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-bcentx-blue">
            Affiliate programs
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-bcentx-gray">
            Track affiliate relationships transparently. Commission never affects scores.
          </p>
        </div>
        <Button href="/admin/affiliates/new" variant="primary">
          New affiliate program
        </Button>
      </div>

      <WarningBox variant="caution" title="Trust rule">
        Always disclose affiliate links near CTAs. Do not let commission change editorial
        rankings or Bcentx scores.
      </WarningBox>

      {flash ? (
        <p className="rounded-md bg-bcentx-green-soft px-3 py-2 text-sm text-bcentx-green-dark">
          {flash}
        </p>
      ) : null}

      {loadError ? (
        <p className="rounded-md bg-risk-red-soft px-3 py-2 text-sm text-risk-red" role="alert">
          {loadError}
        </p>
      ) : programs.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-bcentx-blue/20 bg-white px-6 py-10 text-center text-sm text-bcentx-gray">
          No affiliate programs yet. Create one after platforms exist.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-bcentx-blue/10 bg-white shadow-[0_4px_20px_rgba(27,20,94,0.06)]">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-bcentx-blue/10 bg-[#f7fbff] text-xs uppercase tracking-wide text-bcentx-gray">
              <tr>
                <th className="px-4 py-3 font-semibold">Program</th>
                <th className="px-4 py-3 font-semibold">Platform</th>
                <th className="px-4 py-3 font-semibold">Commission</th>
                <th className="px-4 py-3 font-semibold">Verified</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {programs.map((program) => (
                <tr
                  key={program.id}
                  className="border-b border-bcentx-blue/5 last:border-0"
                >
                  <td className="px-4 py-3">
                    <p className="font-semibold text-bcentx-blue">
                      {program.program_name}
                    </p>
                    <p className="text-xs text-bcentx-gray">
                      Disclosure required
                    </p>
                  </td>
                  <td className="px-4 py-3 text-bcentx-gray">
                    {program.platforms?.name ?? "—"}
                  </td>
                  <td className="px-4 py-3 capitalize text-bcentx-gray">
                    {program.commission_type.replaceAll("_", " ")}
                  </td>
                  <td className="px-4 py-3 text-bcentx-gray">
                    {program.last_verified_at ?? "Not verified"}
                  </td>
                  <td className="px-4 py-3">
                    <Badge tone={statusTone(program.status)}>
                      {statusLabel(program.status)}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <Button
                        href={`/admin/affiliates/${program.id}/edit`}
                        variant="secondary"
                        size="sm"
                      >
                        Edit
                      </Button>
                      {program.status !== "archived" ? (
                        <ArchiveAffiliateButton
                          id={program.id}
                          name={program.program_name}
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
