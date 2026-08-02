"use client";

import { useActionState, useState } from "react";
import type { RiskWarningActionState } from "@/app/admin/risk-warnings/actions";
import { Button } from "@/components/ui/Button";
import { slugify } from "@/lib/admin/slug";
import type {
  ContentStatus,
  RiskLevel,
  RiskWarningRow,
  WarningType,
} from "@/types/database";

const WARNING_TYPE_OPTIONS: { value: WarningType; label: string }[] = [
  { value: "scam", label: "Scam" },
  { value: "financial", label: "Financial" },
  { value: "legal", label: "Legal" },
  { value: "tax", label: "Tax" },
  { value: "immigration", label: "Immigration" },
  { value: "platform", label: "Platform" },
  { value: "security", label: "Security" },
  { value: "ethical", label: "Ethical" },
  { value: "compliance", label: "Compliance" },
  { value: "general", label: "General" },
];

const SEVERITY_OPTIONS: { value: RiskLevel; label: string }[] = [
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

type RiskWarningFormProps = {
  warning?: RiskWarningRow;
  action: (
    prev: RiskWarningActionState,
    formData: FormData,
  ) => Promise<RiskWarningActionState>;
  submitLabel: string;
};

export function RiskWarningForm({
  warning,
  action,
  submitLabel,
}: RiskWarningFormProps) {
  const [state, formAction, pending] = useActionState(action, {});
  const [title, setTitle] = useState(warning?.title ?? "");
  const [slug, setSlug] = useState(warning?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(warning?.slug));

  return (
    <form action={formAction} className="space-y-5">
      {state.error ? (
        <p className="rounded-md bg-risk-red-soft px-3 py-2 text-sm text-risk-red" role="alert">
          {state.error}
        </p>
      ) : null}

      <div>
        <label htmlFor="title" className={labelClass}>
          Title
        </label>
        <input
          id="title"
          name="title"
          required
          value={title}
          onChange={(e) => {
            const nextTitle = e.target.value;
            setTitle(nextTitle);
            if (!slugTouched) setSlug(slugify(nextTitle));
          }}
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
          Public URL: /risks/{slug || "…"}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="warning_type" className={labelClass}>
            Warning type
          </label>
          <select
            id="warning_type"
            name="warning_type"
            required
            defaultValue={warning?.warning_type ?? "general"}
            className={fieldClass}
          >
            {WARNING_TYPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="severity" className={labelClass}>
            Severity
          </label>
          <select
            id="severity"
            name="severity"
            required
            defaultValue={warning?.severity ?? "medium"}
            className={fieldClass}
          >
            {SEVERITY_OPTIONS.map((option) => (
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
            defaultValue={warning?.status ?? "draft"}
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
        <label htmlFor="description" className={labelClass}>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={4}
          defaultValue={warning?.description ?? ""}
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="recommended_action" className={labelClass}>
          Recommended action
        </label>
        <textarea
          id="recommended_action"
          name="recommended_action"
          rows={3}
          defaultValue={warning?.recommended_action ?? ""}
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="official_source_url" className={labelClass}>
          Official source URL
        </label>
        <input
          id="official_source_url"
          name="official_source_url"
          type="url"
          defaultValue={warning?.official_source_url ?? ""}
          placeholder="https://"
          className={fieldClass}
        />
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <Button type="submit" variant="primary" disabled={pending}>
          {pending ? "Saving…" : submitLabel}
        </Button>
        <Button href="/admin/risk-warnings" variant="secondary">
          Cancel
        </Button>
      </div>
    </form>
  );
}
