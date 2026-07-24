import Link from "next/link";
import { ArchiveOpportunityButton } from "@/app/admin/opportunities/archive-button";
import { listAdminOpportunities } from "@/lib/admin/opportunities";
import { Badge, RiskBadge, ScoreBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { ContentStatus, OpportunityListRow } from "@/types/database";

export const metadata = {
  title: "Admin · Opportunities",
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

export default async function AdminOpportunitiesPage({
  searchParams,
}: {
  searchParams: Promise<{
    created?: string;
    updated?: string;
    archived?: string;
  }>;
}) {
  const params = await searchParams;
  let opportunities: OpportunityListRow[] = [];
  let loadError: string | null = null;

  try {
    opportunities = await listAdminOpportunities();
  } catch (err) {
    loadError =
      err instanceof Error ? err.message : "Failed to load opportunities.";
  }

  const flash =
    params.created === "1"
      ? "Opportunity created."
      : params.updated === "1"
        ? "Opportunity updated."
        : params.archived === "1"
          ? "Opportunity archived."
          : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-bcentx-green-dark">
            <Link href="/admin" className="hover:underline">
              Admin
            </Link>{" "}
            / Opportunities
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-bcentx-blue">
            Opportunities
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-bcentx-gray">
            Structured wealth paths with scores and risk fields. Scores never
            reflect affiliate commission.
          </p>
        </div>
        <Button href="/admin/opportunities/new" variant="primary">
          New opportunity
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
      ) : opportunities.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-bcentx-blue/20 bg-white px-6 py-10 text-center text-sm text-bcentx-gray">
          No opportunities yet. Create the first one after categories exist.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-bcentx-blue/10 bg-white shadow-[0_4px_20px_rgba(27,20,94,0.06)]">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-bcentx-blue/10 bg-[#f7fbff] text-xs uppercase tracking-wide text-bcentx-gray">
              <tr>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Score</th>
                <th className="px-4 py-3 font-semibold">Risk</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {opportunities.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-bcentx-blue/5 last:border-0"
                >
                  <td className="px-4 py-3">
                    <p className="font-semibold text-bcentx-blue">{item.name}</p>
                    <p className="text-xs text-bcentx-gray">{item.slug}</p>
                  </td>
                  <td className="px-4 py-3 text-bcentx-gray">
                    {item.categories?.name ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    {item.bcentx_score != null ? (
                      <ScoreBadge score={Math.round(Number(item.bcentx_score))} />
                    ) : (
                      <span className="text-bcentx-gray">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <RiskBadge level={item.risk_level} />
                  </td>
                  <td className="px-4 py-3">
                    <Badge tone={statusTone(item.status)}>
                      {statusLabel(item.status)}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <Button
                        href={`/admin/opportunities/${item.id}/edit`}
                        variant="secondary"
                        size="sm"
                      >
                        Edit
                      </Button>
                      {item.status !== "archived" ? (
                        <ArchiveOpportunityButton
                          id={item.id}
                          name={item.name}
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
