"use client";

import { type ReactNode } from "react";
import { colors, serif, sans } from "../lib/tokens";

/* Hero composite: the generated photo of a hand holding a phone, with the REAL,
   full ONIS app screen composited crisply on top of the phone's screen area.
   Driven by `progress` (0–1) from the sticky scroll container:
   a +1 tap logs the energy-drinks count, then it crossfades to the Coach plan. */

// Screen rectangle inside /images/hero-hand.png (measured as % of the image).
const SCREEN = { left: "27.4%", top: "13.9%", width: "46.8%", height: "53.5%" };

// Real per-habit colors from the app.
const APP = {
  energy: "#B98A34",
  energySoft: "rgba(185,138,52,0.14)",
  alcohol: "#7A4A38",
  alcoholSoft: "rgba(122,74,56,0.14)",
  olive: "#7E7F4E",
  card: "#FFFFFF",
  cardBorder: "rgba(26,26,23,0.07)",
  cardShadow: "0 4cqw 11cqw -7cqw rgba(26,26,23,0.20)",
} as const;

const ss = (x: number, a: number, b: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

const tiny = {
  fontFamily: sans,
  fontSize: "3cqw",
  letterSpacing: "0.16em",
  textTransform: "uppercase" as const,
  color: colors.dim,
  fontWeight: 600,
};

function StatusBar() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: sans, fontSize: "3.1cqw", color: colors.ink, fontWeight: 600, marginBottom: "3.5cqw" }}>
      <span>9:41</span>
      <span style={{ display: "flex", gap: "1.3cqw", alignItems: "center" }}>
        <span style={{ width: "3.8cqw", height: "2.2cqw", borderRadius: "0.6cqw", background: colors.ink }} />
        <span style={{ width: "5.6cqw", height: "2.8cqw", borderRadius: "1cqw", border: `0.5cqw solid ${colors.ink}` }} />
      </span>
    </div>
  );
}

function TabBar({ active }: { active: "today" | "coach" }) {
  const item = (t: string, on: boolean) => (
    <span key={t} style={{ fontFamily: sans, fontSize: "2.7cqw", color: on ? colors.accent : colors.dim, fontWeight: on ? 600 : 400 }}>
      {t}
    </span>
  );
  return (
    <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", padding: "3.4cqw 0 4.6cqw", borderTop: `1px solid ${APP.cardBorder}` }}>
      {item("Today", active === "today")}
      {item("Stats", false)}
      {item("Coach", active === "coach")}
      {item("Profile", false)}
    </div>
  );
}

function Dots({ accent, fill }: { accent: string; fill: number }) {
  return (
    <div style={{ display: "flex", gap: "1.8cqw", marginTop: "2.2cqw" }}>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <span key={i} style={{ width: "2.8cqw", height: "2.8cqw", borderRadius: "50%", border: `0.6cqw solid rgba(26,26,23,0.12)` }} />
      ))}
      <span style={{ width: "2.8cqw", height: "2.8cqw", borderRadius: "50%", position: "relative", border: `0.6cqw solid rgba(26,26,23,0.12)` }}>
        <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: accent, transform: `scale(${fill})` }} />
      </span>
    </div>
  );
}

function Card({ icon, iconBg, title, period, count, target, below, accent, barFrac, btnScale, dotFill, touch }: {
  icon: ReactNode; iconBg: string; title: string; period: string; count: ReactNode; target: number;
  below: ReactNode; accent: string; barFrac: number; btnScale: number; dotFill: number;
  touch?: { thumbOn: number; ripple: number; press: number };
}) {
  return (
    <div style={{ background: APP.card, border: `1px solid ${APP.cardBorder}`, borderRadius: "5.5cqw", boxShadow: APP.cardShadow, padding: "5cqw 5cqw 4.6cqw" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "2.6cqw" }}>
          <span style={{ width: "7.4cqw", height: "7.4cqw", borderRadius: "50%", background: iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</span>
          <span style={{ fontFamily: sans, fontSize: "3.5cqw", color: colors.ink, fontWeight: 500 }}>{title}</span>
        </div>
        <span style={tiny}>{period}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "2.4cqw" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <span style={{ fontFamily: serif, fontSize: "14cqw", lineHeight: 1, color: colors.ink }}>{count}</span>
            <span style={{ fontFamily: sans, fontSize: "3.6cqw", color: colors.dim, marginLeft: "1.8cqw" }}>/ {target}</span>
          </div>
          <p style={{ ...tiny, marginTop: "2.6cqw" }}>{below} below</p>
          <div style={{ height: "1cqw", borderRadius: "1cqw", background: "rgba(26,26,23,0.08)", marginTop: "2.4cqw", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${barFrac * 100}%`, background: accent, borderRadius: "1cqw" }} />
          </div>
        </div>
        <span style={{ position: "relative", flex: "none", marginLeft: "4.4cqw", width: "15cqw", height: "15cqw" }}>
          <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: accent, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: sans, fontWeight: 600, fontSize: "4.6cqw", transform: `scale(${btnScale})`, boxShadow: `0 3cqw 7cqw -3cqw ${accent}` }}>+1</span>
          {touch && (
            <>
              {/* contact ripple — emanates from the button on touch */}
              <span aria-hidden style={{ position: "absolute", left: "50%", top: "50%", width: "15cqw", height: "15cqw", borderRadius: "50%", border: `1cqw solid ${colors.accent}`, transform: `translate(-50%,-50%) scale(${0.45 + touch.ripple * 1.4})`, opacity: touch.ripple > 0 ? (1 - touch.ripple) * 0.5 : 0, pointerEvents: "none", zIndex: 3 }} />
              {/* fingertip pressing the glass */}
              <span aria-hidden style={{ position: "absolute", left: "50%", top: "50%", width: "21cqw", height: "23cqw", borderRadius: "50%", background: "radial-gradient(circle at 40% 34%, rgba(125,96,78,0.16), rgba(70,50,40,0.33) 80%)", border: "0.5cqw solid rgba(255,255,255,0.22)", boxShadow: `0 ${1 + (1 - touch.thumbOn) * 3}cqw ${3 + (1 - touch.thumbOn) * 7}cqw -2cqw rgba(26,26,23,0.4)`, transform: `translate(-50%,-50%) translate(${(1 - touch.thumbOn) * -3}cqw, ${(1 - touch.thumbOn) * 9}cqw) scale(${1 + 0.04 * (1 - touch.thumbOn) - 0.04 * touch.press})`, pointerEvents: "none", zIndex: 4 }} />
            </>
          )}
        </span>
      </div>
      <p style={{ ...tiny, fontSize: "2.6cqw", marginTop: "4cqw" }}>Last 7 days</p>
      <Dots accent={accent} fill={dotFill} />
    </div>
  );
}

function HomeScreen({ countP, btnScale, thumbOn, ripple, press }: { countP: number; btnScale: number; thumbOn: number; ripple: number; press: number }) {
  const logged = countP >= 0.5;
  const countRoll = (
    <span style={{ display: "inline-block", height: "1em", overflow: "hidden", lineHeight: 1, verticalAlign: "bottom" }}>
      <span style={{ display: "block", transform: `translateY(${-countP}em)` }}>
        <span style={{ display: "block", height: "1em", lineHeight: 1 }}>0</span>
        <span style={{ display: "block", height: "1em", lineHeight: 1 }}>1</span>
      </span>
    </span>
  );
  return (
    <div style={{ position: "absolute", inset: 0, background: colors.canvas, padding: "6cqw 5.5cqw 0", display: "flex", flexDirection: "column" }}>
      <StatusBar />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4.5cqw" }}>
        <div>
          <p style={{ fontFamily: serif, fontStyle: "italic", fontSize: "3.3cqw", color: colors.dim }}>Good morning</p>
          <p style={{ fontFamily: serif, fontSize: "7.6cqw", color: colors.ink, lineHeight: 1.05, margin: "0.4cqw 0" }}>Wednesday</p>
          <p style={{ ...tiny, fontSize: "2.7cqw" }}>
            <span style={{ color: APP.olive }}>•</span> All on target
          </p>
        </div>
        <span style={{ width: "8cqw", height: "8cqw", borderRadius: "50%", border: `1px solid ${APP.cardBorder}`, display: "flex", alignItems: "center", justifyContent: "center", color: colors.ink, fontSize: "4.6cqw", fontWeight: 300 }}>+</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "3.6cqw" }}>
        <Card icon={<Bolt c={APP.energy} />} iconBg={APP.energySoft} title="Energy drinks" period="Today" count={countRoll} target={2} below={logged ? 1 : 2} accent={APP.energy} barFrac={countP * 0.5} btnScale={btnScale} dotFill={ss(countP, 0.45, 1)} touch={{ thumbOn, ripple, press }} />
        <Card icon={<Wine c={APP.alcohol} />} iconBg={APP.alcoholSoft} title="Alcohol" period="This week" count={0} target={7} below={7} accent={APP.alcohol} barFrac={0} btnScale={1} dotFill={0} />
      </div>
      <div style={{ flex: 1 }} />
      <TabBar active="today" />
    </div>
  );
}

function CoachScreen() {
  return (
    <div style={{ position: "absolute", inset: 0, background: colors.canvas, padding: "6cqw 5.5cqw 0", display: "flex", flexDirection: "column" }}>
      <StatusBar />
      <p style={tiny}>Coach</p>
      <p style={{ fontFamily: serif, fontSize: "7.6cqw", color: colors.ink, lineHeight: 1.05, margin: "0.6cqw 0 0.4cqw" }}>Week 3 of 8</p>
      <p style={{ fontFamily: sans, fontSize: "3.4cqw", color: colors.accent, fontWeight: 500, marginBottom: "5cqw" }}>on pace</p>
      <div style={{ background: APP.card, border: `1px solid ${APP.cardBorder}`, borderRadius: "5.5cqw", boxShadow: APP.cardShadow, padding: "5.5cqw" }}>
        <p style={{ ...tiny, marginBottom: "3.5cqw" }}>Your plan · energy drinks</p>
        <svg viewBox="0 0 150 84" style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}>
          <line x1="6" y1="78" x2="144" y2="78" stroke="rgba(26,26,23,0.10)" strokeWidth="1" />
          <path d="M8 18 H40 V32 H72 V46 H104 V60 H140" fill="none" stroke={colors.accent} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="140" cy="60" r="4" fill={colors.accent} />
        </svg>
        <p style={{ fontFamily: sans, fontWeight: 300, fontSize: "3cqw", color: colors.dim, marginTop: "3.5cqw" }}>easing down, gently</p>
      </div>
      <div style={{ flex: 1 }} />
      <TabBar active="coach" />
    </div>
  );
}

function Bolt({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 24 24" width="4cqw" height="4cqw" fill={c} aria-hidden>
      <path d="M13 2 L4 14 H10.5 L9 22 L20 9 H13.5 Z" />
    </svg>
  );
}
function Wine({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 24 24" width="4cqw" height="4cqw" fill="none" stroke={c} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M7.5 3 H16.5 C16.5 9 14 11 12 11 C10 11 7.5 9 7.5 3 Z" fill={c} stroke="none" />
      <line x1="12" y1="11" x2="12" y2="19" />
      <line x1="8.5" y1="19.5" x2="15.5" y2="19.5" />
    </svg>
  );
}

export default function HeroComposite({ progress, reduce }: { progress: number; reduce: boolean }) {
  // Sequence (cause before effect): thumb lands → button depresses + ripple → count rolls → thumb lifts.
  const thumbOn = reduce ? 1 : ss(progress, 0.26, 0.36) - ss(progress, 0.54, 0.64);
  const press = reduce ? 0 : ss(progress, 0.36, 0.4) - ss(progress, 0.46, 0.54);
  const ripple = reduce ? 0 : ss(progress, 0.36, 0.54);
  const countP = reduce ? 0 : ss(progress, 0.4, 0.54); // count changes only AFTER contact (~0.36)
  const btnScale = 1 - 0.08 * press;
  const coachOpacity = reduce ? 0 : ss(progress, 0.66, 0.82);
  const todayOpacity = 1 - coachOpacity;

  return (
    <div className="hero-composite">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="hero-hand-img" src="/images/hero-hand.png" alt="A hand holding a phone running ONIS" />
      <div className="hero-screen" style={{ left: SCREEN.left, top: SCREEN.top, width: SCREEN.width, height: SCREEN.height }}>
        <div style={{ position: "absolute", inset: 0, opacity: todayOpacity }}>
          <HomeScreen countP={countP} btnScale={btnScale} thumbOn={thumbOn} ripple={ripple} press={press} />
        </div>
        <div style={{ position: "absolute", inset: 0, opacity: coachOpacity }}>
          <CoachScreen />
        </div>
      </div>
    </div>
  );
}
