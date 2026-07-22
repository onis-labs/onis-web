import Reveal from "./Reveal";
import SectionIntro from "./SectionIntro";
import FrameArtwork from "./FrameArtwork";
import { colors, sans, weight, layout } from "../lib/tokens";
import { frames } from "../lib/frames";

// ── Sections 6 & 7 — Trends and Coach ────────────────────────────────────
// Both are Premium in the real app (MainTabView.swift gates the tabs), so
// both intros carry the truthful Premium chip. Every highlighted item is
// visible in the approved screenshots — nothing is invented.

function PointList({
  items,
  color,
}: {
  items: readonly string[];
  color: string;
}) {
  return (
    <ul
      style={{
        listStyle: "none",
        margin: "32px 0 0",
        padding: 0,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "10px 20px",
      }}
    >
      {items.map((item) => (
        <li
          key={item}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontFamily: sans,
            fontWeight: weight.body,
            fontSize: "0.95rem",
            color: colors.body,
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              flexShrink: 0,
              background: color,
            }}
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

const TRENDS_POINTS = [
  "Current amount today",
  "Your target or limit",
  "Daily average",
  "Days at or under",
  "Vs the prior period",
  "Activity by day",
] as const;

export function TrendsSection() {
  return (
    <section
      id="trends"
      style={{ padding: `${layout.padY} ${layout.padX}`, background: colors.canvas }}
    >
      <div
        style={{
          maxWidth: layout.wideMax,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
          gap: "clamp(32px, 5vw, 64px)",
          alignItems: "center",
        }}
      >
        <div>
          <SectionIntro
            kicker="Trends"
            title="Stop guessing. See the pattern"
            body="Daily activity, timing, history, and progress — built from the moments you actually logged."
            premium
          />
          <PointList items={TRENDS_POINTS} color={colors.accent} />
        </div>

        <Reveal delay={0.1}>
          <FrameArtwork
            frame={frames.trends}
            sizes="(min-width: 900px) 46vw, 92vw"
            radius={26}
            shadow
          />
        </Reveal>
      </div>
    </section>
  );
}

const COACH_POINTS = [
  "Your current status",
  "One clear interpretation",
  "One optional next step",
  "Supportive language — never guilt",
  "Not a chatbot",
] as const;

export function CoachSection() {
  return (
    <section
      id="coach"
      style={{ padding: `${layout.padY} ${layout.padX}`, background: colors.canvas }}
    >
      <div
        style={{
          maxWidth: layout.wideMax,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
          gap: "clamp(32px, 5vw, 64px)",
          alignItems: "center",
        }}
      >
        <Reveal>
          <FrameArtwork
            frame={frames.coach}
            sizes="(min-width: 900px) 46vw, 92vw"
            radius={26}
            shadow
          />
        </Reveal>

        <div>
          <SectionIntro
            kicker="Coach"
            title="A calmer next step, every day"
            body="Helpful guidance based on the goals you selected — without guilt, pressure, or medical claims."
            premium
          />
          <PointList items={COACH_POINTS} color={colors.success} />
        </div>
      </div>
    </section>
  );
}
