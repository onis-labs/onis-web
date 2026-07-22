import Reveal from "./Reveal";
import SectionIntro from "./SectionIntro";
import FrameArtwork from "./FrameArtwork";
import { colors, sans, weight, layout } from "../lib/tokens";
import { frames } from "../lib/frames";
import { modes, modesFootnote } from "../lib/content";

// ── Section 5 — Build. Reduce. Understand. ───────────────────────────────
// The approved tracker-card frame carries the visual; the three direction
// explainers stay concise. The footnote keeps the marketing name and the
// in-app "Track" control honest with each other.

export default function ModesSection() {
  return (
    <section
      id="product"
      style={{ padding: `${layout.padY} ${layout.padX}`, background: colors.canvas }}
    >
      <div style={{ maxWidth: layout.wideMax, margin: "0 auto" }}>
        <div style={{ maxWidth: layout.contentMax, margin: "0 auto" }}>
          <SectionIntro
            kicker="One app · Three directions"
            title="Build. Reduce. Understand"
            body="One tracker for real life."
            center
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
            gap: "clamp(32px, 5vw, 64px)",
            alignItems: "center",
            marginTop: 56,
          }}
        >
          <Reveal>
            <FrameArtwork
              frame={frames.modes}
              sizes="(min-width: 900px) 46vw, 92vw"
              radius={26}
              shadow
            />
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {modes.map((mode, i) => (
              <Reveal key={mode.id} delay={0.08 * i}>
                <div>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      background: mode.colorVar,
                      color: "#fff",
                      fontFamily: sans,
                      fontWeight: weight.heading,
                      fontSize: "0.72rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      padding: "5px 14px",
                      borderRadius: 999,
                    }}
                  >
                    {mode.label}
                  </span>
                  <p
                    style={{
                      fontFamily: sans,
                      fontWeight: weight.heading,
                      fontSize: "1.1rem",
                      color: colors.ink,
                      margin: "10px 0 0",
                    }}
                  >
                    {mode.promise}
                  </p>
                  <p
                    style={{
                      fontFamily: sans,
                      fontWeight: weight.body,
                      fontSize: "0.95rem",
                      color: colors.body,
                      lineHeight: 1.55,
                      margin: "6px 0 0",
                    }}
                  >
                    {mode.examples.join(" · ")}
                  </p>
                </div>
              </Reveal>
            ))}

            <Reveal delay={0.3}>
              <p
                style={{
                  fontFamily: sans,
                  fontWeight: weight.body,
                  fontSize: "0.82rem",
                  color: colors.dim,
                  margin: 0,
                }}
              >
                {modesFootnote}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
