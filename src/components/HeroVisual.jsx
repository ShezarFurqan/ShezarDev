"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

// Fades the top and bottom edges into the page background.
// The left/right fade lives in the className below (it differs per breakpoint).
const FADE_Y =
  "linear-gradient(to bottom, transparent 0%, #000 14%, #000 74%, transparent 100%)";

/**
 * Right side of the hero: "imagined" (sitting in space) -> "built" (typing).
 * - Large screens: the clip plays once, then holds its last frame (no loop).
 * - Phones, tablets, reduced motion, data saver: a still image only.
 * Files expected in /public/hero: hero.mp4, poster.webp, static.webp
 */
export default function HeroVisual({ className = "" }) {
  const reduce = useReducedMotion();

  // null = not decided yet (server + first paint). Then "video" or "image".
  const [mode, setMode] = useState(null);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)").matches;
    const saveData = navigator.connection?.saveData === true;
    setMode(wide && !reduce && !saveData ? "video" : "image");
  }, [reduce]);

  return (
    <motion.div
      role="img"
      aria-label="Shezar typing on a laptop, sitting alone in space"
      className={`relative aspect-[3/4] ${className}`}
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.6, ease: "easeOut" }}
    >
      <div className="absolute inset-0 [mask-image:linear-gradient(to_right,transparent_0%,#000_26%,#000_74%,transparent_100%)] lg:[mask-image:linear-gradient(to_right,transparent_0%,#000_20%)]">
        <div
          className="h-full w-full"
          style={{ maskImage: FADE_Y, WebkitMaskImage: FADE_Y }}
        >
          {mode === "video" && (
            <video
              className="h-full w-full object-cover object-bottom"
              src="/Hero-video.mp4"
              poster="/hero/poster.webp"
              autoPlay
              muted
              playsInline
              preload="auto"
              disablePictureInPicture
              tabIndex={-1}
              aria-hidden="true"
            />
          )}

          {mode === "image" && (
            <Image
              src="/6.jpg"
              alt=""
              width={720}
              height={1280}
              sizes="(min-width: 1024px) 38rem, 90vw"
              className="h-full w-full object-cover object-bottom"
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}
