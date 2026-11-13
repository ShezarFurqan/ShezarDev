"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import DeviceMockup from "./DeviceMockup";
import { EASE_OUT, SplitWords, useKit } from "./MotionKit";

const pad = (n) => String(n).padStart(2, "0");

function ModeToggle({ slug, mode, onChange }) {
  const reduce = useReducedMotion();
  const options = [
    { id: "desktop", label: "Desktop" },
    { id: "mobile", label: "Mobile" },
  ];
  return (
    <div
      role="group"
      aria-label="Preview device"
      className="outfit relative inline-flex rounded-full border border-white/15 bg-white/5 p-1"
    >
      {options.map((o) => {
        const on = mode === o.id;
        return (
          <button
            key={o.id}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(o.id)}
            className="relative min-h-11 min-w-28 rounded-full px-5 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
          >
            {on && (
              <motion.span
                layoutId={`pill-${slug}`}
                className="absolute inset-0 rounded-full bg-[#3d0eb2]"
                transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 34 }}
              />
            )}
            <span className={`relative ${on ? "text-white" : "text-gray-400"}`}>{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function Showcase({ project, index }) {
  const { reduce, item, line, stagger } = useKit();
  const [mode, setMode] = useState("desktop");
  const ref = useRef(null);
  const flip = index % 2 === 1;
  const viewport = { once: true, margin: "-15%" };

  // The device drifts a little against the scroll: depth without extra elements.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const deviceY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <article ref={ref} className="relative grid items-center gap-8 py-12 md:gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 lg:py-20">
      {/* A rule draws itself between projects */}
      <motion.div
        variants={line}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-white/20 via-white/10 to-transparent"
      />

      {/* Text: staggered, top to bottom */}
      <motion.div
        variants={stagger(0.09, 0.05)}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className={flip ? "lg:order-2" : ""}
      >
        <motion.p variants={item} className="space-mono-bold text-xs tracking-[0.3em] text-violet-400">
          {pad(index + 1)} / 03{project.year ? ` · ${project.year}` : ""}
        </motion.p>
        <h3 className="space-grotesk mt-3 text-[clamp(2.2rem,9vw,3.5rem)] font-bold leading-[1.05] tracking-tight lg:text-[clamp(2.4rem,3.6vw,4rem)]">
          <SplitWords text={project.name} />
        </h3>

        {project.description && (
          <motion.p variants={item} className="outfit mt-4 max-w-md text-base text-gray-400 md:text-lg">
            {project.description}
          </motion.p>
        )}

        {project.stack?.length > 0 && (
          <motion.ul
            variants={stagger(0.05)}
            className="space-mono-bold mt-5 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.15em]"
          >
            {project.stack.map((s) => (
              <motion.li key={s} variants={item} className="rounded-full border border-violet-500/40 px-3 py-1.5 text-gray-300">
                {s}
              </motion.li>
            ))}
          </motion.ul>
        )}

        <motion.div variants={item} className="mt-7">
          <ModeToggle slug={project.slug} mode={mode} onChange={setMode} />
        </motion.div>

        <motion.div variants={item} className="outfit mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-base font-semibold">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-[#3d0eb2] px-6 transition-colors duration-300 hover:bg-violet-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400"
            >
              Visit live site
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </a>
          )}
          <Link
            href={`/work#${project.slug}`}
            className="group inline-flex min-h-11 items-center gap-2 text-gray-300 transition-colors duration-300 hover:text-violet-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400"
          >
            Explore in the archive
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Device: rises and settles into place, then drifts with scroll */}
      <div className={flip ? "lg:order-1" : ""}>
        <motion.div style={reduce ? undefined : { y: deviceY }}>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 70, scale: 0.92 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={viewport}
            transition={{ duration: 1.1, delay: 0.15, ease: EASE_OUT }}
          >
            <DeviceMockup project={project} mode={mode} priority={index === 0} />
          </motion.div>
        </motion.div>
      </div>
    </article>
  );
}

export default function ProjectShowcase({ projects }) {
  return (
    <div>
      {projects.map((p, i) => (
        <Showcase key={p.slug} project={p} index={i} />
      ))}
    </div>
  );
}