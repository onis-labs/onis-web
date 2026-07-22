import Reveal from "./Reveal";
import SectionIntro from "./SectionIntro";
import OfficialAppStoreBadge from "./OfficialAppStoreBadge";
import { colors, sans, display, weight, layout } from "../lib/tokens";
import { pricing, priceDisclaimer } from "../lib/pricing";

// ── Section 9 — Fair pricing ─────────────────────────────────────────────
// One clean offer area — not subscription cards. Free, the $0 seven-day
// Premium access, and the one-time Lifetime purchase, all from lib/pricing
// (the only file allowed to contain the Lifetime price). No badges, no
// fake savings, no urgency — verified against the shipping StoreKit config.

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        fontFamily: sans,
        fontWeight: weight.heading,
        fontSize: "0.78rem",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: colors.dim,
        margin: 0,
      }}
    >
      {children}
    </h3>
  );
}

function FeatureList({ items }: { items: readonly string[] }) {
  return (
    <ul style={{ listStyle: "none", margin: "16px 0 0", padding: 0 }}>
      {items.map((item) => (
        <li
          key={item}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
            fontFamily: sans,
            fontWeight: weight.body,
            fontSize: "0.92rem",
            color: colors.body,
            lineHeight: 1.5,
            padding: "5px 0",
          }}
        >
          <span
            aria-hidden="true"
            style={{ color: colors.success, fontWeight: weight.heading, flexShrink: 0 }}
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
  return (
    <section
      id="pricing"
      style={{ padding: `${layout.padY} ${layout.padX}`, background: colors.canvas }}
    >
      <div style={{ maxWidth: layout.wideMax, margin: "0 auto" }}>
        <div style={{ maxWidth: layout.contentMax, margin: "0 auto" }}>
          <SectionIntro kicker="Fair pricing" title="Premium without another subscription" center />
        </div>

        <Reveal delay={0.1}>
          <div
            style={{
              marginTop: 52,
              background: colors.cardCream,
              border: `1px solid ${colors.borderSubtle}`,
              borderRadius: 26,
              padding: "clamp(28px, 4vw, 48px)",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "clamp(28px, 4vw, 48px)",
              }}
            >
              {/* Free */}
              <div>
                <ColumnTitle>{pricing.free.name}</ColumnTitle>
                <p
                  style={{
                    fontFamily: display,
                    fontWeight: weight.section,
                    fontSize: "1.5rem",
                    color: colors.ink,
                    margin: "14px 0 0",
                  }}
                >
                  {pricing.free.blurb}
                </p>
                <FeatureList items={pricing.free.features} />
              </div>

              {/* 7-day Premium access */}
              <div>
                <ColumnTitle>{pricing.trial.name}</ColumnTitle>
                <p
                  style={{
                    fontFamily: display,
                    fontWeight: weight.section,
                    fontSize: "1.5rem",
                    color: colors.ink,
                    margin: "14px 0 0",
                  }}
                >
                  {pricing.trial.offer}
                </p>
                <p
                  style={{
                    fontFamily: sans,
                    fontWeight: weight.heading,
                    fontSize: "0.88rem",
                    color: colors.accent,
                    margin: "10px 0 0",
                  }}
                >
                  {pricing.trial.disclosure}
                </p>
                <FeatureList items={pricing.premiumIncludes} />
              </div>

              {/* Lifetime */}
              <div>
                <ColumnTitle>{pricing.lifetime.name}</ColumnTitle>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 14 }}>
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
                    once
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: sans,
                    fontWeight: weight.body,
                    fontSize: "0.95rem",
                    color: colors.body,
                    lineHeight: 1.6,
                    margin: "10px 0 0",
                  }}
                >
                  {pricing.lifetime.supporting}
                </p>
                <p
                  style={{
                    fontFamily: sans,
                    fontWeight: weight.body,
                    fontSize: "0.92rem",
                    color: colors.body,
                    lineHeight: 1.6,
                    margin: "12px 0 0",
                  }}
                >
                  {pricing.trial.detail}
                </p>
              </div>
            </div>

            {/* One honest CTA area — the badge owns the launch state. */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                gap: 20,
                marginTop: 40,
                paddingTop: 32,
                borderTop: `1px solid ${colors.borderSubtle}`,
              }}
            >
              <OfficialAppStoreBadge height={44} showCaption />
            </div>

            <p
              style={{
                fontFamily: sans,
                fontWeight: weight.body,
                fontSize: "0.9rem",
                color: colors.body,
                textAlign: "center",
                margin: "24px 0 0",
              }}
            >
              {pricing.postTrial}
            </p>
            <p
              style={{
                fontFamily: sans,
                fontWeight: weight.body,
                fontSize: "0.8rem",
                color: colors.dim,
                textAlign: "center",
                margin: "8px 0 0",
              }}
            >
              {priceDisclaimer}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
