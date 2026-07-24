import { PageShell } from "@/components/PageShell";
import { RiskBadge } from "@/components/ui/Badge";
import { WarningBox } from "@/components/ui/WarningBox";
import { getPublishedCategories } from "@/lib/data/public-content";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const { items } = await getPublishedCategories();
  const category = items.find((item) => item.href.endsWith(`/${slug}`) || item.href === `/categories/${slug}`);
  return {
    title: category?.title ?? "Category",
  };
}

export default async function CategoryDetailPage({ params }: Props) {
  const { slug } = await params;
  const { source, items } = await getPublishedCategories();
  const category = items.find((item) => item.href === `/categories/${slug}`);

  if (!category) {
    notFound();
  }

  return (
    <PageShell
      title={category.title}
      description={category.summary}
    >
      <div className="mb-6 flex flex-wrap gap-2">
        <RiskBadge level={category.riskLevel} />
      </div>
      {source === "demo" ? (
        <WarningBox variant="info" title="Detail shell">
          Full category overview fields will render from Supabase once connected. Slug: {slug}
        </WarningBox>
      ) : (
        <WarningBox variant="info" title="Published category">
          Detail content shell for <code>{slug}</code>. Extended overview text lands with richer
          queries in a later sprint.
        </WarningBox>
      )}
    </PageShell>
  );
}
