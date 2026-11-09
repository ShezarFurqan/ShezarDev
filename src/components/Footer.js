"use client";
import React from "react";

export default function MiniFooter() {
  return (
    <footer className="w-full bg-[#000119] py-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        
        <p className="text-gray-500 text-[11px] tracking-[0.2em] uppercase">
          © {new Date().getFullYear()} <span className="text-[#6B5BFF] font-bold">SHEZAR</span>
        </p>

        <div className="flex gap-6 text-[10px] font-bold text-gray-600 tracking-widest uppercase">
          <a target="_blank" href="https://github.com/ShezarFurqan" className="hover:text-white transition-colors">Github</a>
          <a target="_blank" href="https://www.linkedin.com/in/shezarfurqan/" className="hover:text-white transition-colors">LinkedIn</a>
        </div>

      </div>
    </footer>
  );
}