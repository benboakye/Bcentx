"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteCountryAvailability } from "@/app/admin/availability/actions";
import { Button } from "@/components/ui/Button";

export function DeleteAvailabilityButton({ id }: { id: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      variant="secondary"
      size="sm"
      disabled={pending}
      onClick={() => {
        if (!window.confirm("Delete this availability record?")) {
          return;
        }
        startTransition(async () => {
          const result = await deleteCountryAvailability(id);
          if (result?.error) {
            window.alert(result.error);
            return;
          }
          router.refresh();
        });
      }}
    >
      {pending ? "Deleting…" : "Delete"}
    </Button>
  );
}
