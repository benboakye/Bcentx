import { CardLink } from "@/components/ui/Card";

export function ArticleCard({
  href,
  title,
  excerpt,
  category,
}: {
  href: string;
  title: string;
  excerpt: string;
  category: string;
}) {
  return (
    <CardLink href={href}>
      <p className="text-xs font-semibold uppercase tracking-wide text-bcentx-gray">
        {category}
      </p>
      <h3 className="mt-2 text-lg font-semibold text-bcentx-blue">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-foreground/80">{excerpt}</p>
      <span className="mt-4 inline-block text-sm font-semibold text-bcentx-green">
        Read guide →
      </span>
    </CardLink>
  );
}
