import Link from "next/link";
import { createCountryAvailability } from "@/app/admin/availability/actions";
import { AvailabilityForm } from "@/app/admin/availability/availability-form";
import { listCountryOptions } from "@/lib/admin/country-availability";
import {
  listOpportunityOptions,
  listPlatformOptions,
} from "@/lib/admin/links";

export const metadata = {
  title: "Admin · New availability",
};

export default async function NewAvailabilityPage() {
  const [countries, opportunities, platforms] = await Promise.all([
    listCountryOptions(),
    listOpportunityOptions(),
    listPlatformOptions(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-bcentx-green-dark">
          <Link href="/admin" className="hover:underline">
            Admin
          </Link>{" "}
          /{" "}
          <Link href="/admin/availability" className="hover:underline">
            Availability
          </Link>{" "}
          / New
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-bcentx-blue">
          New availability record
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-bcentx-gray">
          Prefer official sources and a verification date whenever possible.
        </p>
      </div>

      <div className="rounded-2xl border border-bcentx-blue/10 bg-white p-6 shadow-[0_4px_20px_rgba(27,20,94,0.06)] sm:p-8">
        <AvailabilityForm
          countries={countries}
          opportunities={opportunities}
          platforms={platforms}
          action={createCountryAvailability}
          submitLabel="Create record"
        />
      </div>
    </div>
  );
}
