import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const chapters = [
  { id: "scene-01", label: "01", title: "Samsung Refrigerator" },
  { id: "scene-02", label: "02", title: "Daikin AC" },
  { id: "scene-03", label: "03", title: "LG Washing Machine" },
  { id: "scene-04", label: "04", title: "IFB Microwave" },
  { id: "scene-05", label: "05", title: "Philips Mixer" },
  { id: "scene-06", label: "06", title: "Sony Bravia" },
  { id: "ecosystem", label: "07", title: "Ecosystem" },
];

export function ChapterNav() {
  const [activeChapter, setActiveChapter] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 400);

      // Determine active section based on scroll position
      const sections = chapters.map((ch) => document.getElementById(ch.id));
      const viewportMiddle = window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec) {
          const rect = sec.getBoundingClientRect();
          if (rect.top <= viewportMiddle && rect.bottom >= 0) {
            setActiveChapter(i);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.4 }}
          aria-label="Chapter Navigation"
          className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex"
        >
          {chapters.map((ch, idx) => {
            const isActive = activeChapter === idx;
            return (
              <button
                key={ch.id}
                onClick={() => scrollToSection(ch.id)}
                className="group relative flex items-center gap-3 py-1 focus-visible:outline-none"
                data-cursor
                data-cursor-label={ch.label}
              >
                {/* Tooltip Label */}
                <span className="pointer-events-none opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 font-mono text-[0.65rem] uppercase tracking-widest text-accent glass px-2.5 py-1 rounded-full whitespace-nowrap">
                  {ch.title}
                </span>

                {/* Dot / Indicator Bar */}
                <div className="relative flex items-center justify-center">
                  <motion.div
                    animate={{
                      width: isActive ? 24 : 8,
                      height: isActive ? 8 : 8,
                      backgroundColor: isActive ? "var(--accent)" : "rgba(255, 255, 255, 0.2)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="rounded-full transition-colors duration-300 group-hover:bg-accent/80"
                  />
                  {isActive && (
                    <motion.div
                      layoutId="activeGlow"
                      className="absolute inset-0 rounded-full bg-accent/30 blur-sm"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </div>
              </button>
            );
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
