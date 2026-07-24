"use client";

import { useEffect, useId, useState } from "react";
import { colors, display, sans, weight } from "../lib/tokens";
import {
  formatCountdown,
  foundingMsRemaining,
  isFoundingOfferActive,
  pricing,
  shouldShowFoundingCountdown,
} from "../lib/pricing";
import PurchaseCta, { PurchaseCtaSecondary } from "./PurchaseCta";

// One respectful founding-Lifetime dialog. Never guilt, never repeat in a
// session, never show when StoreKit is not configured, never show a fake timer.

type FoundingOfferDialogProps = {
  open: boolean;
  onDismiss: () => void;
};

export default function FoundingOfferDialog({
  open,
  onDismiss,
}: FoundingOfferDialogProps) {
  const titleId = useId();
  const offer = pricing.foundingLifetime;
  const [msLeft, setMsLeft] = useState<number | null>(null);
  const showTimer = shouldShowFoundingCountdown();

  useEffect(() => {
    if (!open || !showTimer) {
      setMsLeft(null);
      return;
    }
    const tick = () => {
      const remaining = foundingMsRemaining();
      setMsLeft(remaining);
      if (remaining === 0) onDismiss();
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [open, showTimer, onDismiss]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onDismiss]);

  if (!open || !isFoundingOfferActive()) return null;
  if (showTimer && msLeft === 0) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 80,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        background: "rgba(28, 25, 23, 0.4)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: colors.cardCream,
          border: `1px solid ${colors.borderSubtle}`,
          borderRadius: 24,
          padding: "32px 28px",
          boxShadow: "0 16px 48px rgba(28, 25, 23, 0.12)",
        }}
      >
        {offer.badge && (
          <p
            style={{
              fontFamily: sans,
              fontWeight: weight.heading,
              fontSize: "0.72rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: colors.accent,
              margin: 0,
            }}
          >
            {offer.badge}
          </p>
        )}

        <h2
          id={titleId}
          style={{
            fontFamily: display,
            fontWeight: weight.section,
            fontSize: "1.55rem",
            color: colors.ink,
            margin: offer.badge ? "12px 0 0" : 0,
            letterSpacing: "-0.02em",
          }}
        >
          {offer.title}
        </h2>

        <p
          style={{
            fontFamily: display,
            fontWeight: weight.hero,
            fontSize: "2.2rem",
            color: colors.ink,
            margin: "16px 0 0",
            letterSpacing: "-0.02em",
          }}
        >
          {offer.price}{" "}
          <span
            style={{
              fontFamily: sans,
              fontWeight: weight.heading,
              fontSize: "1rem",
              color: colors.dim,
            }}
          >
            once
          </span>
        </p>

        <p
          style={{
            fontFamily: sans,
            fontWeight: weight.body,
            fontSize: "0.95rem",
            color: colors.body,
            lineHeight: 1.55,
            margin: "12px 0 0",
          }}
        >
          {offer.supporting}
        </p>

        {showTimer && msLeft !== null && msLeft > 0 && (
          <p
            style={{
              fontFamily: sans,
              fontWeight: weight.heading,
              fontSize: "0.88rem",
              color: colors.body,
              margin: "16px 0 0",
              fontVariantNumeric: "tabular-nums",
            }}
            aria-live="polite"
          >
            Founding offer ends in {formatCountdown(msLeft)}
          </p>
        )}

        <p
          style={{
            fontFamily: sans,
            fontWeight: weight.body,
            fontSize: "0.8rem",
            color: colors.dim,
            margin: "16px 0 0",
            lineHeight: 1.5,
          }}
        >
          {offer.disclosure}
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            gap: 12,
            marginTop: 24,
          }}
        >
          <PurchaseCta
            ariaLabel={offer.cta}
            style={{
              display: "inline-flex",
              justifyContent: "center",
              textAlign: "center",
              width: "100%",
            }}
          >
            {offer.cta}
          </PurchaseCta>
          <PurchaseCtaSecondary
            onClick={onDismiss}
            style={{ alignSelf: "center" }}
          >
            {offer.secondary}
          </PurchaseCtaSecondary>
        </div>
      </div>
    </div>
  );
}

export function wasFoundingDismissed(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return (
      sessionStorage.getItem(pricing.foundingLifetime.sessionDismissKey) === "1"
    );
  } catch {
    return true;
  }
}

export function markFoundingDismissed(): void {
  try {
    sessionStorage.setItem(pricing.foundingLifetime.sessionDismissKey, "1");
  } catch {
    // Ignore private-mode / storage failures — treat as dismissed.
  }
}
