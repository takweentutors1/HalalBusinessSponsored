import { limitedCapacity } from "@/lib/content/landing";

export function LimitedCapacity() {
  return (
    <section
      style={{
        textAlign: "center",
        padding: "var(--space-12) var(--space-8)",
        background: "var(--color-primary-pale)",
      }}
    >
      <h2 style={{ color: "var(--color-primary-dark)", marginBottom: "var(--space-4)" }}>
        {limitedCapacity.title}
      </h2>
      <p
        style={{
          fontSize: "var(--font-size-3xl)",
          fontFamily: "var(--font-display)",
          color: "var(--color-primary-dark)",
          fontWeight: 700,
          marginBottom: "var(--space-2)",
        }}
      >
        {limitedCapacity.statement}
      </p>
      <p style={{ color: "var(--color-text-secondary)" }}>{limitedCapacity.note}</p>
    </section>
  );
}
