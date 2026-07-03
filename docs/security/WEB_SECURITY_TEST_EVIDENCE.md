# ONIS Web — Security Test Evidence

- **Date:** 2026-07-03
- **Branch:** `security/web-headers-and-next-patch`
- No raw secrets appear in this file; any credential is referenced by redacted fingerprint only.

## 1. Scope discovery (working tree)

- `git ls-files` → 173 tracked files: `app/` components + `public/` assets + `privacy.html`/`support.html`/`terms.html` + configs.
- Attack-surface greps returned **empty** for: API route files, `route.ts`, `"use server"`, `middleware.*`, `supabase`/`createClient`, and server libs (`stripe`/`prisma`/`next-auth`/etc.).
- Env greps returned **empty** for: `.env` files (disk + tracked), and any `process.env` / `NEXT_PUBLIC_` / `VITE_` reference in source.

## 2. Secret scan (subagent A — authoritative)

- `git grep` (6 pattern sweeps) across all 173 tracked files → 0 real secrets.
- `git log -p --all` (33 commits, both branches, 36,237 diff lines) → 0 secrets.
- `git rev-list --objects --all` → 141 unique image/video blobs → `git cat-file --batch` + `strings | grep` → 0 secrets (closes the binary-diff blind spot).
- `git stash list` empty; `git reflog` clean/linear; `git fsck --unreachable` no dangling objects; no `.gitattributes`/LFS.
- On-disk local dirs `_archive-nextjs/`, `_static-backup/`, `public/` recursively scanned → only framework-internal keyword hits (`createSegmentAccessToken`, `input.type==='password'`), no project secrets.

## 3. Production bundle + dependencies (subagent B)

- `npm ci` (reproducible from tracked `package-lock.json`) + `npm run build` → **PASS**; scanned `.next/static` and `.next/server` → **0** `NEXT_PUBLIC_*`, **0** `process.env` values, **0** token patterns, **0** `*.map` files.
- `npm audit`: 0 critical, 0 high, **2 moderate** (`postcss` GHSA-qx2v-qp2m-jg93 via Next build-time CSS tooling) — not exploitable (no untrusted-CSS runtime path); npm's only remedy is a breaking `next@9` downgrade (declined).
- Next.js: installed `15.5.19`; latest 15.x patch `15.5.20`. CVE classes (middleware bypass, image-optimizer SSRF, cache poisoning, Server-Action DoS) have **no attack surface** here (no middleware, no `next/image`, all-static, no dynamic/data routes).
- Lockfile tracked; no `postinstall` scripts (only `sharp`'s standard optional binary fetch, unused); no `.npmrc`/private registry/auth token.

## 4. GitHub / CI / config (subagent C)

- Remote = `onis-labs/onis-web` (matches allowed repo). `gh` authed as `pathlyaics-gif` (`repo`,`workflow`).
- Visibility **PUBLIC**; **no branch protection** on `main` (`.../branches/main/protection` → 404).
- **No Actions workflows** (`actions/runs` → `total_count: 0`); **0 repo secrets/variables**.
- Dependabot alerts **disabled**; secret scanning + push protection **disabled**; org 2FA **not required**.
- `vercel.json`: no headers/redirects/rewrites (no misconfig, no headers). `next.config.ts`: single static redirect (no open redirect); no `images.remotePatterns` (no SSRF); `output` not `export`.

## 5. Live site (curl, public)

```
$ curl -sIL https://www.onis.club/
HTTP/2 200
strict-transport-security: max-age=63072000        # HSTS present (Vercel)
access-control-allow-origin: *                      # Vercel CDN default (harmless for public static)
server: Vercel ; x-nextjs-prerender: 1 ; x-vercel-cache: HIT
# absent: content-security-policy, x-frame-options, x-content-type-options, referrer-policy, permissions-policy
# absent: x-powered-by (not emitted on cached homepage)
```
- Deployed HTML loads **only same-origin `/_next` chunks + Next's inline hydration script** — **zero third-party/external resources, zero trackers** (validates the "no analytics" privacy claim).
- Source-map probe: `…/webpack-*.js.map` → **HTTP 403** (not served).

## 6. Fix verification (local `next start` on :3100, post-change)

Build on `next@15.5.20` → **PASS** (4 static routes, no errors). Runtime headers:

```
$ curl -sI http://localhost:3100/
HTTP/1.1 200 OK
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), browsing-topics=()
Content-Security-Policy-Report-Only: default-src 'self'; base-uri 'self'; object-src 'none';
  frame-ancestors 'none'; form-action 'self'; script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:;
  media-src 'self'; connect-src 'self'; manifest-src 'self'; upgrade-insecure-requests
# X-Powered-By: (absent — poweredByHeader:false)

$ curl -sI http://localhost:3100/index.html   → HTTP/1.1 308 Permanent Redirect ; location: /
$ curl -sI http://localhost:3100/onis-logo.png → 200, headers applied to static assets too
$ curl -s  http://localhost:3100/ | grep title → <title>ONIS — make it count. honestly.</title>  # renders
```

**Result:** all four security headers emit, `X-Powered-By` removed, the existing redirect and page rendering are preserved. CSP is Report-Only pending one browser-console check on the Vercel preview (full in-browser CSP verification was unavailable this session — extension offline).

## Honest gaps

- No Vercel dashboard access (env vars / deploy protection / team access not reviewed).
- Full in-browser CSP/console verification not run (claude-in-chrome offline) — hence CSP ships Report-Only.
- `npm audit` relies on the advisory DB, not a manual audit of every transitive package; binary scan used `strings`/`mdls` (no `exiftool`).
- Personal 2FA status of `pathlyaics-gif` unverifiable via API.
