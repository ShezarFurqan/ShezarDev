"use client";

import { memo, useRef } from "react";
import { motion, useInView, useScroll } from "framer-motion";
import AboutPhoto from "./AboutPhoto";
import { SplitWords, useKit } from "./MotionKit";
import { CHAPTERS, IDENTITY, INTRO } from "@/data/story";

const pad = (n) => String(n).padStart(2, "0");

// One chapter. Its dot on the journey line lights up while it is near the middle of the screen.
const Chapter = memo(function Chapter({ chapter, index, total }) {
  const { item, stagger } = useKit();
  const ref = useRef(null);
  const active = useInView(ref, { margin: "-40% 0px -40% 0px" });

  return (
    <article
      ref={ref}
      aria-labelledby={`about-${chapter.id}`}
      className="relative flex min-h-[70svh] items-center py-14 pl-8 lg:min-h-[80svh] lg:pl-14"
    >
      <span
        aria-hidden="true"
        className={`absolute left-0 top-1/2 h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-500 ${
          active ? "scale-150 border-violet-400 bg-violet-400" : "border-white/30 bg-[#000119]"
        }`}
      />
      <motion.div
        variants={stagger(0.12, 0.05)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-20%" }}
      >
        <motion.p variants={item} className="space-mono-bold text-xs tracking-[0.3em] text-violet-400">
          {pad(index + 1)} / {pad(total)} · <span className="uppercase">{chapter.label}</span>
        </motion.p>
        <h3
          id={`about-${chapter.id}`}
          className="space-grotesk mt-4 text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.05] tracking-tight"
        >
          <SplitWords text={chapter.title} />
        </h3>
        <div className="mt-6 max-w-xl space-y-5">
          {chapter.body.map((paragraph, i) => (
            <motion.p key={i} variants={item} className="outfit text-lg text-gray-300 md:text-xl">
              {paragraph}
            </motion.p>
          ))}
        </div>

        {/* Optional bridge: ties a chapter back to the projects the visitor has just seen */}
        {chapter.bridge && (
          <motion.a
            variants={item}
            href={chapter.bridge.href}
            aria-label={chapter.bridge.label}
            className="group mt-8 inline-flex min-h-11 flex-wrap items-center gap-x-4 gap-y-1 rounded-full border border-white/15 px-5 py-2 transition-colors duration-300 hover:border-violet-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400"
          >
            <span className="space-mono-bold text-[11px] uppercase tracking-[0.2em] text-gray-300">{chapter.bridge.from}</span>
            <span
              aria-hidden="true"
              className="h-px w-12 origin-left bg-gradient-to-r from-white/30 to-violet-400 transition-transform duration-500 group-hover:scale-x-125"
            />
            <span className="space-mono-bold text-[11px] uppercase tracking-[0.2em] text-violet-400">{chapter.bridge.to}</span>
          </motion.a>
        )}
      </motion.div>
    </article>
  );
});

// Homepage About section. Large screens: the portrait stays pinned on the left while the story
// scrolls past on the right, joined by a line that fills as you go. Phones: portrait first, then
// the story.
export default function About() {
  const { reduce, item, line, stagger } = useKit();
  const storyRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: storyRef, offset: ["start 0.8", "end 0.4"] });

  return (
    <section id="about" aria-labelledby="about-title" className="relative z-10 scroll-mt-4 overflow-x-clip">
      <div
        ref={storyRef}
        className="relative px-6 pb-8 pt-20 md:px-11 md:pt-28 lg:grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 2xl:px-16"
      >
        {/* Portrait (pinned on large screens) */}
        <div className="lg:sticky lg:top-20 lg:flex lg:h-[calc(100svh-7rem)] lg:items-center lg:self-start">
          <AboutPhoto progress={scrollYProgress} />
        </div>

        {/* Story */}
        <div className="relative mt-14 lg:mt-0">
          <div aria-hidden="true" className="absolute inset-y-0 left-0 w-px bg-white/10" />
          <motion.div
            aria-hidden="true"
            style={{ scaleY: reduce ? 1 : scrollYProgress }}
            className="absolute inset-y-0 left-0 w-px origin-top bg-gradient-to-b from-violet-500 to-violet-300"
          />

          <div className="flex min-h-[60svh] items-center pb-12 pl-8 lg:min-h-[80svh] lg:pl-14">
            <motion.div
              variants={stagger(0.14, 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-10%" }}
            >
              <motion.p
                variants={item}
                className="space-mono-bold mb-5 text-[11px] uppercase tracking-[0.2em] text-violet-400 sm:text-xs sm:tracking-[0.3em] md:text-sm"
              >
                About
              </motion.p>
              <h2
                id="about-title"
                className="space-grotesk text-[clamp(2.6rem,9vw,6rem)] font-bold leading-[1.02] tracking-tight lg:text-[clamp(2.8rem,4.6vw,5.5rem)]"
              >
                <SplitWords text={IDENTITY.lead} />{" "}
                <SplitWords
                  text={IDENTITY.rest}
                  className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.5)]"
                />
              </h2>
              <motion.div variants={line} className="mt-8 h-px max-w-md origin-left bg-gradient-to-r from-violet-500/70 to-transparent" />
              <motion.p variants={item} className="outfit mt-7 max-w-xl text-lg text-gray-300 md:text-xl">
                {INTRO}
              </motion.p>
            </motion.div>
          </div>

          {CHAPTERS.map((c, i) => (
            <Chapter key={c.id} chapter={c} index={i} total={CHAPTERS.length} />
          ))}
        </div>
      </div>
    </section>
  );
}