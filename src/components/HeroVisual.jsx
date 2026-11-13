"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

// Change these two if your file names change
const VIDEO_SRC = "/Hero-video.mp4";
const IMAGE_SRC = "/6.jpg";

// Top and bottom edges dissolve into the page background
const FADE_Y =
  "linear-gradient(to bottom, transparent 0%, #000 14%, #000 74%, transparent 100%)";

/**
 * Right side of the hero: "imagined" (alone in space) -> "built" (typing).
 *
 * - The still image is ALWAYS rendered (fast, works everywhere, fallback if the
 *   video fails or autoplay is blocked).
 * - On large screens the video fades in on top of it, plays once and holds its
 *   last frame. Phones, tablets, reduced-motion and data-saver users never
 *   download the video.
 *
 * Side fade (via the className below):
 *   phone      -> fades on the left only; the picture runs edge to edge
 *   tablet     -> fades on both sides (picture is centered)
 *   desktop    -> fades on the left only; the picture bleeds off the right edge
 */
export default function HeroVisual({ className = "" }) {
  const reduce = useReducedMotion();
  const [canPlay, setCanPlay] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () =>
      setCanPlay(
        mq.matches && !reduce && navigator.connection?.saveData !== true
      );
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
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
      <div className="absolute inset-0 [mask-image:linear-gradient(to_right,transparent_0%,#000_24%)] md:[mask-image:linear-gradient(to_right,transparent_0%,#000_20%,#000_80%,transparent_100%)] lg:[mask-image:linear-gradient(to_right,transparent_0%,#000_20%)]">
        <div
          className="relative h-full w-full"
          style={{ maskImage: FADE_Y, WebkitMaskImage: FADE_Y }}
        >
          <Image
            src={IMAGE_SRC}
            alt=""
            width={720}
            height={960}
            priority
            sizes="(min-width: 1536px) 56rem, (min-width: 1024px) 38rem, (min-width: 768px) 32rem, 100vw"
            className="h-full w-full object-cover object-bottom"
          />

          {canPlay && (
            <video
              src={VIDEO_SRC}
              autoPlay
              muted
              playsInline
              preload="auto"
              disablePictureInPicture
              tabIndex={-1}
              aria-hidden="true"
              onPlaying={() => setPlaying(true)}
              className={`absolute inset-0 h-full w-full object-cover object-bottom transition-opacity duration-700 ${
                playing ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}