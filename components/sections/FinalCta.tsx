import { Button } from "@/components/ui";
import { finalCta } from "@/lib/content/landing";

/**
 * White text throughout is checked against both gradient stops:
 * white on --color-primary-accessible is 5.48:1, on
 * --color-primary-accessible-dark is 7.14:1 — both clear WCAG AA (4.5:1)
 * at body-text size, not just as headings.
 */
export function FinalCta() {
  return (
    <section
      style={{
        textAlign: "center",
        padding: "var(--space-16) var(--space-8)",
        background:
          "linear-gradient(135deg, var(--color-primary-accessible) 0%, var(--color-primary-accessible-dark) 100%)",
        color: "white",
      }}
    >
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <h2 style={{ marginBottom: "var(--space-6)", color: "white" }}>{finalCta.title}</h2>
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
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
        <Button
          href="/apply"
          variant="primary"
          style={{ background: "white", color: "var(--color-primary-accessible)" }}
        >
          {finalCta.ctaLabel}
        </Button>
      </div>
    </section>
  );
}
