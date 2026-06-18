"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { colors, serif, sans } from "../lib/tokens";
import AccentPeriod from "./AccentPeriod";
import HeroComposite from "./HeroVisual";

/* Hero: massive headline beside a real hand holding the ONIS app. A ~200vh
   sticky scrub drives the composite — at ~40% the +1 logs, at ~75% it
   crossfades to Coach; it reverses on scroll-up. Copy text is unchanged.
   prefers-reduced-motion: static, no scrub. */
export default function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const apply = () => {
      raf = 0;
      const total = el.offsetHeight - window.innerHeight;
      const prog = total > 0 ? -el.getBoundingClientRect().top / total : 0;
      setP(Math.min(1, Math.max(0, prog)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduce]);

  const copy = (
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
  );

  if (reduce) {
    return (
      <section className="hero">
        <div className="hero-glow" aria-hidden />
        <div className="hero-grid">
          {copy}
          <div className="hero-phone-col">
            <HeroComposite progress={0} reduce />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="hero-scroll" ref={ref}>
      <div className="hero-sticky">
        <div className="hero-glow" aria-hidden />
        <div className="hero-grid">
          {copy}
          <div className="hero-phone-col">
            <HeroComposite progress={p} reduce={false} />
          </div>
        </div>
      </div>
    </section>
  );
}
