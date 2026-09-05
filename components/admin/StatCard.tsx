import { Card } from "@/components/ui";

export interface StatCardProps {
  label: string;
  value: number;
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <Card
      className="ui-admin-stat-card"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-4)",
        padding: "var(--space-4) var(--space-6)",
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: "var(--radius-full)",
          background: "var(--color-primary-pale)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 6h16M4 12h16M4 18h10"
            stroke="var(--color-primary-accessible)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div>
        <div
          style={{
            fontSize: "var(--font-size-2xl)",
            fontWeight: 700,
            fontFamily: "var(--font-display)",
            lineHeight: 1,
          }}
        >
          {value}
        </div>
        <div style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-sm)" }}>{label}</div>
      </div>
    </Card>
  );
}
