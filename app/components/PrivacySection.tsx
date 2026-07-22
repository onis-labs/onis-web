import Reveal from "./Reveal";
import AccentPeriod from "./AccentPeriod";
import { colors, sans, display, type, weight, layout, labelStyle } from "../lib/tokens";
import { site } from "../lib/config";

// ── Section 10 — Privacy ─────────────────────────────────────────────────
// Deliberately shorter than the product sections: six concise, verifiable
// points (each maps to something checkable in the app), plus one honest
// line about this website's hosting logs. Details live at /privacy.

const POINTS = [
  `No ${site.name} account`,
  "No advertising",
  "Habit history stored locally",
  "Direct iPhone–Apple Watch synchronization",
  "Export or delete your data",
  `Apple device backups may contain ${site.name} data when enabled`,
] as const;

export default function PrivacySection() {
  return (
    <section
      id="privacy"
      style={{
        background: colors.ink,
        color: "#fff",
        padding: `clamp(80px, 12vh, 132px) ${layout.padX}`,
      }}
    >
      <div style={{ maxWidth: layout.contentMax, margin: "0 auto" }}>
        <Reveal>
          <p style={{ ...labelStyle, color: colors.dimOnDark }}>Privacy</p>
        </Reveal>

        <Reveal delay={0.08}>
          <h2
            style={{
              fontFamily: display,
              fontSize: type.section,
              fontWeight: weight.section,
              letterSpacing: "-0.02em",
              color: "#fff",
              lineHeight: 1.12,
              margin: "16px 0 0",
            }}
          >
            Private by design
            <AccentPeriod />
          </h2>
        </Reveal>

        <Reveal delay={0.14}>
          <ul
            style={{
              listStyle: "none",
              margin: "36px 0 0",
              padding: 0,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "12px 32px",
            }}
          >
            {POINTS.map((point) => (
              <li
                key={point}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  fontFamily: sans,
                  fontWeight: weight.body,
                  fontSize: "0.98rem",
                  color: "rgba(255,255,255,0.88)",
                  lineHeight: 1.55,
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: 8,
                    height: 8,
                    marginTop: 8,
                    borderRadius: 999,
                    flexShrink: 0,
                    background: colors.accent,
                  }}
                />
                {point}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.2}>
          <p
            style={{
              fontFamily: sans,
              fontWeight: weight.body,
              fontSize: "0.85rem",
              color: colors.dimOnDark,
              lineHeight: 1.6,
              margin: "36px 0 0",
              paddingTop: 20,
              borderTop: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            This website sets no cookies and runs no analytics or ad scripts;
            our hosting provider may keep ordinary server request logs.{" "}
            <a
              href="/privacy"
              style={{
                color: "#fff",
                textDecoration: "underline",
                textUnderlineOffset: 3,
              }}
            >
              Read the privacy policy
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
