// ── Pricing source of truth ───────────────────────────────────────────────
// Verified 2026-07-15 against the iOS source (READ-ONLY):
//   • Prices/trials: ONIS.storekit — yearly com.onis.app.premium.yearly $14.99
//     (7-day trial), weekly com.onis.app.premium.weekly $2.99 (3-day trial),
//     lifetime com.onis.app.lifetime $24.99 (no trial).
//   • Free/Premium gating: FreeTier.swift (maxActiveTrackers = 7, customSlots = 1)
//     and MainTabView.swift (Trends + Coach are fully Premium-gated).
// The $19.99 "lifetime.launch" exit-only fallback is intentionally NOT listed —
// it only appears in-app after a paywall is dismissed, and must not be marketed.
// Actual localized prices and trial eligibility are confirmed by Apple at
// purchase — never promise a trial to everyone.

export type PlanId = "free" | "weekly" | "yearly" | "lifetime";

export interface Plan {
  id: PlanId;
  name: string;
  price: string; // display price
  cadence: string; // "forever" | "per week" | "per year" | "one time"
  blurb: string;
  note?: string; // trial / renewal note
  badge?: string; // e.g. "Best value"
  cta: string;
  highlight?: boolean; // visually recommended
}

export const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    cadence: "forever",
    blurb: "Up to 7 trackers on iPhone & Apple Watch. No account.",
    note: "Everything you need to start. Upgrade only if it earns it.",
    cta: "Start free",
  },
  {
    id: "yearly",
    name: "Premium — Yearly",
    price: "$14.99",
    cadence: "per year",
    blurb: "Trends, Coach, and unlimited trackers.",
    note: "7-day free trial for eligible customers.",
    badge: "Best value",
    cta: "Get Premium",
    highlight: true,
  },
  {
    id: "weekly",
    name: "Premium — Weekly",
    price: "$2.99",
    cadence: "per week",
    blurb: "The same Premium, week to week.",
    note: "3-day free trial for eligible customers.",
    cta: "Get Premium",
  },
  {
    id: "lifetime",
    name: "Lifetime",
    price: "$24.99",
    cadence: "one time",
    blurb: "Prefer one payment? Pay once, keep it.",
    note: "No renewal. No trial.",
    cta: "Buy once",
  },
];

// Shown near the pricing table and in the FAQ.
export const priceDisclaimer =
  "Prices and offer eligibility are confirmed by Apple at purchase.";

// Free vs Premium — verified against FreeTier.swift + MainTabView.swift.
// Free is a genuinely capable tier: all logging surfaces, timers, full history,
// export, and up to 7 trackers (1 custom). Premium adds Trends, Coach, the full
// template library, and unlimited trackers.
export interface MatrixRow {
  feature: string;
  free: boolean | string;
  premium: boolean | string;
}

export const featureMatrix: MatrixRow[] = [
  { feature: "One-tap logging — iPhone, Watch, widgets", free: true, premium: true },
  { feature: "Today, timers, and full history", free: true, premium: true },
  { feature: "Widgets & Watch complications", free: true, premium: true },
  { feature: "Export & data controls", free: true, premium: true },
  { feature: "Active trackers", free: "Up to 7", premium: "Unlimited" },
  { feature: "Custom trackers", free: "1", premium: "Unlimited" },
  { feature: "Full template library", free: false, premium: true },
  { feature: "Trends", free: false, premium: true },
  { feature: "Coach", free: false, premium: true },
];
