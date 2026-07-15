import type { CSSProperties } from "react";
import Reveal from "./Reveal";
import { colors, sans, display, type, weight, layout, labelStyle } from "../lib/tokens";
import { site } from "../lib/config";

// Four concrete, verifiable facts — each one maps to something a person can
// check inside the app. No vague absolutes, no "we collect nothing" claims.
const points: { title: string; body: string }[] = [
  {
    title: "Stored on your device",
    body: "Your logs live in the app, not on our servers.",
  },
  {
    title: `No ${site.name} account`,
    body: "No sign-up, no email, no profile.",
  },
  {
    title: "Direct iPhone–Apple Watch sync",
    body: "Your devices talk to each other, not to us.",
  },
  {
    title: "Export or delete anytime",
    body: "You control your data from inside the app.",
  },
];

const cardStyle: CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 14,
  padding: 20,
};

// Shared style for the two fine-print notes at the bottom of the section.
const fineTextStyle: CSSProperties = {
  fontFamily: sans,
  fontWeight: 400,
  fontSize: "0.85rem",
  color: colors.dimOnDark,
  lineHeight: 1.6,
  maxWidth: 620,
};

export default function PrivacySection() {
  return (
    <section
      id="privacy"
      style={{
        background: colors.ink,
        color: "#fff",
        padding: `${layout.padYInk} ${layout.padX}`,
      }}
    >
      <div style={{ maxWidth: layout.wideMax, margin: "0 auto" }}>
        <Reveal>
          <p style={{ ...labelStyle, color: colors.dimOnDark }}>Private By Design</p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2
            style={{
              fontFamily: display,
              fontSize: type.section,
              fontWeight: weight.section,
              letterSpacing: "-0.02em",
              color: "#fff",
              lineHeight: 1.1,
              margin: "16px 0 0",
            }}
          >
            Your habits stay yours.
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p
            style={{
              fontFamily: sans,
              fontWeight: 400,
              fontSize: type.body,
              color: colors.dimOnDark,
              lineHeight: 1.6,
              maxWidth: 620,
              marginTop: 20,
            }}
          >
            {`No ${site.name} account. No ads. No analytics on your habit history.`}
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(400px, 100%), 1fr))",
              gap: 16,
              marginTop: 48,
            }}
          >
            {points.map((p) => (
              <div key={p.title} style={cardStyle}>
                <p
                  style={{
                    fontFamily: sans,
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: "#fff",
                    margin: 0,
                  }}
                >
                  {p.title}
                </p>
                <p
                  style={{
                    fontFamily: sans,
                    fontWeight: 400,
                    fontSize: "0.9rem",
                    color: colors.dimOnDark,
                    lineHeight: 1.5,
                    margin: "8px 0 0",
                  }}
                >
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <p style={{ ...fineTextStyle, marginTop: 40 }}>
            {`Device backups may include ${site.name} data when Apple backup is enabled.`}
          </p>
        </Reveal>

        <Reveal delay={0.35}>
          <p
            style={{
              ...fineTextStyle,
              marginTop: 16,
              paddingTop: 16,
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <strong style={{ color: "#fff", fontWeight: 600 }}>About this website:</strong>{" "}
            it sets no cookies and runs no analytics or ad scripts. Our hosting provider may
            keep ordinary server request logs.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
