"use client";

import { useCallback, useState, type CSSProperties, type ReactNode } from "react";
import Reveal from "./Reveal";
import SectionIntro from "./SectionIntro";
import OfficialAppStoreBadge from "./OfficialAppStoreBadge";
import PurchaseCta, { PurchaseCtaSecondary } from "./PurchaseCta";
import FoundingOfferDialog, {
  markFoundingDismissed,
  wasFoundingDismissed,
} from "./FoundingOfferDialog";
import { colors, sans, display, weight, layout } from "../lib/tokens";
import {
  isFoundingOfferActive,
  priceDisclaimer,
  pricing,
} from "../lib/pricing";

// ── Section 9 — Fair pricing ─────────────────────────────────────────────
// Three public cards: Free, Premium Yearly, ONIS Lifetime. All copy and
// prices come from lib/pricing. The founding fallback is never advertised
// here — it appears only as a one-time dismiss fallback when StoreKit-gated
// eligibility is truly on.

const cardShell: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  background: colors.canvas,
  border: `1px solid ${colors.borderSubtle}`,
  borderRadius: 20,
  padding: "28px 24px",
  minHeight: "100%",
};

function PlanBadge({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        alignSelf: "flex-start",
        fontFamily: sans,
        fontWeight: weight.heading,
        fontSize: "0.68rem",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: colors.accent,
        background: colors.accentSoft,
        borderRadius: 8,
        padding: "4px 10px",
        marginBottom: 12,
      }}
    >
      {children}
    </span>
  );
}

function PlanTitle({ children }: { children: ReactNode }) {
  return (
    <h3
      style={{
        fontFamily: display,
        fontWeight: weight.section,
        fontSize: "1.35rem",
        color: colors.ink,
        margin: 0,
        letterSpacing: "-0.02em",
      }}
    >
      {children}
    </h3>
  );
}

function FeatureList({ items }: { items: readonly string[] }) {
  return (
    <ul style={{ listStyle: "none", margin: "16px 0 0", padding: 0, flex: 1 }}>
      {items.map((item) => (
        <li
          key={item}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
            fontFamily: sans,
            fontWeight: weight.body,
            fontSize: "0.9rem",
            color: colors.body,
            lineHeight: 1.5,
            padding: "4px 0",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              color: colors.success,
              fontWeight: weight.heading,
              flexShrink: 0,
            }}
          >
            ✓
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function Pricing() {
  const [foundingOpen, setFoundingOpen] = useState(false);

  const dismissFounding = useCallback(() => {
    markFoundingDismissed();
    setFoundingOpen(false);
  }, []);

  const onContinueWithFree = useCallback(() => {
    if (isFoundingOfferActive() && !wasFoundingDismissed()) {
      setFoundingOpen(true);
      return;
    }
    // No gated offer — stay on the free path without pressure.
  }, []);

  return (
    <section
      id="pricing"
      style={{ padding: `${layout.padY} ${layout.padX}`, background: colors.canvas }}
    >
      <div style={{ maxWidth: layout.wideMax, margin: "0 auto" }}>
        <div style={{ maxWidth: layout.contentMax, margin: "0 auto" }}>
          <SectionIntro
            kicker={pricing.kicker}
            title={pricing.headline}
            center
          />
        </div>

        {pricing.premiumPreview.enabled && (
          <p
            style={{
              fontFamily: sans,
              fontWeight: weight.body,
              fontSize: "1rem",
              color: colors.body,
              textAlign: "center",
              margin: "20px auto 0",
              maxWidth: 520,
              lineHeight: 1.55,
            }}
          >
            {pricing.premiumPreview.line}
          </p>
        )}

        <Reveal delay={0.1}>
          <div
            style={{
              marginTop: 48,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 20,
              alignItems: "stretch",
            }}
          >
            {/* FREE */}
            <article style={cardShell}>
              <PlanTitle>{pricing.free.name}</PlanTitle>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 8,
                  marginTop: 16,
                }}
              >
                <span
                  style={{
                    fontFamily: display,
                    fontWeight: weight.hero,
                    fontSize: "2.4rem",
                    letterSpacing: "-0.02em",
                    color: colors.ink,
                  }}
                >
                  {pricing.free.price}
                </span>
              </div>
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
                {pricing.free.blurb}
              </p>
              <FeatureList items={pricing.free.features} />
              <div style={{ marginTop: 24 }}>
                <PurchaseCta
                  ariaLabel={pricing.free.cta}
                  style={{
                    display: "inline-flex",
                    justifyContent: "center",
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  {pricing.free.cta}
                </PurchaseCta>
              </div>
            </article>

            {/* YEARLY */}
            <article style={cardShell}>
              <PlanBadge>{pricing.yearly.badge}</PlanBadge>
              <PlanTitle>{pricing.yearly.name}</PlanTitle>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 8,
                  marginTop: 16,
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontFamily: display,
                    fontWeight: weight.hero,
                    fontSize: "2.4rem",
                    letterSpacing: "-0.02em",
                    color: colors.ink,
                  }}
                >
                  {pricing.yearly.price}
                </span>
                <span
                  style={{
                    fontFamily: sans,
                    fontWeight: weight.heading,
                    fontSize: "1rem",
                    color: colors.dim,
                  }}
                >
                  {pricing.yearly.priceSuffix}
                </span>
              </div>
              <p
                style={{
                  fontFamily: sans,
                  fontWeight: weight.heading,
                  fontSize: "0.88rem",
                  color: colors.accent,
                  margin: "12px 0 0",
                }}
              >
                {pricing.yearly.trial}
              </p>
              <p
                style={{
                  fontFamily: sans,
                  fontWeight: weight.body,
                  fontSize: "0.85rem",
                  color: colors.dim,
                  lineHeight: 1.5,
                  margin: "8px 0 0",
                }}
              >
                {pricing.yearly.renewalDisclosure}
              </p>
              <FeatureList items={pricing.premiumIncludes} />
              <div style={{ marginTop: 24 }}>
                <PurchaseCta
                  ariaLabel={pricing.yearly.cta}
                  style={{
                    display: "inline-flex",
                    justifyContent: "center",
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  {pricing.yearly.cta}
                </PurchaseCta>
              </div>
            </article>

            {/* LIFETIME */}
            <article
              style={{
                ...cardShell,
                borderColor: colors.accent,
                boxShadow: `0 0 0 1px ${colors.accent}`,
              }}
            >
              <PlanBadge>{pricing.lifetime.badge}</PlanBadge>
              <PlanTitle>{pricing.lifetime.name}</PlanTitle>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 8,
                  marginTop: 16,
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontFamily: display,
                    fontWeight: weight.hero,
                    fontSize: "2.4rem",
                    letterSpacing: "-0.02em",
                    color: colors.ink,
                  }}
                >
                  {pricing.lifetime.price}
                </span>
                <span
                  style={{
                    fontFamily: sans,
                    fontWeight: weight.heading,
                    fontSize: "1rem",
                    color: colors.dim,
                  }}
                >
                  {pricing.lifetime.priceSuffix}
                </span>
              </div>
              <p
                style={{
                  fontFamily: sans,
                  fontWeight: weight.body,
                  fontSize: "0.85rem",
                  color: colors.dim,
                  lineHeight: 1.5,
                  margin: "12px 0 0",
                }}
              >
                {pricing.lifetime.disclosure}
              </p>
              <p
                style={{
                  fontFamily: sans,
                  fontWeight: weight.body,
                  fontSize: "0.9rem",
                  color: colors.body,
                  lineHeight: 1.5,
                  margin: "12px 0 0",
                }}
              >
                {pricing.lifetime.comparison}
              </p>
              <FeatureList items={pricing.premiumIncludes} />
              <div style={{ marginTop: 24 }}>
                <PurchaseCta
                  ariaLabel={pricing.lifetime.cta}
                  style={{
                    display: "inline-flex",
                    justifyContent: "center",
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  {pricing.lifetime.cta}
                </PurchaseCta>
              </div>
            </article>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              marginTop: 40,
            }}
          >
            <OfficialAppStoreBadge height={44} showCaption />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <PurchaseCtaSecondary onClick={onContinueWithFree}>
              Continue with Free
            </PurchaseCtaSecondary>
          </div>

          <p
            style={{
              fontFamily: sans,
              fontWeight: weight.body,
              fontSize: "0.8rem",
              color: colors.dim,
              textAlign: "center",
              margin: "20px 0 0",
              lineHeight: 1.5,
            }}
          >
            {priceDisclaimer} {pricing.storefrontQualification}
          </p>
        </Reveal>
      </div>

      <FoundingOfferDialog open={foundingOpen} onDismiss={dismissFounding} />
    </section>
  );
}
