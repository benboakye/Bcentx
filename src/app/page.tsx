import { PageHero } from "@/components/ui/PageHero";
import { WarningBox, AffiliateDisclosureBox } from "@/components/ui/WarningBox";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { OpportunityCard } from "@/components/cards/OpportunityCard";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { demoArticles, demoOpportunities } from "@/lib/demo-content";
import { getPublishedCategories } from "@/lib/data/public-content";

export default async function HomePage() {
  const { source, items: categories } = await getPublishedCategories();
  const featuredCategories = categories.slice(0, 4);

  return (
    <div>
      <PageHero
        eyebrow="Bcentx 2.0"
        title="Financial Growth, Simplified"
        description="Discover legitimate wealth-building paths with honest risk warnings, country awareness, and beginner-friendly guidance — without the hype."
        primaryCta={{ href: "/categories", label: "Explore categories" }}
        secondaryCta={{ href: "/blog", label: "Visit Learning Centre" }}
      />

      <section className="mx-auto max-w-6xl space-y-4 px-4 py-8">
        <WarningBox variant="caution" title="Educational content only">
          Bcentx does not provide personalized financial, legal, or tax advice. Opportunities can
          lose money. Always verify details for your country and situation.
        </WarningBox>
        <AffiliateDisclosureBox />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <h2 className="text-2xl font-bold text-bcentx-blue">Popular categories</h2>
        <p className="mt-2 max-w-2xl text-bcentx-gray">
          {source === "supabase"
            ? "Loaded from published Supabase category records."
            : "Demo category cards until Supabase env + migrations are connected."}
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {featuredCategories.map((item) => (
            <CategoryCard key={item.title} {...item} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <h2 className="text-2xl font-bold text-bcentx-blue">Sample opportunities</h2>
        <p className="mt-2 max-w-2xl text-bcentx-gray">
          Scores, risk, skill, and startup-cost badges preview the trust-first comparison UI.
        </p>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {demoOpportunities.map((item) => (
            <OpportunityCard key={item.title} {...item} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-2xl font-bold text-bcentx-blue">From the Learning Centre</h2>
        <p className="mt-2 max-w-2xl text-bcentx-gray">
          Preserves the V1 learning feel with cleaner article cards.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {demoArticles.map((item) => (
            <ArticleCard key={item.title} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
}
