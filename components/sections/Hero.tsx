import { Button } from "@/components/ui";
import { Disclosure } from "@/components/shared/Disclosure";
import { hero } from "@/lib/content/landing";
import { HeroVideo } from "./HeroVideo";

export function Hero() {
  return (
    <section
      style={{
        background:
          "linear-gradient(135deg, var(--color-primary-pale) 0%, var(--color-surface-base) 100%)",
        padding: "var(--space-16) var(--space-8)",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <h1
          style={{
            fontSize: "var(--font-size-5xl)",
            marginBottom: "var(--space-6)",
          }}
        >
          {hero.headline}
        </h1>

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
              {bullet}
            </li>
          ))}
        </ul>

        <p style={{ fontWeight: 600, marginBottom: "var(--space-6)" }}>
          {hero.costLine}
        </p>

        <Button href="/apply" variant="primary">
          {hero.ctaLabel}
        </Button>

        <div style={{ marginTop: "var(--space-6)" }}>
          <Disclosure text={hero.disclosureLine} />
        </div>

        <HeroVideo />
      </div>
    </section>
  );
}
