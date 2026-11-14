"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHead } from "./ServicesParts";
import { useKit } from "./MotionKit";
import { PROJECTS } from "@/data/projects";
import { PROOF } from "@/data/services";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "website", label: "Websites" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "systems", label: "Systems & dashboards" },
];

// Reuses data/projects.js for names, images, URLs and categories; only the one-line "note" is new.
export default function ServicesProof() {
  const { item, stagger } = useKit();
  const [filter, setFilter] = useState("all");

  const rows = useMemo(
    () =>
      PROOF.map((p) => ({ ...p, project: PROJECTS.find((x) => x.slug === p.slug) })).filter(
        (p) => p.project && (filter === "all" || p.services.includes(filter))
      ),
    [filter]
  );

  return (
    <section id="proof" aria-labelledby="proof-title" className="relative scroll-mt-4 overflow-x-clip px-6 py-20 md:px-11 md:py-28 2xl:px-16">
      <SectionHead
        id="proof-title"
        eyebrow="Selected work"
        title="Real projects,"
        outline="real scope."
        intro="A few projects that show what each service looks like in practice. Where my part was limited, I say so."
      />

      <div role="group" aria-label="Filter projects by service" className="relative mt-10 flex flex-wrap gap-3">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={`outfit min-h-11 rounded-full border px-5 text-sm font-semibold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400 md:text-base ${
              filter === f.id ? "border-[#3d0eb2] bg-[#3d0eb2]" : "border-white/15 text-gray-300 hover:border-violet-400"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* key={filter} replays the entrance each time the filter changes */}
      <motion.ul
        key={filter}
        variants={stagger(0.1)}
        initial="hidden"
        animate="show"
        className="relative mt-10 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3"
      >
        {rows.map(({ project, note }) => (
          <motion.li key={project.slug} variants={item}>
            <article className="group">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-[#06062a]">
                {project.desktopImage && (
                  <Image
                    src={project.desktopImage}
                    alt={`${project.name} website preview`}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                )}
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <h3 className="space-grotesk text-2xl font-bold">{project.name}</h3>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${project.name} (opens in a new tab)`}
                    className="outfit shrink-0 rounded-full text-sm font-semibold text-gray-300 transition-colors duration-300 hover:text-violet-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400"
                  >
                    Visit site ↗
                  </a>
                )}
              </div>
              <p className="space-mono-bold mt-1 text-[11px] text-violet-400">{project.category}</p>
              <p className="outfit mt-3 text-base text-gray-400 md:text-lg">{note}</p>
            </article>
          </motion.li>
        ))}
      </motion.ul>

      <div className="relative mt-12">
        <Link
          href="/work"
          className="outfit group inline-flex min-h-11 items-center gap-3 text-base font-semibold text-gray-300 transition-colors duration-300 hover:text-violet-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400"
        >
          See the full work archive
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </section>
  );
}