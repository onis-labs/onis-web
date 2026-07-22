// ── Pricing source of truth ───────────────────────────────────────────────
// Verified 2026-07-22 against the shipping iOS source (READ-ONLY):
//   • ONIS.storekit — exactly one product on sale: com.onis.app.lifetime,
//     a $9.99 one-time NonConsumable ("ONIS Lifetime"). No renewing
//     subscriptions of any kind, no weekly/yearly products, no groups.
//   • PremiumPreview.swift / SubscriptionManager.swift — the 7-day Premium
//     access is a $0 local grant (Keychain): no StoreKit request, no payment
//     sheet, no subscription, no renewal, no automatic charge. One per device.
//     At expiry ONIS returns to Free unless Lifetime was purchased.
//   • FreeTier.swift — free tier: up to 7 active trackers (6 free starter
//     templates + 1 custom slot). Logging is never gated: Today, timers,
//     Apple Watch, widgets, export, and reminders are all free.
//   • MainTabView.swift / TemplateLibraryView.swift — Premium gates: Trends,
//     Coach, the full template library, and unlimited trackers.
// The dollar string "$9.99" must appear ONLY in this file; every page and
// FAQ answer interpolates from here (enforced by scripts/verify-content.mjs).

export const lifetimePrice = "$9.99";

export const pricing = {
  headline: "Premium without another subscription.",
  free: {
    name: "Free",
    price: "$0",
    blurb: "Start tracking for free.",
    // Verified against FreeTier.swift — free is genuinely capable.
    features: [
      "One-tap logging on iPhone, Apple Watch, and widgets",
      "6 starter trackers plus 1 custom — up to 7 active",
      "Timers, reminders, and full history",
      "Export and data controls",
      "No ONIS account",
    ],
  },
  trial: {
    name: "7-Day Premium Access",
    offer: "Try Premium free for 7 days.",
    disclosure: "$0 today · No subscription · No automatic charge",
    detail:
      "After seven days, ONIS returns to Free unless you choose Lifetime.",
  },
  lifetime: {
    name: "ONIS Lifetime",
    price: lifetimePrice,
    offer: `ONIS Lifetime — ${lifetimePrice} once`,
    supporting: "One payment · Permanent Premium access · No renewal",
  },
  // Verified Premium gates (MainTabView.swift, TemplateLibraryView.swift).
  premiumIncludes: [
    "Trends — patterns from what you actually logged",
    "Coach — one calm next step, every day",
    "Full template library",
    "Unlimited trackers",
  ],
  postTrial: "After seven days, continue with Free or choose Lifetime.",
  postTrialLong: `After seven days, continue with Free or unlock Lifetime for ${lifetimePrice}.`,
  cta: "Get ONIS",
} as const;

// Shown near the pricing area and in the FAQ. StoreKit wording — Apple
// confirms the localized price at purchase.
export const priceDisclaimer =
  "Apple confirms the localized price at purchase.";
