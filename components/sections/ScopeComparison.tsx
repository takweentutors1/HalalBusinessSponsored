import type { ReactNode } from "react";
import { Button } from "@/components/ui";
import { RichText } from "@/components/shared/RichText";
import type { CategorizedSection as CategorizedSectionContent } from "@/lib/content/landing";

interface ScopeComparisonProps {
  included: CategorizedSectionContent;
  addOns: CategorizedSectionContent;
  /** Per-item icons keyed by category title, applied within the "included"
   * column only (e.g. WhatsApp/Maps icons on the Features category). */
  includedItemIcons?: Record<string, (ReactNode | undefined)[]>;
}

function CheckGlyph() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width={12} height={12} fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12.5l5 5L20 6" />
    </svg>
  );
}

function PlusGlyph() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width={12} height={12} fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function Badge({ label, tone }: { label: string; tone: "free" | "addon" }) {
  const isFree = tone === "free";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "4px 12px",
        borderRadius: "var(--radius-full)",
        fontSize: "var(--font-size-xs)",
        fontWeight: 700,
        background: isFree ? "#dcfce7" : "#fef3c7",
        color: isFree ? "#166534" : "#92400e",
        marginBottom: "var(--space-4)",
      }}
    >
      {label}
    </span>
  );
}

function ScopeCheckBadge() {
  return (
    <span
      aria-hidden="true"
      style={{
        color: "var(--color-primary-accessible)",
        fontWeight: 700,
        fontSize: 14,
        flexShrink: 0,
        marginTop: 1,
      }}
    >
      ✓
    </span>
  );
}

function AddOnMarker() {
  return (
    <span
      aria-hidden="true"
      style={{
        color: "#d97706",
        fontWeight: 700,
        fontSize: 14,
        flexShrink: 0,
        marginTop: 1,
      }}
    >
      +
    </span>
  );
}

/**
 * Replaces two stacked "spec sheet" blocks with side-by-side comparison cards:
 * Left: pale green Free Website card
 * Right: clean white Optional Paid Add-ons card
 */
export function ScopeComparison({ included, addOns, includedItemIcons }: ScopeComparisonProps) {
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "var(--color-surface-base)" }}>
      <div style={{ position: "relative", zIndex: 10, maxWidth: 1040, margin: "0 auto", padding: "var(--space-12) var(--space-8)" }}>
        <div style={{ textAlign: "center", marginBottom: "var(--space-10)" }}>
          <span className="ui-section-eyebrow">WHAT YOU GET</span>
          <h2>
            Clear free scope. Clear paid extras.
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(340px, 100%), 1fr))",
            gap: "var(--space-6)",
            alignItems: "stretch",
          }}
        >
          {/* Included, free (Pale Mint Green Card) */}
          <div
            style={{
              padding: "var(--space-8) var(--space-6)",
              background: "#f0faf5",
              borderRadius: "var(--radius-xl)",
              border: "1px solid var(--color-border-light)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div>
              <Badge label="Free Website Package" tone="free" />
            </div>
            <h3 style={{ fontSize: "var(--font-size-xl)", color: "#0f172a", marginBottom: "var(--space-6)" }}>
              {included.title}
            </h3>
            {included.categories.map((category) => (
              <div key={category.title} style={{ marginBottom: "var(--space-5)" }}>
                <span
                  style={{
                    fontSize: "var(--font-size-xs)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--color-text-tertiary)",
                    display: "block",
                    marginBottom: "var(--space-2)",
                  }}
                >
                  {category.title}
                </span>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {category.items.map((item) => (
                    <li
                      key={item}
                      style={{
                        padding: "var(--space-2) 0",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "var(--space-3)",
                        color: "var(--color-text-primary)",
                        fontSize: "var(--font-size-base)",
                        lineHeight: 1.55,
                      }}
                    >
                      <ScopeCheckBadge />
                      <span>
                        <RichText text={item} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div
              style={{
                marginTop: "auto",
                padding: "var(--space-3) var(--space-4)",
                background: "white",
                border: "1px dashed #cbd5e1",
                borderRadius: "var(--radius-md)",
                fontSize: "var(--font-size-base)",
                fontWeight: 700,
                color: "#0f172a",
              }}
            >
              Development cost: £0
            </div>
          </div>

          {/* Paid add-ons (Clean White Card) */}
          <div
            style={{
              padding: "var(--space-8) var(--space-6)",
              background: "#ffffff",
              borderRadius: "var(--radius-xl)",
              border: "1px solid var(--color-border-light)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div>
              <Badge label="Optional Paid Add-ons" tone="addon" />
            </div>
            <h3 style={{ fontSize: "var(--font-size-xl)", color: "#0f172a", marginBottom: "var(--space-6)" }}>
              {addOns.title}
            </h3>
            {addOns.categories.map((category) => (
              <div key={category.title} style={{ marginBottom: "var(--space-5)" }}>
                <span
                  style={{
                    fontSize: "var(--font-size-xs)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--color-text-tertiary)",
                    display: "block",
                    marginBottom: "var(--space-2)",
                  }}
                >
                  {category.title}
                </span>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {category.items.map((item) => (
                    <li
                      key={item}
                      style={{
                        padding: "var(--space-2) 0",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "var(--space-3)",
                        color: "var(--color-text-primary)",
                        fontSize: "var(--font-size-base)",
                        lineHeight: 1.55,
                      }}
                    >
                      <AddOnMarker />
                      <span>
                        <RichText text={item} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div
              style={{
                marginTop: "auto",
                padding: "var(--space-3) var(--space-4)",
                background: "#fafaf9",
                border: "1px dashed #cbd5e1",
                borderRadius: "var(--radius-md)",
                fontSize: "var(--font-size-base)",
                color: "var(--color-text-secondary)",
              }}
            >
              You always see the price before any paid work begins.
            </div>
          </div>
        </div>

        {/* Full-width Domain & Hosting callout strip */}
        <div
          style={{
            marginTop: "var(--space-8)",
            background: "var(--color-neutral-50)",
            border: "1px solid var(--color-border-light)",
            borderLeft: "4px solid var(--color-primary-accessible)",
            borderRadius: "var(--radius-lg)",
            padding: "var(--space-4) var(--space-6)",
            fontSize: "var(--font-size-base)",
            lineHeight: 1.6,
            color: "var(--color-text-secondary)",
          }}
        >
          <strong style={{ color: "var(--color-text-primary)" }}>Domain &amp; hosting:</strong> you remain responsible for your domain, hosting and any paid third-party tools. We can guide you toward a suitable option if needed.
        </div>

        {/* Centered CTA */}
        <div style={{ marginTop: "var(--space-8)", textAlign: "center" }}>
          <Button href="/apply" variant="primary">
            Apply for a Free Website
          </Button>
        </div>
      </div>
    </section>
  );
}
