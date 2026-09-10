import { RichText } from "@/components/shared/RichText";
import { faq } from "@/lib/content/landing";

export function FAQ() {
  return (
    <section
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
          backgroundImage: "url(/images/bg-faq.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.9,
          zIndex: 1,
        }}
      />
      <div style={{ position: "relative", zIndex: 10, maxWidth: 720, margin: "0 auto" }}>
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
              <RichText text={item.answer} />
            </p>
          </details>
        ))}
      </div>
      </div>
    </section>
  );
}
