import { colors, serif, sans } from "../lib/tokens";
import AccentPeriod from "./AccentPeriod";
import HeroVisual from "./HeroVisual";

/* Centered, confident hero: massive serif headline over a wide product film.
   Entrance is pure CSS (.hero-reveal) so nothing can stall hidden. */
export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-glow" aria-hidden />

      <div className="hero-inner">
        <p
          className="hero-reveal d1"
          style={{
            fontFamily: sans,
            fontSize: "0.7rem",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: colors.accent,
            fontWeight: 500,
            marginBottom: 28,
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
            fontSize: "clamp(2.9rem, 9vw, 7rem)",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            margin: 0,
            maxWidth: 900,
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
            fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
            lineHeight: 1.6,
            maxWidth: 520,
            margin: "28px auto 0",
          }}
        >
          {"An honest tracker for the habits you don't talk about. One tap from your wrist."}
        </p>

        <a href="#the-math" className="btn-primary hero-reveal d4" style={{ marginTop: 40 }}>
          See how it counts
        </a>

        <div className="hero-reveal d-film hero-film-wrap">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
