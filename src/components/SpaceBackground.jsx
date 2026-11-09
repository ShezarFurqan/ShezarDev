"use client";
import React from "react";
import { motion } from "framer-motion";

export default function SpaceBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 bg-[#000119] overflow-hidden">
      {/* Nebula Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px]" />

      {/* Animated Stars */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full opacity-20"
          initial={{
            x: typeof window !== "undefined" ? Math.random() * window.innerWidth : 0,
            y: typeof window !== "undefined" ? Math.random() * window.innerHeight : 0,
          }}
          animate={{
            y: [null, Math.random() * -100],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            width: Math.random() * 3 + "px",
            height: Math.random() * 3 + "px",
          }}
        />
      ))}
    </div>
  );
}