"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * In-flow sticky header. Must NOT sit inside a body/html overflow clip —
 * that is what made the bar scroll away on the first mobile swipe after
 * reload. Page-level horizontal clipping lives on `.ui-app-main` instead.
 */
export function ScrollHeader({ children }: { children: ReactNode }) {
  const headerWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headerWrapRef.current;
    if (!el) return;

    const onScroll = () => {
      el.dataset.scrolled = window.scrollY > 40 ? "true" : "false";
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={headerWrapRef} className="ui-header-scroll-wrap">
      {children}
    </div>
  );
}
