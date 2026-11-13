"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { FaDiscord, FaGithub, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { useKit } from "./MotionKit";
import { CONTACT } from "@/data/contact";
import { FOOTER_NAV, SOCIALS } from "@/data/footer";

const ICONS = { youtube: FaYoutube, linkedin: FaLinkedinIn, instagram: FaInstagram, github: FaGithub, discord: FaDiscord };

const LINK =
  "outfit group inline-flex min-h-11 items-center gap-3 text-base text-gray-400 transition-colors duration-300 hover:text-violet-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400";
const LABEL = "space-mono-bold text-[11px] uppercase tracking-[0.25em] text-violet-400";

// Smooth scroll for homepage anchors when you're already on "/". On any other page the link
// is left alone, so Next.js navigates to the homepage section normally.
function useSectionScroll() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  return (e, href) => {
    if (pathname !== "/" || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    const hash = href.split("#")[1];
    const target = hash ? document.getElementById(hash) : null;
    if (hash && !target) return;
    e.preventDefault();
    const behavior = reduce ? "auto" : "smooth";
    if (target) target.scrollIntoView({ behavior, block: "start" });
    else window.scrollTo({ top: 0, behavior });
    window.history.pushState(null, "", href);
  };
}

function CopyEmail({ email }) {
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

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="outfit min-h-11 rounded-full px-1 text-sm font-semibold text-gray-500 transition-colors duration-300 hover:text-violet-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400"
      >
        {state === "copied" ? "Copied ✓" : state === "failed" ? "Copy failed" : "Copy"}
      </button>
      <span role="status" className="sr-only">
        {state === "copied" ? "Email address copied to clipboard" : state === "failed" ? "Copy failed. Select the address and copy it manually." : ""}
      </span>
    </>
  );
}

export default function Footer() {
  const { item, stagger } = useKit();
  const reduce = useReducedMotion();
  const go = useSectionScroll();
  const [year, setYear] = useState(null);

  // Set on the client so the year is always the visitor's current year
  useEffect(() => setYear(new Date().getFullYear()), []);

  return (
    <footer className="relative mt-32 z-10 overflow-x-clip border-t border-white/10 px-6 pb-8 pt-16 md:px-11 md:pt-20 2xl:px-16">
      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10%" }}
        className="grid gap-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-20"
      >
        {/* Brand */}
        <div>
          <motion.div variants={item}>
            <Link
              href="/"
              onClick={(e) => go(e, "/")}
              aria-label="Shezar.dev, back to the top of the homepage"
              className="space-grotesk inline-block text-[clamp(2.6rem,8vw,5.5rem)] font-black uppercase leading-none tracking-tight transition-colors duration-500 hover:text-violet-300 focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-violet-400"
            >
              Shezar.dev
            </Link>
          </motion.div>
          <motion.p variants={item} className="outfit mt-6 max-w-sm text-lg text-gray-300 md:text-xl">
            Building thoughtful digital experiences, one idea at a time.
          </motion.p>
          <motion.p variants={item} className="outfit mt-2 max-w-sm text-base text-gray-500">
            Websites, e-commerce experiences and custom web applications.
          </motion.p>
          <motion.div variants={item} className="mt-6 flex flex-wrap items-center gap-x-4">
            <a
              href={`mailto:${CONTACT.email}`}
              className="outfit inline-flex min-h-11 items-center break-all text-lg text-gray-200 underline decoration-violet-500/60 underline-offset-4 transition-colors duration-300 hover:text-violet-300 hover:decoration-violet-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400"
            >
              {CONTACT.email}
            </a>
            <CopyEmail email={CONTACT.email} />
          </motion.div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-8 sm:gap-12">
          <motion.nav variants={item} aria-labelledby="footer-nav-label">
            <p id="footer-nav-label" className={LABEL}>
              Navigate
            </p>
            <ul className="mt-3">
              {FOOTER_NAV.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} onClick={l.section ? (e) => go(e, l.href) : undefined} className={LINK}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.nav variants={item} aria-labelledby="footer-social-label">
            <p id="footer-social-label" className={LABEL}>
              Social
            </p>
            <ul className="mt-3">
              {SOCIALS.map((s) => {
                const Icon = ICONS[s.id];
                return (
                  <li key={s.id}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${s.label} (opens in a new tab)`}
                      className={LINK}
                    >
                      <Icon aria-hidden="true" className="h-4 w-4 shrink-0" />
                      {s.label}
                      <span aria-hidden="true" className="-translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
                        ↗
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.nav>
        </div>
      </motion.div>

      {/* Bottom bar */}
      <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 md:mt-20 md:flex-row md:items-center md:justify-between">
        <p className="outfit text-sm text-gray-500">
          © <span className="inline-block min-w-[4ch]">{year}</span> Shezar Furqan. All rights reserved.
        </p>
        <p className="outfit text-sm text-gray-500">Designed &amp; developed by Shezar.</p>

      </div>
    </footer>
  );
}
