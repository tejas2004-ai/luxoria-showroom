import { useRef, useEffect, type ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, type MotionValue } from "framer-motion";
import { Particles } from "./Particles";
import { RevealText } from "./RevealText";

export type SceneProps = {
  index: string;
  eyebrow: string;
  title: string;
  copy: string;
  features: string[];
  image: string;
  width: number;
  height: number;
  tone: "frost" | "cyan" | "ember" | "neutral";
  wash: string;
  priceINR: string;
  priceUSD: string;
  brandEdition: string;
  warranty: string;
  atmosphere?: (p: { progress: MotionValue<number> }) => ReactNode;
  align?: "left" | "right";
  rotate?: number;
  onReserve?: (product: { title: string; priceINR: string; image: string }) => void;
};

export function ProductScene({
  index,
  eyebrow,
  title,
  copy,
  features,
  image,
  width,
  height,
  tone,
  wash,
  priceINR,
  priceUSD,
  brandEdition,
  warranty,
  atmosphere,
  align = "left",
  rotate = 8,
  onReserve,
}: SceneProps) {
  const ref = useRef<HTMLElement>(null);
  const imgContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const progress = scrollYProgress; // Direct scroll progress for zero frame lag

  // Scroll-driven transforms (pure GPU transforms)
  const scale = useTransform(progress, [0, 0.45, 1], [0.75, 1, 0.88]);
  const y = useTransform(progress, [0, 1], ["10%", "-10%"]);
  const scrollRotateY = useTransform(progress, [0, 1], [rotate, -rotate]);
  const opacity = useTransform(progress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.2]);
  const washOpacity = useTransform(progress, [0, 0.35, 0.7, 1], [0, 1, 1, 0]);
  const glowScale = useTransform(progress, [0, 0.5, 1], [0.7, 1.15, 0.8]);

  // Apple-style scroll upward reveal for text block
  const textY = useTransform(progress, [0, 0.3, 0.75, 1], [40, 0, 0, -40]);
  const textOpacity = useTransform(progress, [0, 0.15, 0.85, 1], [0.4, 1, 1, 0.4]);
  const textScale = useTransform(progress, [0, 0.3, 0.75, 1], [0.97, 1, 1, 0.97]);

  // Cursor-controlled 3D tilt on the product image with RAF throttling
  const cursorRotateX = useMotionValue(0);
  const cursorRotateY = useMotionValue(0);
  const cursorTranslateZ = useMotionValue(0);
  const springCursorRotateX = useSpring(cursorRotateX, { stiffness: 140, damping: 20 });
  const springCursorRotateY = useSpring(cursorRotateY, { stiffness: 140, damping: 20 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const container = imgContainerRef.current;
    if (!container) return;

    let rafId: number | null = null;
    const handleMove = (e: MouseEvent) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const rect = container.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        cursorRotateX.set(-(y - 0.5) * 14);
        cursorRotateY.set((x - 0.5) * 14);
      });
    };

    const handleLeave = () => {
      cursorRotateX.set(0);
      cursorRotateY.set(0);
    };

    container.addEventListener("mousemove", handleMove, { passive: true });
    container.addEventListener("mouseleave", handleLeave);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      container.removeEventListener("mousemove", handleMove);
      container.removeEventListener("mouseleave", handleLeave);
    };
  }, [cursorRotateX, cursorRotateY]);

  // Deep background parallax watermark
  const watermarkY = useTransform(progress, [0, 1], ["40%", "-40%"]);
  const watermarkOpacity = useTransform(progress, [0.1, 0.4, 0.7, 0.9], [0, 0.06, 0.06, 0]);

  return (
    <section
      ref={ref}
      id={`scene-${index}`}
      aria-labelledby={`scene-heading-${index}`}
      className="relative min-h-[220svh] w-full"
    >
      <motion.div
        aria-hidden="true"
        style={{ opacity: washOpacity, background: wash }}
        className="pointer-events-none absolute inset-0"
      />

      {/* Giant Parallax Watermark Number */}
      <motion.div
        aria-hidden="true"
        style={{ y: watermarkY, opacity: watermarkOpacity }}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[clamp(14rem,35vw,36rem)] font-extralight tracking-tighter text-white z-0 transform-gpu will-change-transform"
      >
        {index}
      </motion.div>

      <div className="sticky top-0 flex h-svh w-full items-center overflow-hidden z-10" style={{ perspective: "1400px" }}>
        <Particles tone={tone} count={30} />
        {atmosphere?.({ progress })}

        <div className="relative mx-auto grid w-full max-w-[1600px] grid-cols-1 items-center gap-8 px-6 md:grid-cols-2 md:px-14">
          {/* Text content with scroll-upward 3D reveal */}
          <motion.div
            className={`relative z-10 max-w-xl ${align === "right" ? "md:order-2 md:justify-self-end" : ""}`}
            style={{
              y: textY,
              opacity: textOpacity,
              scale: textScale,
              transformPerspective: 1000,
              transformOrigin: "center bottom",
            }}
          >
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs tracking-[0.35em] text-accent">{index}</span>
              <span className="h-px w-8 bg-border" />
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {eyebrow}
              </span>
              <span className="ml-auto rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[0.65rem] uppercase tracking-widest text-accent">
                {brandEdition}
              </span>
            </div>

            <RevealText
              as="h2"
              text={title}
              className="text-[clamp(2.5rem,6.5vw,5.5rem)] font-light leading-[0.96] text-gradient"
            />

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground"
            >
              {copy}
            </motion.p>

            {/* Price Tag & Warranty Strip */}
            <div className="mt-6 flex flex-wrap items-baseline gap-4 border-y border-white/10 py-4">
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-widest block font-mono">Price</span>
                <span className="font-display text-2xl font-semibold text-foreground">{priceINR}</span>
                <span className="ml-2 text-xs font-mono text-muted-foreground">({priceUSD})</span>
              </div>
              <div className="ml-auto text-right">
                <span className="text-xs text-accent uppercase tracking-widest block font-mono">Concierge Service</span>
                <span className="text-xs text-foreground/90 font-medium">{warranty}</span>
              </div>
            </div>

            <ul className="mt-6 flex flex-wrap gap-2.5">
              {features.map((f, i) => (
                <motion.li
                  key={f}
                  initial={{ opacity: 0, y: 18, filter: "blur(6px)", scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.6, delay: 0.25 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                  className="glass rounded-full px-4 py-1.5 text-xs tracking-wide text-foreground/85 transition-all duration-300 hover:scale-105 hover:bg-foreground/10"
                >
                  {f}
                </motion.li>
              ))}
            </ul>

            <div className="mt-8">
              <button
                onClick={() => onReserve?.({ title, priceINR, image })}
                className="group flex items-center gap-3 rounded-full bg-foreground px-7 py-3.5 text-xs uppercase tracking-[0.3em] text-primary-foreground transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:shadow-[0_15px_40px_rgba(232,208,158,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                data-cursor
                data-cursor-label="BUY"
              >
                Reserve Machine
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </div>
          </motion.div>

          {/* Product image with cursor-controlled 3D tilt */}
          <div
            ref={imgContainerRef}
            className={`relative flex items-center justify-center ${align === "right" ? "md:order-1" : ""}`}
            style={{ perspective: "1200px" }}
            data-cursor
            data-cursor-label="3D"
          >
            {/* Glow orb */}
            <motion.div
              aria-hidden="true"
              style={{ scale: glowScale }}
              className="glow-orb absolute aspect-square w-[70%] animate-breathe rounded-full"
            />

            {/* Light sheen overlay */}
            <div
              aria-hidden="true"
              className="absolute inset-0 z-20 pointer-events-none rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.06)_0%,transparent_60%)]"
            />

            {/* Product image with combined scroll + cursor transforms and 100% seamless background blending */}
            <motion.img
              src={image}
              alt={title}
              width={width}
              height={height}
              loading="lazy"
              decoding="async"
              style={{
                scale,
                y,
                rotateY: useTransform(
                  [scrollRotateY, springCursorRotateY],
                  ([sr, cr]) => (sr as number) + (cr as number)
                ),
                rotateX: springCursorRotateX,
                opacity,
                mixBlendMode: "screen",
                WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 75%, transparent 98%)",
                maskImage: "radial-gradient(circle at 50% 50%, black 75%, transparent 98%)",
                transformPerspective: 1200,
              }}
              className="relative z-10 max-h-[62svh] w-auto max-w-full object-contain transform-gpu will-change-transform"
            />

            {/* Dynamic floor reflection */}
            <motion.div
              aria-hidden="true"
              className="absolute bottom-[-8%] left-1/2 w-[60%] h-[30%] -translate-x-1/2 rounded-full opacity-20 blur-[40px]"
              style={{
                background: `radial-gradient(ellipse, color-mix(in oklab, var(--accent) 30%, transparent), transparent 70%)`,
                rotateX: springCursorRotateX,
                rotateY: springCursorRotateY,
              }}
            />
          </div>
        </div>
      </div>
      <h3 id={`scene-${index}`} className="sr-only">
        {title}
      </h3>
    </section>
  );
}
