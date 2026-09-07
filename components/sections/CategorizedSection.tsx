import type { ReactNode } from "react";
import { RichText } from "@/components/shared/RichText";
import type { CategorizedSection as CategorizedSectionContent } from "@/lib/content/landing";

interface CategorizedSectionProps extends CategorizedSectionContent {
  /** "negative" swaps the green checkmark for a muted dash — for exclusion
   * lists like "What's Outside Scope", where a checkmark would misread as
   * "this is included". */
  polarity?: "positive" | "negative";
  /** "muted" (default, matches original behavior) = white section. "plain"
   * = transparent section (shows the page's gray), white cards for contrast —
   * used to keep the alternating section-background rhythm going. */
  tone?: "muted" | "plain";
  /**
   * Per-item icons keyed by category title, same length/order as that
   * category's `items`. Entries left undefined fall back to the default
   * checkmark/dash marker — lets one category (e.g. "Features") anchor
   * specific rows without forcing icons onto every category.
   */
  categoryItemIcons?: Record<string, (ReactNode | undefined)[]>;
}

export function CategorizedSection({
  title,
  categories,
  note,
  polarity = "positive",
  tone = "muted",
  categoryItemIcons,
}: CategorizedSectionProps) {
  const marker = polarity === "negative" ? "–" : "✓";
  const markerColor =
    polarity === "negative" ? "var(--color-text-tertiary)" : "var(--color-primary-accessible)";

  return (
    <section style={{ background: tone === "muted" ? "var(--color-surface-base)" : undefined }}>
      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "var(--space-12) var(--space-8)",
        }}
      >
        <h2
          style={{
            color: "var(--color-primary-dark)",
            marginBottom: "var(--space-8)",
            textAlign: "center",
          }}
        >
          {title}
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "var(--space-6)",
          }}
        >
          {categories.map((category) => (
            <div
              key={category.title}
              style={{
                border: "1px solid var(--color-border-light)",
                borderRadius: "var(--radius-lg)",
                padding: "var(--space-6)",
                background: "var(--color-surface-base)",
              }}
            >
              <h3 style={{ fontFamily: "var(--font-display)", marginBottom: "var(--space-4)" }}>
                {category.title}
              </h3>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {category.items.map((item, index) => (
                  <li
                    key={item}
                    style={{
                      padding: "var(--space-2) 0",
                      paddingLeft: "var(--space-6)",
                      position: "relative",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        left: 0,
                        top: "var(--space-2)",
                        color: markerColor,
                        fontWeight: 700,
                      }}
                    >
                      {categoryItemIcons?.[category.title]?.[index] ?? marker}
                    </span>
                    <RichText text={item} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {note && (
          <p
            style={{
              marginTop: "var(--space-6)",
              fontWeight: 600,
              textAlign: "center",
              color: "var(--color-text-primary)",
            }}
          >
            <RichText text={note} />
          </p>
        )}
      </div>
    </section>
  );
}
