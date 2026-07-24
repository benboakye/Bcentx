import { PageShell } from "@/components/PageShell";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { demoArticles } from "@/lib/demo-content";

export const metadata = {
  title: "Learning Centre",
};

export default function BlogPage() {
  return (
    <PageShell
      title="Learning Centre"
      description="Article cards keep the V1 Learning Centre spirit while preparing for SEO-ready, structured guides."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {demoArticles.map((item) => (
          <ArticleCard key={item.title} {...item} />
        ))}
      </div>
    </PageShell>
  );
}
