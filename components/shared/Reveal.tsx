"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * React port of the docs/index.html redesign's scroll-reveal effect (an
 * IntersectionObserver toggling a `.visible` class, previously a raw
 * inline <script> in the static mockup). One observer instance per
 * mounted Reveal rather than a single page-wide observer — section count
 * is small (a dozen or so), so the simplicity of "each section manages
 * itself" outweighs the minor cost of multiple observers.
 */
export function Reveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("ui-reveal-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="ui-reveal">
      {children}
    </div>
  );
}
