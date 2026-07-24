import Link from "next/link";
import { notFound } from "next/navigation";
import { updateCountryAvailability } from "@/app/admin/availability/actions";
import { AvailabilityForm } from "@/app/admin/availability/availability-form";
import {
  getAdminCountryAvailability,
  listCountryOptions,
} from "@/lib/admin/country-availability";
import {
  listOpportunityOptions,
  listPlatformOptions,
} from "@/lib/admin/links";

export const metadata = {
  title: "Admin · Edit availability",
};

export default async function EditAvailabilityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [record, countries, opportunities, platforms] = await Promise.all([
    getAdminCountryAvailability(id),
    listCountryOptions(),
    listOpportunityOptions(),
    listPlatformOptions(),
  ]);

  if (!record) {
    notFound();
  }

  const boundUpdate = updateCountryAvailability.bind(null, record.id);

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
          / Edit
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-bcentx-blue">
          Edit availability record
        </h1>
      </div>

      <div className="rounded-2xl border border-bcentx-blue/10 bg-white p-6 shadow-[0_4px_20px_rgba(27,20,94,0.06)] sm:p-8">
        <AvailabilityForm
          record={record}
          countries={countries}
          opportunities={opportunities}
          platforms={platforms}
          action={boundUpdate}
          submitLabel="Save changes"
        />
      </div>
    </div>
  );
}
