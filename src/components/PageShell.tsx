import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";

type PageShellProps = {
  title: string;
  description: string;
  children?: ReactNode;
  /** Small uppercase label above the title */
  eyebrow?: string;
  /**
   * contained — white panel wraps everything (default)
   * layered — white intro panel, children sit on page background for card contrast
   */
  layout?: "contained" | "layered";
};

export function PageShell({
  title,
  description,
  children,
  eyebrow = "Bcentx",
  layout = "contained",
}: PageShellProps) {
  const header = (
    <>
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-bcentx-green-dark">
        {eyebrow}
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-bcentx-blue sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-bcentx-gray">
        {description}
      </p>
    </>
  );

  if (layout === "layered") {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <section className="rounded-2xl border border-bcentx-blue/10 bg-white p-6 shadow-[0_4px_20px_rgba(27,20,94,0.06)] sm:p-8">
          {header}
        </section>

        {children ? <div className="mt-7">{children}</div> : null}

        <div className="mt-10">
          <Button href="/" variant="primary">
            Back to home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <section className="rounded-2xl border border-bcentx-blue/10 bg-white p-6 shadow-[0_4px_20px_rgba(27,20,94,0.06)] sm:p-8">
        {header}
        {children ? <div className="mt-8">{children}</div> : null}
        <div className="mt-8">
          <Button href="/" variant="primary">
            Back to home
          </Button>
        </div>
      </section>
    </div>
  );
}
