import Link from "next/link";
import { notFound } from "next/navigation";
import { updateAffiliateProgram } from "@/app/admin/affiliates/actions";
import { AffiliateProgramForm } from "@/app/admin/affiliates/affiliate-form";
import { getAdminAffiliateProgram } from "@/lib/admin/affiliate-programs";
import { listPlatformOptions } from "@/lib/admin/links";

export const metadata = {
  title: "Admin · Edit affiliate program",
};

export default async function EditAffiliateProgramPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [program, platforms] = await Promise.all([
    getAdminAffiliateProgram(id),
    listPlatformOptions(),
  ]);

  if (!program) {
    notFound();
  }

  const boundUpdate = updateAffiliateProgram.bind(null, program.id);

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
          / Edit
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-bcentx-blue">
          Edit affiliate program
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-bcentx-gray">
          {program.program_name}
        </p>
      </div>

      <div className="rounded-2xl border border-bcentx-blue/10 bg-white p-6 shadow-[0_4px_20px_rgba(27,20,94,0.06)] sm:p-8">
        <AffiliateProgramForm
          program={program}
          platforms={platforms}
          action={boundUpdate}
          submitLabel="Save changes"
        />
      </div>
    </div>
  );
}
