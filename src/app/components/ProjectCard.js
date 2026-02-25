"use client";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink} from "react-icons/fi";


export default function ProjectCard  ({ project, index })  {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col h-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 hover:border-[#6B5BFF]/50 hover:shadow-[0_0_50px_rgba(107,91,255,0.15)]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#6B5BFF]/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative h-64 w-full overflow-hidden">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#000119] via-[#000119]/40 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-60" />

        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-700"
        />

        <div className="absolute top-4 right-4 z-20 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-xs font-medium text-[#6B5BFF] backdrop-blur-md">
          {project.category}
        </div>
      </div>

      <div className="relative z-20 flex flex-grow flex-col p-6 -mt-10">
        <h3 className="mb-2 text-2xl font-bold text-white transition-colors group-hover:text-[#6B5BFF]">
          {project.title}
        </h3>

        <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-gray-400 group-hover:text-gray-300">
          {project.description}
        </p>

        <div className="mt-auto mb-6 flex flex-wrap gap-2">
          {project.tech.map((tech, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 rounded-full border border-white/5 bg-white/5 px-3 py-1.5 text-xs text-gray-300 backdrop-blur-sm transition-colors hover:bg-white/10 hover:text-white"
            >
              <tech.icon style={{ color: tech.color }} />
              <span>{tech.name}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-4 border-t border-white/10 pt-6">
          <motion.a
            href={project.links.demo}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#6B5BFF] to-violet-600 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all hover:shadow-violet-500/40"
          >
            <FiExternalLink /> Live Demo
          </motion.a>

          <motion.a
            href={project.links.github}
            whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.98 }}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-transparent py-3 text-sm font-semibold text-white transition-colors hover:border-white/30"
          >
            <FiGithub /> Source Code
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};