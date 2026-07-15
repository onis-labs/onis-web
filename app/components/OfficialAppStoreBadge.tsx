import type { CSSProperties } from "react";
import { colors, sans, weight } from "../lib/tokens";
import { appStore } from "../lib/config";

// Apple's official badge SVG has a fixed intrinsic aspect ratio (~119.66:40).
// Deriving width from the requested height keeps every rendered size
// undistorted — the artwork itself is never stretched, recolored, or rounded.
const BADGE_ASPECT_RATIO = 119.66407 / 40;

interface OfficialAppStoreBadgeProps {
  /** Rendered height in px; width is derived from the badge's fixed aspect ratio. */
  height?: number;
  /** Show a small "coming soon" caption under the dimmed badge. Ignored once live. */
  showCaption?: boolean;
}

const captionStyle: CSSProperties = {
  fontFamily: sans,
  fontSize: "0.68rem",
  fontWeight: weight.label,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: colors.dim,
  textAlign: "center",
  whiteSpace: "nowrap",
};

// Renders Apple's official "Download on the App Store" badge, untouched:
// no recolor, no re-rounding, no text placed inside it, never animated.
// Behavior is driven entirely by the App Store launch state in lib/config —
// no other component needs to know whether ONIS is live yet.
export default function OfficialAppStoreBadge({
  height = 40,
  showCaption = false,
}: OfficialAppStoreBadgeProps) {
  const width = Math.round(height * BADGE_ASPECT_RATIO);

  const badge = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/app-store-badge.svg"
      alt=""
      width={width}
      height={height}
      style={{ display: "block" }}
    />
  );

  if (appStore.isLive && appStore.productUrl) {
    return (
      <a
        href={appStore.productUrl}
        aria-label="Download ONIS on the App Store"
        style={{ display: "inline-flex", padding: 8 }}
      >
        {badge}
      </a>
    );
  }

  // Not live yet: a non-clickable, visibly dimmed placeholder. Never a fake
  // or placeholder link — the honest "coming soon" label reads from config.
  return (
    <span
      role="img"
      aria-label={`ONIS — ${appStore.comingSoonLabel}`}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        padding: 8,
      }}
    >
      <span aria-hidden="true" style={{ display: "inline-flex", opacity: 0.5 }}>
        {badge}
      </span>
      {showCaption && (
        <span aria-hidden="true" style={captionStyle}>
          {appStore.comingSoonLabel}
        </span>
      )}
    </span>
  );
}
