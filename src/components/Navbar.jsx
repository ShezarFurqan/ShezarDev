
"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import { TbSquareRoundedChevronsDown } from "react-icons/tb";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);


  const menuItems = ["Home", "Work", "Services", "About"];

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header className="relative z-[100] flex items-center justify-between px-6 pt-6 text-white md:px-11">

        {/* Logo */}
        <a href="/" className="space-grotesk text-[26px] font-black uppercase">
          Shezar.dev
        </a>

        {/* Desktop Navigation */}
        <nav aria-label="Primary" className="hidden items-center gap-6 text-xl space-mono-bold md:flex">
          {menuItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="transition-colors duration-300 hover:text-violet-400"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className="outfit hidden rounded-4xl border border-[#3d0eb2] px-4 py-2 text-md font-semibold transition-colors duration-300 hover:bg-[#3d0eb2] md:block"
        >
          Let's Talk
        </a>

        {/* Mobile Burger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="relative z-[110] flex flex-col items-center justify-center gap-[6px] rounded-xl  md:hidden"
        >
          <TbSquareRoundedChevronsDown
            className={`text-[33px] transition-transform duration-500 ${menuOpen ? "rotate-180" : ""}`}
          />
        </button>
      </header>


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
