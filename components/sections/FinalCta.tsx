import { Button } from "@/components/ui";
import { finalCta } from "@/lib/content/landing";

export function FinalCta() {
  return (
    <section
      style={{
        textAlign: "center",
        padding: "var(--space-16) var(--space-8)",
        background:
          "linear-gradient(135deg, var(--color-primary-pale) 0%, var(--color-surface-base) 100%)",
      }}
    >
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <h2 style={{ marginBottom: "var(--space-6)" }}>{finalCta.title}</h2>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            marginBottom: "var(--space-8)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-2)",
          }}
        >
          {finalCta.bullets.map((bullet) => (
            <li key={bullet} style={{ color: "var(--color-text-secondary)" }}>
              {bullet}
            </li>
          ))}
        </ul>
        <Button variant="primary">{finalCta.ctaLabel}</Button>
      </div>
    </section>
  );
}
