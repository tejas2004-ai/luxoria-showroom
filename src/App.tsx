import { useState } from "react";
import { SmoothScroll } from "./components/SmoothScroll";
import { CustomCursor } from "./components/CustomCursor";
import { ScrollProgress, SiteNav } from "./components/SiteChrome";
import { Hero } from "./components/Hero";
import { ProductScene } from "./components/ProductScene";
import { Ecosystem } from "./components/Ecosystem";
import { Finale } from "./components/Finale";
import { ReserveModal, type ProductSelection } from "./components/ReserveModal";
import { useTransform, type MotionValue } from "framer-motion";
import { motion } from "framer-motion";

/* ─── product data ─── */
const scenes = [
  {
    index: "01",
    eyebrow: "Samsung Preservation",
    title: "Samsung Side-by-Side Refrigerator.",
    copy: "Convertible 5-in-1 FlexZone cooling with Twin Cooling Plus technology. Maintains optimal humidity to keep food fresh up to twice as long.",
    features: ["Twin Cooling Plus", "FlexZone Convertible", "Digital Inverter", "SmartThings AI"],
    image: "/fridge.png",
    width: 600,
    height: 900,
    tone: "frost" as const,
    priceINR: "₹1,15,990",
    priceUSD: "$1,390",
    brandEdition: "Samsung Bespoke Edition",
    warranty: "20-Yr Digital Inverter Warranty",
    wash: "radial-gradient(80% 65% at 50% 50%, color-mix(in oklab, var(--frost) 12%, transparent), transparent 70%)",
    align: "left" as const,
    rotate: 8,
  },
  {
    index: "02",
    eyebrow: "Daikin Climate",
    title: "Daikin Inverter Air Conditioner.",
    copy: "Streamline 1.5 Ton 5-Star cooling performance engineered for extreme heat. Intelligent Eye 3D airflow sensing and Dew Clean self-cleaning technology.",
    features: ["5-Star Inverter", "Intelligent Eye", "Dew Clean Tech", "100% Copper"],
    image: "/ac.png",
    width: 700,
    height: 600,
    tone: "cyan" as const,
    priceINR: "₹47,990",
    priceUSD: "$580",
    brandEdition: "Daikin Kinetic Edition",
    warranty: "10-Yr Compressor Warranty",
    wash: "radial-gradient(80% 65% at 50% 50%, color-mix(in oklab, var(--accent) 12%, transparent), transparent 70%)",
    align: "right" as const,
    rotate: -8,
  },
  {
    index: "03",
    eyebrow: "LG Fabric Care",
    title: "LG Front Load Washing Machine.",
    copy: "AI DD direct drive technology senses weight and fabric softness to optimize wash motions automatically. TurboWash 360° completes cycles in 39 minutes.",
    features: ["AI DD Motor", "TurboWash 360°", "Steam+ Allergy Care", "ThinQ Wi-Fi"],
    image: "/washer.png",
    width: 600,
    height: 800,
    tone: "frost" as const,
    priceINR: "₹44,990",
    priceUSD: "$540",
    brandEdition: "LG ThinQ Edition",
    warranty: "10-Yr Direct Drive Warranty",
    wash: "radial-gradient(80% 65% at 50% 50%, color-mix(in oklab, var(--silver) 12%, transparent), transparent 70%)",
    align: "left" as const,
    rotate: 6,
  },
  {
    index: "04",
    eyebrow: "IFB Thermal Care",
    title: "IFB Convection Microwave Oven.",
    copy: "30L capacity convection oven with 101 auto-cook menus. Multi-stage cooking with motorized rotisserie and oil-free crisp frying.",
    features: ["30L Convection", "101 Auto-Cook", "Oil-Free Crisp", "Rotisserie Grill"],
    image: "/microwave.png",
    width: 700,
    height: 550,
    tone: "ember" as const,
    priceINR: "₹18,490",
    priceUSD: "$220",
    brandEdition: "IFB Culinary Edition",
    warranty: "3-Yr Super Warranty",
    wash: "radial-gradient(80% 65% at 50% 50%, color-mix(in oklab, var(--gold) 12%, transparent), transparent 70%)",
    align: "right" as const,
    rotate: -6,
  },
  {
    index: "05",
    eyebrow: "Philips Extraction",
    title: "Philips Mixer Grinder.",
    copy: "750W Turbo torque motor with PowerChop technology. Heavy-duty leak-proof stainless steel jars engineered for tough Indian spice grinding.",
    features: ["750W Turbo Motor", "PowerChop Tech", "3 Leak-Proof Jars", "Pulse Control"],
    image: "/blender.png",
    width: 500,
    height: 800,
    tone: "cyan" as const,
    priceINR: "₹6,499",
    priceUSD: "$78",
    brandEdition: "Philips Avance Edition",
    warranty: "5-Yr Motor Warranty",
    wash: "radial-gradient(80% 65% at 50% 50%, color-mix(in oklab, var(--accent) 10%, transparent), transparent 70%)",
    align: "left" as const,
    rotate: 10,
  },
  {
    index: "06",
    eyebrow: "Sony Display",
    title: "Sony Bravia.",
    copy: "XR Cognitive Processor 4K OLED display with Acoustic Surface Audio+. Self-lit sub-pixels deliver reference-grade contrast and immersive cinema sound.",
    features: ["4K OLED Display", "Cognitive XR", "Acoustic Surface", "Dolby Vision IQ"],
    image: "/tv.png",
    width: 900,
    height: 550,
    tone: "neutral" as const,
    priceINR: "₹2,19,990",
    priceUSD: "$2,640",
    brandEdition: "Sony BRAVIA XR Edition",
    warranty: "3-Yr Panel Care",
    wash: "radial-gradient(80% 65% at 50% 50%, color-mix(in oklab, var(--graphite) 14%, transparent), transparent 70%)",
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
  { src: "/fridge.png", label: "Samsung Side-by-Side Refrigerator", price: "₹1,15,990", w: 400, h: 600 },
  { src: "/ac.png", label: "Daikin Inverter Air Conditioner", price: "₹47,990", w: 500, h: 400 },
  { src: "/washer.png", label: "LG Front Load Washing Machine", price: "₹44,990", w: 400, h: 550 },
  { src: "/microwave.png", label: "IFB Convection Microwave Oven", price: "₹18,490", w: 500, h: 380 },
  { src: "/blender.png", label: "Philips Mixer Grinder", price: "₹6,499", w: 300, h: 550 },
  { src: "/tv.png", label: "Sony Bravia", price: "₹2,19,990", w: 600, h: 380 },
];

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductSelection | null>(null);

  const handleOpenReserve = (product?: ProductSelection) => {
    setSelectedProduct(product || null);
    setIsModalOpen(true);
  };

  return (
    <SmoothScroll>
      <CustomCursor />
      <ScrollProgress />
      <SiteNav onOpenReserve={() => handleOpenReserve()} />
      <main className="relative">
        <Hero />
        {scenes.map((scene) => (
          <ProductScene
            key={scene.index}
            {...scene}
            onReserve={(product) => handleOpenReserve(product)}
          />
        ))}
        <Ecosystem items={ecosystemItems} />
        <Finale onOpenReserve={() => handleOpenReserve()} />
      </main>
      <ReserveModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialProduct={selectedProduct}
      />
    </SmoothScroll>
  );
}
