import type { CSSProperties, ReactNode } from "react";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import {
  colors,
  sans,
  display,
  type,
  weight,
  layout,
  labelStyle,
} from "../lib/tokens";
import { site } from "../lib/config";

interface LegalLayoutProps {
  title: string;
  updated?: string;
  children: ReactNode;
}

// ── Legal / support page shell ───────────────────────────────────────────
// Shared by /privacy, /terms, and /support: SiteHeader, a centered readable
// prose column (eyebrow + H1 + optional "last updated" line, then body),
// and SiteFooter. Inline styles can't cascade to arbitrary children, so
// pages compose the H2/P/UL/LI primitives exported below instead of raw
// h2/p/ul/li tags.
export default function LegalLayout({
  title,
  updated,
  children,
}: LegalLayoutProps) {
  return (
    <>
      <SiteHeader />

      <main
        id="main-content"
        style={{
          background: colors.canvas,
          maxWidth: 720,
          margin: "0 auto",
          padding: `clamp(40px, 7vh, 88px) ${layout.padX}`,
        }}
      >
        <header style={{ marginBottom: 48 }}>
          <p style={labelStyle}>{site.name}</p>
          <h1
            style={{
              fontFamily: display,
              fontWeight: weight.section,
              fontSize: type.section,
              color: colors.ink,
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              margin: "16px 0 0",
            }}
          >
            {title}
          </h1>
          {updated && (
            <p
              style={{
                fontFamily: sans,
                fontWeight: weight.body,
                fontSize: type.meta,
                color: colors.dim,
                margin: "16px 0 0",
              }}
            >
              Last updated: {updated}
            </p>
          )}
        </header>

        {children}
      </main>

      <SiteFooter />
    </>
  );
}

// ── Prose primitives ─────────────────────────────────────────────────────
// Plain, readable long-form styles — deliberately quieter than the
// marketing sections (no reveal animation, no serif display flourishes).

const h2Style: CSSProperties = {
  fontFamily: display,
  fontWeight: weight.heading,
  fontSize: type.heading,
  color: colors.ink,
  lineHeight: 1.3,
  margin: "40px 0 16px",
};

const pStyle: CSSProperties = {
  fontFamily: sans,
  fontWeight: weight.body,
  fontSize: type.body,
  color: colors.body,
  lineHeight: 1.7,
  margin: "0 0 16px",
};

const ulStyle: CSSProperties = {
  margin: "0 0 16px",
  padding: "0 0 0 24px",
};

const liStyle: CSSProperties = {
  fontFamily: sans,
  fontWeight: weight.body,
  fontSize: type.body,
  color: colors.body,
  lineHeight: 1.7,
  marginBottom: 8,
};

export function H2({ children }: { children: ReactNode }) {
  return <h2 style={h2Style}>{children}</h2>;
}

export function P({ children }: { children: ReactNode }) {
  return <p style={pStyle}>{children}</p>;
}

export function UL({ children }: { children: ReactNode }) {
  return <ul style={ulStyle}>{children}</ul>;
}

export function LI({ children }: { children: ReactNode }) {
  return <li style={liStyle}>{children}</li>;
}
