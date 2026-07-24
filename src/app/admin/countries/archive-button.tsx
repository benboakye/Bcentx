"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { archiveCountry } from "@/app/admin/countries/actions";
import { Button } from "@/components/ui/Button";

export function ArchiveCountryButton({
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
            `Archive “${name}”? It will no longer appear on public pages.`,
          )
        ) {
          return;
        }
        startTransition(async () => {
          const result = await archiveCountry(id);
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
