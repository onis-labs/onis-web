import type { CSSProperties, ReactNode } from "react";
import Reveal from "./Reveal";
import { PhoneFrame, TodayScreen, TrendsScreen, CoachScreen } from "./AppUI";
import { colors, sans, display, type, weight, layout, labelStyle } from "../lib/tokens";

// ── THE SYSTEM — Today, Trends, and Coach shown as one connected flow. ─────
// Three alternating showcase rows: a real app screen (re-created via AppUI,
// not a screenshot) beside a short, honest description of what it does.
// No AI-analysis claim on Trends, no medical claim on Coach, no invented
// numbers — copy only names things the shipped app actually does.

interface StoryRow {
  id: string;
  tag: string;
  heading: string;
  copy: string;
  ariaLabel: string;
  screen: ReactNode;
}

const rows: StoryRow[] = [
  {
    id: "today",
    tag: "TODAY",
    heading: "Know where you stand today.",
    copy: "Your main tracker leads the day, with Build items like water and tomorrow's plan underneath — daily goals you log with a single tap or an in-app timer.",
    ariaLabel: "The ONIS Today screen, showing a main tracker and today's Build items",
    screen: <TodayScreen mainCount={1} />,
  },
  {
    id: "trends",
    tag: "TRENDS",
    heading: "Turn logs into something you can see.",
    copy: "Timing, weekday movement, and history, laid out plainly. No streaks to keep and no shame if you miss a day — just your real numbers.",
    ariaLabel: "The ONIS Trends screen, showing today's count, a trend card, and a 30-day history grid",
    screen: <TrendsScreen />,
  },
  {
    id: "coach",
    tag: "COACH",
    heading: "One clear next step.",
    copy: "A calm, honest nudge based on the targets you set — not medical advice, and never a guaranteed outcome.",
    ariaLabel: "The ONIS Coach screen, showing today's target and a short coach note",
    screen: <CoachScreen />,
  },
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

// Each row is its own 2-up grid (auto-fit) so alternating left/right on
// desktop just means swapping DOM order per row; the same grid collapses to
// a single stacked column with no media query once it can't fit two
// 320px-minimum tracks — e.g. any viewport under ~800px wide.
const rowGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: "clamp(32px, 6vw, 64px)",
  alignItems: "center",
};

const rowHeadingStyle: CSSProperties = {
  fontFamily: display,
  fontSize: type.heading,
  fontWeight: weight.heading,
  letterSpacing: "-0.01em",
  lineHeight: 1.25,
  color: colors.ink,
  margin: "8px 0 0",
};

const rowCopyStyle: CSSProperties = {
  fontFamily: sans,
  fontSize: type.body,
  fontWeight: weight.body,
  color: colors.body,
  lineHeight: 1.6,
  maxWidth: 460,
  marginTop: 12,
};

const phoneWrapStyle: CSSProperties = {
  display: "flex",
  justifyContent: "center",
};

export default function ProductStory() {
  return (
    <section id="features" style={{ background: colors.canvas, padding: `${layout.padY} ${layout.padX}` }}>
      <div style={{ maxWidth: layout.wideMax, margin: "0 auto" }}>
        <Reveal>
          <p style={labelStyle}>THE SYSTEM</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 style={headlineStyle}>Today, Trends, and Coach — connected.</h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p style={subStyle}>The same tap flows through all three.</p>
        </Reveal>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(64px, 8vw, 96px)",
            marginTop: "clamp(56px, 8vh, 96px)",
          }}
        >
          {rows.map((row, i) => {
            const reversed = i % 2 === 1;
            const phone = (
              <div role="img" aria-label={row.ariaLabel} style={phoneWrapStyle}>
                <PhoneFrame>{row.screen}</PhoneFrame>
              </div>
            );
            const copy = (
              <div>
                <p style={labelStyle}>{row.tag}</p>
                <h3 style={rowHeadingStyle}>{row.heading}</h3>
                <p style={rowCopyStyle}>{row.copy}</p>
              </div>
            );
            return (
              <Reveal key={row.id} delay={0.1} style={rowGridStyle}>
                {reversed ? copy : phone}
                {reversed ? phone : copy}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
