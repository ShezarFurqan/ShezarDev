"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const VIDEO_SRC = "/Hero-video.mp4";
const IMAGE_SRC = "/6.jpg";

const FADE_Y =
  "linear-gradient(to bottom, transparent 0%, #000 14%, #000 74%, transparent 100%)";

export default function HeroVisual({ className = "" }) {
  const reduce = useReducedMotion();
  const [canPlay, setCanPlay] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setCanPlay(!reduce && navigator.connection?.saveData !== true);
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
            className="absolute inset-0 h-full w-full object-cover object-bottom"
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
              onError={() => setPlaying(false)}
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