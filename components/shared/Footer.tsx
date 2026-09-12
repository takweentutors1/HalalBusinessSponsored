import Link from "next/link";
import { brand, disclosure } from "@/lib/config";
import { Disclosure } from "./Disclosure";
import { Logo } from "./Logo";

/**
 * Site-wide footer with a refined, professional design:
 * - Subtle divider separating the section from above
 * - Primary Green theme background (#1a4731)
 * - Mobile: everything stacked and centered.
 * - Desktop (≥641px, .ui-footer-* classes in globals.css): top row splits
 *   into logo+description (left) and the nav menu (right), a horizontal
 *   rule follows, then the trademark/copyright notice is centered below it.
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
        {/* Top: Logo/description + Nav menu */}
        <div className="ui-footer-top">
          {/* Logo, Company Name, Description */}
          <div
            className="ui-footer-brand"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-2)",
            }}
          >
            <div style={{ display: "inline-flex", alignItems: "center" }}>
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
                fontWeight: 500,
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
                fontWeight: 500,
                transition: "opacity 150ms ease",
              }}
            >
              Privacy Policy
            </Link>
          </nav>
        </div>

        <div className="ui-footer-divider" />

        {/* Bottom: Trademark & Copyright, always centered */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "var(--space-1)",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "var(--font-size-sm)",
              fontWeight: 600,
              color: "#ffffff",
              margin: 0,
            }}
          >
            A Takween Digital Services initiative
          </p>
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
