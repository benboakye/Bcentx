import Link from "next/link";
import { createRiskWarning } from "@/app/admin/risk-warnings/actions";
import { RiskWarningForm } from "@/app/admin/risk-warnings/risk-warning-form";

export const metadata = {
  title: "Admin · New risk warning",
};

export default function NewRiskWarningPage() {
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
          / New
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-bcentx-blue">
          New risk warning
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-bcentx-gray">
          Keep language educational — no personalized advice or guaranteed outcomes.
        </p>
      </div>

      <div className="rounded-2xl border border-bcentx-blue/10 bg-white p-6 shadow-[0_4px_20px_rgba(27,20,94,0.06)] sm:p-8">
        <RiskWarningForm
          action={createRiskWarning}
          submitLabel="Create risk warning"
        />
      </div>
    </div>
  );
}
