// ── Editorial content ─────────────────────────────────────────────────────
// Navigation, the Build/Reduce/Understand directions, and FAQ. Copy lives
// here so the voice stays consistent and there is one place to keep it
// truthful. Prices are always interpolated from lib/pricing — never typed.

import {
  foundingLifetimePrice,
  lifetimePrice,
  priceDisclaimer,
  yearlyPrice,
} from "./pricing";

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
    a: "Free includes core Today logging, a limited tracker allowance, timers, reminders, full history, and export. No account required. Continue with Free anytime.",
  },
  {
    q: "What does Premium include?",
    a: "Premium unlocks Trends, Coach, the full template library, and unlimited trackers — whether you choose Yearly or Lifetime.",
  },
  {
    q: "How much does ONIS cost?",
    a: `ONIS includes a Free experience. Premium Yearly is ${yearlyPrice} per year and may include a seven-day introductory trial for eligible customers. ONIS Lifetime is ${lifetimePrice} once with no renewal. ${priceDisclaimer}`,
  },
  {
    q: "Does Lifetime include a free trial?",
    a: "Lifetime is a one-time purchase and does not renew. Eligible users may first experience the separate seven-day Premium preview before deciding whether to choose Yearly, Lifetime, or continue with Free.",
  },
  {
    q: "What happens after the Yearly trial?",
    a: "The Yearly subscription renews at the displayed annual price unless it is cancelled through Apple before the trial ends.",
  },
  {
    q: "Does Lifetime renew?",
    a: "No. ONIS Lifetime is one payment for permanent Premium access.",
  },
  {
    q: `Why do I see a ${foundingLifetimePrice} offer?`,
    a: "Some eligible users may receive a limited founding offer for Lifetime. Availability and final pricing are confirmed by Apple.",
  },
  {
    q: "Will Lifetime automatically charge after the Premium preview?",
    a: "No. The seven-day Premium preview does not automatically charge Lifetime. Yearly only renews if you start an eligible Yearly subscription and do not cancel before renewal. Lifetime charges only when you choose the one-time purchase.",
  },
  {
    q: "Can I continue with Free?",
    a: "Yes. Free remains fully usable. After a Premium preview ends, ONIS returns to Free unless you choose Yearly or Lifetime.",
  },
  {
    q: "How do I manage or cancel Yearly?",
    a: "Manage or cancel the Premium Yearly subscription in your Apple ID subscription settings. ONIS does not process subscription billing on this website.",
  },
  {
    q: "How do I restore a purchase?",
    a: "Use Restore Purchases in the app. App Store purchases stay with your Apple ID and can be restored on devices signed into that account.",
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
