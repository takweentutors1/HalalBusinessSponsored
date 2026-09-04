import { disclosure } from "@/lib/config";
import { Disclosure } from "./Disclosure";

/**
 * Site-wide footer. Wires the shared Disclosure component (Decision 1's
 * footer placement) so it appears on every page, not just the landing page.
 */
export function Footer() {
  return (
    <footer className="ui-footer">
      <Disclosure text={disclosure.footer} />
    </footer>
  );
}
