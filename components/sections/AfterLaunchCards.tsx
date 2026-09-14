"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
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

function CheckSquareIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--color-primary-accessible)"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function EyeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--color-primary-accessible)"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
    </svg>
  );
}

function PlusSquareIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--color-primary-accessible)"
      strokeWidth={2.5}
      strokeLinecap="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

const CARDS: AfterLaunchCardItem[] = [
  {
    icon: (size) => <CheckSquareIcon size={size} />,
    title: "One-time project",
    body: "The free package covers the agreed scope, build, revisions and launch.",
  },
  {
    icon: (size) => <EyeIcon size={size} />,
    title: "Short close-out",
    body: "Issues directly related to the delivered scope can be reviewed during the close-out period.",
  },
  {
    icon: (size) => <PlusSquareIcon size={size} />,
    title: "Future work",
    body: "Maintenance, new pages and new functionality are separate and can be quoted if required.",
  },
];

/**
 * Cursor-tracking 3D tilt via quickTo, replacing the previous React
 * useState hover lift — this is the exact upgrade the original GSAP
 * plan's mapping matrix specified for this component ("quickTo cursor
 * tilt + 3-card staggered entrance") but was never built during the
 * phased rollout.
 */
function CardItem({ card }: { card: AfterLaunchCardItem }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const quickToRef = useRef<{
    rotateX: gsap.QuickToFunc;
    rotateY: gsap.QuickToFunc;
    y: gsap.QuickToFunc;
  } | null>(null);

  useGSAP(
    () => {
      const el = cardRef.current;
      if (!el || prefersReducedMotion()) return;
      gsap.set(el, { transformPerspective: 800 });
      quickToRef.current = {
        rotateX: gsap.quickTo(el, "rotationX", { duration: 0.4, ease: "power3" }),
        rotateY: gsap.quickTo(el, "rotationY", { duration: 0.4, ease: "power3" }),
        y: gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" }),
      };
    },
    { scope: cardRef }
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion() || !quickToRef.current || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    quickToRef.current.rotateY(px * 12);
    quickToRef.current.rotateX(-py * 12);
    quickToRef.current.y(-4);
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion() || !quickToRef.current) return;
    quickToRef.current.rotateX(0);
    quickToRef.current.rotateY(0);
    quickToRef.current.y(0);
  };

  return (
    <div
      ref={cardRef}
      className="after-launch-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        background: "var(--color-surface-base)",
        border: "1px solid var(--color-border-light)",
        borderRadius: "var(--radius-2xl)",
        padding: "var(--space-6) var(--space-5)",
        boxShadow: "var(--shadow-xl)",
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
          fontFamily: "var(--font-display)",
          fontSize: "1.05rem",
          fontWeight: 700,
          color: "var(--color-primary-accessible)",
          marginBottom: "var(--space-2)",
          lineHeight: 1.3,
        }}
      >
        {card.title}
      </h3>

      <p
        style={{
          fontSize: "var(--font-size-base)",
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
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.from(".after-launch-card", {
        opacity: 0,
        y: 40,
        rotationX: -35,
        transformPerspective: 800,
        stagger: 0.15,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".after-launch-grid", start: "top 80%" },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        background: "var(--color-surface-elevated)",
        padding: "var(--space-12) var(--space-8)",
      }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto", textAlign: "center" }}>
        <span className="ui-section-eyebrow">AFTER LAUNCH</span>
        <h2
          style={{
            marginBottom: "var(--space-8)",
          }}
        >
          {whatHappensAfterLaunch.title}
        </h2>

        <div
          className="after-launch-grid"
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
