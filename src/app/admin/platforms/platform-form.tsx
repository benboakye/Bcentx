"use client";

import { useActionState, useEffect, useState } from "react";
import type { PlatformActionState } from "@/app/admin/platforms/actions";
import { Button } from "@/components/ui/Button";
import { slugify } from "@/lib/admin/slug";
import type { ContentStatus, PlatformRow } from "@/types/database";

const STATUS_OPTIONS: { value: ContentStatus; label: string }[] = [
  { value: "draft", label: "Draft" },
  { value: "review", label: "Review" },
  { value: "published", label: "Published" },
  { value: "needs_update", label: "Needs update" },
  { value: "archived", label: "Archived" },
  { value: "rejected", label: "Rejected" },
];

const PLATFORM_TYPE_OPTIONS = [
  "marketplace",
  "broker",
  "bank",
  "payment",
  "freelance",
  "education",
  "affiliate",
  "investment",
  "other",
];

const fieldClass =
  "w-full rounded-md border border-bcentx-blue/20 bg-white px-3 py-2 text-sm text-foreground outline-none ring-bcentx-green focus:ring-2";
const labelClass = "mb-1 block text-sm font-medium text-bcentx-blue";

type PlatformFormProps = {
  platform?: PlatformRow;
  action: (
    prev: PlatformActionState,
    formData: FormData,
  ) => Promise<PlatformActionState>;
  submitLabel: string;
};

export function PlatformForm({
  platform,
  action,
  submitLabel,
}: PlatformFormProps) {
  const [state, formAction, pending] = useActionState(action, {});
  const [name, setName] = useState(platform?.name ?? "");
  const [slug, setSlug] = useState(platform?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(platform?.slug));

  useEffect(() => {
    if (!slugTouched) {
      setSlug(slugify(name));
    }
  }, [name, slugTouched]);

  return (
    <form action={formAction} className="space-y-5">
      {state.error ? (
        <p className="rounded-md bg-risk-red-soft px-3 py-2 text-sm text-risk-red" role="alert">
          {state.error}
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="platform_type" className={labelClass}>
            Platform type
          </label>
          <select
            id="platform_type"
            name="platform_type"
            required
            defaultValue={platform?.platform_type ?? "other"}
            className={fieldClass}
          >
            {PLATFORM_TYPE_OPTIONS.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="slug" className={labelClass}>
            Slug
          </label>
          <input
            id="slug"
            name="slug"
            required
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(e.target.value);
            }}
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
            defaultValue={platform?.status ?? "draft"}
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
        <label htmlFor="website_url" className={labelClass}>
          Website URL
        </label>
        <input
          id="website_url"
          name="website_url"
          type="url"
          defaultValue={platform?.website_url ?? ""}
          placeholder="https://"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="summary" className={labelClass}>
          Summary
        </label>
        <textarea
          id="summary"
          name="summary"
          required
          rows={3}
          defaultValue={platform?.summary ?? ""}
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="description" className={labelClass}>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={platform?.description ?? ""}
          className={fieldClass}
        />
      </div>

      {(
        [
          ["pricing_summary", "Pricing summary"],
          ["fee_notes", "Fee notes"],
          ["country_restrictions", "Country restrictions"],
          ["payout_methods", "Payout methods"],
          ["risk_notes", "Risk notes"],
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
            defaultValue={platform?.[id] ?? ""}
            className={fieldClass}
          />
        </div>
      ))}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="trust_rating" className={labelClass}>
            Trust rating (0–100)
          </label>
          <input
            id="trust_rating"
            name="trust_rating"
            type="number"
            min={0}
            max={100}
            step={0.01}
            defaultValue={platform?.trust_rating ?? ""}
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
            defaultValue={platform?.last_verified_at ?? ""}
            className={fieldClass}
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-bcentx-blue">
        <input
          type="checkbox"
          name="has_affiliate_program"
          defaultChecked={platform?.has_affiliate_program ?? false}
          className="h-4 w-4 rounded border-bcentx-blue/30 text-bcentx-green focus:ring-bcentx-green"
        />
        Has affiliate program (disclose clearly if linking)
      </label>

      <div>
        <label htmlFor="seo_title" className={labelClass}>
          SEO title
        </label>
        <input
          id="seo_title"
          name="seo_title"
          defaultValue={platform?.seo_title ?? ""}
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="seo_description" className={labelClass}>
          SEO description
        </label>
        <textarea
          id="seo_description"
          name="seo_description"
          rows={2}
          defaultValue={platform?.seo_description ?? ""}
          className={fieldClass}
        />
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <Button type="submit" variant="primary" disabled={pending}>
          {pending ? "Saving…" : submitLabel}
        </Button>
        <Button href="/admin/platforms" variant="secondary">
          Cancel
        </Button>
      </div>
    </form>
  );
}
