import { Button } from "@/components/ui";

export type MidCtaTone = "plain" | "tint";

const TONE_BACKGROUND: Record<MidCtaTone, string | undefined> = {
  plain: undefined,
  tint: "var(--color-primary-pale)",
};

interface MidCtaProps {
  label: string;
  href: string;
  supportingText?: string;
  tone?: MidCtaTone;
}

export function MidCta({ label, href, supportingText, tone = "plain" }: MidCtaProps) {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: TONE_BACKGROUND[tone],
        textAlign: "center",
        padding: "var(--space-10) var(--space-8)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(/images/bg-cta.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.9,
          zIndex: 1,
        }}
      />
      <div style={{ position: "relative", zIndex: 10 }}>
        {supportingText && (
          <p style={{ color: "var(--color-text-secondary)", marginBottom: "var(--space-4)" }}>
            {supportingText}
          </p>
        )}
        <Button href={href} variant="primary">
          {label}
        </Button>
      </div>
    </section>
  );
}
