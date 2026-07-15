import { PageShell } from "@/components/PageShell";

export const metadata = {
  title: "Opportunities",
};

export default function OpportunitiesPage() {
  return (
    <PageShell
      title="Opportunities"
      description="Shell for opportunity listings and detail pages. Content will be database-driven with scoring, startup cost, skill level, and risk badges."
    />
  );
}
