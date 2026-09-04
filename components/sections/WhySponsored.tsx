import { Card } from "@/components/ui";
import { whyItsSponsored } from "@/lib/content/landing";

export function WhySponsored() {
  return (
    <section
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: "var(--space-12) var(--space-8)",
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
        }}
      >
        <Card>
          <h4>The Business Receives</h4>
          <ul style={{ listStyle: "none", padding: 0, marginTop: "var(--space-3)" }}>
            {whyItsSponsored.businessReceives.map((item) => (
              <li key={item} style={{ padding: "var(--space-2) 0" }}>
                {item}
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h4>The Initiative Receives</h4>
          <ul style={{ listStyle: "none", padding: 0, marginTop: "var(--space-3)" }}>
            {whyItsSponsored.initiativeReceives.map((item) => (
              <li key={item} style={{ padding: "var(--space-2) 0" }}>
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div
        style={{
          background: "var(--color-primary-pale)",
          borderLeft: "4px solid var(--color-primary)",
          borderRadius: "var(--radius-md)",
          padding: "var(--space-4) var(--space-6)",
        }}
      >
        <p style={{ fontWeight: 600 }}>{whyItsSponsored.feedbackNote}</p>
      </div>
    </section>
  );
}
