"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { colors, sans, display, type, weight, layout, ease, labelStyle } from "../lib/tokens";
import { PhoneFrame, TodayScreen, TrendsScreen, CoachScreen, WatchFrame, WatchTile } from "./AppUI";

/* ONE TAP BECOMES A PATTERN — sticky scrollytelling walkthrough of the core
   loop (log it -> see the number -> find the pattern -> choose one step).

   Desktop (>=900px): a two-column layout. The left column holds four tall
   story steps in normal document flow; the right column is a `position:
   sticky` canvas that stays pinned while the left column scrolls past it.
   One IntersectionObserver watches a thin band near the vertical center of
   the viewport and flips `activeIndex` (0-3) whenever a step crosses it —
   that index picks which app-UI mockup renders in the canvas, cross-faded
   in with framer-motion. Native scroll only: no snap, no hijacking.

   Mobile (<900px): no sticky pinning (a four-step pin would eat several
   screens on a small viewport). Instead four cards stack vertically, each
   pairing its own copy with its own small mockup, revealed once on scroll
   entry via `whileInView`.

   Reduced motion: the desktop sticky canvas stays (plain CSS positioning,
   not an animation) but the cross-fade becomes an instant swap; on mobile
   every card renders fully visible immediately, with no scroll-triggered
   transform. No scroll-linked transforms run in either mode. */

const DESKTOP_QUERY = "(min-width: 900px)";

// Tracks a CSS media query on the client only. Defaults to `false` (mobile
// layout) so the server-rendered / pre-hydration pass never mismatches the
// client's first paint; it flips to the real value right after mount.
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

interface StepContent {
  n: string;
  heading: string;
  body: string;
}

// Copy stays deliberately generic about the tracked habit — the app-UI
// mockups already carry a concrete example on screen.
const STEPS: StepContent[] = [
  {
    n: "01",
    heading: "Log it when it happens.",
    body: "One tap from your wrist — logged the moment it happens, not an estimate later.",
  },
  {
    n: "02",
    heading: "See the real number.",
    body: "That tap updates Today right away. Your real count, not a guess at the end of the day.",
  },
  {
    n: "03",
    heading: "Find the pattern.",
    body: "One log becomes a week. A week becomes a pattern you can actually see.",
  },
  {
    n: "04",
    heading: "Choose one next step.",
    body: "ONIS suggests one calm next step — never a scoreboard, never a lecture.",
  },
];

const stepNumberStyle: CSSProperties = {
  fontFamily: sans,
  fontSize: type.meta,
  fontWeight: weight.label,
  letterSpacing: "0.08em",
  color: colors.accent,
  margin: 0,
};

const stepHeadingStyle: CSSProperties = {
  fontFamily: display,
  fontSize: type.heading,
  fontWeight: weight.heading,
  color: colors.ink,
  lineHeight: 1.25,
  margin: "12px 0 0",
};

const stepBodyStyle: CSSProperties = {
  fontFamily: sans,
  fontSize: type.body,
  fontWeight: weight.body,
  color: colors.body,
  lineHeight: 1.6,
  maxWidth: 440,
  margin: "12px 0 0",
};

// ── The four app-UI mockups, full size (used in the desktop sticky canvas) ─

function StepVisual({ index }: { index: number }) {
  switch (index) {
    case 0:
      return (
        <WatchFrame>
          <WatchTile />
        </WatchFrame>
      );
    case 1:
      return (
        <PhoneFrame>
          <TodayScreen mainCount={1} />
        </PhoneFrame>
      );
    case 2:
      return (
        <PhoneFrame>
          <TrendsScreen />
        </PhoneFrame>
      );
    default:
      return (
        <PhoneFrame>
          <CoachScreen />
        </PhoneFrame>
      );
  }
}

// Shrinks a fixed-CSS-size mockup (PhoneFrame/WatchFrame each come with
// their own clamp()-driven width, set in globals.css) for the compact
// mobile cards, without touching that CSS. Reserves an independent box
// sized to the *scaled* target, then centers + scales the mockup inside
// it — so, unlike a bare `transform: scale()` on the mockup itself, no
// extra blank space from its pre-scale footprint is left behind in flow.
function ScaledVisual({
  boxWidth,
  ratio,
  scale,
  children,
}: {
  boxWidth: number;
  ratio: string;
  scale: number;
  children: ReactNode;
}) {
  return (
    <div style={{ position: "relative", width: boxWidth, aspectRatio: ratio, margin: "0 auto" }}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function MobileStepVisual({ index }: { index: number }) {
  if (index === 0) {
    // WatchFrame caps at 220px wide (see its clamp() in AppUI.tsx).
    return (
      <ScaledVisual boxWidth={132} ratio="1 / 1.2" scale={132 / 220}>
        <StepVisual index={index} />
      </ScaledVisual>
    );
  }
  // PhoneFrame (".hero-phone" in globals.css) caps at 300px wide.
  return (
    <ScaledVisual boxWidth={176} ratio="9 / 19" scale={176 / 300}>
      <StepVisual index={index} />
    </ScaledVisual>
  );
}

// ── Desktop: sticky two-column layout ───────────────────────────────────────

function DesktopStory({ reduceMotion }: { reduceMotion: boolean | null }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef<Array<Element | null>>([]);

  useEffect(() => {
    const els = stepRefs.current;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const idx = els.indexOf(entry.target);
          if (idx !== -1) setActiveIndex(idx);
        }
      },
      // A thin band centered in the viewport — a step "activates" once its
      // block crosses the middle of the screen, in either scroll direction.
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    els.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px, 6vw, 96px)" }}>
      <div>
        {STEPS.map((step, i) => (
          <article
            key={step.n}
            ref={(el) => {
              stepRefs.current[i] = el;
            }}
            style={{ minHeight: "78vh", display: "flex", flexDirection: "column", justifyContent: "center" }}
          >
            <p style={stepNumberStyle}>{step.n}</p>
            <h3 style={stepHeadingStyle}>{step.heading}</h3>
            <p style={stepBodyStyle}>{step.body}</p>
          </article>
        ))}
      </div>

      {/* The left column (four ~78vh blocks) is taller than this column's
          own content, so the grid's default `align-items: stretch` grows
          this column to match — giving the sticky canvas room to stay
          pinned for the full scroll of the left column. */}
      <div style={{ position: "sticky", top: "15vh", height: "70vh" }}>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {reduceMotion ? (
            <StepVisual index={activeIndex} />
          ) : (
            <AnimatePresence>
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease }}
                style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <StepVisual index={activeIndex} />
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Mobile: stacked cards, each revealed once on entry ──────────────────────

function MobileCard({
  step,
  index,
  reduceMotion,
}: {
  step: StepContent;
  index: number;
  reduceMotion: boolean | null;
}) {
  const content = (
    <article>
      <p style={stepNumberStyle}>{step.n}</p>
      <h3 style={stepHeadingStyle}>{step.heading}</h3>
      <p style={stepBodyStyle}>{step.body}</p>
      <div style={{ marginTop: 24 }}>
        <MobileStepVisual index={index} />
      </div>
    </article>
  );

  if (reduceMotion) {
    return content;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease }}
    >
      {content}
    </motion.div>
  );
}

function MobileStory({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>
      {STEPS.map((step, i) => (
        <MobileCard key={step.n} step={step} index={i} reduceMotion={reduceMotion} />
      ))}
    </div>
  );
}

// ── Section ──────────────────────────────────────────────────────────────

export default function OneTapStory() {
  const reduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery(DESKTOP_QUERY);

  return (
    <section style={{ background: colors.canvas, padding: `${layout.padY} ${layout.padX}` }}>
      <div style={{ maxWidth: layout.wideMax, margin: "0 auto" }}>
        <p style={labelStyle}>HOW IT WORKS · ONE LOOP</p>
        <h2
          style={{
            fontFamily: display,
            fontSize: type.section,
            fontWeight: weight.section,
            letterSpacing: "-0.02em",
            color: colors.ink,
            lineHeight: 1.1,
            margin: "16px 0 0",
          }}
        >
          One tap becomes a pattern.
        </h2>

        <div style={{ marginTop: "clamp(48px, 7vh, 72px)" }}>
          {isDesktop ? <DesktopStory reduceMotion={reduceMotion} /> : <MobileStory reduceMotion={reduceMotion} />}
        </div>
      </div>
    </section>
  );
}
