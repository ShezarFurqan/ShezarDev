"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ContactForm from "./ContactForm";
import { SplitWords, useKit } from "./MotionKit";
import { CONTACT } from "@/data/contact";

const OUTLINE = "text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.5)]";

function CopyEmail({ email }) {
  const { reduce } = useKit();
  const [state, setState] = useState("idle"); // idle | copied | failed
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("failed");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2200);
  }

  const label = { idle: "Copy email", copied: "Copied ✓", failed: "Copy failed" }[state];
  const shift = reduce ? 0 : 6;

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="outfit inline-flex min-h-11 min-w-32 items-center justify-center rounded-full border border-white/15 px-5 text-sm font-semibold text-gray-300 transition-colors duration-300 hover:border-violet-400 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={state}
            initial={{ opacity: 0, y: shift }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -shift }}
            transition={{ duration: 0.2 }}
            className={state === "copied" ? "text-violet-300" : ""}
          >
            {label}
          </motion.span>
        </AnimatePresence>
      </button>
      <span role="status" className="sr-only">
        {state === "copied" ? "Email address copied to clipboard" : state === "failed" ? "Copy failed. Select the address and copy it manually." : ""}
      </span>
    </>
  );
}

// Final section of the homepage. Desktop: huge headline on top, then a narrow left column
// (intro, email, links) beside the form. Mobile: everything stacks, email first.
export default function Contact() {
  const { item, line, stagger } = useKit();
  const links = CONTACT.links.filter((l) => l.href);

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative z-10 scroll-mt-4 overflow-x-clip px-6 pb-10 pt-24 md:px-11 md:pt-36 2xl:px-16"
    >
      {/* One soft light behind the form side; static, so it costs nothing */}
      <div aria-hidden="true" className="pointer-events-none absolute right-0 top-1/3 h-80 w-80 rounded-full bg-violet-600/10 blur-[120px]" />

      <motion.div variants={stagger(0.14)} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10%" }} className="relative">
        <motion.p
          variants={item}
          className="space-mono-bold mb-6 text-[11px] uppercase tracking-[0.2em] text-violet-400 sm:text-xs sm:tracking-[0.3em] md:text-sm"
        >
          Contact
        </motion.p>
        <h2 id="contact-title" className="space-grotesk text-[clamp(3rem,11vw,9rem)] font-bold leading-[0.98] tracking-tight">
          <span className="block">
            <SplitWords text="Have an idea?" />
          </span>
          <span className="block">
            <SplitWords text="Let's make it happen." className={OUTLINE} />
          </span>
        </h2>
        <motion.div variants={line} className="mt-10 h-px origin-left bg-gradient-to-r from-violet-500/70 via-white/10 to-transparent md:mt-14" />
      </motion.div>

      <div className="relative mt-12 grid gap-14 lg:mt-16 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20">
        <motion.div variants={stagger(0.12)} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10%" }}>
          <motion.p variants={item} className="outfit max-w-md text-lg text-gray-400 md:text-xl">
            I&apos;m open to talking about websites, e-commerce platforms, custom web applications and other digital projects. Tell me what you
            have in mind, even if it&apos;s still rough, and I&apos;ll help you work out the right way to build it.
          </motion.p>

          <motion.div variants={item} className="mt-10">
            <p className="outfit text-sm font-medium text-gray-500">Write to me directly</p>
            <a
              href={`mailto:${CONTACT.email}`}
              className="space-grotesk group mt-2 inline-block break-all text-[clamp(1.5rem,5.2vw,2.5rem)] font-bold leading-tight underline decoration-violet-500/60 decoration-2 underline-offset-8 transition-colors duration-300 hover:text-violet-300 hover:decoration-violet-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400"
            >
              {CONTACT.email}
            </a>
            <div className="mt-5">
              <CopyEmail email={CONTACT.email} />
            </div>
          </motion.div>

          {links.length > 0 && (
            <motion.ul variants={item} aria-label="Profiles" className="mt-10 flex flex-wrap gap-x-6 gap-y-1">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${l.label} (opens in a new tab)`}
                    className="outfit inline-flex min-h-11 items-center gap-1.5 text-base text-gray-400 transition-colors duration-300 hover:text-violet-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400"
                  >
                    {l.label}
                    <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </motion.ul>
          )}
        </motion.div>

        <ContactForm />
      </div>
    </section>
  );
}