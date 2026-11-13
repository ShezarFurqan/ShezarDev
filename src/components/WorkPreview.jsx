"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import ProjectShowcase from "./ProjectShowcase";
import Orbits from "./Orbits";
import { SplitWords, useKit } from "./MotionKit";
import { FEATURED_PROJECTS, PROJECTS } from "@/data/projects";

// Homepage: short intro, 3 featured projects with a desktop/mobile toggle, link to the archive.
export default function WorkPreview() {
  const { reduce, item, line, stagger } = useKit();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const orbitY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const viewport = { once: true, margin: "-12%" };

  return (
    <section ref={ref} id="work" className="relative z-10 overflow-x-clip px-6 py-20 md:px-11 md:py-28 2xl:px-16">
      {/* Atmosphere drifts slowly against the scroll */}
      <motion.div aria-hidden="true" style={reduce ? undefined : { y: orbitY }} className="pointer-events-none absolute inset-0">
        <Orbits />
      </motion.div>

      {/* Introduction: eyebrow -> headline (word mask) -> paragraph -> rule */}
      <motion.div
        variants={stagger(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="relative mb-6 max-w-3xl md:mb-10"
      >
        <motion.p
          variants={item}
          className="space-mono-bold mb-4 text-[11px] uppercase tracking-[0.2em] text-violet-400 sm:text-xs sm:tracking-[0.3em] md:text-sm"
        >
          Selected work
        </motion.p>
        <h2 className="space-grotesk text-[clamp(2.2rem,7vw,4.25rem)] font-bold leading-[1.05] tracking-tight">
          <SplitWords text="Every project has a reason." />
        </h2>
        <motion.p variants={item} className="outfit mt-5 max-w-xl text-lg text-gray-400 md:text-xl">
          Three projects I&apos;m proud of, built for real people. Switch between desktop and mobile to see them the way their users do.
        </motion.p>
        <motion.div variants={line} className="mt-8 h-px origin-left bg-gradient-to-r from-violet-500/70 via-white/10 to-transparent" />
      </motion.div>

      <div className="relative">
        <ProjectShowcase projects={FEATURED_PROJECTS} />
      </div>

      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="relative mt-10 md:mt-14"
      >
        <motion.div variants={item}>
          <Link
            href="/work"
            className="outfit group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full border border-[#3d0eb2] px-7 text-base font-semibold transition-colors duration-300 hover:bg-[#3d0eb2] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400 sm:w-auto"
          >
            See all {PROJECTS.length} projects
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}