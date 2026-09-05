import type { Metadata } from "next";
import Link from "next/link";
import { logout } from "../login/actions";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh" }}>
      <header
        style={{
          borderBottom: "1px solid var(--color-border-light)",
          padding: "var(--space-4) var(--space-8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          href="/admin/applications"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            color: "var(--color-primary-accessible)",
          }}
        >
          Halal Business Initiative — Admin
        </Link>
        <form action={logout}>
          <button
            type="submit"
            className="ui-btn ui-btn-secondary"
            style={{ fontSize: "var(--font-size-sm)", padding: "var(--space-2) var(--space-4)" }}
          >
            Log out
          </button>
        </form>
      </header>
      <main style={{ padding: "var(--space-8)" }}>{children}</main>
    </div>
  );
}
