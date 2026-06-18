import Reveal from "./Reveal";
import AccentPeriod from "./AccentPeriod";
import { colors, labelStyle, serif, layout } from "../lib/tokens";

/* WHO IT'S FOR — one calm line naming exactly who this is for, and what they
   are spared: accounts, ads, judgment, shame. */
export default function WhoItsFor() {
  return (
    <section
      style={{
        background: colors.canvas,
        padding: `${layout.padY} ${layout.padX}`,
      }}
    >
      <div style={{ maxWidth: layout.contentMax, margin: "0 auto", textAlign: "center" }}>
        <Reveal>
          <p style={labelStyle}>Who It&apos;s For</p>
        </Reveal>

        <Reveal delay={0.1}>
          <p
            style={{
              fontFamily: serif,
              fontWeight: 400,
              color: colors.ink,
              fontSize: "clamp(1.5rem, 3.2vw, 2.2rem)",
              lineHeight: 1.3,
              letterSpacing: "-0.01em",
              margin: "20px auto 0",
              maxWidth: 680,
            }}
          >
            For anyone privately trying to cut down on a habit — and who wants
            honest tracking without accounts, ads, judgment, or shame
            <AccentPeriod />
          </p>
        </Reveal>
      </div>
    </section>
  );
}
