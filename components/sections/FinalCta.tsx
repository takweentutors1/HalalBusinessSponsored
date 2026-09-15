import { Button } from "@/components/ui";
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
        padding: "var(--space-16) 0",
        background: "#fff",
      }}
    >
      <div style={{ width: "min(1180px, calc(100% - var(--space-8) * 2))", margin: "0 auto" }}>
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            textAlign: "center",
            padding: 52,
            border: "1px solid var(--color-border-light)",
            borderRadius: 28,
            background:
              "radial-gradient(circle at 85% 20%, rgba(34, 197, 94, 0.15), transparent 24%), #fff",
            boxShadow: "var(--shadow-xl)",
          }}
        >
          {/* Headline */}
          <h2
            style={{
              maxWidth: 900,
              margin: "0 auto var(--space-4)",
              color: "var(--color-text-primary)",
              fontSize: "clamp(2rem, 3.7vw, 3.9rem)",
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
            }}
          >
            Give your business a website that{" "}
            <span style={{ color: "var(--color-accent)" }}>
              looks as established as you are.
            </span>
          </h2>

          <p
            style={{
              fontSize: "1.06rem",
              color: "var(--color-text-tertiary)",
              maxWidth: 760,
              margin: "0 auto var(--space-6)",
              lineHeight: 1.65,
            }}
          >
            Selected UK Muslim-owned businesses. A starter website that can often cost
            £2,000–£5,000 elsewhere, with £0 development cost for the agreed free scope. No
            obligation to buy extra services.
          </p>

          {/* Reassurance Chips */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 10,
              marginBottom: "var(--space-6)",
            }}
          >
            {REASSURANCE_CHIPS.map((chip) => (
              <span
                key={chip}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  fontSize: "0.86rem",
                  fontWeight: 700,
                  color: "var(--color-text-primary)",
                  background: "#fff",
                  border: "1px solid var(--color-border-light)",
                  borderRadius: "var(--radius-full)",
                  padding: "8px 11px",
                }}
              >
                <span aria-hidden="true">✓</span>
                {chip}
              </span>
            ))}
          </div>

          {/* Action Button */}
          <Button
            href="/apply"
            variant="primary"
            style={{
              background: "var(--color-accent)",
              color: "white",
              fontWeight: 800,
              fontSize: "1rem",
              minHeight: 50,
              padding: "0 22px",
              borderRadius: 12,
              boxShadow: "0 10px 24px rgba(41, 193, 91, 0.25)",
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
