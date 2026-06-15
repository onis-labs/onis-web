"use client";

import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import AccentPeriod from "./AccentPeriod";
import { colors, labelStyle, serif, sans } from "../lib/tokens";

const creamDim = "rgba(244,240,230,0.72)";

export default function PrivacySection() {
  const reduce = useReducedMotion();

  return (
    <section
      style={{
        background: colors.ink,
        color: colors.canvas,
        padding: "clamp(112px, 20vh, 220px) clamp(24px, 6vw, 80px)",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <Reveal>
          <p style={{ ...labelStyle, color: colors.dim }}>Privacy</p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2
            style={{
              fontFamily: serif,
              fontWeight: 400,
              color: colors.canvas,
              fontSize: "clamp(2.2rem, 5.5vw, 4rem)",
              lineHeight: 1.1,
              margin: "16px 0 0",
            }}
          >
            <span style={{ position: "relative", display: "inline-block" }}>
              Nothing
              <motion.span
                aria-hidden
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: "0.04em",
                  height: 3,
                  background: colors.accent,
                  transformOrigin: "left center",
                  display: "block",
                }}
                initial={{ scaleX: reduce ? 1 : 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0, 0, 1] }}
              />
            </span>{" "}
            leaves your phone
            <AccentPeriod />
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p
            style={{
              fontFamily: sans,
              fontWeight: 300,
              color: creamDim,
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              lineHeight: 1.6,
              maxWidth: 520,
              marginTop: 28,
            }}
          >
            No account. No email. No analytics. No tracking of you tracking
            yourself.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 32,
              marginTop: 64,
              borderTop: "1px solid rgba(244,240,230,0.14)",
              paddingTop: 40,
            }}
          >
            <div>
              <p style={{ ...labelStyle, color: colors.dim, marginBottom: 12 }}>
                What we store
              </p>
              <p
                style={{
                  fontFamily: serif,
                  fontSize: "1.15rem",
                  color: colors.canvas,
                }}
              >
                Your counts, on your device.
              </p>
            </div>
            <div>
              <p style={{ ...labelStyle, color: colors.dim, marginBottom: 12 }}>
                What we send
              </p>
              <p
                style={{
                  fontFamily: serif,
                  fontSize: "1.15rem",
                  color: colors.accent,
                }}
              >
                Nothing.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <p
            style={{
              fontFamily: sans,
              fontWeight: 300,
              color: creamDim,
              fontSize: "0.95rem",
              lineHeight: 1.6,
              marginTop: 48,
              maxWidth: 560,
            }}
          >
            {
              'Apple’s privacy label reads “Data Not Collected” — because nothing is.'
            }
          </p>
        </Reveal>
      </div>
    </section>
  );
}
