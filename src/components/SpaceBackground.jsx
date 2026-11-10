// components/SpaceBackground.jsx

// Seeded PRNG: server aur client par same stars (no hydration mismatch)
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(20260);

const STARS = Array.from({ length: 60 }, (_, i) => ({
  left: (rand() * 100).toFixed(2),
  top: (rand() * 100).toFixed(2),
  size: rand() > 0.85 ? 2 : 1, // whole pixels only
  opacity: (0.15 + rand() * 0.35).toFixed(2),
  twinkle: i % 15 === 0, // sirf 4 stars
  delay: (rand() * 6).toFixed(1),
}));

export default function SpaceBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#000119]"
    >
      {/* Nebula: static, no pulse */}
      <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 h-[600px] w-[600px] rounded-full bg-blue-900/10 blur-[120px]" />

      {STARS.map((s, i) => (
        <span
          key={i}
          className={`absolute rounded-full bg-white ${s.twinkle ? "star-twinkle" : ""}`}
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            animationDelay: s.twinkle ? `${s.delay}s` : undefined,
          }}
        />
      ))}
    </div>
  );
}