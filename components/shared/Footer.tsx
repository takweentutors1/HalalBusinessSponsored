import Link from "next/link";
import { disclosure } from "@/lib/config";
import { Disclosure } from "./Disclosure";

/**
 * Site-wide footer. Wires the shared Disclosure component (Decision 1's
 * footer placement) so it appears on every page, not just the landing page.
 * Also links to the admin area — the browser's native Basic Auth prompt
 * (proxy.ts) handles the actual login; this is just a discoverable entry
 * point for the team rather than an unlisted URL they have to remember.
 */
export function Footer() {
  return (
    <footer className="ui-footer">
      <Disclosure text={disclosure.footer} />
      <p style={{ marginTop: "var(--space-2)" }}>
        <Link
          href="/admin/applications"
          style={{ color: "var(--color-text-tertiary)", fontSize: "var(--font-size-xs)" }}
        >
          Admin Login
        </Link>
      </p>
    </footer>
  );
}
