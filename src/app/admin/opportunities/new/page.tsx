import Link from "next/link";
import { createOpportunity } from "@/app/admin/opportunities/actions";
import { OpportunityForm } from "@/app/admin/opportunities/opportunity-form";
import { listCategoryOptions } from "@/lib/admin/opportunities";

export const metadata = {
  title: "Admin · New opportunity",
};

export default async function NewOpportunityPage() {
  let categories: { id: string; name: string; code: string }[] = [];
  let loadError: string | null = null;

  try {
    categories = await listCategoryOptions();
  } catch (err) {
    loadError =
      err instanceof Error ? err.message : "Failed to load categories.";
  }

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
          / New
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-bcentx-blue">
          New opportunity
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-bcentx-gray">
          Always fill “how money can be lost.” Scores must stay independent of
          affiliate relationships.
        </p>
      </div>

      {loadError ? (
        <p className="rounded-md bg-risk-red-soft px-3 py-2 text-sm text-risk-red" role="alert">
          {loadError}
        </p>
      ) : (
        <div className="rounded-2xl border border-bcentx-blue/10 bg-white p-6 shadow-[0_4px_20px_rgba(27,20,94,0.06)] sm:p-8">
          <OpportunityForm
            categories={categories}
            action={createOpportunity}
            submitLabel="Create opportunity"
          />
        </div>
      )}
    </div>
  );
}
