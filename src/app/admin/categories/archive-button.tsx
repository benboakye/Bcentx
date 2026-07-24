"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { archiveCategory } from "@/app/admin/categories/actions";
import { Button } from "@/components/ui/Button";

export function ArchiveCategoryButton({
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
          const result = await archiveCategory(id);
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
