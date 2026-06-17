"use client";

import { type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { colors, serif, sans } from "../lib/tokens";

/* Flip to false if the Higgsfield hero video is unusable — the phone-mockup
   fallback (with a CSS tap pulse) renders instead. */
const HAS_HERO_VIDEO = true;
const HERO_VIDEO = "/hero.mp4";
const HERO_POSTER = "/frames/hero-poster.jpg";

/* ── Phone-mockup fallback ─────────────────────────────────────────── */

const screenBase = {
  position: "absolute" as const,
  inset: 0,
  background: colors.canvas,
  padding: "9cqw 6cqw 0",
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

function TodayScreen({ tap }: { tap: boolean }) {
  const dots = [true, true, true, true, true, false, false];
  return (
    <div style={screenBase}>
      <p style={tinyLabel}>Tue · Jun 17</p>
      <p style={{ fontFamily: serif, fontSize: "6.4cqw", color: colors.ink, margin: "1cqw 0 5cqw" }}>Good evening</p>
      <div
        style={{
          background: colors.cardCream,
          border: `1px solid ${colors.borderSubtle}`,
          borderRadius: "5cqw",
          padding: "6cqw",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "2.4cqw", marginBottom: "2cqw" }}>
          <span style={{ width: "2.6cqw", height: "2.6cqw", borderRadius: "50%", background: colors.accent }} />
          <span style={tinyLabel}>Cigarettes</span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <span style={{ fontFamily: serif, fontSize: "20cqw", lineHeight: 1, color: colors.ink }}>3</span>
          <span className={tap ? "tap-pulse" : undefined}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: "16cqw", height: "16cqw", borderRadius: "50%",
              background: colors.accent, color: colors.canvas,
              fontFamily: sans, fontWeight: 600, fontSize: "5cqw", flex: "none",
            }}
          >
            +1
          </span>
        </div>
        <p style={{ fontFamily: sans, fontSize: "3cqw", color: colors.dim, marginTop: "1.5cqw" }}>today</p>
        <p style={{ ...tinyLabel, fontSize: "2.8cqw", margin: "5cqw 0 2.4cqw" }}>Last 7 days</p>
        <div style={{ display: "flex", gap: "2cqw" }}>
          {dots.map((on, i) => (
            <span key={i} style={{
              width: "4cqw", height: "4cqw", borderRadius: "50%",
              background: on ? colors.accent : "transparent",
              border: on ? "none" : `0.7cqw solid ${colors.borderSubtle}`,
              opacity: on ? (i === 4 ? 1 : 0.55) : 1,
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        position: "relative", width: "clamp(208px, 60vw, 280px)", aspectRatio: "9 / 19",
        background: colors.ink, borderRadius: "13% / 6.2%", padding: "3%",
        boxShadow: "0 2px 2px rgba(26,26,23,0.06), 0 40px 80px -32px rgba(26,26,23,0.45)",
      }}
    >
      <div style={{
        position: "relative", width: "100%", height: "100%", background: colors.canvas,
        borderRadius: "10% / 4.8%", overflow: "hidden", containerType: "inline-size",
      }}>
        {children}
      </div>
    </div>
  );
}

/* ── Hero visual ───────────────────────────────────────────────────── */

export default function HeroVisual() {
  const reduce = useReducedMotion();

  if (HAS_HERO_VIDEO) {
    return (
      <div className="hero-film">
        {reduce ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img className="hero-film-media" src={HERO_POSTER} alt="One tap to log, from your wrist" />
        ) : (
          <video
            className="hero-film-media"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={HERO_POSTER}
            aria-label="One tap to log, from your wrist"
          >
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
        )}
      </div>
    );
  }

  // Fallback: phone mockup, with a calm tap pulse unless reduced motion.
  return (
    <div className="hero-mock">
      <PhoneFrame>
        <TodayScreen tap={!reduce} />
      </PhoneFrame>
    </div>
  );
}
