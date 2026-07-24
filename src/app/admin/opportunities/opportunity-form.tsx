"use client";

import { useActionState, useEffect, useState } from "react";
import type { OpportunityActionState } from "@/app/admin/opportunities/actions";
import { Button } from "@/components/ui/Button";
import { slugify } from "@/lib/admin/slug";
import type {
  ContentStatus,
  LevelScale,
  LiquidityLevel,
  OpportunityRow,
  RiskLevel,
  SkillLevel,
  TimeToIncome,
} from "@/types/database";

const LEVEL_OPTIONS: { value: LevelScale; label: string }[] = [
  { value: "none", label: "None" },
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "very_high", label: "Very high" },
];

const SKILL_OPTIONS: { value: SkillLevel; label: string }[] = [
  { value: "low", label: "Low / beginner" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "expert", label: "Expert" },
];

const RISK_OPTIONS: { value: RiskLevel; label: string }[] = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "very_high", label: "Very high" },
  { value: "critical", label: "Critical" },
];

const TIME_OPTIONS: { value: TimeToIncome; label: string }[] = [
  { value: "immediate", label: "Immediate" },
  { value: "short_term", label: "Short term" },
  { value: "medium_term", label: "Medium term" },
  { value: "long_term", label: "Long term" },
  { value: "uncertain", label: "Uncertain" },
];

const LIQUIDITY_OPTIONS: { value: LiquidityLevel; label: string }[] = [
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
  { value: "very_low", label: "Very low" },
  { value: "not_applicable", label: "Not applicable" },
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
const sectionClass = "space-y-4 border-t border-bcentx-blue/10 pt-5";

type CategoryOption = { id: string; name: string; code: string };

type OpportunityFormProps = {
  opportunity?: OpportunityRow;
  categories: CategoryOption[];
  action: (
    prev: OpportunityActionState,
    formData: FormData,
  ) => Promise<OpportunityActionState>;
  submitLabel: string;
};

export function OpportunityForm({
  opportunity,
  categories,
  action,
  submitLabel,
}: OpportunityFormProps) {
  const [state, formAction, pending] = useActionState(action, {});
  const [name, setName] = useState(opportunity?.name ?? "");
  const [slug, setSlug] = useState(opportunity?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(opportunity?.slug));

  useEffect(() => {
    if (!slugTouched) {
      setSlug(slugify(name));
    }
  }, [name, slugTouched]);

  if (categories.length === 0) {
    return (
      <p className="rounded-md bg-risk-amber-soft px-3 py-2 text-sm text-risk-amber">
        Create at least one category before adding opportunities.
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

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="category_id" className={labelClass}>
            Category
          </label>
          <select
            id="category_id"
            name="category_id"
            required
            defaultValue={opportunity?.category_id ?? categories[0]?.id}
            className={fieldClass}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name} ({category.code})
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
            defaultValue={opportunity?.status ?? "draft"}
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
          Public URL: /opportunities/{slug || "…"}
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
          defaultValue={opportunity?.summary ?? ""}
          className={fieldClass}
        />
      </div>

      <div className={sectionClass}>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-bcentx-gray">
          Narrative
        </h2>
        {(
          [
            ["description", "Description", 4],
            ["how_money_is_made", "How money is made", 3],
            ["how_money_is_lost", "How money can be lost", 3],
            ["best_for", "Best for", 2],
            ["not_suitable_for", "Not suitable for", 2],
          ] as const
        ).map(([id, label, rows]) => (
          <div key={id}>
            <label htmlFor={id} className={labelClass}>
              {label}
            </label>
            <textarea
              id={id}
              name={id}
              rows={rows}
              defaultValue={opportunity?.[id] ?? ""}
              className={fieldClass}
            />
          </div>
        ))}
      </div>

      <div className={sectionClass}>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-bcentx-gray">
          Levels & risk
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <SelectField
            id="startup_cost_level"
            label="Startup cost"
            defaultValue={opportunity?.startup_cost_level ?? "medium"}
            options={LEVEL_OPTIONS}
          />
          <SelectField
            id="capital_required_level"
            label="Capital required"
            defaultValue={opportunity?.capital_required_level ?? "medium"}
            options={LEVEL_OPTIONS}
          />
          <SelectField
            id="skill_required_level"
            label="Skill required"
            defaultValue={opportunity?.skill_required_level ?? "medium"}
            options={SKILL_OPTIONS}
          />
          <SelectField
            id="time_to_income"
            label="Time to income"
            defaultValue={opportunity?.time_to_income ?? "uncertain"}
            options={TIME_OPTIONS}
          />
          <SelectField
            id="scalability"
            label="Scalability"
            defaultValue={opportunity?.scalability ?? "medium"}
            options={LEVEL_OPTIONS}
          />
          <SelectField
            id="liquidity_level"
            label="Liquidity"
            defaultValue={opportunity?.liquidity_level ?? "not_applicable"}
            options={LIQUIDITY_OPTIONS}
          />
          <SelectField
            id="risk_level"
            label="Risk level"
            defaultValue={opportunity?.risk_level ?? "medium"}
            options={RISK_OPTIONS}
          />
          <SelectField
            id="scam_risk_level"
            label="Scam risk"
            defaultValue={opportunity?.scam_risk_level ?? "medium"}
            options={RISK_OPTIONS}
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-bcentx-blue">
          <input
            type="checkbox"
            name="beginner_friendly"
            defaultChecked={opportunity?.beginner_friendly ?? false}
            className="h-4 w-4 rounded border-bcentx-blue/30 text-bcentx-green focus:ring-bcentx-green"
          />
          Beginner-friendly
        </label>
      </div>

      <div className={sectionClass}>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-bcentx-gray">
          Score & editorial
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="bcentx_score" className={labelClass}>
              Bcentx score (0–100)
            </label>
            <input
              id="bcentx_score"
              name="bcentx_score"
              type="number"
              min={0}
              max={100}
              step={0.01}
              defaultValue={opportunity?.bcentx_score ?? ""}
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="estimated_time_horizon" className={labelClass}>
              Estimated time horizon
            </label>
            <input
              id="estimated_time_horizon"
              name="estimated_time_horizon"
              defaultValue={opportunity?.estimated_time_horizon ?? ""}
              placeholder="e.g. 6–18 months"
              className={fieldClass}
            />
          </div>
        </div>
        <div>
          <label htmlFor="editorial_verdict" className={labelClass}>
            Editorial verdict
          </label>
          <textarea
            id="editorial_verdict"
            name="editorial_verdict"
            rows={3}
            defaultValue={opportunity?.editorial_verdict ?? ""}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="required_disclaimer" className={labelClass}>
            Required disclaimer
          </label>
          <textarea
            id="required_disclaimer"
            name="required_disclaimer"
            rows={2}
            defaultValue={opportunity?.required_disclaimer ?? ""}
            className={fieldClass}
          />
        </div>
      </div>

      <div className={sectionClass}>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-bcentx-gray">
          SEO & verification
        </h2>
        <div>
          <label htmlFor="seo_title" className={labelClass}>
            SEO title
          </label>
          <input
            id="seo_title"
            name="seo_title"
            defaultValue={opportunity?.seo_title ?? ""}
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
            defaultValue={opportunity?.seo_description ?? ""}
            className={fieldClass}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="canonical_url" className={labelClass}>
              Canonical URL
            </label>
            <input
              id="canonical_url"
              name="canonical_url"
              type="url"
              defaultValue={opportunity?.canonical_url ?? ""}
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
              defaultValue={opportunity?.last_verified_at ?? ""}
              className={fieldClass}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <Button type="submit" variant="primary" disabled={pending}>
          {pending ? "Saving…" : submitLabel}
        </Button>
        <Button href="/admin/opportunities" variant="secondary">
          Cancel
        </Button>
      </div>
    </form>
  );
}

function SelectField({
  id,
  label,
  defaultValue,
  options,
}: {
  id: string;
  label: string;
  defaultValue: string;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <select
        id={id}
        name={id}
        required
        defaultValue={defaultValue}
        className={fieldClass}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
