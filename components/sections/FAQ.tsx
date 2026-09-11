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
          <h2
            style={{
              color: "var(--color-primary-dark)",
              marginBottom: "var(--space-2)",
            }}
          >
            {faq.title}
          </h2>
          <p
            style={{
              color: "var(--color-text-secondary)",
              fontSize: "var(--font-size-base)",
              maxWidth: 520,
              margin: "0 auto",
            }}
          >
            Everything you need to know about the sponsorship, scope, and process.
          </p>
        </div>

        {/* Single Unified Accordion Card */}
        <div
          style={{
            background: "var(--color-surface-base)",
            border: "1px solid var(--color-border-light)",
            borderRadius: "var(--radius-xl)",
            boxShadow: "var(--shadow-md)",
            padding: "var(--space-2) var(--space-6)",
          }}
        >
          {faq.items.map((item, index) => {
            const isLast = index === faq.items.length - 1;
            return (
              <details
                key={item.question}
                className="ui-faq-details"
                style={{
                  borderBottom: isLast ? "none" : "1px solid var(--color-border-light)",
                  padding: "var(--space-4) 0",
                }}
              >
                <summary
                  className="ui-faq-summary"
                  style={{
                    fontWeight: 600,
                    fontSize: "1.05rem",
                    color: "var(--color-primary-dark)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "var(--space-4)",
                    userSelect: "none",
                    lineHeight: 1.4,
                  }}
                >
                  <span>{item.question}</span>
                  <ChevronDownIcon />
                </summary>
                <div
                  style={{
                    color: "var(--color-text-secondary)",
                    marginTop: "var(--space-3)",
                    paddingRight: "var(--space-6)",
                    fontSize: "var(--font-size-sm)",
                    lineHeight: 1.65,
                  }}
                >
                  <RichText text={item.answer} />
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}

