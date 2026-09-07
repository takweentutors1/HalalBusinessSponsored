/**
 * Static laptop + mobile device mockup replacing the old autoplaying video.
 * Built entirely from CSS (no image/video request) so it doesn't compete
 * with the hero's LCP, and deliberately generic/illustrative — not a real
 * client screenshot, since no completed sponsored site exists yet (see
 * portfolioAndTestimonials in lib/content/landing.ts). The caption in
 * Hero.tsx makes that explicit rather than letting it read as a real
 * client's site.
 */
export function HeroMockup() {
  return (
    <div style={{ position: "relative", maxWidth: 480, margin: "0 auto" }}>
      {/* Laptop */}
      <div
        style={{
          background: "var(--color-neutral-800)",
          borderRadius: "var(--radius-lg)",
          padding: "var(--space-2) var(--space-2) 0",
          boxShadow: "var(--shadow-lg)",
        }}
      >
        <div
          style={{
            background: "var(--color-surface-base)",
            borderRadius: "var(--radius-md)",
            overflow: "hidden",
            aspectRatio: "16 / 10.5",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* nav bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-2)",
              padding: "var(--space-3) var(--space-4)",
              borderBottom: "1px solid var(--color-border-light)",
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "var(--radius-full)",
                background: "var(--color-primary)",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                width: "22%",
                height: 8,
                borderRadius: "var(--radius-full)",
                background: "var(--color-neutral-300)",
              }}
            />
            <span style={{ marginLeft: "auto", display: "flex", gap: "var(--space-2)" }}>
              {[1, 2, 3].map((i) => (
                <span
                  key={i}
                  style={{
                    width: 24,
                    height: 6,
                    borderRadius: "var(--radius-full)",
                    background: "var(--color-neutral-200)",
                  }}
                />
              ))}
            </span>
          </div>

          {/* hero block */}
          <div
            style={{
              padding: "var(--space-4)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-2)",
            }}
          >
            <span
              style={{
                width: "72%",
                height: 12,
                borderRadius: "var(--radius-full)",
                background: "var(--color-neutral-700)",
              }}
            />
            <span
              style={{
                width: "48%",
                height: 12,
                borderRadius: "var(--radius-full)",
                background: "var(--color-neutral-700)",
                marginBottom: "var(--space-2)",
              }}
            />
            <span
              style={{
                width: 84,
                height: 22,
                borderRadius: "var(--radius-full)",
                background: "var(--color-primary)",
              }}
            />
          </div>

          {/* content cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "var(--space-2)",
              padding: "0 var(--space-4) var(--space-4)",
              marginTop: "auto",
            }}
          >
            {[1, 2, 3].map((i) => (
              <span
                key={i}
                style={{
                  aspectRatio: "4 / 3",
                  borderRadius: "var(--radius-md)",
                  background: "var(--color-primary-pale)",
                  border: "1px solid var(--color-border-light)",
                }}
              />
            ))}
          </div>
        </div>

        {/* hinge */}
        <div
          style={{
            height: 10,
            margin: "0 -6%",
            marginTop: "var(--space-2)",
            background: "var(--color-neutral-700)",
            borderRadius: "0 0 var(--radius-md) var(--radius-md)",
          }}
        />
      </div>

      {/* Mobile, overlapping bottom-right */}
      <div
        style={{
          position: "absolute",
          right: "-6%",
          bottom: "-12%",
          width: "26%",
          background: "var(--color-neutral-900)",
          borderRadius: "var(--radius-lg)",
          padding: "var(--space-1)",
          boxShadow: "var(--shadow-lg)",
        }}
      >
        <div
          style={{
            background: "var(--color-surface-base)",
            borderRadius: "calc(var(--radius-lg) - 2px)",
            overflow: "hidden",
            aspectRatio: "9 / 18.5",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-1)",
            padding: "var(--space-2)",
          }}
        >
          <span
            style={{
              width: "40%",
              height: 5,
              borderRadius: "var(--radius-full)",
              background: "var(--color-neutral-300)",
            }}
          />
          <span
            style={{
              width: "85%",
              height: 7,
              borderRadius: "var(--radius-full)",
              background: "var(--color-neutral-700)",
              marginTop: "var(--space-2)",
            }}
          />
          <span
            style={{
              width: "60%",
              height: 7,
              borderRadius: "var(--radius-full)",
              background: "var(--color-neutral-700)",
            }}
          />
          <span
            style={{
              width: "50%",
              height: 14,
              borderRadius: "var(--radius-full)",
              background: "var(--color-primary)",
              marginTop: "var(--space-1)",
            }}
          />
          <span
            style={{
              flex: 1,
              borderRadius: "var(--radius-md)",
              background: "var(--color-primary-pale)",
              border: "1px solid var(--color-border-light)",
              marginTop: "var(--space-1)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
