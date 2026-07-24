#!/usr/bin/env node
// ── Launch content guard ──────────────────────────────────────────────────
// Fails when stale pricing language reappears anywhere in tracked source,
// and when allowed price strings escape the central pricing config.
// Run via `npm test`.
//
// Callers: package.json "test" script / CI.
// User: "Run a final stale-copy test that fails if any old plan or price returns."

import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

const SELF = "scripts/verify-content.mjs";

// Stale plans / prices / claims that must never reappear.
const FORBIDDEN = [
  "$2.99",
  "$14.99",
  "$24.99",
  "$4.99",
  "Weekly Premium",
  "per week",
  "3-day trial",
  "three-day",
  "three day trial",
  "both plans include a free trial",
  "50% off",
  "cancel anytime",
  "most popular",
  "ONIS has no subscriptions",
  "has no subscriptions",
  "the only purchase is the one-time",
  "automatic Lifetime billing",
  "Lifetime will automatically charge",
  "Lifetime automatically charges",
];

// Allowed dollar strings may appear ONLY in the central pricing config.
const PRICE_ALLOWED_IN = new Set(["app/lib/pricing.ts"]);
const CENTRAL_PRICES = ["$9.99", "$19.99", "$12.99"];

const files = execSync("git ls-files", { encoding: "utf8" })
  .split("\n")
  .filter(Boolean)
  .filter((f) => /\.(ts|tsx|css|md|json|webmanifest|mjs|txt|html)$/.test(f))
  .filter((f) => f !== SELF);

const failures = [];

for (const file of files) {
  let text;
  try {
    text = readFileSync(file, "utf8");
  } catch {
    continue;
  }
  const lower = text.toLowerCase();

  for (const term of FORBIDDEN) {
    let idx = lower.indexOf(term.toLowerCase());
    while (idx !== -1) {
      const line = text.slice(0, idx).split("\n").length;
      failures.push(`${file}:${line} — forbidden term "${term}"`);
      idx = lower.indexOf(term.toLowerCase(), idx + 1);
    }
  }

  if (!PRICE_ALLOWED_IN.has(file)) {
    for (const price of CENTRAL_PRICES) {
      if (text.includes(price)) {
        const line = text.slice(0, text.indexOf(price)).split("\n").length;
        failures.push(
          `${file}:${line} — "${price}" outside app/lib/pricing.ts (interpolate from the pricing config instead)`
        );
      }
    }
  }
}

// Metadata sanity: the launch title/description must stay in place.
const layout = readFileSync("app/layout.tsx", "utf8");
if (!layout.includes("ONIS — Habit Tracker for iPhone, Apple Watch & Widgets")) {
  failures.push("app/layout.tsx — launch <title> is missing or changed");
}
if (!layout.includes("Track it before you forget it")) {
  failures.push("app/layout.tsx — meta description positioning line missing");
}
if (layout.includes("12.99")) {
  failures.push("app/layout.tsx — founding fallback must not appear in public metadata");
}

// Pricing-config sanity: the public model the site is allowed to market.
const pricingSrc = readFileSync("app/lib/pricing.ts", "utf8");
for (const required of [
  'yearlyPrice = "$9.99"',
  'lifetimePrice = "$19.99"',
  'foundingLifetimePrice = "$12.99"',
  "Renews annually unless cancelled.",
  "One payment · Permanent access · No renewal",
  "storeKitConfigured: false",
  "eligible: false",
  "campaignExpiresAt: null",
]) {
  if (!pricingSrc.includes(required)) {
    failures.push(`app/lib/pricing.ts — expected "${required}"`);
  }
}

if (failures.length > 0) {
  console.error("Content guard FAILED:\n");
  for (const failure of failures) console.error("  ✗ " + failure);
  console.error(`\n${failures.length} problem(s).`);
  process.exit(1);
}

console.log(`Content guard passed — ${files.length} files scanned clean.`);
