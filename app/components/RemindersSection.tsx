import Reveal from "./Reveal";
import SectionIntro from "./SectionIntro";
import { colors, sans, weight, layout } from "../lib/tokens";

// ── Section 8 — Reminders ────────────────────────────────────────────────
// Only notification types that exist in NotificationScheduler.swift:
// per-tracker reminders, timer completion, limit reminders, and the Sunday
// weekly review. There is no daily summary — so none is promised. All are
// optional and off by default in the real app.

const REMINDER_TYPES = [
  {
    title: "Tracker reminders",
    detail: "A gentle nudge for a tracker, daily or on the weekdays you pick.",
  },
  {
    title: "Timer completion",
    detail: "Know when a session finishes so you can log it.",
  },
  {
    title: "Limit reminders",
    detail: "A calm note when you reach the limit you set — never shame.",
  },
  {
    title: "Weekly review",
    detail: "An optional Sunday-evening look at your week.",
  },
] as const;

export default function RemindersSection() {
  return (
    <section
      id="reminders"
      style={{ padding: `${layout.padY} ${layout.padX}`, background: colors.canvas }}
    >
      <div style={{ maxWidth: layout.contentMax, margin: "0 auto" }}>
        <SectionIntro
          kicker="Reminders"
          title="Stay close to the moment"
          body="Choose gentle reminders that fit your routine."
          center
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
            gap: 16,
            marginTop: 44,
          }}
        >
          {REMINDER_TYPES.map((reminder, i) => (
            <Reveal key={reminder.title} delay={0.08 * i}>
              <div
                style={{
                  height: "100%",
                  background: colors.cardCream,
                  border: `1px solid ${colors.borderSubtle}`,
                  borderRadius: 16,
                  padding: "20px 22px",
                }}
              >
                <p
                  style={{
                    fontFamily: sans,
                    fontWeight: weight.heading,
                    fontSize: "0.98rem",
                    color: colors.ink,
                    margin: 0,
                  }}
                >
                  {reminder.title}
                </p>
                <p
                  style={{
                    fontFamily: sans,
                    fontWeight: weight.body,
                    fontSize: "0.9rem",
                    color: colors.body,
                    lineHeight: 1.55,
                    margin: "8px 0 0",
                  }}
                >
                  {reminder.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p
            style={{
              fontFamily: sans,
              fontWeight: weight.body,
              fontSize: "0.85rem",
              color: colors.dim,
              textAlign: "center",
              margin: "28px 0 0",
            }}
          >
            All reminders are optional and off by default — you choose what
            ONIS can send.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
