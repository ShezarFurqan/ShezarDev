"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import WorkProject from "./WorkProject";
import ProjectDetail from "./ProjectDetails";
import Orbits from "./Orbits";
import { EASE_OUT, SplitWords, useKit } from "./MotionKit"
import { PROJECTS } from "@/data/projects";

const PRINCIPLE = "When my clients succeed, I consider it my success too.";

// A statement that "lights up" word by word as you scroll through it.
function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.28em] inline-block">
      {children}
    </motion.span>
  );
}

function ScrollWords({ text, className }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) =>
        reduce ? (
          <span key={i} className="mr-[0.28em] inline-block">
            {w}
          </span>
        ) : (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
            {w}
          </Word>
        )
      )}
    </p>
  );
}

export default function WorkPage() {
  const { reduce, item, line, stagger } = useKit();
  const [selected, setSelected] = useState(null); // { project, origin }

  // Stable callbacks so the memoized project sections don't re-render when the overlay opens.
  const openProject = useCallback((project, origin) => setSelected({ project, origin }), []);
  const closeProject = useCallback(() => setSelected(null), []);

  // Intro scroll motion
  const introRef = useRef(null);
  const { scrollYProgress: introProgress } = useScroll({ target: introRef, offset: ["start start", "end start"] });
  const bgX = useTransform(introProgress, [0, 1], ["0%", "-18%"]);
  const textY = useTransform(introProgress, [0, 1], ["0%", "14%"]);
  const introFade = useTransform(introProgress, [0, 0.8], [1, 0]);

  // Whole-page progress bar
  const { scrollYProgress: pageProgress } = useScroll();

  return (
    <main className="relative z-10">
      {!reduce && (
        <motion.div
          aria-hidden="true"
          style={{ scaleX: pageProgress }}
          className="fixed inset-x-0 top-0 z-[120] h-[2px] origin-left bg-gradient-to-r from-violet-600 via-violet-400 to-violet-300"
        />
      )}

      {/* Introduction: plays on page load */}
      <section
        ref={introRef}
        className="relative flex min-h-[calc(100svh-5.5rem)] items-center overflow-x-clip px-6 pb-16 pt-14 md:px-11 2xl:px-16"
      >
        <motion.div
          aria-hidden="true"
          className="absolute inset-0"
          initial={reduce ? false : { opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: EASE_OUT }}
        >
          <Orbits />
        </motion.div>

        {/* Atmospheric typography: rises into place, then slides sideways as you scroll */}
        <motion.div
          aria-hidden="true"
          style={reduce ? undefined : { x: bgX }}
          className="pointer-events-none absolute bottom-10 left-0"
        >
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8, delay: 0.5, ease: EASE_OUT }}
            className="space-grotesk select-none whitespace-nowrap text-[clamp(4rem,16vw,15rem)] font-bold leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.07)]"
          >
            Build with purpose.
          </motion.p>
        </motion.div>

        <motion.div style={reduce ? undefined : { y: textY, opacity: introFade }} className="relative max-w-4xl">
          <motion.div variants={stagger(0.14, 0.15)} initial="hidden" animate="show">
            <motion.p
              variants={item}
              className="space-mono-bold mb-5 text-[11px] uppercase tracking-[0.2em] text-violet-400 sm:text-xs sm:tracking-[0.3em] md:text-sm"
            >
              Work archive · {PROJECTS.length} projects
            </motion.p>

            <h1 className="space-grotesk text-[clamp(2.8rem,12vw,6.5rem)] font-bold leading-[1.02] tracking-tight">
              <SplitWords text="Everything I've built." />{" "}
              <SplitWords
                text="So far."
                className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.5)]"
              />
            </h1>

            <motion.div variants={line} className="mt-8 h-px max-w-md origin-left bg-gradient-to-r from-violet-500/70 to-transparent md:mt-10" />

            <motion.p variants={item} className="outfit mt-7 max-w-xl text-lg text-gray-400 md:text-xl">
              I started building websites young and kept going. This is the full list, client work included. I&apos;m still early in the
              journey, and I&apos;d rather let the work show where I am than say it for myself.
            </motion.p>

            <motion.a
              variants={item}
              href="#principle"
              className="outfit group mt-8 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-[#3d0eb2] px-7 text-base font-semibold transition-colors duration-300 hover:bg-violet-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400 sm:w-auto"
            >
              Scroll to explore
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-y-1">↓</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      {/* How I work with clients */}
      <section id="principle" className="relative scroll-mt-4 overflow-x-clip px-6 py-24 md:px-11 md:py-36 2xl:px-16">
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[110px]" />
        <div className="relative mx-auto max-w-5xl">
          <motion.div
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-15%" }}
          >
            <motion.p variants={item} className="space-mono-bold mb-6 text-[11px] uppercase tracking-[0.2em] text-violet-400 sm:text-xs sm:tracking-[0.3em] md:text-sm">
              How I work with clients
            </motion.p>
            <motion.div variants={line} className="h-px origin-left bg-gradient-to-r from-violet-500/70 via-white/10 to-transparent" />
          </motion.div>

          <ScrollWords
            text={PRINCIPLE}
            className="space-grotesk mt-10 text-[clamp(2rem,6.4vw,4.75rem)] font-bold leading-[1.1] tracking-tight md:mt-14"
          />

          <motion.p
            variants={item}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10%" }}
            className="outfit mt-8 max-w-xl text-lg text-gray-400 md:mt-12 md:text-xl"
          >
            I measure my work by the value it creates for the people who trust me. A project isn&apos;t done when the requirements are
            ticked off.
          </motion.p>
        </div>
      </section>

      {/* One screen per project */}
      {PROJECTS.map((p, i) => (
        <WorkProject key={p.slug} project={p} index={i} total={PROJECTS.length} onOpen={openProject} />
      ))}

      <div className="px-6 pb-24 pt-6 md:px-11 2xl:px-16">
        <Link
          href="/#work"
          className="outfit group inline-flex min-h-11 items-center gap-3 text-base font-semibold text-gray-300 transition-colors duration-300 hover:text-violet-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400"
        >
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
          Back to home
        </Link>
      </div>

      <AnimatePresence>
        {selected && <ProjectDetail key={selected.project.slug} project={selected.project} origin={selected.origin} onClose={closeProject} />}
      </AnimatePresence>
    </main>
  );
}