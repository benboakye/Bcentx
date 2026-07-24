import { PageShell } from "@/components/PageShell";
import { Card } from "@/components/ui/Card";

const terms = [
  {
    term: "Bcentx score",
    definition:
      "A structured editorial indicator based on clarity, risk, feasibility, and transparency — never affiliate commission.",
  },
  {
    term: "Startup cost",
    definition: "Approximate capital needed to begin an opportunity, not a guarantee of results.",
  },
  {
    term: "Country availability",
    definition:
      "Whether a platform or opportunity generally works in a region. Always verify current local rules.",
  },
];

export const metadata = {
  title: "Glossary",
};

export default function GlossaryPage() {
  return (
    <PageShell
      title="Glossary"
      description="Starter glossary layout. Full term records will become database-backed later."
    >
      <div className="space-y-4">
        {terms.map((item) => (
          <Card key={item.term} className="!shadow-none border border-bcentx-blue/10">
            <h2 className="text-lg font-semibold text-bcentx-blue">{item.term}</h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground/80">{item.definition}</p>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
