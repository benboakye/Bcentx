import { PageShell } from "@/components/PageShell";

export const metadata = {
  title: "Admin",
};

export default function AdminPage() {
  return (
    <PageShell
      title="Admin Dashboard"
      description="Placeholder shell only. Sprint 1 does not include auth protection, Supabase schema depth, or admin CRUD. Those come in later sprints."
    />
  );
}
