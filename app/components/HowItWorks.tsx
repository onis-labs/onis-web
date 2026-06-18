import Reveal from "./Reveal";
import AccentPeriod from "./AccentPeriod";
import { colors, labelStyle, serif, sans, layout } from "../lib/tokens";

/* HOW IT WORKS — three concrete steps, one line each. Numbers carry the rhythm
   (serif + terracotta period, like the rest of the site). Stacks on mobile. */

type Step = { n: string; line: string };

const steps: Step[] = [
  { n: "1", line: "Pick what you want to count." },
  { n: "2", line: "Tap +1 each time it happens — from your phone or Apple Watch." },
  {
    n: "3",
    line: "ONIS shows your real numbers and eases your target down, gently, over weeks.",
  },
];

export default function HowItWorks() {
  return (
    <section
      style={{
        background: colors.cardCream,
        padding: `${layout.padY} ${layout.padX}`,
      }}
    >
      <div style={{ maxWidth: layout.wideMax, margin: "0 auto" }}>
        <Reveal>
          <p style={labelStyle}>How It Works</p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2
            style={{
              fontFamily: serif,
              fontWeight: 400,
              color: colors.ink,
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              lineHeight: 1.1,
              margin: "16px 0 0",
            }}
          >
            Three steps
            <AccentPeriod />
          </h2>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 40,
            marginTop: "clamp(48px, 7vh, 72px)",
          }}
        >
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={0.1 * (i + 1)}>
              <article
                style={{
                  borderTop: `1px solid ${colors.borderSubtle}`,
                  paddingTop: 28,
                }}
              >
                <div
                  style={{
                    fontFamily: serif,
                    fontWeight: 400,
                    color: colors.ink,
                    fontSize: "clamp(2.4rem, 5vw, 3.4rem)",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {s.n}
                  <AccentPeriod />
                </div>
                <p
                  style={{
                    fontFamily: sans,
                    fontWeight: 300,
                    color: colors.body,
                    fontSize: "1rem",
                    lineHeight: 1.6,
                    marginTop: 16,
                    maxWidth: 280,
                  }}
                >
                  {s.line}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
