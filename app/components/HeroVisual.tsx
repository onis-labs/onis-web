"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { colors, serif, sans } from "../lib/tokens";

/* A faithful mockup of the real ONIS "Today" screen — energy drinks + alcohol,
   "X below" target framing, per-habit colors. The energy-drinks +1 logs as the
   page scrolls (static until you scroll), so the product, not an effect, leads. */

const APP = {
  energy: "#B98A34", // gold/ochre — energy drinks
  energySoft: "rgba(185,138,52,0.14)",
  alcohol: "#7A4A38", // brown — alcohol
  alcoholSoft: "rgba(122,74,56,0.14)",
  olive: "#7E7F4E", // "on target" dot
  card: "#FFFFFF",
  cardBorder: "rgba(26,26,23,0.07)",
  cardShadow: "0 5cqw 13cqw -8cqw rgba(26,26,23,0.18)",
} as const;

const ss = (x: number, a: number, b: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

const label = {
  fontFamily: sans,
  fontSize: "3cqw",
  letterSpacing: "0.04em",
  color: colors.dim,
  fontWeight: 500,
} as const;

function Bolt({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 24 24" width="4.4cqw" height="4.4cqw" fill={c} aria-hidden>
      <path d="M13 2 L4 14 H10.5 L9 22 L20 9 H13.5 Z" />
    </svg>
  );
}
function Wine({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 24 24" width="4.4cqw" height="4.4cqw" fill="none" stroke={c} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M7.5 3 H16.5 C16.5 9 14 11 12 11 C10 11 7.5 9 7.5 3 Z" fill={c} stroke="none" />
      <line x1="12" y1="11" x2="12" y2="19" />
      <line x1="8.5" y1="19.5" x2="15.5" y2="19.5" />
    </svg>
  );
}

function IconCircle({ bg, children }: { bg: string; children: ReactNode }) {
  return (
    <span
      style={{
        width: "8cqw",
        height: "8cqw",
        borderRadius: "50%",
        background: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: "none",
      }}
    >
      {children}
    </span>
  );
}

function PlusButton({ c, scale = 1 }: { c: string; scale?: number }) {
  return (
    <span
      style={{
        width: "17cqw",
        height: "17cqw",
        borderRadius: "50%",
        background: c,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: sans,
        fontWeight: 600,
        fontSize: "5cqw",
        flex: "none",
        transform: `scale(${scale})`,
        boxShadow: `0 3cqw 7cqw -3cqw ${c}`,
      }}
    >
      +1
    </span>
  );
}

function Dots({ accent, todayFill }: { accent: string; todayFill: number }) {
  return (
    <div style={{ display: "flex", gap: "2cqw", marginTop: "2.4cqw" }}>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          style={{
            width: "3cqw",
            height: "3cqw",
            borderRadius: "50%",
            border: `0.6cqw solid rgba(26,26,23,0.12)`,
          }}
        />
      ))}
      <span style={{ width: "3cqw", height: "3cqw", borderRadius: "50%", position: "relative", border: `0.6cqw solid rgba(26,26,23,0.12)` }}>
        <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: accent, transform: `scale(${todayFill})` }} />
      </span>
    </div>
  );
}

function Card({
  icon,
  iconBg,
  title,
  period,
  count,
  target,
  below,
  accent,
  barFrac,
  btnScale,
  todayFill,
}: {
  icon: ReactNode;
  iconBg: string;
  title: string;
  period: string;
  count: ReactNode;
  target: number;
  below: number;
  accent: string;
  barFrac: number;
  btnScale: number;
  todayFill: number;
}) {
  return (
    <div
      style={{
        background: APP.card,
        border: `1px solid ${APP.cardBorder}`,
        borderRadius: "6cqw",
        boxShadow: APP.cardShadow,
        padding: "5.5cqw 5.5cqw 5cqw",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "3cqw" }}>
          <IconCircle bg={iconBg}>{icon}</IconCircle>
          <span style={{ fontFamily: sans, fontSize: "3.7cqw", color: colors.ink, fontWeight: 500 }}>{title}</span>
        </div>
        <span style={label}>{period}</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "3cqw" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <span style={{ fontFamily: serif, fontSize: "15cqw", lineHeight: 1, color: colors.ink, fontVariantNumeric: "tabular-nums" }}>{count}</span>
            <span style={{ fontFamily: sans, fontSize: "4cqw", color: colors.dim, marginLeft: "2cqw" }}>/ {target}</span>
          </div>
          <p style={{ ...label, marginTop: "3cqw" }}>{below} below</p>
          <div style={{ height: "1cqw", borderRadius: "1cqw", background: "rgba(26,26,23,0.08)", marginTop: "2.6cqw", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${barFrac * 100}%`, background: accent, borderRadius: "1cqw" }} />
          </div>
        </div>
        <div style={{ paddingLeft: "5cqw" }}>
          <PlusButton c={accent} scale={btnScale} />
        </div>
      </div>

      <p style={{ ...label, fontSize: "2.7cqw", marginTop: "4.5cqw" }}>Last 7 days</p>
      <Dots accent={accent} todayFill={todayFill} />
    </div>
  );
}

function HomeScreen({ p }: { p: number }) {
  const roll = ss(p, 0.18, 0.52); // digit 0 -> 1, completes early while phone is in view
  const logged = roll >= 0.5;
  const press = Math.max(0, 1 - Math.abs(p - 0.34) / 0.12);
  const btnScale = 1 - 0.12 * press;
  const todayFill = ss(p, 0.3, 0.56);

  const countRoll = (
    <span style={{ display: "inline-block", height: "1em", overflow: "hidden", lineHeight: 1, verticalAlign: "bottom" }}>
      <span style={{ display: "block", transform: `translateY(${-roll}em)` }}>
        <span style={{ display: "block", height: "1em", lineHeight: 1 }}>0</span>
        <span style={{ display: "block", height: "1em", lineHeight: 1 }}>1</span>
      </span>
    </span>
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: colors.canvas,
        padding: "8cqw 5.5cqw 0",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* status bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: sans, fontSize: "3.2cqw", color: colors.ink, fontWeight: 600, marginBottom: "4cqw" }}>
        <span>9:41</span>
        <span style={{ display: "flex", gap: "1.4cqw", alignItems: "center" }}>
          <span style={{ width: "4cqw", height: "2.4cqw", borderRadius: "0.6cqw", background: colors.ink }} />
          <span style={{ width: "6cqw", height: "3cqw", borderRadius: "1cqw", border: `0.5cqw solid ${colors.ink}` }} />
        </span>
      </div>

      {/* header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p style={{ fontFamily: serif, fontStyle: "italic", fontSize: "3.4cqw", color: colors.dim }}>Good morning</p>
          <p style={{ fontFamily: serif, fontSize: "8.2cqw", color: colors.ink, lineHeight: 1.05, margin: "0.5cqw 0" }}>Wednesday</p>
          <p style={{ ...label, fontSize: "2.9cqw" }}>
            17 Jun{"   "}
            <span style={{ color: APP.olive }}>•</span> <span style={{ letterSpacing: "0.12em" }}>ALL ON TARGET</span>
          </p>
        </div>
        <span style={{ width: "8.5cqw", height: "8.5cqw", borderRadius: "50%", border: `1px solid ${APP.cardBorder}`, display: "flex", alignItems: "center", justifyContent: "center", color: colors.ink, fontSize: "5cqw", fontFamily: sans, fontWeight: 300 }}>+</span>
      </div>

      {/* cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "4cqw", marginTop: "5cqw" }}>
        <Card
          icon={<Bolt c={APP.energy} />}
          iconBg={APP.energySoft}
          title="Energy drinks"
          period="Today"
          count={countRoll}
          target={2}
          below={logged ? 1 : 2}
          accent={APP.energy}
          barFrac={roll * 0.5}
          btnScale={btnScale}
          todayFill={todayFill}
        />
        <Card
          icon={<Wine c={APP.alcohol} />}
          iconBg={APP.alcoholSoft}
          title="Alcohol"
          period="This week"
          count={0}
          target={7}
          below={7}
          accent={APP.alcohol}
          barFrac={0}
          btnScale={1}
          todayFill={0}
        />
      </div>

      <div style={{ flex: 1 }} />

      {/* tab bar */}
      <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", padding: "3.5cqw 0 5cqw", borderTop: `1px solid ${APP.cardBorder}` }}>
        {["Today", "Stats", "Coach", "Profile"].map((t, i) => (
          <span key={t} style={{ fontFamily: sans, fontSize: "2.8cqw", color: i === 0 ? colors.accent : colors.dim, fontWeight: i === 0 ? 600 : 400 }}>
            {t}
          </span>
        ))}
      </div>
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
        boxShadow: "0 2px 2px rgba(26,26,23,0.06), 0 44px 84px -34px rgba(26,26,23,0.46)",
      }}
    >
      <div style={{ position: "relative", width: "100%", height: "100%", background: colors.canvas, borderRadius: "10% / 4.8%", overflow: "hidden", containerType: "inline-size" }}>
        <span style={{ position: "absolute", top: "2.2%", left: "50%", transform: "translateX(-50%)", width: "28%", height: "2.2%", background: colors.ink, borderRadius: "999px", zIndex: 5 }} />
        {children}
      </div>
    </div>
  );
}

export default function HeroVisual() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const D = 300; // fixed scroll distance for the log, independent of screen height
    let raf = 0;
    let start = 0;
    const measure = () => {
      const top = el.getBoundingClientRect().top + window.scrollY;
      // Begin logging only once the phone is in view (it's below the copy on mobile).
      start = Math.max(0, top - window.innerHeight * 0.5);
    };
    const apply = () => {
      raf = 0;
      setP(Math.min(1, Math.max(0, (window.scrollY - start) / D)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onResize = () => {
      measure();
      onScroll();
    };
    measure();
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduce]);

  return (
    <div className="hero-phone" ref={ref}>
      <PhoneFrame width="clamp(228px, 66vw, 320px)">
        <HomeScreen p={reduce ? 0 : p} />
      </PhoneFrame>
    </div>
  );
}
