"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SplitWords, useKit } from "./MotionKit";

// Same intro pattern as WorkPreview: eyebrow -> headline (word mask) -> paragraph -> rule.
export function SectionHead({ id, eyebrow, title, outline, intro, className = "" }) {
  const { item, line, stagger } = useKit();
  return (
    <motion.div
      variants={stagger(0.12)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-12%" }}
      className={`relative max-w-3xl ${className}`}
    >
      <motion.p
        variants={item}
        className="space-mono-bold mb-4 text-[11px] uppercase tracking-[0.2em] text-violet-400 sm:text-xs sm:tracking-[0.3em] md:text-sm"
      >
        {eyebrow}
      </motion.p>
      <h2 id={id} className="space-grotesk text-[clamp(2.2rem,7vw,4.25rem)] font-bold leading-[1.05] tracking-tight">
        <SplitWords text={title} />
        {outline && (
          <>
            {" "}
            <SplitWords text={outline} className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.5)]" />
          </>
        )}
      </h2>
      {intro && (
        <motion.p variants={item} className="outfit mt-5 max-w-xl text-lg text-gray-400 md:text-xl">
          {intro}
        </motion.p>
      )}
      <motion.div variants={line} className="mt-8 h-px origin-left bg-gradient-to-r from-violet-500/70 via-white/10 to-transparent" />
    </motion.div>
  );
}

// Pill CTA, same look as the rest of the site. `solid` = filled, otherwise outlined.
export function CtaLink({ href, children, solid = false, className = "" }) {
  return (
    <Link
      href={href}
      className={`outfit group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full px-7 text-base font-semibold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400 sm:w-auto ${
        solid ? "bg-[#3d0eb2] hover:bg-violet-600" : "border border-[#3d0eb2] hover:bg-[#3d0eb2]"
      } ${className}`}
    >
      {children}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}