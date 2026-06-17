import Reveal from "./Reveal";
import AccentPeriod from "./AccentPeriod";
import { colors, labelStyle, serif, sans, layout } from "../lib/tokens";

/* THE BIGGER PICTURE — real, sourced statistics for context (no fabricated
   numbers; every figure carries its citation). Awareness, not a lecture. */

type Stat = { value: string; label: string; source: string };

const stats: Stat[] = [
  {
    value: "1 in 5",
    label: "U.S. adults use a tobacco or nicotine product",
    source: "Source: CDC, 2022",
  },
  {
    value: "85%",
    label: "of U.S. adults have caffeine every day",
    source: "Source: Mitchell et al., 2014",
  },
  {
    value: "30+",
    label: "attempts it can take to quit smoking for good",
    source: "Source: BMJ Open, 2016",
  },
  {
    value: "30–60%",
    label: "of real drinking is all self-reports capture",
    source: "Source: BMC Public Health, 2019",
  },
];

export default function BiggerPicture() {
  return (
    <section style={{ background: colors.cardCream, padding: `${layout.padY} ${layout.padX}` }}>
      <div style={{ maxWidth: layout.wideMax, margin: "0 auto" }}>
        <Reveal style={{ textAlign: "center" }}>
          <p style={labelStyle}>The Bigger Picture</p>
        </Reveal>

        <Reveal delay={0.1} style={{ textAlign: "center" }}>
          <h2
            style={{
              fontFamily: serif,
              fontWeight: 400,
              color: colors.ink,
              fontSize: "clamp(1.9rem, 4.2vw, 3rem)",
              lineHeight: 1.12,
              margin: "16px auto 0",
              maxWidth: 640,
            }}
          >
            You&apos;re not the only one losing count
            <AccentPeriod />
          </h2>
        </Reveal>

        <Reveal delay={0.18} style={{ textAlign: "center" }}>
          <p
            style={{
              fontFamily: sans,
              fontWeight: 300,
              color: colors.body,
              fontSize: "1.05rem",
              lineHeight: 1.6,
              maxWidth: 520,
              margin: "20px auto 0",
            }}
          >
            These are habits most of us share. ONIS just helps you see yours clearly.
          </p>
        </Reveal>

        <div className="bigpic-grid" style={{ marginTop: "clamp(56px, 9vh, 96px)" }}>
          {stats.map((s, i) => (
            <Reveal key={s.value} delay={0.08 * (i + 1)} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: serif,
                  fontWeight: 400,
                  color: colors.ink,
                  fontSize: "clamp(3.2rem, 6.6vw, 5.2rem)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                {s.value}
                <AccentPeriod />
              </div>
              <p
                style={{
                  fontFamily: sans,
                  fontWeight: 300,
                  color: colors.body,
                  fontSize: "1rem",
                  lineHeight: 1.5,
                  maxWidth: 300,
                  margin: "18px auto 0",
                }}
              >
                {s.label}
              </p>
              <p
                style={{
                  fontFamily: sans,
                  fontSize: "0.72rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: colors.dim,
                  marginTop: 14,
                }}
              >
                {s.source}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
