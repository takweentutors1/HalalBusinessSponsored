import type { ReactNode } from "react";
import { PagesIcon, RefreshIcon, TagIcon } from "@/components/icons";
import { statsBar } from "@/lib/content/landing";

const icons: ReactNode[] = [<TagIcon key="cost" size={22} />, <PagesIcon key="pages" size={22} />, <RefreshIcon key="revisions" size={22} />];

export function StatsBar() {
  return (
    <section
      style={{
        padding: "var(--space-4) var(--space-8) var(--space-12)",
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "var(--space-4)",
        }}
      >
        {statsBar.map((stat, index) => (
          <div
            key={stat.label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "var(--space-2)",
              padding: "var(--space-6) var(--space-4)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--color-border-light)",
              background: "var(--color-surface-elevated)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 44,
                height: 44,
                borderRadius: "var(--radius-full)",
                background: "var(--color-primary-pale)",
                color: "var(--color-primary-accessible)",
              }}
            >
              {icons[index]}
            </span>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--font-size-3xl)",
                fontWeight: 700,
                color: "var(--color-primary-accessible-dark)",
              }}
            >
              {stat.value}
            </p>
            <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-sm)" }}>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
