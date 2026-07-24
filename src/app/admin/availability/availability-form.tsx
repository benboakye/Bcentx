"use client";

import { useActionState } from "react";
import type { AvailabilityActionState } from "@/app/admin/availability/actions";
import { Button } from "@/components/ui/Button";
import type { AvailabilityStatus, CountryAvailabilityRow } from "@/types/database";

const STATUS_OPTIONS: { value: AvailabilityStatus; label: string }[] = [
  { value: "available", label: "Available" },
  { value: "limited", label: "Limited" },
  { value: "unavailable", label: "Unavailable" },
  { value: "unknown", label: "Unknown" },
  { value: "verify", label: "Verify locally" },
];

const fieldClass =
  "w-full rounded-md border border-bcentx-blue/20 bg-white px-3 py-2 text-sm text-foreground outline-none ring-bcentx-green focus:ring-2";
const labelClass = "mb-1 block text-sm font-medium text-bcentx-blue";

type Option = { id: string; name: string; iso_code?: string };

export function AvailabilityForm({
  record,
  countries,
  opportunities,
  platforms,
  action,
  submitLabel,
}: {
  record?: CountryAvailabilityRow;
  countries: Option[];
  opportunities: Option[];
  platforms: Option[];
  action: (
    prev: AvailabilityActionState,
    formData: FormData,
  ) => Promise<AvailabilityActionState>;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, {});

  if (countries.length === 0) {
    return (
      <p className="rounded-md bg-risk-amber-soft px-3 py-2 text-sm text-risk-amber">
        Create at least one country before adding availability records.
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

      <div>
        <label htmlFor="country_id" className={labelClass}>
          Country
        </label>
        <select
          id="country_id"
          name="country_id"
          required
          defaultValue={record?.country_id ?? countries[0]?.id}
          className={fieldClass}
        >
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
              {country.iso_code ? ` (${country.iso_code})` : ""}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="opportunity_id" className={labelClass}>
            Opportunity (optional)
          </label>
          <select
            id="opportunity_id"
            name="opportunity_id"
            defaultValue={record?.opportunity_id ?? ""}
            className={fieldClass}
          >
            <option value="">None</option>
            {opportunities.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="platform_id" className={labelClass}>
            Platform (optional)
          </label>
          <select
            id="platform_id"
            name="platform_id"
            defaultValue={record?.platform_id ?? ""}
            className={fieldClass}
          >
            <option value="">None</option>
            {platforms.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <p className="text-xs text-bcentx-gray">
        At least one of opportunity or platform must be selected.
      </p>

      <div>
        <label htmlFor="availability_status" className={labelClass}>
          Availability status
        </label>
        <select
          id="availability_status"
          name="availability_status"
          required
          defaultValue={record?.availability_status ?? "verify"}
          className={fieldClass}
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="notes" className={labelClass}>
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          defaultValue={record?.notes ?? ""}
          className={fieldClass}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="official_source_url" className={labelClass}>
            Official source URL
          </label>
          <input
            id="official_source_url"
            name="official_source_url"
            type="url"
            defaultValue={record?.official_source_url ?? ""}
            placeholder="https://"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="last_verified_at" className={labelClass}>
            Last verified
          </label>
          <input
            id="last_verified_at"
            name="last_verified_at"
            type="date"
            defaultValue={record?.last_verified_at ?? ""}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <Button type="submit" variant="primary" disabled={pending}>
          {pending ? "Saving…" : submitLabel}
        </Button>
        <Button href="/admin/availability" variant="secondary">
          Cancel
        </Button>
      </div>
    </form>
  );
}
