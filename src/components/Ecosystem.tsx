import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Particles } from "./Particles";

type Item = { src: string; label: string; price?: string; w: number; h: number };

export function Ecosystem({
  items,
  onReserveItem,
}: {
  items: Item[];
  onReserveItem?: (item: { title: string; priceINR: string; image: string }) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.6 });
  const x = useTransform(progress, [0, 1], ["6%", "-62%"]);
  const rot = useTransform(progress, [0, 1], [6, -6]);
  const rotAlt = useTransform(progress, [0, 1], [-6, 6]);

  // Apple-style upward reveal for section title
  const titleY = useTransform(progress, [0, 0.15], [80, 0]);
  const titleOpacity = useTransform(progress, [0, 0.15], [0, 1]);
  const titleScale = useTransform(progress, [0, 0.15], [0.95, 1]);

  return (
    <section ref={ref} id="ecosystem" className="relative h-[320svh] w-full" aria-labelledby="ecosystem-title">
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(90% 70% at 50% 50%, color-mix(in oklab, var(--accent) 14%, transparent), transparent 70%)",
          }}
        />
        <Particles tone="neutral" count={34} />

        <motion.div
          className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-col justify-between px-6 md:flex-row md:items-end md:px-14"
          style={{
            y: titleY,
            opacity: titleOpacity,
            scale: titleScale,
            transformOrigin: "center bottom",
          }}
        >
          <div>
            <span className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
              Chapter 07 — Ecosystem
            </span>
            <h2
              id="ecosystem-title"
              className="mt-4 max-w-3xl text-[clamp(2.2rem,5.5vw,4.5rem)] font-light leading-[0.98] text-gradient"
            >
              One language, spoken by every room.
            </h2>
          </div>
          <div className="mt-6 flex items-center gap-3 md:mt-0">
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-mono">
              Click any machine to reserve
            </span>
          </div>
        </motion.div>

        <motion.ul
          style={{ x }}
          className="relative z-10 mt-14 flex items-end gap-10 will-change-transform md:gap-20"
        >
          {items.map((item, i) => (
            <motion.li
              key={item.label}
              onClick={() => onReserveItem?.({ title: item.label, priceINR: item.price || "", image: item.src })}
              style={{
                rotate: i % 2 === 0 ? rot : rotAlt,
                transformPerspective: 800,
              }}
              className="group relative flex shrink-0 cursor-pointer flex-col items-center"
              whileHover={{ scale: 1.08, rotateY: 5, z: 40 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              data-cursor
              data-cursor-label="PREVIEW"
            >
              <div className="relative flex h-[30svh] items-end md:h-[38svh]" style={{ perspective: "600px" }}>
                <div
                  aria-hidden="true"
                  className="glow-orb absolute inset-x-4 bottom-0 aspect-square animate-breathe rounded-full opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                />
                <img
                  src={item.src}
                  alt={item.label}
                  width={item.w}
                  height={item.h}
                  loading="lazy"
                  decoding="async"
                  style={{
                    filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.65))",
                  }}
                  className="relative h-full w-auto object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.65)] transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-6 text-center">
                <span className="text-[0.68rem] uppercase tracking-[0.34em] text-muted-foreground transition-colors duration-300 group-hover:text-foreground block">
                  {item.label}
                </span>
                {item.price && (
                  <span className="mt-1 font-mono text-xs text-accent font-semibold block">
                    {item.price}
                  </span>
                )}
                <span className="mt-2 inline-block rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[0.6rem] uppercase tracking-widest text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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
