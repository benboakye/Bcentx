"use client";

import { useActionState, useState } from "react";
import type { CountryActionState } from "@/app/admin/countries/actions";
import { Button } from "@/components/ui/Button";
import { slugify } from "@/lib/admin/slug";
import type { ContentStatus, CountryRow } from "@/types/database";

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

type CountryFormProps = {
  country?: CountryRow;
  action: (
    prev: CountryActionState,
    formData: FormData,
  ) => Promise<CountryActionState>;
  submitLabel: string;
};

export function CountryForm({ country, action, submitLabel }: CountryFormProps) {
  const [state, formAction, pending] = useActionState(action, {});
  const [name, setName] = useState(country?.name ?? "");
  const [slug, setSlug] = useState(country?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(country?.slug));

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
            onChange={(e) => {
              const nextName = e.target.value;
              setName(nextName);
              if (!slugTouched) setSlug(slugify(nextName));
            }}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="iso_code" className={labelClass}>
            ISO code
          </label>
          <input
            id="iso_code"
            name="iso_code"
            required
            maxLength={3}
            defaultValue={country?.iso_code ?? ""}
            placeholder="GH"
            className={fieldClass}
          />
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
            defaultValue={country?.status ?? "draft"}
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

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="region" className={labelClass}>
            Region
          </label>
          <input
            id="region"
            name="region"
            defaultValue={country?.region ?? ""}
            placeholder="Africa"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="currency_code" className={labelClass}>
            Currency code
          </label>
          <input
            id="currency_code"
            name="currency_code"
            maxLength={3}
            defaultValue={country?.currency_code ?? ""}
            placeholder="GHS"
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="summary" className={labelClass}>
          Summary
        </label>
        <textarea
          id="summary"
          name="summary"
          rows={3}
          defaultValue={country?.summary ?? ""}
          className={fieldClass}
        />
      </div>

      {(
        [
          ["payment_notes", "Payment notes"],
          ["tax_notes", "Tax notes"],
          ["regulator_notes", "Regulator notes"],
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
            rows={3}
            defaultValue={country?.[id] ?? ""}
            className={fieldClass}
          />
        </div>
      ))}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="seo_title" className={labelClass}>
            SEO title
          </label>
          <input
            id="seo_title"
            name="seo_title"
            defaultValue={country?.seo_title ?? ""}
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
            defaultValue={country?.last_verified_at ?? ""}
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="seo_description" className={labelClass}>
          SEO description
        </label>
        <textarea
          id="seo_description"
          name="seo_description"
          rows={2}
          defaultValue={country?.seo_description ?? ""}
          className={fieldClass}
        />
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <Button type="submit" variant="primary" disabled={pending}>
          {pending ? "Saving…" : submitLabel}
        </Button>
        <Button href="/admin/countries" variant="secondary">
          Cancel
        </Button>
      </div>
    </form>
  );
}
