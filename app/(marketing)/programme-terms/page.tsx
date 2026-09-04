import type { Metadata } from "next";
import { Disclosure } from "@/components/shared/Disclosure";
import { TermsList } from "@/components/sections";
import { disclosure } from "@/lib/config";
import { termsItems } from "@/lib/content/terms";

export const metadata: Metadata = {
  title: "Programme Terms | Halal Business Initiative",
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
      <h1 style={{ marginBottom: "var(--space-3)" }}>Programme Terms</h1>
      <Disclosure text={disclosure.termsIntro} />
      <div style={{ marginTop: "var(--space-8)" }}>
        <TermsList items={termsItems} />
      </div>
    </main>
  );
}
