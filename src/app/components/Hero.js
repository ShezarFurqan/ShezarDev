"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion"; 

export default function Hero() {
  const containerRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const subHeadingRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      gsap.set([eyebrowRef.current, subHeadingRef.current, buttonRef.current], {
        y: 30,
        opacity: 0
      });

      tl.to(containerRef.current, { opacity: 1, duration: 0.1 });


      const headingWords = headingRef.current.querySelectorAll(".word");
      gsap.set(headingWords, { y: 50, opacity: 0 });

      tl.to(eyebrowRef.current, { y: 0, opacity: 1, duration: 0.8, delay: 0.2 })
        .to(headingWords, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.2)"
        }, "-=0.4")
        .to(subHeadingRef.current, { y: 0, opacity: 1, duration: 0.6 }, "-=0.4")
        .to(buttonRef.current, { y: 0, opacity: 1, duration: 0.6 }, "-=0.4");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="intro"
      ref={containerRef}
      className="relative w-full min-h-screen mt-8 flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-[#000119] opacity-0"
    >
      <div className="absolute inset-0 pointer-events-none">
        {/* Nebula Glows */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px]" />

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

      <div className="relative z-10 flex flex-col items-center">
        <div
          ref={eyebrowRef}
          className="text-[10px] md:text-xs font-semibold tracking-[0.3em] text-violet-400 uppercase mb-6 drop-shadow-[0_0_10px_rgba(167,139,250,0.5)]"
        >
          Dynamic Web Magic with Modern Tech
        </div>

        <h1
          ref={headingRef}
          className="text-4xl md:text-6xl lg:text-[80px] font-bold tracking-tight leading-[1.1] text-white max-w-5xl mb-8"
        >
          <span className="word inline-block">Transforming</span>{" "}
          <span className="word inline-block">Ideas</span>{" "}
          <span className="word inline-block">into</span>{" "}
          <br className="hidden md:block" />
          <span className="word inline-block">Seamless</span>{" "}
          <span className="word inline-block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-300">
            User Experiences
          </span>
        </h1>

        <p
          ref={subHeadingRef}
          className="text-base md:text-lg text-gray-300 font-light mb-10 max-w-2xl"
        >
          Hi, I'm <span className="text-white font-medium">Shezar</span> — Full Stack Developer from Pakistan
        </p>

        <div ref={buttonRef} className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => {
              const section = document.getElementById("projects");
              section?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative flex items-center gap-2 px-8 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(107,91,255,0.2)]" > See my work
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" >
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </button>
          <a
            href="/resume.pdf"
            download="Shezar_Furqan_Resume.pdf"
            className="group relative flex items-center gap-2 px-8 py-3 rounded-xl bg-violet-600/20 border border-violet-500/30 text-sm font-medium text-white hover:bg-violet-600/30 transition-all duration-300 backdrop-blur-md shadow-[0_0_20px_rgba(107,91,255,0.2)] hover:shadow-[0_0_40px_rgba(107,91,255,0.4)]" >
            Download Resume

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-y-0.5" >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </a>

        </div>
      </div>
    </section>
  );
}