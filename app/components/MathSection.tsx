"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import AccentPeriod from "./AccentPeriod";
import { colors, labelStyle, serif, sans, layout } from "../lib/tokens";

function CountUp({ target, duration = 1400 }: { target: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(target);
      return;
    }
    let raf = 0;
    const startTime = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setValue(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration, reduce]);

  return <span ref={ref}>{value.toLocaleString("en-US")}</span>;
}

const numberStyle = {
  fontFamily: serif,
  fontWeight: 400,
  color: colors.ink,
  fontSize: "clamp(3.6rem, 9vw, 6.5rem)",
  lineHeight: 1,
  letterSpacing: "-0.02em",
  fontVariantNumeric: "tabular-nums" as const,
};

const statLabelStyle = {
  fontFamily: sans,
  fontWeight: 300,
  color: colors.dim,
  fontSize: "1rem",
  lineHeight: 1.5,
  marginTop: 20,
  maxWidth: 240,
};

function Stat({
  value,
  label,
  delay,
}: {
  value: React.ReactNode;
  label: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
      <div style={numberStyle}>
        {value}
        <AccentPeriod />
      </div>
      <p style={statLabelStyle}>{label}</p>
    </Reveal>
  );
}

export default function MathSection() {
  return (
    <section
      id="the-math"
      style={{
        background: colors.canvas,
        padding: `${layout.padY} ${layout.padX}`,
      }}
    >
      <div style={{ maxWidth: layout.wideMax, margin: "0 auto" }}>
        <Reveal style={{ textAlign: "center" }}>
          <p style={labelStyle}>The Math</p>
        </Reveal>

        <div className="stats-grid" style={{ marginTop: "clamp(48px, 7vh, 80px)" }}>
          <Stat value={<CountUp target={2190} />} label="cigarettes a year, if you don't count" delay={0.05} />
          <Stat value="1 tap" label="to log, from your wrist" delay={0.15} />
          <Stat value="$0" label="leaves your phone. ever." delay={0.25} />
        </div>
      </div>
    </section>
  );
}
