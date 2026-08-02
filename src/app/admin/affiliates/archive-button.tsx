"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { archiveAffiliateProgram } from "@/app/admin/affiliates/actions";
import { Button } from "@/components/ui/Button";

export function ArchiveAffiliateButton({
  id,
  name,
}: {
  id: string;
  name: string;
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
            `Archive “${name}”? Affiliate links for this program will leave public pages.`,
          )
        ) {
          return;
        }
        startTransition(async () => {
          const result = await archiveAffiliateProgram(id);
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
