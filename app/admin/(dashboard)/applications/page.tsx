import Link from "next/link";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { StatCard } from "@/components/admin/StatCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { listApplications } from "@/lib/db/queries";

// Always fresh — the team needs to see the latest submission, never a
// stale cached render (this is what makes "review the test submission
// live" true).
export const dynamic = "force-dynamic";

export default async function AdminApplicationsPage() {
  const applications = await listApplications();

  return (
    <div>
      <h1 style={{ marginBottom: "var(--space-6)" }}>Applications</h1>
      <div style={{ marginBottom: "var(--space-8)" }}>
        <StatCard label="Total applications" value={applications.length} />
      </div>

      {applications.length === 0 ? (
        <AdminEmptyState />
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "2px solid var(--color-border-light)" }}>
                <th style={{ padding: "var(--space-3)" }}>Business</th>
                <th style={{ padding: "var(--space-3)" }}>Contact</th>
                <th style={{ padding: "var(--space-3)" }}>Type</th>
                <th style={{ padding: "var(--space-3)" }}>Status</th>
                <th style={{ padding: "var(--space-3)" }}>Score</th>
                <th style={{ padding: "var(--space-3)" }}>Submitted</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application, index) => (
                <tr
                  key={application.id}
                  className="ui-admin-row-enter"
                  style={{
                    borderBottom: "1px solid var(--color-border-light)",
                    animationDelay: `${Math.min(index * 40, 400)}ms`,
                  }}
                >
                  <td style={{ padding: "var(--space-3)" }}>
                    <Link
                      href={`/admin/applications/${application.id}`}
                      style={{ color: "var(--color-primary-accessible)", fontWeight: 600, textDecoration: "underline" }}
                    >
                      {application.businessName}
                    </Link>
                  </td>
                  <td style={{ padding: "var(--space-3)" }}>
                    {application.contactName}
                    <br />
                    <span style={{ color: "var(--color-text-tertiary)", fontSize: "var(--font-size-sm)" }}>
                      {application.contactEmail}
                    </span>
                  </td>
                  <td style={{ padding: "var(--space-3)" }}>{application.businessType}</td>
                  <td style={{ padding: "var(--space-3)" }}>
                    <StatusBadge status={application.status} />
                  </td>
                  <td style={{ padding: "var(--space-3)" }}>{application.internalScore ?? "—"}</td>
                  <td style={{ padding: "var(--space-3)", color: "var(--color-text-tertiary)" }}>
                    {application.createdAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
