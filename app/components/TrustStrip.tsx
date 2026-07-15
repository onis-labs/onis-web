import type { CSSProperties } from "react";
import { colors, sans, layout } from "../lib/tokens";
import { site } from "../lib/config";

// Slim, quiet strip of quick facts — sits between sections, not a headline
// moment. Three things a visitor can verify at a glance.
const items = [`No ${site.name} account`, "iPhone + Apple Watch", "Local habit history"];

const itemTextStyle: CSSProperties = {
  fontFamily: sans,
  fontWeight: 500,
  fontSize: "0.85rem",
  letterSpacing: "0.02em",
  color: colors.dim,
  whiteSpace: "nowrap",
};

// Decorative marker only — the words carry the meaning.
function Dot() {
  return (
    <svg width="6" height="6" viewBox="0 0 6 6" aria-hidden style={{ flexShrink: 0 }}>
      <circle cx="3" cy="3" r="3" fill={colors.accent} />
    </svg>
  );
}

export default function TrustStrip() {
  return (
    <section
      aria-label="At a glance"
      style={{
        background: colors.canvas,
        borderTop: `1px solid ${colors.borderSubtle}`,
        borderBottom: `1px solid ${colors.borderSubtle}`,
        padding: `28px ${layout.padX}`,
      }}
    >
      <div
        style={{
          maxWidth: layout.wideMax,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {items.map((item, i) => (
          <div
            key={item}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "4px 28px",
              borderLeft: i === 0 ? "none" : `1px solid ${colors.borderSubtle}`,
            }}
          >
            <Dot />
            <span style={itemTextStyle}>{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
