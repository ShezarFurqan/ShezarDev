"use client";

import { memo, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { BrowserFrame, Screen } from "./DeviceMockup";
import { EASE_OUT, SplitWords, useKit } from "./MotionKit";

const pad = (n) => String(n).padStart(2, "0");

// One project = roughly one screen. Three compositions rotate so the page
// doesn't repeat itself, while type, spacing and framing stay consistent.
//
// Motion, in order of what the visitor sees while scrolling down:
//   1. a rule draws across the top of the section
//   2. the screenshot is revealed through an expanding frame, then drifts (parallax)
//   3. number, title, description, stack and link stagger in
//   4. as the section leaves, it recedes (slight scale + fade) so the next project takes over
function WorkProject({ project, index, total, onOpen }) {
  const reduce = useReducedMotion();
  const { item, line, stagger } = useKit();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // All transform / opacity: no layout work while scrolling.
  const imageY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);
  const phoneY = useTransform(scrollYProgress, [0, 1], ["16%", "-16%"]);
  const numberX = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const stageOpacity = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [0.25, 1, 1, 0.25]);
  const stageScale = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [0.95, 1, 1, 0.95]);

  const layout = index % 3; // 0: text left / 1: text right / 2: centered
  const viewport = { once: true, margin: "-15%" };

  const open = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const clamp = (v) => Math.min(0.95, Math.max(0.05, v));
    onOpen(project, {
      x: clamp((r.left + r.width / 2) / window.innerWidth),
      y: clamp((r.top + r.height / 2) / window.innerHeight),
    });
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open(e);
    }
  };

  const info = (
    <motion.div
      variants={stagger(0.1, 0.1)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className={layout === 2 ? "mx-auto max-w-2xl text-center" : ""}
    >
      <motion.p variants={item} className="space-mono-bold text-xs tracking-[0.3em] text-violet-400">
        {pad(index + 1)} / {pad(total)}
        {project.year ? ` · ${project.year}` : ""}
      </motion.p>
      <h2 className="space-grotesk mt-3 text-[clamp(2.4rem,10vw,4rem)] font-bold leading-[1.02] tracking-tight lg:text-[clamp(2.6rem,4.4vw,5rem)]">
        <SplitWords text={project.name} />
      </h2>
      {project.description && (
        <motion.p variants={item} className={`outfit mt-4 text-base text-gray-400 md:text-lg ${layout === 2 ? "" : "max-w-md"}`}>
          {project.description}
        </motion.p>
      )}
      {project.stack?.length > 0 && (
        <motion.ul
          variants={stagger(0.05)}
          className={`space-mono-bold mt-5 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.15em] ${layout === 2 ? "justify-center" : ""}`}
        >
          {project.stack.map((s) => (
            <motion.li key={s} variants={item} className="rounded-full border border-violet-500/40 px-3 py-1.5 text-gray-300">
              {s}
            </motion.li>
          ))}
        </motion.ul>
      )}
      <motion.div variants={item} className={`mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 ${layout === 2 ? "justify-center" : ""}`}>
        <button
          type="button"
          onClick={open}
          className="outfit group inline-flex min-h-11 items-center gap-2 rounded-full border border-[#3d0eb2] px-6 text-base font-semibold transition-colors duration-300 hover:bg-[#3d0eb2] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400"
        >
          View project
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </button>
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="outfit group inline-flex min-h-11 items-center gap-2 text-base font-semibold text-gray-300 transition-colors duration-300 hover:text-violet-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400"
          >
            Visit live site
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          </a>
        )}
      </motion.div>
    </motion.div>
  );

  const visual = (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Open ${project.name} project details`}
      onClick={open}
      onKeyDown={onKeyDown}
      className="group relative cursor-pointer rounded-xl focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-violet-400"
    >
      <motion.div style={reduce ? undefined : { y: imageY, scale: imageScale }} className="will-change-transform">
        {/* Reveal: the frame opens from a smaller window while easing down from a slight zoom */}
        <motion.div
          initial={reduce ? false : { clipPath: "inset(12% 9% 12% 9% round 20px)", opacity: 0, scale: 1.1 }}
          whileInView={{ clipPath: "inset(-20% -15% -20% -15% round 20px)", opacity: 1, scale: 1 }}
          viewport={viewport}
          transition={{ duration: 1.3, ease: EASE_OUT }}
        >
          <div className="transition-transform duration-700 ease-out group-hover:scale-[1.015]">
            <BrowserFrame project={project} priority={index === 0} sizes="(min-width: 1024px) 58vw, 100vw" />
          </div>
        </motion.div>
      </motion.div>

      {/* Mobile screenshot floats in front at a different scroll speed, for depth */}
      {project.mobileImage && (
        <motion.div
          style={reduce ? undefined : { y: phoneY }}
          className="absolute -bottom-6 right-3 w-[22%] min-w-[5.5rem] will-change-transform md:-bottom-10 md:right-6"
        >
          <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.1rem] border-[5px] border-[#16163f] bg-black shadow-[0_24px_60px_-12px_rgba(91,33,182,0.6)]">
            <Screen project={project} mode="mobile" sizes="12rem" />
          </div>
        </motion.div>
      )}

      {/* Always visible on touch screens; fades in on hover for mouse users */}
      <span className="space-mono-bold pointer-events-none absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-white opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
        View project <span aria-hidden="true">↗</span>
      </span>
    </div>
  );

  return (
    <section
      ref={ref}
      id={project.slug}
      className="relative flex min-h-[100svh] scroll-mt-4 items-center overflow-x-clip px-6 py-20 md:px-11 lg:py-16 2xl:px-16"
    >
      {index > 0 && (
        <motion.div
          variants={line}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-5%" }}
          className="absolute inset-x-6 top-0 h-px origin-left bg-gradient-to-r from-violet-500/60 via-white/10 to-transparent md:inset-x-11 2xl:inset-x-16"
        />
      )}

      {/* Oversized outlined index drifting behind the project */}
      <motion.span
        aria-hidden="true"
        style={reduce ? undefined : { x: numberX }}
        className="space-grotesk pointer-events-none absolute right-0 top-6 select-none text-[clamp(8rem,34vw,26rem)] font-bold leading-none text-transparent [-webkit-text-stroke:1px_rgba(167,139,250,0.14)]"
      >
        {pad(index + 1)}
      </motion.span>

      {/* Stage: recedes as it leaves so consecutive projects hand over smoothly */}
      <motion.div style={reduce ? undefined : { opacity: stageOpacity, scale: stageScale }} className="relative w-full">
        {layout === 2 ? (
          <div className="space-y-10 md:space-y-14">
            {info}
            <div className="mx-auto w-full max-w-5xl">{visual}</div>
          </div>
        ) : (
          <div
            className={`grid w-full items-center gap-12 lg:gap-16 ${
              layout === 0 ? "lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]" : "lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]"
            }`}
          >
            <div className={layout === 1 ? "lg:order-2" : ""}>{info}</div>
            <div className={layout === 1 ? "lg:order-1" : ""}>{visual}</div>
          </div>
        )}
      </motion.div>
    </section>
  );
}

// memo: opening the overlay re-renders the page, but not every project section
export default memo(WorkProject);