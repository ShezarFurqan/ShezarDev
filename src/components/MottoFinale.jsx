"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { MOTTO } from "@/data/story";

// The motto is not a quote card. The first half ("I can lose") is spoken and then dims.
// The second half ("but I won't give up") arrives while an orbit closes into a complete ring,
// so the line is something that gets finished, not just read. Scroll-linked, transform/opacity only.
export default function MottoFinale() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start 0.75", "end 0.45"] });

  const firstOpacity = useTransform(p, [0, 0.2, 0.4, 0.58], [0.15, 0.95, 0.95, 0.4]);
  const secondOpacity = useTransform(p, [0.3, 0.55], [0.08, 1]);
  const secondY = useTransform(p, [0.3, 0.55], [24, 0]);
  const ring = useTransform(p, [0.2, 0.75], [0, 1]);
  const englishOpacity = useTransform(p, [0.55, 0.75], [0, 1]);

  const s = (style) => (reduce ? undefined : style);

  return (
    <section
      ref={ref}
      aria-label="My motto"
      className="relative flex min-h-[110svh] items-center justify-center overflow-x-clip px-6 py-24 md:px-11"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 400 400"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[min(120vw,46rem)] w-[min(120vw,46rem)] -translate-x-1/2 -translate-y-1/2 -rotate-90"
        fill="none"
      >
        <circle cx="200" cy="200" r="190" stroke="rgba(167,139,250,0.1)" strokeWidth="1" />
        <motion.circle
          cx="200"
          cy="200"
          r="190"
          stroke="rgb(167,139,250)"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={reduce ? { pathLength: 1 } : { pathLength: ring }}
        />
      </svg>

      <div className="relative text-center">
        <p className="space-mono-bold mb-8 text-[11px] uppercase tracking-[0.3em] text-violet-400 sm:text-xs">{MOTTO.eyebrow}</p>

        <p lang="ur-Latn" className="space-grotesk text-[clamp(1.9rem,7vw,5rem)] font-bold leading-[1.1] tracking-tight">
          <motion.span style={s({ opacity: firstOpacity })} className="block">
            {MOTTO.first}
          </motion.span>
          <motion.span style={s({ opacity: secondOpacity, y: secondY })} className="mt-2 block">
            {MOTTO.second}
          </motion.span>
        </p>

        <motion.p style={s({ opacity: englishOpacity })} className="outfit mt-8 text-lg text-gray-400 md:text-xl">
          {MOTTO.english}
        </motion.p>
      </div>
    </section>
  );
}