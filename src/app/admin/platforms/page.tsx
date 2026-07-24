import Link from "next/link";
import { ArchivePlatformButton } from "@/app/admin/platforms/archive-button";
import { listAdminPlatforms } from "@/lib/admin/platforms";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { ContentStatus, PlatformRow } from "@/types/database";

export const metadata = {
  title: "Admin · Platforms",
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

export default async function AdminPlatformsPage({
  searchParams,
}: {
  searchParams: Promise<{
    created?: string;
    updated?: string;
    archived?: string;
  }>;
}) {
  const params = await searchParams;
  let platforms: PlatformRow[] = [];
  let loadError: string | null = null;

  try {
    platforms = await listAdminPlatforms();
  } catch (err) {
    loadError =
      err instanceof Error ? err.message : "Failed to load platforms.";
  }

  const flash =
    params.created === "1"
      ? "Platform created."
      : params.updated === "1"
        ? "Platform updated."
        : params.archived === "1"
          ? "Platform archived."
          : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-bcentx-green-dark">
            <Link href="/admin" className="hover:underline">
              Admin
            </Link>{" "}
            / Platforms
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-bcentx-blue">
            Platforms
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-bcentx-gray">
            Tools and marketplaces. Affiliate relationships must never change scores.
          </p>
        </div>
        <Button href="/admin/platforms/new" variant="primary">
          New platform
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
      ) : platforms.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-bcentx-blue/20 bg-white px-6 py-10 text-center text-sm text-bcentx-gray">
          No platforms yet. Create the first one.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-bcentx-blue/10 bg-white shadow-[0_4px_20px_rgba(27,20,94,0.06)]">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-bcentx-blue/10 bg-[#f7fbff] text-xs uppercase tracking-wide text-bcentx-gray">
              <tr>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Type</th>
                <th className="px-4 py-3 font-semibold">Affiliate</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {platforms.map((platform) => (
                <tr
                  key={platform.id}
                  className="border-b border-bcentx-blue/5 last:border-0"
                >
                  <td className="px-4 py-3">
                    <p className="font-semibold text-bcentx-blue">{platform.name}</p>
                    <p className="text-xs text-bcentx-gray">{platform.slug}</p>
                  </td>
                  <td className="px-4 py-3 capitalize text-bcentx-gray">
                    {platform.platform_type}
                  </td>
                  <td className="px-4 py-3 text-bcentx-gray">
                    {platform.has_affiliate_program ? "Yes" : "No"}
                  </td>
                  <td className="px-4 py-3">
                    <Badge tone={statusTone(platform.status)}>
                      {statusLabel(platform.status)}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <Button
                        href={`/admin/platforms/${platform.id}/edit`}
                        variant="secondary"
                        size="sm"
                      >
                        Edit
                      </Button>
                      {platform.status !== "archived" ? (
                        <ArchivePlatformButton
                          id={platform.id}
                          name={platform.name}
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
