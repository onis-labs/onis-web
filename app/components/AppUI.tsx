import type { CSSProperties, ReactNode } from "react";

// ── ONIS app UI kit ───────────────────────────────────────────────────────
// The current ONIS app screens, re-created in React/CSS — not screenshots.
// This is a light-gray iOS-style surface with its OWN palette, distinct from
// the cream marketing site (see app/lib/tokens.ts). Every screen is sized in
// cqw so it scales with whatever frame renders it: PhoneFrame's `.hero-screen`
// already sets `container-type: inline-size` (globals.css); WatchFrame and
// HomeWidget establish their own containment context inline, since this file
// may not touch globals.css.
//
// Font family is intentionally left unset here — `body` already declares the
// Apple system stack in globals.css, and every element below inherits it.

const APP = {
  screenBg: "#EFEFF1",
  card: "#FFFFFF",
  ink: "#1B1B1F",
  sub: "#6B6B72",
  keepUnder: "#4B62D0", // indigo
  keepUnderPressed: "#3C4EA6", // derived: pressed/darker state for the +1 button
  water: "#2FA98C", // teal
  amber: "#E0A63A",
  coral: "#D9694C",
  periwinkle: "#6E7BE0",
  green: "#34A853",
  terracotta: "#C15F3C", // active tab — distinct from the marketing accent
  hairline: "rgba(0,0,0,0.06)",
} as const;

// Establishes a container-query context without relying on a CSS class.
// Kept untyped and merged via spread so an unresolved `containerType` key
// (older csstype) never trips React's excess-property check on `style`.
const containerize = { containerType: "inline-size" };

const labelSm = {
  fontSize: "2.6cqw",
  fontWeight: 700,
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  margin: 0,
};

const SIDE_PAD = "4.6cqw";
const TOP_PAD = "12.5cqw"; // clears the hero-island (top 2.4cqw + height 7.2cqw)

// ── Small atoms ────────────────────────────────────────────────────────────

function Dot({ color, size = "1.6cqw", style }: { color: string; size?: string; style?: CSSProperties }) {
  return (
    <span
      aria-hidden
      style={{ width: size, height: size, borderRadius: "50%", background: color, display: "inline-block", flex: "0 0 auto", ...style }}
    />
  );
}

function CheckboxOutline({ color, size }: { color: string; size: string }) {
  return (
    <span
      aria-hidden
      style={{ width: size, height: size, borderRadius: "1.6cqw", border: `0.45cqw solid ${color}`, flex: "0 0 auto", display: "inline-block" }}
    />
  );
}

// ── Icons — minimal inline SVGs, all decorative ────────────────────────────

function IconHouse({ color, size }: { color: string; size: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5.5 10v9a1 1 0 0 0 1 1H17.5a1 1 0 0 0 1-1v-9" />
    </svg>
  );
}
function IconBars({ color, size }: { color: string; size: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 20V11" />
      <path d="M12 20V6" />
      <path d="M18 20v-6" />
    </svg>
  );
}
function IconTrendLine({ color, size }: { color: string; size: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 17l5-6 4 3 7-9" />
      <path d="M15 5h5v5" />
    </svg>
  );
}
function IconPerson({ color, size }: { color: string; size: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5 20c1.2-4 4-5.6 7-5.6S17.8 16 19 20" />
    </svg>
  );
}
function IconDrop({ color, size }: { color: string; size: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden>
      <path d="M12 3c3.6 4.4 6 7.9 6 10.8A6 6 0 1 1 6 13.8C6 10.9 8.4 7.4 12 3Z" />
    </svg>
  );
}
function IconCalendar({ color, size }: { color: string; size: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="4" y="5.5" width="16" height="15" rx="2.4" />
      <path d="M4 10h16" />
      <path d="M8 3.5v4M16 3.5v4" />
    </svg>
  );
}
function IconChevron({ color, size }: { color: string; size: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}
function IconMagnifier({ color, size }: { color: string; size: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M20 20l-4.8-4.8" />
    </svg>
  );
}
function IconPlus({ color, size }: { color: string; size: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.2} strokeLinecap="round" aria-hidden>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

// ── 1. PhoneFrame ───────────────────────────────────────────────────────────
// Our own CSS-drawn iPhone mockup (ink bezel, rounded screen, dynamic island —
// not Apple device artwork). `.hero-phone` / `.hero-screen` / `.hero-island`
// already exist in globals.css.

export function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={className ? `hero-phone ${className}` : "hero-phone"}>
      <div className="hero-screen">
        <div className="hero-island" aria-hidden />
        {children}
      </div>
    </div>
  );
}

// ── Shared across screens: avatar + intention chips ────────────────────────

function Avatar() {
  return (
    <span
      aria-hidden
      style={{
        width: "9cqw",
        height: "9cqw",
        borderRadius: "50%",
        background: APP.card,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 0.6cqw 1.6cqw rgba(0,0,0,0.06)",
        marginBottom: "3cqw",
        flex: "0 0 auto",
      }}
    >
      <span style={{ width: "2.6cqw", height: "2.6cqw", borderRadius: "50%", background: APP.terracotta }} />
    </span>
  );
}

function Chip({ label, tone, filled = false }: { label: string; tone: string; filled?: boolean }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "1.4cqw",
        padding: "1.8cqw 3.2cqw",
        borderRadius: "99cqw",
        background: filled ? tone : APP.card,
        color: filled ? "#FFFFFF" : APP.ink,
        fontSize: "3cqw",
        fontWeight: 600,
        border: filled ? "none" : `0.25cqw solid ${APP.hairline}`,
        whiteSpace: "nowrap",
        flex: "0 0 auto",
      }}
    >
      {!filled && <Dot color={tone} size="1.8cqw" />}
      {label}
    </span>
  );
}

function ChipRow() {
  return (
    <div style={{ display: "flex", gap: "1.8cqw", marginBottom: "5cqw", overflow: "visible" }}>
      <Chip label="Nicotine pouches" tone={APP.keepUnder} filled />
      <Chip label="Drink water" tone={APP.water} />
      <Chip label="Plan tomorrow" tone={APP.coral} />
    </div>
  );
}

// ── 2. TodayScreen ──────────────────────────────────────────────────────────

function PlusButton() {
  return (
    <span
      aria-hidden
      style={{
        width: "9cqw",
        height: "9cqw",
        borderRadius: "50%",
        background: APP.card,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 0.6cqw 2cqw rgba(0,0,0,0.08)",
        flex: "0 0 auto",
      }}
    >
      <IconPlus color={APP.ink} size="4.2cqw" />
    </span>
  );
}

function TodayHeader() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "5cqw" }}>
      <div>
        <p style={{ margin: 0, fontSize: "3.1cqw", fontWeight: 500, color: APP.sub }}>Morning, Lee</p>
        <div style={{ display: "flex", alignItems: "center", gap: "2.2cqw", marginTop: "0.6cqw" }}>
          <span style={{ fontSize: "7cqw", fontWeight: 800, color: APP.ink, lineHeight: 1 }}>Today</span>
          <span style={{ display: "flex", alignItems: "center", gap: "1cqw" }}>
            <Dot color={APP.green} size="1.6cqw" />
            <span style={{ ...labelSm, color: APP.green }}>ON TARGET</span>
          </span>
        </div>
        <p style={{ margin: "1cqw 0 0", fontSize: "3cqw", fontWeight: 500, color: APP.sub }}>Day 1</p>
      </div>
      <PlusButton />
    </div>
  );
}

const DATE_DATA = [
  { d: "S", n: 12 },
  { d: "M", n: 13 },
  { d: "T", n: 14 },
  { d: "W", n: 15 },
  { d: "T", n: 16 },
  { d: "F", n: 17 },
  { d: "S", n: 18 },
];
const ACTIVE_DATE_INDEX = 3;

function DateStrip() {
  return (
    <div style={{ display: "flex", gap: "1.8cqw", marginBottom: "6cqw", overflow: "visible" }}>
      {DATE_DATA.map((item, i) => {
        const active = i === ACTIVE_DATE_INDEX;
        return (
          <div
            key={`${item.d}-${item.n}`}
            style={{
              flex: "0 0 auto",
              width: "12cqw",
              height: "15cqw",
              borderRadius: "3.4cqw",
              background: active ? APP.keepUnder : APP.card,
              border: active ? "none" : `0.25cqw solid ${APP.hairline}`,
              boxShadow: active ? "0 1.4cqw 3cqw -1cqw rgba(75,98,208,0.45)" : "0 0.6cqw 1.6cqw rgba(0,0,0,0.03)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "1.4cqw",
            }}
          >
            <span style={{ fontSize: "2.4cqw", fontWeight: 700, letterSpacing: "0.05em", color: active ? "rgba(255,255,255,0.75)" : APP.sub }}>
              {item.d}
            </span>
            <span
              style={{
                position: "relative",
                width: "6.4cqw",
                height: "6.4cqw",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "4cqw",
                fontWeight: 700,
                color: active ? "#FFFFFF" : APP.ink,
              }}
            >
              {!active && <span aria-hidden style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `0.3cqw solid ${APP.hairline}` }} />}
              {item.n}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function StreakPill({ count }: { count: number }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.8cqw",
        padding: "1.4cqw 2.6cqw",
        borderRadius: "99cqw",
        background: APP.card,
        color: APP.ink,
        fontSize: "3cqw",
        fontWeight: 700,
        boxShadow: "0 0.6cqw 1.6cqw rgba(0,0,0,0.05)",
        flex: "0 0 auto",
        whiteSpace: "nowrap",
      }}
    >
      <span aria-hidden>🔥</span>
      {count}
    </span>
  );
}

function PlusOneCircle({ pressed }: { pressed: boolean }) {
  return (
    <span
      aria-hidden
      style={{
        width: "11cqw",
        height: "11cqw",
        borderRadius: "50%",
        background: pressed ? APP.keepUnderPressed : APP.keepUnder,
        color: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "3.6cqw",
        fontWeight: 700,
        flex: "0 0 auto",
        transform: pressed ? "scale(0.94)" : "scale(1)",
        boxShadow: pressed ? "0 0.4cqw 1cqw rgba(75,98,208,0.35)" : "0 1.4cqw 2.6cqw -1cqw rgba(75,98,208,0.55)",
      }}
    >
      +1
    </span>
  );
}

function MainTrackerCard({ mainCount, plusPressed }: { mainCount: number; plusPressed: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "3.2cqw",
        background: "rgba(75,98,208,0.08)",
        border: `0.4cqw solid ${APP.keepUnder}`,
        borderRadius: "5cqw",
        padding: "4cqw",
        marginBottom: "6cqw",
      }}
    >
      <CheckboxOutline color={APP.keepUnder} size="6cqw" />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.6cqw" }}>
          <span style={{ fontSize: "4.6cqw", fontWeight: 700, color: APP.ink }}>Nicotine pouches</span>
          <Dot color={APP.green} size="1.6cqw" />
        </div>
        <p style={{ margin: "1cqw 0 0", fontSize: "3.4cqw", fontWeight: 600, color: "rgba(75,98,208,0.75)" }}>{mainCount}/3 pouches</p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "2cqw" }}>
        <StreakPill count={2} />
        <PlusOneCircle pressed={plusPressed} />
        <IconChevron color={APP.sub} size="3.6cqw" />
      </div>
    </div>
  );
}

function BuildCard({ tint, icon, title, sub, action }: { tint: string; icon: ReactNode; title: string; sub: string; action: ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "2.8cqw", background: tint, borderRadius: "4.5cqw", padding: "3.6cqw" }}>
      <span
        aria-hidden
        style={{
          width: "8cqw",
          height: "8cqw",
          borderRadius: "50%",
          background: APP.card,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: "0 0 auto",
        }}
      >
        {icon}
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: 0, fontSize: "3.8cqw", fontWeight: 700, color: APP.ink }}>{title}</p>
        <p style={{ margin: "0.6cqw 0 0", fontSize: "3cqw", fontWeight: 500, color: APP.sub }}>{sub}</p>
      </div>
      {action}
    </div>
  );
}

function ActionPill({ children, bg }: { children: ReactNode; bg: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.8cqw 3.4cqw",
        borderRadius: "99cqw",
        background: bg,
        color: "#FFFFFF",
        fontSize: "3cqw",
        fontWeight: 700,
        whiteSpace: "nowrap",
        flex: "0 0 auto",
      }}
    >
      {children}
    </span>
  );
}

function TabBarItem({ active, icon, label }: { active: boolean; icon: ReactNode; label: string }) {
  if (active) {
    return (
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1.6cqw",
          background: APP.terracotta,
          color: "#FFFFFF",
          borderRadius: "99cqw",
          padding: "2.4cqw 4.4cqw",
          fontSize: "3.2cqw",
          fontWeight: 700,
        }}
      >
        {icon}
        {label}
      </span>
    );
  }
  return (
    <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.8cqw", padding: "1.6cqw", color: APP.sub }}>
      {icon}
      <span style={{ fontSize: "2.3cqw", fontWeight: 600 }}>{label}</span>
    </span>
  );
}

function TodayTabBar() {
  return (
    <div
      style={{
        marginTop: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: APP.card,
        borderRadius: "99cqw",
        padding: "1.6cqw",
        boxShadow: "0 1.6cqw 3.6cqw -1.6cqw rgba(0,0,0,0.22)",
      }}
    >
      <TabBarItem active icon={<IconHouse color="#FFFFFF" size="3.8cqw" />} label="Today" />
      <TabBarItem active={false} icon={<IconBars color={APP.sub} size="3.8cqw" />} label="Trends" />
      <TabBarItem active={false} icon={<IconTrendLine color={APP.sub} size="3.8cqw" />} label="Coach" />
      <TabBarItem active={false} icon={<IconPerson color={APP.sub} size="3.8cqw" />} label="You" />
    </div>
  );
}

export function TodayScreen({ mainCount = 0, plusPressed = false }: { mainCount?: number; plusPressed?: boolean }) {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        background: APP.screenBg,
        padding: `${TOP_PAD} ${SIDE_PAD} 3.6cqw`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TodayHeader />
      <DateStrip />
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "3.4cqw" }}>
        <span style={{ fontSize: "5cqw", fontWeight: 700, color: APP.ink }}>Your day</span>
        <span style={{ fontSize: "3cqw", fontWeight: 500, color: APP.sub }}>3 trackers</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "1.4cqw", marginBottom: "2.4cqw" }}>
        <Dot color={APP.keepUnder} size="1.6cqw" />
        <span style={{ ...labelSm, color: APP.keepUnder }}>MAIN · KEEP UNDER</span>
      </div>
      <MainTrackerCard mainCount={mainCount} plusPressed={plusPressed} />
      <p style={{ ...labelSm, color: APP.sub, marginBottom: "2cqw" }}>ALSO TODAY</p>
      <div style={{ display: "flex", alignItems: "center", gap: "1.4cqw", marginBottom: "2.4cqw" }}>
        <Dot color={APP.green} size="1.6cqw" />
        <span style={{ ...labelSm, color: APP.green }}>BUILD</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "2.6cqw", marginBottom: "5cqw" }}>
        <BuildCard
          tint="rgba(47,169,140,0.1)"
          icon={<IconDrop color={APP.water} size="4cqw" />}
          title="Drink water"
          sub="0/8 glasses"
          action={<ActionPill bg={APP.water}>+1</ActionPill>}
        />
        <BuildCard
          tint="rgba(217,105,76,0.1)"
          icon={<IconCalendar color={APP.coral} size="4cqw" />}
          title="Plan tomorrow"
          sub="0/1 day"
          action={<ActionPill bg={APP.coral}>Mark done</ActionPill>}
        />
      </div>
      <TodayTabBar />
    </div>
  );
}

// ── 3. TrendsScreen ──────────────────────────────────────────────────────────

function StatCard() {
  return (
    <div style={{ background: APP.card, borderRadius: "5cqw", padding: "4.4cqw", marginBottom: "3.2cqw", boxShadow: "0 0.8cqw 2cqw rgba(0,0,0,0.04)" }}>
      <p style={{ ...labelSm, color: APP.sub }}>TODAY</p>
      <p style={{ margin: "1cqw 0 3.6cqw", fontSize: "9cqw", fontWeight: 800, color: APP.ink, lineHeight: 1 }}>4 / 3</p>
      <div style={{ height: "0.25cqw", background: APP.hairline, marginBottom: "3.6cqw" }} />
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <p style={{ ...labelSm, color: APP.sub }}>THIS WEEK</p>
        <p style={{ margin: 0, fontSize: "5.4cqw", fontWeight: 800, color: APP.ink, textAlign: "right" }}>5 / 21</p>
      </div>
      <p style={{ margin: "2cqw 0 0", fontSize: "2.9cqw", fontWeight: 500, color: APP.sub }}>No week-over-week comparison yet.</p>
    </div>
  );
}

function TrendCard() {
  return (
    <div
      style={{
        background: APP.card,
        borderRadius: "5cqw",
        borderLeft: `1cqw solid ${APP.keepUnder}`,
        padding: "4.4cqw",
        marginBottom: "3.2cqw",
        boxShadow: "0 0.8cqw 2cqw rgba(0,0,0,0.04)",
      }}
    >
      <p style={{ ...labelSm, color: APP.sub }}>TREND</p>
      <p style={{ margin: "1.4cqw 0 0", fontSize: "3.6cqw", fontWeight: 500, color: APP.sub }}>Trend appears after your first week.</p>
    </div>
  );
}

const HEATMAP_CELLS = 30;
const HEATMAP_FILLED = 2;

function Heatmap() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: "1.2cqw" }}>
      {Array.from({ length: HEATMAP_CELLS }, (_, i) => {
        const filled = i >= HEATMAP_CELLS - HEATMAP_FILLED;
        return (
          <span
            key={i}
            aria-hidden
            style={{ aspectRatio: "1 / 1", borderRadius: "1cqw", background: filled ? APP.keepUnder : "rgba(75,98,208,0.12)" }}
          />
        );
      })}
    </div>
  );
}

function HeatmapLegendSwatch({ alpha }: { alpha: number }) {
  return (
    <span
      aria-hidden
      style={{ width: "1.8cqw", height: "1.8cqw", borderRadius: "0.5cqw", background: alpha >= 1 ? APP.keepUnder : `rgba(75,98,208,${alpha})` }}
    />
  );
}

function HeatmapCard() {
  return (
    <div style={{ background: APP.card, borderRadius: "5cqw", padding: "4.4cqw", boxShadow: "0 0.8cqw 2cqw rgba(0,0,0,0.04)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "3.4cqw" }}>
        <p style={{ ...labelSm, color: APP.sub }}>DAILY · 30 DAYS</p>
        <span style={{ display: "flex", alignItems: "center", gap: "1cqw", fontSize: "2.4cqw", fontWeight: 600, color: APP.sub }}>
          less
          <HeatmapLegendSwatch alpha={0.12} />
          <HeatmapLegendSwatch alpha={0.32} />
          <HeatmapLegendSwatch alpha={0.6} />
          <HeatmapLegendSwatch alpha={1} />
          more
        </span>
      </div>
      <Heatmap />
    </div>
  );
}

export function TrendsScreen() {
  return (
    <div aria-hidden style={{ position: "absolute", inset: 0, background: APP.screenBg, padding: `${TOP_PAD} ${SIDE_PAD} 4cqw`, display: "flex", flexDirection: "column" }}>
      <Avatar />
      <p style={{ margin: "0 0 4.4cqw", fontSize: "7cqw", fontWeight: 800, color: APP.ink }}>Trends</p>
      <ChipRow />
      <StatCard />
      <TrendCard />
      <HeatmapCard />
    </div>
  );
}

// ── 4. CoachScreen ───────────────────────────────────────────────────────────

function BigOutlineNumber() {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "2.4cqw", marginBottom: "4cqw" }}>
      <span aria-hidden style={{ fontSize: "30cqw", fontWeight: 800, lineHeight: 0.78, color: "transparent", WebkitTextStroke: `0.28cqw ${APP.ink}` }}>
        3
      </span>
      <span style={{ fontSize: "3.6cqw", fontWeight: 600, color: APP.sub, marginBottom: "1.6cqw" }}>a day</span>
    </div>
  );
}

function OverBar() {
  return <div aria-hidden style={{ height: "3.4cqw", borderRadius: "99cqw", background: APP.terracotta, marginBottom: "2.2cqw" }} />;
}

function NoteCard({ children }: { children: ReactNode }) {
  return (
    <div style={{ background: APP.card, borderRadius: "5cqw", padding: "4.4cqw", marginBottom: "3.2cqw", boxShadow: "0 0.8cqw 2cqw rgba(0,0,0,0.04)" }}>
      {children}
    </div>
  );
}

export function CoachScreen() {
  return (
    <div aria-hidden style={{ position: "absolute", inset: 0, background: APP.screenBg, padding: `${TOP_PAD} ${SIDE_PAD} 4cqw`, display: "flex", flexDirection: "column" }}>
      <Avatar />
      <p style={{ margin: "0 0 4.4cqw", fontSize: "7cqw", fontWeight: 800, color: APP.ink }}>Coach</p>
      <ChipRow />
      <p style={{ ...labelSm, color: APP.keepUnder, marginBottom: "1.4cqw" }}>TODAY</p>
      <p style={{ margin: "0 0 1cqw", fontSize: "7cqw", fontWeight: 800, color: APP.ink }}>Keep under</p>
      <BigOutlineNumber />
      <OverBar />
      <p style={{ margin: "0 0 4.4cqw", fontSize: "3.2cqw", fontWeight: 600, color: APP.sub }}>4 logged · over by 1</p>
      <NoteCard>
        <div style={{ display: "flex", gap: "2.2cqw" }}>
          <Dot color={APP.terracotta} size="1.8cqw" style={{ marginTop: "1.3cqw" }} />
          <p style={{ margin: 0, fontSize: "3.4cqw", fontWeight: 500, color: APP.ink, lineHeight: 1.4 }}>
            Your saved daily number is 3 pouches. You&rsquo;re over by 1 pouch today; the next day resets.
          </p>
        </div>
      </NoteCard>
      <NoteCard>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2.6cqw" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1.6cqw" }}>
            <IconMagnifier color={APP.sub} size="3.4cqw" />
            <span style={{ ...labelSm, color: APP.sub }}>Coach note</span>
          </div>
          <span style={{ fontSize: "2.8cqw", fontWeight: 600, color: APP.sub }}>Today</span>
        </div>
        <p style={{ margin: "0 0 1.6cqw", fontSize: "5cqw", fontWeight: 800, color: APP.ink }}>Don&rsquo;t chase it.</p>
        <p style={{ margin: 0, fontSize: "3.2cqw", fontWeight: 500, color: APP.sub, lineHeight: 1.5 }}>
          Nicotine pouches went 1 pouch over today. Tomorrow resets — don&rsquo;t chase it tonight.
        </p>
      </NoteCard>
    </div>
  );
}

// ── 5 & 6. WatchFrame + WatchTile ────────────────────────────────────────────
// Our own neutral CSS-drawn Watch-style device — not official Apple artwork.
// Representational assumption: exact chrome (crown position, bezel ratio) is
// a plausible approximation, not a pixel copy of watchOS.

export function WatchFrame({ children }: { children: ReactNode }) {
  return (
    <div
      role="img"
      aria-label="ONIS on a smartwatch"
      style={{
        position: "relative",
        width: "clamp(140px, 42vw, 220px)",
        aspectRatio: "1 / 1.2",
        background: "#111113",
        borderRadius: "28%",
        padding: "6%",
        boxShadow: "0 24px 48px -20px rgba(0,0,0,0.45), 0 8px 20px -12px rgba(0,0,0,0.35)",
      }}
    >
      <span aria-hidden style={{ position: "absolute", right: "-2.4%", top: "34%", width: "4%", height: "10%", borderRadius: "2px", background: "#111113" }} />
      <div style={{ ...containerize, position: "relative", width: "100%", height: "100%", borderRadius: "22%", overflow: "hidden", background: "#000000" }}>
        {children}
      </div>
    </div>
  );
}

function WatchRing() {
  const size = 20;
  const r = 8;
  const c = 2 * Math.PI * r;
  return (
    <svg width="16cqw" height="16cqw" viewBox={`0 0 ${size} ${size}`} aria-hidden>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(75,98,208,0.25)" strokeWidth={2.4} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={APP.keepUnder}
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeDasharray={`${c * 0.06} ${c}`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  );
}

export function WatchTile() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        background: "#000000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "3cqw",
        padding: "6cqw",
      }}
    >
      <WatchRing />
      <span style={{ fontSize: "4cqw", fontWeight: 500, color: "rgba(255,255,255,0.6)" }}>Nicotine</span>
      <span style={{ fontSize: "7.4cqw", fontWeight: 800, color: "#FFFFFF", lineHeight: 1 }}>0 / 3</span>
      <span style={{ fontSize: "4.4cqw", fontWeight: 700, color: "#FFFFFF", background: APP.keepUnder, borderRadius: "99cqw", padding: "1.6cqw 4.8cqw", marginTop: "1cqw" }}>
        +1
      </span>
    </div>
  );
}

// ── 7. HomeWidget ────────────────────────────────────────────────────────────
// Representational assumption: no official ONIS app-icon asset is available
// to this component, so the "ONIS mark" is a minimal drawn monogram (a
// terracotta rounded-square badge with an "O"), not the shipped app icon.

function OnisMark({ size = "6cqw" }: { size?: string }) {
  return (
    <span
      aria-hidden
      style={{
        width: size,
        height: size,
        borderRadius: "28%",
        background: APP.terracotta,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: `calc(${size} * 0.62)`,
        fontWeight: 800,
        color: "#FFFFFF",
        flex: "0 0 auto",
      }}
    >
      O
    </span>
  );
}

function WidgetRing() {
  const size = 20;
  const r = 8;
  const c = 2 * Math.PI * r;
  return (
    <svg width="9cqw" height="9cqw" viewBox={`0 0 ${size} ${size}`} aria-hidden>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(75,98,208,0.16)" strokeWidth={2.6} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={APP.keepUnder}
        strokeWidth={2.6}
        strokeLinecap="round"
        strokeDasharray={`${c * 0.06} ${c}`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  );
}

function SmallWidgetContent() {
  return (
    <div style={{ position: "absolute", inset: 0, padding: "13cqw", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <WidgetRing />
        <OnisMark size="7cqw" />
      </div>
      <div>
        <p style={{ margin: 0, fontSize: "9cqw", fontWeight: 800, color: APP.ink, lineHeight: 1 }}>0/3</p>
        <p style={{ margin: "2cqw 0 0", fontSize: "5cqw", fontWeight: 500, color: APP.sub, lineHeight: 1.2 }}>Nicotine pouches</p>
      </div>
    </div>
  );
}

function MiniBarRow() {
  const heights = [30, 55, 40, 70, 20, 85, 45];
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "1.6cqw", height: "12cqw" }}>
      {heights.map((h, i) => (
        <span
          key={i}
          aria-hidden
          style={{ width: "1.8cqw", height: `${h}%`, borderRadius: "1cqw", background: i === heights.length - 1 ? APP.keepUnder : "rgba(75,98,208,0.22)" }}
        />
      ))}
    </div>
  );
}

function MediumWidgetContent() {
  return (
    <div style={{ position: "absolute", inset: 0, padding: "10cqw 11cqw", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "6cqw" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "2cqw" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "2.4cqw" }}>
          <WidgetRing />
          <OnisMark size="5.4cqw" />
        </div>
        <p style={{ margin: 0, fontSize: "6.4cqw", fontWeight: 800, color: APP.ink, lineHeight: 1 }}>0/3</p>
        <p style={{ margin: 0, fontSize: "3.6cqw", fontWeight: 500, color: APP.sub }}>Nicotine pouches</p>
      </div>
      <MiniBarRow />
    </div>
  );
}

export function HomeWidget({ size = "small" }: { size?: "small" | "medium" }) {
  const isMedium = size === "medium";
  return (
    <div
      aria-hidden
      style={{
        position: "relative",
        width: isMedium ? "clamp(220px, 46vw, 300px)" : "clamp(108px, 30vw, 148px)",
        aspectRatio: isMedium ? "2.15 / 1" : "1 / 1",
        background: APP.card,
        borderRadius: "22%",
        boxShadow: "0 16px 32px -18px rgba(0,0,0,0.28), 0 4px 10px -6px rgba(0,0,0,0.12)",
        overflow: "hidden",
      }}
    >
      <div style={{ ...containerize, position: "relative", width: "100%", height: "100%" }}>{isMedium ? <MediumWidgetContent /> : <SmallWidgetContent />}</div>
    </div>
  );
}
