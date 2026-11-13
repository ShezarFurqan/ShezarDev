"use client";

import { motion, AnimatePresence, useReducedMotion, useScroll, useMotionValueEvent } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import { TbSquareRoundedChevronsDown } from "react-icons/tb";

const EASE_IO = [0.76, 0, 0.24, 1];
const EASE_OUT = [0.22, 1, 0.36, 1];

// The whole bar slides in on page load ("show"), and slides up out of view ("hide") while
// the visitor scrolls down. Transform + opacity only, so it stays smooth on phones.
const HEADER = {
  hide: { y: "-110%", opacity: 0, transition: { duration: 0.35, ease: EASE_IO } },
  show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: EASE_OUT } },
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false); // true while scrolling down
  const [scrolled, setScrolled] = useState(false); // true once the page has moved off the top
  const reduce = useReducedMotion();

  const menuItems = ["Home", "Work", "Services", "About"];

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Scroll direction. Runs from Framer Motion's single scroll listener, and React only
  // re-renders when `hidden` or `scrolled` actually flips, not on every scroll event.
  const { scrollY } = useScroll();
  const lastY = useRef(0);
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
    const diff = y - lastY.current;
    if (y < 80) {
      setHidden(false); // always visible near the top
      lastY.current = y;
      return;
    }
    if (Math.abs(diff) < 6) return; // ignore tiny movements (small diffs add up before counting)
    setHidden(diff > 0);
    lastY.current = y;
  });

  // Never hide while the mobile menu is open, and never hide for reduced-motion visitors.
  const hide = !reduce && hidden && !menuOpen;

  // Entrance for each piece of the bar, one after the other (skipped for reduced motion).
  const enter = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: -14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: EASE_OUT },
        };

  return (
    <>
      {/* sticky (not fixed): the bar still takes its normal space, so the Hero layout doesn't move */}
      <motion.header
        variants={HEADER}
        initial={reduce ? false : "hide"}
        animate={hide ? "hide" : "show"}
        onFocusCapture={() => setHidden(false)} // keyboard users tabbing into the bar bring it back
        className="sticky top-0 z-[100] flex items-center justify-between px-6 pt-6 text-white md:px-11"
      >
        {/* Frosted background: fades in only after scrolling, so the top of the page stays clean.
            Absolute, so it adds no height. */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 top-0 -bottom-4 -z-10 border-b border-white/5 bg-[#000119]/75 backdrop-blur-md transition-opacity duration-300 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Logo */}
        <motion.a {...enter(0.25)} href="/" className="space-grotesk text-[26px] font-black uppercase">
          Shezar.dev
        </motion.a>

        {/* Desktop Navigation */}
        <nav aria-label="Primary" className="hidden items-center gap-6 text-xl space-mono-bold md:flex">
          {menuItems.map((item, i) => (
            <motion.a
              key={item}
              {...enter(0.35 + i * 0.07)}
              href={`#${item.toLowerCase()}`}
              className="transition-colors duration-300 hover:text-violet-400"
            >
              {item}
            </motion.a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <motion.a
          {...enter(0.65)}
          href="#contact"
          className="outfit hidden rounded-4xl border border-[#3d0eb2] px-4 py-2 text-md font-semibold transition-colors duration-300 hover:bg-[#3d0eb2] md:block"
        >
          Let's Talk
        </motion.a>

        {/* Mobile Burger */}
        <motion.button
          {...enter(0.4)}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="relative z-[110] flex flex-col items-center justify-center gap-[6px] rounded-xl  md:hidden"
        >
          <TbSquareRoundedChevronsDown
            className={`text-[33px] transition-transform duration-500 ${menuOpen ? "rotate-180" : ""}`}
          />
        </motion.button>
      </motion.header>


      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{
              clipPath: "inset(0 0 100% 0)",
            }}
            animate={{
              clipPath: "inset(0 0 0% 0)",
            }}
            exit={{
              clipPath: "inset(0 0 100% 0)",
            }}
            transition={{
              duration: 0.70,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="fixed inset-0 z-[90] flex flex-col items-center justify-center overflow-hidden bg-[#000119] px-8 text-white md:hidden"
          >
            {/* Space Glow */}
            <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-violet-600/15 blur-[100px]" />

            <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-indigo-600/15 blur-[100px]" />


            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20, transition: { duration: 0.2, delay: 0 } }}
              transition={{
                duration: 0.50,
                delay: 0.3,
              }}
              className="relative z-10 w-full max-w-sm"
            >
              {/* Heading */}
              <p className="mb-5 text-center text-xs tracking-[0.35em] text-violet-400">
                EXPLORE
              </p>

              {/* Menu Items */}
              {menuItems.map((item, index) => (
                <React.Fragment key={item}>
                  <motion.a
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.25 + index * 0.07,
                    }}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className="space-grotesk block py-6 text-center text-2xl font-semibold tracking-wide transition-colors hover:text-violet-400"
                  >
                    {item}
                  </motion.a>

                  {index !== menuItems.length - 1 && (
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
                  )}
                </React.Fragment>
              ))}

              {/* Contact */}
              <div className="mt-8 text-center">
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="outfit inline-block rounded-full border border-violet-500/60 px-8 py-3 text-base font-semibold transition-colors hover:bg-violet-600"
                >
                  Let's Talk
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
};

export default Navbar;