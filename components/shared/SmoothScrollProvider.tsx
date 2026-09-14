"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

/**
 * SmoothScrollProvider — connects Lenis smooth inertial scrolling with GSAP
 * ScrollTrigger's internal render ticker.
 *
 * Architecture:
 * 1. Synchronizes Lenis scroll events directly with ScrollTrigger.update.
 * 2. Drives Lenis's requestAnimationFrame (raf) via GSAP's high-precision
 *    gsap.ticker, preventing drift between GSAP scrub tweens and scroll physics.
 * 3. Gated by prefersReducedMotion: if reduced motion is requested, Lenis
 *    is bypassed entirely to preserve native browser instantaneous scrolling.
 * 4. Safe for SSR and client teardown on route change.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined" || prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.25,
    });

    // Notify ScrollTrigger on every scroll position change
    lenis.on("scroll", ScrollTrigger.update);

    // Sync Lenis rendering to GSAP's master ticker
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
