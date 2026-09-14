"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

export interface ScrollVideoCanvasProps {
  /** Video to scrub through. Decoded frames are painted to canvas — the
   * <video> element itself is never shown and never plays. */
  src: string;
  poster?: string;
  className?: string;
  /** Scroll distance the scrub spans, as a multiple of the viewport
   * height while the canvas is pinned. */
  scrollLength?: number;
  pin?: boolean;
  /** Accessible label for the sequence. Omit for a purely decorative
   * canvas (rendered aria-hidden). */
  label?: string;
}

/**
 * Scroll-scrubbed video-to-canvas player (the "Apple product page"
 * technique): a hidden <video> is the frame source, seeked to
 * `scrollProgress * duration` and painted to a same-size <canvas> via
 * drawImage, instead of letting the browser autoplay it. This gives
 * exact, scrollbar-locked frame control that a playing <video> can't.
 *
 * `video.currentTime` writes are async — the browser fires `seeked`
 * once the frame is actually decoded. Scroll fires far faster than
 * decode, so out-of-order seeks would otherwise queue up and make the
 * sequence visibly lag behind the scrollbar. seekTo() coalesces this:
 * a seek in flight just overwrites the pending target rather than
 * queuing, so the canvas always catches up to the *latest* scroll
 * position instead of working through stale intermediate ones.
 */
export function ScrollVideoCanvas({
  src,
  poster,
  className,
  scrollLength = 2,
  pin = true,
  label,
}: ScrollVideoCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const seekingRef = useRef(false);
  const pendingTimeRef = useRef<number | null>(null);
  const [ready, setReady] = useState(false);

  function drawFrame() {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || video.videoWidth === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const targetW = Math.round(rect.width * dpr);
    const targetH = Math.round(rect.height * dpr);
    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    // object-fit: cover math, so the frame fills the canvas box without
    // letterboxing or distortion regardless of the video's own aspect ratio.
    const videoRatio = video.videoWidth / video.videoHeight;
    const canvasRatio = targetW / targetH;
    let sx = 0;
    let sy = 0;
    let sw = video.videoWidth;
    let sh = video.videoHeight;
    if (videoRatio > canvasRatio) {
      sw = video.videoHeight * canvasRatio;
      sx = (video.videoWidth - sw) / 2;
    } else {
      sh = video.videoWidth / canvasRatio;
      sy = (video.videoHeight - sh) / 2;
    }
    ctx.drawImage(video, sx, sy, sw, sh, 0, 0, targetW, targetH);
  }

  function seekTo(time: number) {
    const video = videoRef.current;
    if (!video) return;
    if (seekingRef.current) {
      pendingTimeRef.current = time;
      return;
    }
    seekingRef.current = true;
    video.currentTime = time;
  }

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    function onLoadedMetadata() {
      setReady(true);
    }
    function onSeeked() {
      drawFrame();
      seekingRef.current = false;
      const next = pendingTimeRef.current;
      if (next !== null) {
        pendingTimeRef.current = null;
        seekTo(next);
      }
    }

    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("seeked", onSeeked);
    // A cached/fast-loading local video can already be past
    // HAVE_METADATA by the time this effect runs, in which case
    // 'loadedmetadata' has already fired and never reaches the listener
    // above — check the current readyState directly as a fallback.
    if (video.readyState >= 1) onLoadedMetadata();

    // Safari (particularly iOS) won't decode a programmatic currentTime
    // seek into a visible frame until the video has played at least once.
    // A muted play/pause with no visible playback "unlocks" that decode
    // path; muted autoplay doesn't require a user gesture, so this is
    // safe to fire immediately on mount.
    video.muted = true;
    video.playsInline = true;
    video.play().then(() => video.pause()).catch(() => {});

    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("seeked", onSeeked);
    };
  }, []);

  useGSAP(
    () => {
      const video = videoRef.current;
      const container = containerRef.current;
      if (!ready || !video || !container) return;

      if (prefersReducedMotion()) {
        // No scrub, no pin: show a single representative frame and stop.
        seekTo(0);
        return;
      }

      const trigger = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: `+=${scrollLength * 100}%`,
        pin,
        scrub: true,
        onUpdate: (self) => seekTo(self.progress * video.duration),
      });

      return () => trigger.kill();
    },
    { dependencies: [ready, scrollLength, pin] }
  );

  useEffect(() => {
    function onResize() {
      drawFrame();
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div ref={containerRef} className={className} style={{ position: "relative", height: "100%" }}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        playsInline
        preload="auto"
        style={{ display: "none" }}
      />
      <canvas
        ref={canvasRef}
        role={label ? "img" : undefined}
        aria-label={label}
        aria-hidden={label ? undefined : "true"}
        style={{ width: "100%", height: "100%", display: "block" }}
      />
    </div>
  );
}
