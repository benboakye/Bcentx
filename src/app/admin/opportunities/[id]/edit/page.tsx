import Link from "next/link";
import { notFound } from "next/navigation";
import { updateOpportunity } from "@/app/admin/opportunities/actions";
import { OpportunityForm } from "@/app/admin/opportunities/opportunity-form";
import { syncOpportunityPlatforms } from "@/app/admin/opportunities/platform-links-actions";
import { OpportunityPlatformLinksForm } from "@/app/admin/opportunities/platform-links-form";
import {
  getAdminOpportunity,
  listCategoryOptions,
} from "@/lib/admin/opportunities";
import {
  listOpportunityPlatformLinks,
  listPlatformOptions,
} from "@/lib/admin/links";

export const metadata = {
  title: "Admin · Edit opportunity",
};

export default async function EditOpportunityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [opportunity, categories, platforms, links] = await Promise.all([
    getAdminOpportunity(id),
    listCategoryOptions(),
    listPlatformOptions(),
    listOpportunityPlatformLinks(id),
  ]);

  if (!opportunity) {
    notFound();
  }

  const boundUpdate = updateOpportunity.bind(null, opportunity.id);
  const boundSyncLinks = syncOpportunityPlatforms.bind(null, opportunity.id);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-bcentx-green-dark">
          <Link href="/admin" className="hover:underline">
            Admin
          </Link>{" "}
          /{" "}
          <Link href="/admin/opportunities" className="hover:underline">
            Opportunities
          </Link>{" "}
          / Edit
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-bcentx-blue">
          Edit opportunity
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-bcentx-gray">{opportunity.name}</p>
      </div>

      <div className="rounded-2xl border border-bcentx-blue/10 bg-white p-6 shadow-[0_4px_20px_rgba(27,20,94,0.06)] sm:p-8">
        <OpportunityForm
          opportunity={opportunity}
          categories={categories}
          action={boundUpdate}
          submitLabel="Save changes"
        />
      </div>

      <div className="rounded-2xl border border-bcentx-blue/10 bg-white p-6 shadow-[0_4px_20px_rgba(27,20,94,0.06)] sm:p-8">
        <h2 className="text-xl font-semibold text-bcentx-blue">Linked platforms</h2>
        <p className="mt-2 text-sm text-bcentx-gray">
          Connect tools that are relevant to this opportunity. Links do not affect scores.
        </p>
        <div className="mt-4">
          <OpportunityPlatformLinksForm
            platforms={platforms}
            selectedIds={links.map((link) => link.platform_id)}
            action={boundSyncLinks}
          />
        </div>
      </div>
    </div>
  );
}
