"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiMongodb, SiFirebase, SiFramer, SiGreensock } from "react-icons/si";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    id: 1,
    title: "Scarpa",
    category: "E-commerce",
    description: "Scarpa is a modern online shoe store built with Next.js, Firebase, and Tailwind CSS. It offers a seamless shopping experience with order tracking, and multiple payment options.",
    image: "/scarpa.png", 
    tech: [
      { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
      { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
    ],
    links: {
      demo: "https://rockclimb.vercel.app/",   
      github: "#", 
    },
  }

];


export default function ProjectsSection() {
  const [visibleProjects, setVisibleProjects] = useState(4);
  const totalProjects = projects.length;

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const loadMore = () => {
    setVisibleProjects((prev) => Math.min(prev + 2, totalProjects));
  };

  return (
    <section id="projects" ref={containerRef} className="relative min-h-screen w-full overflow-hidden bg-[#000119] px-6 py-24 md:px-12">

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#6B5BFF]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px]" />

        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full opacity-20"
            initial={{
              x: Math.random() * 1000,
              y: Math.random() * 1000,
            }}
            animate={{
              y: [null, Math.random() * -100],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              width: Math.random() * 2 + 1 + "px",
              height: Math.random() * 2 + 1 + "px",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-sm font-bold tracking-widest text-[#6B5BFF] uppercase mb-3">
            // My Projects
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B5BFF] to-purple-400">Projects</span>
          </h3>
          <p className="mx-auto max-w-2xl text-gray-400 text-lg font-light">
            A collection of digital experiences crafted with precision, exploring the boundaries of design and functionality.
          </p>
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          layout
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {projects.slice(0, visibleProjects).map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {visibleProjects < totalProjects && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-16 flex justify-center"
          >
            <motion.button
              onClick={loadMore}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex items-center gap-2 rounded-full border border-[#6B5BFF]/30 bg-[#6B5BFF]/5 px-8 py-3 text-[#6B5BFF] backdrop-blur-sm transition-all hover:bg-[#6B5BFF] hover:text-white"
            >
              <span className="font-medium">View More Projects</span>
              <div className="absolute inset-0 rounded-full bg-[#6B5BFF] blur-lg opacity-0 group-hover:opacity-40 transition-opacity" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}