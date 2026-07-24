import { CardLink } from "@/components/ui/Card";
import { CountryAvailabilityBadge } from "@/components/ui/Badge";
import { LastVerifiedDate } from "@/components/ui/WarningBox";
import type { AvailabilityStatus } from "@/lib/types";

export function PlatformCard({
  href,
  title,
  summary,
  availability,
  lastVerified,
}: {
  href: string;
  title: string;
  summary: string;
  availability: AvailabilityStatus;
  lastVerified: string;
}) {
  return (
    <CardLink href={href}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="text-lg font-semibold text-bcentx-blue">{title}</h3>
        <CountryAvailabilityBadge status={availability} />
      </div>
      <p className="mt-2 text-sm leading-relaxed text-foreground/80">{summary}</p>
      <div className="mt-4">
        <LastVerifiedDate date={lastVerified} />
      </div>
    </CardLink>
  );
}
