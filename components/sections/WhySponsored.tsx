import type { ReactNode } from "react";
import { RichText } from "@/components/shared/RichText";
import { TrustIllustration } from "@/components/illustrations";
import { GalleryIcon, MonitorIcon } from "@/components/icons";
import { whyItsSponsored } from "@/lib/content/landing";

/** Bidirectional swap glyph marking the exchange between the two panels. */
function ExchangeGlyph() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width={28} height={28}>
      <path
        d="M4 8h13.5M14 4l3.5 4L14 12"
        fill="none"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 16H6.5M10 20l-3.5-4L10 12"
        fill="none"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExchangePanel({
  icon,
  heading,
  items,
}: {
  icon: ReactNode;
  heading: string;
  items: readonly string[];
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.25)",
        borderRadius: "var(--radius-lg)",
        padding: "var(--space-6)",
        textAlign: "left",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginBottom: "var(--space-4)" }}>
        <span aria-hidden="true" style={{ color: "white" }}>
          {icon}
        </span>
        <h3 style={{ fontFamily: "var(--font-display)", color: "white", fontSize: "var(--font-size-lg)" }}>
          {heading}
        </h3>
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map((item, index) => (
          <li
            key={item}
            style={{
              padding: "var(--space-3) 0",
              borderTop: index === 0 ? undefined : "1px solid rgba(255,255,255,0.18)",
              color: "rgba(255,255,255,0.95)",
            }}
          >
            <RichText text={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * High-contrast trust banner — deliberately as visually loud as FinalCta
 * (same gradient) rather than blending in as another white section, since
 * this is the page's one explicit answer to "what's the catch?". White
 * text checked against both gradient stops in FinalCta.tsx's comment
 * applies identically here (same gradient, same stops).
 */
export function WhySponsored() {
  return (
    <section
      id={whyItsSponsored.id}
      style={{
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(135deg, var(--color-primary-accessible) 0%, var(--color-primary-accessible-dark) 100%)",
        padding: "var(--space-16) var(--space-8)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(/images/bg-trust.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.8,
          zIndex: 1,
        }}
      />
      <div style={{ position: "relative", zIndex: 10, maxWidth: 960, margin: "0 auto", textAlign: "center" }}>
        <TrustIllustration size={64} tone="dark" />
        <h2 style={{ color: "white", marginTop: "var(--space-4)", marginBottom: "var(--space-6)" }}>
          {whyItsSponsored.title}
        </h2>
        <p style={{ color: "rgba(255,255,255,0.9)", marginBottom: "var(--space-10)" }}>
          <RichText text={whyItsSponsored.intro} />
        </p>

        <div style={{ position: "relative", marginBottom: "var(--space-8)" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))",
              gap: "var(--space-6)",
            }}
          >
            <ExchangePanel icon={<MonitorIcon size={24} />} heading="You Receive" items={whyItsSponsored.businessReceives} />
            <ExchangePanel icon={<GalleryIcon size={24} />} heading="We Receive" items={whyItsSponsored.initiativeReceives} />
          </div>
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 48,
              height: 48,
              borderRadius: "var(--radius-full)",
              background: "var(--color-primary-accessible-dark)",
              border: "3px solid var(--color-primary-pale)",
            }}
          >
            <ExchangeGlyph />
          </div>
        </div>

        <div
          style={{
            background: "white",
            borderRadius: "var(--radius-full)",
            padding: "var(--space-3) var(--space-6)",
            display: "inline-block",
          }}
        >
          <p style={{ fontWeight: 600, color: "var(--color-primary-accessible-dark)" }}>
            <RichText text={whyItsSponsored.feedbackNote} />
          </p>
        </div>
      </div>
    </section>
  );
}
