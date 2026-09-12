import { Button } from "@/components/ui";
import { RichText } from "@/components/shared/RichText";
import { finalCta } from "@/lib/content/landing";

const REASSURANCE_CHIPS = [
  "Selected businesses only",
  "No hidden obligation",
  "Limited monthly places",
];

export function FinalCta() {
  return (
    <section
      id={finalCta.id}
      style={{
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
        padding: "var(--space-16) var(--space-8)",
        background: "#1a4731",
        color: "white",
      }}
    >
      <div style={{ position: "relative", zIndex: 10, maxWidth: 680, margin: "0 auto" }}>
        {/* Eyebrow */}
        <div style={{ marginBottom: "var(--space-2)" }}>
          <span
            className="ui-section-eyebrow"
            style={{ color: "#a7f3d0" }}
          >
            READY TO APPLY?
          </span>
        </div>

        {/* Headline */}
        <h2
          style={{
            marginBottom: "var(--space-4)",
            color: "white",
            fontSize: "2.625rem", /* 42px */
            fontFamily: "var(--font-serif)",
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          {finalCta.title}
        </h2>

        <p
          style={{
            fontSize: "var(--font-size-base)",
            color: "rgba(255, 255, 255, 0.9)",
            marginBottom: "var(--space-6)",
            maxWidth: 540,
            margin: "0 auto var(--space-6)",
            lineHeight: 1.6,
          }}
        >
          For selected Muslim-owned businesses in the UK. Defined starter scope. £0 development cost. Honest feedback expected.
        </p>

        {/* Reassurance Chips */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "var(--space-3)",
            marginBottom: "var(--space-8)",
          }}
        >
          {REASSURANCE_CHIPS.map((chip) => (
            <span
              key={chip}
              style={{
                fontSize: "var(--font-size-xs)",
                fontWeight: 600,
                color: "white",
                background: "rgba(255, 255, 255, 0.12)",
                border: "1px solid rgba(255, 255, 255, 0.25)",
                borderRadius: "var(--radius-full)",
                padding: "var(--space-2) var(--space-4)",
                letterSpacing: "0.02em",
              }}
            >
              {chip}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <div>
          <Button
            href="/apply"
            variant="primary"
            style={{
              background: "white",
              color: "#1a4731",
              fontWeight: 700,
              fontSize: "1rem",
              padding: "var(--space-4) var(--space-8)",
              borderRadius: "var(--radius-md)",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <span>{finalCta.ctaLabel}</span>
          </Button>
        </div>
      </div>
    </section>
  );
}

