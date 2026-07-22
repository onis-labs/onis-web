import Reveal from "./Reveal";
import SectionIntro from "./SectionIntro";
import FrameArtwork from "./FrameArtwork";
import { colors, sans, weight, layout } from "../lib/tokens";
import { frames } from "../lib/frames";

// ── Section 4 — Widgets ──────────────────────────────────────────────────
// The approved widget screenshot is the visual — the widgets are never
// recreated in HTML. Every claim is verified against ONISWidget.swift:
// SelectHabitIntent (choose tracker), WidgetLogHabitIntent (+1 / Done),
// CycleWidgetHabitIntent (arrows), Home + Lock Screen families, and the
// Watch complication target.

const WIDGET_POINTS = [
  {
    title: "Choose the tracker",
    detail: "Each widget follows the tracker you pick.",
  },
  {
    title: "See today at a glance",
    detail: "Progress like “2 of 4 cups today” — straight from your log.",
  },
  {
    title: "Act without opening ONIS",
    detail: "+1 and Done work right in the widget; arrows switch trackers.",
  },
  {
    title: "Configure through iOS",
    detail:
      "Add Home Screen and Lock Screen widgets from the iOS gallery, plus Watch complications.",
  },
] as const;

export default function WidgetsSection() {
  return (
    <section
      id="widgets"
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
            kicker="Widgets"
            title="Your habits, one glance away"
            body="See today and use supported actions without opening ONIS."
          />

          <ul style={{ listStyle: "none", margin: "36px 0 0", padding: 0 }}>
            {WIDGET_POINTS.map((point, i) => (
              <li key={point.title}>
                <Reveal delay={0.08 * i}>
                  <span
                    style={{
                      display: "flex",
                      gap: 16,
                      padding: "14px 0",
                      borderBottom:
                        i < WIDGET_POINTS.length - 1
                          ? `1px solid ${colors.borderSubtle}`
                          : "none",
                    }}
                  >
                  <span
                    aria-hidden="true"
                    style={{
                      width: 10,
                      height: 10,
                      marginTop: 7,
                      borderRadius: 999,
                      flexShrink: 0,
                      background: "var(--track-mind)",
                    }}
                  />
                  <span>
                    <span
                      style={{
                        display: "block",
                        fontFamily: sans,
                        fontWeight: weight.heading,
                        fontSize: "1.02rem",
                        color: colors.ink,
                      }}
                    >
                      {point.title}
                    </span>
                    <span
                      style={{
                        display: "block",
                        fontFamily: sans,
                        fontWeight: weight.body,
                        fontSize: "0.95rem",
                        color: colors.body,
                        lineHeight: 1.55,
                        marginTop: 2,
                      }}
                    >
                      {point.detail}
                    </span>
                  </span>
                  </span>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <Reveal delay={0.1}>
          <FrameArtwork
            frame={frames.widgets}
            sizes="(min-width: 900px) 46vw, 92vw"
            radius={26}
            shadow
          />
        </Reveal>
      </div>
    </section>
  );
}
