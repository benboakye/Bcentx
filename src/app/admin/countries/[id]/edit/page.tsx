import Link from "next/link";
import { notFound } from "next/navigation";
import { updateCountry } from "@/app/admin/countries/actions";
import { CountryForm } from "@/app/admin/countries/country-form";
import { getAdminCountry } from "@/lib/admin/countries";

export const metadata = {
  title: "Admin · Edit country",
};

export default async function EditCountryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const country = await getAdminCountry(id);

  if (!country) {
    notFound();
  }

  const boundUpdate = updateCountry.bind(null, country.id);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-bcentx-green-dark">
          <Link href="/admin" className="hover:underline">
            Admin
          </Link>{" "}
          /{" "}
          <Link href="/admin/countries" className="hover:underline">
            Countries
          </Link>{" "}
          / Edit
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-bcentx-blue">
          Edit country
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-bcentx-gray">
          {country.iso_code} · {country.name}
        </p>
      </div>

      <div className="rounded-2xl border border-bcentx-blue/10 bg-white p-6 shadow-[0_4px_20px_rgba(27,20,94,0.06)] sm:p-8">
        <CountryForm
          country={country}
          action={boundUpdate}
          submitLabel="Save changes"
        />
      </div>
    </div>
  );
}
