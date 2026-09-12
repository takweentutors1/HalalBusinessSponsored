import type { ReactNode } from "react";

interface InfoCalloutProps {
  icon?: ReactNode;
  children?: ReactNode;
}

function GlobeIcon() {
  return (
    <svg
      aria-hidden="true"
      width={22}
      height={22}
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--color-primary-accessible)"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0, marginTop: "2px" }}
    >
      <circle cx={12} cy={12} r={10} />
      <line x1={2} y1={12} x2={22} y2={12} />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

export function InfoCallout({ icon, children }: InfoCalloutProps) {
  return (
    <section
      style={{
        padding: "var(--space-8) var(--space-6)",
        background: "var(--color-surface-base)",
      }}
    >
      <div
        style={{
          maxWidth: 680,
          margin: "0 auto",
          background: "var(--color-neutral-50)",
          border: "1px solid var(--color-border-light)",
          borderLeft: "3px solid var(--color-primary-accessible)",
          borderRadius: "var(--radius-lg)",
          padding: "var(--space-4) var(--space-5)",
          display: "flex",
          alignItems: "flex-start",
          gap: "var(--space-4)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        {icon ?? <GlobeIcon />}
        <div
          style={{
            fontSize: "var(--font-size-base)",
            lineHeight: 1.6,
            color: "var(--color-text-secondary)",
          }}
        >
          {children ?? (
            <>
              <strong style={{ color: "var(--color-text-primary)" }}>
                You keep full ownership of your domain and hosting.
              </strong>{" "}
              Any paid plugins, licences or third-party services remain a separate direct cost — and we’ll guide you to the best, budget-friendly options if needed.
            </>
          )}
        </div>
      </div>
    </section>
  );
}
