import Link from "next/link";

const shells = [
  {
    href: "/categories",
    title: "Categories",
    body: "Explore wealth-building categories with clear risk and startup context.",
  },
  {
    href: "/opportunities",
    title: "Opportunities",
    body: "Compare structured opportunities — how money is made and how it can be lost.",
  },
  {
    href: "/blog",
    title: "Learning Centre",
    body: "Beginner-friendly guides that preserve the V1 Learning Centre spirit.",
  },
  {
    href: "/roadmaps",
    title: "Roadmaps",
    body: "Step-by-step beginner paths for realistic income and skill building.",
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="bg-gradient-to-b from-bcentx-blue to-bcentx-blue/90 px-4 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-bcentx-green-soft">
            Bcentx 2.0 foundation
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Financial Growth, Simplified
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/90">
            Discover legitimate wealth-building paths with honest risk warnings,
            country awareness, and beginner-friendly guidance — without the hype.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/categories"
              className="inline-flex rounded-md bg-bcentx-green px-5 py-2.5 text-sm font-semibold text-white no-underline transition-colors hover:bg-bcentx-green-dark hover:text-white"
            >
              Explore categories
            </Link>
            <Link
              href="/blog"
              className="inline-flex rounded-md border border-white/40 bg-transparent px-5 py-2.5 text-sm font-semibold text-white no-underline transition-colors hover:bg-white/10 hover:text-white"
            >
              Visit Learning Centre
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-bcentx-blue">Choose your starting path</h2>
        <p className="mt-2 max-w-2xl text-bcentx-gray">
          Route shells for Sprint 1. Full database-backed pages come in later sprints.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {shells.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl bg-card p-6 shadow-sm no-underline transition-shadow hover:shadow-md"
            >
              <h3 className="text-xl font-semibold text-bcentx-blue">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">{item.body}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
