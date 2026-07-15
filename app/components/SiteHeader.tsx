"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import AccentPeriod from "./AccentPeriod";
import MobileNavigation from "./MobileNavigation";
import OfficialAppStoreBadge from "./OfficialAppStoreBadge";
import { colors, display, sans, type, weight } from "../lib/tokens";
import { site } from "../lib/config";
import { nav } from "../lib/content";

const DESKTOP_QUERY = "(min-width: 860px)";

// Tracks a CSS media query on the client only. Defaults to `false` (mobile
// layout) so the server-rendered / pre-hydration pass never mismatches the
// client's first paint; it flips to the real value right after mount.
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);

  return matches;
}

const wordmarkStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "baseline",
  fontFamily: display,
  fontSize: type.heading,
  fontWeight: weight.section, // 700 — the spec'd wordmark weight
  letterSpacing: "-0.01em",
  color: colors.ink,
  flexShrink: 0,
};

const hamburgerButtonStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 44,
  height: 44,
  background: "none",
  border: "none",
  padding: 0,
  margin: 0,
  color: colors.ink,
  cursor: "pointer",
  flexShrink: 0,
};

function HamburgerIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  );
}

// Small underlined-on-hover nav link — desktop only. Local state per link
// keeps hover/focus color changes isolated (inline styles can't express
// :hover, so this is the plain-React equivalent).
function NavLink({ href, label }: { href: string; label: string }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      style={{
        fontFamily: sans,
        fontSize: type.meta,
        fontWeight: weight.label,
        color: hover ? colors.accent : colors.body,
        transition: "color 160ms ease",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </a>
  );
}

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const isDesktop = useMediaQuery(DESKTOP_QUERY);

  // Sticky header surface: transparent at the top, a quiet elevated surface
  // after a small scroll (globals.css reads this via [data-scrolled]).
  // Passive listener + rAF so this never blocks the scroll thread.
  useEffect(() => {
    let raf = 0;
    const apply = () => {
      raf = 0;
      setScrolled(window.scrollY > 8);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    // Return keyboard focus to the control that opened the menu.
    triggerRef.current?.focus();
  };

  return (
    <header className="site-header" data-scrolled={scrolled ? "true" : "false"}>
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
          gap: 16,
        }}
      >
        <a href="/" style={wordmarkStyle} aria-label={`${site.name} — home`}>
          {site.name}
          <AccentPeriod />
        </a>

        {isDesktop ? (
          <nav aria-label="Primary" style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {nav.map((item) => (
              <NavLink key={item.href} href={item.href} label={item.label} />
            ))}
            <OfficialAppStoreBadge height={34} />
          </nav>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <OfficialAppStoreBadge height={30} />
            <button
              type="button"
              ref={triggerRef}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen(true)}
              style={hamburgerButtonStyle}
            >
              <HamburgerIcon />
            </button>
          </div>
        )}
      </div>

      <MobileNavigation open={menuOpen} onClose={closeMenu} />
    </header>
  );
}
