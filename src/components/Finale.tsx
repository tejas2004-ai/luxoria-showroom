import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Particles } from "./Particles";
import { RevealText } from "./RevealText";

export function Finale({ onOpenReserve }: { onOpenReserve?: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });

  const sectionY = useTransform(scrollYProgress, [0, 0.5], [60, 0]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.3], [0.4, 1]);
  const sectionScale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
  const sectionRotateX = useTransform(scrollYProgress, [0, 0.5], [6, 0]);

  return (
    <section
      ref={ref}
      id="finale"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 100%, color-mix(in oklab, var(--gold) 16%, transparent), transparent 70%)",
        }}
      />
      <Particles tone="ember" count={26} />

      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.span
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8 text-[0.65rem] uppercase tracking-[0.42em] text-muted-foreground"
        >
          The collection
        </motion.span>
        <RevealText
          as="h2"
          text="Live with better machines."
          className="max-w-4xl text-[clamp(2.5rem,7vw,6rem)] font-semibold leading-[0.92] text-gradient"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 max-w-sm text-sm leading-relaxed text-muted-foreground"
        >
          Private previews open this season. Reserve a walkthrough of the full Luxoria suite.
        </motion.p>
        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <motion.button
            onClick={onOpenReserve}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full bg-foreground px-8 py-4 text-xs uppercase tracking-[0.3em] text-primary-foreground transition-all duration-300 hover:shadow-[0_20px_60px_-10px_rgba(255,255,255,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            data-cursor
            data-cursor-label="BOOK"
          >
            Reserve a preview
          </motion.button>
          <motion.a
            href="#top"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="glass rounded-full px-8 py-4 text-xs uppercase tracking-[0.3em] text-foreground transition-colors hover:bg-foreground/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            data-cursor
            data-cursor-label="TOP"
          >
            Replay the tour
          </motion.a>
        </div>
      </motion.div>

      <motion.footer
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative z-10 mt-24 flex w-full max-w-[1600px] flex-col items-center justify-between gap-4 border-t border-border pt-8 text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground sm:flex-row"
      >
        <span>Luxoria Appliances</span>
        <span>Designed for the quiet home</span>
      </motion.footer>
    </section>
  );
}
