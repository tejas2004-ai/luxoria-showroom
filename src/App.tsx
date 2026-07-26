import { useState } from "react";
import { SmoothScroll } from "./components/SmoothScroll";
import { CustomCursor } from "./components/CustomCursor";
import { ScrollProgress, SiteNav } from "./components/SiteChrome";
import { ChapterNav } from "./components/ChapterNav";
import { Hero } from "./components/Hero";
import { ProductScene, type ImageTransition } from "./components/ProductScene";
import { type RevealVariant } from "./components/RevealText";
import { TopProductsShowcase } from "./components/TopProductsShowcase";
import { Ecosystem } from "./components/Ecosystem";
import { Finale } from "./components/Finale";
import { ReserveModal, type ProductSelection } from "./components/ReserveModal";
import { MonolithCanvas3D } from "./components/MonolithCanvas3D";
import { MonolithShowroomUI } from "./components/MonolithShowroomUI";

/* ─── 6 real appliance scenes data ─── */
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
    revealVariant: "rise" as RevealVariant,
    imageTransition: "float" as ImageTransition,
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
    revealVariant: "slideLeft" as RevealVariant,
    imageTransition: "slideRight" as ImageTransition,
  },
  {
    index: "03",
    eyebrow: "LG Fabric Care",
    title: "LG Front Load Washing Machine.",
    copy: "AI Direct Drive intelligent fabric protection with TurboWash 360° deep cleaning and Steam+ allergy reduction in under 39 minutes.",
    features: ["AI DD Motor", "TurboWash 360°", "Steam+ Allergy Care", "ThinQ Wi-Fi"],
    image: "/washer.png",
    width: 600,
    height: 800,
    tone: "neutral" as const,
    priceINR: "₹44,990",
    priceUSD: "$540",
    brandEdition: "LG ThinQ Edition",
    warranty: "10-Yr Motor Warranty",
    wash: "radial-gradient(80% 65% at 50% 50%, color-mix(in oklab, var(--silver) 10%, transparent), transparent 70%)",
    align: "left" as const,
    rotate: 6,
    revealVariant: "rotateIn" as RevealVariant,
    imageTransition: "spin" as ImageTransition,
  },
  {
    index: "04",
    eyebrow: "IFB Culinary Precision",
    title: "IFB Convection Microwave Oven.",
    copy: "30L Stainless Steel cavity with 101 Auto-Cook menus and oil-free crisping technology for precision culinary perfection.",
    features: ["30L Convection", "101 Auto-Cook", "Oil-Free Crisp", "Rotisserie Grill"],
    image: "/microwave.png",
    width: 700,
    height: 550,
    tone: "ember" as const,
    priceINR: "₹18,490",
    priceUSD: "$220",
    brandEdition: "IFB Culinary Edition",
    warranty: "3-Yr Super Warranty",
    wash: "radial-gradient(80% 65% at 50% 50%, color-mix(in oklab, var(--gold) 14%, transparent), transparent 70%)",
    align: "right" as const,
    rotate: -6,
    revealVariant: "scaleUp" as RevealVariant,
    imageTransition: "zoom" as ImageTransition,
  },
  {
    index: "05",
    eyebrow: "Philips Culinary Power",
    title: "Philips Mixer Grinder.",
    copy: "750W Turbo torque motor with PowerChop technology and leak-proof stainless steel jars for velvety smooth grinds.",
    features: ["750W Turbo Motor", "PowerChop Tech", "3 Leak-Proof Jars", "Pulse Control"],
    image: "/blender.png",
    width: 450,
    height: 750,
    tone: "ember" as const,
    priceINR: "₹6,499",
    priceUSD: "$78",
    brandEdition: "Philips Avance Edition",
    warranty: "5-Yr Motor Warranty",
    wash: "radial-gradient(80% 65% at 50% 50%, color-mix(in oklab, var(--accent) 12%, transparent), transparent 70%)",
    align: "left" as const,
    rotate: 8,
    revealVariant: "slideRight" as RevealVariant,
    imageTransition: "slideUp" as ImageTransition,
  },
  {
    index: "06",
    eyebrow: "Sony BRAVIA Cinema",
    title: "Sony Bravia.",
    copy: "4K HDR OLED powered by Cognitive Processor XR™. Deep pure blacks, vibrant realistic contrast, and Acoustic Surface Audio+.",
    features: ["4K OLED Display", "Cognitive XR", "Acoustic Surface", "Dolby Vision IQ"],
    image: "/tv.png",
    width: 800,
    height: 500,
    tone: "cyan" as const,
    priceINR: "₹2,19,990",
    priceUSD: "$2,640",
    brandEdition: "Sony BRAVIA XR Edition",
    warranty: "3-Yr Panel Warranty",
    wash: "radial-gradient(80% 65% at 50% 50%, color-mix(in oklab, var(--frost) 14%, transparent), transparent 70%)",
    align: "right" as const,
    rotate: -8,
    revealVariant: "cinematic" as RevealVariant,
    imageTransition: "slideLeft" as ImageTransition,
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
  const [activeTab, setActiveTab] = useState<"3D_WEBGL" | "SHOWROOM">("3D_WEBGL");

  const handleOpenReserve = (product?: ProductSelection) => {
    setSelectedProduct(product || null);
    setIsModalOpen(true);
  };

  return (
    <SmoothScroll>
      <CustomCursor />
      <ScrollProgress />
      <ChapterNav />
      <SiteNav onOpenReserve={() => handleOpenReserve()} />

      {/* Mode Switcher HUD Bar */}
      <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2 glass rounded-full p-1.5 border border-white/10 shadow-2xl">
        <button
          onClick={() => setActiveTab("3D_WEBGL")}
          className={`rounded-full px-4 py-1.5 text-xs font-mono tracking-wider transition-all duration-300 ${
            activeTab === "3D_WEBGL"
              ? "bg-[#D4AF37] text-black font-bold shadow-[0_0_20px_rgba(212,175,55,0.5)]"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          MONOLITH 3D WebGL
        </button>
        <button
          onClick={() => setActiveTab("SHOWROOM")}
          className={`rounded-full px-4 py-1.5 text-xs font-mono tracking-wider transition-all duration-300 ${
            activeTab === "SHOWROOM"
              ? "bg-[#D4AF37] text-black font-bold shadow-[0_0_20px_rgba(212,175,55,0.5)]"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Full Showroom
        </button>
      </div>

      <main className="relative">
        {activeTab === "3D_WEBGL" ? (
          <>
            {/* Real Three.js WebGL 3D Canvas Background Engine */}
            <MonolithCanvas3D />
            {/* Glassmorphic Minimalist HUD & Split UI Sections */}
            <MonolithShowroomUI
              onInquire={(prodName) =>
                handleOpenReserve({ title: prodName, priceINR: "Inquire Concierge", image: "/fridge.png" })
              }
            />
          </>
        ) : (
          <>
            <Hero />
            <TopProductsShowcase onReserveProduct={(product) => handleOpenReserve(product)} />
            {scenes.map((scene) => (
              <ProductScene
                key={scene.index}
                {...scene}
                onReserve={(product) => handleOpenReserve(product)}
              />
            ))}
            <Ecosystem
              items={ecosystemItems}
              onReserveItem={(product) => handleOpenReserve(product)}
            />
            <Finale onOpenReserve={() => handleOpenReserve()} />
          </>
        )}
      </main>

      <ReserveModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialProduct={selectedProduct}
      />
    </SmoothScroll>
  );
}
