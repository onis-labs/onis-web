# ONIS Web — Security Fixes Applied

- **Date:** 2026-07-03
- **Branch:** `security/web-headers-and-next-patch`
- **Policy:** only clear, high-confidence, testable, non-weakening code/config changes. No production credentials or infrastructure altered. Not merged (awaits owner `MERGE PR`).

## Changes in this PR

### 1. `next.config.ts` — security response headers + `poweredByHeader:false`
Adds an `async headers()` block applying to `/:path*`:

| Header | Value | Purpose |
|---|---|---|
| `X-Content-Type-Options` | `nosniff` | Block MIME-sniffing |
| `X-Frame-Options` | `DENY` | Anti-clickjacking (legacy + enforcing here) |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Limit referrer leakage (privacy) |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), browsing-topics=()` | Disable unused features + opt out of Topics |
| `Content-Security-Policy-Report-Only` | same-origin policy w/ `frame-ancestors 'none'`, `object-src 'none'`, `'unsafe-inline'` for script/style | Defense-in-depth; **Report-Only** first |

Also sets `poweredByHeader: false` to drop the `X-Powered-By` disclosure. The existing `/index.html → /` redirect is preserved unchanged.

**Why Report-Only for CSP:** the page relies on Next's inline hydration script and framer-motion inline styles (`'unsafe-inline'`), and full in-browser verification was not possible this session (browser extension offline). Report-Only guarantees **zero functional breakage** while collecting violations. All resources the site loads are same-origin, so promotion should be clean.

**Why no HSTS in config:** Vercel already serves `Strict-Transport-Security: max-age=63072000`. Not duplicated to avoid conflicting headers.

### 2. `package.json` + `package-lock.json` — Next.js `15.5.19` → `15.5.20`
Same-line patch bump (latest 15.x). Addresses the "keep Next patched / avoid CVE deploy-blocks" concern as hygiene. Build verified green on `15.5.20`.

## How it was tested
- `npm install` → lockfile pinned to `next@15.5.20`.
- `npm run build` → PASS (4 static routes, 0 errors).
- `next start -p 3100` + `curl` → all four headers + CSP-Report-Only emit; `X-Powered-By` gone; `/index.html` still 308→`/`; homepage renders (`<title>ONIS — make it count. honestly.</title>`). Full evidence in `WEB_SECURITY_TEST_EVIDENCE.md`.

## Deliberately NOT changed (with reasons)
- **`postcss` moderate advisories** — not exploitable (build-time CSS tooling, no untrusted input); npm's only remedy is a breaking `next@9` downgrade. Leaving as-is is the correct call.
- **CSP not yet enforcing** — promote `Content-Security-Policy-Report-Only` → `Content-Security-Policy` after one browser-console check on the preview deploy.
- **GitHub/org settings** (branch protection, 2FA, Dependabot, secret scanning) — owner-only platform settings, not code; listed in `WEB_SECURITY_REVIEW.md` → Owner actions. Not auto-changed.
- **Vercel dashboard, ACAO `*`** — platform-level; harmless here; owner's call.
- **Out-of-scope Telegram token** in global `~/.claude/settings.local.json` — not this repo; not touched; rotation recommended separately.

## Follow-up checklist for the owner
- [ ] Open the PR's Vercel preview; confirm scroll animations work and console shows no CSP-Report-Only violations.
- [ ] Promote CSP to enforcing (`Content-Security-Policy`), then `MERGE PR`.
- [ ] Enable branch protection on `main`, org 2FA, Dependabot, secret scanning + push protection.
- [ ] Rotate the Telegram bot token (`AAFZ…tYoA`) and remove it from plaintext config.
