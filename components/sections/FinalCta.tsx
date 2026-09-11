import { Button } from "@/components/ui";
import { RichText } from "@/components/shared/RichText";
import { finalCta } from "@/lib/content/landing";

const REASSURANCE_CHIPS = [
  "✓ £0 Build Fee",
  "✓ Up to 4–5 Pages",
  "✓ 100% Yours to Keep",
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
        background:
          "linear-gradient(145deg, #123324 0%, #1a4731 50%, #0d2319 100%)",
        color: "white",
      }}
    >
      <div style={{ position: "relative", zIndex: 10, maxWidth: 680, margin: "0 auto" }}>
        {/* Headline */}
        <h2
          style={{
            marginBottom: "var(--space-4)",
            color: "white",
            fontSize: "clamp(2rem, 1.6rem + 2vw, 2.75rem)",
            fontFamily: "var(--font-serif)",
          }}
        >
          {finalCta.title}
        </h2>

        <p
          style={{
            fontSize: "var(--font-size-base)",
            color: "rgba(255, 255, 255, 0.85)",
            marginBottom: "var(--space-6)",
            maxWidth: 540,
            margin: "0 auto var(--space-6)",
            lineHeight: 1.6,
          }}
        >
          A genuine partnership to help your business establish a credible, professional digital presence with no upfront build fees.
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
                padding: "var(--space-1) var(--space-3)",
                letterSpacing: "0.02em",
              }}
            >
              {chip}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <div style={{ marginBottom: "var(--space-4)" }}>
          <Button
            href="/apply"
            variant="primary"
            style={{
              background: "white",
              color: "#1a4731",
              fontWeight: 700,
              fontSize: "1.05rem",
              padding: "var(--space-4) var(--space-8)",
              borderRadius: "var(--radius-md)",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)",
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--space-2)",
            }}
          >
            <span>{finalCta.ctaLabel}</span>
            <span aria-hidden="true" style={{ fontSize: "1.15em" }}>
              →
            </span>
          </Button>
        </div>

        {/* Reassurance Subtext */}
        <p
          style={{
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: "var(--font-size-xs)",
            margin: 0,
            letterSpacing: "0.02em",
          }}
        >
          Takes under 5 minutes · No credit card required
        </p>

        {/* Subtle bullet list for transparency */}
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            marginTop: "var(--space-8)",
            paddingTop: "var(--space-6)",
            borderTop: "1px solid rgba(255, 255, 255, 0.15)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-1)",
            fontSize: "var(--font-size-xs)",
            color: "rgba(255, 255, 255, 0.7)",
          }}
        >
          {finalCta.bullets.map((bullet) => (
            <li key={bullet}>
              <RichText text={bullet} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

