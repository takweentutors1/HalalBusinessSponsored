# Branded email templates

Source mockups for the two required transactional emails (see `IMPLEMENTATION_PLAN.md` §5a), sent from the Hostinger mailbox via the Worker's SMTP client. Self-contained HTML with inline styles and a table-based layout for email-client compatibility (Gmail, Outlook, Apple Mail) — no external stylesheets or webfonts, since those aren't reliable in email clients. Fonts fall back to Georgia (web-safe serif), matching the design system's `--font-body` stack.

## Files

- `applicant-confirmation.html` — sent to the applicant immediately after a successful submission.
- `team-notification.html` — sent to the internal review mailbox with the full application and an admin-panel link.

## Merge fields

Replace at send time (values come straight off the `applications` row, per the Data Model in §4):

| Placeholder | Source |
|---|---|
| `{{brand_name}}`, `{{brand_domain}}` | `lib/config.ts` (pending `[Halal Brand]` decision) |
| `{{capacity_number}}`, `{{disclosure_text}}` | `lib/config.ts` |
| `{{application_id}}` | `applications.id` |
| `{{submitted_at}}` | `applications.created_at`, formatted |
| `{{admin_link}}` | `https://{domain}/admin/applications/{{application_id}}` |
| `{{business_name}}` … `{{consent_feedback}}` | corresponding `applications.*` columns |

## Previewing

Open either file directly in a browser to preview with the raw `{{placeholders}}` visible, or run a find/replace pass with sample data before checking cross-client rendering (e.g. via Litmus/Email on Acid, or by sending a real test through the Hostinger mailbox once the SMTP client is wired up).

## Extending

Both templates share the same header/footer shell (emerald accent bar, `{{brand_name}}` wordmark, Takween attribution). A future status-update email (accepted/waitlisted/declined) should copy this shell rather than starting a new layout, so all outbound mail stays visually consistent.
