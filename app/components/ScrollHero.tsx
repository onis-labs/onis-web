"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { colors, serif, sans } from "../lib/tokens";
import AccentPeriod from "./AccentPeriod";

// Real Higgsfield hero, scrubbed frame-by-frame on a canvas.
// 121 JPEG frames extracted from hero.mp4 (24fps, ~5s).
const FRAME_COUNT = 121;
const framePath = (i: number) =>
  `/frames/frame_${String(i + 1).padStart(4, "0")}.jpg`;

const clamp = (n: number, lo: number, hi: number) =>
  Math.min(Math.max(n, lo), hi);

export default function ScrollHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const images: HTMLImageElement[] = [];
    let currentFrame = -1;
    let raf = 0;
    // Under reduced motion we hold a single bloomed frame, no scrub.
    const idleFrame = Math.round((FRAME_COUNT - 1) * 0.55);

    const drawCover = (img: HTMLImageElement) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      const bw = Math.round(cw * dpr);
      const bh = Math.round(ch * dpr);
      if (canvas.width !== bw || canvas.height !== bh) {
        canvas.width = bw;
        canvas.height = bh;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = colors.canvas; // cream behind, never black
      ctx.fillRect(0, 0, cw, ch);
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      if (!iw || !ih) return;
      const scale = Math.max(cw / iw, ch / ih); // cover fit
      const dw = iw * scale;
      const dh = ih * scale;
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    };

    const drawFrame = (index: number) => {
      const img = images[index];
      if (img && img.complete && img.naturalWidth) {
        drawCover(img);
        currentFrame = index;
      }
    };

    // Preload every frame.
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = framePath(i);
      img.onload = () => {
        if (reduce && i === idleFrame) drawFrame(idleFrame);
        else if (!reduce && i === 0) drawFrame(0);
      };
      images[i] = img;
    }

    const onResize = () => {
      const idx = currentFrame >= 0 ? currentFrame : reduce ? idleFrame : 0;
      const img = images[idx];
      if (img) drawCover(img);
    };
    window.addEventListener("resize", onResize);

    if (reduce) {
      // Static frame — no scroll-driven scrub.
      drawFrame(idleFrame);
      return () => window.removeEventListener("resize", onResize);
    }

    const loop = () => {
      const top = container.getBoundingClientRect().top;
      const scrollable = container.offsetHeight - window.innerHeight;
      const progress = scrollable > 0 ? clamp(-top / scrollable, 0, 1) : 0;
      const target = Math.round(progress * (FRAME_COUNT - 1));
      if (target !== currentFrame) drawFrame(target);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [reduce]);

  const ease = [0.25, 0, 0, 1] as const;
  const fade = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 18 },
    animate: reduce ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: reduce ? 0 : delay, ease },
  });

  return (
    <div ref={containerRef} style={{ height: "300vh", position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          background: colors.canvas,
        }}
      >
        <canvas
          ref={canvasRef}
          style={{ display: "block", width: "100%", height: "100%" }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding:
              "0 clamp(24px, 6vw, 96px) clamp(56px, 12vh, 120px)",
            pointerEvents: "none",
            background:
              "linear-gradient(to top, rgba(244,240,230,0.92) 0%, rgba(244,240,230,0.4) 50%, transparent 100%)",
          }}
        >
          <div style={{ maxWidth: 640 }}>
            <motion.p
              {...fade(0.6)}
              style={{
                fontFamily: sans,
                fontSize: "0.65rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: colors.accent,
                fontWeight: 500,
                marginBottom: 24,
              }}
            >
              On your phone only · No cloud · No account
            </motion.p>

            <motion.h1
              {...fade(0.75)}
              style={{
                fontFamily: serif,
                fontWeight: 400,
                color: colors.ink,
                fontSize: "clamp(2.4rem, 6vw, 5.5rem)",
                lineHeight: 1.04,
                letterSpacing: "-0.01em",
                margin: 0,
              }}
            >
              make it count
              <AccentPeriod />
            </motion.h1>

            <motion.p
              {...fade(0.9)}
              style={{
                fontFamily: sans,
                fontWeight: 300,
                color: colors.body,
                fontSize: "clamp(1rem, 2vw, 1.15rem)",
                lineHeight: 1.6,
                maxWidth: 460,
                margin: "24px 0 0",
              }}
            >
              {"An honest tracker for the habits you don't talk about. One tap from your wrist."}
            </motion.p>

            <motion.a
              {...fade(1.05)}
              href="#the-math"
              style={{
                display: "inline-block",
                marginTop: 40,
                background: colors.accent,
                color: colors.canvas,
                fontFamily: sans,
                fontWeight: 500,
                fontSize: "0.7rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                padding: "0.9rem 2.6rem",
                pointerEvents: "auto",
              }}
            >
              See how it counts
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
}
