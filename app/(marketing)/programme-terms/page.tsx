import type { Metadata } from "next";
import Link from "next/link";
import { Disclosure } from "@/components/shared/Disclosure";
import { TermsList } from "@/components/sections";
import { disclosure } from "@/lib/config";
import { termsItems } from "@/lib/content/terms";

export const metadata: Metadata = {
  title: "Programme Terms",
  description:
    "The detailed rules behind the Halal Business Initiative's sponsored website programme.",
};

export default function ProgrammeTermsPage() {
  return (
    <main
      style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "var(--space-12) var(--space-8)",
      }}
    >
      <Link
        href="/"
        style={{
          display: "inline-block",
          marginBottom: "var(--space-6)",
          color: "var(--color-primary-accessible)",
          textDecoration: "underline",
        }}
      >
        ← Back to Home
      </Link>
      <h1 style={{ marginBottom: "var(--space-3)" }}>Programme Terms</h1>
      <Disclosure text={disclosure.termsIntro} />
      <div style={{ marginTop: "var(--space-8)" }}>
        <TermsList items={termsItems} />
      </div>
      <Link
        href="/apply"
        style={{
          display: "inline-block",
          marginTop: "var(--space-8)",
          color: "var(--color-primary-accessible)",
          textDecoration: "underline",
        }}
      >
        Apply for a Sponsored Website →
      </Link>
    </main>
  );
}
