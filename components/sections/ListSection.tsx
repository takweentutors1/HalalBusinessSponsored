import type { ReactNode } from "react";
import { RichText } from "@/components/shared/RichText";
import type { ListSection as ListSectionContent } from "@/lib/content/landing";

export type SectionTone = "plain" | "muted" | "tint";

const TONE_BACKGROUND: Record<SectionTone, string | undefined> = {
  plain: undefined,
  muted: "var(--color-surface-base)",
  tint: "var(--color-primary-pale)",
};

interface ListSectionProps extends ListSectionContent {
  /** "grid" suits short, scannable facts; "stack" (default) suits longer lists. */
  variant?: "stack" | "grid";
  tone?: SectionTone;
  /**
   * "negative" swaps the green checkmark for a muted dash — for exclusion
   * lists like "What's Outside Scope", where a checkmark would misread as
   * "this is included".
   */
  polarity?: "positive" | "negative";
  /** Optional decorative graphic shown above the title, centered — used
   * sparingly (Problem, Who It's For) to break up long text-only scroll. */
  illustration?: ReactNode;
}

export function ListSection({
  title,
  intro,
  items,
  note,
  variant = "stack",
  tone = "plain",
  polarity = "positive",
  illustration,
}: ListSectionProps) {
  const marker = polarity === "negative" ? "–" : "✓";
  const markerColor =
    polarity === "negative" ? "var(--color-text-tertiary)" : "var(--color-primary-accessible)";
  const gridColumns = variant === "grid" && polarity === "negative" ? 280 : 240;

  return (
    <section style={{ background: TONE_BACKGROUND[tone] }}>
      <div
        style={{
          maxWidth: variant === "grid" ? 960 : 720,
          margin: "0 auto",
          padding: "var(--space-12) var(--space-8)",
        }}
      >
        {illustration && <div style={{ marginBottom: "var(--space-6)" }}>{illustration}</div>}
        <h2
          style={{
            color: "var(--color-primary-dark)",
            marginBottom: "var(--space-4)",
            textAlign: variant === "grid" ? "center" : "left",
          }}
        >
          {title}
        </h2>
        {intro && (
          <p
            style={{
              color: "var(--color-text-secondary)",
              marginBottom: "var(--space-6)",
              textAlign: variant === "grid" ? "center" : "left",
            }}
          >
            <RichText text={intro} />
          </p>
        )}

        {variant === "grid" ? (
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              display: "grid",
              gridTemplateColumns: `repeat(auto-fit, minmax(min(${gridColumns}px, 100%), 1fr))`,
              gap: "var(--space-4)",
            }}
          >
            {items.map((item) => (
              <li
                key={item}
                style={{
                  border: "1px solid var(--color-border-light)",
                  borderRadius: "var(--radius-md)",
                  padding: "var(--space-4)",
                  background: "var(--color-surface-base)",
                  display: "flex",
                  gap: "var(--space-2)",
                }}
              >
                <span aria-hidden="true" style={{ color: markerColor, fontWeight: 700 }}>
                  {marker}
                </span>
                <span>
                  <RichText text={item} />
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {items.map((item) => (
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
                    color: markerColor,
                    fontWeight: 700,
                  }}
                >
                  {marker}
                </span>
                <RichText text={item} />
              </li>
            ))}
          </ul>
        )}

        {note && (
          <p
            style={{
              marginTop: "var(--space-4)",
              fontWeight: 600,
              color: "var(--color-text-primary)",
              textAlign: variant === "grid" ? "center" : "left",
            }}
          >
            {note}
          </p>
        )}
      </div>
    </section>
  );
}
