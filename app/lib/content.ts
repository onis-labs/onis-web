// ── Editorial content ─────────────────────────────────────────────────────
// Navigation, the Build/Reduce/Track model, and FAQ. Copy lives here so the
// voice stays consistent and there is a single place to keep it truthful.

export interface NavItem {
  label: string;
  href: string;
}

// In-page anchors + the Support route. Section ids must match the components.
export const nav: NavItem[] = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Watch & widgets", href: "#watch-widgets" },
  { label: "Privacy", href: "#privacy" },
  { label: "Pricing", href: "#pricing" },
  { label: "Support", href: "/support" },
];

// The three intentions ONIS supports. Each has its own tracker color + action
// verb so the site never treats them as identical.
export interface Intention {
  id: "build" | "reduce" | "track";
  label: string;
  promise: string;
  action: string; // the tracker's primary verb
  example: { name: string; unit: string; state: string };
  examples: string[];
  colorVar: string; // CSS var from the token palette
}

export const intentions: Intention[] = [
  {
    id: "build",
    label: "Build",
    promise: "Do more of what matters.",
    action: "Start",
    example: { name: "Read a book", unit: "12 of 20 minutes", state: "in progress" },
    examples: ["Drink water", "Read", "Meditate", "Study", "Plan tomorrow", "Wake up on time"],
    colorVar: "var(--track-water)",
  },
  {
    id: "reduce",
    label: "Reduce",
    promise: "Set a limit without shame.",
    action: "+1",
    example: { name: "Coffee", unit: "2 of 3 cups", state: "under target" },
    examples: ["Nicotine pouches", "Cigarettes", "Vape", "Alcohol", "Coffee", "Energy drinks", "Takeout"],
    colorVar: "var(--track-keepunder)",
  },
  {
    id: "track",
    label: "Track",
    promise: "Notice what happens without forcing a goal.",
    action: "Log",
    example: { name: "Plan tomorrow", unit: "Not logged", state: "neutral" },
    examples: ["Mood", "Symptoms", "Body measurements", "Health checkups", "Personal events", "Custom trackers"],
    colorVar: "var(--track-mind)",
  },
];

export interface Faq {
  q: string;
  a: string;
}

// Kept truthful and aligned with the shipped feature set. Items that name a
// specific in-app control are marked in the source comment for final Release
// verification.
export const faqs: Faq[] = [
  {
    q: "Do I need an account?",
    a: "No. There is no ONIS account, no sign-in, and no email required. Your habit history stays on your device.",
  },
  {
    q: "Does it work on Apple Watch?",
    a: "Yes. Log with one tap from your wrist, and your iPhone and widgets stay in sync. There are also Home Screen and Lock Screen widgets and Watch complications.",
  },
  {
    q: "What can I track?",
    a: "Three intentions: Build something you want to do more, Reduce something you want to keep under a limit, or simply Track something to notice the pattern — no forced goal.",
  },
  {
    q: "How much does ONIS cost?",
    a: "Core tracking is free. ONIS Premium unlocks full Trends, Coach, and unlimited trackers — Weekly $2.99, Yearly $14.99, or a one-time Lifetime $24.99. Prices and offer eligibility are confirmed by Apple at purchase.",
  },
  {
    q: "Is there a free trial?",
    a: "An introductory trial is available to eligible customers on the Weekly and Yearly plans. Lifetime is a one-time purchase with no trial. Apple confirms eligibility at purchase.",
  },
  {
    q: "Is my data private?",
    a: "Yes. No ONIS account, no ads, and no analytics on your habit history. Data is stored locally and syncs directly between your iPhone and Apple Watch.",
  },
  {
    q: "Can ONIS help me quit something?",
    a: "ONIS is an honest awareness tracker, not medical advice. You set your own targets and decide what a good next step is — ONIS just makes the pattern visible.",
  },
  {
    q: "How do I delete my data?",
    // Control names verified 2026-07-15 against iOS PrivacyView.swift (exact
    // SwiftUI string literals: "Export My Data", "Clear Log History",
    // "Start Over", "Delete All ONIS Data").
    a: "In the app you can Export My Data, Clear Log History, Start Over, or Delete All ONIS Data. Deleting also removes ONIS data from the paired Apple Watch. Purchases remain managed by Apple.",
  },
];
