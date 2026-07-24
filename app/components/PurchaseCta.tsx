"use client";

import type { CSSProperties, ReactNode } from "react";
import { colors, sans, weight } from "../lib/tokens";
import { appStore } from "../lib/config";
import { purchaseHref } from "../lib/pricing";
import OfficialAppStoreBadge from "./OfficialAppStoreBadge";

// Purchase CTAs always resolve to the official App Store product page when
// live. Never Stripe or any external checkout for iOS digital Premium.

type PurchaseCtaProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Accessible name when the CTA is a link. */
  ariaLabel?: string;
  /** When not live, show the App Store badge instead of a dead link. */
  preferBadgeWhenNotLive?: boolean;
  badgeHeight?: number;
};

export default function PurchaseCta({
  children,
  className = "btn-primary",
  style,
  ariaLabel,
  preferBadgeWhenNotLive = false,
  badgeHeight = 40,
}: PurchaseCtaProps) {
  const href = purchaseHref();

  if (href) {
    return (
      <a
        href={href}
        className={className}
        style={style}
        aria-label={ariaLabel}
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  if (preferBadgeWhenNotLive) {
    return <OfficialAppStoreBadge height={badgeHeight} showCaption />;
  }

  // Honest non-link when the App Store page is not live yet.
  return (
    <span
      className={className}
      style={{
        ...style,
        opacity: 0.72,
        cursor: "default",
        pointerEvents: "none",
      }}
      aria-disabled="true"
      title={appStore.comingSoonLabel}
    >
      {children}
    </span>
  );
}

export function PurchaseCtaSecondary({
  children,
  onClick,
  style,
}: {
  children: ReactNode;
  onClick?: () => void;
  style?: CSSProperties;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        fontFamily: sans,
        fontWeight: weight.heading,
        fontSize: "0.88rem",
        color: colors.dim,
        background: "none",
        border: "none",
        padding: "8px 4px",
        cursor: "pointer",
        textDecoration: "underline",
        textUnderlineOffset: 3,
        ...style,
      }}
    >
      {children}
    </button>
  );
}
