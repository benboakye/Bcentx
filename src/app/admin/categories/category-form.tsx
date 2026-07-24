"use client";

import { useActionState, useEffect, useState } from "react";
import type { CategoryActionState } from "@/app/admin/categories/actions";
import { Button } from "@/components/ui/Button";
import { slugify } from "@/lib/admin/slug";
import type { CategoryRow, ContentStatus, RiskLevel } from "@/types/database";

const RISK_OPTIONS: { value: RiskLevel; label: string }[] = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "very_high", label: "Very high" },
  { value: "critical", label: "Critical" },
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

type CategoryFormProps = {
  category?: CategoryRow;
  action: (
    prev: CategoryActionState,
    formData: FormData,
  ) => Promise<CategoryActionState>;
  submitLabel: string;
};

export function CategoryForm({
  category,
  action,
  submitLabel,
}: CategoryFormProps) {
  const [state, formAction, pending] = useActionState(action, {});
  const [name, setName] = useState(category?.name ?? "");
  const [slug, setSlug] = useState(category?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(category?.slug));

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
          <label htmlFor="code" className={labelClass}>
            Code
          </label>
          <input
            id="code"
            name="code"
            required
            defaultValue={category?.code ?? ""}
            placeholder="CAT-013"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="display_order" className={labelClass}>
            Display order
          </label>
          <input
            id="display_order"
            name="display_order"
            type="number"
            required
            defaultValue={category?.display_order ?? 0}
            className={fieldClass}
          />
        </div>
      </div>

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
        <p className="mt-1 text-xs text-bcentx-gray">
          Public URL: /categories/{slug || "…"}
        </p>
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
          defaultValue={category?.summary ?? ""}
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="full_overview" className={labelClass}>
          Full overview
        </label>
        <textarea
          id="full_overview"
          name="full_overview"
          rows={6}
          defaultValue={category?.full_overview ?? ""}
          className={fieldClass}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="risk_level" className={labelClass}>
            Typical risk level
          </label>
          <select
            id="risk_level"
            name="risk_level"
            required
            defaultValue={category?.risk_level ?? "medium"}
            className={fieldClass}
          >
            {RISK_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="status" className={labelClass}>
            Status
          </label>
          <select
            id="status"
            name="status"
            required
            defaultValue={category?.status ?? "draft"}
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

      <label className="flex items-center gap-2 text-sm text-bcentx-blue">
        <input
          type="checkbox"
          name="beginner_friendly"
          defaultChecked={category?.beginner_friendly ?? false}
          className="h-4 w-4 rounded border-bcentx-blue/30 text-bcentx-green focus:ring-bcentx-green"
        />
        Beginner-friendly
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="icon_name" className={labelClass}>
            Icon name
          </label>
          <input
            id="icon_name"
            name="icon_name"
            defaultValue={category?.icon_name ?? ""}
            placeholder="optional"
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
            defaultValue={category?.last_verified_at ?? ""}
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="seo_title" className={labelClass}>
          SEO title
        </label>
        <input
          id="seo_title"
          name="seo_title"
          defaultValue={category?.seo_title ?? ""}
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
          defaultValue={category?.seo_description ?? ""}
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="canonical_url" className={labelClass}>
          Canonical URL
        </label>
        <input
          id="canonical_url"
          name="canonical_url"
          type="url"
          defaultValue={category?.canonical_url ?? ""}
          placeholder="https://"
          className={fieldClass}
        />
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <Button type="submit" variant="primary" disabled={pending}>
          {pending ? "Saving…" : submitLabel}
        </Button>
        <Button href="/admin/categories" variant="secondary">
          Cancel
        </Button>
      </div>
    </form>
  );
}
