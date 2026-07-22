import Reveal from "./Reveal";
import SectionIntro from "./SectionIntro";
import FrameArtwork from "./FrameArtwork";
import { colors, sans, weight, layout } from "../lib/tokens";
import { frames } from "../lib/frames";

// ── Section 3 — Apple Watch ──────────────────────────────────────────────
// Uses both approved Watch assets: the connected Watch hero frame (cropped
// to its Watch region) and the "Built for your wrist" trio. Every feature
// listed exists in the current Watch build (verified against the iOS source:
// WatchHabitListView, WatchTimerSession, WatchSync).

const WATCH_FEATURES = [
  {
    title: "Count with one tap",
    detail: "+1 logs the moment straight from the tracker list.",
  },
  {
    title: "Finish with one tap",
    detail: "Mark a tracker done for today from your wrist.",
  },
  {
    title: "Run timers",
    detail: "Start, pause, resume, and stop — the minutes log themselves.",
  },
  {
    title: "Switch trackers",
    detail: "Move between your trackers without reaching for the phone.",
  },
  {
    title: "Stays in sync",
    detail: "Your iPhone and Watch talk directly — no cloud in between.",
  },
] as const;

export default function WatchSection() {
  return (
    <section
      id="apple-watch"
      style={{ padding: `${layout.padY} ${layout.padX}`, background: colors.canvas }}
    >
      <div style={{ maxWidth: layout.wideMax, margin: "0 auto" }}>
        <div style={{ maxWidth: layout.contentMax, margin: "0 auto" }}>
          <SectionIntro
            kicker="Apple Watch"
            title="One tap from your wrist"
            body="Log the moment it happens without reaching for your phone."
            center
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
            gap: "clamp(28px, 4vw, 56px)",
            alignItems: "center",
            marginTop: 56,
          }}
        >
          <Reveal>
            <FrameArtwork
              frame={{
                ...frames.wrist,
                visibleH: 0.5,
                focusY: 0.42,
                alt: "The ONIS Watch app logging Coffee — 2 cups with a progress bar, 2 cups left, and a large +1 button.",
              }}
              sizes="(min-width: 900px) 45vw, 90vw"
              radius={24}
              shadow
            />
          </Reveal>

          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {WATCH_FEATURES.map((feature, i) => (
              <li key={feature.title}>
                <Reveal delay={0.08 * i}>
                  <span
                    style={{
                      display: "flex",
                      gap: 16,
                      padding: "16px 0",
                      borderBottom:
                        i < WATCH_FEATURES.length - 1
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
                      background: colors.accent,
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
                      {feature.title}
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
                      {feature.detail}
                    </span>
                  </span>
                  </span>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <Reveal delay={0.1}>
          <div
            style={{
              marginTop: "clamp(32px, 5vw, 56px)",
              maxWidth: 920,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <FrameArtwork
              frame={frames.watchTrio}
              sizes="(min-width: 1000px) 920px, 92vw"
              radius={28}
              shadow
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
