import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin | Halal Business Initiative",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh" }}>
      <header
        style={{
          borderBottom: "1px solid var(--color-border-light)",
          padding: "var(--space-4) var(--space-8)",
        }}
      >
        <Link
          href="/admin/applications"
          style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--color-primary-dark)" }}
        >
          Halal Business Initiative — Admin
        </Link>
      </header>
      <main style={{ padding: "var(--space-8)" }}>{children}</main>
    </div>
  );
}
