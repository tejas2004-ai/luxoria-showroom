import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function MonolithShowroomUI({
  onInquire,
}: {
  onInquire?: (productName: string) => void;
}) {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [activeSectionIndex, setActiveSectionIndex] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const pct = Math.max(0, Math.min(1, window.scrollY / totalScroll));
        setScrollPercent(pct);
        if (pct < 0.35) {
          setActiveSectionIndex(1);
        } else if (pct < 0.68) {
          setActiveSectionIndex(2);
        } else {
          setActiveSectionIndex(3);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative z-10 w-full text-[#F8FAFC]">
      {/* ========================================== */}
      {/* FIXED HEADS-UP-DISPLAY (HUD) OVERLAY      */}
      {/* ========================================== */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-12 backdrop-blur-xl bg-[#090A0F]/70 border-b border-white/10 shadow-lg">
        {/* Brand Mark */}
        <div className="flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#38BDF8] animate-pulse" />
          <span className="font-mono text-sm tracking-[0.4em] uppercase font-bold text-[#F8FAFC]">
            MONOLITH
          </span>
          <span className="hidden sm:inline-block text-[0.65rem] uppercase tracking-widest text-[#94A3B8] border-l border-white/10 pl-3 font-mono">
            3D WebGL Architecture
          </span>
        </div>

        {/* Section Counter HUD */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-3 text-xs font-mono text-[#94A3B8]">
            <span className={activeSectionIndex === 1 ? "text-[#38BDF8] font-bold" : ""}>01 ESPRESSO</span>
            <span>/</span>
            <span className={activeSectionIndex === 2 ? "text-[#38BDF8] font-bold" : ""}>02 OVEN</span>
            <span>/</span>
            <span className={activeSectionIndex === 3 ? "text-[#38BDF8] font-bold" : ""}>03 COLUMN</span>
          </div>

          <button
            onClick={() => onInquire?.(
              activeSectionIndex === 1
                ? "Monolith Espresso I"
                : activeSectionIndex === 2
                ? "Monolith Precision Oven II"
                : "Monolith Preservation Column III"
            )}
            className="rounded-full border border-[#38BDF8]/50 bg-[#38BDF8]/10 px-5 py-2 text-xs font-mono uppercase tracking-[0.25em] text-[#38BDF8] font-semibold transition-all duration-300 hover:bg-[#38BDF8] hover:text-[#090A0F] hover:shadow-[0_0_25px_rgba(56,189,248,0.4)]"
          >
            Inquire Preview
          </button>
        </div>
      </header>

      {/* FIXED SCROLL PROGRESS LINE (HUD LEFT) */}
      <div className="fixed left-6 top-1/3 bottom-1/3 z-40 hidden md:flex flex-col items-center justify-between w-px bg-white/10">
        <motion.div
          className="w-full bg-[#38BDF8] shadow-[0_0_12px_#38BDF8]"
          style={{ height: `${scrollPercent * 100}%` }}
        />
      </div>

      {/* FIXED SCROLL PERCENTAGE HUD (HUD RIGHT) */}
      <div className="fixed right-6 bottom-8 z-40 hidden sm:flex items-center gap-2 font-mono text-xs text-[#94A3B8] tracking-widest bg-[#090A0F]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 shadow-lg">
        <span>SCROLL</span>
        <span className="text-[#38BDF8] font-bold">{Math.round(scrollPercent * 100)}%</span>
      </div>

      {/* ========================================== */}
      {/* 3D SCROLL CONTINUUM SECTIONS (100dvh EACH) */}
      {/* ========================================== */}

      {/* ── SECTION 1: THE INTELLIGENT ESPRESSO STATION ── */}
      <section className="relative min-h-[100dvh] w-full flex items-center px-6 md:px-16 lg:px-24 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-[1600px] mx-auto items-center gap-12">
          {/* Content Panel (Left) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0 }}
            className="z-20 max-w-xl rounded-3xl border border-white/10 bg-[rgba(18,20,29,0.75)] backdrop-blur-2xl p-8 md:p-12 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs uppercase tracking-[0.35em] text-[#38BDF8] font-bold">
                [01] SCENARIO
              </span>
              <span className="h-px w-8 bg-white/20" />
              <span className="text-xs uppercase tracking-widest text-[#94A3B8] font-mono">
                THERMAL CORE
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-light text-[#F8FAFC] leading-none tracking-tight">
              Monolith Espresso I.
            </h1>

            <p className="mt-6 text-sm md:text-base leading-relaxed text-[#94A3B8]">
              Compound geometric chassis housing a dual-stage metallic boiler. As you scroll into the spotlight, the metallic outer housing shifts into an exploded view while the interior boiler cylinder illuminates with an emissive thermal glow.
            </p>

            {/* Specs Grid */}
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
              <div>
                <span className="block font-mono text-[0.65rem] uppercase tracking-widest text-[#94A3B8]">
                  Boiler Core
                </span>
                <span className="font-mono text-sm font-bold text-[#38BDF8]">
                  Emissive 4.0 Glow
                </span>
              </div>
              <div>
                <span className="block font-mono text-[0.65rem] uppercase tracking-widest text-[#94A3B8]">
                  Pressure Output
                </span>
                <span className="font-mono text-sm font-semibold text-[#F8FAFC]">
                  19 Bar Precision
                </span>
              </div>
            </div>
          </motion.div>

          {/* Spacer for 3D Canvas focus (Right) */}
          <div className="hidden md:block h-full min-h-[400px]" />
        </div>
      </section>

      {/* ── SECTION 2: THE MONOLITH PRECISION OVEN ── */}
      <section className="relative min-h-[100dvh] w-full flex items-center px-6 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-[1600px] mx-auto items-center gap-12">
          {/* Spacer for 3D Canvas focus (Left) */}
          <div className="hidden md:block h-full min-h-[400px]" />

          {/* Content Panel (Right) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0 }}
            className="z-20 max-w-xl rounded-3xl border border-white/10 bg-[rgba(18,20,29,0.75)] backdrop-blur-2xl p-8 md:p-12 shadow-2xl md:ml-auto"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs uppercase tracking-[0.35em] text-[#38BDF8] font-bold">
                [02] SCENARIO
              </span>
              <span className="h-px w-8 bg-white/20" />
              <span className="text-xs uppercase tracking-widest text-[#94A3B8] font-mono">
                SMOKED GLASS REVEAL
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-light text-[#F8FAFC] leading-none tracking-tight">
              Monolith Precision Oven II.
            </h2>

            <p className="mt-6 text-sm md:text-base leading-relaxed text-[#94A3B8]">
              Sleek cuboid chassis fitted with a smoked glass front door panel. As the section pins in center camera focus, the glass door material drops opacity down to 0.1, revealing glowing wireframe interior meshes spinning inside.
            </p>

            {/* Specs Grid */}
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
              <div>
                <span className="block font-mono text-[0.65rem] uppercase tracking-widest text-[#94A3B8]">
                  Front Panel
                </span>
                <span className="font-mono text-sm font-bold text-[#38BDF8]">
                  Smoked Glass (0.1 Opacity)
                </span>
              </div>
              <div>
                <span className="block font-mono text-[0.65rem] uppercase tracking-widest text-[#94A3B8]">
                  Interior Core
                </span>
                <span className="font-mono text-sm font-semibold text-[#F8FAFC]">
                  Spinning Wireframe
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 3: THE SMART CULINARY PRESERVATION COLUMN ── */}
      <section className="relative min-h-[100dvh] w-full flex items-center px-6 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-[1600px] mx-auto items-center gap-12">
          {/* Content Panel (Left) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0 }}
            className="z-20 max-w-xl rounded-3xl border border-white/10 bg-[rgba(18,20,29,0.75)] backdrop-blur-2xl p-8 md:p-12 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs uppercase tracking-[0.35em] text-[#38BDF8] font-bold">
                [03] SCENARIO
              </span>
              <span className="h-px w-8 bg-white/20" />
              <span className="text-xs uppercase tracking-widest text-[#94A3B8] font-mono">
                FRENCH DOOR PIVOT
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-light text-[#F8FAFC] leading-none tracking-tight">
              Monolith Preservation III.
            </h2>

            <p className="mt-6 text-sm md:text-base leading-relaxed text-[#94A3B8]">
              Tall vertical monolithic column with dual split French doors. Rises from the bottom viewport origin into crisp layout focus, where left and right door meshes physically pivot open along their hinges (-1.2 and +1.2 rotation.y).
            </p>

            {/* Specs Grid */}
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
              <div>
                <span className="block font-mono text-[0.65rem] uppercase tracking-widest text-[#94A3B8]">
                  Hinge Mechanism
                </span>
                <span className="font-mono text-sm font-bold text-[#38BDF8]">
                  Dual Pivot (±1.2 Rad)
                </span>
              </div>
              <div>
                <span className="block font-mono text-[0.65rem] uppercase tracking-widest text-[#94A3B8]">
                  Interior Vault
                </span>
                <span className="font-mono text-sm font-semibold text-[#F8FAFC]">
                  Refractive Glass Shelves
                </span>
              </div>
            </div>
          </motion.div>

          {/* Spacer for 3D Canvas focus (Right) */}
          <div className="hidden md:block h-full min-h-[400px]" />
        </div>
      </section>

      {/* FOOTER OVERLAY */}
      <footer className="relative z-20 flex flex-col sm:flex-row items-center justify-between gap-4 px-6 md:px-12 py-8 border-t border-white/10 bg-[#090A0F]/80 text-xs font-mono text-[#94A3B8] uppercase tracking-widest">
        <span>MONOLITH APPLIANCES MMXXVI</span>
        <span className="text-[#38BDF8] font-bold">Obsessive Craft & Three.js Engine</span>
      </footer>
    </div>
  );
}
