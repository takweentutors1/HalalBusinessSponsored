"use client";

import { useCallback, useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Button, Card } from "@/components/ui";
import { disclosure, turnstileSiteKey } from "@/lib/config";
import {
  APPLICATION_STEPS,
  HONEYPOT_FIELD_NAME,
  applicationSchema,
  validateStep,
} from "@/lib/validation/application";
import { StepIndicator } from "./StepIndicator";
import { StepAboutYou } from "./steps/StepAboutYou";
import { StepBusiness } from "./steps/StepBusiness";
import { StepContact } from "./steps/StepContact";
import { StepOnlinePresence } from "./steps/StepOnlinePresence";
import { StepReview } from "./steps/StepReview";
import { ThankYouCharacter } from "./ThankYouCharacter";
import { initialFormState, type FieldErrors, type FormState } from "./types";

function toPayload(state: FormState) {
  return {
    business_name: state.business_name,
    business_type: state.business_type,
    years_operating: state.years_operating,
    current_website_url: state.current_website_url || undefined,
    instagram_handle: state.instagram_handle || undefined,
    facebook_handle: state.facebook_handle || undefined,
    activity_level: state.activity_level || undefined,
    google_profile_url: state.google_profile_url || undefined,
    google_review_count: state.google_review_count === "" ? undefined : state.google_review_count,
    services_description: state.services_description,
    biggest_challenge: state.biggest_challenge,
    content_readiness: state.content_readiness,
    credentials: state.credentials || undefined,
    contact_name: state.contact_name,
    contact_email: state.contact_email,
    contact_phone: state.contact_phone,
    consent_terms: state.consent_terms,
    consent_feedback: state.consent_feedback,
  };
}

const LAST_STEP = APPLICATION_STEPS.length - 1;

export function ApplicationForm() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [honeypot, setHoneypot] = useState("");
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [status, setStatus] = useState<
    "idle" | "submitting" | "submitted" | "needs-verification" | "error"
  >("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [applicationId, setApplicationId] = useState<string | null>(null);

  const stepHeadingRef = useRef<HTMLDivElement>(null);

  const handleTurnstileExpire = useCallback(() => setTurnstileToken(null), []);

  useEffect(() => {
    stepHeadingRef.current?.focus();
  }, [step]);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleCheckbox(event: ChangeEvent<HTMLInputElement>) {
    const { name, checked } = event.target;
    setForm((prev) => ({ ...prev, [name]: checked }));
  }

  function handleNext() {
    const result = validateStep(step, toPayload(form));
    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = String(issue.path[0]);
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setStep((s) => Math.min(s + 1, LAST_STEP));
  }

  function handleBack() {
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Honeypot: a filled-in trap field means a bot. Real users never see or
    // fill this input. Handled silently server-side too (§5).
    if (honeypot.trim() !== "") {
      return;
    }

    const result = applicationSchema.safeParse(toPayload(form));
    if (!result.success) {
      // Shouldn't happen — every step already validated its own fields —
      // but if it does, jump back to the first step with a problem.
      const fieldErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = String(issue.path[0]);
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      const stepWithError = APPLICATION_STEPS.findIndex((s) =>
        s.fields.some((field) => field in fieldErrors),
      );
      setErrors(fieldErrors);
      setStep(stepWithError === -1 ? 0 : stepWithError);
      return;
    }

    setErrors({});

    if (!turnstileToken) {
      setStatus("needs-verification");
      return;
    }

    setStatus("submitting");
    setSubmitError(null);

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...result.data,
          [HONEYPOT_FIELD_NAME]: honeypot,
          turnstileToken,
        }),
      });
      const data = (await res.json()) as { success: boolean; id?: string };

      if (!res.ok || !data.success) {
        setSubmitError(
          "Something went wrong sending your application. Please try again in a moment.",
        );
        setStatus("error");
        return;
      }

      setApplicationId(data.id ?? null);
      setStatus("submitted");
    } catch {
      setSubmitError("Couldn't reach the server. Check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "submitted") {
    return (
      <Card role="status" style={{ textAlign: "center" }}>
        <ThankYouCharacter />
        <h2
          style={{
            color: "var(--color-primary-dark)",
            margin: "var(--space-6) 0 var(--space-3)",
          }}
        >
          Application received!
        </h2>
        <p style={{ color: "var(--color-text-secondary)", marginBottom: "var(--space-4)" }}>
          Thank you — we&apos;ve received your application and it&apos;s now with our review
          team. We&apos;ll email you either way once a decision is made.
        </p>
        {applicationId && (
          <p style={{ color: "var(--color-text-tertiary)", fontSize: "var(--font-size-sm)" }}>
            Reference: {applicationId.slice(0, 8).toUpperCase()}
          </p>
        )}
      </Card>
    );
  }

  return (
    <Card>
      <StepIndicator steps={APPLICATION_STEPS} currentStep={step} />

      <form onSubmit={handleSubmit} noValidate>
        {/* Honeypot — visually hidden, kept out of tab order and off screen readers */}
        <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
          <label htmlFor={HONEYPOT_FIELD_NAME}>Leave this field blank</label>
          <input
            type="text"
            id={HONEYPOT_FIELD_NAME}
            name={HONEYPOT_FIELD_NAME}
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        <div
          key={step}
          className="ui-step-enter ui-step-content"
          ref={stepHeadingRef}
          tabIndex={-1}
        >
          {step === 0 && <StepBusiness form={form} errors={errors} onChange={handleChange} />}
          {step === 1 && (
            <StepOnlinePresence form={form} errors={errors} onChange={handleChange} />
          )}
          {step === 2 && <StepAboutYou form={form} errors={errors} onChange={handleChange} />}
          {step === 3 && <StepContact form={form} errors={errors} onChange={handleChange} />}
          {step === 4 && (
            <StepReview
              form={form}
              errors={errors}
              onCheckboxChange={handleCheckbox}
              turnstileSiteKey={turnstileSiteKey}
              onVerify={setTurnstileToken}
              onExpire={handleTurnstileExpire}
              disclosureText={disclosure.nearSubmit}
              status={status}
              submitError={submitError}
            />
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "var(--space-8)",
          }}
        >
          {step > 0 ? (
            <Button type="button" variant="secondary" onClick={handleBack}>
              Back
            </Button>
          ) : (
            <span />
          )}
          {step < LAST_STEP ? (
            <Button type="button" variant="primary" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button type="submit" variant="primary" disabled={status === "submitting"}>
              {status === "submitting" ? "Submitting…" : "Submit Application"}
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}
