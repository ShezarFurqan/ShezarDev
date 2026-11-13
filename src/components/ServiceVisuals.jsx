// Three small interface compositions, built from plain divs (no images, no JS).
// Each reacts to hover through a `group` class on whatever wraps it, so they cost nothing to run.

const Dot = () => <span className="h-1.5 w-1.5 rounded-full bg-white/25" />;

// 01: a browser window whose hero and button respond on hover
export function BrowserVisual() {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      <div className="absolute inset-x-[9%] bottom-0 top-[16%] rounded-t-xl border border-white/15 bg-[#06062a]/80 transition-transform duration-500 ease-out group-hover:-translate-y-2">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2.5">
          <Dot />
          <Dot />
          <Dot />
          <span className="ml-3 h-2 w-1/2 rounded-full bg-white/10" />
        </div>
        <div className="space-y-2.5 p-4">
          <span className="block h-3 w-3/5 rounded bg-white/70" />
          <span className="block h-3 w-2/5 rounded bg-white/30" />
          <span className="mt-3 block h-6 w-20 rounded-full bg-[#3d0eb2] transition-all duration-500 group-hover:w-28" />
          <div className="grid grid-cols-3 gap-2 pt-3">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="h-10 rounded-md border border-white/10 bg-white/[0.04] transition-colors duration-500 group-hover:border-violet-400/40"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// 02: a storefront grid with a cart chip; tiles lift one after another on hover
export function StoreVisual() {
  const tiles = [
    { h: "h-16", p: "w-8" },
    { h: "h-24", p: "w-10" },
    { h: "h-24", p: "w-10" },
    { h: "h-16", p: "w-8" },
  ];
  return (
    <div aria-hidden="true" className="absolute inset-0">
      <span className="absolute right-[9%] top-[13%] flex items-center gap-2 rounded-full border border-violet-400/40 bg-violet-600/20 px-3 py-1 text-[10px] text-violet-200">
        Cart
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#3d0eb2] text-[9px] transition-transform duration-500 group-hover:scale-125">
          2
        </span>
      </span>
      <div className="absolute inset-x-[9%] bottom-[8%] top-[34%] grid grid-cols-4 items-end gap-2.5">
        {tiles.map((t, i) => (
          <div
            key={i}
            style={{ transitionDelay: `${i * 70}ms` }}
            className="flex flex-col gap-1.5 transition-transform duration-500 ease-out group-hover:-translate-y-2"
          >
            <span className={`${t.h} rounded-lg border border-white/10 bg-gradient-to-b from-violet-500/30 to-white/[0.03]`} />
            <span className="h-1.5 w-full rounded bg-white/35" />
            <span className={`h-1.5 ${t.p} rounded bg-violet-400/70`} />
          </div>
        ))}
      </div>
    </div>
  );
}

// 03: a dashboard of linked panels; the chart bars grow on hover
export function SystemVisual() {
  const bars = ["h-[35%]", "h-[55%]", "h-[42%]", "h-[75%]", "h-[60%]", "h-[90%]"];
  return (
    <div aria-hidden="true" className="absolute inset-0">
      <div className="absolute inset-x-[8%] inset-y-[12%] grid grid-cols-[0.55fr_1.45fr] gap-2.5">
        <div className="space-y-2.5 rounded-xl border border-white/10 bg-[#06062a]/80 p-3">
          <span className="block h-2 w-3/4 rounded bg-violet-400/70" />
          <span className="block h-2 w-full rounded bg-white/20" />
          <span className="block h-2 w-2/3 rounded bg-white/20" />
          <span className="block h-2 w-5/6 rounded bg-white/20" />
        </div>
        <div className="grid grid-rows-[auto_1fr] gap-2.5">
          <div className="grid grid-cols-2 gap-2.5">
            {[0, 1].map((i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-[#06062a]/80 p-3 transition-colors duration-500 group-hover:border-violet-400/40">
                <span className="block h-1.5 w-1/2 rounded bg-white/30" />
                <span className="mt-2 block h-3 w-2/3 rounded bg-white/70" />
              </div>
            ))}
          </div>
          <div className="flex items-end gap-2 rounded-xl border border-white/10 bg-[#06062a]/80 p-3">
            {bars.map((h, i) => (
              <span
                key={i}
                style={{ transitionDelay: `${i * 40}ms` }}
                className={`${h} flex-1 origin-bottom rounded-sm bg-gradient-to-t from-[#3d0eb2] to-violet-400/80 transition-transform duration-500 ease-out group-hover:scale-y-[1.18]`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export const VISUALS = {
  website: BrowserVisual,
  ecommerce: StoreVisual,
  systems: SystemVisual,
};