import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left"
      data-cursor
    >
      <div className="h-full w-full bg-gradient-to-r from-accent via-frost to-accent" />
      <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-accent via-frost to-accent blur-sm opacity-60" />
    </motion.div>
  );
}

export function SiteNav({ onOpenReserve }: { onOpenReserve?: () => void }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-6 md:px-14">
      <a
        href="#top"
        className="font-display text-sm font-semibold tracking-[0.42em] text-foreground"
        data-cursor
        data-cursor-label="HOME"
      >
        LUXORIA
      </a>
      <button
        onClick={onOpenReserve}
        className="glass rounded-full px-5 py-2.5 text-[0.65rem] uppercase tracking-[0.3em] text-foreground transition-all duration-300 hover:bg-foreground/12 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        data-cursor
        data-cursor-label="ENQUIRE"
      >
        Enquire
      </button>
    </header>
  );
}
