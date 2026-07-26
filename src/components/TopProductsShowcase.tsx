import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Particles } from "./Particles";

type ShowcaseItem = {
  id: string;
  index: string;
  category: string;
  name: string;
  priceINR: string;
  image: string;
  w: number;
  h: number;
  badge: string;
};

const items: ShowcaseItem[] = [
  {
    id: "p1",
    index: "01",
    category: "Preservation",
    name: "Samsung Side-by-Side Refrigerator",
    priceINR: "₹1,15,990",
    image: "/fridge.png",
    w: 420,
    h: 620,
    badge: "Bespoke Edition",
  },
  {
    id: "p2",
    index: "02",
    category: "Climate",
    name: "Daikin Inverter Air Conditioner",
    priceINR: "₹47,990",
    image: "/ac.png",
    w: 520,
    h: 420,
    badge: "Kinetic Edition",
  },
  {
    id: "p3",
    index: "03",
    category: "Laundry",
    name: "LG Front Load Washing Machine",
    priceINR: "₹44,990",
    image: "/washer.png",
    w: 420,
    h: 580,
    badge: "ThinQ AI Edition",
  },
  {
    id: "p4",
    index: "04",
    category: "Culinary",
    name: "IFB Convection Microwave Oven",
    priceINR: "₹18,490",
    image: "/microwave.png",
    w: 520,
    h: 400,
    badge: "Chef Edition",
  },
  {
    id: "p5",
    index: "05",
    category: "Kitchen Tech",
    name: "Philips Mixer Grinder",
    priceINR: "₹6,499",
    image: "/blender.png",
    w: 320,
    h: 580,
    badge: "Avance Edition",
  },
  {
    id: "p6",
    index: "06",
    category: "Cinema",
    name: "Sony Bravia",
    priceINR: "₹2,19,990",
    image: "/tv.png",
    w: 620,
    h: 400,
    badge: "OLED XR Edition",
  },
];

/**
 * TopProductsShowcase — Premier Upper Horizontal 3D Coverflow Showcase.
 * Uses the exact scroll-driven horizontal 3D translation & alternating 3D rotation physics.
 */
export function TopProductsShowcase({
  onReserveProduct,
}: {
  onReserveProduct?: (p: { title: string; priceINR: string; image: string }) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 85, damping: 26, mass: 0.5 });

  // Horizontal 3D translation bound to scroll
  const x = useTransform(progress, [0, 1], ["5%", "-65%"]);
  // Alternating 3D rotation dynamics
  const rot = useTransform(progress, [0, 1], [8, -8]);
  const rotAlt = useTransform(progress, [0, 1], [-8, 8]);

  // Section title reveal
  const titleY = useTransform(progress, [0, 0.15], [60, 0]);
  const titleOpacity = useTransform(progress, [0, 0.15], [0, 1]);

  return (
    <section ref={ref} id="upper-showcase" className="relative h-[260svh] w-full border-b border-white/10">
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden bg-gradient-to-b from-black/60 via-background to-black/80">
        {/* Ambient radial lighting */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(90% 70% at 50% 50%, color-mix(in oklab, var(--accent) 15%, transparent), transparent 70%)",
          }}
        />
        <Particles tone="frost" count={35} />

        {/* Section Header */}
        <motion.div
          className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-col justify-between px-6 md:flex-row md:items-end md:px-14"
          style={{ y: titleY, opacity: titleOpacity }}
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="h-2 w-2 rounded-full bg-accent animate-ping" />
              <span className="font-mono text-xs uppercase tracking-[0.35em] text-accent">
                Upper Suite Collection 2026
              </span>
            </div>
            <h2 className="max-w-3xl text-[clamp(2.2rem,5vw,4.5rem)] font-light leading-[0.98] text-gradient">
              Explore The 6 Engineering Icons.
            </h2>
          </div>
          <div className="mt-4 flex items-center gap-3 md:mt-0">
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-mono">
              Scroll down to navigate 3D coverflow →
            </span>
          </div>
        </motion.div>

        {/* Horizontal 3D Coverflow Slider */}
        <motion.ul
          style={{ x }}
          className="relative z-10 mt-10 flex items-end gap-10 md:gap-16 will-change-transform px-6 md:px-14"
        >
          {items.map((item, i) => (
            <motion.li
              key={item.id}
              onClick={() => onReserveProduct?.({ title: item.name, priceINR: item.priceINR, image: item.image })}
              style={{
                rotate: i % 2 === 0 ? rot : rotAlt,
                transformPerspective: 1000,
              }}
              className="group relative flex shrink-0 cursor-pointer flex-col items-center rounded-3xl border border-white/10 bg-card/60 backdrop-blur-2xl p-6 transition-all duration-500 hover:border-accent/60 hover:bg-card/90 hover:shadow-[0_40px_100px_-20px_rgba(232,208,158,0.3)] w-[300px] md:w-[380px]"
              whileHover={{ scale: 1.08, rotateY: 6, z: 50 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              data-cursor
              data-cursor-label="EXPLORE"
            >
              {/* Floating Badge */}
              <div className="w-full flex items-center justify-between z-10 mb-2">
                <span className="font-mono text-xs tracking-widest text-accent font-semibold">
                  [{item.index}]
                </span>
                <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-0.5 text-[0.65rem] uppercase tracking-widest text-accent font-mono">
                  {item.badge}
                </span>
              </div>

              {/* 3D Product Asset Container with Ambient Glow Halo */}
              <div className="relative flex h-[28svh] items-center justify-center md:h-[34svh] w-full" style={{ perspective: "600px" }}>
                <div
                  aria-hidden="true"
                  className="glow-orb absolute inset-x-6 bottom-2 aspect-square animate-breathe rounded-full opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                />
                <img
                  src={item.image}
                  alt={item.name}
                  width={item.w}
                  height={item.h}
                  loading="lazy"
                  decoding="async"
                  style={{
                    filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.65))",
                  }}
                  className="relative h-full w-auto object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.7)] transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Content Footer */}
              <div className="mt-4 text-center w-full z-10">
                <span className="text-[0.65rem] uppercase tracking-[0.32em] text-muted-foreground font-mono block">
                  {item.category}
                </span>
                <h3 className="mt-1 text-lg font-light text-foreground group-hover:text-accent transition-colors line-clamp-1">
                  {item.name}
                </h3>
                <span className="mt-1 font-mono text-sm text-accent font-bold block">
                  {item.priceINR}
                </span>
                <span className="mt-3 inline-block rounded-full border border-accent/30 bg-accent/15 px-4 py-1.5 text-[0.65rem] uppercase tracking-widest text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Reserve Machine →
                </span>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
