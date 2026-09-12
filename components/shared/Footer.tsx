import Link from "next/link";
import { brand, disclosure } from "@/lib/config";
import { Disclosure } from "./Disclosure";
import { Logo } from "./Logo";

/**
 * Site-wide footer with a refined, professional design:
 * - Subtle divider separating the section from above
 * - Primary Green theme background (#1a4731)
 * - Mobile: everything stacked and centered, in source order (nav menu,
 *   then the tagline + logo + description block).
 * - Desktop (≥641px, .ui-footer-* classes in globals.css): top row splits
 *   into the nav menu (left) and the tagline + logo + description (right,
 *   swapped via CSS `order` rather than DOM order so mobile stacking is
 *   unaffected), a horizontal rule follows, then the copyright notice is
 *   centered below it.
 */
export function Footer() {
  return (
    <footer
      style={{
        background: "#1a4731",
        color: "rgba(255, 255, 255, 0.8)",
        borderTop: "1px solid rgba(255, 255, 255, 0.22)",
        boxShadow: "0 -1px 0 rgba(0, 0, 0, 0.08)",
        padding: "var(--space-12) var(--space-8)",
      }}
    >
      <div
        style={{
          maxWidth: 1160,
          margin: "0 auto",
        }}
      >
        {/* Top: Nav menu + Tagline/logo/description */}
        <div className="ui-footer-top">
          {/* Tagline, Logo, Description */}
          <div
            className="ui-footer-brand"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-2)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "var(--space-2)" }}>
              <span style={{ fontSize: "var(--font-size-sm)", fontWeight: 600, color: "#ffffff" }}>
                A Takween Digital Services initiative
              </span>
              <span style={{ color: "rgba(255, 255, 255, 0.4)" }}>·</span>
              <Logo size={28} showWordmark={true} wordmarkColor="#ffffff" />
            </div>
            <p
              style={{
                fontSize: "var(--font-size-xs)",
                color: "rgba(255, 255, 255, 0.75)",
                lineHeight: 1.5,
                margin: 0,
                maxWidth: 340,
              }}
            >
              Empowering UK Muslim-owned businesses with professional, high-converting starter websites.
            </p>
          </div>

          {/* Navigation Menu Links */}
          <nav
            className="ui-footer-nav"
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "var(--space-3)",
              fontSize: "var(--font-size-sm)",
            }}
          >
            <Link
              href="/programme-terms"
              style={{
                color: "#ffffff",
                fontWeight: 400,
                transition: "opacity 150ms ease",
              }}
            >
              Programme Terms
            </Link>
            <span style={{ color: "rgba(255, 255, 255, 0.4)" }}>·</span>
            <Link
              href="/programme-terms#privacy"
              style={{
                color: "#ffffff",
                fontWeight: 400,
                transition: "opacity 150ms ease",
              }}
            >
              Privacy Policy
            </Link>
          </nav>
        </div>

        <div className="ui-footer-divider" />

        {/* Bottom: Copyright, always centered */}
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              fontSize: "var(--font-size-xs)",
              color: "rgba(255, 255, 255, 0.65)",
              margin: 0,
            }}
          >
            © 2026 {brand.parentCompany}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
