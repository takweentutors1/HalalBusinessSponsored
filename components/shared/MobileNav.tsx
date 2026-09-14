"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { DEFAULT_HEADER_NAV_ITEMS, type HeaderNavItem } from "./HeaderNav";

interface MobileNavProps {
  items?: HeaderNavItem[];
}

/**
 * Hamburger toggle + dropdown panel for the section links HeaderNav
 * already shows as a pill row on desktop. HeaderNav's own `<ul>` is
 * hidden below 640px (see .ui-header-nav-link in app/globals.css) so
 * those widths had no way to reach the section links at all — this is
 * the mobile equivalent, not a replacement; both read from the same
 * DEFAULT_HEADER_NAV_ITEMS so the two never drift out of sync.
 *
 * The toggle itself is only shown below 640px (.ui-mobile-nav-toggle
 * in app/globals.css) — same breakpoint HeaderNav disappears at — so
 * there's exactly one way to reach these links at any given width.
 */
export function MobileNav({ items = DEFAULT_HEADER_NAV_ITEMS }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onPointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  useGSAP(
    () => {
      const panel = panelRef.current;
      if (!panel) return;

      if (prefersReducedMotion()) {
        gsap.set(panel, { height: open ? "auto" : 0, opacity: open ? 1 : 0 });
        return;
      }

      if (open) {
        // Measure the panel's natural height by briefly setting it to
        // "auto", then animate from 0 up to that pixel value — height
        // itself can't be tweened to/from "auto" directly.
        gsap.set(panel, { height: "auto" });
        const target = panel.offsetHeight;
        gsap.fromTo(panel, { height: 0, opacity: 0 }, { height: target, opacity: 1, duration: 0.3, ease: "power2.out" });
      } else {
        gsap.to(panel, { height: 0, opacity: 0, duration: 0.25, ease: "power2.inOut" });
      }
    },
    { dependencies: [open] }
  );

  return (
    <div ref={rootRef} className="ui-mobile-nav">
      <button
        type="button"
        className="ui-mobile-nav-toggle"
        aria-expanded={open}
        aria-controls="ui-mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="ui-mobile-nav-bar" data-open={open} />
        <span className="ui-mobile-nav-bar" data-open={open} />
        <span className="ui-mobile-nav-bar" data-open={open} />
      </button>

      <div
        id="ui-mobile-nav-panel"
        ref={panelRef}
        className="ui-mobile-nav-panel"
        style={{ height: 0, opacity: 0, overflow: "hidden" }}
      >
        <ul className="ui-mobile-nav-list">
          {items.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="ui-mobile-nav-link" onClick={() => setOpen(false)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
