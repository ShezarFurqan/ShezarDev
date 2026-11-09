"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  User,
  Zap,
  Briefcase,
  Share2,
  Mail
} from "lucide-react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);


const navItems = [
  { name: "Intro", id: "intro", icon: Home },
  { name: "About", id: "about", icon: User },
  { name: "Skills", id: "skills", icon: Zap },
  { name: "Projects", id: "projects", icon: Briefcase },
  { name: "Socials", id: "social", icon: Share2 },
];

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("intro");

  useEffect(() => {
    const sections = navItems.map(item => document.getElementById(item.id));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 } 
    );

    sections.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  

  const handleClick = (id) => {
    setActiveTab(id);

    const section = document.getElementById(id);
    if (section) {
      gsap.to(window, {
        duration: 1.2,      // scroll speed (seconds)
        scrollTo: { y: section, offsetY: 80 }, // offset for fixed navbar
        ease: "power2.out"  
      });
    }
  };



  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center items-center px-4">
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-violet-500/20 blur-[60px] rounded-full pointer-events-none" />

      <motion.nav
        initial={{ y: -100, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex items-center gap-1 p-1.5 rounded-full border border-white/10 bg-black/40 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
      >
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 group ${isActive ? "text-white" : "text-gray-400 hover:text-white"
                }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-br from-violet-600/30 to-indigo-600/30 rounded-full border border-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              <span className="relative z-10 flex items-center justify-center">
                <Icon size={18} strokeWidth={2} className={`transition-transform duration-300 ${isActive ? "scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" : "group-hover:scale-110"}`} />
              </span>

              <span className="relative z-10 text-sm font-medium hidden md:block">
                {item.name}
              </span>

              {isActive && (
                <motion.div
                  layoutId="activeGlow"
                  className="absolute -bottom-[1px] left-1/2 -translate-x-1/2 w-8 h-[2px] bg-gradient-to-r from-transparent via-violet-400 to-transparent blur-[1px]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </motion.nav>
    </div>
  );
}