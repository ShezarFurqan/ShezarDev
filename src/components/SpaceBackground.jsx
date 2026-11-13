// components/SpaceBackground.jsx
// Server component: no client JS. Same stars as before, but the two glows are
// now plain radial gradients instead of huge blur() filters, which look the
// same and are much cheaper to paint (big win on phones).

// Seeded PRNG: same stars on server and client (no hydration mismatch)
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
  twinkle: i % 15 === 0, // only 4 stars
  delay: (rand() * 6).toFixed(1),
}));

const VIOLET =
  "radial-gradient(closest-side, rgba(147,51,234,0.10) 35%, rgba(147,51,234,0) 100%)";
const BLUE =
  "radial-gradient(closest-side, rgba(30,58,138,0.10) 35%, rgba(30,58,138,0) 100%)";

export default function SpaceBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#000210]"
      style={{ contain: "strict" }}
    >
      {/* Glow 1 (violet), upper left */}
      <div
        className="absolute left-1/4 top-1/4 -translate-x-1/4 -translate-y-1/4"
        style={{
          width: "min(740px, 120vw)",
          height: "min(740px, 120vw)",
          background: VIOLET,
        }}
      />
      {/* Glow 2 (blue), lower right */}
      <div
        className="absolute bottom-1/4 right-1/4 translate-x-1/4 translate-y-1/4"
        style={{
          width: "min(840px, 135vw)",
          height: "min(840px, 135vw)",
          background: BLUE,
        }}
      />

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
