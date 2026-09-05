import { statsBar } from "@/lib/content/landing";

export function StatsBar() {
  return (
    <section
      style={{
        padding: "var(--space-8)",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: "var(--space-6)",
        maxWidth: 900,
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      {statsBar.map((stat) => (
        <div key={stat.label}>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--font-size-4xl)",
              fontWeight: 700,
              color: "var(--color-primary-accessible)",
            }}
          >
            {stat.value}
          </p>
          <p style={{ color: "var(--color-text-secondary)" }}>{stat.label}</p>
        </div>
      ))}
    </section>
  );
}
