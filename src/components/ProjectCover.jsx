import Image from "next/image";

// The visual for a project. Uses the real screenshot when `project.image` is set;
// otherwise a typographic cover in the site's violet/space style.
export default function ProjectCover({ project, sizes = "(min-width: 1024px) 40vw, 100vw", priority = false }) {
  const monogram = project.name
    .replace(/\.(pk|dev|com)$/i, "")
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#07072a]">
      {project.image ? (
        <Image
          src={project.image}
          alt={`${project.name} website preview`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top"
        />
      ) : (
        <div role="img" aria-label={`${project.name} cover`} className="absolute inset-0">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-violet-600/30 blur-[80px]" />
          <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-indigo-600/25 blur-[80px]" />
          <span
            aria-hidden="true"
            className="space-grotesk absolute inset-0 flex items-center justify-center text-[clamp(6rem,22vw,11rem)] font-bold leading-none text-transparent [-webkit-text-stroke:1px_rgba(167,139,250,0.55)] lg:text-[clamp(6rem,12vw,10rem)]"
          >
            {monogram}
          </span>
          <span className="space-mono-bold absolute bottom-4 left-5 text-[11px] uppercase tracking-[0.25em] text-gray-300">
            {project.name}
          </span>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-violet-400/10" />
    </div>
  );
}