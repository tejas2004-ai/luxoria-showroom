import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Particles } from "./Particles";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const gridScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.8], [0.5, 0]);

  // Cursor-driven parallax for the entire hero
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springMouseX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springMouseY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const bgX = useTransform(springMouseX, [-0.5, 0.5], ["-12px", "12px"]);
  const bgY = useTransform(springMouseY, [-0.5, 0.5], ["-12px", "12px"]);
  const gridRotateX = useTransform(springMouseY, [-0.5, 0.5], [3, -3]);
  const gridRotateY = useTransform(springMouseX, [-0.5, 0.5], [-3, 3]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <section ref={ref} className="relative h-[180svh] w-full" id="top">
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center overflow-hidden" style={{ perspective: "1200px" }}>
        {/* Gradient background with cursor parallax */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background: "var(--gradient-hero)",
            x: bgX,
            y: bgY,
          }}
        />

        {/* Clean grid background overlay */}
        <motion.div
          aria-hidden="true"
          style={{
            scale: gridScale,
            opacity: gridOpacity,
            backgroundImage:
              "linear-gradient(to right, rgba(227, 208, 234, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(227, 208, 234, 0.06) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(70% 55% at 50% 45%, black, transparent)",
          }}
          className="absolute inset-0 will-change-transform"
        />

        {/* Atmospheric glow orbs */}
        <motion.div
          aria-hidden="true"
          className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
          style={{
            background: "radial-gradient(circle, var(--accent), transparent 70%)",
            x: useTransform(springMouseX, [-0.5, 0.5], ["60px", "-60px"]),
            y: useTransform(springMouseY, [-0.5, 0.5], ["40px", "-40px"]),
          }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-10 blur-[100px]"
          style={{
            background: "radial-gradient(circle, var(--frost), transparent 70%)",
            x: useTransform(springMouseX, [-0.5, 0.5], ["-40px", "40px"]),
            y: useTransform(springMouseY, [-0.5, 0.5], ["-30px", "30px"]),
          }}
        />

        <Particles tone="frost" count={50} />

        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="relative z-10 flex flex-col items-center px-6 text-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="glass mb-8 rounded-full px-5 py-2.5 text-[0.65rem] uppercase tracking-[0.42em] text-muted-foreground"
          >
            Luxoria — Appliance Collection MMXXVI
          </motion.span>

          <h1 className="max-w-5xl text-[clamp(3.5rem,11vw,9.5rem)] font-light leading-[0.88] tracking-tight">
            {["The", "Home,", "Engineered"].map((word, i) => (
              <span key={word} className="block overflow-hidden">
                <motion.span
                  initial={{ y: "115%", opacity: 0, rotateX: 45 }}
                  animate={{ y: "0%", opacity: 1, rotateX: 0 }}
                  transition={{
                    duration: 1.3,
                    delay: 0.25 + i * 0.13,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`inline-block will-change-transform ${i === 2 ? "text-gradient" : ""}`}
                  style={{ transformPerspective: 600 }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-9 max-w-md text-sm leading-relaxed tracking-wide text-muted-foreground md:text-base"
          >
            Seven appliances. One obsessive standard of craft. Scroll to enter the showroom.
          </motion.p>

          <motion.a
            href="#refrigeration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="group mt-14 flex flex-col items-center gap-3 text-[0.6rem] uppercase tracking-[0.4em] text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
            data-cursor
            data-cursor-label="SCROLL"
          >
            Scroll
            <span className="relative h-14 w-px overflow-hidden bg-border">
              <span className="absolute inset-x-0 top-0 h-6 animate-breathe bg-accent" />
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
