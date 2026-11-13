"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SectionHead } from "./ServicesParts";
import { EASE_OUT } from "./MotionKit";
import { FAQ } from "@/data/services";

function Row({ id, q, a, open, onToggle }) {
  const reduce = useReducedMotion();
  return (
    <div className="border-b border-white/10">
      <h3>
        <button
          type="button"
          id={`${id}-btn`}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={onToggle}
          className="flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left transition-colors duration-300 hover:text-violet-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400"
        >
          <span className="space-grotesk text-xl font-semibold md:text-2xl">{q}</span>
          <span
            aria-hidden="true"
            className={`text-2xl leading-none text-violet-400 transition-transform duration-300 ${open ? "rotate-45" : ""}`}
          >
            +
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-btn`}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <p className="outfit max-w-2xl pb-6 pr-10 text-lg text-gray-400">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ServicesFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" aria-labelledby="faq-title" className="relative scroll-mt-4 overflow-x-clip px-6 py-20 md:px-11 md:py-28 2xl:px-16">
      <div className="relative lg:grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <SectionHead
            id="faq-title"
            eyebrow="FAQ"
            title="Questions you"
            outline="might have."
            intro="Straight answers. If yours isn't here, just ask."
          />
        </div>
        <div className="mt-12 border-t border-white/10 lg:mt-0">
          {FAQ.map((f, i) => (
            <Row
              key={f.q}
              id={`faq-${i}`}
              q={f.q}
              a={f.a}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}