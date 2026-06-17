import { colors, serif, sans } from "../lib/tokens";
import AccentPeriod from "./AccentPeriod";
import HeroVisual from "./HeroVisual";

/* Split hero: massive serif headline beside the real ONIS app, which logs a
   +1 as you scroll. Copy entrance is pure CSS (.hero-reveal). */
export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-glow" aria-hidden />

      <div className="hero-grid">
        <div className="hero-copy">
          <p
            className="hero-reveal d1"
            style={{
              fontFamily: sans,
              fontSize: "0.7rem",
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: colors.accent,
              fontWeight: 500,
              marginBottom: 26,
            }}
          >
            On your phone only · No cloud · No account
          </p>

          <h1
            className="hero-reveal d2"
            style={{
              fontFamily: serif,
              fontWeight: 400,
              color: colors.ink,
              fontSize: "clamp(2.7rem, 6.4vw, 5.6rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            make it count
            <AccentPeriod />
          </h1>

          <p
            className="hero-reveal d3"
            style={{
              fontFamily: sans,
              fontWeight: 300,
              color: colors.body,
              fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
              lineHeight: 1.6,
              maxWidth: 440,
              margin: "26px auto 0",
            }}
          >
            Count the habit you keep meaning to cut down. One honest tap, from your wrist.
          </p>

          <a href="#the-math" className="btn-primary hero-reveal d4" style={{ marginTop: 38 }}>
            See how it counts
          </a>
        </div>

        <div className="hero-reveal d-film hero-phone-col">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
