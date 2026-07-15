"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { colors, sans, display, type, weight } from "../lib/tokens";
import AccentPeriod from "./AccentPeriod";
import OfficialAppStoreBadge from "./OfficialAppStoreBadge";
import HeroVisual from "./HeroVisual";

/* Hero: the copy sits beside the real ONIS app, choreographed by scroll. A
   ~200vh sticky scrub drives HeroVisual's `p` (0→1): the Main "+1" presses,
   the count rolls 0 → 1, then the screen settles into Coach's next step —
   the one-tap → pattern loop, once per scroll pass. It reverses on scroll-up.
   No scroll library: a passive scroll+resize listener computes progress
   inside requestAnimationFrame. framer-motion is used ONLY for
   useReducedMotion(). Reduced motion: a static hero — phone shows a
   representative logged state, no scrub, no entrance (copy + phone are both
   present in the very first render either way, so there is no empty flash
   before JS runs). */
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
          color: colors.dim,
          fontWeight: weight.label,
          marginBottom: 24,
        }}
      >
        An Honest Tracker
      </p>

      <h1
        className="hero-reveal d2"
        style={{
          fontFamily: display,
          fontWeight: weight.hero,
          fontSize: type.hero,
          letterSpacing: "-0.03em",
          lineHeight: 1.0,
          color: colors.ink,
          margin: 0,
        }}
      >
        <span style={{ display: "block" }}>Track honestly.</span>
        <span style={{ display: "block", color: colors.accent }}>See the pattern.</span>
        <span style={{ display: "block" }}>
          Change one thing
          <AccentPeriod />
        </span>
      </h1>

      <p
        className="hero-reveal d3"
        style={{
          fontFamily: sans,
          fontWeight: weight.body,
          color: colors.body,
          fontSize: type.body,
          lineHeight: 1.6,
          maxWidth: 460,
          margin: "24px auto 0",
        }}
      >
        One tap from iPhone, Apple Watch, or widget. ONIS turns your real logs into a plan you control.
      </p>

      <div
        className="hero-reveal d4"
        style={{
          display: "inline-flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 24,
          marginTop: 32,
        }}
      >
        <OfficialAppStoreBadge />
        <a href="#how-it-works" className="btn-secondary">
          See how it works
        </a>
      </div>
    </div>
  );

  if (reduce) {
    return (
      <section className="hero">
        <div className="hero-grid">
          {copy}
          <div className="hero-phone-col">
            <HeroVisual p={0} reduce />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="hero-scroll" ref={ref}>
      <div className="hero-sticky">
        <div className="hero-grid">
          {copy}
          <div className="hero-phone-col">
            <HeroVisual p={p} reduce={false} />
          </div>
        </div>
      </div>
    </section>
  );
}
