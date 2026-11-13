"use client";

import { motion, useReducedMotion } from "framer-motion";

// Shared motion vocabulary so the homepage section and the /work page feel like one system.
// Everything here animates transform / opacity (and one-off clip-paths) only.
export const EASE_OUT = [0.22, 1, 0.36, 1]; // soft, cinematic deceleration
export const EASE_IO = [0.76, 0, 0.24, 1]; // same easing as the navbar menu

const ITEM = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_OUT } },
};
const LINE = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1.2, ease: EASE_IO } },
};
const WORD = {
  hidden: { y: "115%" },
  show: { y: "0%", transition: { duration: 1, ease: EASE_OUT } },
};
const STILL = { hidden: { opacity: 1 }, show: { opacity: 1 } };

// Variants that respect prefers-reduced-motion.
//   item     -> fade + rise
//   line     -> a rule that draws itself left to right
//   stagger  -> parent that staggers its children (use with initial="hidden" + animate/whileInView="show")
export function useKit() {
  const reduce = useReducedMotion();
  return {
    reduce,
    item: reduce ? STILL : ITEM,
    line: reduce ? STILL : LINE,
    stagger: (gap = 0.1, delay = 0) =>
      reduce ? { hidden: {}, show: {} } : { hidden: {}, show: { transition: { staggerChildren: gap, delayChildren: delay } } },
  };
}

// Headline reveal: each word slides up out of a mask. Must sit inside a motion
// parent that uses stagger() variants, which sets the timing.
export function SplitWords({ text, className = "" }) {
  const reduce = useReducedMotion();
  if (reduce) return <span className={className}>{text}</span>;
  return (
    <span className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.15em] align-bottom -mb-[0.15em]">
          <motion.span className="inline-block" variants={WORD}>
            {w}
          </motion.span>
          {" "}
        </span>
      ))}
    </span>
  );
}

// Simple scroll-in wrapper: fades and rises once when it enters the viewport.
export function Reveal({ children, className = "", delay = 0, margin = "-10%" }) {
  const { item, reduce } = useKit();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      variants={item}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}