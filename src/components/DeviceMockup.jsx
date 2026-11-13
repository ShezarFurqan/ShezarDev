"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.76, 0, 0.24, 1];

function monogramOf(name) {
  return name
    .replace(/\.(pk|dev|com)$/i, "")
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// What fills a device screen: the real screenshot, or (until one is added)
// a typographic cover in the site's violet style.
export function Screen({ project, mode, sizes, priority = false }) {
  const src = mode === "mobile" ? project.mobileImage : project.desktopImage;
  if (src) {
    return (
      <Image
        src={src}
        alt={`${project.name} ${mode} preview`}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover object-top"
      />
    );
  }
  return (
    <div className="absolute inset-0 bg-[#07072a]">
      <div className="absolute -right-10 -top-10 h-2/3 w-2/3 rounded-full bg-violet-600/30 blur-[60px]" />
      <div className="absolute -bottom-12 -left-8 h-1/2 w-1/2 rounded-full bg-indigo-600/25 blur-[60px]" />
      <span
        aria-hidden="true"
        className="space-grotesk absolute inset-0 flex items-center justify-center text-[clamp(3rem,12vw,7rem)] font-bold leading-none text-transparent [-webkit-text-stroke:1px_rgba(167,139,250,0.55)]"
      >
        {monogramOf(project.name)}
      </span>
      <span className="space-mono-bold absolute bottom-3 left-4 text-[10px] uppercase tracking-[0.25em] text-gray-300">
        {project.name}
      </span>
    </div>
  );
}

// Plain browser window, used on the Work page.
export function BrowserFrame({ project, sizes, priority, className = "" }) {
  let host = null;
  try {
    host = project.url ? new URL(project.url).host : null;
  } catch {}
  return (
    <div className={`overflow-hidden rounded-xl border border-white/15 bg-[#0b0b2e] shadow-[0_30px_90px_-20px_rgba(91,33,182,0.45)] ${className}`}>
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="space-mono-bold ml-3 truncate text-[11px] text-gray-400">{host ?? project.name}</span>
      </div>
      <div className="relative aspect-[16/10] w-full">
        <Screen project={project} mode="desktop" sizes={sizes} priority={priority} />
      </div>
    </div>
  );
}

// Laptop <-> phone. Both devices live in the same stage. Switching mode only
// animates transform + opacity: the laptop recedes while the phone rises out of
// the same spot, so it reads as one device transforming into the other.
export default function DeviceMockup({ project, mode, priority = false }) {
  const reduce = useReducedMotion();
  const mobile = mode === "mobile";
  const t = { duration: reduce ? 0 : 0.7, ease: EASE };

  return (
    <div className="relative mx-auto aspect-[16/11] w-full max-w-3xl">
      <div className="pointer-events-none absolute inset-x-[10%] bottom-[6%] top-[20%] rounded-full bg-violet-600/20 blur-[80px]" />

      {/* Laptop */}
      <motion.div
        className="absolute inset-x-0 top-[2%] origin-bottom"
        aria-hidden={mobile}
        initial={false}
        animate={mobile ? { opacity: 0, scale: 0.84, y: 24 } : { opacity: 1, scale: 1, y: 0 }}
        transition={t}
        style={{ pointerEvents: mobile ? "none" : "auto" }}
      >
        <div className="rounded-t-2xl border-[8px] border-[#16163f] bg-black md:border-[10px]">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md">
            <Screen
              project={project}
              mode="desktop"
              priority={priority}
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </div>
        </div>
        <div className="mx-[-3%] h-3 rounded-b-2xl bg-gradient-to-b from-[#2a2a5c] to-[#14143a] md:h-4" />
      </motion.div>

      {/* Phone */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative h-[94%] aspect-[9/19.5] rounded-[1.6rem] border-[6px] border-[#16163f] bg-black shadow-[0_30px_80px_-20px_rgba(91,33,182,0.55)] md:rounded-[2rem] md:border-[7px]"
          aria-hidden={!mobile}
          initial={false}
          animate={mobile ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.7, y: 14 }}
          transition={t}
        >
          <div className="relative h-full w-full overflow-hidden rounded-[1.1rem] md:rounded-[1.5rem]">
            <Screen project={project} mode="mobile" sizes="(min-width: 1024px) 14rem, 40vw" />
          </div>
          <div className="absolute left-1/2 top-1.5 h-1.5 w-12 -translate-x-1/2 rounded-full bg-black/80" />
        </motion.div>
      </div>
    </div>
  );
}