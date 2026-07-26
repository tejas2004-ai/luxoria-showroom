import { useRef, useEffect, type ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, type MotionValue } from "framer-motion";
import { Particles } from "./Particles";
import { RevealText, type RevealVariant } from "./RevealText";

export type ImageTransition = "float" | "zoom" | "slideUp" | "slideLeft" | "slideRight" | "spin";

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
  revealVariant?: RevealVariant;
  imageTransition?: ImageTransition;
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
  revealVariant = "rise",
  imageTransition = "float",
  onReserve,
}: SceneProps) {
  const ref = useRef<HTMLElement>(null);
  const imgContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const progress = scrollYProgress; // Direct scroll progress for zero frame lag

  // Antigravity Core Mechanics Configuration
  // Ease function: cubic-bezier(0.25, 1, 0.5, 1)
  const easeFn = [0.25, 1, 0.5, 1] as const;

  // Multi-layered Parallax Depth
  // Ambient lighting texture speed: 0.2
  const ambientLightY = useTransform(progress, [0, 1], ["20%", "-20%"]);
  // Main appliance asset speed: 0.8 (Scale 0.95 -> 1.0, Y: 100 -> 0 -> -100)
  const scale = useTransform(progress, [0, 0.4, 0.7, 1], [0.95, 1.0, 1.0, 0.95]);
  const y = useTransform(progress, [0, 0.35, 0.7, 1], ["100px", "0px", "0px", "-100px"]);
  // Spotlight center 3D rotation: rotateY -15deg -> 0deg -> 15deg
  const scrollRotateY = useTransform(progress, [0.2, 0.45, 0.7, 0.9], [-15, 0, 0, 15]);
  // Floating feature callouts subtle parallax drift (prevents content overlap)
  const featureCalloutY = useTransform(progress, [0, 1], ["12px", "-12px"]);

  const opacity = useTransform(progress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
  const washOpacity = useTransform(progress, [0, 0.35, 0.7, 1], [0, 1, 1, 0]);
  const glowScale = useTransform(progress, [0, 0.5, 1], [0.7, 1.15, 0.8]);

  // Apple-style scroll upward reveal for text block
  const textY = useTransform(progress, [0, 0.3, 0.75, 1], [50, 0, 0, -50]);
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

  // Deep background parallax watermark digits rising upward seamlessly with product
  const watermarkY = useTransform(progress, [0, 0.35, 0.7, 1], ["140px", "0px", "0px", "-140px"]);
  const watermarkOpacity = useTransform(progress, [0.05, 0.3, 0.75, 0.95], [0, 0.12, 0.12, 0]);
  const watermarkScale = useTransform(progress, [0, 0.35, 0.7, 1], [0.85, 1.0, 1.0, 1.12]);

  // Unique image entrance animations per product
  const imageTransitions: Record<ImageTransition, { initial: object; animate: object; transition: object }> = {
    float: {
      initial: { opacity: 0, y: 80, scale: 0.9 },
      animate: { opacity: 1, y: 0, scale: 1 },
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    },
    zoom: {
      initial: { opacity: 0, scale: 0.5, filter: "blur(20px)" },
      animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
      transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
    },
    slideUp: {
      initial: { opacity: 0, y: 120, rotateX: 15 },
      animate: { opacity: 1, y: 0, rotateX: 0 },
      transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
    },
    slideLeft: {
      initial: { opacity: 0, x: 120, rotateY: -15 },
      animate: { opacity: 1, x: 0, rotateY: 0 },
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    },
    slideRight: {
      initial: { opacity: 0, x: -120, rotateY: 15 },
      animate: { opacity: 1, x: 0, rotateY: 0 },
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    },
    spin: {
      initial: { opacity: 0, rotate: -20, scale: 0.7, filter: "blur(12px)" },
      animate: { opacity: 1, rotate: 0, scale: 1, filter: "blur(0px)" },
      transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
    },
  };
  const imgAnim = imageTransitions[imageTransition];

  return (
    <section
      ref={ref}
      id={`scene-${index}`}
      aria-labelledby={`scene-heading-${index}`}
      className="relative min-h-[220svh] w-full"
    >
      {/* Ambient background lighting texture (speed: 0.2) */}
      <motion.div
        aria-hidden="true"
        style={{ opacity: washOpacity, background: wash, y: ambientLightY }}
        className="pointer-events-none absolute inset-0 transform-gpu will-change-transform"
      />


      <div className="sticky top-0 flex h-svh w-full items-center overflow-hidden z-10" style={{ perspective: "1400px" }}>
        <Particles tone={tone} count={30} />
        {atmosphere?.({ progress })}

        {/* Narrative Chapter Connecting Thread */}
        <div aria-hidden="true" className="absolute left-6 md:left-14 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent hidden md:block">
          <motion.div
            className="w-full bg-accent"
            style={{
              height: useTransform(progress, [0, 1], ["0%", "100%"]),
            }}
          />
        </div>

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
              <span className="font-mono text-xs tracking-[0.35em] text-accent font-semibold">
                CHAPTER {index} / 06
              </span>
              <span className="h-px w-8 bg-border" />
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {eyebrow}
              </span>
              <span className="ml-auto rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[0.65rem] uppercase tracking-widest text-accent font-mono">
                {brandEdition}
              </span>
            </div>

            <RevealText
              as="h2"
              text={title}
              variant={revealVariant}
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

            {/* Floating feature callouts (speed: 1.2 parallax depth) */}
            <motion.ul
              style={{ y: featureCalloutY }}
              className="mt-6 flex flex-wrap gap-2.5 transform-gpu will-change-transform"
            >
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
            </motion.ul>

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

          {/* Product image with cursor-controlled 3D tilt + unique entrance */}
          <motion.div
            ref={imgContainerRef}
            className={`relative flex items-center justify-center ${align === "right" ? "md:order-1" : ""}`}
            style={{ perspective: "1200px" }}
            initial={imgAnim.initial}
            whileInView={imgAnim.animate}
            viewport={{ once: true, amount: 0.15 }}
            transition={imgAnim.transition}
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
                filter: "drop-shadow(0 35px 70px rgba(0,0,0,0.75))",
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
          </motion.div>
        </div>

        {/* Scroll Storytelling Guide Bottom Right */}
        <div aria-hidden="true" className="absolute bottom-6 right-6 md:right-14 z-20 hidden sm:flex items-center gap-2 font-mono text-[0.65rem] tracking-widest text-muted-foreground/70 uppercase">
          <span>Scroll to explore</span>
          <span className="text-accent animate-bounce">↓</span>
        </div>
      </div>
      <h3 id={`scene-${index}`} className="sr-only">
        {title}
      </h3>
    </section>
  );
}
