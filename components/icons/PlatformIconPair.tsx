import { InstagramIcon } from "./InstagramIcon";
import { WhatsAppIcon } from "./WhatsAppIcon";

/** Side-by-side badge for copy that names both platforms together, e.g.
 * "Instagram and WhatsApp acting as the whole online presence". */
export function PlatformIconPair({ size = 18 }: { size?: number }) {
  return (
    <span aria-hidden="true" style={{ display: "inline-flex", gap: 4 }}>
      <InstagramIcon size={size} />
      <WhatsAppIcon size={size} />
    </span>
  );
}
