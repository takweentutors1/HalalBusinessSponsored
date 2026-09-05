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
        textAlign: "center",
        padding: "var(--space-12) var(--space-8)",
        background: "var(--color-primary-pale)",
      }}
    >
      <h2 style={{ color: "var(--color-primary-dark)", marginBottom: "var(--space-6)" }}>
        {limitedCapacity.title}
      </h2>
      <CapacityRing total={limitedCapacity.count} remaining={remaining} />
      <p
        style={{
          fontSize: "var(--font-size-xl)",
          fontFamily: "var(--font-display)",
          color: "var(--color-primary-dark)",
          fontWeight: 700,
          margin: "var(--space-6) 0 var(--space-2)",
        }}
      >
        {limitedCapacity.statement}
      </p>
      <p style={{ color: "var(--color-text-secondary)" }}>{limitedCapacity.note}</p>
    </section>
  );
}
