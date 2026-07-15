"use client";

import { PhoneFrame, TodayScreen, CoachScreen } from "./AppUI";

/* HeroVisual — the ONIS app composite driven by scroll-scrub progress `p`
   (0..1, supplied by ScrollHero's 200vh sticky wrapper). Choreographs the
   one-tap → pattern loop: the Main "+1" presses, the Nicotine pouches count
   rolls 0 → 1, then the screen settles into Coach's calm next step. Fully
   reversible — every value is a pure function of `p`, so scrolling up
   un-does the loop exactly.
   `reduce`: render one static, representative frame — no scroll-driven
   values, no motion. */

// Smoothstep with clamp: an eased 0→1 ramp between edge0 and edge1.
function ss(edge0: number, edge1: number, x: number): number {
  const range = edge1 - edge0;
  const t = range === 0 ? (x < edge0 ? 0 : 1) : Math.min(1, Math.max(0, (x - edge0) / range));
  return t * t * (3 - 2 * t);
}

// Choreography beats, as fractions of the 200vh scrub:
//   0.00–0.34  Today at rest (mainCount 0)
//   0.34–0.42  Main "+1" pressed
//   0.42–0.58  mainCount rolls 0 → 1
//   0.58–0.64  settle, before the crossfade
//   0.64–0.82  crossfade Today → Coach
const PRESS_START = 0.34;
const PRESS_END = 0.42;
const ROLL_START = 0.42;
const ROLL_END = 0.58;
const COACH_START = 0.64;
const COACH_END = 0.82;
const DRIFT_PX = 6; // crossfade drift — "a few px", never a slide

interface HeroVisualProps {
  /** Scroll-scrub progress, 0..1. Ignored while `reduce` is true. */
  p: number;
  /** Static, reduced-motion presentation: one representative frame, no scrub. */
  reduce?: boolean;
}

export default function HeroVisual({ p, reduce = false }: HeroVisualProps) {
  const plusPressed = !reduce && p >= PRESS_START && p < PRESS_END;
  const mainCount = reduce ? 1 : Math.round(ss(ROLL_START, ROLL_END, p));
  const coachOpacity = reduce ? 0 : ss(COACH_START, COACH_END, p);
  const todayOpacity = 1 - coachOpacity;

  return (
    <div style={{ position: "relative" }}>
      {/* A whisper of warm light behind the product. */}
      <div className="hero-glow" aria-hidden />
      <div
        role="img"
        aria-label="The ONIS app on iPhone: a tap logs a habit, then Coach shows the next step."
        style={{ position: "relative", zIndex: 1 }}
      >
        <PhoneFrame>
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: todayOpacity,
              transform: reduce ? undefined : `translateY(${-DRIFT_PX * coachOpacity}px)`,
            }}
          >
            <TodayScreen mainCount={mainCount} plusPressed={plusPressed} />
          </div>
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: coachOpacity,
              transform: reduce ? undefined : `translateY(${DRIFT_PX * todayOpacity}px)`,
            }}
          >
            <CoachScreen />
          </div>
        </PhoneFrame>
      </div>
    </div>
  );
}
