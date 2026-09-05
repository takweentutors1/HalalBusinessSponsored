import { whyItsSponsored } from "@/lib/content/landing";

function Column({
  heading,
  headingColor,
  items,
}: {
  heading: string;
  headingColor: string;
  items: readonly string[];
}) {
  return (
    <div>
      <h3 style={{ fontFamily: "var(--font-display)", color: headingColor, marginBottom: "var(--space-4)" }}>
        {heading}
      </h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map((item, index) => (
          <li
            key={item}
            style={{
              padding: "var(--space-3) 0",
              borderTop: index === 0 ? undefined : "1px solid var(--color-border-light)",
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function WhySponsored() {
  return (
    <section style={{ background: "var(--color-surface-base)" }}>
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "var(--space-12) var(--space-8)",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "var(--color-primary-dark)", marginBottom: "var(--space-4)" }}>
          {whyItsSponsored.title}
        </h2>
        <p style={{ color: "var(--color-text-secondary)", marginBottom: "var(--space-8)" }}>
          {whyItsSponsored.intro}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "var(--space-8)",
            marginBottom: "var(--space-8)",
            textAlign: "left",
          }}
        >
          <Column
            heading="You Receive"
            headingColor="var(--color-primary-accessible)"
            items={whyItsSponsored.businessReceives}
          />
          <Column
            heading="We Receive"
            headingColor="var(--color-text-primary)"
            items={whyItsSponsored.initiativeReceives}
          />
        </div>

        <div
          style={{
            background: "var(--color-primary-pale)",
            borderLeft: "4px solid var(--color-primary)",
            borderRadius: "var(--radius-md)",
            padding: "var(--space-4) var(--space-6)",
            textAlign: "left",
          }}
        >
          <p style={{ fontWeight: 600 }}>{whyItsSponsored.feedbackNote}</p>
        </div>
      </div>
    </section>
  );
}
