"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SplitWords, useKit } from "./MotionKit";
import { VISUALS } from "./ServiceVisuals";
import { SERVICES } from "@/data/services";

// Homepage: three services, each with its own interface visual, and one link to /services.
// The cards are not links on purpose: all detail lives on the single /services page.
export default function ServicesPreview() {
  const { item, line, stagger } = useKit();
  const viewport = { once: true, margin: "-12%" };

  return (
    <section
      id="services"
      aria-labelledby="services-preview-title"
      className="relative z-10 scroll-mt-4 overflow-x-clip px-6 py-20 md:px-11 md:py-28 2xl:px-16"
    >
      <motion.div
        variants={stagger(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="relative mb-10 max-w-3xl md:mb-14"
      >
        <motion.p
          variants={item}
          className="space-mono-bold mb-4 text-[11px] uppercase tracking-[0.2em] text-violet-400 sm:text-xs sm:tracking-[0.3em] md:text-sm"
        >
          Services
        </motion.p>
        <h2 id="services-preview-title" className="space-grotesk text-[clamp(2.2rem,7vw,4.25rem)] font-bold leading-[1.05] tracking-tight">
          <SplitWords text="Built around what you" />{" "}
          <SplitWords text="actually need." className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.5)]" />
        </h2>
        <motion.p variants={item} className="outfit mt-5 max-w-xl text-lg text-gray-400 md:text-xl">
          A clear online presence, a store that sells, or software shaped around how you work. I start by understanding the problem.
        </motion.p>
        <motion.div variants={line} className="mt-8 h-px origin-left bg-gradient-to-r from-violet-500/70 via-white/10 to-transparent" />
      </motion.div>

      <motion.ul
        variants={stagger(0.14)}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1.25fr]"
      >
        {SERVICES.map((s) => {
          const Visual = VISUALS[s.id];
          return (
            <motion.li key={s.id} variants={item} className={s.id === "systems" ? "md:col-span-2 lg:col-span-1" : ""}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] transition-colors duration-500 hover:border-violet-400/50">
                <div className="relative h-56 overflow-hidden border-b border-white/10 bg-gradient-to-b from-violet-600/10 to-transparent sm:h-64">
                  <span className="space-mono-bold absolute left-5 top-4 z-10 text-xs tracking-[0.3em] text-violet-400">{s.num}</span>
                  <Visual />
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <h3 className="space-grotesk text-2xl font-bold leading-tight md:text-[1.7rem]">{s.title}</h3>
                  <p className="outfit mt-3 text-base text-gray-400 md:text-lg">{s.short}</p>
                  <p className="space-mono-bold mt-auto pt-6 text-[11px] text-gray-500">{s.tags.join(" / ")}</p>
                </div>
              </article>
            </motion.li>
          );
        })}
      </motion.ul>

      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="relative mt-10 md:mt-14"
      >
        <motion.div variants={item}>
          <Link
            href="/services"
            className="outfit group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full border border-[#3d0eb2] px-7 text-base font-semibold transition-colors duration-300 hover:bg-[#3d0eb2] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400 sm:w-auto"
          >
            Explore All Services
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}