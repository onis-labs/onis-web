# ONIS Web — Security Review

- **Date:** 2026-07-03
- **Repository:** `onis-labs/onis-web` (branch `main`; remote `https://github.com/onis-labs/onis-web.git`)
- **Live target:** `https://onis.club` (apex → `https://www.onis.club`), hosted on Vercel
- **App shape:** Static Next.js 15 marketing site (App Router). Runtime deps: `next`, `react`, `react-dom`, `framer-motion` only.
- **Method:** Fable 5 orchestration + threat modeling; three parallel Sonnet 5 subagents (secrets/history, build/bundle/deps, GitHub/CI/config); direct live-site and Supabase inspection.

## Headline verdict

**No privileged secret is exposed in the public frontend, the production bundle, the repository, or its git history. Nothing in ONIS Web requires rotation.** There are **no Critical and no High findings.** The remaining items are defense-in-depth hardening (fixed in this PR) and GitHub/organization governance settings (owner-only).

The primary user concern — *"are API keys or secrets exposed in the public frontend?"* — is answered **NO**, and this is backed by a structural proof, not just a scan: the entire `app/` source contains **zero** `process.env` / `NEXT_PUBLIC_*` references, so the build is *incapable* of inlining a secret into the browser bundle. Bundle grep, git-history scan (including every binary blob), and live-site inspection all corroborate.

## Scope actually reviewed (honest)

| Surface | Access | Reviewed |
|---|---|---|
| Frontend source (`app/`, `public/`, configs) | Full | Yes — all tracked files |
| Git history (33 commits, both branches, binary blobs) | Full local clone | Yes — full `git log -p --all` + `git cat-file` on 141 blobs |
| Production browser bundle (`.next/static`) | Full (rebuilt) | Yes — pre-existing + clean rebuild |
| Dependencies / lockfile / supply chain | Full | Yes — `npm audit`, lockfile, install scripts |
| GitHub repo/org (visibility, branch protection, Actions, secrets, Dependabot) | `gh` authed (`repo`,`workflow`) | Yes |
| Live HTTP headers (`onis.club` / `www.onis.club`) | Public | Yes — `curl` |
| Supabase `onis-development` | Read-only MCP | Yes — advisors, tables, functions, migrations |
| **Vercel dashboard** (env vars, deploy protection, team access) | **None** | **No — no access this session (owner follow-up)** |
| **Personal 2FA of `pathlyaics-gif`** | API returned null | **Unverifiable** |
| Browser automation (claude-in-chrome) | Extension offline | Substituted with `curl`; full JS/console CSP check not run |

## Threat model applied

Attacker can read all public JS/source maps/headers, call any endpoint directly, manipulate params/redirects/storage, submit malicious input, abuse uploads, attempt XSS/CSRF/SSRF/IDOR/open-redirect/auth-bypass/CORS/RPC abuse, read GitHub history/CI artifacts, use a leaked Supabase key against weak RLS, and reach preview deploys.

**Result:** the site presents almost none of these surfaces. There is **no backend, no API route, no server action, no middleware, no auth, no form that submits data, no file upload, no Supabase usage in code, and no environment variables.** The only outbound interaction is `mailto:support@onis.club` links. This collapses most of the threat model to "not applicable."

## Findings

| # | Finding | Severity | Reachable? | Status |
|---|---|---|---|---|
| 1 | No security response headers (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy) set anywhere | Low | Public | **Fixed** (this PR) |
| 2 | `poweredByHeader` not disabled (framework/version disclosure) | Low/Info | Public | **Fixed** (this PR) |
| 3 | Next.js one patch behind (`15.5.19`); "keep Next patched" is a known deploy concern | Low | n/a | **Fixed** → `15.5.20` (this PR) |
| 4 | 2 moderate `postcss` advisories (GHSA-qx2v-qp2m-jg93) via Next build-time CSS tooling | Low/Info | No | **Won't fix** — not exploitable; only "fix" is a breaking `next@9` downgrade |
| 5 | No branch protection on `main` (public repo, auto-deploys to prod, no CI gate) | **Medium** | GitHub | **Owner action** |
| 6 | Org `onis-labs` does not require 2FA for members | **Medium** | GitHub | **Owner action** |
| 7 | Dependabot alerts + security updates + secret scanning + push protection all OFF (free on public repos) | Medium | GitHub | **Owner action** |
| 8 | `Access-Control-Allow-Origin: *` on live responses (Vercel CDN default) | Info | Public | No action — harmless for public static content (no cookies/auth/private data) |
| 9 | Public repo, no LICENSE file | Info | GitHub | Owner note |
| 10 | `EBADENGINE`: local Node 24 vs `engines.node: "20.x"` | Info | n/a | Owner note — align local/CI Node with Vercel |

### Detail on the one confirmed public finding (#1)

- **Severity:** Low. **Repository:** `onis-labs/onis-web`. **Path:** `next.config.ts` / `vercel.json` (neither set headers); **Route:** all routes.
- **Exploit scenario:** Without `X-Frame-Options`/`frame-ancestors`, the page can be framed (clickjacking); without `X-Content-Type-Options`, MIME-sniffing; without `Referrer-Policy`, full-URL referrer leakage (notable given the site's privacy positioning). **Practical impact is low** — there is no authenticated action or sensitive data to clickjack or leak.
- **Affected users/data:** none directly (no user data). Brand/privacy hygiene only.
- **Remediation:** add the header set via `next.config.ts` `headers()` — done in this PR (four enforcing headers + Report-Only CSP + `poweredByHeader:false`). **HSTS is already served by Vercel** (`max-age=63072000`), so it is intentionally not duplicated in config.
- **Fixed:** Yes (CSP ships Report-Only pending one browser-console verification on the preview deploy). **Rotation required:** No.

## Secret exposure — proof

- **Tracked files:** 0 real secrets. Only benign keyword hits (`.env` in deny-list config, "no password required" / "trade secret" in copy).
- **Git history:** 0 secrets across 33 commits / both branches / 36k diff lines; **all 141 binary blobs ever committed extracted and byte-scanned** — clean. No `.env`/`.pem`/`.npmrc`/credential files ever tracked; no stashes; no dangling objects; clean reflog; no LFS.
- **Production bundle (`.next/static`):** 0 `NEXT_PUBLIC_*`, 0 `process.env` values, 0 token patterns, **0 source maps**. Server chunks reference only framework-internal env var *names* (e.g. `VERCEL_URL`), never values.
- **GitHub:** 0 repo secrets/variables configured; 0 Actions workflows (no CI to leak logs).
- **Rotation plan:** intentionally **not created** (`WEB_SECRET_ROTATION_PLAN.md` omitted) — **no in-scope ONIS Web secret requires rotation.**

## Supabase (`onis-development`, read-only inspection)

Not referenced anywhere in ONIS Web code, so it is **not part of the web app's runtime**. Inspected because access existed and you asked: **empty project** — 0 tables, 0 edge functions, 0 migrations, **0 security advisories**. Nothing to expose (no data, therefore no RLS/IDOR risk). The separate `pathly.ai.cs` Supabase project is **Pathbuild — intentionally not touched.**

## Owner-only actions (recommended, not launch-blocking)

1. **GitHub → repo settings:** enable branch protection on `main` (require PR review; block force-push/deletion). *(Finding #5)*
2. **GitHub → org `onis-labs`:** require 2FA for members. *(Finding #6)*
3. **GitHub → Security & analysis:** enable Dependabot alerts + security updates, secret scanning, and push protection (all free, public repo). *(Finding #7)*
4. **Merge this PR** after a 30-second visual check on the Vercel preview deploy (confirm the scroll animations work and the browser console logs no CSP violations), then promote the CSP from `-Report-Only` to enforcing.
5. *(Optional)* Add a `LICENSE`; align local/CI Node to `20.x`.

## Out-of-scope items surfaced (flagged honestly — not acted on)

1. **Likely live Telegram bot token** found in your **global** `~/.claude/settings.local.json` (Claude Code CLI config — **not** this repo), redacted fingerprint `AAFZ…tYoA`. Unrelated to ONIS Web, but **rotate it and remove it from plaintext** if active. Not touched.
2. **Prompt-injection anomaly:** during a subagent run, an injected block styled as a system notice ("Exited Plan Mode / Auto Mode Active") attempted to loosen command discipline. It was correctly ignored; all agents stayed read-only. Flagged for awareness.

## Launch verdict

**SAFE TO LAUNCH.**

ONIS Web is a static marketing page with no secrets, no user data, no auth, and no exploitable Critical/High vulnerability. The header hardening is delivered in this PR (merge after the quick preview check). The owner-only GitHub/org settings are good governance and are **recommended follow-ups, not blockers** for this deployment shape. Rotate the out-of-scope Telegram token separately.
