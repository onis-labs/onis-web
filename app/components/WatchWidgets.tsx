"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import { PhoneFrame, TodayScreen, WatchFrame, WatchTile, HomeWidget } from "./AppUI";
import { colors, sans, display, type, weight, layout, ease, labelStyle } from "../lib/tokens";

// ── WATCH & WIDGETS — iPhone, Apple Watch, and a Home Screen widget shown
// as one connected system. Clustered side by side on wide screens; stacked
// watch, then phone, then widget on narrow ones — driven by a real
// matchMedia check (not CSS auto-fit) so the three very different device
// sizes never awkwardly wrap 2-then-1. 1024px is chosen deliberately: at
// that boundary the clustered row (watch 220 + phone 300 + widget 148 +
// gaps, all maxed at their token widths well before this width) totals
// ~750px, safely inside the section's ~900px content width, so the row
// never overflows horizontally at or above the breakpoint.

const DESKTOP_QUERY = "(min-width: 1024px)";

// Local copy of the small media-query hook already used in SiteHeader.tsx.
// Duplicated rather than imported/exported since this file must stand
// alone. Defaults to `false` (stacked layout) so server render and first
// client paint always agree.
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);

  return matches;
}

// A small "synced" indicator on the phone: a static dot, plus — motion
// allowed — a soft ring that expands and fades. Decorative only, so the
// caller marks its wrapper aria-hidden.
function SyncPulse({ reduce }: { reduce: boolean | null }) {
  return (
    <span style={{ position: "relative", width: 14, height: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {!reduce && (
        <motion.span
          style={{ position: "absolute", width: 8, height: 8, borderRadius: "50%", background: colors.accent }}
          animate={{ scale: [1, 2.6, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity, ease }}
        />
      )}
      <span style={{ position: "relative", width: 6, height: 6, borderRadius: "50%", background: colors.accent }} />
    </span>
  );
}

// Same quiet dot-marker already used in TrustStrip.tsx's fact list.
function PointDot() {
  return (
    <svg width="6" height="6" viewBox="0 0 6 6" aria-hidden style={{ flexShrink: 0 }}>
      <circle cx="3" cy="3" r="3" fill={colors.accent} />
    </svg>
  );
}

// Matches the confirmed-shipped feature set only.
const points = [
  "One-tap logging from the wrist",
  "Digital Crown to switch trackers",
  "Watch complications for a glance",
  "Home & Lock Screen widgets",
  "Everything stays in sync",
];

const headlineStyle: CSSProperties = {
  fontFamily: display,
  fontSize: type.section,
  fontWeight: weight.section,
  letterSpacing: "-0.02em",
  lineHeight: 1.1,
  color: colors.ink,
  margin: "16px 0 0",
};

const subStyle: CSSProperties = {
  fontFamily: sans,
  fontWeight: weight.body,
  fontSize: type.body,
  color: colors.body,
  lineHeight: 1.6,
  maxWidth: 620,
  marginTop: 20,
};

const pointCardStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  background: colors.canvas,
  border: `1px solid ${colors.borderSubtle}`,
  borderRadius: 12,
  padding: "16px 20px",
};

const pointTextStyle: CSSProperties = {
  fontFamily: sans,
  fontSize: "0.92rem",
  fontWeight: weight.label,
  color: colors.ink,
};

export default function WatchWidgets() {
  const reduce = useReducedMotion();
  const isDesktop = useMediaQuery(DESKTOP_QUERY);

  const clusterStyle: CSSProperties = {
    display: "flex",
    flexDirection: isDesktop ? "row" : "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "clamp(28px, 4vw, 48px)",
    marginTop: "clamp(56px, 8vh, 96px)",
  };

  return (
    <section id="watch-widgets" style={{ background: colors.cardCream, padding: `${layout.padY} ${layout.padX}` }}>
      <div style={{ maxWidth: layout.wideMax, margin: "0 auto" }}>
        <Reveal>
          <p style={labelStyle}>WATCH & WIDGETS</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 style={headlineStyle}>Log where the habit happens.</h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p style={subStyle}>One tap from Apple Watch. Your iPhone and widgets stay in sync.</p>
        </Reveal>

        <Reveal delay={0.2} style={clusterStyle}>
          <WatchFrame>
            <WatchTile />
          </WatchFrame>

          <div role="img" aria-label="The ONIS Today screen on iPhone" style={{ position: "relative" }}>
            <PhoneFrame>
              <TodayScreen mainCount={1} />
            </PhoneFrame>
            <span aria-hidden style={{ position: "absolute", top: -6, right: -6 }}>
              <SyncPulse reduce={reduce} />
            </span>
          </div>

          <div role="img" aria-label="An ONIS Home Screen widget, showing today's count">
            <HomeWidget size="small" />
          </div>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))",
            gap: 16,
            marginTop: "clamp(48px, 7vh, 80px)",
          }}
        >
          {points.map((point, i) => (
            <Reveal key={point} delay={0.06 * (i + 1)} style={pointCardStyle}>
              <PointDot />
              <span style={pointTextStyle}>{point}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
