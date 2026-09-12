import { Button } from "@/components/ui";
import { Disclosure } from "@/components/shared/Disclosure";
import { RichText } from "@/components/shared/RichText";
import { hero } from "@/lib/content/landing";

export function Hero() {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: "auto",
        backgroundColor: "#f8fcf8",
        backgroundImage: [
          "radial-gradient(circle at 18% 35%, rgba(180, 238, 205, 0.45) 0%, transparent 45%)",
          "radial-gradient(circle at 80% 50%, rgba(205, 243, 222, 0.40) 0%, transparent 50%)",
          "radial-gradient(circle at 50% 100%, rgba(230, 248, 238, 0.6) 0%, transparent 60%)",
        ].join(", "),
        overflow: "hidden",
        padding: "var(--space-16) var(--space-8)",
      }}
    >
      {/* No decorative SVG shapes — clean background only */}

      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 760,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <div style={{ marginBottom: "var(--space-2)" }}>
          <span className="ui-section-eyebrow">
            FREE WEBSITES FOR UK MUSLIM-OWNED BUSINESSES
          </span>
        </div>
        <h1
          style={{
            marginBottom: "var(--space-4)",
          }}
        >
          {hero.headline}
        </h1>

        <p style={{ fontWeight: 600, fontSize: "var(--font-size-lg)", marginBottom: "var(--space-4)" }}>
          <RichText text={hero.costLine} />
        </p>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            marginBottom: "var(--space-6)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "var(--space-3)",
          }}
        >
          {hero.bullets.map((bullet) => (
            <li
              key={bullet}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "var(--space-3)",
                color: "var(--color-text-secondary)",
                fontSize: "var(--font-size-base)",
                lineHeight: 1.55,
                textAlign: "left",
                maxWidth: 480,
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  backgroundColor: "rgba(26, 71, 49, 0.12)",
                  color: "var(--color-primary-accessible)",
                  flexShrink: 0,
                  marginTop: 3,
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span style={{ flex: 1 }}>
                <RichText text={bullet} />
              </span>
            </li>
          ))}
        </ul>

        <p
          style={{
            color: "var(--color-text-secondary)",
            fontSize: "var(--font-size-base)",
            marginBottom: "var(--space-6)",
          }}
        >
          {hero.disclosureLine}
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "var(--space-4)",
          }}
        >
          <Button href={hero.ctaHref} variant="primary">
            {hero.ctaLabel}
          </Button>
          <Button href={hero.secondaryCtaHref} variant="ghost">
            {hero.secondaryCtaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
