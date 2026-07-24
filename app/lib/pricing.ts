// ── Pricing source of truth ───────────────────────────────────────────────
// Final public monetization model for the ONIS website.
//
// All visible prices, FAQs, metadata, structured data, legal copy, and CTAs
// must consume this file. Dollar strings for public and gated offers appear
// ONLY here (enforced by scripts/verify-content.mjs).
//
// StoreKit / App Store Connect gates
// ----------------------------------
// Public plans (Free, Yearly, Lifetime) are the intended public offer set.
// The $12.99 founding fallback and any countdown remain OFF until a real
// StoreKit-backed product / offer code and genuine campaign expiry exist.
// Flip the flags below only after App Store Connect verification — never
// advertise a discount or timer the store cannot honor.
//
// Website purchase behavior: this site never processes payment for digital
// Premium. CTAs deep-link to the App Store product page (or show the
// launching state when ONIS is not live yet).

import { appStore } from "./config";

// ── Public plan prices (USD display strings) ──────────────────────────────
export const freePrice = "$0";
export const yearlyPrice = "$9.99";
export const lifetimePrice = "$19.99";

/** Gated founding offer — never surface unless storeKitConfigured + eligible. */
export const foundingLifetimePrice = "$12.99";

export const yearlyTrialDays = 7;

export const priceDisclaimer =
  "Prices and eligibility are confirmed by Apple at purchase.";

export const storefrontQualification =
  "Available on the App Store for iPhone. Apple confirms the localized price and eligibility at purchase.";

/** ISO timestamp for a real campaign end, or null when no genuine expiry exists. */
export type CampaignExpiresAt = string | null;

export const pricing = {
  headline: "Simple pricing. Keep Free, or go Premium",
  kicker: "Fair pricing",

  // Shared Premium-preview concept — only truthful because the app provides
  // a separate verified seven-day Premium preview (local grant). Does not
  // imply Lifetime auto-charges after the preview.
  premiumPreview: {
    enabled: true,
    line: "Try Premium free for 7 days, then choose Yearly or Lifetime.",
  },

  free: {
    id: "free" as const,
    name: "Free",
    price: freePrice,
    blurb: "Start tracking without an account.",
    cta: "Download ONIS",
    features: [
      "Core Today logging",
      "Limited tracker allowance",
      "No account required",
      "Continue with Free anytime",
    ],
  },

  yearly: {
    id: "yearly" as const,
    badge: "Flexible",
    name: "Premium Yearly",
    price: yearlyPrice,
    priceSuffix: "/ year",
    priceDisplay: `${yearlyPrice} / year`,
    // Introductory trial for eligible customers (Apple confirms eligibility).
    trial: "7 days free for eligible customers",
    trialDays: yearlyTrialDays,
    renewalDisclosure: "Renews annually unless cancelled.",
    cta: "Start 7 days free",
    // Auto-renewable annual subscription — never call this a one-time purchase.
    kind: "auto-renewable subscription" as const,
  },

  lifetime: {
    id: "lifetime" as const,
    badge: "Best value",
    name: "ONIS Lifetime",
    price: lifetimePrice,
    priceSuffix: "once",
    priceDisplay: `${lifetimePrice} once`,
    disclosure: "One payment · Permanent access · No renewal",
    cta: "Unlock Lifetime",
    // Non-consumable — no subscription, no renewal, no automatic charge.
    kind: "non-consumable" as const,
    // Lifetime itself has no introductory subscription trial.
    hasIntroductoryTrial: false,
    // Truthful comparison only — not a fake crossed-out price or false discount.
    comparison: "Lifetime costs about the same as two years of Yearly.",
  },

  premiumIncludes: [
    "Trends — patterns from what you actually logged",
    "Coach — one calm next step, every day",
    "Full template library",
    "Unlimited trackers",
  ],

  // ── Founding Lifetime fallback (NOT public; NOT in SEO) ─────────────────
  // Show only when ALL of: storeKitConfigured, eligible, not purchased,
  // not dismissed this session, and (if campaignExpiresAt is set) not expired.
  // Do not purchase the normal $19.99 product under this price text.
  foundingLifetime: {
    title: "Founding Lifetime Offer",
    price: foundingLifetimePrice,
    supporting: "Save $7 on permanent Premium access.",
    // Accurate only vs the $19.99 standard Lifetime ($7 ≈ 35%).
    badge: "About 35% off",
    cta: `Get Lifetime for ${foundingLifetimePrice}`,
    secondary: "Not now",
    disclosure: "One payment · No subscription · No trial · No renewal",
    savingsAmount: "$7",
    savingsVersus: lifetimePrice,

    /**
     * HARD GATE — keep false until a real App Store offer code / alternate
     * non-consumable at $12.99 is configured and purchasable.
     */
    storeKitConfigured: false,

    /**
     * Website eligibility. Remains false until StoreKit is verified.
     * Even when true, session dismiss + expiry still apply.
     */
    eligible: false,

    /**
     * Genuine fixed campaign end (ISO 8601). null = no countdown, and the
     * offer is not time-limited on the website. Never invent a repeating timer.
     */
    campaignExpiresAt: null as CampaignExpiresAt,

    /** Session key — dismiss once per browser session; never reopen. */
    sessionDismissKey: "onis-founding-lifetime-dismissed",

    /** Optional StoreKit / offer identifiers (fill after ASC setup). */
    storeKitProductId: "",
    offerCode: "",
  },

  /** Primary nav CTA when the App Store page is not live yet. */
  cta: "Get ONIS",

  appStoreUrl: appStore.productUrl,
  isLive: appStore.isLive,
  storefrontQualification,
} as const;

/** Public offers only — never include the founding fallback in SEO/JSON-LD. */
export function publicOffersForSchema() {
  return [
    {
      "@type": "Offer" as const,
      name: pricing.free.name,
      price: "0",
      priceCurrency: "USD",
    },
    {
      "@type": "Offer" as const,
      name: pricing.yearly.name,
      price: yearlyPrice.replace(/[^0-9.]/g, ""),
      priceCurrency: "USD",
      description: pricing.yearly.renewalDisclosure,
    },
    {
      "@type": "Offer" as const,
      name: pricing.lifetime.name,
      price: lifetimePrice.replace(/[^0-9.]/g, ""),
      priceCurrency: "USD",
      description: pricing.lifetime.disclosure,
    },
  ];
}

/**
 * Whether the founding fallback may be shown right now.
 * Does not check session dismiss (callers must). Website cannot verify
 * Apple purchase receipts — treat as not purchased unless a future
 * integration proves otherwise.
 */
export function isFoundingOfferActive(now: Date = new Date()): boolean {
  const offer = pricing.foundingLifetime;
  if (!offer.storeKitConfigured || !offer.eligible) return false;
  if (!offer.campaignExpiresAt) {
    // Configured but no genuine expiry: allowed without a timer.
    return true;
  }
  const ends = Date.parse(offer.campaignExpiresAt);
  if (Number.isNaN(ends)) return false;
  return now.getTime() < ends;
}

/** True only when a real campaignExpiresAt is set and the offer is active. */
export function shouldShowFoundingCountdown(now: Date = new Date()): boolean {
  const offer = pricing.foundingLifetime;
  if (!isFoundingOfferActive(now)) return false;
  return typeof offer.campaignExpiresAt === "string" && offer.campaignExpiresAt.length > 0;
}

export function foundingMsRemaining(now: Date = new Date()): number | null {
  const iso = pricing.foundingLifetime.campaignExpiresAt;
  if (!iso || !shouldShowFoundingCountdown(now)) return null;
  const ends = Date.parse(iso);
  if (Number.isNaN(ends)) return null;
  return Math.max(0, ends - now.getTime());
}

export function formatCountdown(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

/** App Store destination for purchase CTAs — never an external checkout. */
export function purchaseHref(): string | null {
  if (appStore.isLive && appStore.productUrl) return appStore.productUrl;
  return null;
}
