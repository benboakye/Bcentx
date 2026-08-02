import Link from "next/link";
import { createAffiliateProgram } from "@/app/admin/affiliates/actions";
import { AffiliateProgramForm } from "@/app/admin/affiliates/affiliate-form";
import { listPlatformOptions } from "@/lib/admin/links";

export const metadata = {
  title: "Admin · New affiliate program",
};

export default async function NewAffiliateProgramPage() {
  const platforms = await listPlatformOptions();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-bcentx-green-dark">
          <Link href="/admin" className="hover:underline">
            Admin
          </Link>{" "}
          /{" "}
          <Link href="/admin/affiliates" className="hover:underline">
            Affiliates
          </Link>{" "}
          / New
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-bcentx-blue">
          New affiliate program
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-bcentx-gray">
          Keep commission notes factual. Never imply guaranteed income.
        </p>
      </div>

      <div className="rounded-2xl border border-bcentx-blue/10 bg-white p-6 shadow-[0_4px_20px_rgba(27,20,94,0.06)] sm:p-8">
        <AffiliateProgramForm
          platforms={platforms}
          action={createAffiliateProgram}
          submitLabel="Create affiliate program"
        />
      </div>
    </div>
  );
}
