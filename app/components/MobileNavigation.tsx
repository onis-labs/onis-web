"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, type CSSProperties } from "react";
import AccentPeriod from "./AccentPeriod";
import NavCta from "./NavCta";
import { colors, display, ease, sans, type, weight } from "../lib/tokens";
import { site } from "../lib/config";
import { nav } from "../lib/content";

interface MobileNavigationProps {
  open: boolean;
  onClose: () => void;
}

const closeButtonStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 44,
  height: 44,
  marginLeft: "auto",
  background: "none",
  border: "none",
  padding: 0,
  color: colors.ink,
  cursor: "pointer",
};

function CloseIcon() {
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
      <line x1="5" y1="5" x2="19" y2="19" />
      <line x1="19" y1="5" x2="5" y2="19" />
    </svg>
  );
}

// Full-screen mobile menu sheet, opened from SiteHeader's hamburger button.
// Nav links come straight from lib/content so copy never drifts from the
// desktop header; the Support / route link (non-"#" href) gets a divider so
// it reads as distinct from the in-page anchors above it.
export default function MobileNavigation({ open, onClose }: MobileNavigationProps) {
  const reduce = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Lock page scroll while the sheet is open; always restore it on close.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  // Move focus into the sheet on open; Escape closes it from anywhere.
  useEffect(() => {
    if (!open) return;
    closeButtonRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          initial={{ opacity: 0, y: reduce ? 0 : -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduce ? 0 : -12 }}
          transition={{ duration: reduce ? 0 : 0.28, ease }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 150,
            background: colors.canvas,
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          }}
        >
          <div
            className="container"
            style={{ display: "flex", alignItems: "center", height: 64, flexShrink: 0 }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "baseline",
                fontFamily: display,
                fontSize: type.heading,
                fontWeight: weight.section,
                letterSpacing: "-0.01em",
                color: colors.ink,
              }}
            >
              {site.name}
              <AccentPeriod />
            </span>
            <button
              type="button"
              ref={closeButtonRef}
              aria-label="Close menu"
              onClick={onClose}
              style={closeButtonStyle}
            >
              <CloseIcon />
            </button>
          </div>

          <nav
            aria-label="Mobile"
            className="container"
            style={{ display: "flex", flexDirection: "column", paddingTop: 8, gap: 4 }}
          >
            {nav.map((item) => {
              const isRoute = !item.href.startsWith("#");
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    minHeight: 44,
                    padding: "12px 0",
                    marginTop: isRoute ? 12 : 0,
                    borderTop: isRoute ? `1px solid ${colors.borderSubtle}` : "none",
                    fontFamily: sans,
                    fontSize: type.body,
                    fontWeight: weight.heading,
                    color: colors.ink,
                  }}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div
            className="container"
            style={{
              marginTop: "auto",
              display: "flex",
              justifyContent: "center",
              paddingTop: 24,
              paddingBottom: 40,
            }}
          >
            {/* Bubbled click from the CTA link closes the sheet. */}
            <div onClick={onClose} style={{ display: "inline-flex" }}>
              <NavCta badgeHeight={40} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
