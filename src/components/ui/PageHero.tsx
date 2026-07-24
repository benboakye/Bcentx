import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  children?: ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  children,
}: PageHeroProps) {
  return (
    <section className="bg-gradient-to-b from-bcentx-blue to-bcentx-blue/90 px-4 py-14 text-white sm:py-16">
      <div className="mx-auto max-w-6xl">
        {eyebrow ? (
          <p className="text-sm font-semibold uppercase tracking-wider text-bcentx-green-soft">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
          {description}
        </p>
        {(primaryCta || secondaryCta) && (
          <div className="mt-8 flex flex-wrap gap-3">
            {primaryCta ? (
              <Button href={primaryCta.href} variant="primary">
                {primaryCta.label}
              </Button>
            ) : null}
            {secondaryCta ? (
              <Button href={secondaryCta.href} variant="ghost">
                {secondaryCta.label}
              </Button>
            ) : null}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
