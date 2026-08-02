"use client";

import { useActionState } from "react";
import type { AffiliateActionState } from "@/app/admin/affiliates/actions";
import { Button } from "@/components/ui/Button";
import type {
  AffiliateProgramRow,
  CommissionType,
  ContentStatus,
} from "@/types/database";

const COMMISSION_OPTIONS: { value: CommissionType; label: string }[] = [
  { value: "fixed", label: "Fixed" },
  { value: "percentage", label: "Percentage" },
  { value: "recurring", label: "Recurring" },
  { value: "revenue_share", label: "Revenue share" },
  { value: "hybrid", label: "Hybrid" },
  { value: "unknown", label: "Unknown" },
];

const STATUS_OPTIONS: { value: ContentStatus; label: string }[] = [
  { value: "draft", label: "Draft" },
  { value: "review", label: "Review" },
  { value: "published", label: "Published" },
  { value: "needs_update", label: "Needs update" },
  { value: "archived", label: "Archived" },
  { value: "rejected", label: "Rejected" },
];

const fieldClass =
  "w-full rounded-md border border-bcentx-blue/20 bg-white px-3 py-2 text-sm text-foreground outline-none ring-bcentx-green focus:ring-2";
const labelClass = "mb-1 block text-sm font-medium text-bcentx-blue";

type PlatformOption = { id: string; name: string; platform_type: string };

export function AffiliateProgramForm({
  program,
  platforms,
  action,
  submitLabel,
}: {
  program?: AffiliateProgramRow;
  platforms: PlatformOption[];
  action: (
    prev: AffiliateActionState,
    formData: FormData,
  ) => Promise<AffiliateActionState>;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, {});

  if (platforms.length === 0) {
    return (
      <p className="rounded-md bg-risk-amber-soft px-3 py-2 text-sm text-risk-amber">
        Create at least one platform before adding affiliate programs.
      </p>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      {state.error ? (
        <p className="rounded-md bg-risk-red-soft px-3 py-2 text-sm text-risk-red" role="alert">
          {state.error}
        </p>
      ) : null}

      <p className="rounded-md border border-l-4 border-risk-amber/35 border-l-risk-amber bg-risk-amber-soft px-3 py-2 text-sm text-risk-amber">
        Affiliate commission must never change Bcentx scores or editorial verdicts.
        Disclosure is always required when publishing affiliate links.
      </p>

      <div>
        <label htmlFor="platform_id" className={labelClass}>
          Platform
        </label>
        <select
          id="platform_id"
          name="platform_id"
          required
          defaultValue={program?.platform_id ?? platforms[0]?.id}
          className={fieldClass}
        >
          {platforms.map((platform) => (
            <option key={platform.id} value={platform.id}>
              {platform.name} ({platform.platform_type})
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="program_name" className={labelClass}>
            Program name
          </label>
          <input
            id="program_name"
            name="program_name"
            required
            defaultValue={program?.program_name ?? ""}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="status" className={labelClass}>
            Status
          </label>
          <select
            id="status"
            name="status"
            required
            defaultValue={program?.status ?? "review"}
            className={fieldClass}
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="affiliate_url" className={labelClass}>
          Affiliate URL
        </label>
        <input
          id="affiliate_url"
          name="affiliate_url"
          type="url"
          defaultValue={program?.affiliate_url ?? ""}
          placeholder="https://"
          className={fieldClass}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="commission_type" className={labelClass}>
            Commission type
          </label>
          <select
            id="commission_type"
            name="commission_type"
            required
            defaultValue={program?.commission_type ?? "unknown"}
            className={fieldClass}
          >
            {COMMISSION_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="last_verified_at" className={labelClass}>
            Last verified
          </label>
          <input
            id="last_verified_at"
            name="last_verified_at"
            type="date"
            defaultValue={program?.last_verified_at ?? ""}
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="commission_details" className={labelClass}>
          Commission details
        </label>
        <textarea
          id="commission_details"
          name="commission_details"
          rows={3}
          defaultValue={program?.commission_details ?? ""}
          placeholder="Educational description only — not a promise of earnings."
          className={fieldClass}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cookie_duration" className={labelClass}>
            Cookie duration
          </label>
          <input
            id="cookie_duration"
            name="cookie_duration"
            defaultValue={program?.cookie_duration ?? ""}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="payout_threshold" className={labelClass}>
            Payout threshold
          </label>
          <input
            id="payout_threshold"
            name="payout_threshold"
            defaultValue={program?.payout_threshold ?? ""}
            className={fieldClass}
          />
        </div>
      </div>

      {(
        [
          ["payout_methods", "Payout methods"],
          ["country_restrictions", "Country restrictions"],
          ["promotional_rules", "Promotional rules"],
        ] as const
      ).map(([id, label]) => (
        <div key={id}>
          <label htmlFor={id} className={labelClass}>
            {label}
          </label>
          <textarea
            id={id}
            name={id}
            rows={2}
            defaultValue={program?.[id] ?? ""}
            className={fieldClass}
          />
        </div>
      ))}

      <p className="text-xs text-bcentx-gray">
        Disclosure required is always enforced as true for published affiliate relationships.
      </p>

      <div className="flex flex-wrap gap-3 pt-2">
        <Button type="submit" variant="primary" disabled={pending}>
          {pending ? "Saving…" : submitLabel}
        </Button>
        <Button href="/admin/affiliates" variant="secondary">
          Cancel
        </Button>
      </div>
    </form>
  );
}
