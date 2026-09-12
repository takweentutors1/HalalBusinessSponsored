import { limitedCapacity } from "@/lib/content/landing";
import { getAcceptedCountThisMonth } from "@/lib/db/queries";
import { CapacityRing } from "./CapacityRing";

/**
 * The ring shows real spots-remaining data from D1 (see
 * getAcceptedCountThisMonth), not a fixed figure — this is why the
 * homepage route is marked force-dynamic (see app/(marketing)/page.tsx),
 * so it's read fresh on every request rather than frozen at build time.
 */
export async function LimitedCapacity() {
  const acceptedThisMonth = await getAcceptedCountThisMonth();
  const remaining = Math.max(0, limitedCapacity.count - acceptedThisMonth);

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
        padding: "var(--space-12) var(--space-8)",
        background: "#fafaf7",
      }}
    >
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 640,
          margin: "0 auto",
          background: "var(--color-surface-base)",
          border: "1px solid var(--color-border-light)",
          borderRadius: "var(--radius-xl)",
          boxShadow: "var(--shadow-lg)",
          padding: "var(--space-8) var(--space-6)",
        }}
      >
        {/* Live Cohort Status Pill */}
        <div style={{ marginBottom: "var(--space-3)" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--space-2)",
              padding: "var(--space-1) var(--space-4)",
              borderRadius: "var(--radius-full)",
              background: "rgba(26, 71, 49, 0.08)",
              border: "1px solid rgba(26, 71, 49, 0.2)",
              color: "var(--color-primary-accessible)",
              fontSize: "var(--font-size-xs)",
              fontWeight: 700,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "var(--radius-full)",
                background: "#16a34a",
                boxShadow: "0 0 0 2px rgba(22, 163, 74, 0.2)",
              }}
            />
            Cohort Status: Applications Open
          </span>
        </div>

        <div>
          <span className="ui-section-eyebrow">LIMITED MONTHLY CAPACITY</span>
        </div>

        <h2
          style={{
            marginBottom: "var(--space-6)",
          }}
        >
          We currently offer up to 5 free websites per month.
        </h2>

        {/* Capacity Ring */}
        <div style={{ margin: "var(--space-2) auto" }}>
          <CapacityRing total={limitedCapacity.count} remaining={remaining} />
        </div>

        {/* Statement & Subtext */}
        <p
          style={{
            fontSize: "var(--font-size-xl)",
            fontFamily: "var(--font-serif)",
            color: "#0f172a",
            fontWeight: 700,
            margin: "var(--space-6) 0 var(--space-2)",
            lineHeight: 1.35,
          }}
        >
          {remaining} of {limitedCapacity.count} places currently available
        </p>
        <p
          style={{
            color: "var(--color-text-secondary)",
            fontSize: "var(--font-size-base)",
            lineHeight: 1.6,
            maxWidth: 460,
            margin: "0 auto",
          }}
        >
          Capacity should always reflect the real number available.
        </p>
      </div>
    </section>
  );
}

