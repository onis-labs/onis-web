import type { CSSProperties } from "react";

// Shared ONIS design tokens — never hardcode these values inline.
export const colors = {
  canvas: "#F4F0E6", // warm cream — page background throughout
  cardCream: "#FAF7F0", // section alt background
  ink: "#1A1A17", // primary text
  body: "#4A463E", // body text
  dim: "#8A8579", // dim text — never lighter than this on cream
  accent: "#B85A3F", // terracotta
  accentHover: "#A04E36",
  borderSubtle: "rgba(184,90,63,0.18)",
} as const;

export const serif = "var(--font-serif), Georgia, serif";
export const sans = "var(--font-inter), system-ui, sans-serif";

// Uppercase eyebrow label style used across sections.
export const labelStyle: CSSProperties = {
  fontFamily: sans,
  fontSize: "0.65rem",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: colors.dim,
  fontWeight: 500,
};
