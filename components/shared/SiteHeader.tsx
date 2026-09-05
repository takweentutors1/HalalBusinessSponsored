import Link from "next/link";
import { Logo } from "./Logo";

export function SiteHeader() {
  return (
    <header
      style={{
        padding: "var(--space-4) var(--space-8)",
        display: "flex",
        justifyContent: "center",
        borderBottom: "1px solid var(--color-border-light)",
      }}
    >
      <Link href="/" aria-label="Halal Business Initiative — home">
        <Logo size={36} animated />
      </Link>
    </header>
  );
}
