"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { Button, Card, FormField, Input, Select, Textarea } from "@/components/ui";
import { Disclosure } from "@/components/shared/Disclosure";
import { Turnstile } from "@/components/shared/Turnstile";
import { disclosure, turnstileSiteKey } from "@/lib/config";
import {
  ACTIVITY_LEVEL_OPTIONS,
  BUSINESS_TYPES,
  CONTENT_READINESS_OPTIONS,
  HONEYPOT_FIELD_NAME,
  YEARS_OPERATING_OPTIONS,
  applicationSchema,
  isFoodBusiness,
} from "@/lib/validation/application";

type FormState = {
  business_name: string;
  business_type: string;
  years_operating: string;
  current_website_url: string;
  instagram_handle: string;
  facebook_handle: string;
  activity_level: string;
  google_profile_url: string;
  google_review_count: string;
  services_description: string;
  biggest_challenge: string;
  content_readiness: string;
  credentials: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  consent_terms: boolean;
  consent_feedback: boolean;
};

const initialState: FormState = {
  business_name: "",
  business_type: "",
  years_operating: "",
  current_website_url: "",
  instagram_handle: "",
  facebook_handle: "",
  activity_level: "",
  google_profile_url: "",
  google_review_count: "",
  services_description: "",
  biggest_challenge: "",
  content_readiness: "",
  credentials: "",
  contact_name: "",
  contact_email: "",
  contact_phone: "",
  consent_terms: false,
  consent_feedback: false,
};

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

export function ApplicationForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [status, setStatus] = useState<
    "idle" | "submitting" | "submitted" | "needs-verification" | "error"
  >("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Honeypot: a filled-in trap field means a bot. Real users never see or
    // fill this input. Handled silently server-side too (§5) — this is
    // just the client-side mirror so a bot's obvious submission never
    // reaches validation at all.
    if (honeypot.trim() !== "") {
      return;
    }

    const result = applicationSchema.safeParse(toPayload(form));

    if (!result.success) {
      const fieldErrors: Partial<Record<string, string>> = {};
      for (const issue of result.error.issues) {
        const key = String(issue.path[0]);
        if (!fieldErrors[key]) {
          fieldErrors[key] = issue.message;
        }
      }
      setErrors(fieldErrors);
      setStatus("idle");
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
      const data = (await res.json()) as { success: boolean };

      if (!res.ok || !data.success) {
        setSubmitError(
          "Something went wrong sending your application. Please try again in a moment.",
        );
        setStatus("error");
        return;
      }

      setStatus("submitted");
    } catch {
      setSubmitError("Couldn't reach the server. Check your connection and try again.");
      setStatus("error");
    }
  }

  const foodBusiness = isFoodBusiness(form.business_type);

  // A dedicated confirmation state, not just a toast — the brief's QA
  // criteria require the applicant to see a clear confirmation.
  if (status === "submitted") {
    return (
      <Card role="status">
        <h2 style={{ color: "var(--color-primary-dark)", marginBottom: "var(--space-3)" }}>
          Application received
        </h2>
        <p style={{ color: "var(--color-text-secondary)" }}>
          Thank you — we&apos;ve received your application and it&apos;s now with our review
          team. We&apos;ll email you either way once a decision is made.
        </p>
      </Card>
    );
  }

  return (
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

      <FormField label="Business name" required error={errors.business_name}>
        <Input name="business_name" value={form.business_name} onChange={handleChange} />
      </FormField>

      <FormField label="Business type" required error={errors.business_type}>
        <Select name="business_type" value={form.business_type} onChange={handleChange}>
          <option value="">Select a business type</option>
          {BUSINESS_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Select>
      </FormField>

      <FormField label="How long have you been operating?" required error={errors.years_operating}>
        <Select name="years_operating" value={form.years_operating} onChange={handleChange}>
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
          onChange={handleChange}
        />
      </FormField>

      <FormField label="Instagram handle" error={errors.instagram_handle}>
        <Input
          name="instagram_handle"
          placeholder="@yourbusiness"
          value={form.instagram_handle}
          onChange={handleChange}
        />
      </FormField>

      <FormField label="Facebook page" error={errors.facebook_handle}>
        <Input name="facebook_handle" value={form.facebook_handle} onChange={handleChange} />
      </FormField>

      <FormField label="How often do you post on social media?" error={errors.activity_level}>
        <Select name="activity_level" value={form.activity_level} onChange={handleChange}>
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
          onChange={handleChange}
        />
      </FormField>

      <FormField label="Approximate Google review count" error={errors.google_review_count}>
        <Input
          type="number"
          min={0}
          name="google_review_count"
          value={form.google_review_count}
          onChange={handleChange}
        />
      </FormField>

      <FormField
        label="What does your business do?"
        required
        hint="A couple of sentences is plenty."
        error={errors.services_description}
      >
        <Textarea
          name="services_description"
          value={form.services_description}
          onChange={handleChange}
        />
      </FormField>

      <FormField
        label="What's your biggest challenge right now?"
        required
        error={errors.biggest_challenge}
      >
        <Textarea
          name="biggest_challenge"
          value={form.biggest_challenge}
          onChange={handleChange}
        />
      </FormField>

      <FormField
        label="Can you provide content (photos, text, logo) promptly?"
        required
        error={errors.content_readiness}
      >
        <Select name="content_readiness" value={form.content_readiness} onChange={handleChange}>
          <option value="">Select an option</option>
          {CONTENT_READINESS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </FormField>

      <FormField
        label={
          foodBusiness
            ? "Halal certification or certifying body"
            : "Any credentials, certifications or affiliations you'd like shown (optional)"
        }
        error={errors.credentials}
      >
        <Input name="credentials" value={form.credentials} onChange={handleChange} />
      </FormField>

      <FormField label="Your name" required error={errors.contact_name}>
        <Input name="contact_name" value={form.contact_name} onChange={handleChange} />
      </FormField>

      <FormField label="Email address" required error={errors.contact_email}>
        <Input type="email" name="contact_email" value={form.contact_email} onChange={handleChange} />
      </FormField>

      <FormField label="Phone number" required error={errors.contact_phone}>
        <Input type="tel" name="contact_phone" value={form.contact_phone} onChange={handleChange} />
      </FormField>

      <div className="ui-form-group">
        <label style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-2)" }}>
          <input
            type="checkbox"
            name="consent_terms"
            checked={form.consent_terms}
            onChange={handleCheckbox}
          />
          <span>
            I agree to the{" "}
            <a href="/programme-terms" style={{ color: "var(--color-primary-dark)", textDecoration: "underline" }}>
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
            onChange={handleCheckbox}
          />
          <span>I agree to give honest completion feedback if accepted.</span>
        </label>
        {errors.consent_feedback && <p className="ui-error">{errors.consent_feedback}</p>}
      </div>

      <div style={{ margin: "var(--space-6) 0" }}>
        <Turnstile siteKey={turnstileSiteKey} onVerify={setTurnstileToken} onExpire={() => setTurnstileToken(null)} />
      </div>

      <div style={{ marginBottom: "var(--space-4)" }}>
        <Disclosure text={disclosure.nearSubmit} />
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

      <Button type="submit" variant="primary" disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting…" : "Submit Application"}
      </Button>
    </form>
  );
}
