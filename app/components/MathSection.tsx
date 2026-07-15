"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, CSSProperties, ReactNode } from "react";
import { animate, motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import AccentPeriod from "./AccentPeriod";
import { colors, sans, display, type, weight, layout, ease, labelStyle } from "../lib/tokens";

// ── The calculator's bounds and defaults. This section used to hardcode
// "730 energy drinks a year" (2/day). That's still the starting point —
// but now it's an editable, honest calculation instead of a fixed claim. ──
type Unit = "pouches" | "cups" | "cigarettes" | "drinks" | "sessions" | "takeout meals";

const UNITS: Unit[] = ["pouches", "cups", "cigarettes", "drinks", "sessions", "takeout meals"];
const MIN_PER_DAY = 1;
const MAX_PER_DAY = 20;
const DEFAULT_PER_DAY = 2;
const DEFAULT_UNIT: Unit = "pouches";

function clampPerDay(n: number): number {
  return Math.min(MAX_PER_DAY, Math.max(MIN_PER_DAY, Math.round(n)));
}

// Ticks a plain number from its last value to `target`. State initializes to
// `target` itself — never 0 — so server render and first client paint always
// agree and are already correct. Reduced motion (or a no-op change) sets the
// value directly instead of animating.
function CountUp({ target }: { target: number }) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(target);
  const prevTarget = useRef(target);

  useEffect(() => {
    const from = prevTarget.current;
    const to = target;
    prevTarget.current = to;

    if (reduce || from === to) {
      setValue(to);
      return;
    }

    const controls = animate(from, to, {
      duration: 0.45,
      ease,
      onUpdate: (latest) => setValue(Math.round(latest)),
    });

    return () => controls.stop();
  }, [target, reduce]);

  return <span>{value.toLocaleString("en-US")}</span>;
}

const numberStyle = {
  fontFamily: display,
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

function Stat({ value, label, delay }: { value: ReactNode; label: string; delay: number }) {
  return (
    <Reveal
      delay={delay}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}
    >
      <div style={numberStyle}>
        {value}
        <AccentPeriod />
      </div>
      <p style={statLabelStyle}>{label}</p>
    </Reveal>
  );
}

const headlineStyle: CSSProperties = {
  fontFamily: display,
  fontWeight: weight.section,
  color: colors.ink,
  fontSize: type.section,
  letterSpacing: "-0.02em",
  lineHeight: 1.05,
  margin: "16px 0 0",
};

const controlsRowStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
  gap: "clamp(32px, 6vw, 64px)",
  marginTop: "clamp(40px, 6vh, 64px)",
  paddingTop: 32,
  paddingBottom: 32,
  borderTop: `1px solid ${colors.borderSubtle}`,
  borderBottom: `1px solid ${colors.borderSubtle}`,
};

const controlGroupStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const controlLabelStyle: CSSProperties = {
  ...labelStyle,
  marginBottom: 12,
};

const rangeStyle: CSSProperties = {
  width: "clamp(120px, 22vw, 200px)",
  accentColor: colors.accent,
  cursor: "pointer",
};

const selectStyle: CSSProperties = {
  fontFamily: sans,
  fontWeight: weight.label,
  fontSize: type.body,
  color: colors.ink,
  background: colors.canvas,
  border: `1px solid ${colors.borderSubtle}`,
  borderRadius: 4,
  padding: "8px 16px",
  cursor: "pointer",
};

function stepperButtonStyle(disabled: boolean): CSSProperties {
  return {
    width: 36,
    height: 36,
    borderRadius: "50%",
    border: `1px solid ${colors.borderSubtle}`,
    background: colors.canvas,
    color: colors.ink,
    fontFamily: sans,
    fontSize: "1.05rem",
    fontWeight: weight.label,
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    cursor: disabled ? "default" : "pointer",
    opacity: disabled ? 0.4 : 1,
  };
}

const summaryStyle: CSSProperties = {
  fontFamily: sans,
  fontWeight: 300,
  color: colors.dim,
  fontSize: type.body,
  lineHeight: 1.6,
  maxWidth: layout.contentMax,
  margin: "0 auto",
  fontVariantNumeric: "tabular-nums",
};

export default function MathSection() {
  const [perDay, setPerDay] = useState<number>(DEFAULT_PER_DAY);
  const [unit, setUnit] = useState<Unit>(DEFAULT_UNIT);

  // Exact, honest arithmetic — no rounding, no health or money claims.
  const week = perDay * 7;
  const year = perDay * 365;

  const summary = `At ${perDay} ${unit} a day, that's ${week.toLocaleString("en-US")} a week and ${year.toLocaleString(
    "en-US"
  )} a year.`;

  const decrement = () => setPerDay((p) => clampPerDay(p - 1));
  const increment = () => setPerDay((p) => clampPerDay(p + 1));

  const handleRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const next = Number(e.target.value);
    if (Number.isFinite(next)) setPerDay(clampPerDay(next));
  };

  const handleUnitChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setUnit(e.target.value as Unit);
  };

  return (
    <section
      id="the-math"
      style={{
        padding: `${layout.padY} ${layout.padX}`,
        background: colors.cardCream,
      }}
    >
      <div style={{ maxWidth: layout.wideMax, margin: "0 auto" }}>
        <Reveal style={{ textAlign: "center" }}>
          <p style={labelStyle}>The Math</p>
        </Reveal>

        <Reveal delay={0.1} style={{ textAlign: "center" }}>
          <h2 style={headlineStyle}>
            The moment feels small.
            <br />
            The number isn&apos;t
            <AccentPeriod />
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <div style={controlsRowStyle}>
            <div style={controlGroupStyle}>
              <label htmlFor="math-per-day" style={controlLabelStyle}>
                Per day
              </label>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <motion.button
                  type="button"
                  onClick={decrement}
                  disabled={perDay <= MIN_PER_DAY}
                  aria-label="Decrease per day"
                  whileTap={{ scale: 0.92 }}
                  transition={{ duration: 0.2, ease }}
                  style={stepperButtonStyle(perDay <= MIN_PER_DAY)}
                >
                  −
                </motion.button>

                <input
                  id="math-per-day"
                  type="range"
                  min={MIN_PER_DAY}
                  max={MAX_PER_DAY}
                  step={1}
                  value={perDay}
                  onChange={handleRangeChange}
                  aria-valuetext={`${perDay} ${unit} per day`}
                  style={rangeStyle}
                />

                <motion.button
                  type="button"
                  onClick={increment}
                  disabled={perDay >= MAX_PER_DAY}
                  aria-label="Increase per day"
                  whileTap={{ scale: 0.92 }}
                  transition={{ duration: 0.2, ease }}
                  style={stepperButtonStyle(perDay >= MAX_PER_DAY)}
                >
                  +
                </motion.button>
              </div>
            </div>

            <div style={controlGroupStyle}>
              <label htmlFor="math-unit" style={controlLabelStyle}>
                Counting
              </label>
              <select id="math-unit" value={unit} onChange={handleUnitChange} style={selectStyle}>
                {UNITS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Reveal>

        <div className="stats-grid" style={{ marginTop: "clamp(48px, 7vh, 80px)" }}>
          <Stat value={<CountUp target={perDay} />} label={`${unit} a day`} delay={0.05} />
          <Stat value={<CountUp target={week} />} label={`${unit} a week`} delay={0.15} />
          <Stat value={<CountUp target={year} />} label={`${unit} a year`} delay={0.25} />
        </div>

        <Reveal delay={0.3} style={{ textAlign: "center" }}>
          <p aria-live="polite" style={summaryStyle}>
            {summary}
          </p>
        </Reveal>

        <Reveal delay={0.4} style={{ textAlign: "center" }}>
          <p
            style={{
              fontFamily: display,
              fontStyle: "italic",
              color: colors.dim,
              fontSize: "clamp(1.05rem, 2.2vw, 1.35rem)",
              maxWidth: 560,
              margin: "clamp(56px, 8vh, 88px) auto 0",
            }}
          >
            One tap makes the invisible visible.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
