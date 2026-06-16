"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { colors, serif, sans } from "../lib/tokens";
import AccentPeriod from "./AccentPeriod";

const EASE = [0.25, 0, 0, 1] as const;

/* ============================================================
   In-phone screens. Sizes use cqw (% of the phone screen width,
   via container-type) so everything scales with the phone.
   ============================================================ */

function TabBar({ active }: { active: "today" | "coach" }) {
  const item = (label: string, on: boolean) => (
    <span
      style={{
        fontFamily: sans,
        fontSize: "3.4cqw",
        letterSpacing: "0.04em",
        color: on ? colors.accent : colors.dim,
        fontWeight: on ? 600 : 400,
      }}
    >
      {label}
    </span>
  );
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "4cqw 0 6cqw",
        borderTop: `1px solid ${colors.borderSubtle}`,
        background: colors.canvas,
      }}
    >
      {item("Today", active === "today")}
      {item("Stats", false)}
      {item("Coach", active === "coach")}
      {item("Profile", false)}
    </div>
  );
}

const screenBase = {
  position: "absolute" as const,
  inset: 0,
  background: colors.canvas,
  padding: "10cqw 6cqw 0",
  display: "flex",
  flexDirection: "column" as const,
};

const tinyLabel = {
  fontFamily: sans,
  fontSize: "3.2cqw",
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  color: colors.dim,
  fontWeight: 600,
};

function TodayScreen({
  rollY,
  btnScale,
  dayFill,
  staticCount,
  staticLogged,
}: {
  rollY?: MotionValue<string>;
  btnScale?: MotionValue<number>;
  dayFill?: MotionValue<number>;
  staticCount?: string;
  staticLogged?: boolean;
}) {
  const animated = rollY !== undefined;

  const countNode = animated ? (
    <span
      style={{
        display: "inline-block",
        height: "1em",
        overflow: "hidden",
        lineHeight: 1,
        verticalAlign: "bottom",
      }}
    >
      <motion.span style={{ display: "block", y: rollY }}>
        <span style={{ display: "block", height: "1em", lineHeight: 1 }}>3</span>
        <span style={{ display: "block", height: "1em", lineHeight: 1 }}>4</span>
      </motion.span>
    </span>
  ) : (
    (staticCount ?? "3")
  );

  const plusStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "16cqw",
    height: "16cqw",
    borderRadius: "50%",
    background: colors.accent,
    color: colors.canvas,
    fontFamily: sans,
    fontWeight: 600,
    fontSize: "5cqw",
    flex: "none",
  } as const;

  const fillStyle = {
    position: "absolute" as const,
    inset: 0,
    borderRadius: "50%",
    background: colors.accent,
    transformOrigin: "center",
  };

  return (
    <div style={screenBase}>
      {/* status bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: sans,
          fontSize: "3.2cqw",
          color: colors.ink,
          fontWeight: 500,
          marginBottom: "5cqw",
        }}
      >
        <span>9:41</span>
        <span style={{ display: "flex", gap: "1.4cqw", alignItems: "center" }}>
          <span style={{ width: "4cqw", height: "2.4cqw", borderRadius: "1cqw", background: colors.ink }} />
          <span style={{ width: "6cqw", height: "3cqw", borderRadius: "1cqw", border: `0.6cqw solid ${colors.ink}` }} />
        </span>
      </div>

      <p style={tinyLabel}>Tue · Jun 16</p>
      <p style={{ fontFamily: serif, fontSize: "6.6cqw", color: colors.ink, margin: "1cqw 0 5cqw" }}>
        Good evening
      </p>

      {/* tracker card */}
      <div
        style={{
          background: colors.cardCream,
          border: `1px solid ${colors.borderSubtle}`,
          borderRadius: "5cqw",
          padding: "6cqw",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "2.4cqw", marginBottom: "3cqw" }}>
          <span style={{ width: "2.6cqw", height: "2.6cqw", borderRadius: "50%", background: colors.accent }} />
          <span style={tinyLabel}>Cigarettes</span>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <span
            style={{
              fontFamily: serif,
              fontSize: "20cqw",
              lineHeight: 1,
              color: colors.ink,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {countNode}
          </span>
          {animated ? (
            <motion.span style={{ ...plusStyle, scale: btnScale }}>+1</motion.span>
          ) : (
            <span style={plusStyle}>+1</span>
          )}
        </div>
        <p style={{ fontFamily: sans, fontSize: "3cqw", color: colors.dim, marginTop: "2cqw" }}>today</p>

        <p style={{ ...tinyLabel, fontSize: "2.8cqw", margin: "5cqw 0 2.4cqw" }}>Last 7 days</p>
        <div style={{ display: "flex", gap: "2cqw" }}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <span key={i} style={{ width: "4cqw", height: "4cqw", borderRadius: "50%", background: "rgba(184,90,63,0.18)" }} />
          ))}
          <span
            style={{
              width: "4cqw",
              height: "4cqw",
              borderRadius: "50%",
              border: `0.7cqw solid ${colors.borderSubtle}`,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {animated ? (
              <motion.span style={{ ...fillStyle, scale: dayFill }} />
            ) : (
              <span style={{ ...fillStyle, transform: staticLogged ? "scale(1)" : "scale(0)" }} />
            )}
          </span>
        </div>
      </div>

      <div style={{ flex: 1 }} />
      <TabBar active="today" />
    </div>
  );
}

function CoachScreen({ arc }: { arc?: MotionValue<number> }) {
  const d = "M10 24 H38 V40 H66 V54 H94 V66 H122 V78 H150";
  return (
    <div style={screenBase}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: sans,
          fontSize: "3.2cqw",
          color: colors.ink,
          fontWeight: 500,
          marginBottom: "5cqw",
        }}
      >
        <span>9:41</span>
        <span />
      </div>

      <p style={tinyLabel}>Coach</p>
      <p style={{ fontFamily: serif, fontSize: "6.6cqw", color: colors.ink, margin: "1cqw 0 0.5cqw" }}>
        Week 2 of 5
      </p>
      <p style={{ fontFamily: sans, fontSize: "3.6cqw", color: colors.accent, fontWeight: 500, marginBottom: "5cqw" }}>
        on pace
      </p>

      <div
        style={{
          background: colors.cardCream,
          border: `1px solid ${colors.borderSubtle}`,
          borderRadius: "5cqw",
          padding: "6cqw",
        }}
      >
        <svg viewBox="0 0 160 92" style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}>
          <line x1="10" y1="88" x2="150" y2="88" stroke="rgba(26,26,23,0.10)" strokeWidth="1" />
          {arc !== undefined ? (
            <motion.path
              d={d}
              fill="none"
              stroke={colors.accent}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ pathLength: arc }}
            />
          ) : (
            <path d={d} fill="none" stroke={colors.accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          )}
        </svg>
        <p style={{ fontFamily: sans, fontSize: "3cqw", color: colors.dim, marginTop: "3cqw" }}>easing down, gently</p>
      </div>

      <div style={{ flex: 1 }} />
      <TabBar active="coach" />
    </div>
  );
}

function PhoneFrame({ children, width }: { children: ReactNode; width: string }) {
  return (
    <div
      style={{
        position: "relative",
        width,
        aspectRatio: "9 / 19",
        background: colors.ink,
        borderRadius: "13% / 6.2%",
        padding: "3%",
        boxShadow: "0 30px 60px -24px rgba(26,26,23,0.45)",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          background: colors.canvas,
          borderRadius: "10% / 4.8%",
          overflow: "hidden",
          containerType: "inline-size",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "2.4%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "30%",
            height: "2.4%",
            background: colors.ink,
            borderRadius: "999px",
            zIndex: 5,
          }}
        />
        {children}
      </div>
    </div>
  );
}

/* Faint terracotta dot + ripple — demoted brand texture behind the phone. */
function RippleAccent() {
  const ring = (size: string, op: number): React.CSSProperties => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    width: size,
    height: size,
    transform: "translate(-50%, -50%)",
    borderRadius: "50%",
    border: `1px solid rgba(184,90,63,${op})`,
  });
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "min(78vw, 340px)",
        aspectRatio: "1",
        transform: "translate(-50%, -50%)",
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.7,
      }}
    >
      <span style={ring("38%", 0.18)} />
      <span style={ring("64%", 0.12)} />
      <span style={ring("92%", 0.08)} />
      <span
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "9px",
          height: "9px",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: colors.accent,
          opacity: 0.55,
        }}
      />
    </div>
  );
}

export default function ScrollHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Scroll-scrub progress across the 250vh container while the inner pins.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Phase 1 (~30–46%): one-tap log — button depresses, count rolls 3 → 4.
  const rollY = useTransform(scrollYProgress, [0.3, 0.46], ["0%", "-50%"]);
  const btnScale = useTransform(scrollYProgress, [0.3, 0.37, 0.44], [1, 0.94, 1]);
  const dayFill = useTransform(scrollYProgress, [0.34, 0.46], [0, 1]);
  // Phase 2 (~62–80%): crossfade Today → Coach; arc draws in (~70–98%).
  const todayOpacity = useTransform(scrollYProgress, [0.62, 0.8], [1, 0]);
  const coachOpacity = useTransform(scrollYProgress, [0.62, 0.8], [0, 1]);
  const coachArc = useTransform(scrollYProgress, [0.7, 0.98], [0, 1]);

  const fade = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 18 },
    animate: reduce ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: reduce ? 0 : delay, ease: EASE },
  });

  const heroText = (
    <div className="hero-text" style={{ pointerEvents: "none" }}>
      <motion.p
        {...fade(0.6)}
        style={{
          fontFamily: sans,
          fontSize: "0.65rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: colors.accent,
          fontWeight: 500,
          marginBottom: 24,
        }}
      >
        On your phone only · No cloud · No account
      </motion.p>

      <motion.h1
        {...fade(0.75)}
        style={{
          fontFamily: serif,
          fontWeight: 400,
          color: colors.ink,
          fontSize: "clamp(2.4rem, 6vw, 5.5rem)",
          lineHeight: 1.04,
          letterSpacing: "-0.01em",
          margin: 0,
        }}
      >
        make it count
        <AccentPeriod />
      </motion.h1>

      <motion.p
        {...fade(0.9)}
        style={{
          fontFamily: sans,
          fontWeight: 300,
          color: colors.body,
          fontSize: "clamp(1rem, 2vw, 1.15rem)",
          lineHeight: 1.6,
          maxWidth: 460,
          margin: "24px auto 0",
        }}
      >
        {"An honest tracker for the habits you don't talk about. One tap from your wrist."}
      </motion.p>

      <motion.a
        {...fade(1.05)}
        href="#the-math"
        style={{
          display: "inline-block",
          marginTop: 40,
          background: colors.accent,
          color: colors.canvas,
          fontFamily: sans,
          fontWeight: 500,
          fontSize: "0.7rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          padding: "0.9rem 2.6rem",
          pointerEvents: "auto",
        }}
      >
        See how it counts
      </motion.a>
    </div>
  );

  // Reduced motion: show the three screens stacked statically, no scrub.
  if (reduce) {
    const caption = (t: string) => (
      <p
        style={{
          fontFamily: sans,
          fontSize: "0.62rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: colors.dim,
          fontWeight: 600,
          marginTop: 12,
          textAlign: "center",
        }}
      >
        {t}
      </p>
    );
    return (
      <section style={{ background: colors.canvas, padding: "clamp(64px,10vh,120px) clamp(24px,6vw,72px)" }}>
        <div className="hero-grid">
          {heroText}
          <div
            className="hero-phone-wrap"
            style={{ display: "flex", flexWrap: "wrap", gap: 28, justifyContent: "center", pointerEvents: "none" }}
          >
            <div>
              <PhoneFrame width="clamp(150px, 40vw, 200px)">
                <TodayScreen staticCount="3" />
              </PhoneFrame>
              {caption("Today")}
            </div>
            <div>
              <PhoneFrame width="clamp(150px, 40vw, 200px)">
                <TodayScreen staticCount="4" staticLogged />
              </PhoneFrame>
              {caption("One tap")}
            </div>
            <div>
              <PhoneFrame width="clamp(150px, 40vw, 200px)">
                <CoachScreen />
              </PhoneFrame>
              {caption("Your plan")}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div ref={containerRef} style={{ height: "250vh", position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100svh",
          minHeight: "560px",
          overflow: "hidden",
          background: colors.canvas,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(24px,5vh,56px) clamp(20px,5vw,64px)",
        }}
      >
        <div className="hero-grid">
          {heroText}
          <div
            className="hero-phone-wrap"
            style={{ position: "relative", display: "flex", justifyContent: "center", pointerEvents: "none" }}
          >
            <RippleAccent />
            <motion.div {...fade(0.7)} style={{ position: "relative", zIndex: 1 }}>
              <PhoneFrame width="clamp(168px, 44vw, 270px)">
                <motion.div style={{ position: "absolute", inset: 0, opacity: todayOpacity }}>
                  <TodayScreen rollY={rollY} btnScale={btnScale} dayFill={dayFill} />
                </motion.div>
                <motion.div style={{ position: "absolute", inset: 0, opacity: coachOpacity }}>
                  <CoachScreen arc={coachArc} />
                </motion.div>
              </PhoneFrame>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
