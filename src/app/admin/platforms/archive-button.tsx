"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { archivePlatform } from "@/app/admin/platforms/actions";
import { Button } from "@/components/ui/Button";

export function ArchivePlatformButton({
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
          const result = await archivePlatform(id);
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
