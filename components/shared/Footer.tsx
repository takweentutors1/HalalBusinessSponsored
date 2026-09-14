import Link from "next/link";
import { brand } from "@/lib/config";
import { Logo } from "./Logo";

/**
 * Site-wide footer — matches docs/index.html's redesign exactly: a plain
 * white bar (not the previous dark-green banner), brand mark on one side,
 * tagline + links on the other, single row that wraps on narrow screens.
 */
export function Footer() {
  return (
    <footer
      style={{
        padding: "var(--space-8) var(--space-8)",
        borderTop: "1px solid var(--color-border-light)",
        background: "var(--color-surface-base)",
      }}
    >
      <div
        className="ui-footer-grid"
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "var(--space-6)",
          flexWrap: "wrap",
        }}
      >
        <Logo size={28} showWordmark />

        <nav
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "var(--space-5)",
            color: "var(--color-text-tertiary)",
            fontSize: "var(--font-size-sm)",
          }}
        >
          <span>A {brand.parentCompany} initiative</span>
          <Link href="/programme-terms" style={{ color: "var(--color-text-secondary)" }}>
            Programme Terms
          </Link>
          <Link href="/programme-terms#privacy" style={{ color: "var(--color-text-secondary)" }}>
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
}
