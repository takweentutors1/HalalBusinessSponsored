import Link from "next/link";
import { brand, disclosure } from "@/lib/config";
import { Disclosure } from "./Disclosure";
import { Logo } from "./Logo";

/**
 * Site-wide footer with a refined, professional design:
 * - Subtle divider separating the section from above
 * - Primary Green theme background (#1a4731)
 * - Left: Logo mark + company name + descriptive subtitle
 * - Center / Navigation: Menu links (Programme Terms · Privacy Policy)
 * - Right / Copyright: A Takween Digital Services initiative · © 2026 Takween Digital Services
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
        {/* Main Footer Row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
            gap: "var(--space-8)",
            alignItems: "center",
          }}
        >
          {/* 1. Left: Logo, Company Name, Description */}
          <div
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

          {/* 2. Middle: Navigation Menu Links */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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
          </div>

          {/* 3. Right: Trademark & Initiative Notice */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-1)",
              textAlign: "right",
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
      </div>
    </footer>
  );
}
