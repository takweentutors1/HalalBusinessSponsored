import { notFound } from "next/navigation";
import { Button, Card, FormField, Input, Select, Textarea } from "@/components/ui";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { STATUS_VALUES, getApplicationById } from "@/lib/db/queries";
import { saveReview } from "./actions";

export const dynamic = "force-dynamic";

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "var(--space-4)" }}>
      <p
        style={{
          fontSize: "var(--font-size-xs)",
          textTransform: "uppercase",
          letterSpacing: "0.02em",
          color: "var(--color-text-tertiary)",
          marginBottom: "var(--space-1)",
        }}
      >
        {label}
      </p>
      <p>{value || "—"}</p>
    </div>
  );
}

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const application = await getApplicationById(id);

  if (!application) {
    notFound();
  }

  const boundSaveReview = saveReview.bind(null, application.id);

  return (
    <div style={{ maxWidth: 900, display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginBottom: "var(--space-2)" }}>
          <h1>{application.businessName}</h1>
          <StatusBadge status={application.status} />
        </div>
        <p style={{ color: "var(--color-text-tertiary)" }}>
          Ref: {application.id} · Submitted {application.createdAt}
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "var(--space-6)" }}>
        <Card>
          <h4>Business</h4>
          <Field label="Business type" value={application.businessType} />
          <Field label="Years operating" value={application.yearsOperating} />
          <Field
            label="Website"
            value={
              application.currentWebsiteUrl ? (
                <a href={application.currentWebsiteUrl} target="_blank" rel="noreferrer">
                  {application.currentWebsiteUrl}
                </a>
              ) : null
            }
          />
          <Field label="Instagram" value={application.instagramHandle} />
          <Field label="Facebook" value={application.facebookHandle} />
          <Field label="Social activity level" value={application.activityLevel} />
          <Field label="Google profile" value={application.googleProfileUrl} />
          <Field label="Google review count" value={application.googleReviewCount} />
          <Field label="Credentials" value={application.credentials} />
        </Card>

        <Card>
          <h4>In their words</h4>
          <Field label="Services description" value={application.servicesDescription} />
          <Field label="Biggest challenge" value={application.biggestChallenge} />
          <Field label="Content readiness" value={application.contentReadiness} />
        </Card>

        <Card>
          <h4>Contact</h4>
          <Field label="Name" value={application.contactName} />
          <Field
            label="Email"
            value={<a href={`mailto:${application.contactEmail}`}>{application.contactEmail}</a>}
          />
          <Field label="Phone" value={application.contactPhone} />
          <Field label="Terms consent" value={application.consentTerms ? "Yes" : "No"} />
          <Field label="Feedback consent" value={application.consentFeedback ? "Yes" : "No"} />
        </Card>

        <Card>
          <h4>Review</h4>
          <form
            // Forces a remount when the saved review values change, so the
            // uncontrolled inputs' defaultValue reflects what's actually in
            // D1 after a save — React doesn't refresh defaultValue on an
            // already-mounted uncontrolled element otherwise.
            key={[
              application.status,
              application.internalScore,
              application.internalNotes,
              application.reviewer,
            ].join("|")}
            action={boundSaveReview}
          >
            <FormField label="Status" required>
              <Select name="status" defaultValue={application.status}>
                {STATUS_VALUES.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </Select>
            </FormField>
            <FormField label="Score" hint="Any scale you're using internally.">
              <Input
                type="number"
                name="internal_score"
                min={0}
                defaultValue={application.internalScore ?? ""}
              />
            </FormField>
            <FormField label="Notes">
              <Textarea name="internal_notes" defaultValue={application.internalNotes ?? ""} />
            </FormField>
            <FormField
              label="Reviewer"
              hint="Leave blank to use your logged-in username."
            >
              <Input name="reviewer" defaultValue={application.reviewer ?? ""} />
            </FormField>
            <Button type="submit" variant="primary">
              Save review
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
