import type { ChangeEvent } from "react";
import { FormField, Input } from "@/components/ui";
import type { FieldErrors, FormState } from "../types";

export function StepContact({
  form,
  errors,
  onChange,
}: {
  form: FormState;
  errors: FieldErrors;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <h2 style={{ marginBottom: "var(--space-6)" }}>Your Details</h2>

      <FormField label="Your name" required error={errors.contact_name}>
        <Input name="contact_name" value={form.contact_name} onChange={onChange} />
      </FormField>

      <FormField label="Email address" required error={errors.contact_email}>
        <Input
          type="email"
          name="contact_email"
          value={form.contact_email}
          onChange={onChange}
        />
      </FormField>

      <FormField label="Phone number" required error={errors.contact_phone}>
        <Input type="tel" name="contact_phone" value={form.contact_phone} onChange={onChange} />
      </FormField>
    </div>
  );
}
