import OfficialAppStoreBadge from "./OfficialAppStoreBadge";
import { appStore } from "../lib/config";
import { pricing } from "../lib/pricing";

// ── Primary nav CTA ──────────────────────────────────────────────────────
// Live: the official App Store badge (the only time the badge is a link).
// Not live: an honest "Get ONIS" button that scrolls to the pricing area —
// never a dead or fabricated store link.

export default function NavCta({ badgeHeight = 34 }: { badgeHeight?: number }) {
  if (appStore.isLive && appStore.productUrl) {
    return <OfficialAppStoreBadge height={badgeHeight} />;
  }
  return (
    <a
      href="/#pricing"
      className="btn-primary"
      style={{ padding: "0.68rem 1.5rem" }}
    >
      {pricing.cta}
    </a>
  );
}
