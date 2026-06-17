"use client";

import { colors, serif, sans } from "../lib/tokens";

/* Hero composite: the generated photo of a hand holding a phone, with the REAL
   ONIS app screen layered crisply on top of the phone's screen area (CSS), so
   the UI is always sharp and accurate. Driven by `progress` (0–1) from the
   sticky scroll container: a +1 tap logs the count, then it crossfades to Coach. */

// Screen rectangle inside /images/hero-hand.png, measured as % of the image.
const SCREEN = { left: "33.5%", top: "16.5%", width: "40.3%", height: "51.2%" };

const ss = (x: number, a: number, b: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

const eyebrow = {
  fontFamily: sans,
  fontSize: "4.6cqw",
  letterSpacing: "0.2em",
  textTransform: "uppercase" as const,
  color: colors.dim,
  fontWeight: 600,
};

/* Onboarding-style "Today" screen — reads clearly at small size. */
function TodayScreen({ tapP, btnScale }: { tapP: number; btnScale: number }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: colors.canvas,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "8cqw",
        padding: "10cqw",
      }}
    >
      <p style={{ ...eyebrow, textAlign: "center" }}>Energy drinks · Today</p>

      <span
        style={{
          fontFamily: serif,
          fontSize: "46cqw",
          lineHeight: 1,
          color: colors.ink,
          height: "1em",
          overflow: "hidden",
          display: "inline-block",
        }}
      >
        <span style={{ display: "block", transform: `translateY(${-tapP}em)` }}>
          <span style={{ display: "block", height: "1em", lineHeight: 1 }}>0</span>
          <span style={{ display: "block", height: "1em", lineHeight: 1 }}>1</span>
        </span>
      </span>

      <span
        style={{
          width: "30cqw",
          height: "30cqw",
          borderRadius: "50%",
          background: colors.accent,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: sans,
          fontWeight: 600,
          fontSize: "9cqw",
          transform: `scale(${btnScale})`,
          boxShadow: `0 6cqw 14cqw -6cqw ${colors.accent}`,
        }}
      >
        +1
      </span>
    </div>
  );
}

/* Coach screen — calm step-down plan (representative of the app's Coach tab). */
function CoachScreen() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: colors.canvas,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "6cqw",
        padding: "12cqw",
      }}
    >
      <p style={{ ...eyebrow, textAlign: "center" }}>Coach · This week</p>
      <p style={{ fontFamily: serif, fontSize: "13cqw", color: colors.ink, lineHeight: 1 }}>
        On pace
        <span style={{ color: colors.accent }}>.</span>
      </p>
      <svg viewBox="0 0 120 60" style={{ width: "62cqw", height: "auto", display: "block", overflow: "visible" }}>
        <line x1="6" y1="54" x2="114" y2="54" stroke="rgba(26,26,23,0.12)" strokeWidth="1" />
        <path d="M8 14 H34 V24 H60 V34 H86 V44 H112" fill="none" stroke={colors.accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="112" cy="44" r="3.4" fill={colors.accent} />
      </svg>
      <p style={{ fontFamily: sans, fontWeight: 300, fontSize: "4.4cqw", color: colors.dim }}>easing down, gently</p>
    </div>
  );
}

export default function HeroComposite({ progress, reduce }: { progress: number; reduce: boolean }) {
  const tapP = reduce ? 0 : ss(progress, 0.3, 0.5);
  const press = reduce ? 0 : Math.max(0, 1 - Math.abs(progress - 0.36) / 0.08);
  const btnScale = 1 - 0.06 * press;
  const coachOpacity = reduce ? 0 : ss(progress, 0.66, 0.82);
  const todayOpacity = 1 - coachOpacity;

  return (
    <div className="hero-composite">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="hero-hand-img" src="/images/hero-hand.png" alt="A hand holding a phone running ONIS" />
      <div className="hero-screen" style={{ left: SCREEN.left, top: SCREEN.top, width: SCREEN.width, height: SCREEN.height }}>
        <div style={{ position: "absolute", inset: 0, opacity: todayOpacity }}>
          <TodayScreen tapP={tapP} btnScale={btnScale} />
        </div>
        <div style={{ position: "absolute", inset: 0, opacity: coachOpacity }}>
          <CoachScreen />
        </div>
      </div>
    </div>
  );
}
