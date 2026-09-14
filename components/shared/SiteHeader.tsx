import Link from "next/link";
import { Logo } from "./Logo";
import { HeaderNav } from "./HeaderNav";
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
        style={{ display: "inline-flex", alignItems: "center", minWidth: 0, maxWidth: "100%" }}
      >
        <Logo size={32} animated showWordmark />
      </Link>
      <nav style={{ display: "flex", alignItems: "center", gap: "var(--space-6)", flexShrink: 0 }}>
        {/* Wrapped in a plain div (not passed straight to HeaderNav's own
            className prop) because HeaderNav's root <ul> sets its own
            inline display: flex — an inline style always wins over the
            .ui-header-nav-link media query's `display: none`, which would
            silently break the existing hide-below-640px behavior. The
            wrapper div has no competing inline display, so the CSS class
            controls it cleanly instead. */}
        <div className="ui-header-nav-link">
          <HeaderNav />
        </div>
        <Button
          href="/apply"
          variant="primary"
          className="ui-header-cta"
          style={{
            padding: "calc(var(--space-2) * 1.25) calc(var(--space-5) * 1.25)",
            fontSize: "var(--font-size-sm)",
          }}
        >
          Apply Now
        </Button>
      </nav>
    </header>
  );
}

