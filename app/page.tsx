export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "var(--space-8)",
        gap: "var(--space-4)",
      }}
    >
      <h1
        style={{
          fontSize: "var(--font-size-4xl)",
          color: "var(--color-primary-dark)",
        }}
      >
        Halal Business Initiative
      </h1>
      <p style={{ color: "var(--color-text-secondary)", maxWidth: "40ch" }}>
        Scaffold online — Cloudflare Workers deployment, D1, and KV bindings
        are wired up. Landing page content lands next.
      </p>
    </main>
  );
}
