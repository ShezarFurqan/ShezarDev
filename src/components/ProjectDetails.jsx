"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BrowserFrame } from "./DeviceMockup";
import Orbits from "./Orbits";
import { EASE_IO, EASE_OUT, Reveal, SplitWords, useKit } from "./MotionKit";

const pad = (n) => String(n).padStart(2, "0");
const FOCUSABLE = 'a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])';

// Gallery source: the project's own `gallery`, or (if empty) its desktop and mobile screenshots.
function resolveMedia(project) {
  if (project.gallery?.length) return project.gallery;
  return [
    project.desktopImage && { type: "image", src: project.desktopImage, alt: `${project.name} on desktop` },
    project.mobileImage && { type: "image", src: project.mobileImage, alt: `${project.name} on mobile`, portrait: true },
  ].filter(Boolean);
}

function SectionHeading({ children }) {
  return (
    <Reveal className="mb-8 flex items-center gap-4">
      <h3 className="space-mono-bold shrink-0 text-xs uppercase tracking-[0.3em] text-violet-400">{children}</h3>
      <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-violet-500/50 to-transparent" />
    </Reveal>
  );
}

// Large media stage with arrows, swipe, arrow keys and a thumbnail strip.
// Only the current item is mounted, and images/videos load lazily.
function Gallery({ project, media }) {
  const reduce = useReducedMotion();
  const [[i, dir], setPage] = useState([0, 0]);
  const count = media.length;

  const go = useCallback((d) => setPage(([cur]) => [(cur + d + count) % count, d]), [count]);

  useEffect(() => {
    if (count < 2) return;
    const onKey = (e) => {
      if (e.target?.tagName === "VIDEO") return;
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, count]);

  const current = media[i];
  const alt = current.alt || `${project.name}, view ${i + 1}`;
  const variants = {
    enter: (d) => ({ opacity: 0, x: reduce ? 0 : d * 60, scale: reduce ? 1 : 0.98 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (d) => ({ opacity: 0, x: reduce ? 0 : d * -60 }),
  };
  const draggable = current.type !== "video" && count > 1 && !reduce;

  return (
    <div role="region" aria-roledescription="carousel" aria-label={`${project.name} gallery`}>
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-[#05051f] shadow-[0_30px_90px_-30px_rgba(91,33,182,0.5)]">
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.div
            key={i}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: reduce ? 0 : 0.5, ease: EASE_OUT }}
            drag={draggable ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(1);
              else if (info.offset.x > 60) go(-1);
            }}
            className="absolute inset-0"
          >
            {current.type === "video" ? (
              <video
                src={current.src}
                poster={current.poster}
                controls
                playsInline
                preload="none"
                aria-label={alt}
                className="h-full w-full bg-black object-contain"
              />
            ) : (
              <Image
                src={current.src}
                alt={alt}
                fill
                sizes="(min-width: 1280px) 1100px, 100vw"
                className={current.portrait ? "object-contain" : "object-cover object-top"}
                draggable={false}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous"
              className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-lg transition-colors hover:bg-[#3d0eb2] focus-visible:outline-2 focus-visible:outline-violet-400"
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next"
              className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-lg transition-colors hover:bg-[#3d0eb2] focus-visible:outline-2 focus-visible:outline-violet-400"
            >
              <span aria-hidden="true">→</span>
            </button>
            <span className="space-mono-bold pointer-events-none absolute bottom-3 right-4 rounded-full bg-black/60 px-3 py-1 text-[11px] tracking-[0.2em]" aria-live="polite">
              {pad(i + 1)} / {pad(count)}
            </span>
          </>
        )}
      </div>

      {count > 1 && (
        <ul className="mt-3 flex gap-3 overflow-x-auto pb-2">
          {media.map((m, n) => (
            <li key={`${m.src}-${n}`} className="shrink-0">
              <button
                type="button"
                onClick={() => setPage([n, n > i ? 1 : -1])}
                aria-label={`Show item ${n + 1}${m.type === "video" ? " (video)" : ""}`}
                aria-current={n === i}
                className={`relative block h-14 w-24 overflow-hidden rounded-lg border bg-[#05051f] transition-opacity focus-visible:outline-2 focus-visible:outline-violet-400 md:h-16 md:w-28 ${
                  n === i ? "border-violet-400 opacity-100" : "border-white/15 opacity-60 hover:opacity-100"
                }`}
              >
                {m.type === "video" && !m.poster ? (
                  <span aria-hidden="true" className="flex h-full items-center justify-center text-lg">▶</span>
                ) : (
                  <Image
                    src={m.type === "video" ? m.poster : m.src}
                    alt=""
                    fill
                    sizes="7rem"
                    className="object-cover object-top"
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function ProjectDetail({ project, origin, onClose }) {
  const { reduce, item, stagger } = useKit();
  const rootRef = useRef(null);
  const closeRef = useRef(null);

  // Scroll lock, focus handling, Escape and a focus trap. Everything is undone on unmount.
  useEffect(() => {
    const body = document.body;
    const prev = { overflow: body.style.overflow, paddingRight: body.style.paddingRight };
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    const opener = document.activeElement;
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !rootRef.current) return;
      const nodes = [...rootRef.current.querySelectorAll(FOCUSABLE)].filter((n) => n.offsetParent !== null);
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      body.style.overflow = prev.overflow;
      body.style.paddingRight = prev.paddingRight;
      if (opener && typeof opener.focus === "function") opener.focus({ preventScroll: true });
    };
  }, [onClose]);

  const media = resolveMedia(project);
  const intro = project.intro || project.description;
  const overview = [
    ["What it is", project.overview?.what],
    ["The problem", project.overview?.problem],
    ["What I built", project.overview?.built],
    ["My contribution", project.contribution],
  ].filter(([, text]) => text);
  const meta = [
    ["Year", project.year],
    ["Role", project.role],
    ["Category", project.category],
  ].filter(([, v]) => v);

  // The overlay grows out of the clicked image: a circle opening from that point.
  const at = `${Math.round((origin?.x ?? 0.5) * 100)}% ${Math.round((origin?.y ?? 0.5) * 100)}%`;
  const clipClosed = `circle(0% at ${at})`;
  const clipOpen = `circle(150% at ${at})`;

  const closeOnBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <motion.div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-detail-title"
      onClick={closeOnBackdrop}
      className="fixed inset-0 z-[200] overflow-y-auto overscroll-contain bg-[#000119] text-white"
      initial={reduce ? { opacity: 0 } : { clipPath: clipClosed }}
      animate={reduce ? { opacity: 1 } : { clipPath: clipOpen }}
      exit={reduce ? { opacity: 0 } : { clipPath: clipClosed }}
      transition={{ duration: reduce ? 0.15 : 0.9, ease: EASE_IO }}
    >
      <div aria-hidden="true" className="pointer-events-none fixed inset-0">
        <Orbits />
      </div>

      {/* Top bar stays in reach while scrolling */}
      <div className="sticky top-0 z-20 bg-[#000119]/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-11">
          <span className="space-mono-bold truncate pr-4 text-xs uppercase tracking-[0.25em] text-gray-400">{project.name}</span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="outfit inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-5 text-sm font-semibold transition-colors duration-300 hover:border-[#3d0eb2] hover:bg-[#3d0eb2] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400"
          >
            Close <span aria-hidden="true">✕</span>
          </button>
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pb-28 pt-8 md:px-11 md:pt-14" onClick={closeOnBackdrop}>
        {/* A. Introduction */}
        <motion.header variants={stagger(0.1, 0.5)} initial="hidden" animate="show">
          <motion.p variants={item} className="space-mono-bold text-xs tracking-[0.3em] text-violet-400">
            PROJECT
          </motion.p>
          <h2
            id="project-detail-title"
            className="space-grotesk mt-3 text-[clamp(2.6rem,10vw,6rem)] font-bold leading-[1.02] tracking-tight"
          >
            <SplitWords text={project.name} />
          </h2>

          {intro && (
            <motion.p variants={item} className="outfit mt-5 max-w-2xl text-lg text-gray-300 md:text-xl">
              {intro}
            </motion.p>
          )}

          {meta.length > 0 && (
            <motion.dl variants={item} className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/10 pt-6">
              {meta.map(([k, v]) => (
                <div key={k}>
                  <dt className="space-mono-bold text-[11px] uppercase tracking-[0.25em] text-violet-400">{k}</dt>
                  <dd className="outfit mt-1 text-base text-white">{v}</dd>
                </div>
              ))}
            </motion.dl>
          )}

          {project.url && (
            <motion.a
              variants={item}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="outfit group mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#3d0eb2] px-7 text-base font-semibold transition-colors duration-300 hover:bg-violet-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400"
            >
              Visit live site
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </motion.a>
          )}
        </motion.header>

        {/* B. Gallery */}
        <motion.div
          className="mt-12 md:mt-16"
          initial={reduce ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: EASE_OUT }}
        >
          {media.length > 0 ? <Gallery project={project} media={media} /> : <BrowserFrame project={project} sizes="(min-width: 1280px) 1100px, 100vw" />}
        </motion.div>

        {/* C. Overview */}
        {overview.length > 0 && (
          <section className="mt-20 md:mt-28">
            <SectionHeading>Overview</SectionHeading>
            <div className="grid gap-x-16 gap-y-10 md:grid-cols-2">
              {overview.map(([label, text]) => (
                <Reveal key={label}>
                  <h4 className="space-grotesk text-xl font-bold">{label}</h4>
                  <p className="outfit mt-3 text-base leading-relaxed text-gray-400 md:text-lg">{text}</p>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* D. Technologies */}
        {project.stack?.length > 0 && (
          <section className="mt-20 md:mt-28">
            <SectionHeading>Technologies</SectionHeading>
            <motion.ul
              variants={stagger(0.06)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-10%" }}
              className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4"
            >
              {project.stack.map((s, n) => (
                <motion.li
                  key={s}
                  variants={item}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-4 md:p-5"
                >
                  <span className="space-mono-bold text-[11px] tracking-[0.25em] text-violet-400">{pad(n + 1)}</span>
                  <span className="space-grotesk mt-3 block text-lg font-bold md:text-xl">{s}</span>
                </motion.li>
              ))}
            </motion.ul>
          </section>
        )}

        {/* E. Key features */}
        {project.features?.length > 0 && (
          <section className="mt-20 md:mt-28">
            <SectionHeading>Key features</SectionHeading>
            <motion.ol
              variants={stagger(0.08)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-10%" }}
              className="grid gap-x-16 md:grid-cols-2"
            >
              {project.features.map((f, n) => (
                <motion.li key={f} variants={item} className="flex gap-5 border-t border-white/10 py-5">
                  <span className="space-mono-bold pt-1 text-xs tracking-[0.25em] text-violet-400">{pad(n + 1)}</span>
                  <span className="outfit text-base text-gray-200 md:text-lg">{f}</span>
                </motion.li>
              ))}
            </motion.ol>
          </section>
        )}

        {/* F. Additional details */}
        {project.details?.length > 0 && (
          <section className="mt-20 md:mt-28">
            <SectionHeading>Details</SectionHeading>
            <div className="grid gap-x-16 gap-y-10 md:grid-cols-2">
              {project.details.map((d) => (
                <Reveal key={d.title}>
                  <h4 className="space-grotesk text-xl font-bold">{d.title}</h4>
                  <p className="outfit mt-3 text-base leading-relaxed text-gray-400 md:text-lg">{d.text}</p>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        <div className="mt-24 flex justify-center">
          <button
            type="button"
            onClick={onClose}
            className="outfit group inline-flex min-h-12 items-center gap-3 rounded-full border border-[#3d0eb2] px-8 text-base font-semibold transition-colors duration-300 hover:bg-[#3d0eb2] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400"
          >
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
            Back to all projects
          </button>
        </div>
      </div>
    </motion.div>
  );
}