import Link from "next/link";
import { Logo } from "./Logo";
import { Button } from "@/components/ui";
import { brand } from "@/lib/config";

export function SiteHeader() {
  return (
    <header
      className="ui-site-header"
      style={{
        padding: "var(--space-4) var(--space-8)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid var(--color-border-light)",
        minWidth: 0,
        background: "var(--color-surface-base)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <Link
        href="/"
        aria-label={`${brand.name} — home`}
        className="ui-site-logo-link"
        style={{ minWidth: 0, maxWidth: "100%" }}
      >
        <Logo size={32} animated showWordmark />
      </Link>
      <nav style={{ display: "flex", alignItems: "center", gap: "var(--space-6)", flexShrink: 0 }}>
        <Link
          href="#how-it-works"
          className="ui-header-nav-link"
          style={{
            color: "var(--color-text-secondary)",
            fontSize: "var(--font-size-sm)",
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
        >
          How It Works
        </Link>
        <Button
          href="/apply"
          variant="primary"
          className="ui-header-cta"
          style={{ padding: "var(--space-2) var(--space-5)", fontSize: "var(--font-size-sm)" }}
        >
          Apply Now
        </Button>
      </nav>
    </header>
  );
}

