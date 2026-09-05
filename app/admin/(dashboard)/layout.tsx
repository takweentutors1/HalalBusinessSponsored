import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui";
import { Logo } from "@/components/shared/Logo";
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
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
          <Link href="/admin/applications" aria-label="Halal Business Initiative — Admin, home">
            <Logo size={28} />
          </Link>
          <Badge variant="primary">Admin</Badge>
        </div>
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
