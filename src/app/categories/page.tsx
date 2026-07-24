import { PageShell } from "@/components/PageShell";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { WarningBox } from "@/components/ui/WarningBox";
import { getPublishedCategories } from "@/lib/data/public-content";

export const metadata = {
  title: "Categories",
};

export default async function CategoriesPage() {
  const { source, items } = await getPublishedCategories();

  return (
    <PageShell
      layout="layered"
      eyebrow="Explore wealth paths"
      title="Wealth Categories"
      description="Explore the 12 core wealth-building categories, including risks, requirements, platforms, and beginner pathways."
    >
      {source === "demo" ? (
        <div className="mb-6">
          <WarningBox variant="info" title="Preview content">
            Connect Supabase to load the full published category catalog.
          </WarningBox>
        </div>
      ) : null}
      <div className="grid gap-5 sm:grid-cols-2">
        {items.map((item) => (
          <CategoryCard key={item.title} {...item} />
        ))}
      </div>
    </PageShell>
  );
}
