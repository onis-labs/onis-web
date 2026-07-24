"use client";

import { useEffect, useRef, useState } from "react";
import AccentPeriod from "./AccentPeriod";
import FrameArtwork from "./FrameArtwork";
import OfficialAppStoreBadge from "./OfficialAppStoreBadge";
import { colors, display, sans, type, weight } from "../lib/tokens";
import { frames } from "../lib/frames";

// ── Hero — the connected two-frame story ─────────────────────────────────
// Desktop (≥700px): the two approved frames sit side by side with zero gap
// inside one rounded card, so the cropped iPhone in frame one continues
// into frame two. Mobile: the same two frames as a two-step swipeable
// gallery (scroll-snap, no auto-scroll) with a subtle dot indicator.

const SLIDES = [
  { key: "track", frame: frames.track, label: "Today on iPhone" },
  { key: "wrist", frame: frames.wrist, label: "One tap from Apple Watch" },
] as const;

function GalleryDots({
  active,
  onSelect,
}: {
  active: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: 10,
        marginTop: 14,
      }}
    >
      {SLIDES.map((slide, i) => (
        <button
          key={slide.key}
          type="button"
          aria-label={`Show ${slide.label}`}
          aria-current={active === i}
          onClick={() => onSelect(i)}
          style={{
            width: 30,
            height: 30,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: active === i ? 22 : 8,
              height: 8,
              borderRadius: 999,
              background: active === i ? colors.accent : colors.borderSubtle,
              transition: "width 240ms var(--ease), background 240ms var(--ease)",
            }}
          />
        </button>
      ))}
    </div>
  );
}

export default function HeroSection() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Track which slide is snapped; passive so scrolling stays smooth.
  useEffect(() => {
    const el = galleryRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      setActive(max > 0 && el.scrollLeft > max / 2 ? 1 : 0);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSlide = (index: number) => {
    const el = galleryRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    el.scrollTo({ left: index === 0 ? 0 : max, behavior: "smooth" });
  };

  return (
    <section className="hero" aria-label="ONIS — track it before you forget it">
      <div className="hero-grid">
        <div className="hero-copy">
          <h1
            className="hero-reveal d1"
            style={{
              fontFamily: display,
              fontWeight: weight.hero,
              fontSize: type.hero,
              letterSpacing: "-0.03em",
              lineHeight: 1.04,
              color: colors.ink,
              margin: 0,
            }}
          >
            Track it before you forget it
            <AccentPeriod />
          </h1>

          <p
            className="hero-reveal d2"
            style={{
              fontFamily: sans,
              fontWeight: weight.heading,
              fontSize: "clamp(1.1rem, 1.8vw, 1.3rem)",
              color: colors.ink,
              lineHeight: 1.45,
              margin: "20px 0 0",
            }}
          >
            One tap keeps the real count.
          </p>

          <p
            className="hero-reveal d2"
            style={{
              fontFamily: sans,
              fontWeight: weight.body,
              fontSize: type.body,
              color: colors.body,
              lineHeight: 1.6,
              margin: "14px auto 0",
              maxWidth: 520,
            }}
          >
            Log from iPhone, Apple Watch, or widgets when the moment happens.
            See what adds up and choose one clear next step.
          </p>

          <div
            className="hero-reveal d3 hero-ctas"
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: 20,
              marginTop: 28,
            }}
          >
            <OfficialAppStoreBadge height={46} showCaption />
            <a href="#why" className="btn-secondary">
              See how it works
              <span aria-hidden="true">↓</span>
            </a>
          </div>

          <div
            className="hero-reveal d4 hero-trust"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 10,
              marginTop: 28,
            }}
          >
            <span className="chip">No ONIS account</span>
            <span className="chip">Continue with Free</span>
            <span className="chip">iPhone, Apple Watch, and widgets</span>
          </div>
        </div>

        <div className="hero-visual-col hero-reveal d-film">
          {/* ≥700px: the two approved frames as ONE stitched image — the
              cropped iPhone continues into the Watch frame with no seam. */}
          <FrameArtwork
            frame={frames.heroPair}
            sizes="(min-width: 1060px) 620px, 94vw"
            radius="clamp(20px, 2.6vw, 30px)"
            className="hero-pair-single"
            shadow
            priority
          />

          {/* <700px: the same two frames as a two-step swipeable gallery. */}
          <div
            ref={galleryRef}
            className="hero-pair"
            role="group"
            aria-label="ONIS on iPhone and Apple Watch — two connected screens"
            tabIndex={0}
          >
            {SLIDES.map((slide) => (
              <FrameArtwork
                key={slide.key}
                frame={slide.frame}
                sizes="86vw"
                radius="var(--hero-frame-radius)"
                className="hero-frame"
              />
            ))}
          </div>
          <div className="hero-dots">
            <GalleryDots active={active} onSelect={scrollToSlide} />
          </div>
        </div>
      </div>
    </section>
  );
}
