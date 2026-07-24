import Link from "next/link";
import { createPlatform } from "@/app/admin/platforms/actions";
import { PlatformForm } from "@/app/admin/platforms/platform-form";

export const metadata = {
  title: "Admin · New platform",
};

export default function NewPlatformPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-bcentx-green-dark">
          <Link href="/admin" className="hover:underline">
            Admin
          </Link>{" "}
          /{" "}
          <Link href="/admin/platforms" className="hover:underline">
            Platforms
          </Link>{" "}
          / New
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-bcentx-blue">
          New platform
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-bcentx-gray">
          Always include risk notes and verify availability before publishing.
        </p>
      </div>

      <div className="rounded-2xl border border-bcentx-blue/10 bg-white p-6 shadow-[0_4px_20px_rgba(27,20,94,0.06)] sm:p-8">
        <PlatformForm action={createPlatform} submitLabel="Create platform" />
      </div>
    </div>
  );
}
