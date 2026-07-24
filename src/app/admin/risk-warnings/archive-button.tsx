"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { archiveRiskWarning } from "@/app/admin/risk-warnings/actions";
import { Button } from "@/components/ui/Button";

export function ArchiveRiskWarningButton({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      variant="secondary"
      size="sm"
      disabled={pending}
      onClick={() => {
        if (
          !window.confirm(
            `Archive “${title}”? It will no longer appear on public pages.`,
          )
        ) {
          return;
        }
        startTransition(async () => {
          const result = await archiveRiskWarning(id);
          if (result?.error) {
            window.alert(result.error);
            return;
          }
          router.refresh();
        });
      }}
    >
      {pending ? "Archiving…" : "Archive"}
    </Button>
  );
}
