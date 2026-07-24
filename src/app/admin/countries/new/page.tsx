import Link from "next/link";
import { createCountry } from "@/app/admin/countries/actions";
import { CountryForm } from "@/app/admin/countries/country-form";

export const metadata = {
  title: "Admin · New country",
};

export default function NewCountryPage() {
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
          / New
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-bcentx-blue">
          New country
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-bcentx-gray">
          Keep notes educational and general — not personalized tax or legal advice.
        </p>
      </div>

      <div className="rounded-2xl border border-bcentx-blue/10 bg-white p-6 shadow-[0_4px_20px_rgba(27,20,94,0.06)] sm:p-8">
        <CountryForm action={createCountry} submitLabel="Create country" />
      </div>
    </div>
  );
}
