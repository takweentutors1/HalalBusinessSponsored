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
}

export function ListSection({
  title,
  intro,
  items,
  note,
  variant = "stack",
  tone = "plain",
}: ListSectionProps) {
  return (
    <section style={{ background: TONE_BACKGROUND[tone] }}>
      <div
        style={{
          maxWidth: variant === "grid" ? 960 : 720,
          margin: "0 auto",
          padding: "var(--space-12) var(--space-8)",
        }}
      >
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
            {intro}
          </p>
        )}

        {variant === "grid" ? (
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
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
                <span aria-hidden="true" style={{ color: "var(--color-primary-accessible)", fontWeight: 700 }}>
                  ✓
                </span>
                <span>{item}</span>
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
                    color: "var(--color-primary-accessible)",
                    fontWeight: 700,
                  }}
                >
                  ✓
                </span>
                {item}
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
