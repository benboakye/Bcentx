import { PageShell } from "@/components/PageShell";

export const metadata = {
  title: "Categories",
};

export default function CategoriesPage() {
  return (
    <PageShell
      title="Wealth Categories"
      description="Shell for the category hub. Later sprints will add the 12 wealth categories with overviews, risk levels, and linked opportunities."
    />
  );
}
