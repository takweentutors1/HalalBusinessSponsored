import { Button } from "@/components/ui";

export type MidCtaTone = "plain" | "tint";

interface MidCtaProps {
  label: string;
  href: string;
  supportingText?: string;
  subtext?: string;
  tone?: MidCtaTone;
}

export function MidCta({ label, href, supportingText, subtext, tone = "plain" }: MidCtaProps) {
  const isTint = tone === "tint";
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: isTint ? "#f0f7f4" : "var(--color-surface-base)",
        borderTop: "1px solid var(--color-border-light)",
        borderBottom: "1px solid var(--color-border-light)",
        textAlign: "center",
        padding: "var(--space-6) var(--space-8)",
      }}
    >
      <div style={{ position: "relative", zIndex: 10, maxWidth: 640, margin: "0 auto" }}>
        {supportingText && (
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.125rem",
              fontWeight: 600,
              color: "var(--color-primary-dark)",
              marginBottom: subtext ? "var(--space-1)" : "var(--space-4)",
              lineHeight: 1.4,
            }}
          >
            {supportingText}
          </p>
        )}
        {subtext && (
          <p
            style={{
              fontSize: "var(--font-size-base)",
              color: "var(--color-text-tertiary)",
              marginBottom: "var(--space-4)",
            }}
          >
            {subtext}
          </p>
        )}
        <Button href={href} variant="primary">
          <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-2)" }}>
            <span>{label}</span>
            <span aria-hidden="true" style={{ fontSize: "1.1em", transition: "transform 0.15s ease" }}>
              →
            </span>
          </span>
        </Button>
      </div>
    </section>
  );
}
