import type { ChangeEvent } from "react";
import { FormField, Select, Textarea } from "@/components/ui";
import { CONTENT_READINESS_OPTIONS } from "@/lib/validation/application";
import type { FieldErrors, FormState } from "../types";

export function StepAboutYou({
  form,
  errors,
  onChange,
}: {
  form: FormState;
  errors: FieldErrors;
  onChange: (event: ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => void;
}) {
  return (
    <div>
      <h2 style={{ marginBottom: "var(--space-6)" }}>Tell Us More</h2>

      <FormField
        label="What does your business do?"
        required
        hint="A couple of sentences is plenty."
        error={errors.services_description}
      >
        <Textarea
          name="services_description"
          value={form.services_description}
          onChange={onChange}
        />
      </FormField>

      <FormField
        label="What's your biggest challenge right now?"
        required
        error={errors.biggest_challenge}
      >
        <Textarea name="biggest_challenge" value={form.biggest_challenge} onChange={onChange} />
      </FormField>

      <FormField
        label="Can you provide content (photos, text, logo) promptly?"
        required
        error={errors.content_readiness}
      >
        <Select name="content_readiness" value={form.content_readiness} onChange={onChange}>
          <option value="">Select an option</option>
          {CONTENT_READINESS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </FormField>
    </div>
  );
}
