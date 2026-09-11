import Link from "next/link";
import { disclosure } from "@/lib/config";
import { Disclosure } from "./Disclosure";
import { Logo } from "./Logo";

/**
 * Site-wide footer — dark navy style matching the HTML reference design.
 * The logo shows the icon only; the initiative name appears below it.
 * Admin login is discoverable but visually subtle.
 */
export function Footer() {
  return (
    <footer
      style={{
        background: "#0f172a",
        color: "#94a3b8",
        padding: "var(--space-12) var(--space-8) var(--space-8)",
        textAlign: "center",
      }}
    >
      {/* Logo mark */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "var(--space-4)" }}>
        <Logo size={32} showWordmark={false} />
      </div>

      {/* Initiative label */}
      <p
        style={{
          color: "#cbd5e1",
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "var(--font-size-sm)",
          marginBottom: "var(--space-4)",
        }}
      >
        A Takween Digital Services initiative
      </p>

      {/* Disclosure */}
      <div style={{ maxWidth: 560, margin: "0 auto", fontSize: "var(--font-size-xs)", lineHeight: 1.6, color: "#64748b" }}>
        <Disclosure text={disclosure.footer} />
      </div>

      {/* Admin link */}
      <p style={{ marginTop: "var(--space-4)" }}>
        <Link
          href="/admin/login"
          style={{ color: "#475569", fontSize: "var(--font-size-xs)" }}
        >
          Admin Login
        </Link>
      </p>
    </footer>
  );
}
