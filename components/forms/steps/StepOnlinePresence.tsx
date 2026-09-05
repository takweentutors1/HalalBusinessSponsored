import type { ChangeEvent } from "react";
import { FormField, Input, Select } from "@/components/ui";
import { ACTIVITY_LEVEL_OPTIONS, isFoodBusiness } from "@/lib/validation/application";
import type { FieldErrors, FormState } from "../types";

export function StepOnlinePresence({
  form,
  errors,
  onChange,
}: {
  form: FormState;
  errors: FieldErrors;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}) {
  const foodBusiness = isFoodBusiness(form.business_type);

  return (
    <div>
      <h2 style={{ marginBottom: "var(--space-6)" }}>Online Presence</h2>

      <FormField label="Instagram handle" error={errors.instagram_handle}>
        <Input
          name="instagram_handle"
          placeholder="@yourbusiness"
          value={form.instagram_handle}
          onChange={onChange}
        />
      </FormField>

      <FormField label="Facebook page" error={errors.facebook_handle}>
        <Input name="facebook_handle" value={form.facebook_handle} onChange={onChange} />
      </FormField>

      <FormField label="How often do you post on social media?" error={errors.activity_level}>
        <Select name="activity_level" value={form.activity_level} onChange={onChange}>
          <option value="">Select an option</option>
          {ACTIVITY_LEVEL_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </FormField>

      <FormField label="Google Business Profile URL" error={errors.google_profile_url}>
        <Input
          type="url"
          name="google_profile_url"
          placeholder="https://"
          value={form.google_profile_url}
          onChange={onChange}
        />
      </FormField>

      <FormField label="Approximate Google review count" error={errors.google_review_count}>
        <Input
          type="number"
          min={0}
          name="google_review_count"
          value={form.google_review_count}
          onChange={onChange}
        />
      </FormField>

      <FormField
        label={
          foodBusiness
            ? "Halal certification or certifying body"
            : "Any credentials, certifications or affiliations you'd like shown (optional)"
        }
        error={errors.credentials}
      >
        <Input name="credentials" value={form.credentials} onChange={onChange} />
      </FormField>
    </div>
  );
}
