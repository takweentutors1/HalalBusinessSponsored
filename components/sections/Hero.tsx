"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui";
import { RichText } from "@/components/shared/RichText";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { hero } from "@/lib/content/landing";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="var(--color-accent)" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function TrendUpIcon() {
  return (
    <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="var(--color-accent)" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 18l4-4 4 3 6-8" />
      <path d="M14 9h4v4" />
    </svg>
  );
}

const MOCK_CARD_ICONS = [
  <path key="a" d="M4 18V8l8-4 8 4v10M8 18v-5h8v5" />,
  <path key="b" d="M7 10h10M7 14h6M5 4h14a2 2 0 0 1 2 2v12H3V6a2 2 0 0 1 2-2z" />,
  <path key="c" d="M4 12l4 4L20 4M4 20h16" />,
];

/**
 * Two-column hero: copy on the left, a decorative "browser window" mockup
 * on the right — ported from the docs/index.html redesign (previously a
 * single centered column with no visual). The mock browser content is
 * purely illustrative, matching hero.mockVisual in lib/content/landing.ts.
 *
 * Client component (not a Server Component like most sections) because
 * of the GSAP opening timeline below — that's fine here since Hero
 * does no data fetching, unlike e.g. LimitedCapacity.tsx, which is the
 * actual line docs/GSAP_SCROLLTRIGGER_PLAN.md §1.1 draws: server
 * components stay server components only where fetching happens, not
 * everywhere by default.
 *
 * The entrance timeline staggers the copy in (badge → heading → bullets →
 * urgency strip → CTAs), skipped entirely under prefers-reduced-motion.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // .hero-heading (the h1) is deliberately EXCLUDED from this list —
      // see the comment on the h1 element itself for why: it's the
      // page's Lighthouse LCP element, and hiding it behind opacity: 0
      // until GSAP hydrates measurably hurt the real performance score
      // under mobile CPU/network throttling (verified: 90 vs. 99 desktop,
      // with 87% of LCP time as "Render Delay" — the h1 waiting on JS).
      const targets = ".hero-badge, .hero-bullet-item, .hero-urgency-item, .hero-cta-group";

      if (prefersReducedMotion()) {
        // These elements start hidden via the .hero-anim-init class
        // (see app/globals.css) so there's no pre-hydration flash for
        // motion-enabled users — but that means reduced-motion users
        // need an explicit reveal here, or they'd never see this
        // content at all. An inline opacity:1 (not clearProps) is
        // required to actually win over that class's opacity:0 —
        // clearProps only strips inline styles GSAP itself set, it
        // can't remove a class-authored CSS rule.
        gsap.set(targets, { opacity: 1 });
        return;
      }

      // fromTo (not .from()) because the DOM already starts at
      // opacity: 0 via .hero-anim-init — .from() reads the *current*
      // value as its "to" target, which would already be 0 here and
      // produce a no-op tween. fromTo states both ends explicitly.
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".hero-badge", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".hero-bullet-item",
          { opacity: 0, x: -24 },
          { opacity: 1, x: 0, stagger: 0.12, duration: 0.6, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(
          ".hero-urgency-item",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, stagger: 0.08, duration: 0.5 },
          "-=0.3"
        )
        .fromTo(
          ".hero-cta-group",
          { opacity: 0, y: 20, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6 },
          "-=0.3"
        )
        // Browser mockup: transform-only (no opacity) — deliberately not
        // the same .hero-anim-init pattern as the copy column. It's a
        // large block, and hiding a large element behind opacity: 0 pre-
        // hydration risks it becoming a *later, worse* Lighthouse LCP
        // candidate than the h1 fix from Phase 7 solved — transforms
        // don't affect "when was this content painted", so this settles
        // into place with zero LCP exposure.
        .fromTo(".hero-browser-mockup", { x: 40, scale: 0.96 }, { x: 0, scale: 1, duration: 1 }, 0)
        .from(
          ".hero-mock-card",
          { opacity: 0, y: 16, stagger: 0.1, duration: 0.5, ease: "power2.out" },
          "-=0.3"
        );

      // Idle float once settled — small, continuous, not part of the
      // one-shot entrance timeline above.
      gsap.to(".hero-browser-mockup", {
        y: 8,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.6,
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        backgroundColor: "#fff",
        backgroundImage: [
          "radial-gradient(circle at 88% 14%, rgba(34, 197, 94, 0.11), transparent 25%)",
          "linear-gradient(180deg, #ffffff 0%, #fbfefc 100%)",
        ].join(", "),
        overflow: "hidden",
        padding: "var(--space-16) var(--space-8)",
      }}
    >
      <div
        className="ui-hero-grid"
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 1180,
          margin: "0 auto",
          display: "grid",
          gap: "var(--space-12)",
          alignItems: "center",
        }}
      >
        {/* Copy column */}
        <div style={{ maxWidth: 680 }}>
          <div
            className="hero-badge hero-anim-init"
            style={{
              fontWeight: 800,
              color: "var(--color-accent)",
              marginBottom: "var(--space-4)",
            }}
          >
            {hero.topline}
          </div>

          {/* No .hero-anim-init / entrance tween on this h1 — it's the
              page's LCP element (confirmed via Lighthouse), and gating
              it behind opacity: 0 until GSAP hydrates directly delays
              LCP under real mobile CPU/network throttling. Renders
              visible immediately; every other hero element still
              animates in around it. */}
          <h1
            className="ui-hero-heading"
            style={{
              marginBottom: "var(--space-6)",
              fontSize: "clamp(2.65rem, 5.4vw, 5.8rem)",
              lineHeight: 0.98,
            }}
          >
            {hero.headline.replace(hero.headlineHighlight, "")}
            <span style={{ color: "var(--color-accent)" }}>{hero.headlineHighlight}</span>
          </h1>

          <ul
            style={{
              listStyle: "none",
              padding: 0,
              marginBottom: "var(--space-6)",
              display: "grid",
              gap: "var(--space-3)",
            }}
          >
            {hero.bullets.map((bullet, i) => (
              <li
                key={bullet}
                className="hero-bullet-item hero-anim-init"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "var(--space-3)",
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "var(--color-text-primary)",
                  lineHeight: 1.5,
                }}
              >
                <span style={{ flexShrink: 0, marginTop: 2 }}>
                  {i === 0 ? <ArrowIcon /> : <TrendUpIcon />}
                </span>
                <span>
                  <RichText text={bullet} />
                </span>
              </li>
            ))}
          </ul>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "var(--space-3)",
              marginBottom: "var(--space-6)",
            }}
          >
            {hero.urgencyItems.map((item) => (
              <div
                key={item.label}
                className="hero-urgency-item hero-anim-init"
                style={{
                  border: "1px solid var(--color-border-light)",
                  borderRadius: "var(--radius-lg)",
                  padding: "var(--space-3)",
                  background: "var(--color-surface-base)",
                  minWidth: 150,
                  flex: "1 1 150px",
                }}
              >
                <b style={{ display: "block", color: "var(--color-accent)", fontSize: "var(--font-size-base)" }}>
                  {item.label}
                </b>
                <span style={{ fontSize: "var(--font-size-xs)", color: "var(--color-text-tertiary)" }}>{item.note}</span>
              </div>
            ))}
          </div>

          <div className="hero-cta-group hero-anim-init" style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-4)" }}>
            <Button
              href={hero.ctaHref}
              variant="primary"
              className="cta-btn-accent"
              style={{ background: "var(--color-accent)", boxShadow: "0 10px 24px rgba(41, 193, 91, 0.25)" }}
            >
              {hero.ctaLabel}
            </Button>
            <Button href={hero.secondaryCtaHref} variant="secondary">
              {hero.secondaryCtaLabel}
            </Button>
          </div>
          <p style={{ marginTop: "var(--space-4)", fontWeight: 700, color: "var(--color-text-secondary)" }}>
            {hero.disclosureLine}
          </p>
        </div>

        {/* Browser mockup visual — purely decorative placeholder content
            (fake pill/heading/body text), not real information, so it's
            hidden from assistive tech rather than mislabeled as meaningful. */}
        <div
          aria-hidden="true"
          className="hero-browser-mockup"
          style={{
            border: "1px solid #dfe5e2",
            borderRadius: "var(--radius-2xl)",
            background: "var(--color-surface-base)",
            boxShadow: "0 30px 70px rgba(17,24,39,.12)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: 42,
              borderBottom: "1px solid var(--color-border-light)",
              display: "flex",
              alignItems: "center",
              gap: 7,
              padding: "0 14px",
              background: "#fafafa",
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#d1d5db" }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#d1d5db" }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#d1d5db" }} />
          </div>

          <div style={{ padding: "var(--space-5)" }}>
            <div
              className="ui-mock-hero"
              style={{
                borderRadius: "var(--radius-xl)",
                minHeight: 210,
                background: "linear-gradient(135deg,#f9fafb,#eefbf3)",
                padding: "var(--space-6)",
                display: "grid",
                gap: "var(--space-4)",
              }}
            >
              <div>
                <span
                  style={{
                    display: "inline-block",
                    background: "var(--color-accent)",
                    color: "#fff",
                    borderRadius: "var(--radius-full)",
                    padding: "6px 10px",
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    marginBottom: "var(--space-3)",
                  }}
                >
                  {hero.mockVisual.pill}
                </span>
                <h4 style={{ fontSize: "1.55rem", marginBottom: "var(--space-2)", letterSpacing: "-0.03em" }}>
                  {hero.mockVisual.heading}
                </h4>
                <p style={{ fontSize: "0.82rem", color: "var(--color-text-secondary)", margin: 0 }}>
                  {hero.mockVisual.body}
                </p>
              </div>
              <div
                aria-hidden="true"
                style={{
                  borderRadius: "var(--radius-lg)",
                  background:
                    "linear-gradient(160deg, rgba(34,197,94,.18), rgba(34,197,94,.02)), var(--color-surface-elevated)",
                }}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "var(--space-3)",
                marginTop: "var(--space-4)",
              }}
            >
              {MOCK_CARD_ICONS.map((path, i) => (
                <div
                  key={i}
                  aria-hidden="true"
                  className="hero-mock-card"
                  style={{
                    minHeight: 100,
                    border: "1px solid var(--color-border-light)",
                    borderRadius: "var(--radius-lg)",
                    background: "var(--color-surface-base)",
                    padding: "var(--space-3)",
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "var(--radius-md)",
                      background: "var(--color-accent-pale)",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="var(--color-accent-dark)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      {path}
                    </svg>
                  </div>
                  <div style={{ height: 7, borderRadius: 99, background: "var(--color-primary-light)", width: "55%", marginTop: "var(--space-3)" }} />
                  <div style={{ height: 7, borderRadius: 99, background: "var(--color-border-medium)", width: "80%", marginTop: 6 }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* .hero-anim-init (app/globals.css) hides these elements until GSAP
          reveals them on hydration — without JS that never happens, so
          this is the no-JS fallback restoring them to visible. */}
      <noscript>
        <style>{`.hero-anim-init { opacity: 1 !important; }`}</style>
      </noscript>
    </section>
  );
}
