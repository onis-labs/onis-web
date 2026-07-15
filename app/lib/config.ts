// ── Site-wide configuration ───────────────────────────────────────────────
// One place for identity, launch state, contact, and platform requirements.
// No component should hardcode these values.

export const site = {
  name: "ONIS",
  domain: "onis.club",
  url: "https://onis.club",
  supportEmail: "support@onis.club",
  // Footer / brand line for the new positioning.
  tagline: "Designed for honest progress.",
} as const;

// App Store launch state.
// Pre-launch: render the official badge as a non-clickable "coming soon" state.
// At launch: set `isLive = true` and fill in the real product URL. Nothing else
// on the site needs to change — the badge and CTAs read from here.
export const appStore = {
  isLive: false,
  productUrl: "", // e.g. "https://apps.apple.com/app/onis/id0000000000"
  comingSoonLabel: "Coming to the App Store",
} as const;

// Platform requirements.
// ⚠️ VERIFY against the shipped Release build before launch — carried over from
// the previous support page and not confirmable from source in this repo.
export const requirements = {
  ios: "iOS 17 or later",
  watchos: "watchOS 10 or later",
} as const;

// Legal effective / last-updated date (ISO). Update on any material change.
export const legalUpdated = "2026-07-15";
