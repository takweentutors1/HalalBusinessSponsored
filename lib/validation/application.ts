/**
 * Shared Zod schema for the application form (brief's Data Model, §4 of
 * docs/IMPLEMENTATION_PLAN.md). Imported by both the client form
 * (components/forms/ApplicationForm.tsx) and the server route
 * (app/api/apply/route.ts, next hour) so validation can never drift
 * between the two — the server always re-validates, per §5, regardless
 * of what the client already checked.
 */
import { z } from "zod";

export const BUSINESS_TYPES = [
  "Halal restaurants, takeaways and catering",
  "Halal butchers and food businesses",
  "Muslim salons and barbers",
  "Islamic education centres, Quran academies and tutors",
  "Muslim wedding service providers",
  "Modest-fashion and Islamic retail",
  "Muslim coaches, consultants and professional services",
  "Other",
] as const;

export type BusinessType = (typeof BUSINESS_TYPES)[number];

const FOOD_BUSINESS_TYPES: readonly BusinessType[] = [
  "Halal restaurants, takeaways and catering",
  "Halal butchers and food businesses",
];

/** Drives the credentials field's label per the brief's Decision 6. */
export function isFoodBusiness(type: string): boolean {
  return (FOOD_BUSINESS_TYPES as readonly string[]).includes(type);
}

export const YEARS_OPERATING_OPTIONS = [
  "Less than 1 year",
  "1–2 years",
  "3–5 years",
  "5+ years",
] as const;

export const ACTIVITY_LEVEL_OPTIONS = [
  "Rarely post",
  "Monthly",
  "Weekly",
  "Daily",
] as const;

export const CONTENT_READINESS_OPTIONS = [
  { value: "yes", label: "Yes, ready now" },
  { value: "partially", label: "Partially — need some help" },
  { value: "no", label: "No, I'll need support" },
] as const;

const optionalUrl = z
  .string()
  .trim()
  .optional()
  .refine((val) => !val || /^https?:\/\/.+\..+/i.test(val), {
    message: "Enter a full URL starting with http:// or https://",
  });

const optionalText = z.string().trim().optional();

export const applicationSchema = z.object({
  business_name: z.string().trim().min(2, "Enter your business name"),
  business_type: z.enum(BUSINESS_TYPES, "Select a business type"),
  years_operating: z.enum(YEARS_OPERATING_OPTIONS, "Select how long you've been operating"),
  current_website_url: optionalUrl,
  instagram_handle: optionalText,
  facebook_handle: optionalText,
  activity_level: z.enum(ACTIVITY_LEVEL_OPTIONS).optional(),
  google_profile_url: optionalUrl,
  google_review_count: z.coerce
    .number()
    .int("Whole numbers only")
    .min(0, "Can't be negative")
    .optional(),
  services_description: z
    .string()
    .trim()
    .min(10, "Tell us a little more — at least 10 characters"),
  biggest_challenge: z
    .string()
    .trim()
    .min(10, "Tell us a little more — at least 10 characters"),
  content_readiness: z.enum(["yes", "partially", "no"], "Select an option"),
  credentials: optionalText,
  contact_name: z.string().trim().min(2, "Enter your name"),
  contact_email: z.string().trim().email("Enter a valid email address"),
  contact_phone: z.string().trim().min(7, "Enter a valid phone number"),
  consent_terms: z
    .boolean()
    .refine((val) => val === true, { message: "You must agree to the Programme Terms" }),
  consent_feedback: z
    .boolean()
    .refine((val) => val === true, {
      message: "You must agree to give honest completion feedback",
    }),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;

/**
 * Honeypot field name — kept out of applicationSchema deliberately.
 * A non-empty value means a bot filled it in; the server route rejects
 * silently (still returns 200) rather than surfacing a validation error
 * that would tip off the bot. See §5 of the implementation plan.
 */
export const HONEYPOT_FIELD_NAME = "contact_backup_email";
