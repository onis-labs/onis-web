// ── Pricing source of truth ───────────────────────────────────────────────
// The website mirrors the app's launch offers. Actual localized prices and
// introductory-offer eligibility are confirmed by Apple at purchase — never
// promise a trial to everyone.
//
// ⚠️ The Free vs Premium split (`featureMatrix`) is PROPOSED. It follows the
// site's own narrative ("upgrade when Trends, Coach, and more become valuable")
// but must be confirmed against the app's entitlement code (FreeTier /
// SubscriptionManager) before launch. It is intentionally centralized here so
// that confirmation is a one-file change.

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
    blurb: "Core tracking, no account.",
    note: "Start here. Upgrade only if it earns it.",
    cta: "Start free",
  },
  {
    id: "yearly",
    name: "Premium — Yearly",
    price: "$14.99",
    cadence: "per year",
    blurb: "Full Trends, Coach, and unlimited trackers.",
    note: "Introductory trial available to eligible customers.",
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
    note: "Introductory trial available to eligible customers.",
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

// Free vs Premium — PROPOSED matrix (confirm gating before launch).
export interface MatrixRow {
  feature: string;
  free: boolean | string;
  premium: boolean | string;
}

export const featureMatrix: MatrixRow[] = [
  { feature: "One-tap logging — iPhone & Apple Watch", free: true, premium: true },
  { feature: "Main tracker + starter trackers", free: true, premium: true },
  { feature: "Today view & daily goals", free: true, premium: true },
  { feature: "Widgets & complications", free: true, premium: true },
  { feature: "Trends", free: "Basic", premium: "Full history & timing" },
  { feature: "Coach", free: false, premium: true },
  { feature: "Unlimited trackers", free: false, premium: true },
];
