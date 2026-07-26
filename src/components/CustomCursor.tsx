import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

/**
 * CustomCursor — A true Apple-style magnetic cursor.
 * When hovering over interactive elements (buttons, links, or elements with `data-magnetic`),
 * the cursor smoothly morphs and snaps to the element's boundaries, forming a pill/button highlight.
 * When free-floating, it is a sleek, minimalist golden ring with a precise central dot.
 */
export function CustomCursor() {
  const [hidden, setHidden] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [label, setLabel] = useState("");
  
  // Snap target properties
  const [snapRect, setSnapRect] = useState<DOMRect | null>(null);
  const [snapRadius, setSnapRadius] = useState("9999px");

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for the cursor container position
  const cursorX = useSpring(mouseX, { stiffness: 450, damping: 30, mass: 0.6 });
  const cursorY = useSpring(mouseY, { stiffness: 450, damping: 30, mass: 0.6 });

  // Spring dimensions for the morphing ring
  const width = useMotionValue(24);
  const height = useMotionValue(24);
  const springWidth = useSpring(width, { stiffness: 400, damping: 28 });
  const springHeight = useSpring(height, { stiffness: 400, damping: 28 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Disable custom cursor on mobile/touch devices
    if ("ontouchstart" in window || window.matchMedia("(max-width: 768px)").matches) {
      return;
    }

    setHidden(false);

    const handleMouseMove = (e: MouseEvent) => {
      if (snapRect) {
        // When snapped, the cursor center is fixed to the center of the element,
        // but we add a slight parallax (magnetic pull) towards the actual mouse position.
        const elCenterX = snapRect.left + snapRect.width / 2;
        const elCenterY = snapRect.top + snapRect.height / 2;
        const pullFactor = 0.15; // 15% pull towards the mouse
        
        mouseX.set(elCenterX + (e.clientX - elCenterX) * pullFactor);
        mouseY.set(elCenterY + (e.clientY - elCenterY) * pullFactor);
      } else {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
    };

    const handleMouseDown = () => {
      setClicked(true);
      if (!snapRect) {
        width.set(16);
        height.set(16);
      }
    };

    const handleMouseUp = () => {
      setClicked(false);
      if (!snapRect) {
        width.set(24);
        height.set(24);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        "a, button, [data-cursor], [data-cursor-label]"
      ) as HTMLElement | null;

      if (target) {
        setHovered(true);
        const customLabel = target.getAttribute("data-cursor-label") ?? "";
        setLabel(customLabel);

        // Check if we should snap to this element (buttons, links, or explicit magnetic items)
        const shouldSnap = target.tagName === "A" || target.tagName === "BUTTON" || target.hasAttribute("data-magnetic");
        
        if (shouldSnap) {
          const rect = target.getBoundingClientRect();
          setSnapRect(rect);
          
          // Get the computed border radius of the target
          const style = window.getComputedStyle(target);
          setSnapRadius(style.borderRadius || "8px");

          // Match the size of the target (plus small padding)
          width.set(rect.width + 12);
          height.set(rect.height + 8);
        } else {
          // If it's a simple text hover (e.g. over 3D image), just scale up the ring
          width.set(64);
          height.set(64);
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        "a, button, [data-cursor], [data-cursor-label]"
      );
      
      if (target) {
        setHovered(false);
        setLabel("");
        setSnapRect(null);
        setSnapRadius("9999px");
        width.set(24);
        height.set(24);
      }
    };

    // Recalculate snap rect on scroll or resize
    const handleScroll = () => {
      if (snapRect) {
        // Find currently hovered element to update its rect
        const hoveredEl = document.querySelector(":hover");
        const target = hoveredEl?.closest("a, button, [data-cursor], [data-cursor-label]") as HTMLElement | null;
        if (target && (target.tagName === "A" || target.tagName === "BUTTON" || target.hasAttribute("data-magnetic"))) {
          setSnapRect(target.getBoundingClientRect());
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mouseX, mouseY, width, height, snapRect, hovered]);

  if (hidden) return null;

  return (
    <>
      {/* Outer morphing glass/gold backdrop */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          width: springWidth,
          height: springHeight,
          translateX: "-50%",
          translateY: "-50%",
          borderRadius: snapRadius,
          border: snapRect 
            ? "1px solid rgba(212, 175, 55, 0.45)" 
            : hovered
              ? "1.5px solid var(--gold)"
              : "1px solid rgba(212, 175, 55, 0.35)",
          backgroundColor: clicked
            ? "rgba(212, 175, 55, 0.12)"
            : snapRect
              ? "rgba(212, 175, 55, 0.06)" // subtle golden highlight when snapped
              : hovered
                ? "rgba(212, 175, 55, 0.03)"
                : "rgba(212, 175, 55, 0.01)",
          backdropFilter: hovered || snapRect ? "blur(3px)" : "none",
          boxShadow: snapRect
            ? "0 4px 20px rgba(0, 0, 0, 0.2), inset 0 0 10px rgba(212, 175, 55, 0.1)"
            : hovered
              ? "0 0 16px rgba(212, 175, 55, 0.2)"
              : "0 0 6px rgba(212, 175, 55, 0.03)",
          transition: "border 0.25s, background-color 0.25s, box-shadow 0.25s",
        }}
      >
        {/* Floating text inside the ring */}
        <AnimatePresence>
          {label && !snapRect && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 flex items-center justify-center text-[8px] font-bold uppercase tracking-[0.25em]"
              style={{
                color: "var(--gold)",
                textShadow: "0 1px 4px rgba(0,0,0,0.4)",
              }}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Inner precise dot - scales down and fades when snapped to hide behind the button */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
        style={{
          x: mouseX,
          y: mouseY,
          width: snapRect ? 0 : clicked ? 3 : hovered ? 8 : 4,
          height: snapRect ? 0 : clicked ? 3 : hovered ? 8 : 4,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: "var(--gold)",
          boxShadow: snapRect ? "none" : "0 0 10px var(--gold), 0 0 4px var(--gold)",
          opacity: snapRect ? 0 : clicked ? 0.9 : 0.8,
          transition: "width 0.2s, height 0.2s, opacity 0.2s",
        }}
      />
    </>
  );
}
