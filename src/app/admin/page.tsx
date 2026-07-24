import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { WarningBox, AffiliateDisclosureBox } from "@/components/ui/WarningBox";

export const metadata = {
  title: "Admin",
};

const modules = [
  {
    title: "Categories",
    body: "Manage the 12 wealth categories, summaries, and risk labels.",
    href: "/admin/categories",
    status: "Ready",
  },
  {
    title: "Risk warnings",
    body: "Reusable scam and risk notices linked to opportunities.",
    href: "/admin/risk-warnings",
    status: "Ready",
  },
  {
    title: "Opportunities",
    body: "Structured opportunity records with scores, costs, and linked platforms.",
    href: "/admin/opportunities",
    status: "Ready",
  },
  {
    title: "Platforms",
    body: "Tools and marketplaces with fees, restrictions, and verification dates.",
    href: "/admin/platforms",
    status: "Ready",
  },
  {
    title: "Countries",
    body: "Country context for payments, tax notes, and local risk awareness.",
    href: "/admin/countries",
    status: "Ready",
  },
  {
    title: "Availability",
    body: "Link countries to platforms or opportunities with verification status.",
    href: "/admin/availability",
    status: "Ready",
  },
];

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-bcentx-blue/10 bg-white p-6 shadow-[0_4px_20px_rgba(27,20,94,0.06)] sm:p-8">
        <h1 className="text-3xl font-bold tracking-tight text-bcentx-blue">Admin dashboard</h1>
        <p className="mt-3 max-w-2xl text-bcentx-gray">
          Staff-only workspace. Core content modules plus availability linking are ready.
        </p>
      </section>

      <WarningBox variant="caution" title="Trust rules still apply">
        Affiliate commission must never affect scores. No guaranteed-income claims. Public users only
        see published content.
      </WarningBox>
      <AffiliateDisclosureBox />

      <div className="grid gap-4 sm:grid-cols-2">
        {modules.map((item) => {
          const inner = (
            <>
              <h2 className="text-lg font-semibold text-bcentx-blue">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-foreground/75">{item.body}</p>
              <p
                className={`mt-4 text-xs font-semibold uppercase tracking-wide ${
                  item.href ? "text-bcentx-green-dark" : "text-bcentx-gray"
                }`}
              >
                {item.status}
              </p>
            </>
          );

          const cardClass =
            "h-full border border-bcentx-blue/10 !bg-surface shadow-[0_2px_10px_rgba(27,20,94,0.05)]";

          if (item.href) {
            return (
              <Link
                key={item.title}
                href={item.href}
                className="block rounded-xl no-underline transition hover:opacity-95"
              >
                <Card className={`${cardClass} hover:border-bcentx-green/40`}>
                  {inner}
                </Card>
              </Link>
            );
          }

          return (
            <Card key={item.title} className={cardClass}>
              {inner}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
