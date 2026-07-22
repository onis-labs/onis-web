import AccentPeriod from "./AccentPeriod";
import OfficialAppStoreBadge from "./OfficialAppStoreBadge";
import { colors, sans, display, weight, layout } from "../lib/tokens";
import { site } from "../lib/config";

export default function SiteFooter() {
  return (
    <footer
      aria-label={`${site.name} footer`}
      style={{
        background: colors.ink,
        color: "#fff",
        padding: `clamp(48px, 8vh, 80px) ${layout.padX}`,
      }}
    >
      <div style={{ maxWidth: layout.wideMax, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 40,
          }}
        >
          <div style={{ maxWidth: 360 }}>
            <p
              style={{
                fontFamily: display,
                fontWeight: weight.section,
                fontSize: "1.4rem",
                color: "#fff",
                margin: 0,
              }}
            >
              {site.name}
              <AccentPeriod />
            </p>
            <p
              style={{
                fontFamily: sans,
                fontWeight: weight.body,
                fontSize: "0.95rem",
                color: colors.dimOnDark,
                lineHeight: 1.6,
                margin: "12px 0 0",
              }}
            >
              {site.tagline}
            </p>
          </div>

          {/* App Store listing isn't live yet — the badge itself owns the
              "coming soon" / non-clickable presentation. No purchase links
              are fabricated here. */}
          <OfficialAppStoreBadge height={40} />
        </div>

        <nav
          className="site-footer-nav"
          aria-label="Footer"
          style={{
            display: "flex",
            gap: 24,
            marginTop: 48,
            paddingTop: 32,
            borderTop: "1px solid rgba(255,255,255,0.12)",
            fontFamily: sans,
            fontSize: "0.85rem",
          }}
        >
          <a href="/privacy" style={{ color: colors.dimOnDark }}>
            Privacy
          </a>
          <a href="/terms" style={{ color: colors.dimOnDark }}>
            Terms
          </a>
          <a href="/support" style={{ color: colors.dimOnDark }}>
            Support
          </a>
          <a href={`mailto:${site.supportEmail}`} style={{ color: colors.dimOnDark }}>
            {site.supportEmail}
          </a>
        </nav>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "4px 16px",
            marginTop: 24,
            fontFamily: sans,
            fontSize: "0.8rem",
            color: colors.dimOnDark,
            lineHeight: 1.6,
          }}
        >
          <span>© 2026 ONIS Labs.</span>
          <span>Apple, Apple Watch, and iPhone are trademarks of Apple Inc.</span>
          <span>Not affiliated with or endorsed by Apple Inc.</span>
          <span>App screens shown are real ONIS screens.</span>
        </div>
      </div>
    </footer>
  );
}
