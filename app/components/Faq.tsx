"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import AccentPeriod from "./AccentPeriod";
import { colors, sans, display, type, weight, layout, ease, labelStyle } from "../lib/tokens";
import { faqs } from "../lib/content";

// One accordion row. Each item owns its own open state, so any number of
// items may be expanded at once — there is no shared "active index".
function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const questionId = `faq-question-${index}`;
  const answerId = `faq-answer-${index}`;

  return (
    <div style={{ borderBottom: `1px solid ${colors.borderSubtle}` }}>
      <h3 style={{ margin: 0, fontSize: "1rem" }}>
        <button
          id={questionId}
          type="button"
          aria-expanded={open}
          aria-controls={answerId}
          onClick={() => setOpen((v) => !v)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            background: "none",
            border: "none",
            cursor: "pointer",
            textAlign: "left",
            padding: "24px 4px",
            fontFamily: sans,
            fontWeight: weight.heading,
            fontSize: "1rem",
            color: colors.ink,
          }}
        >
          <span>{q}</span>
          <motion.span
            aria-hidden
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: reduce ? 0 : 0.3, ease }}
            style={{ flexShrink: 0, display: "inline-flex" }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke={colors.accent}
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6l5 5 5-5" />
            </svg>
          </motion.span>
        </button>
      </h3>

      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            id={answerId}
            role="region"
            aria-labelledby={questionId}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.35, ease }}
            style={{ overflow: "hidden" }}
          >
            <p
              style={{
                margin: "0 0 24px",
                paddingRight: 32,
                fontFamily: sans,
                fontWeight: weight.body,
                color: colors.body,
                fontSize: "0.95rem",
                lineHeight: 1.65,
              }}
            >
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  // Structured data built FROM the same array rendered below, so visible
  // copy and JSON-LD can never drift apart.
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <section id="faq" style={{ padding: `${layout.padY} ${layout.padX}`, background: colors.cardCream }}>
      <div style={{ maxWidth: layout.contentMax, margin: "0 auto" }}>
        <Reveal>
          <p style={labelStyle}>FAQ</p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2
            style={{
              fontFamily: display,
              fontWeight: weight.section,
              fontSize: type.section,
              letterSpacing: "-0.02em",
              color: colors.ink,
              lineHeight: 1.15,
              margin: "16px 0 0",
            }}
          >
            Questions, answered
            <AccentPeriod />
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <div style={{ marginTop: 48, borderTop: `1px solid ${colors.borderSubtle}` }}>
            {faqs.map((item, i) => (
              <FaqItem key={item.q} q={item.q} a={item.a} index={i} />
            ))}
          </div>
        </Reveal>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </section>
  );
}
