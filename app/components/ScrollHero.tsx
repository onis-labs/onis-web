import { type ReactNode } from "react";
import { colors, serif, sans } from "../lib/tokens";
import AccentPeriod from "./AccentPeriod";

/* ============================================================
   Composed, static hero. The entrance is driven by pure CSS
   (see .hero-reveal in globals.css) so the phone and CTA are
   guaranteed to end visible — no JS, no scroll-scrub.
   ============================================================ */

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

function TabBar() {
  const item = (label: string, on: boolean) => (
    <span
      style={{
        fontFamily: sans,
        fontSize: "3.2cqw",
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
      {item("Today", true)}
      {item("Stats", false)}
      {item("Coach", false)}
      {item("Profile", false)}
    </div>
  );
}

function TodayScreen() {
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

  // Last-7-days dots: five logged, then today open.
  const dots = [true, true, true, true, true, false, false];

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

      <p style={tinyLabel}>Tue · Jun 17</p>
      <p style={{ fontFamily: serif, fontSize: "6.4cqw", color: colors.ink, margin: "1cqw 0 5cqw" }}>
        Good evening
      </p>

      {/* primary tracker card — Cigarettes */}
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
          <span
            style={{
              fontFamily: serif,
              fontSize: "20cqw",
              lineHeight: 1,
              color: colors.ink,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            3
          </span>
          <span style={plusStyle}>+1</span>
        </div>
        <p style={{ fontFamily: sans, fontSize: "3cqw", color: colors.dim, marginTop: "1.5cqw" }}>today</p>

        <p style={{ ...tinyLabel, fontSize: "2.8cqw", margin: "5cqw 0 2.4cqw" }}>Last 7 days</p>
        <div style={{ display: "flex", gap: "2cqw" }}>
          {dots.map((on, i) => (
            <span
              key={i}
              style={{
                width: "4cqw",
                height: "4cqw",
                borderRadius: "50%",
                background: on ? colors.accent : "transparent",
                border: on ? "none" : `0.7cqw solid ${colors.borderSubtle}`,
                opacity: on ? (i === 4 ? 1 : 0.55) : 1,
              }}
            />
          ))}
        </div>
      </div>

      {/* secondary tracker — quiet, makes it a real Today list */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "4cqw",
          padding: "0 1cqw",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "2.4cqw" }}>
          <span style={{ width: "2.6cqw", height: "2.6cqw", borderRadius: "50%", background: colors.dim }} />
          <span style={{ ...tinyLabel, color: colors.body }}>Nicotine pouches</span>
        </div>
        <span style={{ fontFamily: serif, fontSize: "5cqw", color: colors.dim }}>0</span>
      </div>

      <div style={{ flex: 1 }} />
      <TabBar />
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
        boxShadow:
          "0 2px 2px rgba(26,26,23,0.06), 0 40px 80px -32px rgba(26,26,23,0.45)",
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

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-glow" aria-hidden />
      <div className="hero-texture" aria-hidden />

      <div className="hero-grid">
        {/* Phone — above text on mobile, right column on desktop */}
        <div className="hero-phone-wrap">
          <div className="hero-reveal d-phone">
            <PhoneFrame width="clamp(208px, 58vw, 300px)">
              <TodayScreen />
            </PhoneFrame>
          </div>
        </div>

        {/* Headline block */}
        <div className="hero-text">
          <p
            className="hero-reveal d1"
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
          </p>

          <h1
            className="hero-reveal d2"
            style={{
              fontFamily: serif,
              fontWeight: 400,
              color: colors.ink,
              fontSize: "clamp(2.6rem, 6.4vw, 5.5rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.015em",
              margin: 0,
            }}
          >
            make it count
            <AccentPeriod />
          </h1>

          <p
            className="hero-reveal d3"
            style={{
              fontFamily: sans,
              fontWeight: 300,
              color: colors.body,
              fontSize: "clamp(1.05rem, 2vw, 1.2rem)",
              lineHeight: 1.65,
              maxWidth: 460,
              margin: "28px auto 0",
            }}
          >
            {"An honest tracker for the habits you don't talk about. One tap from your wrist."}
          </p>

          <a href="#the-math" className="btn-primary hero-reveal d4" style={{ marginTop: 40 }}>
            See how it counts
          </a>
        </div>
      </div>
    </section>
  );
}
