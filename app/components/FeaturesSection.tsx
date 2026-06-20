"use client";

import type { ReactNode } from "react";
import Reveal from "./Reveal";
import AccentPeriod from "./AccentPeriod";
import { colors, labelStyle, serif, sans, layout } from "../lib/tokens";

type Feature = { icon: ReactNode; title: string; body: string };

const iconProps = {
  width: 30,
  height: 30,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: colors.accent,
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const features: Feature[] = [
  {
    icon: (
      <svg {...iconProps}>
        <line x1="3" y1="8.5" x2="21" y2="8.5" />
        <line x1="3" y1="15.5" x2="21" y2="15.5" />
        <circle cx="8" cy="8.5" r="2.4" fill={colors.cardCream} />
        <circle cx="16" cy="15.5" r="2.4" fill={colors.cardCream} />
      </svg>
    ),
    title: "A coach that adapts",
    body: "Eases off when you slip, tightens when you're ready.",
  },
  {
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="12" r="0.8" fill={colors.accent} stroke="none" />
      </svg>
    ),
    title: "Honest by design",
    body: "No streaks to break. No shame to carry. Just your real numbers.",
  },
  {
    icon: (
      <svg {...iconProps}>
        <rect x="7" y="7" width="10" height="10" rx="3" />
        <path d="M9.5 7V4.2h5V7" />
        <path d="M9.5 17v2.8h5V17" />
        <circle cx="12" cy="12" r="1.1" fill={colors.accent} stroke="none" />
      </svg>
    ),
    title: "From your wrist",
    body: "One tap on Apple Watch. Logged before the moment passes.",
  },
];

export default function FeaturesSection() {
  return (
    <section
      style={{
        background: colors.cardCream,
        padding: `${layout.padY} ${layout.padX}`,
      }}
    >
      <div style={{ maxWidth: layout.wideMax, margin: "0 auto" }}>
        <Reveal>
          <p style={labelStyle}>Built On Restraint</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            style={{
              fontFamily: serif,
              fontWeight: 400,
              color: colors.ink,
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              margin: "16px 0 56px",
              lineHeight: 1.1,
            }}
          >
            Less, on purpose
            <AccentPeriod />
          </h2>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))",
            gap: 40,
          }}
        >
          {features.map((f, i) => (
            <Reveal key={f.title} delay={0.1 * (i + 1)}>
              <article
                style={{
                  borderTop: `1px solid ${colors.borderSubtle}`,
                  paddingTop: 32,
                }}
              >
                <div style={{ marginBottom: 24 }}>{f.icon}</div>
                <h3
                  style={{
                    fontFamily: sans,
                    fontWeight: 500,
                    fontSize: "1.05rem",
                    color: colors.ink,
                    marginBottom: 12,
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    fontFamily: sans,
                    fontWeight: 300,
                    fontSize: "0.95rem",
                    color: colors.body,
                    lineHeight: 1.6,
                    maxWidth: 320,
                  }}
                >
                  {f.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
