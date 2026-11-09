"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  SiReact, SiFirebase, SiTailwindcss, SiNodedotjs, 
  SiExpress, SiMongodb, SiFramer, SiNextdotjs 
} from "react-icons/si";

const skills = [
  { name: "React", icon: <SiReact />, color: "#61DAFB", delay: 0.1 },
  { name: "Next.js", icon: <SiNextdotjs />, color: "#000000", delay: 0.7 },
  { name: "Tailwind", icon: <SiTailwindcss />, color: "#06B6D4", delay: 0.3 },
  { name: "Node.js", icon: <SiNodedotjs />, color: "#339933", delay: 0.4 },
  { name: "Express.js", icon: <SiExpress />, color: "#FFFFFF", delay: 0.5 },
  { name: "MongoDB", icon: <SiMongodb />, color: "#47A248", delay: 0.6 },
  { name: "Firebase", icon: <SiFirebase />, color: "#FFCA28", delay: 0.2 },
  { name: "Framer Motion", icon: <SiFramer />, color: "#E11D48", delay: 0.8 },
];


export default function SkillsSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <section
    id="skills" 
      ref={containerRef}
      className="relative min-h-screen bg-[#000119] flex flex-col items-center justify-center py-24 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#6B5BFF]/10 rounded-full blur-[120px]" />
        
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.2, 1] 
            }}
            transition={{ 
              duration: Math.random() * 3 + 2, 
              repeat: Infinity 
            }}
            className="absolute bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
            }}
          />
        ))}
      </div>

      {/* --- 2. HEADER SECTION --- */}
      <div className="relative z-10 text-center mb-20 px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500"
        >
          Skills & <span className="text-[#6B5BFF] drop-shadow-[0_0_15px_rgba(107,91,255,0.5)]">Expertise</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-gray-400 max-w-lg mx-auto text-lg font-light tracking-wide"
        >
          Mastering the tools of the modern web to build high-performance digital experiences.
        </motion.p>
      </div>

      {/* --- 3. SKILLS GRID --- */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 max-w-6xl px-6">
        {skills.map((skill, index) => (
          <SkillBadge key={index} skill={skill} isInView={isInView} />
        ))}
      </div>
    </section>
  );
}

function SkillBadge({ skill, isInView }) {
  const badgeVariants = {
    initial: { opacity: 0, scale: 0.5, y: 30 },
    animate: (customDelay) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { 
        delay: customDelay, 
        type: "spring", 
        stiffness: 100, 
        damping: 15 
      }
    }),
    float: (customDelay) => ({
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: customDelay 
      }
    })
  };

  return (
    <motion.div
      variants={badgeVariants}
      initial="initial"
      animate={isInView ? ["animate", "float"] : "initial"}
      custom={skill.delay}
      whileHover={{ scale: 1.1, rotate: 2 }}
      className="relative group cursor-pointer"
    >
      {/* Glow Effect */}
      <div 
        className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
        style={{ backgroundColor: skill.color }}
      />
      
      {/* Badge Body */}
      <div className="relative flex flex-col items-center justify-center p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md hover:border-[#6B5BFF]/50 transition-colors duration-500">
        <div 
          className="text-4xl md:text-5xl mb-3 transition-transform duration-500 group-hover:scale-110"
          style={{ color: skill.color }}
        >
          {skill.icon}
        </div>
        <span className="text-gray-300 font-medium tracking-wider text-sm md:text-base group-hover:text-white">
          {skill.name}
        </span>
      </div>

      {/* Particles */}
      <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-1 h-1 bg-white rounded-full animate-ping" />
      </div>
    </motion.div>
  );
}