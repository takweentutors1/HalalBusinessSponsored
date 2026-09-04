import { brand, capacity, disclosure } from "@/lib/config";
import type { ApplicationInput } from "@/lib/validation/application";
import { sendEmail } from "./client";
import { renderTemplate } from "./merge";
import { applicantConfirmationTemplate } from "./templates/applicant-confirmation";
import { teamNotificationTemplate } from "./templates/team-notification";

function formatSubmittedAt(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeStyle: "short" }).format(date);
}

function adminLink(id: string): string {
  return `https://${brand.domain}/admin/applications/${id}`;
}

function yesNo(value: boolean): string {
  return value ? "Yes" : "No";
}

/**
 * Fires both required emails (§5a) for a newly-submitted application.
 * Best-effort: a send failure here should never fail the application
 * submission itself — the D1 row is the source of truth. Callers should
 * await this but treat its result as informational, not gate success on it.
 */
export async function sendApplicationEmails(
  env: CloudflareEnv,
  id: string,
  application: ApplicationInput,
) {
  const submittedAt = formatSubmittedAt(new Date());

  const confirmationHtml = renderTemplate(applicantConfirmationTemplate, {
    brand_name: brand.name,
    brand_domain: brand.domain,
    capacity_number: String(capacity.count),
    disclosure_text: disclosure.footer,
    contact_name: application.contact_name,
    business_name: application.business_name,
    application_id: id,
    submitted_at: submittedAt,
    contact_email: application.contact_email,
  });

  const notificationHtml = renderTemplate(teamNotificationTemplate, {
    brand_name: brand.name,
    business_name: application.business_name,
    admin_link: adminLink(id),
    application_id: id,
    submitted_at: submittedAt,
    business_type: application.business_type,
    years_operating: application.years_operating,
    current_website_url: application.current_website_url || "—",
    instagram_handle: application.instagram_handle || "—",
    facebook_handle: application.facebook_handle || "—",
    activity_level: application.activity_level || "—",
    google_profile_url: application.google_profile_url || "—",
    google_review_count:
      application.google_review_count !== undefined
        ? String(application.google_review_count)
        : "—",
    credentials: application.credentials || "—",
    services_description: application.services_description,
    biggest_challenge: application.biggest_challenge,
    content_readiness: application.content_readiness,
    contact_name: application.contact_name,
    contact_email: application.contact_email,
    contact_phone: application.contact_phone,
    consent_terms: yesNo(application.consent_terms),
    consent_feedback: yesNo(application.consent_feedback),
  });

  const teamEmail = env.TEAM_NOTIFICATION_EMAIL || env.HOSTINGER_SMTP_USER;

  return Promise.allSettled([
    sendEmail(env, {
      to: { name: application.contact_name, email: application.contact_email },
      subject: `Application received — ${brand.name}`,
      html: confirmationHtml,
    }),
    teamEmail
      ? sendEmail(env, {
          to: { email: teamEmail },
          subject: `New application: ${application.business_name}`,
          html: notificationHtml,
        })
      : Promise.resolve({ sent: false, reason: "team-notification-email-not-configured" }),
  ]);
}
