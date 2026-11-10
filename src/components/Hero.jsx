"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.76, 0, 0.24, 1]; // same easing as the mobile menu

const PROJECTS = [
  "Lunora Pk",
  "OOTD Designs",
  "Scarpa.pk",
  "SnapFlow",
  "TKA International",
];

// Same text in both layers. Mobile: 4 lines, desktop: 2 lines.
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
      className="relative z-10 flex min-h-[calc(100svh-5.5rem)] items-center px-6 pb-16 md:px-11"
    >
      <div className="w-full max-w-6xl">
        <motion.p
          {...rise(0.1)}
          className="space-mono-bold mb-6 text-xs uppercase tracking-[0.3em] text-violet-400 md:text-sm"
        >
          Independent full-stack developer
        </motion.p>

        <h1 className="space-grotesk relative w-fit text-[clamp(2.4rem,10.5vw,3.6rem)] font-bold leading-[1.05] tracking-tight md:text-[clamp(2.8rem,6.4vw,5.5rem)]">
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
          className="outfit mt-8 max-w-xl text-lg text-gray-400 md:text-xl"
        >
          I build websites and web applications, from the first idea to a
          working product.
        </motion.p>

        <motion.a
          {...rise(1.2)}
          href="#work"
          className="outfit group mt-10 inline-flex items-center gap-3 rounded-full bg-[#3d0eb2] px-7 py-3 text-base font-semibold transition-colors duration-300 hover:bg-violet-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400"
        >
          See the work
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </motion.a>

        <motion.div {...rise(1.4)} className="mt-14 md:mt-20">
          <p className="space-mono-bold text-[11px] uppercase tracking-[0.3em] text-gray-400">
            Selected projects
          </p>
          <ul className="outfit mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-400">
            {PROJECTS.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}