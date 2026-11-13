"use client";

import { motion, useReducedMotion } from "framer-motion";
import HeroVisual from "./HeroVisual";

const EASE = [0.76, 0, 0.24, 1]; // same easing as the mobile menu

const PROJECTS = [
  "Lunora Pk",
  "OOTD Designs",
  "Scarpa.pk",
  "SnapFlow",
  "TKA International",
];

// Same text in both layers. Phone: 4 lines, tablet and up: 2 lines.
function HeadlineText() {
  return (
    <>
      If it can be<br className="md:hidden" /> imagined,
      <br />
      I want to<br className="md:hidden" /> build it.
    </>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();

  // Staggered entrance for the supporting content
  const rise = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: "easeOut" },
        };

  return (
    <section
      id="home"
      className="relative z-10 flex min-h-[calc(100svh-5.5rem)] items-center overflow-x-clip px-6 pb-12 pt-10 md:px-11 lg:h-[max(calc(100svh_-_4.25rem),34rem)] lg:min-h-0 lg:py-0 2xl:px-16"
    >
      {/* lg+: the hero is exactly one screen tall (screen height minus the navbar) */}
      <div className="grid w-full lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-x-10">
        {/* Left: text */}
        <div>
          <motion.p
            {...rise(0.1)}
            className="space-mono-bold mb-5 text-[11px] uppercase tracking-[0.2em] text-violet-400 sm:text-xs sm:tracking-[0.3em] md:mb-6 md:text-sm"
          >
            Independent full-stack developer
          </motion.p>

          <h1 className="space-grotesk relative w-fit text-[clamp(2.5rem,11.5vw,3.75rem)] font-bold leading-[1.05] tracking-tight md:text-[clamp(2.8rem,6.4vw,5.5rem)] lg:text-[clamp(2.6rem,4vw,4.75rem)] 2xl:text-[clamp(4rem,4.6vw,7rem)]">
            {/* Layer 1: the idea (outline) */}
            <motion.span
              aria-hidden="true"
              className="block text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.4)]"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <HeadlineText />
            </motion.span>

            {/* Layer 2: the built version (solid), revealed by the sweep */}
            <motion.span
              className="absolute inset-0 block text-white"
              initial={reduce ? false : { clipPath: "inset(-10% 100% -10% 0)" }}
              animate={{ clipPath: "inset(-10% -2% -10% 0)" }}
              transition={{ duration: reduce ? 0 : 1.1, delay: 0.45, ease: EASE }}
            >
              <HeadlineText />
            </motion.span>

            {/* The light line that "builds" the text */}
            {!reduce && (
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-[4%] left-0 w-[2px] bg-gradient-to-b from-transparent via-violet-400 to-transparent"
                initial={{ left: "0%", opacity: 0 }}
                animate={{ left: "100%", opacity: [0, 1, 1, 0] }}
                transition={{
                  left: { duration: 1.1, delay: 0.45, ease: EASE },
                  opacity: {
                    duration: 1.1,
                    delay: 0.45,
                    times: [0, 0.1, 0.85, 1],
                    ease: "linear",
                  },
                }}
              />
            )}
          </h1>

          <motion.p
            {...rise(1.0)}
            className="outfit mt-6 max-w-xl text-lg text-gray-400 md:mt-8 md:text-xl 2xl:max-w-2xl 2xl:text-2xl"
          >
            I build websites and web applications, from the first idea to a
            working product.
          </motion.p>

          <motion.a
            {...rise(1.2)}
            href="#work"
            className="outfit group mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-[#3d0eb2] px-7 py-3.5 text-base font-semibold transition-colors duration-300 hover:bg-violet-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400 sm:inline-flex sm:w-auto md:mt-10"
          >
            See the work
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </motion.a>

          <motion.div {...rise(1.4)} className="mt-10 md:mt-16 lg:mt-20">
            <p className="space-mono-bold text-xs uppercase tracking-[0.3em] text-gray-300">
              Selected projects
            </p>
            <ul className="outfit mt-3 flex flex-wrap gap-x-5 gap-y-2 text-base text-gray-300 md:gap-x-6">
              {PROJECTS.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Right: Imagined -> Built.
            Phone: full width, edge to edge. Tablet: centered.
            Desktop: as tall as the hero (one screen), bleeds off the right edge. */}
        <HeroVisual className="-mx-6 mt-0 md:mx-auto md:mt-14 md:w-[min(80vw,32rem)] lg:ml-0 lg:mr-[-2.75rem] lg:mt-0 lg:h-[min(max(calc(100svh_-_4.25rem),34rem),66vw)] lg:w-auto lg:justify-self-end 2xl:mr-[-4rem]" />
      </div>
    </section>
  );
}
