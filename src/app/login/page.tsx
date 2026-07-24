import { PageShell } from "@/components/PageShell";
import { WarningBox } from "@/components/ui/WarningBox";
import { LoginForm } from "./login-form";

export const metadata = {
  title: "Staff sign in",
};

type Props = {
  searchParams: Promise<{ next?: string }>;
};

export default async function LoginPage({ searchParams }: Props) {
  const params = await searchParams;
  const nextPath =
    params.next && params.next.startsWith("/") ? params.next : "/admin";

  return (
    <PageShell
      layout="layered"
      eyebrow="Staff access"
      title="Sign in to Bcentx Admin"
      description="Admin tools are for approved researchers, editors, and owners only. Public content never requires an account."
    >
      <div className="mx-auto max-w-md rounded-2xl border border-bcentx-blue/10 bg-white p-6 shadow-[0_4px_20px_rgba(27,20,94,0.06)] sm:p-8">
        <LoginForm nextPath={nextPath} />
      </div>
      <div className="mx-auto mt-6 max-w-md">
        <WarningBox variant="info" title="First-time setup">
          After creating your account, promote it in Supabase SQL with{" "}
          <code className="text-xs">update profiles set role = &apos;owner&apos; where email =
          &apos;you@example.com&apos;;</code>{" "}
          New accounts start as regular users and cannot open Admin until promoted.
        </WarningBox>
      </div>
    </PageShell>
  );
}
