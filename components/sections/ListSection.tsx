import type { CSSProperties, ReactNode } from "react";
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
  /**
   * Per-item icons, same length/order as `items`. Where an entry is
   * provided it replaces the checkmark/dash marker for that row; entries
   * left undefined fall back to the default marker — lets a section
   * anchor specific rows (a category, a named platform) without forcing
   * every item in the list to carry a distinct icon.
   */
  itemIcons?: (ReactNode | undefined)[];
  /**
   * Grid-item container treatment. Varying this across sections is
   * deliberate — repeating the same bordered white box down the whole
   * page reads as template filler rather than distinct content.
   * "boxed" (default): solid border + white fill — genuine grouping.
   * "flush": bottom hairline only, no fill — for loose, scannable tags.
   * "accent": left color bar, no border/fill — for narrative/pain-point rows.
   * "tinted": solid color fill, no border — for a single cohesive block.
   * Ignored for the "stack" variant, which is already borderless.
   */
  cardStyle?: "boxed" | "flush" | "accent" | "tinted";
  /** Fill color for cardStyle "tinted". Defaults to the section's tone tint. */
  tintColor?: string;
  /** Optional SVG background image path for the section. */
  bgSvg?: string;
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
  itemIcons,
  cardStyle = "boxed",
  tintColor,
  bgSvg,
}: ListSectionProps) {
  const marker = polarity === "negative" ? "–" : "✓";
  const markerColor =
    polarity === "negative" ? "var(--color-text-tertiary)" : "var(--color-primary-accessible)";
  const gridColumns = variant === "grid" && polarity === "negative" ? 280 : 240;
  const accentColor = polarity === "negative" ? "var(--color-text-tertiary)" : "var(--color-primary)";
  const resolvedTint = tintColor ?? "var(--color-primary-pale)";

  const cardItemStyle: Record<NonNullable<ListSectionProps["cardStyle"]>, CSSProperties> = {
    boxed: {
      border: "1px solid var(--color-border-light)",
      borderRadius: "var(--radius-lg)",
      padding: "var(--space-5) var(--space-4)",
      background: "var(--color-surface-base)",
      boxShadow: "0 2px 8px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
      transition: "box-shadow 200ms ease, transform 200ms ease",
    },
    flush: {
      borderBottom: "1px solid var(--color-border-light)",
      padding: "var(--space-3) var(--space-1)",
    },
    accent: {
      borderLeft: `3px solid ${accentColor}`,
      padding: "var(--space-2) var(--space-4)",
    },
    tinted: {
      borderRadius: "var(--radius-md)",
      padding: "var(--space-4)",
      background: resolvedTint,
    },
  };

  return (
    <section style={{ position: "relative", overflow: "hidden", background: TONE_BACKGROUND[tone] }}>
      {bgSvg && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${bgSvg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.9,
            zIndex: 1,
          }}
        />
      )}
      <div
        style={{
          position: "relative",
          zIndex: bgSvg ? 10 : undefined,
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
              gap: cardStyle === "flush" ? "var(--space-2) var(--space-8)" : "var(--space-4)",
            }}
          >
            {items.map((item, index) => (
              <li
                key={item}
                style={{
                  ...cardItemStyle[cardStyle],
                  display: "flex",
                  gap: "var(--space-3)",
                  alignItems: "center",
                }}
              >
                {itemIcons?.[index] ? (
                  <span aria-hidden="true" style={{ color: markerColor, flexShrink: 0 }}>
                    {itemIcons[index]}
                  </span>
                ) : (
                  <span aria-hidden="true" style={{ color: markerColor, fontWeight: 700 }}>
                    {marker}
                  </span>
                )}
                <span>
                  <RichText text={item} />
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {items.map((item, index) => (
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
                  {itemIcons?.[index] ?? marker}
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
