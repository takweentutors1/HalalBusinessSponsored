import { Button } from "@/components/ui";
import { Disclosure } from "@/components/shared/Disclosure";
import { RichText } from "@/components/shared/RichText";
import { hero } from "@/lib/content/landing";
import { HeroMockup } from "./HeroMockup";

export function Hero() {
  return (
    <section
      style={{
        background:
          "linear-gradient(135deg, var(--color-primary-pale) 0%, var(--color-surface-base) 100%)",
        padding: "var(--space-16) var(--space-8)",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(360px, 100%), 1fr))",
          gap: "var(--space-12)",
          alignItems: "center",
        }}
      >
        <div style={{ minWidth: 0 }}>
          <h1
            style={{
              fontSize: "var(--font-size-4xl)",
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
              gap: "var(--space-2)",
            }}
          >
            {hero.bullets.map((bullet) => (
              <li key={bullet} style={{ color: "var(--color-text-secondary)" }}>
                <RichText text={bullet} />
              </li>
            ))}
          </ul>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "var(--space-4)",
              marginBottom: "var(--space-6)",
            }}
          >
            <Button href={hero.ctaHref} variant="primary">
              {hero.ctaLabel}
            </Button>
            <Button href={hero.secondaryCtaHref} variant="ghost">
              {hero.secondaryCtaLabel}
            </Button>
          </div>

          <p
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-2)",
              color: "var(--color-text-secondary)",
              fontSize: "var(--font-size-sm)",
              marginBottom: "var(--space-4)",
            }}
          >
            <span aria-hidden="true" style={{ color: "var(--color-primary-accessible)" }}>
              ✓
            </span>
            {hero.trustLine}
          </p>

          <Disclosure text={hero.disclosureLine} />
        </div>

        <div style={{ minWidth: 0 }}>
          <HeroMockup />
          <p
            style={{
              textAlign: "center",
              color: "var(--color-text-tertiary)",
              fontSize: "var(--font-size-xs)",
              marginTop: "var(--space-3)",
            }}
          >
            {hero.mockupCaption}
          </p>
        </div>
      </div>
    </section>
  );
}
