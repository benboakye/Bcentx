import Link from "next/link";
import { notFound } from "next/navigation";
import { updatePlatform } from "@/app/admin/platforms/actions";
import { PlatformForm } from "@/app/admin/platforms/platform-form";
import { getAdminPlatform } from "@/lib/admin/platforms";

export const metadata = {
  title: "Admin · Edit platform",
};

export default async function EditPlatformPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const platform = await getAdminPlatform(id);

  if (!platform) {
    notFound();
  }

  const boundUpdate = updatePlatform.bind(null, platform.id);

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
          / Edit
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-bcentx-blue">
          Edit platform
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-bcentx-gray">{platform.name}</p>
      </div>

      <div className="rounded-2xl border border-bcentx-blue/10 bg-white p-6 shadow-[0_4px_20px_rgba(27,20,94,0.06)] sm:p-8">
        <PlatformForm
          platform={platform}
          action={boundUpdate}
          submitLabel="Save changes"
        />
      </div>
    </div>
  );
}
