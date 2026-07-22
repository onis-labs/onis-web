import Reveal from "./Reveal";
import AccentPeriod from "./AccentPeriod";
import { colors, display, sans, type, weight, labelStyle } from "../lib/tokens";

// ── Shared section intro ──────────────────────────────────────────────────
// Kicker (small caps, terracotta), headline (system display, terracotta
// period), optional body line, optional truthful Premium chip. Every
// homepage section uses this so rhythm and hierarchy never drift.

interface SectionIntroProps {
  kicker: string;
  /** Headline without its trailing period — AccentPeriod renders it. */
  title: string;
  body?: string;
  premium?: boolean;
  center?: boolean;
}

export default function SectionIntro({
  kicker,
  title,
  body,
  premium = false,
  center = false,
}: SectionIntroProps) {
  const align = center ? "center" : "left";
  return (
    <div style={{ textAlign: align as "center" | "left" }}>
      <Reveal>
        <p style={{ ...labelStyle, color: colors.accent }}>{kicker}</p>
      </Reveal>

      <Reveal delay={0.08}>
        <h2
          style={{
            fontFamily: display,
            fontWeight: weight.section,
            fontSize: type.section,
            letterSpacing: "-0.02em",
            color: colors.ink,
            lineHeight: 1.12,
            margin: "16px 0 0",
          }}
        >
          {title}
          <AccentPeriod />
        </h2>
      </Reveal>

      {body && (
        <Reveal delay={0.14}>
          <p
            style={{
              fontFamily: sans,
              fontWeight: weight.body,
              color: colors.body,
              fontSize: type.body,
              lineHeight: 1.6,
              margin: "18px auto 0",
              marginLeft: center ? "auto" : 0,
              maxWidth: 560,
            }}
          >
            {body}
          </p>
        </Reveal>
      )}

      {premium && (
        <Reveal delay={0.18}>
          <p style={{ margin: "18px 0 0" }}>
            <span
              className="chip"
              style={{
                color: "#fff",
                background: colors.premium,
                border: "none",
                fontWeight: weight.heading,
              }}
            >
              Premium
            </span>
          </p>
        </Reveal>
      )}
    </div>
  );
}
