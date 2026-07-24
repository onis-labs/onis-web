// ── Site-wide configuration ───────────────────────────────────────────────
// One place for identity, launch state, contact, and platform requirements.
// No component should hardcode these values. Pricing lives in ./pricing.ts.

export const site = {
  name: "ONIS",
  domain: "onis.club",
  url: "https://onis.club",
  supportEmail: "support@onis.club",
  // Brand support line — the launch positioning.
  tagline: "One tap keeps the real count.",
} as const;

// App Store launch state.
// Verified 2026-07-22 against iOS AppConstants.swift: `appStoreID = nil` and no
// apps.apple.com URL exists anywhere in the project — the app is not yet live.
// So `isLive` stays false and the badge renders a truthful, non-clickable
// "Launching on the App Store" state. At launch: set the real `appStoreId` +
// `productUrl` and flip `isLive = true`; every badge/CTA reads from here, so
// nothing else changes.
export const appStore = {
  isLive: false,
  appStoreId: "", // e.g. "id0000000000" — paste once the App Store record exists
  productUrl: "", // e.g. "https://apps.apple.com/us/app/onis/id0000000000"
  badgeLocale: "en-us",
  comingSoonLabel: "Launching on the App Store",
  supportEmail: site.supportEmail,
  minimumIOS: "iOS 17 or later",
  minimumWatchOS: "watchOS 10 or later",
} as const;

// Platform requirements.
// Verified 2026-07-22 against ONIS project.yml:
// iOS deployment target 17.0, watchOS deployment target 10.0.
// Apple Watch is optional (companion app; iPhone is the primary install).
export const requirements = {
  ios: appStore.minimumIOS,
  watchos: appStore.minimumWatchOS,
  watchOptional: true,
} as const;

// Legal effective / last-updated date (ISO). Update on any material change.
export const legalUpdated = "2026-07-24";
