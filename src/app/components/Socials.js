"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaDiscord
} from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import SocialCard from "./SocialCard";

// --- Social Data ---
const socialLinks = [
  {
    name: "GitHub",
    handle: "Shezar Furqan",
    url: "https://github.com/ShezarFurqan",
    icon: <FaGithub />,
    color: "#ffffff", 
    gradient: "from-gray-600 to-gray-900"
  },
  {
    name: "LinkedIn",
    handle: "Shezar Furqan",
    url: "https://www.linkedin.com/in/shezarfurqan/",
    icon: <FaLinkedinIn />,
    color: "#0A66C2", 
    gradient: "from-blue-600 to-blue-900"
  },
  {
    name: "Discord",
    handle: "Render Stack", 
    url: "https://discord.gg/ZcEpPKCMXF", 
    icon: <FaDiscord />,
    color: "#5865F2",
    gradient: "from-indigo-500 to-blue-500"
  },
  {
    name: "Instagram",
    handle: "shezar.____x59",
    url: "https://www.instagram.com/shezar.____x59/",
    icon: <FaInstagram />,
    color: "#E1306C", 
    gradient: "from-purple-500 to-pink-500"
  },
  {
    name: "YouTube",
    handle: "Shezar Furqan",
    url: "https://www.youtube.com/@shezar_dev",
    icon: <FaYoutube />,
    color: "#FF0000", 
    gradient: "from-red-500 to-orange-500"
  },
  {
    name: "Email",
    handle: "shezarfurqan@gmail.com",
    url: "/",
    icon: <SiGmail />,
    color: "#EA4335", 
    gradient: "from-red-500 to-yellow-500"
  }
];

export default function ConnectSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 }
    },
  };

  return (
    <section
      id="social"
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#000119] flex flex-col items-center justify-center py-20 px-4 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-tr from-[#6B5BFF]/10 via-purple-900/10 to-blue-900/10 rounded-full blur-[120px] animate-pulse" />

        {/* Stars */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full opacity-20"
            animate={{
              opacity: [0.1, 0.5, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
            }}
          />
        ))}
      </div>

      {/* --- 2. HEADER CONTENT --- */}
      <div className="relative z-10 text-center mb-16 max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-xs md:text-sm font-bold tracking-[0.3em] text-violet-400 uppercase mb-4"
        >
          // Network
        </motion.h2>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold text-white mb-6"
        >
          Connect <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-300 drop-shadow-[0_0_10px_rgba(107,91,255,0.5)]">With Me</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 text-base md:text-lg font-light"
        >
          Follow my journey, see my code, or just say hi.
          <br className="hidden md:block" /> Let's build something amazing together.
        </motion.p>
      </div>

      {/* --- 3. SOCIAL GRID --- */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl"
      >
        {socialLinks.map((social, index) => (
          <SocialCard key={index} social={social} variants={itemVariants} />
        ))}
      </motion.div>
    </section>
  );
}

