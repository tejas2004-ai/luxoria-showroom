import { useRef, useState } from "react";
import { motion } from "framer-motion";

type ProductItem = {
  id: string;
  index: string;
  category: string;
  name: string;
  tagline: string;
  priceINR: string;
  image: string;
  anchor: string;
  badge: string;
  specs: string[];
};

const topProducts: ProductItem[] = [
  {
    id: "prod-01",
    index: "01",
    category: "Preservation",
    name: "Samsung Side-by-Side Refrigerator",
    tagline: "Twin Cooling Plus & FlexZone Convertible",
    priceINR: "₹1,15,990",
    image: "/fridge.png",
    anchor: "#refrigeration",
    badge: "Bespoke Edition",
    specs: ["Twin Cooling Plus", "FlexZone 5-in-1", "Digital Inverter"],
  },
  {
    id: "prod-02",
    index: "02",
    category: "Climate",
    name: "Daikin Inverter Air Conditioner",
    tagline: "1.5 Ton 5-Star 3D Airflow Sensing",
    priceINR: "₹47,990",
    image: "/ac.png",
    anchor: "#climate",
    badge: "Kinetic Edition",
    specs: ["5-Star Inverter", "Intelligent Eye", "Dew Clean Tech"],
  },
  {
    id: "prod-03",
    index: "03",
    category: "Laundry",
    name: "LG Front Load Washing Machine",
    tagline: "AI Direct Drive & TurboWash 360°",
    priceINR: "₹44,990",
    image: "/washer.png",
    anchor: "#laundry",
    badge: "ThinQ AI Edition",
    specs: ["AI DD Motor", "TurboWash 360°", "Steam+ Allergy Care"],
  },
  {
    id: "prod-04",
    index: "04",
    category: "Culinary",
    name: "IFB Convection Microwave Oven",
    tagline: "30L Stainless Cavity & Oil-Free Crisp",
    priceINR: "₹18,490",
    image: "/microwave.png",
    anchor: "#culinary",
    badge: "Chef Edition",
    specs: ["30L Convection", "101 Auto-Cook", "Rotisserie Grill"],
  },
  {
    id: "prod-05",
    index: "05",
    category: "Kitchen Tech",
    name: "Philips Mixer Grinder",
    tagline: "750W Turbo Torque & PowerChop Tech",
    priceINR: "₹6,499",
    image: "/blender.png",
    anchor: "#kitchen",
    badge: "Avance Edition",
    specs: ["750W Turbo Motor", "PowerChop Tech", "Leak-Proof Jars"],
  },
  {
    id: "prod-06",
    index: "06",
    category: "Cinema",
    name: "Sony Bravia",
    tagline: "4K OLED Display & Cognitive Processor XR",
    priceINR: "₹2,19,990",
    image: "/tv.png",
    anchor: "#cinema",
    badge: "OLED XR Edition",
    specs: ["4K OLED Display", "Cognitive XR", "Acoustic Surface"],
  },
];

export function TopProductsShowcase({
  onReserveProduct,
}: {
  onReserveProduct?: (p: { title: string; priceINR: string; image: string }) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const categories = ["All", "Preservation", "Climate", "Laundry", "Culinary", "Cinema"];

  const filteredProducts = activeCategory === "All"
    ? topProducts
    : topProducts.filter((p) => p.category === activeCategory || (activeCategory === "Culinary" && (p.category === "Culinary" || p.category === "Kitchen Tech")));

  const scrollContainer = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    const scrollAmount = direction === "left" ? -380 : 380;
    containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section className="relative w-full border-y border-white/10 bg-gradient-to-b from-black/40 via-background to-black/60 py-16 px-4 md:px-12 overflow-hidden">
      {/* Background glow effects */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-full -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(232,208,158,0.12),transparent_70%)]"
      />

      <div className="mx-auto max-w-[1600px]">
        {/* Header section with title and quick category filters */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="h-2 w-2 rounded-full bg-accent animate-ping" />
              <span className="font-mono text-xs uppercase tracking-[0.35em] text-accent">
                Upper Suite Collection 2026
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-light text-gradient leading-tight">
              Explore The 6 Engineering Icons
            </h2>
          </div>

          {/* Category filter pills & Nav buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 glass rounded-full p-1 border border-white/10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-4 py-1.5 text-xs font-mono tracking-wider transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-accent text-accent-foreground shadow-[0_0_20px_rgba(232,208,158,0.4)]"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Scroll Control Arrows */}
            <div className="hidden sm:flex items-center gap-2 ml-2">
              <button
                onClick={() => scrollContainer("left")}
                aria-label="Scroll Left"
                className="flex h-10 w-10 items-center justify-center rounded-full glass border border-white/10 text-foreground transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:scale-110"
              >
                ←
              </button>
              <button
                onClick={() => scrollContainer("right")}
                aria-label="Scroll Right"
                className="flex h-10 w-10 items-center justify-center rounded-full glass border border-white/10 text-foreground transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:scale-110"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Products Scrollable Rail */}
        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto pb-8 pt-4 scrollbar-none snap-x snap-mandatory focus:outline-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onHoverStart={() => setHoveredId(product.id)}
              onHoverEnd={() => setHoveredId(null)}
              className="group relative flex w-[310px] md:w-[360px] shrink-0 snap-start flex-col justify-between rounded-3xl border border-white/10 bg-card/60 backdrop-blur-xl p-6 transition-all duration-500 hover:border-accent/50 hover:bg-card/90 hover:shadow-[0_30px_80px_-20px_rgba(232,208,158,0.25)]"
              style={{ perspective: "1000px" }}
            >
              {/* Glow orb inside card */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/10 blur-3xl transition-all duration-500 group-hover:bg-accent/25 group-hover:scale-125"
              />

              {/* Card Top: Index & Badge */}
              <div className="flex items-center justify-between z-10">
                <span className="font-mono text-sm tracking-widest text-accent font-semibold">
                  [{product.index}]
                </span>
                <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[0.65rem] uppercase tracking-widest text-accent font-mono">
                  {product.badge}
                </span>
              </div>

              {/* Product 3D Image with Floating Tilt */}
              <div className="relative my-6 flex h-48 md:h-56 items-center justify-center overflow-visible z-10">
                <motion.img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  animate={
                    hoveredId === product.id
                      ? { y: -12, scale: 1.12, rotateY: 10, rotateX: -5 }
                      : { y: 0, scale: 1, rotateY: 0, rotateX: 0 }
                  }
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                  style={{
                    mixBlendMode: "screen",
                    WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 82%, transparent 98%)",
                    maskImage: "radial-gradient(circle at 50% 50%, black 82%, transparent 98%)",
                  }}
                  className="max-h-full w-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]"
                />
              </div>

              {/* Card Content & Features */}
              <div className="z-10">
                <div className="text-xs uppercase tracking-widest text-muted-foreground font-mono mb-1">
                  {product.category}
                </div>
                <h3 className="text-xl font-light text-foreground group-hover:text-accent transition-colors duration-300 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-xs text-muted-foreground/80 mt-1 line-clamp-2 leading-relaxed">
                  {product.tagline}
                </p>

                {/* Feature Chips */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {product.specs.map((spec) => (
                    <span
                      key={spec}
                      className="rounded-md bg-white/5 border border-white/5 px-2 py-0.5 text-[0.65rem] text-foreground/75 font-mono"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Price & Action Buttons */}
                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                  <div>
                    <span className="text-[0.65rem] text-muted-foreground font-mono block uppercase tracking-wider">
                      Showroom Price
                    </span>
                    <span className="font-mono text-lg font-bold text-foreground group-hover:text-accent transition-colors">
                      {product.priceINR}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        onReserveProduct?.({
                          title: product.name,
                          priceINR: product.priceINR,
                          image: product.image,
                        })
                      }
                      className="rounded-full bg-accent px-4 py-2 text-xs font-mono uppercase tracking-wider text-accent-foreground font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(232,208,158,0.5)]"
                    >
                      Reserve
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scroll hint bar */}
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground font-mono">
          <span>← Drag or scroll horizontally →</span>
          <span className="text-accent">{topProducts.length} Premium Machines Available</span>
        </div>
      </div>
    </section>
  );
}
