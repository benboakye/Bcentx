import { redirect } from "next/navigation";
import Link from "next/link";
import type { ReactNode } from "react";
import { requireStaffProfile } from "@/lib/auth";
import { WarningBox } from "@/components/ui/WarningBox";
import { SignOutButton } from "./sign-out-button";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { profile, allowed } = await requireStaffProfile();

  if (!profile) {
    redirect("/login?next=/admin");
  }

  if (!allowed) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="rounded-2xl border border-bcentx-blue/10 bg-white p-6 shadow-[0_4px_20px_rgba(27,20,94,0.06)] sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-bcentx-green-dark">
            Access restricted
          </p>
          <h1 className="mt-2 text-3xl font-bold text-bcentx-blue">Staff access required</h1>
          <p className="mt-3 text-bcentx-gray">
            Signed in as <strong>{profile.email}</strong> with role{" "}
            <strong>{profile.role}</strong>. An owner must promote this profile before Admin opens.
          </p>
          <div className="mt-6">
            <WarningBox variant="caution" title="How to promote an account">
              In the Supabase SQL Editor run:
              <pre className="mt-2 overflow-x-auto rounded-md bg-bcentx-blue-soft p-3 text-xs text-bcentx-blue">{`update profiles
set role = 'owner'
where email = '${profile.email}';`}</pre>
            </WarningBox>
          </div>
          <div className="mt-6">
            <SignOutButton variant="secondary" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[linear-gradient(180deg,#d9ecfb_0%,#eef6fc_100%)]">
      <div className="border-b border-bcentx-blue/10 bg-bcentx-blue text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-bcentx-green-soft">
              Bcentx Admin
            </p>
            <p className="text-sm text-white/80">
              {profile.full_name || profile.email} · {profile.role}
            </p>
            <nav className="mt-2 flex flex-wrap gap-3 text-sm">
              <Link href="/admin" className="text-white/85 no-underline hover:text-white">
                Dashboard
              </Link>
              <Link
                href="/admin/categories"
                className="text-white/85 no-underline hover:text-white"
              >
                Categories
              </Link>
              <Link
                href="/admin/risk-warnings"
                className="text-white/85 no-underline hover:text-white"
              >
                Risk warnings
              </Link>
              <Link
                href="/admin/opportunities"
                className="text-white/85 no-underline hover:text-white"
              >
                Opportunities
              </Link>
              <Link
                href="/admin/platforms"
                className="text-white/85 no-underline hover:text-white"
              >
                Platforms
              </Link>
              <Link
                href="/admin/countries"
                className="text-white/85 no-underline hover:text-white"
              >
                Countries
              </Link>
              <Link
                href="/admin/availability"
                className="text-white/85 no-underline hover:text-white"
              >
                Availability
              </Link>
            </nav>
          </div>
          <SignOutButton />
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-8">{children}</div>
    </div>
  );
}
