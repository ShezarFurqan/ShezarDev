"use client";
import React from "react";
import { motion, useMotionValue,  useTransform } from "framer-motion";


export default function SocialCard({ social, variants }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-100, 100], [30, -30]);
    const rotateY = useTransform(x, [-100, 100], [-30, 30]);

    function handleMouseMove(event) {
        const rect = event.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct * width); 
        y.set(yPct * height);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            variants={variants}
            style={{
                perspective: 1000,
            }}
            className="w-full h-full"
        >
            <motion.a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="group relative flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden cursor-pointer transition-colors duration-500 hover:border-white/30"
            >
                {/* HOVER GLOW BACKGROUND */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                    style={{
                        background: `radial-gradient(circle at center, ${social.color}, transparent 70%)`
                    }}
                />

                {/* CONTENT */}
                <div className="relative z-10 flex items-center gap-4 transform translate-z-20">
                    {/* Icon Box */}
                    <div
                        className="w-12 h-12 flex items-center justify-center rounded-xl bg-black/50 border border-white/10 text-2xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                        style={{ color: social.color }} 
                    >
                        {social.icon}
                    </div>

                    {/* Text Info */}
                    <div className="flex flex-col">
                        <span className="text-white font-semibold text-lg tracking-wide group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                            {social.name}
                        </span>
                        <span className="text-gray-500 text-sm group-hover:text-gray-300 transition-colors">
                            {social.handle}
                        </span>
                    </div>
                </div>

                <div className="relative z-10 transform translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                </div>

                <div
                    className="absolute bottom-0 left-0 w-full h-[2px] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                    style={{ backgroundColor: social.color, boxShadow: `0 0 10px ${social.color}` }}
                />
            </motion.a>
        </motion.div>
    );
}