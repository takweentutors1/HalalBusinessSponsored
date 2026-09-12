import type { ChangeEvent } from "react";
import { Disclosure } from "@/components/shared/Disclosure";
import { Turnstile } from "@/components/shared/Turnstile";
import type { FieldErrors, FormState } from "../types";

export function StepReview({
  form,
  errors,
  onCheckboxChange,
  turnstileSiteKey,
  onVerify,
  onExpire,
  disclosureText,
  status,
  submitError,
}: {
  form: FormState;
  errors: FieldErrors;
  onCheckboxChange: (event: ChangeEvent<HTMLInputElement>) => void;
  turnstileSiteKey: string;
  onVerify: (token: string) => void;
  onExpire: () => void;
  disclosureText: string;
  status: "idle" | "submitting" | "needs-verification" | "error";
  submitError: string | null;
}) {
  return (
    <div>
      <h2 style={{ marginBottom: "var(--space-4)" }}>Review & Submit</h2>

      <div
        style={{
          background: "var(--color-surface-elevated)",
          borderRadius: "var(--radius-md)",
          padding: "var(--space-4)",
          marginBottom: "var(--space-6)",
          fontSize: "var(--font-size-base)",
        }}
      >
        <p style={{ marginBottom: "var(--space-1)" }}>
          <strong>{form.business_name || "—"}</strong> ({form.business_type || "—"})
        </p>
        <p style={{ color: "var(--color-text-secondary)" }}>
          {form.contact_name || "—"} · {form.contact_email || "—"}
        </p>
      </div>

      <div className="ui-form-group">
        <label style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-2)" }}>
          <input
            type="checkbox"
            name="consent_terms"
            checked={form.consent_terms}
            onChange={onCheckboxChange}
          />
          <span>
            I agree to the{" "}
            <a
              href="/programme-terms"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--color-primary-accessible)", textDecoration: "underline" }}
            >
              Programme Terms
            </a>
            .
          </span>
        </label>
        {errors.consent_terms && <p className="ui-error">{errors.consent_terms}</p>}
      </div>

      <div className="ui-form-group">
        <label style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-2)" }}>
          <input
            type="checkbox"
            name="consent_feedback"
            checked={form.consent_feedback}
            onChange={onCheckboxChange}
          />
          <span>I agree to give honest completion feedback if accepted.</span>
        </label>
        {errors.consent_feedback && <p className="ui-error">{errors.consent_feedback}</p>}
      </div>

      <div style={{ margin: "var(--space-6) 0" }}>
        <Turnstile siteKey={turnstileSiteKey} onVerify={onVerify} onExpire={onExpire} />
      </div>

      <div style={{ marginBottom: "var(--space-4)" }}>
        <Disclosure text={disclosureText} />
      </div>

      {status === "needs-verification" && (
        <p className="ui-error" role="alert" style={{ marginBottom: "var(--space-4)" }}>
          Please complete the verification widget above before submitting.
        </p>
      )}

      {status === "error" && submitError && (
        <p className="ui-error" role="alert" style={{ marginBottom: "var(--space-4)" }}>
          {submitError}
        </p>
      )}
    </div>
  );
}
