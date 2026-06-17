"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import { colors, labelStyle, serif, layout } from "../lib/tokens";

function CountUp({
  target,
  duration = 1200,
}: {
  target: number;
  duration?: number;
}) {
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

export default function MathSection() {
  return (
    <section
      id="the-math"
      style={{
        background: colors.canvas,
        padding: `${layout.padY} ${layout.padX}`,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: 720, textAlign: "center" }}>
        <Reveal>
          <p style={labelStyle}>The Math</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            style={{
              fontFamily: serif,
              fontWeight: 400,
              color: colors.accent,
              fontSize: "clamp(4.5rem, 16vw, 11rem)",
              lineHeight: 1,
              margin: "32px 0 16px",
              letterSpacing: "-0.01em",
            }}
          >
            <CountUp target={2190} />
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p
            style={{
              fontFamily: serif,
              fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
              color: colors.ink,
            }}
          >
            cigarettes a year
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <p
            style={{
              fontStyle: "italic",
              color: colors.dim,
              fontSize: "1rem",
              marginTop: 16,
            }}
          >
            Roughly $876 a year — an estimate, not a lecture.
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <p style={{ color: colors.body, fontSize: "0.95rem", marginTop: 40 }}>
            Six a day. That&apos;s the arithmetic.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
