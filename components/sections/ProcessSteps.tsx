import { processSteps } from "@/lib/content/landing";

export function ProcessSteps() {
  return (
    <section
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: "var(--space-12) var(--space-8)",
      }}
    >
      <h2 style={{ color: "var(--color-primary-dark)", marginBottom: "var(--space-8)" }}>
        {processSteps.title}
      </h2>
      <ol
        style={{
          listStyle: "none",
          padding: 0,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "var(--space-6)",
        }}
      >
        {processSteps.steps.map((item, index) => (
          <li key={item.step}>
            <span
              aria-hidden="true"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "2rem",
                height: "2rem",
                borderRadius: "var(--radius-full)",
                background: "var(--color-primary)",
                color: "white",
                fontWeight: 700,
                marginBottom: "var(--space-3)",
              }}
            >
              {index + 1}
            </span>
            <h4 style={{ fontFamily: "var(--font-display)", marginBottom: "var(--space-2)" }}>
              {item.step}
            </h4>
            <p style={{ color: "var(--color-text-secondary)" }}>{item.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
