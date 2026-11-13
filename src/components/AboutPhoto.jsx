"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion, useTransform } from "framer-motion";
import { EASE_IO, EASE_OUT } from "./MotionKit";

// Your photograph. Put the file in /public and change this one line if the name differs.
export const PHOTO_SRC = "/shezar-photo.png";

// The portrait. It is revealed once (a curtain opening plus a slow settle), then, on large
// screens, it "lights up" as the story scrolls: a dark layer fades out, so the person comes
// into focus as the journey progresses. Only transform and opacity are animated.
//
// Why the trigger lives on the <figure>: the curtain starts fully clipped (zero visible area).
// A browser treats a fully clipped element as "not visible", so whileInView on that same
// element never fired and the photo stayed hidden. The figure is never clipped, so it watches
// the viewport and tells the inner elements when to play.
export default function AboutPhoto({ progress }) {
  const reduce = useReducedMotion();
  const [failed, setFailed] = useState(false);
  const figureRef = useRef(null);
  const inView = useInView(figureRef, { once: true, margin: "-10% 0px -10% 0px" });
  const shade = useTransform(progress, [0, 0.8], [0.72, 0]);
  const imageY = useTransform(progress, [0, 1], ["3%", "-3%"]);

  return (
    <figure
      ref={figureRef}
      className="relative mx-auto aspect-[4/5] w-full max-w-sm lg:mx-0 lg:w-[min(46svh,30rem)] lg:max-w-none"
    >
      <div aria-hidden="true" className="absolute -inset-8 rounded-full bg-violet-600/20 blur-[90px]" />

      {/* An orbit passes behind the portrait; it draws itself as the photo appears */}
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -inset-[14%] overflow-visible text-violet-400"
        fill="none"
        stroke="currentColor"
      >
        <motion.ellipse
          cx="50"
          cy="50"
          rx="58"
          ry="30"
          transform="rotate(-24 50 50)"
          strokeOpacity="0.45"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: inView || reduce ? 1 : 0 }}
          transition={{ duration: 2.4, delay: 0.4, ease: EASE_OUT }}
        />
      </motion.svg>

      <motion.div
        className="relative h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-[#07072a]"
        initial={reduce ? false : { clipPath: "inset(0 0 100% 0 round 24px)" }}
        animate={{ clipPath: inView || reduce ? "inset(0 0 0% 0 round 24px)" : "inset(0 0 100% 0 round 24px)" }}
        transition={{ duration: 1.4, ease: EASE_IO }}
      >
        {failed ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="space-grotesk text-[8rem] font-bold leading-none text-transparent [-webkit-text-stroke:1px_rgba(167,139,250,0.55)]">
              S
            </span>
          </div>
        ) : (
          <motion.div
            className="absolute inset-0"
            initial={reduce ? false : { scale: 1.2 }}
            animate={{ scale: inView || reduce ? 1 : 1.2 }}
            transition={{ duration: 2, ease: EASE_OUT }}
          >
            <motion.div
              style={reduce ? undefined : { y: imageY, scale: 1.08 }}
              className="absolute inset-0 will-change-transform"
            >
              <Image
                src={PHOTO_SRC}
                alt="Portrait of Shezar"
                fill
                sizes="(min-width: 1024px) 30rem, 90vw"
                className="object-cover object-top"
                onError={() => {
                  console.error("About photo failed to load:", PHOTO_SRC);
                  setFailed(true);
                }}
              />
            </motion.div>
          </motion.div>
        )}

        {/* Story-linked darkness: large screens only (on phones the photo is seen once, fully lit) */}
        <motion.div
          aria-hidden="true"
          style={{ opacity: reduce ? 0 : shade }}
          className="absolute inset-0 hidden bg-[#000119] lg:block"
        />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#000119]/80 to-transparent" />
        <figcaption className="space-mono-bold absolute bottom-4 left-5 text-[11px] uppercase tracking-[0.25em] text-gray-200">
          Shezar · 18
        </figcaption>
      </motion.div>
    </figure>
  );
}