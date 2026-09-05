"use client";

import { useEffect, useRef } from "react";

/**
 * Autoplays once with sound, then falls back to muted looping playback.
 *
 * Reality check on the "with sound" part: browsers (Chrome, Safari,
 * Firefox) block unmuted autoplay for the large majority of first-time
 * visitors regardless of what's built here — it only succeeds for
 * returning visitors the browser already trusts with audio (a "media
 * engagement" heuristic), or in a few embedded/PWA contexts. This
 * attempts unmuted playback first and catches the (expected, common)
 * rejection by falling back to muted autoplay instead of failing to play
 * at all. Once the clip finishes playing through once (`ended`), it
 * switches to muted + loop for continuous background-style playback.
 *
 * `controls` stays on deliberately — WCAG 2.2.2 requires a way to pause
 * autoplaying content that runs longer than 5 seconds, and native
 * controls are the simplest way to satisfy that.
 */
export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    function loopMuted() {
      if (!video) return;
      video.muted = true;
      video.loop = true;
      video.play().catch(() => {
        /* autoplay blocked entirely (e.g. reduced-data mode) — poster stays visible, controls still work */
      });
    }

    video.addEventListener("ended", loopMuted);

    video.muted = false;
    video.play()?.catch(() => {
      video.muted = true;
      video.play().catch(() => {});
    });

    return () => {
      video.removeEventListener("ended", loopMuted);
    };
  }, []);

  return (
    <div style={{ minWidth: 0 }}>
      <video
        ref={videoRef}
        autoPlay
        controls
        playsInline
        preload="auto"
        poster="/images/hero-demo-poster.png"
        width={1280}
        height={720}
        style={{
          width: "100%",
          height: "auto",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-lg)",
          display: "block",
        }}
      >
        <source src="/videos/hero-demo.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
