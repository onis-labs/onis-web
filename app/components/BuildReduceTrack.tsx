"use client";

import { forwardRef, useEffect, useId, useRef, useState } from "react";
import type { ButtonHTMLAttributes, CSSProperties, KeyboardEvent, ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { colors, sans, display, type, weight, layout, ease, labelStyle } from "../lib/tokens";
import { intentions, type Intention } from "../lib/content";

/* BUILD / REDUCE / TRACK — the interactive tab group that doubles as the
   product demo. Nothing here persists and nothing is tracked: nudging Start,
   +1, or Mark done only ever touches local component state. */

// ── Demo constants (kept local — these are illustrative, not real content) ─
const BUILD_START = 12;
const BUILD_TARGET = 20;
const BUILD_DURATION_MS = 4000;
const BUILD_TICK_MS = 50;
const BUILD_STEP = (BUILD_TARGET - BUILD_START) / (BUILD_DURATION_MS / BUILD_TICK_MS);

const COFFEE_START = 2;
const COFFEE_LIMIT = 3;

const PANEL_TAG: Record<Intention["id"], string> = {
  build: "KEEP GOING",
  reduce: "KEEP UNDER",
  track: "NO GOAL",
};

interface BuildDemoState {
  minutes: number;
  running: boolean;
}
interface CoffeeDemoState {
  cups: number;
}
interface TrackDemoState {
  logged: boolean;
}

// Alpha-tint a tracker CSS var without hardcoding its literal hex value, so
// the token stays the single source of truth (color-mix has full support on
// the modern Safari/Chrome/Firefox this site ships to).
function tint(colorVar: string, percent: number): string {
  return `color-mix(in srgb, ${colorVar} ${percent}%, transparent)`;
}

// ── Small interactive-state button primitive ───────────────────────────────
// Inline styles can't express :hover/:active/:focus-visible, so this tracks
// hover/press/focus in React state and hands them to a caller-supplied style
// function. Used for the tabs, the primary action pill, and Reset.

interface PressState {
  hover: boolean;
  pressed: boolean;
  focused: boolean;
}

type InteractiveButtonProps = {
  children: ReactNode;
  computeStyle: (state: PressState) => CSSProperties;
} & Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "style" | "onMouseEnter" | "onMouseLeave" | "onPointerDown" | "onPointerUp" | "onFocus" | "onBlur"
>;

const InteractiveButton = forwardRef<HTMLButtonElement, InteractiveButtonProps>(function InteractiveButton(
  { children, computeStyle, disabled, ...rest },
  ref
) {
  const [hover, setHover] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [focused, setFocused] = useState(false);

  const state: PressState = {
    hover: hover && !disabled,
    pressed: pressed && !disabled,
    focused,
  };

  return (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setPressed(false);
      }}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => {
        setFocused(false);
        setPressed(false);
      }}
      style={computeStyle(state)}
      {...rest}
    >
      {children}
    </button>
  );
});

// ── Panel bodies — one per intention ────────────────────────────────────────

function BuildPanelBody({ state, reduceMotion }: { state: BuildDemoState; reduceMotion: boolean | null }) {
  const minutesDisplay = Math.round(state.minutes);
  const pct = ((state.minutes - BUILD_START) / (BUILD_TARGET - BUILD_START)) * 100;
  return (
    <div style={{ marginTop: 16 }}>
      <p style={{ fontFamily: sans, fontSize: "0.92rem", color: colors.body, margin: 0 }}>
        {minutesDisplay} of {BUILD_TARGET} minutes
      </p>
      <div
        aria-hidden
        style={{ marginTop: 12, height: 8, borderRadius: 999, background: colors.borderSubtle, overflow: "hidden" }}
      >
        <motion.div
          style={{ height: "100%", borderRadius: 999, background: colors.trackWater }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: reduceMotion ? 0 : 0.15, ease: "linear" }}
        />
      </div>
    </div>
  );
}

function ReducePanelBody({
  state,
  reduceMotion,
  limitNoteId,
}: {
  state: CoffeeDemoState;
  reduceMotion: boolean | null;
  limitNoteId: string;
}) {
  const atLimit = state.cups >= COFFEE_LIMIT;
  return (
    <div style={{ marginTop: 16 }}>
      <p style={{ fontFamily: sans, fontSize: "0.92rem", color: colors.body, margin: 0 }}>
        {state.cups} of {COFFEE_LIMIT} cups
      </p>
      <div aria-hidden style={{ marginTop: 12, display: "flex", gap: 8 }}>
        {Array.from({ length: COFFEE_LIMIT }).map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 8,
              borderRadius: 999,
              background: i < state.cups ? colors.trackKeepUnder : colors.borderSubtle,
              transition: "background-color .2s ease",
            }}
          />
        ))}
      </div>
      <AnimatePresence>
        {atLimit && (
          <motion.p
            id={limitNoteId}
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.3, ease }}
            style={{ fontFamily: sans, fontSize: "0.85rem", color: colors.dim, marginTop: 12, marginBottom: 0 }}
          >
            At your limit for today
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" fill={colors.success} opacity={0.15} />
      <path
        d="M7.5 12.5l3 3 6-6.5"
        stroke={colors.success}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrackPanelBody({ state, reduceMotion }: { state: TrackDemoState; reduceMotion: boolean | null }) {
  return (
    <div style={{ marginTop: 16, minHeight: 28, display: "flex", alignItems: "center" }}>
      <AnimatePresence mode="wait" initial={false}>
        {state.logged ? (
          <motion.span
            key="logged"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.6 }}
            transition={{ duration: reduceMotion ? 0 : 0.25, ease }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: sans,
              fontSize: "0.92rem",
              fontWeight: weight.label,
              color: colors.success,
            }}
          >
            <CheckIcon />
            Logged
          </motion.span>
        ) : (
          <motion.span
            key="not-logged"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease }}
            style={{ fontFamily: sans, fontSize: "0.92rem", color: colors.body }}
          >
            Not logged
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main section ─────────────────────────────────────────────────────────

export default function BuildReduceTrack() {
  const uid = useId();
  const reduceMotion = useReducedMotion();

  const [activeId, setActiveId] = useState<Intention["id"]>("build");
  const [buildState, setBuildState] = useState<BuildDemoState>({ minutes: BUILD_START, running: false });
  const [coffeeState, setCoffeeState] = useState<CoffeeDemoState>({ cups: COFFEE_START });
  const [trackState, setTrackState] = useState<TrackDemoState>({ logged: false });

  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const active = intentions.find((i) => i.id === activeId) ?? intentions[0];
  const buildDone = buildState.minutes >= BUILD_TARGET;
  const coffeeAtLimit = coffeeState.cups >= COFFEE_LIMIT;
  const limitNoteId = `${uid}-limit-note`;

  // Drive the Build timer while running. Module-level constants (BUILD_STEP,
  // BUILD_TARGET, BUILD_TICK_MS) are stable and intentionally left out of the
  // dependency array.
  useEffect(() => {
    if (!buildState.running) return;
    const id = setInterval(() => {
      setBuildState((s) => {
        if (!s.running) return s;
        const nextMinutes = Math.min(BUILD_TARGET, s.minutes + BUILD_STEP);
        const reachedTarget = nextMinutes >= BUILD_TARGET;
        return { minutes: nextMinutes, running: reachedTarget ? false : s.running };
      });
    }, BUILD_TICK_MS);
    return () => clearInterval(id);
  }, [buildState.running]);

  function focusTabAt(index: number) {
    const count = intentions.length;
    const wrapped = (index + count) % count;
    const nextId = intentions[wrapped]?.id;
    if (!nextId) return;
    setActiveId(nextId);
    tabRefs.current[wrapped]?.focus();
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        focusTabAt(index + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        focusTabAt(index - 1);
        break;
      case "Home":
        event.preventDefault();
        focusTabAt(0);
        break;
      case "End":
        event.preventDefault();
        focusTabAt(intentions.length - 1);
        break;
      default:
        break;
    }
  }

  function handleReset() {
    if (active.id === "build") setBuildState({ minutes: BUILD_START, running: false });
    else if (active.id === "reduce") setCoffeeState({ cups: COFFEE_START });
    else setTrackState({ logged: false });
  }

  let primaryActionLabel: string;
  let isActionDisabled: boolean;
  let handlePrimaryAction: () => void;

  if (active.id === "build") {
    primaryActionLabel = buildDone ? "Done" : buildState.running ? "Pause" : "Start";
    isActionDisabled = buildDone;
    handlePrimaryAction = () => {
      if (buildDone) return;
      if (reduceMotion) {
        setBuildState({ minutes: BUILD_TARGET, running: false });
        return;
      }
      setBuildState((s) => ({ ...s, running: !s.running }));
    };
  } else if (active.id === "reduce") {
    primaryActionLabel = "+1";
    isActionDisabled = coffeeAtLimit;
    handlePrimaryAction = () => {
      setCoffeeState((s) => (s.cups >= COFFEE_LIMIT ? s : { cups: s.cups + 1 }));
    };
  } else {
    primaryActionLabel = trackState.logged ? "Undo" : "Mark done";
    isActionDisabled = false;
    handlePrimaryAction = () => setTrackState((s) => ({ logged: !s.logged }));
  }

  return (
    <section id="how-it-works" style={{ padding: `${layout.padY} ${layout.padX}`, background: colors.canvas }}>
      <div style={{ maxWidth: layout.contentMax, margin: "0 auto", textAlign: "center" }}>
        <p style={labelStyle}>ONE APP, THREE INTENTIONS</p>
        <h2
          style={{
            fontFamily: display,
            fontSize: type.section,
            fontWeight: weight.section,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            color: colors.ink,
            margin: "16px 0 0",
          }}
        >
          Build it, reduce it, or just watch it.
        </h2>
        <p
          style={{
            fontFamily: sans,
            fontSize: type.body,
            fontWeight: weight.body,
            color: colors.body,
            lineHeight: 1.6,
            maxWidth: 620,
            margin: "16px auto 0",
          }}
        >
          Same one tap. You decide what it means.
        </p>
      </div>

      <div style={{ maxWidth: 560, margin: "clamp(40px, 6vh, 64px) auto 0", textAlign: "center" }}>
        <div
          role="tablist"
          aria-label="Choose an intention"
          style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}
        >
          {intentions.map((intention, index) => {
            const isActive = intention.id === activeId;
            return (
              <InteractiveButton
                key={intention.id}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                role="tab"
                id={`${uid}-tab-${intention.id}`}
                aria-selected={isActive}
                aria-controls={`${uid}-panel-${intention.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveId(intention.id)}
                onKeyDown={(e) => handleTabKeyDown(e, index)}
                computeStyle={({ hover, pressed, focused }) => ({
                  fontFamily: sans,
                  fontSize: "0.85rem",
                  fontWeight: isActive ? weight.heading : weight.label,
                  padding: "10px 20px",
                  borderRadius: 999,
                  border: `1px solid ${isActive ? tint(intention.colorVar, 30) : "transparent"}`,
                  background: isActive ? tint(intention.colorVar, 12) : hover ? colors.cardCream : "transparent",
                  color: isActive ? intention.colorVar : colors.dim,
                  cursor: "pointer",
                  transform: pressed ? "scale(0.96)" : "scale(1)",
                  outline: focused ? `2px solid ${tint(intention.colorVar, 60)}` : "none",
                  outlineOffset: 2,
                  transition: "background-color .18s ease, color .18s ease, border-color .18s ease, transform .12s ease",
                })}
              >
                {intention.label}
              </InteractiveButton>
            );
          })}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.id}
            role="tabpanel"
            id={`${uid}-panel-${active.id}`}
            aria-labelledby={`${uid}-tab-${active.id}`}
            tabIndex={0}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: reduceMotion ? 0 : 0.3, ease }}
          >
            <p
              style={{
                fontFamily: sans,
                fontSize: type.body,
                color: colors.body,
                margin: "20px 0 20px",
              }}
            >
              {active.promise}
            </p>

            <div
              style={{
                borderRadius: 18,
                background: tint(active.colorVar, 10),
                border: `1px solid ${tint(active.colorVar, 25)}`,
                padding: "clamp(20px, 4vw, 24px)",
                textAlign: "left",
              }}
            >
              <p style={{ ...labelStyle, color: active.colorVar, margin: 0 }}>
                {active.label.toUpperCase()} · {PANEL_TAG[active.id]}
              </p>
              <h3
                style={{
                  fontFamily: display,
                  fontWeight: weight.section,
                  color: colors.ink,
                  fontSize: type.heading,
                  margin: "8px 0 0",
                }}
              >
                {active.example.name}
              </h3>

              {active.id === "build" && <BuildPanelBody state={buildState} reduceMotion={reduceMotion} />}
              {active.id === "reduce" && (
                <ReducePanelBody state={coffeeState} reduceMotion={reduceMotion} limitNoteId={limitNoteId} />
              )}
              {active.id === "track" && <TrackPanelBody state={trackState} reduceMotion={reduceMotion} />}

              <div
                style={{
                  marginTop: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  flexWrap: "wrap",
                }}
              >
                <InteractiveButton
                  onClick={handlePrimaryAction}
                  disabled={isActionDisabled}
                  aria-describedby={active.id === "reduce" && coffeeAtLimit ? limitNoteId : undefined}
                  computeStyle={({ hover, pressed, focused }) => ({
                    fontFamily: sans,
                    fontSize: "0.9rem",
                    fontWeight: weight.heading,
                    color: "#fff",
                    background: active.colorVar,
                    padding: "12px 24px",
                    borderRadius: 999,
                    border: "none",
                    cursor: isActionDisabled ? "not-allowed" : "pointer",
                    opacity: isActionDisabled ? 0.45 : hover ? 0.9 : 1,
                    transform: pressed && !isActionDisabled ? "scale(0.96)" : "scale(1)",
                    outline: focused ? `2px solid ${tint(active.colorVar, 60)}` : "none",
                    outlineOffset: 2,
                    transition: "opacity .18s ease, transform .12s ease",
                  })}
                >
                  {primaryActionLabel}
                </InteractiveButton>

                <InteractiveButton
                  onClick={handleReset}
                  computeStyle={({ hover, focused }) => ({
                    fontFamily: sans,
                    fontSize: "0.82rem",
                    fontWeight: weight.label,
                    color: hover ? colors.ink : colors.dim,
                    background: "transparent",
                    border: "none",
                    padding: "8px 4px",
                    cursor: "pointer",
                    textDecoration: hover ? "underline" : "none",
                    textUnderlineOffset: 3,
                    outline: focused ? `2px solid ${colors.accent}` : "none",
                    outlineOffset: 2,
                    transition: "color .15s ease",
                  })}
                >
                  Reset
                </InteractiveButton>
              </div>

              <p style={{ fontFamily: sans, fontSize: type.meta, color: colors.dim, margin: "16px 0 0" }}>
                Interactive example — nothing is saved.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                justifyContent: "center",
                marginTop: 24,
              }}
            >
              {active.examples.map((example) => (
                <span
                  key={example}
                  style={{
                    fontFamily: sans,
                    fontSize: "0.78rem",
                    color: colors.dim,
                    background: colors.cardCream,
                    border: `1px solid ${colors.borderSubtle}`,
                    borderRadius: 999,
                    padding: "8px 12px",
                  }}
                >
                  {example}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
