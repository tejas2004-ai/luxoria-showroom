import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "../components/Hero";
import { ProductScene } from "../components/ProductScene";
import { Ecosystem } from "../components/Ecosystem";
import { Finale } from "../components/Finale";
import { motion, useTransform, type MotionValue } from "framer-motion";

/* ─── product data ─── */
const scenes = [
  {
    index: "01",
    eyebrow: "Refrigeration",
    title: "Cold, perfected.",
    copy: "Twin-compressor precision keeps every shelf within 0.3 °C. A vacuum-insulated shell preserves quiet as it preserves freshness.",
    features: ["Dual Inverter", "Vacuum Core", "Frost-Free AI", "Zero-Gap Hinge"],
    image: "/fridge.png",
    width: 600,
    height: 900,
    tone: "frost" as const,
    wash: "radial-gradient(80% 65% at 50% 50%, color-mix(in oklab, var(--frost) 10%, transparent), transparent 70%)",
    align: "left" as const,
    rotate: 8,
  },
  {
    index: "02",
    eyebrow: "Climate",
    title: "Air that adapts.",
    copy: "Reads the room 400 times per second. Four-way micro-vane diffusion delivers airflow you feel but never hear.",
    features: ["Whisper Mode", "4-Way Vane", "Plasma Filter", "Room Sense AI"],
    image: "/ac.png",
    width: 700,
    height: 600,
    tone: "cyan" as const,
    wash: "radial-gradient(80% 65% at 50% 50%, color-mix(in oklab, var(--accent) 10%, transparent), transparent 70%)",
    align: "right" as const,
    rotate: -8,
  },
  {
    index: "03",
    eyebrow: "Laundry",
    title: "Fabric intelligence.",
    copy: "Twelve-axis drum motion adapts to every textile. Steam-refresh cycles restore garments without detergent.",
    features: ["Steam Refresh", "12-Axis Drum", "Auto-Dose", "Silk Care"],
    image: "/washer.png",
    width: 600,
    height: 800,
    tone: "frost" as const,
    wash: "radial-gradient(80% 65% at 50% 50%, color-mix(in oklab, var(--silver) 10%, transparent), transparent 70%)",
    align: "left" as const,
    rotate: 6,
  },
  {
    index: "04",
    eyebrow: "Cooking",
    title: "Heat, reimagined.",
    copy: "A ceramic inverter cavity distributes microwaves in 3D patterns. Sensor steam technology reads moisture in real time.",
    features: ["3D Wave", "Ceramic Cavity", "Steam Sense", "Zero-Bezel"],
    image: "/microwave.png",
    width: 700,
    height: 550,
    tone: "ember" as const,
    wash: "radial-gradient(80% 65% at 50% 50%, color-mix(in oklab, var(--gold) 10%, transparent), transparent 70%)",
    align: "right" as const,
    rotate: -6,
  },
  {
    index: "05",
    eyebrow: "Blending",
    title: "Power, silent.",
    copy: "Sound-dampened vortex motor produces 42,000 RPM inside a vacuum-sealed jar. Nutrition stays intact; noise doesn't escape.",
    features: ["Vacuum Blend", "42K RPM", "Sound Shield", "Self-Clean"],
    image: "/blender.png",
    width: 500,
    height: 800,
    tone: "cyan" as const,
    wash: "radial-gradient(80% 65% at 50% 50%, color-mix(in oklab, var(--accent) 8%, transparent), transparent 70%)",
    align: "left" as const,
    rotate: 10,
  },
  {
    index: "06",
    eyebrow: "Display",
    title: "Vision, immersive.",
    copy: "Micro-LED backlighting with infinite contrast. AI upscaling redraws every frame in real time to cinematic fidelity.",
    features: ["Micro-LED", "∞ Contrast", "AI Upscale", "Dolby Vision IQ"],
    image: "/tv.png",
    width: 900,
    height: 550,
    tone: "neutral" as const,
    wash: "radial-gradient(80% 65% at 50% 50%, color-mix(in oklab, var(--graphite) 12%, transparent), transparent 70%)",
    align: "right" as const,
    rotate: -5,
    atmosphere: ({ progress }: { progress: MotionValue<number> }) => {
      const scanlineOpacity = useTransform(progress, [0.3, 0.5, 0.7], [0, 0.04, 0]);
      return (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: scanlineOpacity,
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.03) 3px, rgba(255,255,255,0.03) 4px)",
          }}
        />
      );
    },
  },
];

const ecosystemItems = [
  { src: "/fridge.png", label: "Refrigerator", w: 400, h: 600 },
  { src: "/ac.png", label: "Air Conditioner", w: 500, h: 400 },
  { src: "/washer.png", label: "Washer", w: 400, h: 550 },
  { src: "/microwave.png", label: "Microwave", w: 500, h: 380 },
  { src: "/blender.png", label: "Blender", w: 300, h: 550 },
  { src: "/tv.png", label: "Display", w: 600, h: 380 },
];

function HomePage() {
  return (
    <main className="relative">
      <Hero />

      {scenes.map((scene) => (
        <ProductScene key={scene.index} {...scene} />
      ))}

      <Ecosystem items={ecosystemItems} />

      <Finale />
    </main>
  );
}

export const Route = createFileRoute("/")({
  component: HomePage,
});
