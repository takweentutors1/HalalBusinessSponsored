import { processSteps } from "@/lib/content/landing";

export function ProcessSteps() {
  return (
    <section
      id="how-it-works"
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "var(--space-12) var(--space-8)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(/images/bg-process.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.9,
          zIndex: 1,
        }}
      />
      <div style={{ position: "relative", zIndex: 10, maxWidth: 900, margin: "0 auto" }}>
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
                background: "var(--color-primary-accessible)",
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
      </div>
    </section>
  );
}
