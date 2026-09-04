import type { ListSection as ListSectionContent } from "@/lib/content/landing";

export function ListSection({ title, intro, items, note }: ListSectionContent) {
  return (
    <section
      style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "var(--space-12) var(--space-8)",
      }}
    >
      <h2 style={{ color: "var(--color-primary-dark)", marginBottom: "var(--space-4)" }}>
        {title}
      </h2>
      {intro && (
        <p style={{ color: "var(--color-text-secondary)", marginBottom: "var(--space-4)" }}>
          {intro}
        </p>
      )}
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
                color: "var(--color-primary)",
                fontWeight: 700,
              }}
            >
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>
      {note && (
        <p
          style={{
            marginTop: "var(--space-4)",
            fontWeight: 600,
            color: "var(--color-text-primary)",
          }}
        >
          {note}
        </p>
      )}
    </section>
  );
}
