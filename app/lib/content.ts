// ── Editorial content ─────────────────────────────────────────────────────
// Navigation, the Build/Reduce/Understand directions, and FAQ. Copy lives
// here so the voice stays consistent and there is one place to keep it
// truthful. Prices are always interpolated from lib/pricing — never typed.

import { lifetimePrice, priceDisclaimer } from "./pricing";

export interface NavItem {
  label: string;
  href: string;
}

// In-page anchors + the Support route. Section ids must match the components.
export const nav: NavItem[] = [
  { label: "Product", href: "#product" },
  { label: "Apple Watch", href: "#apple-watch" },
  { label: "Widgets", href: "#widgets" },
  { label: "Trends", href: "#trends" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Support", href: "/support" },
];

// The three tracking directions. The approved marketing uses
// Build / Reduce / Understand; the in-app control for the third direction is
// labeled "Track" — the footnote keeps that honest.
export interface Mode {
  id: "build" | "reduce" | "understand";
  label: string;
  promise: string;
  examples: string[];
  colorVar: string; // CSS var from the token palette, matches the frame pills
}

export const modes: Mode[] = [
  {
    id: "build",
    label: "Build",
    promise: "Grow what matters.",
    examples: ["Drink water", "Read", "Study", "Plan tomorrow"],
    colorVar: "var(--track-water)",
  },
  {
    id: "reduce",
    label: "Reduce",
    promise: "Set a limit and keep an honest count.",
    examples: ["Coffee", "Fast food", "Scrolling"],
    colorVar: "var(--track-reading)",
  },
  {
    id: "understand",
    label: "Understand",
    promise: "Track something without forcing a goal.",
    examples: ["Mood", "Symptoms", "Personal events", "Custom trackers"],
    colorVar: "var(--success)",
  },
];

// Shown as a small footnote under the modes — keeps marketing and the real
// in-app control honest with each other.
export const modesFootnote =
  'In the app, the Understand direction is labeled "Track."';

export interface Faq {
  q: string;
  a: string;
}

// All answers verified 2026-07-22 against the shipping iOS source
// (FreeTier.swift, PremiumPreview.swift, ONIS.storekit, PrivacyView.swift,
// WatchSync.swift, ONISWidget.swift). Prices interpolate from lib/pricing.
export const faqs: Faq[] = [
  {
    q: "What is ONIS?",
    a: "ONIS is a habit tracker for iPhone, Apple Watch, and widgets. You log small moments with one tap — build a habit, reduce one, or simply understand it — and ONIS turns those taps into patterns you can act on.",
  },
  {
    q: "Do I need an account?",
    a: "No. There is no ONIS account, no sign-in, and no email. Your habit history stays on your device.",
  },
  {
    q: "Does ONIS work on Apple Watch?",
    a: "Yes. The Watch app lists your trackers, logs counts with one tap, runs timers with pause and resume, and marks things done. It syncs directly with your iPhone — no cloud in between.",
  },
  {
    q: "How do widgets work?",
    a: "Add an ONIS widget from the iOS widget gallery and choose which tracker it shows. Widgets show today's progress and support one-tap actions like +1 and Done, plus arrows to switch trackers. Timer actions open the app.",
  },
  {
    q: "What can I track?",
    a: 'Three directions: Build something you want to grow, Reduce something you want to keep under an honest limit, or track something — like mood or symptoms — without any goal. In the app, that third direction is labeled "Track."',
  },
  {
    q: "What is Free?",
    a: "Free includes one-tap logging on iPhone, Apple Watch, and widgets, 6 starter trackers plus 1 custom tracker (up to 7 active), timers, reminders, full history, and export. No account required.",
  },
  {
    q: "What does Premium include?",
    a: "Premium unlocks Trends, Coach, the full template library, and unlimited trackers.",
  },
  {
    q: "How does the 7-day trial work?",
    a: `The 7-day Premium trial costs $0. It is not a subscription and does not renew. After seven days, ONIS returns to Free unless you choose Lifetime for ${lifetimePrice}.`,
  },
  {
    q: "Will I be charged automatically?",
    a: "No. The trial is $0, there is no automatic charge, and there is nothing to cancel. ONIS has no subscriptions — the only purchase is the one-time ONIS Lifetime, and Apple processes it only when you choose it.",
  },
  {
    q: "How much is Lifetime?",
    a: `ONIS Lifetime is ${lifetimePrice}, once. One payment, permanent Premium access, no renewal. ${priceDisclaimer}`,
  },
  {
    q: "Can I continue with Free?",
    a: "Yes. After the trial, ONIS returns to Free on its own, and your trackers and history stay. Free remains fully usable.",
  },
  {
    q: "Is ONIS medical advice?",
    a: "No. ONIS is for personal awareness only. It does not diagnose, treat, or replace professional care.",
  },
  {
    q: "How do I export or delete my data?",
    a: "In the app, use Export My Data (JSON and CSV), Clear Log History, Start Over, or Delete All ONIS Data. Deleting also removes ONIS data from the paired Apple Watch. App Store purchases stay with Apple and can be restored.",
  },
];
