/**
 * Static laptop + mobile device mockup replacing the old autoplaying video.
 * Built entirely from CSS (no image/video request) so it doesn't compete
 * with the hero's LCP.
 *
 * Content is a faithful miniature of takweentutors.com — a real, live site
 * built by the same team (Takween Digital Services), not a fabricated
 * client example. Brand name, tagline, nav labels, and the brand green
 * (#10b981, which happens to equal this project's own --color-primary)
 * were pulled from the site's live CSS/JS bundles. This is deliberately
 * distinct from portfolioAndTestimonials in lib/content/landing.ts, which
 * stays empty until real *sponsored-client* case studies exist — this
 * mockup is proof of the team's own build quality, not a sponsored output.
 * aria-hidden throughout: decorative at this scale, and the caption in
 * Hero.tsx already states what it is for screen reader users.
 */
export function HeroMockup() {
  return (
    <div aria-hidden="true" style={{ position: "relative", maxWidth: 480, margin: "0 auto" }}>
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
                fontSize: 9,
                fontWeight: 700,
                color: "var(--color-neutral-800)",
                whiteSpace: "nowrap",
              }}
            >
              Takween Tutors
            </span>
            <span
              style={{
                marginLeft: "auto",
                display: "flex",
                gap: "var(--space-3)",
                fontSize: 7,
                fontWeight: 600,
                color: "var(--color-neutral-500)",
                whiteSpace: "nowrap",
              }}
            >
              <span>How It Works</span>
              <span>Become a Tutor</span>
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
                fontSize: 9.5,
                fontWeight: 600,
                lineHeight: 1.4,
                color: "var(--color-neutral-700)",
                width: "78%",
              }}
            >
              A different kind of tuition agency, built on precision, care, and results.
            </span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                width: "fit-content",
                padding: "5px 10px",
                borderRadius: "var(--radius-full)",
                background: "var(--color-primary)",
                color: "white",
                fontSize: 7,
                fontWeight: 700,
                marginTop: "var(--space-1)",
              }}
            >
              Book a Free Trial
            </span>
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
            {["GCSE Biology", "Free Trials", "Resources"].map((label) => (
              <span
                key={label}
                style={{
                  aspectRatio: "4 / 3",
                  borderRadius: "var(--radius-md)",
                  background: "var(--color-primary-pale)",
                  border: "1px solid var(--color-border-light)",
                  display: "flex",
                  alignItems: "flex-end",
                  padding: "var(--space-1)",
                  fontSize: 6,
                  fontWeight: 600,
                  color: "var(--color-primary-accessible-dark)",
                  lineHeight: 1.2,
                }}
              >
                {label}
              </span>
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
              display: "flex",
              alignItems: "center",
              gap: 3,
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "var(--radius-full)",
                background: "var(--color-primary)",
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: 5, fontWeight: 700, color: "var(--color-neutral-800)" }}>
              Takween Tutors
            </span>
          </span>
          <span
            style={{
              fontSize: 5.5,
              fontWeight: 600,
              lineHeight: 1.3,
              color: "var(--color-neutral-700)",
              marginTop: "var(--space-2)",
            }}
          >
            A different kind of tuition agency, built on results.
          </span>
          <span
            style={{
              width: "fit-content",
              padding: "3px 7px",
              borderRadius: "var(--radius-full)",
              background: "var(--color-primary)",
              color: "white",
              fontSize: 4.5,
              fontWeight: 700,
              marginTop: "var(--space-1)",
            }}
          >
            Free Trial
          </span>
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
