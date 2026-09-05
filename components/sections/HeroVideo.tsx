/**
 * Short (10s) promotional teaser embedded in the Hero. Click-to-play, not
 * autoplay: the file is ~7.5MB, and force-loading that for every visitor
 * before they've engaged with the page would hurt load performance for no
 * real benefit — a poster frame conveys the same "see it in action" intent
 * at a fraction of the cost. `preload="none"` means the browser doesn't
 * fetch any of the video until the visitor actually presses play.
 */
export function HeroVideo() {
  return (
    <div style={{ maxWidth: 640, margin: "var(--space-8) auto 0" }}>
      <p
        style={{
          fontSize: "var(--font-size-sm)",
          color: "var(--color-text-tertiary)",
          marginBottom: "var(--space-2)",
        }}
      >
        See it in action
      </p>
      <video
        controls
        preload="none"
        playsInline
        poster="/images/hero-demo-poster.png"
        width={1280}
        height={720}
        style={{
          width: "100%",
          height: "auto",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-md)",
          display: "block",
        }}
      >
        <source src="/videos/hero-demo.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
