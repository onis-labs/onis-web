"use client";

import Reveal from "./Reveal";
import AccentPeriod from "./AccentPeriod";
import { colors, labelStyle, serif, sans, layout } from "../lib/tokens";

export default function ClosingCTA() {
  return (
    <section style={{ background: colors.canvas, overflowX: "clip" }}>
      <div
        style={{
          maxWidth: 720,
          margin: "0 auto",
          textAlign: "center",
          padding: `${layout.padY} ${layout.padX} 0`,
        }}
      >
        <Reveal>
          <p style={labelStyle}>One Price</p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2
            style={{
              fontFamily: serif,
              fontWeight: 400,
              color: colors.ink,
              fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
              lineHeight: 1.05,
              margin: "16px 0 8px",
            }}
          >
            $4.99. Once
            <AccentPeriod />
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p
            style={{
              fontFamily: serif,
              fontStyle: "italic",
              color: colors.body,
              fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
            }}
          >
            Yours forever.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <p
            style={{
              fontFamily: sans,
              fontWeight: 300,
              color: colors.body,
              fontSize: "1rem",
              marginTop: 24,
            }}
          >
            One payment. No subscription. No renewals.
          </p>
        </Reveal>

        <Reveal delay={0.35}>
          <p
            style={{
              fontFamily: sans,
              fontWeight: 300,
              color: colors.dim,
              fontSize: "0.95rem",
              marginTop: 16,
            }}
          >
            Questions before you buy? Email{" "}
            <a
              href="mailto:support@onis.club"
              style={{
                color: colors.accent,
                textDecoration: "underline",
                textUnderlineOffset: 3,
              }}
            >
              support@onis.club
            </a>
          </p>
        </Reveal>

        {/* Radial glow + official Apple badge. Badge is static — never animated. */}
        <div
          style={{
            position: "relative",
            marginTop: 56,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: "-100px",
              background:
                "radial-gradient(ellipse at center, rgba(184,90,63,0.10) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          {/* Official "Download on the App Store" artwork.
              Replace idXXXXXXXXX with the real App Store ID before launch. */}
          <a
            href="https://apps.apple.com/app/idXXXXXXXXX"
            aria-label="Download ONIS on the App Store"
            style={{ position: "relative", display: "inline-block" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/app-store-badge.svg"
              alt="Download on the App Store"
              style={{ height: 48, width: "auto", display: "block" }}
            />
          </a>
        </div>
      </div>

      <footer
        style={{
          marginTop: "clamp(96px, 16vh, 180px)",
          borderTop: `1px solid ${colors.borderSubtle}`,
          padding: "40px clamp(24px, 6vw, 80px)",
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: 1080,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <span
          style={{
            fontFamily: serif,
            fontSize: "0.95rem",
            color: colors.ink,
          }}
        >
          onis <span style={{ color: colors.dim }}>·</span> made with restraint
        </span>

        {/* Footer links → the real static legal pages served from public/. */}
        <nav style={{ display: "flex", gap: 20, fontFamily: sans, fontSize: "0.85rem" }}>
          <a href="/privacy.html" style={{ color: colors.dim }}>
            Privacy
          </a>
          <a href="/terms.html" style={{ color: colors.dim }}>
            Terms
          </a>
          <a href="/support.html" style={{ color: colors.dim }}>
            Support
          </a>
          <a href="mailto:support@onis.club" style={{ color: colors.dim }}>
            support@onis.club
          </a>
        </nav>

        <span style={{ fontFamily: sans, fontSize: "0.85rem", color: colors.dim }}>
          © 2026
        </span>
      </footer>
    </section>
  );
}
