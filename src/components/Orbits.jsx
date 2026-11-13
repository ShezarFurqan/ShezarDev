// Faint orbital lines + a violet glow. Purely decorative, static (no animation cost).
export default function Orbits({ className = "" }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
        className="absolute left-1/2 top-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 text-violet-400"
        fill="none"
        stroke="currentColor"
      >
        <ellipse cx="500" cy="500" rx="480" ry="190" transform="rotate(-24 500 500)" strokeOpacity="0.12" />
        <ellipse cx="500" cy="500" rx="360" ry="130" transform="rotate(-24 500 500)" strokeOpacity="0.08" />
        <circle cx="236" cy="640" r="4" fill="currentColor" stroke="none" fillOpacity="0.5" />
      </svg>
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/15 blur-[110px]" />
    </div>
  );
}