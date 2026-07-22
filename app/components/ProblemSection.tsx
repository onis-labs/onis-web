"use client";

import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import SectionIntro from "./SectionIntro";
import { colors, sans, weight, layout, ease } from "../lib/tokens";

// ── Section 2 — The problem ──────────────────────────────────────────────
// "Remembering later leaves gaps." Calm dot motion: every moment appears,
// the unrecorded ones fade away, the recorded ones remain and connect into
// a pattern. Reduced motion shows the final connected state immediately.

interface Moment {
  x: number;
  y: number;
  kept: boolean;
}

const MOMENTS: Moment[] = [
  { x: 40, y: 86, kept: true },
  { x: 100, y: 94, kept: false },
  { x: 160, y: 78, kept: true },
  { x: 220, y: 90, kept: false },
  { x: 280, y: 72, kept: true },
  { x: 340, y: 84, kept: false },
  { x: 400, y: 62, kept: true },
  { x: 460, y: 74, kept: false },
  { x: 520, y: 50, kept: true },
];

const PATTERN_PATH = MOMENTS.filter((m) => m.kept)
  .map((m, i) => `${i === 0 ? "M" : "L"}${m.x} ${m.y}`)
  .join(" ");

function DotsPattern() {
  const reduce = useReducedMotion();

  return (
    <svg
      viewBox="0 0 560 120"
      role="img"
      aria-label="Nine small moments appear; the untapped ones fade away while the tapped ones remain and connect into a rising pattern line."
      style={{ width: "100%", maxWidth: 560, height: "auto", display: "block" }}
    >
      {/* Baseline for quiet visual grounding. */}
      <line
        x1="24"
        y1="108"
        x2="536"
        y2="108"
        stroke={colors.borderSubtle}
        strokeWidth="1"
      />

      {/* The pattern line connecting recorded moments. */}
      <motion.path
        d={PATTERN_PATH}
        fill="none"
        stroke={colors.accent}
        strokeWidth="2"
        strokeLinecap="round"
        strokeOpacity="0.55"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: reduce ? 0 : 1.1, delay: reduce ? 0 : 1.35, ease }}
      />

      {MOMENTS.map((m, i) => (
        <motion.circle
          key={`${m.x}-${m.y}`}
          cx={m.x}
          cy={m.y}
          r="7"
          fill={m.kept ? colors.accent : "transparent"}
          stroke={m.kept ? colors.accent : colors.dim}
          strokeWidth={m.kept ? 0 : 1.6}
          initial={
            reduce
              ? { opacity: m.kept ? 1 : 0.18 }
              : { opacity: 0, scale: 0.6 }
          }
          whileInView={
            reduce
              ? { opacity: m.kept ? 1 : 0.18 }
              : { opacity: [0, 1, m.kept ? 1 : 0.18], scale: 1 }
          }
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: reduce ? 0 : 1.5,
            delay: reduce ? 0 : 0.12 * i,
            times: reduce ? undefined : [0, 0.4, 1],
            ease,
          }}
        />
      ))}
    </svg>
  );
}

const COMPARISON = [
  {
    title: "Without ONIS",
    kept: false,
    items: [
      "Remember later",
      "Guess the amount",
      "Miss the timing",
      "Repeat the same loop",
    ],
  },
  {
    title: "With ONIS",
    kept: true,
    items: [
      "Tap when it happens",
      "Keep the real count",
      "See the pattern",
      "Choose one next step",
    ],
  },
] as const;

export default function ProblemSection() {
  return (
    <section
      id="why"
      style={{ padding: `${layout.padY} ${layout.padX}`, background: colors.canvas }}
    >
      <div style={{ maxWidth: layout.contentMax, margin: "0 auto" }}>
        <SectionIntro
          kicker="Why ONIS"
          title="Remembering later leaves gaps"
          body="Small moments are easy to forget. ONIS lets you record them while they are still fresh."
          center
        />

        <Reveal delay={0.15}>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 44 }}>
            <DotsPattern />
          </div>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 20,
            marginTop: 44,
          }}
        >
          {COMPARISON.map((column, columnIndex) => (
            <Reveal key={column.title} delay={0.1 * (columnIndex + 1)}>
              <div
                style={{
                  height: "100%",
                  background: colors.cardCream,
                  border: column.kept
                    ? `1.5px solid ${colors.accent}`
                    : `1px solid ${colors.borderSubtle}`,
                  borderRadius: 18,
                  padding: "26px 28px",
                }}
              >
                <h3
                  style={{
                    fontFamily: sans,
                    fontWeight: weight.heading,
                    fontSize: "0.95rem",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    color: column.kept ? colors.accent : colors.dim,
                    margin: 0,
                  }}
                >
                  {column.title}
                </h3>
                <ul style={{ listStyle: "none", margin: "18px 0 0", padding: 0 }}>
                  {column.items.map((item) => (
                    <li
                      key={item}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        fontFamily: sans,
                        fontWeight: weight.body,
                        fontSize: "0.98rem",
                        color: column.kept ? colors.ink : colors.body,
                        padding: "7px 0",
                      }}
                    >
                      <span
                        aria-hidden="true"
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: 999,
                          flexShrink: 0,
                          background: column.kept ? colors.accent : "transparent",
                          border: column.kept
                            ? "none"
                            : `1.5px solid ${colors.dim}`,
                          opacity: column.kept ? 1 : 0.6,
                        }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
