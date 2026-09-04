import type { Metadata } from "next";
import { ApplicationForm } from "@/components/forms/ApplicationForm";

export const metadata: Metadata = {
  title: "Apply",
  description: "Apply for a free, professional sponsored website build.",
  // Reachable (a real applicant might bookmark/share it), but not part of
  // the indexable site — see §8.
  robots: { index: false, follow: true },
};

export default function ApplyPage() {
  return (
    <main
      style={{
        maxWidth: 640,
        margin: "0 auto",
        padding: "var(--space-12) var(--space-8)",
      }}
    >
      <h1 style={{ marginBottom: "var(--space-2)" }}>Apply for a Sponsored Website</h1>
      <p style={{ color: "var(--color-text-secondary)", marginBottom: "var(--space-8)" }}>
        Tell us about your business. Every application is reviewed by a person, not an algorithm.
      </p>
      <ApplicationForm />
    </main>
  );
}
