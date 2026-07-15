import Link from "next/link";
import type { ReactNode } from "react";

type PageShellProps = {
  title: string;
  description: string;
  children?: ReactNode;
};

export function PageShell({ title, description, children }: PageShellProps) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <section className="rounded-xl bg-card p-6 shadow-sm sm:p-8">
        <p className="mb-2 text-sm font-medium uppercase tracking-wide text-bcentx-gray">
          Sprint 1 shell
        </p>
        <h1 className="text-3xl font-bold text-bcentx-blue sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-foreground/80">
          {description}
        </p>
        {children}
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex rounded-md bg-bcentx-green px-5 py-2.5 text-sm font-semibold text-white no-underline transition-colors hover:bg-bcentx-green-dark hover:text-white"
          >
            Back to home
          </Link>
        </div>
      </section>
    </div>
  );
}
