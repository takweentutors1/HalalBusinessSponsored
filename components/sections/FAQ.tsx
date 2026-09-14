import { faq } from "@/lib/content/landing";
import { FAQAnimated } from "./FAQAnimated";

export function FAQ() {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "var(--space-12) var(--space-8)",
        background: "var(--color-surface-base)",
      }}
    >
      <div style={{ position: "relative", zIndex: 10, maxWidth: 740, margin: "0 auto" }}>
        {/* Centered Heading */}
        <div style={{ textAlign: "center", marginBottom: "var(--space-10)" }}>
          <span className="ui-section-eyebrow">FAQ</span>
          <h2
            style={{
              marginBottom: "var(--space-2)",
            }}
          >
            {faq.title}
          </h2>
        </div>

        {/* Individual Accordion Cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-3)",
          }}
        >
          {faq.items.map((item) => (
            <FAQAnimated key={item.question} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
