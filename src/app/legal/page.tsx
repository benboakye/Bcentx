import { PageShell } from "@/components/PageShell";
import { AffiliateDisclosureBox, WarningBox } from "@/components/ui/WarningBox";

export const metadata = {
  title: "Legal & Disclosures",
};

export default function LegalPage() {
  return (
    <PageShell
      title="Legal & Disclosures"
      description="Shell for legal pages. These reusable disclosure components will appear across opportunity and platform pages."
    >
      <div className="space-y-4">
        <WarningBox variant="caution" title="Not personalized advice">
          Bcentx provides educational information only. It is not personalized financial, legal, tax,
          or immigration advice.
        </WarningBox>
        <AffiliateDisclosureBox />
        <WarningBox variant="danger" title="No guaranteed income">
          Bcentx does not promise profits, passive income without work, or risk-free outcomes.
        </WarningBox>
      </div>
    </PageShell>
  );
}
