#!/usr/bin/env node
// ── Launch content guard ──────────────────────────────────────────────────
// Fails when stale pricing/subscription language reappears anywhere in
// tracked source, and when the Lifetime price escapes the central pricing
// config. Run via `npm test`; wired to fail CI/builds loudly.

import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

const SELF = "scripts/verify-content.mjs";

// Terms that must never appear in tracked source (case-insensitive).
const FORBIDDEN = [
  "$2.99",
  "$14.99",
  "$19.99",
  "$24.99",
  "$4.99",
  "per week",
  "per year",
  "auto-renew",
  "3-day trial",
  "cancel anytime",
  "best value",
  "most popular",
];

// The Lifetime price may appear ONLY here; everything else interpolates.
const PRICE = "$9.99";
const PRICE_ALLOWED_IN = new Set(["app/lib/pricing.ts"]);

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

  if (!PRICE_ALLOWED_IN.has(file) && text.includes(PRICE)) {
    const line = text.slice(0, text.indexOf(PRICE)).split("\n").length;
    failures.push(
      `${file}:${line} — "${PRICE}" outside app/lib/pricing.ts (interpolate from the pricing config instead)`
    );
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

// Pricing-config sanity: the model the site is allowed to market.
const pricingSrc = readFileSync("app/lib/pricing.ts", "utf8");
for (const required of [
  'lifetimePrice = "$9.99"',
  "No subscription",
  "No automatic charge",
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
