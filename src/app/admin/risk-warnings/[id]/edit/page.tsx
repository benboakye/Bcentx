import Link from "next/link";
import { notFound } from "next/navigation";
import { updateRiskWarning } from "@/app/admin/risk-warnings/actions";
import { RiskWarningForm } from "@/app/admin/risk-warnings/risk-warning-form";
import { getAdminRiskWarning } from "@/lib/admin/risk-warnings";

export const metadata = {
  title: "Admin · Edit risk warning",
};

export default async function EditRiskWarningPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const warning = await getAdminRiskWarning(id);

  if (!warning) {
    notFound();
  }

  const boundUpdate = updateRiskWarning.bind(null, warning.id);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-bcentx-green-dark">
          <Link href="/admin" className="hover:underline">
            Admin
          </Link>{" "}
          /{" "}
          <Link href="/admin/risk-warnings" className="hover:underline">
            Risk warnings
          </Link>{" "}
          / Edit
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-bcentx-blue">
          Edit risk warning
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-bcentx-gray">{warning.title}</p>
      </div>

      <div className="rounded-2xl border border-bcentx-blue/10 bg-white p-6 shadow-[0_4px_20px_rgba(27,20,94,0.06)] sm:p-8">
        <RiskWarningForm
          warning={warning}
          action={boundUpdate}
          submitLabel="Save changes"
        />
      </div>
    </div>
  );
}
