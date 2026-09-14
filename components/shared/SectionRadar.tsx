"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export interface SectionRadarItem {
  /** Must match a real section id on the page (see app/(marketing)/page.tsx). */
  id: string;
  label: string;
}

/**
 * Same default subset as HeaderNav.tsx's DEFAULT_HEADER_NAV_ITEMS —
 * deliberately not all 12 section ids, which would make for a very
 * cramped dot column. Callers can override via the `items` prop.
 */
export const DEFAULT_SECTION_RADAR_ITEMS: SectionRadarItem[] = [
  { id: "the-problem", label: "The Problem" },
  { id: "scope", label: "What You Get" },
  { id: "who-qualifies", label: "Who Qualifies" },
  { id: "how-it-works", label: "How It Works" },
  { id: "faq", label: "FAQ" },
];

interface SectionRadarProps {
  items?: SectionRadarItem[];
  className?: string;
}

/**
 * Vertical "chapter dots" floating on the right edge of the viewport,
 * with a progress rail behind them: a thin track fills from the first
 * tracked section's top to the last one's bottom, scrubbed 1:1 to
 * scroll position (not a discrete per-dot jump — the fill height is a
 * continuous function of scroll progress across the whole tracked
 * range). The active dot (closest section, same IntersectionObserver
 * technique as HeaderNav.tsx) scales up and shows its label on hover;
 * every dot is a real <a href="#id"> for keyboard/click navigation.
 *
 * Standalone, not wired into any page yet — same "Create" scope as
 * HeaderNav.tsx (P2). Desktop-only by design (see the ≤960px media
 * query in app/globals.css): a fixed rail on the right edge would
 * collide with content on narrower viewports.
 */
export function SectionRadar({ items = DEFAULT_SECTION_RADAR_ITEMS, className }: SectionRadarProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const railFillRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  // Active-dot spy — identical band/logic to HeaderNav.tsx, kept in
  // sync deliberately: both components answer "what section am I on"
  // and should never disagree about it.
  useEffect(() => {
    const targets = items
      .map((item) => ({ item, el: document.getElementById(item.id) }))
      .filter((t): t is { item: SectionRadarItem; el: HTMLElement } => t.el !== null);

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const match = targets.find((t) => t.el === entry.target);
            if (match) setActiveId(match.item.id);
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    for (const { el } of targets) observer.observe(el);
    return () => observer.disconnect();
  }, [items]);

  // Progress rail — a continuous scrub, independent of which discrete
  // dot is "active". Spans from the first tracked section's top to the
  // last one's bottom, so the fill height is a genuine function of
  // scroll position across that whole range, not a step function.
  //
  // Deliberately NOT gated behind prefersReducedMotion(): `scrub: true`
  // (no lag/smoothing number) ties the fill directly 1:1 to scroll
  // position rather than playing an independent eased animation, and
  // this rail carries real functional information (scroll progress),
  // not decoration — hiding it entirely for reduced-motion users would
  // be a real information loss, not a courtesy. The separate active-dot
  // "pop" below (a genuine eased, autoplaying animation) is still gated.
  useGSAP(() => {
    const fill = railFillRef.current;
    if (!fill) return;

    const firstEl = document.getElementById(items[0]?.id ?? "");
    const lastEl = document.getElementById(items[items.length - 1]?.id ?? "");
    if (!firstEl || !lastEl) return;

    gsap.fromTo(
      fill,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: firstEl,
          start: "top center",
          endTrigger: lastEl,
          end: "bottom center",
          scrub: true,
        },
      }
    );
  }, [items]);

  // Active dot pop — separate from the continuous rail scrub above,
  // this is the discrete "you are here" feedback on the dot itself.
  useGSAP(
    () => {
      if (prefersReducedMotion() || !activeId) return;
      const dot = dotRefs.current.get(activeId);
      if (!dot) return;
      gsap.fromTo(dot, { scale: 1 }, { scale: 1.4, duration: 0.3, ease: "back.out(2)" });
    },
    { dependencies: [activeId] }
  );

  return (
    <nav
      className={["section-radar-nav", className].filter(Boolean).join(" ")}
      aria-label="Section navigation"
      style={{
        position: "fixed",
        right: "var(--space-6)",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 50,
      }}
    >
      <div className="section-radar" style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-6)" }}>
        {/* Track + fill rail, spanning from the center of the first dot
            to the center of the last — positioned via inset rather than
            a measured height, so it stays correct across re-renders. */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 6,
            bottom: 6,
            left: "50%",
            width: 2,
            transform: "translateX(-50%)",
            background: "var(--color-border-light)",
            borderRadius: "var(--radius-full)",
          }}
        >
          <div
            ref={railFillRef}
            style={{
              width: "100%",
              height: "100%",
              transformOrigin: "top",
              transform: "scaleY(0)",
              background: "linear-gradient(180deg, var(--color-primary-accessible), var(--color-accent))",
              borderRadius: "var(--radius-full)",
            }}
          />
        </div>

        {items.map((item) => {
          const isActive = activeId === item.id;
          const isHovered = hoveredId === item.id;
          return (
            <div key={item.id} style={{ position: "relative", display: "flex", alignItems: "center" }}>
              {/* Label — shown on hover, or always for the active dot,
                  sliding in from the right since the dots sit at the
                  viewport's right edge. */}
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  right: "calc(100% + var(--space-3))",
                  top: "50%",
                  transform: "translateY(-50%)",
                  whiteSpace: "nowrap",
                  fontSize: "var(--font-size-xs)",
                  fontWeight: 700,
                  padding: "4px 10px",
                  borderRadius: "var(--radius-full)",
                  background: "var(--color-surface-base)",
                  boxShadow: "var(--shadow-sm)",
                  color: isActive ? "var(--color-primary-accessible)" : "var(--color-text-secondary)",
                  opacity: isHovered || isActive ? 1 : 0,
                  pointerEvents: "none",
                  transition: "opacity 150ms ease",
                }}
              >
                {item.label}
              </span>

              <a
                ref={(el) => {
                  if (el) dotRefs.current.set(item.id, el);
                  else dotRefs.current.delete(item.id);
                }}
                href={`#${item.id}`}
                aria-label={item.label}
                aria-current={isActive ? "true" : undefined}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  position: "relative",
                  zIndex: 1,
                  display: "block",
                  width: 10,
                  height: 10,
                  borderRadius: "var(--radius-full)",
                  background: isActive ? "var(--color-primary-accessible)" : "var(--color-surface-base)",
                  border: `2px solid ${isActive ? "var(--color-primary-accessible)" : "var(--color-border-medium)"}`,
                  transition: "background 200ms ease, border-color 200ms ease",
                }}
              />
            </div>
          );
        })}
      </div>
    </nav>
  );
}
