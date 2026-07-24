"use client";

import { useActionState } from "react";
import type { LinkActionState } from "@/app/admin/opportunities/platform-links-actions";
import { Button } from "@/components/ui/Button";

type PlatformOption = { id: string; name: string; platform_type: string };

export function OpportunityPlatformLinksForm({
  selectedIds,
  platforms,
  action,
}: {
  selectedIds: string[];
  platforms: PlatformOption[];
  action: (
    prev: LinkActionState,
    formData: FormData,
  ) => Promise<LinkActionState>;
}) {
  const [state, formAction, pending] = useActionState(action, {});
  const selected = new Set(selectedIds);

  if (platforms.length === 0) {
    return (
      <p className="text-sm text-bcentx-gray">
        No platforms available yet. Create platforms first, then link them here.
      </p>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      {state.error ? (
        <p className="rounded-md bg-risk-red-soft px-3 py-2 text-sm text-risk-red" role="alert">
          {state.error}
        </p>
      ) : null}
      {state.success ? (
        <p className="rounded-md bg-bcentx-green-soft px-3 py-2 text-sm text-bcentx-green-dark">
          {state.success}
        </p>
      ) : null}

      <ul className="max-h-72 space-y-2 overflow-y-auto rounded-md border border-bcentx-blue/10 bg-[#f7fbff] p-3">
        {platforms.map((platform) => (
          <li key={platform.id}>
            <label className="flex cursor-pointer items-start gap-2 text-sm text-bcentx-blue">
              <input
                type="checkbox"
                name="platform_ids"
                value={platform.id}
                defaultChecked={selected.has(platform.id)}
                className="mt-0.5 h-4 w-4 rounded border-bcentx-blue/30 text-bcentx-green focus:ring-bcentx-green"
              />
              <span>
                <span className="font-semibold">{platform.name}</span>
                <span className="ml-2 text-xs capitalize text-bcentx-gray">
                  {platform.platform_type}
                </span>
              </span>
            </label>
          </li>
        ))}
      </ul>

      <Button type="submit" variant="secondary" disabled={pending}>
        {pending ? "Saving links…" : "Save platform links"}
      </Button>
    </form>
  );
}
