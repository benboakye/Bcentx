import { PageShell } from "@/components/PageShell";
import { RoadmapCard } from "@/components/cards/RoadmapCard";
import { demoRoadmaps } from "@/lib/demo-content";

export const metadata = {
  title: "Roadmaps",
};

export default function RoadmapsPage() {
  return (
    <PageShell
      title="Beginner Roadmaps"
      description="Roadmap cards preview step counts and skill levels for guided beginner paths."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {demoRoadmaps.map((item) => (
          <RoadmapCard key={item.title} {...item} />
        ))}
      </div>
    </PageShell>
  );
}
