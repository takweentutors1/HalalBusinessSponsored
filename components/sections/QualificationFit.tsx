import type { ListSection as ListSectionContent } from "@/lib/content/landing";

export function QualificationFit({
  qualifies,
  notFit,
}: {
  qualifies: ListSectionContent;
  notFit: ListSectionContent;
}) {
  return (
    <section style={{ background: "var(--color-surface-base)" }}>
      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "var(--space-12) var(--space-8)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))",
            gap: "var(--space-6)",
          }}
        >
          <div
            style={{
              border: "1px solid var(--color-border-light)",
              borderRadius: "var(--radius-lg)",
              padding: "var(--space-6)",
            }}
          >
            <h2
              style={{
                fontSize: "var(--font-size-xl)",
                color: "var(--color-primary-dark)",
                marginBottom: "var(--space-2)",
              }}
            >
              {qualifies.title}
            </h2>
            {qualifies.intro && (
              <p
                style={{
                  color: "var(--color-text-secondary)",
                  fontSize: "var(--font-size-sm)",
                  marginBottom: "var(--space-4)",
                }}
              >
                {qualifies.intro}
              </p>
            )}
            <ul style={{ listStyle: "none", padding: 0 }}>
              {qualifies.items.map((item) => (
                <li
                  key={item}
                  style={{ padding: "var(--space-2) 0", paddingLeft: "var(--space-6)", position: "relative" }}
                >
                  <span
                    aria-hidden="true"
                    style={{ position: "absolute", left: 0, color: "var(--color-primary-accessible)", fontWeight: 700 }}
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div
            style={{
              border: "1px solid var(--color-border-light)",
              borderRadius: "var(--radius-lg)",
              padding: "var(--space-6)",
            }}
          >
            <h2
              style={{
                fontSize: "var(--font-size-xl)",
                color: "var(--color-text-primary)",
                marginBottom: "var(--space-2)",
              }}
            >
              {notFit.title}
            </h2>
            <ul style={{ listStyle: "none", padding: 0, marginTop: "var(--space-6)" }}>
              {notFit.items.map((item) => (
                <li
                  key={item}
                  style={{ padding: "var(--space-2) 0", paddingLeft: "var(--space-6)", position: "relative" }}
                >
                  <span
                    aria-hidden="true"
                    style={{ position: "absolute", left: 0, color: "var(--color-text-tertiary)", fontWeight: 700 }}
                  >
                    —
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
