// ── Site-wide configuration ───────────────────────────────────────────────
// One place for identity, launch state, contact, and platform requirements.
// No component should hardcode these values. Pricing lives in ./pricing.ts.

export const site = {
  name: "ONIS",
  domain: "onis.club",
  url: "https://onis.club",
  supportEmail: "support@onis.club",
  // Footer / brand line for the new positioning.
  tagline: "Designed for honest progress.",
} as const;

// App Store launch state.
// Verified 2026-07-15 against iOS AppConstants.swift: `appStoreID = nil` and no
// apps.apple.com URL exists anywhere in the project — the app is not yet live.
// So `isLive` stays false and the badge renders a truthful, non-clickable
// "coming soon" state. At launch: set the real `appStoreId` + `productUrl` and
// flip `isLive = true`; every badge/CTA reads from here, so nothing else changes.
export const appStore = {
  isLive: false,
  appStoreId: "", // e.g. "id0000000000" — paste once the App Store record exists
  productUrl: "", // e.g. "https://apps.apple.com/us/app/onis/id0000000000"
  badgeLocale: "en-us",
  comingSoonLabel: "Coming to the App Store",
} as const;

// Platform requirements.
// Verified 2026-07-15 against ONIS.xcodeproj/project.pbxproj:
// IPHONEOS_DEPLOYMENT_TARGET = 17.0, WATCHOS_DEPLOYMENT_TARGET = 10.0.
// Apple Watch is optional (companion app; iPhone is the primary install).
export const requirements = {
  ios: "iOS 17 or later",
  watchos: "watchOS 10 or later",
  watchOptional: true,
} as const;

// Legal effective / last-updated date (ISO). Update on any material change.
export const legalUpdated = "2026-07-15";
