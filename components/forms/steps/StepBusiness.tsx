import type { ChangeEvent } from "react";
import { FormField, Input, Select } from "@/components/ui";
import { BUSINESS_TYPES, YEARS_OPERATING_OPTIONS } from "@/lib/validation/application";
import type { FieldErrors, FormState } from "../types";

export function StepBusiness({
  form,
  errors,
  onChange,
}: {
  form: FormState;
  errors: FieldErrors;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}) {
  return (
    <div>
      <h2 style={{ marginBottom: "var(--space-6)" }}>Your Business</h2>

      <FormField label="Business name" required error={errors.business_name}>
        <Input name="business_name" value={form.business_name} onChange={onChange} />
      </FormField>

      <FormField label="Business type" required error={errors.business_type}>
        <Select name="business_type" value={form.business_type} onChange={onChange}>
          <option value="">Select a business type</option>
          {BUSINESS_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Select>
      </FormField>

      <FormField
        label="How long have you been operating?"
        required
        error={errors.years_operating}
      >
        <Select name="years_operating" value={form.years_operating} onChange={onChange}>
          <option value="">Select an option</option>
          {YEARS_OPERATING_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </FormField>

      <FormField
        label="Current website URL"
        hint="Leave blank if you don't have one yet."
        error={errors.current_website_url}
      >
        <Input
          type="url"
          name="current_website_url"
          placeholder="https://"
          value={form.current_website_url}
          onChange={onChange}
        />
      </FormField>
    </div>
  );
}
