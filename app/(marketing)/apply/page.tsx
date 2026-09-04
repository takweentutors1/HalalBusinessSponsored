import type { Metadata } from "next";
import { ApplicationForm } from "@/components/forms/ApplicationForm";

export const metadata: Metadata = {
  title: "Apply | Halal Business Initiative",
  description: "Apply for a free, professional sponsored website build.",
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
