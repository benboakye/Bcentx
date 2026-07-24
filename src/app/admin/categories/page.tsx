import Link from "next/link";
import { ArchiveCategoryButton } from "@/app/admin/categories/archive-button";
import { listAdminCategories } from "@/lib/admin/categories";
import { Badge, RiskBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { CategoryRow, ContentStatus } from "@/types/database";

export const metadata = {
  title: "Admin · Categories",
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

export default async function AdminCategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ created?: string; updated?: string; archived?: string }>;
}) {
  const params = await searchParams;
  let categories: CategoryRow[] = [];
  let loadError: string | null = null;

  try {
    categories = await listAdminCategories();
  } catch (err) {
    loadError = err instanceof Error ? err.message : "Failed to load categories.";
  }

  const flash =
    params.created === "1"
      ? "Category created."
      : params.updated === "1"
        ? "Category updated."
        : params.archived === "1"
          ? "Category archived."
          : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-bcentx-green-dark">
            <Link href="/admin" className="hover:underline">
              Admin
            </Link>{" "}
            / Categories
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-bcentx-blue">
            Categories
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-bcentx-gray">
            Manage the 12 wealth categories. Only published rows appear on public pages.
          </p>
        </div>
        <Button href="/admin/categories/new" variant="primary">
          New category
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
      ) : categories.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-bcentx-blue/20 bg-white px-6 py-10 text-center text-sm text-bcentx-gray">
          No categories yet. Create the first one or apply the seed SQL.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-bcentx-blue/10 bg-white shadow-[0_4px_20px_rgba(27,20,94,0.06)]">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-bcentx-blue/10 bg-[#f7fbff] text-xs uppercase tracking-wide text-bcentx-gray">
              <tr>
                <th className="px-4 py-3 font-semibold">Order</th>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Risk</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr
                  key={category.id}
                  className="border-b border-bcentx-blue/5 last:border-0"
                >
                  <td className="px-4 py-3 text-bcentx-gray">{category.display_order}</td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-bcentx-blue">{category.name}</p>
                    <p className="text-xs text-bcentx-gray">
                      {category.code} · {category.slug}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <Badge tone={statusTone(category.status)}>
                      {statusLabel(category.status)}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <RiskBadge level={category.risk_level} variant="typical" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <Button
                        href={`/admin/categories/${category.id}/edit`}
                        variant="secondary"
                        size="sm"
                      >
                        Edit
                      </Button>
                      {category.status !== "archived" ? (
                        <ArchiveCategoryButton
                          id={category.id}
                          name={category.name}
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
