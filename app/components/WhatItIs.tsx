import Reveal from "./Reveal";
import AccentPeriod from "./AccentPeriod";
import { colors, labelStyle, serif, sans, layout } from "../lib/tokens";

/* WHAT IT IS — the plain-language answer to "what is this app", right after the
   hero. Clarity over cleverness: no jargon, no hype. The serif lead defines it;
   the body line says what it does. */
export default function WhatItIs() {
  return (
    <section
      style={{
        background: colors.cardCream,
        padding: `${layout.padY} ${layout.padX}`,
      }}
    >
      <div style={{ maxWidth: layout.contentMax, margin: "0 auto", textAlign: "center" }}>
        <Reveal>
          <p style={labelStyle}>What Is ONIS</p>
        </Reveal>

        <Reveal delay={0.1}>
          <p
            style={{
              fontFamily: serif,
              fontWeight: 400,
              color: colors.ink,
              fontSize: "clamp(1.6rem, 3.6vw, 2.5rem)",
              lineHeight: 1.28,
              letterSpacing: "-0.01em",
              margin: "20px auto 0",
              maxWidth: 720,
            }}
          >
            ONIS is a private habit tracker for the things you keep meaning to
            cut down — cigarettes, vape, nicotine pouches, alcohol, energy
            drinks, and more
            <AccentPeriod />
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <p
            style={{
              fontFamily: sans,
              fontWeight: 300,
              color: colors.body,
              fontSize: "clamp(1.05rem, 2vw, 1.2rem)",
              lineHeight: 1.6,
              maxWidth: 520,
              margin: "28px auto 0",
            }}
          >
            One tap logs it. Everything stays on your phone. It gently helps you
            do less, week by week.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
