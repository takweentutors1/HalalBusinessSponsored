"use client";

import { useState } from "react";
import { processSteps } from "@/lib/content/landing";

const STEP_TIMINGS = [
  "5 mins",
  "48 hrs",
  "20 mins",
  "7–10 days",
  "3–5 days",
  "Final check",
];

function StepCard({
  item,
  index,
}: {
  item: { step: string; description: string };
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <li
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: hovered ? "1px solid var(--color-primary-accessible)" : "1px solid var(--color-border-light)",
        borderRadius: "var(--radius-xl)",
        padding: "var(--space-6) var(--space-5)",
        background: "var(--color-surface-base)",
        boxShadow: hovered ? "var(--shadow-md)" : "0 2px 6px rgba(0, 0, 0, 0.04)",
        transform: hovered ? "translateY(-3px)" : "none",
        transition: "all 200ms ease",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* Top row: glowing number badge + duration tag */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "var(--space-4)",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "2.1rem",
            height: "2.1rem",
            borderRadius: "var(--radius-full)",
            background: "#1a4731",
            color: "white",
            fontWeight: 700,
            fontSize: "var(--font-size-sm)",
            boxShadow: "0 0 0 4px rgba(26, 71, 49, 0.12)",
            flexShrink: 0,
          }}
        >
          {index + 1}
        </span>

        <span
          style={{
            fontSize: "var(--font-size-xs)",
            fontWeight: 600,
            color: "var(--color-primary-accessible)",
            background: "var(--color-primary-pale)",
            padding: "2px 8px",
            borderRadius: "var(--radius-full)",
            letterSpacing: "0.02em",
          }}
        >
          {STEP_TIMINGS[index]}
        </span>
      </div>

      <h3
        style={{
          fontFamily: "var(--font-serif)",
          marginBottom: "var(--space-2)",
          fontSize: "1.05rem",
          fontWeight: 700,
          color: "var(--color-primary-dark)",
          lineHeight: 1.3,
        }}
      >
        {item.step}
      </h3>

      <p
        style={{
          color: "var(--color-text-secondary)",
          fontSize: "var(--font-size-sm)",
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        {item.description}
      </p>
    </li>
  );
}

export function ProcessSteps() {
  return (
    <section
      id="how-it-works"
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "var(--space-12) var(--space-8)",
        background: "var(--color-surface-base)",
      }}
    >
      <div style={{ position: "relative", zIndex: 10, maxWidth: 960, margin: "0 auto" }}>
        {/* Centered Header */}
        <div style={{ textAlign: "center", marginBottom: "var(--space-10)" }}>
          <h2
            style={{
              color: "var(--color-primary-dark)",
              marginBottom: "var(--space-2)",
            }}
          >
            {processSteps.title}
          </h2>
          <p
            style={{
              color: "var(--color-text-secondary)",
              fontSize: "var(--font-size-base)",
              maxWidth: 560,
              margin: "0 auto",
            }}
          >
            A transparent 6-step journey from application to live website launch.
          </p>
        </div>

        {/* 6-step Grid (3 desktop, 2 tablet, 1 mobile) */}
        <ol
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(270px, 100%), 1fr))",
            gap: "var(--space-5)",
          }}
        >
          {processSteps.steps.map((item, index) => (
            <StepCard key={item.step} item={item} index={index} />
          ))}
        </ol>
      </div>
    </section>
  );
}

