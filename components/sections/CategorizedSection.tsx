import type { CategorizedSection as CategorizedSectionContent } from "@/lib/content/landing";

export function CategorizedSection({ title, categories, note }: CategorizedSectionContent) {
  return (
    <section style={{ background: "var(--color-surface-base)" }}>
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
              }}
            >
              <h3 style={{ fontFamily: "var(--font-display)", marginBottom: "var(--space-4)" }}>
                {category.title}
              </h3>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {category.items.map((item) => (
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
            {note}
          </p>
        )}
      </div>
    </section>
  );
}
