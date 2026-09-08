import type { ReactNode } from "react";
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
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-1)",
        padding: "var(--space-1) var(--space-3)",
        borderRadius: "var(--radius-full)",
        fontSize: "var(--font-size-xs)",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        background: tone === "free" ? "var(--color-primary-accessible)" : "var(--color-warning)",
        color: tone === "free" ? "white" : "var(--color-neutral-900)",
        boxShadow: "var(--shadow-md)",
        marginBottom: "var(--space-3)",
      }}
    >
      {tone === "free" ? <CheckGlyph /> : <PlusGlyph />}
      {label}
    </span>
  );
}

function AddOnMarker() {
  return (
    <span
      aria-hidden="true"
      style={{
        position: "absolute",
        left: 0,
        top: "var(--space-1)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 18,
        height: 18,
        borderRadius: "var(--radius-full)",
        border: "1.5px solid var(--color-warning)",
        color: "var(--color-warning)",
        fontSize: "var(--font-size-xs)",
        fontWeight: 700,
        lineHeight: 1,
      }}
    >
      +
    </span>
  );
}

/**
 * Replaces two stacked "spec sheet" CategorizedSection blocks (What's
 * Included, What's Outside Scope) with one bordered two-column comparison:
 * a green "Free" panel next to an amber "Paid Add-On" panel, so a reader
 * sees the value split at a glance instead of two separate lists of facts.
 */
export function ScopeComparison({ included, addOns, includedItemIcons }: ScopeComparisonProps) {
  return (
    <section style={{ background: "var(--color-surface-base)" }}>
      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "var(--space-12) var(--space-8)" }}>
        <h2
          style={{
            color: "var(--color-primary-dark)",
            marginBottom: "var(--space-8)",
            textAlign: "center",
          }}
        >
          What&rsquo;s In Scope
        </h2>
        <div
          style={{
            border: "1px solid var(--color-border-light)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(340px, 100%), 1fr))",
          }}
        >
          {/* Included, free */}
          <div style={{ padding: "var(--space-8) var(--space-6)", background: "var(--color-primary-pale)" }}>
            <Badge label="Free" tone="free" />
            <h3 style={{ fontSize: "var(--font-size-xl)", marginBottom: "var(--space-6)" }}>
              {included.title}
            </h3>
            {included.categories.map((category) => (
              <div key={category.title} style={{ marginBottom: "var(--space-5)" }}>
                <h4
                  style={{
                    fontSize: "var(--font-size-sm)",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    color: "var(--color-text-secondary)",
                    marginBottom: "var(--space-2)",
                  }}
                >
                  {category.title}
                </h4>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {category.items.map((item, index) => (
                    <li
                      key={item}
                      style={{ padding: "var(--space-1) 0", paddingLeft: "var(--space-6)", position: "relative" }}
                    >
                      <span
                        aria-hidden="true"
                        style={{
                          position: "absolute",
                          left: 0,
                          top: "var(--space-1)",
                          color: "var(--color-primary-accessible)",
                          fontWeight: 700,
                        }}
                      >
                        {includedItemIcons?.[category.title]?.[index] ?? "✓"}
                      </span>
                      <RichText text={item} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {included.note && (
              <p style={{ fontWeight: 600, marginTop: "var(--space-4)" }}>
                <RichText text={included.note} />
              </p>
            )}
          </div>

          {/* Paid add-ons */}
          <div style={{ padding: "var(--space-8) var(--space-6)", background: "var(--color-surface-elevated)" }}>
            <Badge label="Paid Add-On" tone="addon" />
            <h3 style={{ fontSize: "var(--font-size-xl)", marginBottom: "var(--space-6)" }}>
              {addOns.title}
            </h3>
            {addOns.categories.map((category) => (
              <div key={category.title} style={{ marginBottom: "var(--space-5)" }}>
                <h4
                  style={{
                    fontSize: "var(--font-size-sm)",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    color: "var(--color-text-secondary)",
                    marginBottom: "var(--space-2)",
                  }}
                >
                  {category.title}
                </h4>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {category.items.map((item) => (
                    <li
                      key={item}
                      style={{ padding: "var(--space-1) 0", paddingLeft: "var(--space-6)", position: "relative" }}
                    >
                      <AddOnMarker />
                      <RichText text={item} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {addOns.note && (
              <p style={{ color: "var(--color-text-secondary)", marginTop: "var(--space-4)" }}>
                <RichText text={addOns.note} />
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
