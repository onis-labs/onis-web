"use client";

import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import AccentPeriod from "./AccentPeriod";
import { colors, labelStyle, serif, sans, ease, layout } from "../lib/tokens";

// Chart geometry.
const W = 600;
const H = 340;
const padL = 52;
const padR = 20;
const padT = 24;
const padB = 44;
const plotW = W - padL - padR;
const plotH = H - padT - padB;
const MAXV = 6;

const xAt = (week: number) => padL + (week / 12) * plotW;
const yAt = (v: number) => padT + ((MAXV - v) / MAXV) * plotH;

// Without ONIS: holds around six a day.
const baseline = [6, 6.1, 5.9, 6.05, 6.1, 5.95, 6, 6.05, 5.9, 6, 6.08, 5.95, 6];
// With ONIS: steps down, week by week.
const plan = [6, 5.5, 5, 4.6, 4, 3.5, 3, 2.7, 2.3, 2, 1.6, 1.3, 1];

const toPath = (vals: number[]) =>
  vals
    .map((v, i) => `${i === 0 ? "M" : "L"}${xAt(i).toFixed(1)},${yAt(v).toFixed(1)}`)
    .join(" ");

export default function DifferenceSection() {
  const reduce = useReducedMotion();

  return (
    <section
      style={{
        background: colors.canvas,
        padding: `${layout.padY} ${layout.padX}`,
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <Reveal>
          <p style={labelStyle}>The Difference</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            style={{
              fontFamily: serif,
              fontWeight: 400,
              color: colors.ink,
              fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
              margin: "16px 0 48px",
              lineHeight: 1.1,
            }}
          >
            This is the difference
            <AccentPeriod />
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <svg
            viewBox={`0 0 ${W} ${H}`}
            role="img"
            aria-label="Two paths: without ONIS, counts stay around six a day; with ONIS, counts step down week by week."
            style={{ display: "block", width: "100%", height: "auto", overflow: "visible" }}
          >
            <defs>
              <clipPath id="diff-reveal-a">
                <motion.rect
                  x={padL}
                  y={0}
                  height={H}
                  initial={{ width: reduce ? plotW : 0 }}
                  whileInView={{ width: plotW }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 1.2, ease }}
                />
              </clipPath>
              <clipPath id="diff-reveal-b">
                <motion.rect
                  x={padL}
                  y={0}
                  height={H}
                  initial={{ width: reduce ? plotW : 0 }}
                  whileInView={{ width: plotW }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 1.2, delay: 0.2, ease }}
                />
              </clipPath>
            </defs>

            {/* faint gridlines */}
            {[2, 4, 6].map((v) => (
              <line
                key={v}
                x1={padL}
                y1={yAt(v)}
                x2={xAt(12)}
                y2={yAt(v)}
                stroke={colors.borderSubtle}
                strokeWidth={1}
              />
            ))}
            {/* y-axis numbers */}
            {[2, 4, 6].map((v) => (
              <text
                key={`y-${v}`}
                x={padL - 10}
                y={yAt(v) + 4}
                textAnchor="end"
                fontFamily={sans}
                fontSize={11}
                fill={colors.dim}
              >
                {v}
              </text>
            ))}
            {/* baseline axis */}
            <line
              x1={padL}
              y1={yAt(0)}
              x2={xAt(12)}
              y2={yAt(0)}
              stroke={colors.dim}
              strokeWidth={1}
            />

            {/* y label */}
            <text
              x={padL - 10}
              y={14}
              textAnchor="end"
              fontFamily={sans}
              fontSize={11}
              fill={colors.dim}
            >
              per day
            </text>

            {/* Without ONIS — gray dashed, holds flat */}
            <g clipPath="url(#diff-reveal-a)">
              <path
                d={toPath(baseline)}
                fill="none"
                stroke={colors.dim}
                strokeWidth={2}
                strokeDasharray="5 6"
                strokeLinecap="round"
              />
              <circle cx={xAt(12)} cy={yAt(6)} r={4} fill={colors.dim} />
            </g>

            {/* With ONIS — terracotta, steps down */}
            <g clipPath="url(#diff-reveal-b)">
              <path
                d={toPath(plan)}
                fill="none"
                stroke={colors.accent}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx={xAt(12)} cy={yAt(1)} r={5} fill={colors.accent} />
            </g>

            {/* x labels */}
            <text
              x={xAt(0)}
              y={yAt(0) + 22}
              textAnchor="start"
              fontFamily={sans}
              fontSize={11}
              fill={colors.dim}
            >
              0 · Today
            </text>
            <text
              x={xAt(6)}
              y={yAt(0) + 22}
              textAnchor="middle"
              fontFamily={sans}
              fontSize={11}
              fill={colors.dim}
            >
              6
            </text>
            <text
              x={xAt(12)}
              y={yAt(0) + 22}
              textAnchor="end"
              fontFamily={sans}
              fontSize={11}
              fill={colors.dim}
            >
              12
            </text>
            <text
              x={(padL + xAt(12)) / 2}
              y={yAt(0) + 38}
              textAnchor="middle"
              fontFamily={sans}
              fontSize={11}
              fill={colors.dim}
            >
              weeks
            </text>
          </svg>
        </Reveal>

        {/* legend */}
        <Reveal delay={0.3}>
          <div style={{ marginTop: 32, display: "grid", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <svg width="28" height="8" aria-hidden>
                <line
                  x1="0"
                  y1="4"
                  x2="28"
                  y2="4"
                  stroke={colors.dim}
                  strokeWidth={2}
                  strokeDasharray="5 6"
                  strokeLinecap="round"
                />
              </svg>
              <span
                style={{ fontFamily: sans, fontWeight: 500, color: colors.ink, fontSize: "0.95rem" }}
              >
                Without ONIS
              </span>
              <span style={{ fontFamily: sans, fontWeight: 300, color: colors.dim, fontSize: "0.95rem" }}>
                stays around six a day
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <svg width="28" height="8" aria-hidden>
                <line x1="0" y1="4" x2="28" y2="4" stroke={colors.accent} strokeWidth={2.5} strokeLinecap="round" />
              </svg>
              <span
                style={{ fontFamily: sans, fontWeight: 500, color: colors.ink, fontSize: "0.95rem" }}
              >
                With ONIS
              </span>
              <span style={{ fontFamily: sans, fontWeight: 300, color: colors.dim, fontSize: "0.95rem" }}>
                steps down, week by week
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <p
            style={{
              fontFamily: sans,
              fontWeight: 300,
              fontStyle: "italic",
              color: colors.dim,
              fontSize: "0.9rem",
              marginTop: 28,
              maxWidth: 480,
            }}
          >
            An illustration of a step-down plan — yours is built from your numbers.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
