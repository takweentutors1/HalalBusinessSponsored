"use client";

import { useState } from "react";
import { whatHappensAfterLaunch } from "@/lib/content/landing";

interface AfterLaunchCardItem {
  icon: (size?: number) => React.ReactNode;
  title: string;
  body: string;
}

function RefreshCwIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--color-primary-accessible)"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 2v6h-6" />
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
      <path d="M3 22v-6h6" />
      <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
    </svg>
  );
}

function ClockIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--color-primary-accessible)"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx={12} cy={12} r={10} />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function MessageSquareIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--color-primary-accessible)"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

const CARDS: AfterLaunchCardItem[] = [
  {
    icon: (size) => <RefreshCwIcon size={size} />,
    title: "One-Time Project",
    body: "Complete design, build, revisions and launch strictly within the agreed scope.",
  },
  {
    icon: (size) => <ClockIcon size={size} />,
    title: "Close-Out Window",
    body: "A dedicated post-launch window covers any issues or fixes in the delivered scope.",
  },
  {
    icon: (size) => <MessageSquareIcon size={size} />,
    title: "Fresh Quote for Extras",
    body: "Anything outside original scope gets a clear, transparent quote — never added silently.",
  },
];

function CardItem({ card }: { card: AfterLaunchCardItem }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--color-surface-base)",
        border: "1px solid var(--color-border-light)",
        borderRadius: "var(--radius-lg)",
        padding: "var(--space-6) var(--space-5)",
        boxShadow: hovered ? "var(--shadow-md)" : "var(--shadow-sm)",
        transform: hovered ? "translateY(-2px)" : "none",
        transition: "box-shadow 200ms ease, transform 200ms ease",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      {/* 32x32 pale green circle badge */}
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "var(--radius-full)",
          background: "var(--color-primary-pale)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "var(--space-4)",
          flexShrink: 0,
        }}
      >
        {card.icon(18)}
      </div>

      <h3
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "1.05rem",
          fontWeight: 700,
          color: "var(--color-primary-dark)",
          marginBottom: "var(--space-2)",
          lineHeight: 1.3,
        }}
      >
        {card.title}
      </h3>

      <p
        style={{
          fontSize: "var(--font-size-sm)",
          lineHeight: 1.6,
          color: "var(--color-text-secondary)",
          margin: 0,
        }}
      >
        {card.body}
      </p>
    </div>
  );
}

export function AfterLaunchCards() {
  return (
    <section
      style={{
        position: "relative",
        background: "var(--color-surface-elevated)",
        padding: "var(--space-12) var(--space-8)",
      }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <h2
          style={{
            color: "var(--color-primary-dark)",
            marginBottom: "var(--space-8)",
            textAlign: "center",
          }}
        >
          {whatHappensAfterLaunch.title}
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))",
            gap: "var(--space-5)",
          }}
        >
          {CARDS.map((card) => (
            <CardItem key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
