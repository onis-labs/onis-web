import Reveal from "./Reveal";
import AccentPeriod from "./AccentPeriod";
import OfficialAppStoreBadge from "./OfficialAppStoreBadge";
import { colors, sans, display, type, weight, layout, labelStyle } from "../lib/tokens";
import { plans, featureMatrix, priceDisclaimer } from "../lib/pricing";

// Free vs Premium matrix cell: a check, an em-dash, or a short text value
// (e.g. "Basic" / "Full history & timing"). Booleans get an accessible label
// so screen readers hear "Included" / "Not included" instead of raw glyphs.
function MatrixCell({ value }: { value: boolean | string }) {
  if (typeof value === "string") {
    return (
      <span style={{ fontFamily: sans, fontWeight: weight.body, color: colors.body, fontSize: "0.88rem" }}>
        {value}
      </span>
    );
  }
  return value ? (
    <span aria-label="Included" style={{ color: colors.success, fontWeight: weight.heading, fontSize: "1rem" }}>
      ✓
    </span>
  ) : (
    <span aria-label="Not included" style={{ color: colors.dim, fontSize: "1rem" }}>
      —
    </span>
  );
}

export default function Pricing() {
  return (
    <section
      id="pricing"
      style={{ padding: `${layout.padY} ${layout.padX}`, background: colors.canvas }}
    >
      <div style={{ maxWidth: layout.wideMax, margin: "0 auto" }}>
        <Reveal>
          <p style={labelStyle}>PRICING</p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2
            style={{
              fontFamily: display,
              fontWeight: weight.section,
              fontSize: type.section,
              letterSpacing: "-0.02em",
              color: colors.ink,
              lineHeight: 1.15,
              margin: "16px 0 0",
              maxWidth: layout.contentMax,
            }}
          >
            Start simple. Upgrade when you need more
            <AccentPeriod />
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p
            style={{
              fontFamily: sans,
              fontWeight: weight.body,
              color: colors.body,
              fontSize: type.body,
              lineHeight: 1.6,
              margin: "20px 0 0",
              maxWidth: layout.contentMax,
            }}
          >
            Free core tracking, no account. Premium when Trends and Coach start earning their keep.
          </p>
        </Reveal>

        {/* Plan cards — 4 across on desktop, wraps down to fewer columns and
            stacks to 1 on mobile via auto-fit, no media queries needed. */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 32,
            marginTop: 56,
          }}
        >
          {plans.map((plan, i) => (
            <Reveal key={plan.id} delay={0.1 * (i + 1)}>
              <article
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  background: colors.cardCream,
                  border:
                    plan.highlight === true
                      ? `2px solid ${colors.accent}`
                      : `1px solid ${colors.borderSubtle}`,
                  borderRadius: 16,
                  padding: 32,
                }}
              >
                {plan.highlight === true && plan.badge && (
                  <span
                    style={{
                      position: "absolute",
                      top: -12,
                      left: 24,
                      background: colors.accent,
                      color: "#fff",
                      fontFamily: sans,
                      fontWeight: weight.label,
                      fontSize: "0.68rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      padding: "4px 12px",
                      borderRadius: 999,
                    }}
                  >
                    {plan.badge}
                  </span>
                )}

                <h3
                  style={{
                    fontFamily: sans,
                    fontWeight: weight.heading,
                    fontSize: "1.02rem",
                    color: colors.ink,
                    margin: 0,
                  }}
                >
                  {plan.name}
                </h3>

                <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 16 }}>
                  <span
                    style={{
                      fontFamily: display,
                      fontWeight: weight.section,
                      fontSize: "2.1rem",
                      color: colors.ink,
                    }}
                  >
                    {plan.price}
                  </span>
                  <span
                    style={{
                      fontFamily: sans,
                      fontWeight: weight.body,
                      fontSize: "0.85rem",
                      color: colors.dim,
                    }}
                  >
                    {plan.cadence}
                  </span>
                </div>

                <p
                  style={{
                    fontFamily: sans,
                    fontWeight: weight.body,
                    color: colors.body,
                    fontSize: "0.92rem",
                    lineHeight: 1.6,
                    margin: "16px 0 0",
                  }}
                >
                  {plan.blurb}
                </p>

                {plan.note && (
                  <p
                    style={{
                      fontFamily: sans,
                      fontWeight: weight.body,
                      color: colors.dim,
                      fontSize: "0.8rem",
                      lineHeight: 1.5,
                      margin: "12px 0 0",
                    }}
                  >
                    {plan.note}
                  </p>
                )}

                {/* App Store isn't live: never fabricate a purchase button.
                    The free plan is the one honest download CTA; premium
                    plans are purchased inside the app once installed. */}
                <div style={{ marginTop: "auto", paddingTop: 28 }}>
                  {plan.id === "free" ? (
                    <OfficialAppStoreBadge height={36} />
                  ) : (
                    <span
                      style={{
                        fontFamily: sans,
                        fontWeight: weight.label,
                        fontSize: "0.78rem",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: colors.dim,
                      }}
                    >
                      In the app
                    </span>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Free vs Premium — compact accessible comparison table. */}
        <Reveal delay={0.1}>
          <div style={{ marginTop: 72, overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: sans }}>
              <caption style={{ ...labelStyle, captionSide: "top", textAlign: "left", marginBottom: 16 }}>
                Free vs Premium
              </caption>
              <thead>
                <tr>
                  <th
                    scope="col"
                    style={{
                      textAlign: "left",
                      padding: "12px 16px",
                      borderBottom: `1px solid ${colors.borderSubtle}`,
                      color: colors.ink,
                      fontWeight: weight.heading,
                      fontSize: "0.88rem",
                    }}
                  >
                    Feature
                  </th>
                  <th
                    scope="col"
                    style={{
                      textAlign: "center",
                      padding: "12px 16px",
                      borderBottom: `1px solid ${colors.borderSubtle}`,
                      color: colors.ink,
                      fontWeight: weight.heading,
                      fontSize: "0.88rem",
                    }}
                  >
                    Free
                  </th>
                  <th
                    scope="col"
                    style={{
                      textAlign: "center",
                      padding: "12px 16px",
                      borderBottom: `1px solid ${colors.borderSubtle}`,
                      color: colors.ink,
                      fontWeight: weight.heading,
                      fontSize: "0.88rem",
                    }}
                  >
                    Premium
                  </th>
                </tr>
              </thead>
              <tbody>
                {featureMatrix.map((row) => (
                  <tr key={row.feature}>
                    <th
                      scope="row"
                      style={{
                        textAlign: "left",
                        padding: "12px 16px",
                        borderBottom: `1px solid ${colors.borderSubtle}`,
                        color: colors.body,
                        fontWeight: weight.body,
                        fontSize: "0.88rem",
                      }}
                    >
                      {row.feature}
                    </th>
                    <td
                      style={{
                        textAlign: "center",
                        padding: "12px 16px",
                        borderBottom: `1px solid ${colors.borderSubtle}`,
                      }}
                    >
                      <MatrixCell value={row.free} />
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        padding: "12px 16px",
                        borderBottom: `1px solid ${colors.borderSubtle}`,
                      }}
                    >
                      <MatrixCell value={row.premium} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p
            style={{
              fontFamily: sans,
              fontWeight: weight.body,
              color: colors.dim,
              fontSize: "0.8rem",
              lineHeight: 1.5,
              marginTop: 40,
              maxWidth: layout.contentMax,
            }}
          >
            {priceDisclaimer}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
