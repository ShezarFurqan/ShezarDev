'use client';

import { motion, useReducedMotion } from 'framer-motion';

export default function Moon() {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative flex h-full min-h-[280px] w-full select-none items-center justify-center md:min-h-[380px]"
    >
      <div
        className="absolute left-1/2 top-1/2 h-[min(115vw,900px)] w-[min(115vw,900px)] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(213,232,255,0.16) 0%, rgba(213,232,255,0.075) 30%, rgba(213,232,255,0.025) 52%, transparent 72%)',
        }}
      />

      <div
        className="absolute h-[310px] w-[310px] rounded-full blur-[48px] md:h-[440px] md:w-[440px]"
        style={{
          background:
            'radial-gradient(circle, rgba(255,255,255,0.82) 0%, rgba(231,242,255,0.42) 30%, rgba(186,216,255,0.16) 58%, transparent 78%)',
        }}
      />

      {/* Floating Moon Container with Breathing/Floating Animation */}
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.95 }}
        animate={
          reduce
            ? { opacity: 1, scale: 1 }
            : { opacity: 1, scale: 1, y: [-8, 8, -8] }
        }
        transition={{
          opacity: { duration: 1.2, ease: 'easeOut' },
          scale: { duration: 1.2, ease: 'easeOut' },
          y: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="relative h-[260px] w-[260px] overflow-hidden rounded-full md:h-[380px] md:w-[380px]"
        style={{
          boxShadow:
            '0 0 22px rgba(255,255,255,0.8), 0 0 68px rgba(226,240,255,0.55), 0 0 150px rgba(190,218,255,0.28)',
        }}
      >
        <div
          className="absolute inset-0 rounded-full bg-cover bg-center"
          style={{
            backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/e/e1/FullMoon2010.jpg')`,
            filter: 'brightness(1.28) contrast(0.96) saturate(0.5)',
          }}
        />

        <div
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            background:
              'radial-gradient(circle at 76% 38%, rgba(255,255,255,0.36) 0%, rgba(255,255,255,0.12) 34%, transparent 62%), radial-gradient(ellipse at 18% 58%, rgba(8,20,45,0.22) 0%, rgba(8,20,45,0.08) 38%, transparent 68%)',
          }}
        />

        <div
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            background:
              'radial-gradient(ellipse at 82% 50%, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0.08) 24%, transparent 58%)',
          }}
        />
      </motion.div>
    </div>
  );
}