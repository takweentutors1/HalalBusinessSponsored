import { RichText } from "@/components/shared/RichText";
import { faq } from "@/lib/content/landing";

function ChevronDownIcon() {
  return (
    <svg
      className="ui-faq-chevron"
      aria-hidden="true"
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--color-primary-accessible)"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        flexShrink: 0,
        transition: "transform 200ms ease",
      }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

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
            <details
              key={item.question}
              className="ui-faq-details"
              style={{
                background: "var(--color-surface-base)",
                border: "1px solid var(--color-border-light)",
                borderRadius: "var(--radius-lg)",
                padding: "var(--space-4) var(--space-5)",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.04)",
              }}
            >
              <summary
                className="ui-faq-summary"
                style={{
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "#0f172a",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-3)",
                  userSelect: "none",
                  lineHeight: 1.4,
                  listStyle: "none",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    fontSize: "0.75rem",
                    color: "#0f172a",
                    display: "inline-flex",
                    alignItems: "center",
                    transition: "transform 200ms ease",
                  }}
                  className="ui-faq-chevron"
                >
                  ▶
                </span>
                <span>{item.question}</span>
              </summary>
              <div
                style={{
                  color: "var(--color-text-secondary)",
                  marginTop: "var(--space-3)",
                  paddingLeft: "var(--space-6)",
                  fontSize: "var(--font-size-sm)",
                  lineHeight: 1.65,
                }}
              >
                <RichText text={item.answer} />
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

