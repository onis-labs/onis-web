import Image from "next/image";
import type { CSSProperties } from "react";
import type { MarketingFrame } from "../lib/frames";

// ── Approved-frame artwork card ───────────────────────────────────────────
// Renders one approved marketing screenshot inside a fixed-ratio window.
// The window shows the frame's artwork region (visibleH/focusY) and hides
// its baked headline band, so the page's HTML headline is the only visible
// headline — the screenshot file itself is never modified. The aspect-ratio
// box reserves space before the image loads (no layout shift), and
// next/image serves responsive AVIF/WebP variants from the PNG original.

interface FrameArtworkProps {
  frame: MarketingFrame;
  /** Preload — hero frames only. */
  priority?: boolean;
  /** next/image responsive sizes attribute. */
  sizes: string;
  /** Corner radius; 0 when a parent (e.g. the hero pair) clips instead. */
  radius?: number | string;
  shadow?: boolean;
  style?: CSSProperties;
  className?: string;
}

export default function FrameArtwork({
  frame,
  priority = false,
  sizes,
  radius = 24,
  shadow = false,
  style,
  className,
}: FrameArtworkProps) {
  const ratio = frame.image.width / (frame.image.height * frame.visibleH);
  return (
    <div
      className={className}
      style={{
        position: "relative",
        aspectRatio: `${ratio}`,
        background: frame.bg,
        borderRadius: radius,
        overflow: "hidden",
        boxShadow: shadow
          ? "0 28px 60px -30px rgba(26, 26, 23, 0.35), 0 8px 20px -14px rgba(26, 26, 23, 0.22)"
          : undefined,
        ...style,
      }}
    >
      <Image
        src={frame.image}
        alt={frame.alt}
        fill
        sizes={sizes}
        priority={priority}
        style={{
          objectFit: "cover",
          objectPosition: `50% ${frame.focusY * 100}%`,
        }}
      />
    </div>
  );
}
