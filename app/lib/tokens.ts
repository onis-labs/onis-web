import type { CSSProperties } from "react";

// ── ONIS design tokens ────────────────────────────────────────────────────
// Color LITERALS live once, as CSS custom properties in :root (globals.css).
// These exports reference those vars so inline styles and CSS never drift.
export const colors = {
  canvas: "var(--canvas)", // warm cream — page background
  cardCream: "var(--card-cream)", // elevated section background
  ink: "var(--ink)", // primary text / dark surface
  body: "var(--body)", // body text
  dim: "var(--dim)", // secondary text on cream (WCAG AA)
  dimOnDark: "var(--dim-on-dark)", // secondary text on the dark ink surface
  accent: "var(--accent)", // terracotta
  accentHover: "var(--accent-hover)",
  accentSoft: "var(--accent-soft)",
  borderSubtle: "var(--border-subtle)",
  success: "var(--success)", // positive completion
  // Tracker colors — sampled from the shipped app screens, used purposefully.
  trackWater: "var(--track-water)", // teal — Build (water)
  trackReading: "var(--track-reading)", // amber — Build (make your bed / reading)
  trackStudy: "var(--track-study)", // periwinkle — Build (cold shower / study)
  trackMind: "var(--track-mind)", // muted purple — neutral Track
  trackKeepUnder: "var(--track-keepunder)", // indigo — Reduce / Keep Under
} as const;

// Apple system font stack. Apple devices render SF natively; others fall back
// to their own high-quality system sans. No Apple font files are bundled.
export const sans =
  '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", "Helvetica Neue", Arial, sans-serif';
export const display =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", "Helvetica Neue", Arial, sans-serif';
// Deprecated alias — earlier components used a serif display; now system display.
export const serif = display;

// One calm easing curve for every reveal — premium, never bouncy.
export const ease = [0.22, 1, 0.36, 1] as const;

// Type scale — five levels, weight-driven hierarchy, responsive via clamp().
export const type = {
  hero: "clamp(2.6rem, 6.4vw, 5rem)",
  section: "clamp(1.9rem, 4.2vw, 3.1rem)",
  heading: "clamp(1.2rem, 2.1vw, 1.55rem)",
  body: "clamp(1rem, 1.25vw, 1.13rem)",
  meta: "0.8rem",
} as const;

export const weight = {
  hero: 800,
  section: 700,
  heading: 600,
  label: 500,
  body: 400,
} as const;

// Shared layout rhythm so every section breathes on the same grid.
export const layout = {
  contentMax: 760, // text-led sections
  wideMax: 1120, // hero + feature grid
  padY: "clamp(96px, 15vh, 168px)", // section vertical rhythm
  padYInk: "clamp(112px, 18vh, 200px)", // the dark section breathes a touch more
  padX: "clamp(20px, 6vw, 80px)", // section horizontal gutter
} as const;

// Uppercase eyebrow label style used across sections.
export const labelStyle: CSSProperties = {
  fontFamily: sans,
  fontSize: "0.68rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: colors.dim,
  fontWeight: weight.label,
};
