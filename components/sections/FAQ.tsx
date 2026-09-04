import { faq } from "@/lib/content/landing";

export function FAQ() {
  return (
    <section
      style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "var(--space-12) var(--space-8)",
      }}
    >
      <h2 style={{ color: "var(--color-primary-dark)", marginBottom: "var(--space-6)" }}>
        {faq.title}
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
        {faq.items.map((item) => (
          <details
            key={item.question}
            style={{
              border: "1px solid var(--color-border-light)",
              borderRadius: "var(--radius-md)",
              padding: "var(--space-4) var(--space-6)",
            }}
          >
            <summary style={{ fontWeight: 600, cursor: "pointer" }}>
              {item.question}
            </summary>
            <p style={{ color: "var(--color-text-secondary)", marginTop: "var(--space-3)" }}>
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
