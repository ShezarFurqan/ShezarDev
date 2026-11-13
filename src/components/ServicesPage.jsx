"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Orbits from "./Orbits";
import { EASE_OUT, SplitWords, useKit } from "./MotionKit";
import { VISUALS } from "./ServiceVisuals";
import { CtaLink, SectionHead } from "./ServicesParts";
import ServicesProof from "./ServicesProof";
import ServicesFaq from "./ServicesFaq";
import { CONTACT_HREF, PRICING_FACTORS, PROCESS, PROCESS_NOTE, REDESIGN, SERVICES } from "@/data/services";

const pad = (n) => String(n).padStart(2, "0");
const OUTLINE = "text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.5)]";
const LABEL = "space-mono-bold text-[11px] uppercase tracking-[0.25em] text-violet-400";
const VIEWPORT = { once: true, margin: "-12%" };

const Chip = ({ children }) => (
  <li className="outfit rounded-full border border-white/15 px-4 py-2 text-sm text-gray-300 md:text-base">{children}</li>
);

// One service = one chapter. Layout alternates sides; the title and visual stay pinned on large screens.
function Chapter({ s, index }) {
  const { item, stagger } = useKit();
  const Visual = VISUALS[s.id];
  const flip = index % 2 === 1;

  return (
    <section id={s.id} aria-labelledby={`${s.id}-title`} className="relative scroll-mt-4 overflow-x-clip px-6 py-20 md:px-11 md:py-28 2xl:px-16">
      <span
        aria-hidden="true"
        className={`space-grotesk pointer-events-none absolute top-4 select-none text-[clamp(9rem,30vw,24rem)] font-bold leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.05)] ${
          flip ? "left-2" : "right-2"
        }`}
      >
        {s.num}
      </span>

      <div className="relative lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div className={`lg:sticky lg:top-24 lg:self-start ${flip ? "lg:order-2" : ""}`}>
          <motion.div variants={stagger(0.12)} initial="hidden" whileInView="show" viewport={VIEWPORT}>
            <motion.p variants={item} className="space-mono-bold text-xs tracking-[0.3em] text-violet-400">
              {s.num} / {pad(SERVICES.length)}
            </motion.p>
            <h2
              id={`${s.id}-title`}
              className="space-grotesk mt-4 text-[clamp(2.4rem,7vw,4rem)] font-bold leading-[1.03] tracking-tight lg:text-[clamp(2.2rem,3.8vw,3.75rem)]"
            >
              <SplitWords text={s.title} />
            </h2>
            <motion.p variants={item} className="outfit mt-5 max-w-md text-lg text-gray-300 md:text-xl">
              {s.provides}
            </motion.p>
            <motion.div
              variants={item}
              className="group relative mt-8 h-64 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-violet-600/10 to-transparent md:h-72"
            >
              <Visual />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-12 space-y-10 lg:mt-6"
        >
          <motion.div variants={item}>
            <h3 className={LABEL}>Problems it solves</h3>
            <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
              {s.solves.map((t) => (
                <li key={t} className="outfit py-4 text-lg text-gray-300">
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={item}>
            <h3 className={LABEL}>Who it&apos;s for</h3>
            <p className="outfit mt-4 max-w-xl text-lg text-gray-300">{s.suitable}</p>
          </motion.div>

          <motion.div variants={item}>
            <h3 className={LABEL}>What can be included</h3>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {s.includes.map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </ul>
          </motion.div>

          {s.platforms && (
            <motion.div variants={item}>
              <h3 className={LABEL}>Choosing the platform</h3>
              <p className="outfit mt-4 max-w-xl text-lg text-gray-400">
                These aren&apos;t interchangeable. The right one depends on your requirements, and I&apos;ll recommend honestly.
              </p>
              <dl className="mt-4 divide-y divide-white/10 border-y border-white/10">
                {s.platforms.map((p) => (
                  <div key={p.name} className="py-4 md:grid md:grid-cols-[11rem_1fr] md:gap-6">
                    <dt className="space-grotesk text-lg font-semibold">{p.name}</dt>
                    <dd className="outfit mt-1 text-base text-gray-400 md:mt-0 md:text-lg">{p.text}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          )}

          <motion.div variants={item} className="rounded-2xl border border-violet-500/30 bg-violet-600/[0.06] p-6">
            <h3 className={LABEL}>What you get</h3>
            <p className="outfit mt-3 text-lg text-white md:text-xl">{s.outcome}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Sits straight after Website Development, since it is the same kind of work on an existing site.
function Redesign() {
  const { item, stagger } = useKit();
  return (
    <section id="redesign" aria-labelledby="redesign-title" className="relative scroll-mt-4 px-6 md:px-11 2xl:px-16">
      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-7 md:p-12 lg:grid lg:grid-cols-2 lg:gap-14"
      >
        <div aria-hidden="true" className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-violet-600/15 blur-[100px]" />
        <div className="relative">
          <motion.p variants={item} className={LABEL}>
            Also: Website Redesign &amp; Optimization
          </motion.p>
          <h2 id="redesign-title" className="space-grotesk mt-4 text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.05] tracking-tight">
            <SplitWords text={REDESIGN.title} />
          </h2>
          <motion.p variants={item} className="outfit mt-5 max-w-md text-lg text-gray-300">
            {REDESIGN.text}
          </motion.p>
        </div>
        <motion.ul variants={item} className="relative mt-8 flex flex-wrap content-start gap-2.5 lg:mt-0">
          {REDESIGN.items.map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}

export default function ServicesPage() {
  const { reduce, item, line, stagger } = useKit();

  return (
    <main className="relative z-10">
      {/* 01. Introduction: plays on page load */}
      <section
        aria-labelledby="services-title"
        className="relative flex min-h-[calc(100svh-5.5rem)] items-center overflow-x-clip px-6 pb-16 pt-14 md:px-11 2xl:px-16"
      >
        <motion.div
          aria-hidden="true"
          className="absolute inset-0"
          initial={reduce ? false : { opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: EASE_OUT }}
        >
          <Orbits />
        </motion.div>

        <motion.div
          variants={stagger(0.14, 0.15)}
          initial="hidden"
          animate="show"
          className="relative grid w-full gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:items-end lg:gap-16"
        >
          <div>
            <motion.p
              variants={item}
              className="space-mono-bold mb-5 text-[11px] uppercase tracking-[0.2em] text-violet-400 sm:text-xs sm:tracking-[0.3em] md:text-sm"
            >
              Services
            </motion.p>
            <h1
              id="services-title"
              className="space-grotesk text-[clamp(2.8rem,11vw,6rem)] font-bold leading-[1.02] tracking-tight lg:text-[clamp(3rem,5.6vw,5.75rem)]"
            >
              <SplitWords text="Websites, stores and systems" /> <SplitWords text="built around you." className={OUTLINE} />
            </h1>
            <motion.div variants={line} className="mt-8 h-px max-w-md origin-left bg-gradient-to-r from-violet-500/70 to-transparent md:mt-10" />
            <motion.p variants={item} className="outfit mt-7 max-w-xl text-lg text-gray-400 md:text-xl">
              I&apos;m Shezar, an independent full-stack developer. I help businesses, organizations and individuals get online, sell online and
              work better, by understanding what you need first and then building it properly.
            </motion.p>
            <motion.div variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CtaLink href={CONTACT_HREF} solid>
                Discuss Your Project
              </CtaLink>
              <CtaLink href="#proof">See the work</CtaLink>
            </motion.div>
          </div>

          <motion.nav variants={item} aria-label="Services on this page">
            <ol className="border-t border-white/10">
              {[...SERVICES, { id: "redesign", num: "+", title: "Website Redesign & Optimization" }].map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="group flex min-h-14 items-center gap-4 border-b border-white/10 py-3 transition-colors duration-300 hover:text-violet-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400"
                  >
                    <span className="space-mono-bold w-6 text-xs text-violet-400">{s.num}</span>
                    <span className="space-grotesk flex-1 text-lg font-semibold">{s.title}</span>
                    <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-y-1">↓</span>
                  </a>
                </li>
              ))}
            </ol>
          </motion.nav>
        </motion.div>
      </section>

      {/* 02. Detailed services */}
      {SERVICES.map((s, i) => (
        <div key={s.id}>
          <Chapter s={s} index={i} />
          {i === 0 && <Redesign />}
        </div>
      ))}

      {/* 03. Process: a real sequence, so it is numbered */}
      <section id="process" aria-labelledby="process-title" className="relative scroll-mt-4 overflow-x-clip px-6 py-20 md:px-11 md:py-28 2xl:px-16">
        <SectionHead
          id="process-title"
          eyebrow="My process"
          title="How a project"
          outline="moves."
          intro="Four steps. You see progress along the way instead of waiting for a surprise at the end."
        />
        <motion.ol
          variants={stagger(0.14)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="relative mt-12 grid gap-10 md:mt-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-8"
        >
          {PROCESS.map((p, i) => (
            <motion.li key={p.title} variants={item} className="relative border-t border-white/10 pt-6">
              <span aria-hidden="true" className="absolute -top-px left-0 h-px w-12 bg-violet-400" />
              <span className="space-mono-bold text-xs tracking-[0.3em] text-violet-400">{pad(i + 1)}</span>
              <h3 className="space-grotesk mt-4 text-2xl font-bold">{p.title}</h3>
              <p className="outfit mt-3 text-lg text-gray-400">{p.text}</p>
            </motion.li>
          ))}
        </motion.ol>
        <p className="outfit relative mt-12 max-w-xl text-base text-gray-500 md:text-lg">{PROCESS_NOTE}</p>
      </section>

      {/* 04. Selected work */}
      <ServicesProof />

      {/* 05. Pricing guidance */}
      <section id="pricing" aria-labelledby="pricing-title" className="relative scroll-mt-4 overflow-x-clip px-6 py-20 md:px-11 md:py-28 2xl:px-16">
        <div aria-hidden="true" className="pointer-events-none absolute right-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[110px]" />
        <div className="relative lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <SectionHead
              id="pricing-title"
              eyebrow="Pricing"
              title="Quoted around"
              outline="your project."
              intro="Every project is evaluated individually. I don't publish fixed or 'starting from' prices, because they'd say little about your actual requirements. You tell me what you need, and I quote the real work."
            />
            <motion.div variants={item} initial="hidden" whileInView="show" viewport={VIEWPORT} className="mt-8">
              <CtaLink href={CONTACT_HREF} solid>
                Discuss Your Project
              </CtaLink>
            </motion.div>
          </div>

          <div className="mt-12 lg:mt-0">
            <p className={LABEL}>What the quotation depends on</p>
            <motion.ul
              variants={stagger(0.08)}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              className="mt-4 divide-y divide-white/10 border-y border-white/10"
            >
              {PRICING_FACTORS.map((f) => (
                <motion.li key={f.title} variants={item} className="py-5 md:grid md:grid-cols-[13rem_1fr] md:gap-6">
                  <h3 className="space-grotesk text-lg font-semibold">{f.title}</h3>
                  <p className="outfit mt-1 text-base text-gray-400 md:mt-0 md:text-lg">{f.text}</p>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>

      {/* 06. FAQ */}
      <ServicesFaq />

      {/* 07. Final CTA */}
      <section aria-labelledby="cta-title" className="relative overflow-x-clip px-6 py-24 md:px-11 md:py-36 2xl:px-16">
        <Orbits />
        <motion.div
          variants={stagger(0.14)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="relative mx-auto max-w-4xl text-center"
        >
          <h2 id="cta-title" className="space-grotesk text-[clamp(2.6rem,9vw,6rem)] font-bold leading-[1.02] tracking-tight">
            <SplitWords text="Have something in mind?" /> <SplitWords text="Let's build it." className={OUTLINE} />
          </h2>
          <motion.p variants={item} className="outfit mx-auto mt-6 max-w-xl text-lg text-gray-400 md:text-xl">
            Tell me what you&apos;re trying to achieve. I&apos;ll help you work out the right way to build it.
          </motion.p>
          <motion.div variants={item} className="mt-8 flex justify-center">
            <CtaLink href={CONTACT_HREF} solid>
              Let&apos;s Talk
            </CtaLink>
          </motion.div>
        </motion.div>
      </section>

      <div className="px-6 pb-24 pt-2 md:px-11 2xl:px-16">
        <Link
          href="/"
          className="outfit group inline-flex min-h-11 items-center gap-3 text-base font-semibold text-gray-300 transition-colors duration-300 hover:text-violet-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400"
        >
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
          Back to home
        </Link>
      </div>
    </main>
  );
}