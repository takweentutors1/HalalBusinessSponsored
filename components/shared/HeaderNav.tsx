"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export interface HeaderNavItem {
  /** Must match a real section id on the page (see app/(marketing)/page.tsx). */
  id: string;
  label: string;
}

/**
 * A sensible default subset of the 12 section ids added in
 * app/(marketing)/page.tsx — not all 12, which would be far too many
 * pills for a header bar. Callers can override via the `items` prop;
 * this only exists so the component is immediately usable without
 * requiring every consumer to redeclare the same list.
 */
export const DEFAULT_HEADER_NAV_ITEMS: HeaderNavItem[] = [
  { id: "the-problem", label: "The Problem" },
  { id: "scope", label: "What You Get" },
  { id: "who-qualifies", label: "Who Qualifies" },
  { id: "how-it-works", label: "How It Works" },
  { id: "faq", label: "FAQ" },
];

interface HeaderNavProps {
  items?: HeaderNavItem[];
  className?: string;
}

/**
 * Sliding "pill" nav with an active-section spy: a background pill
 * slides to sit behind whichever nav item's target section is
 * currently in view, tracked via IntersectionObserver rather than a
 * scroll-position calculation (cheaper, and doesn't fight Lenis/GSAP
 * ScrollTrigger's own scroll listeners elsewhere on the page).
 *
 * Deliberately a standalone component, not wired into SiteHeader.tsx —
 * that file is treated as stable and never edited directly (see
 * feedback_dont_touch_siteheader memory); dropping this in alongside
 * it, the same way ScrollHeader.tsx wraps it, is a follow-up wiring
 * decision, not part of building the component itself. 
 *
 */
export function HeaderNav({ items = DEFAULT_HEADER_NAV_ITEMS, className }: HeaderNavProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  // Active-section spy. rootMargin biases the "viewport" IntersectionObserver
  // checks against down to a thin band near the top of the real viewport
  // (-20% from top, -70% from bottom), so a section is only "active" once
  // it's genuinely near the top of the screen — not merely "visible at all"
  // — which is what makes the active pill track scroll position sensibly
  // rather than jumping between adjacent sections that are both partly on
  // screen at once.
  useEffect(() => {
    const targets = items
      .map((item) => ({ item, el: document.getElementById(item.id) }))
      .filter((t): t is { item: HeaderNavItem; el: HTMLElement } => t.el !== null);

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

  // Slide the pill to the active link's position. No active section yet
  // (e.g. still scrolled up in the Hero, above every tracked section) ->
  // fade the pill out rather than defaulting it to the first item, which
  // would falsely claim "you are here" before the user has scrolled there.
  useGSAP(
    () => {
      const pill = pillRef.current;
      const nav = navRef.current;
      if (!pill || !nav) return;

      if (!activeId) {
        gsap.to(pill, { opacity: 0, duration: prefersReducedMotion() ? 0 : 0.25 });
        return;
      }

      const link = linkRefs.current.get(activeId);
      if (!link) return;

      const navBox = nav.getBoundingClientRect();
      const linkBox = link.getBoundingClientRect();
      const x = linkBox.left - navBox.left;
      const width = linkBox.width;

      if (prefersReducedMotion()) {
        gsap.set(pill, { x, width, opacity: 1 });
      } else {
        gsap.to(pill, { x, width, opacity: 1, duration: 0.45, ease: "power3.out" });
      }
    },
    { dependencies: [activeId] }
  );

  return (
    <ul
      ref={navRef}
      className={className}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: "var(--space-1)",
        listStyle: "none",
        padding: "4px",
        margin: 0,
        borderRadius: "var(--radius-full)",
        background: "var(--color-surface-elevated)",
      }}
    >
      <span
        ref={pillRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 4,
          left: 0,
          height: "calc(100% - 8px)",
          width: 0,
          borderRadius: "var(--radius-full)",
          background: "var(--color-surface-base)",
          boxShadow: "var(--shadow-sm)",
          opacity: 0,
          pointerEvents: "none",
        }}
      />
      {items.map((item) => (
        <li key={item.id} style={{ position: "relative", zIndex: 1 }}>
          <a
            ref={(el) => {
              if (el) linkRefs.current.set(item.id, el);
              else linkRefs.current.delete(item.id);
            }}
            href={`#${item.id}`}
            aria-current={activeId === item.id ? "true" : undefined}
            style={{
              display: "inline-block",
              padding: "var(--space-2) var(--space-4)",
              borderRadius: "var(--radius-full)",
              fontSize: "var(--font-size-sm)",
              fontWeight: 600,
              whiteSpace: "nowrap",
              color: activeId === item.id ? "var(--color-primary-accessible)" : "var(--color-text-secondary)",
              transition: "color 200ms ease",
            }}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
