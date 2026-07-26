import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

/**
 * CustomCursor — High-Performance 120FPS Apple-Style Magnetic Cursor.
 * Zero-latency mouse tracking with instant spring response and smooth button snapping.
 */
export function CustomCursor() {
  const [hidden, setHidden] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [label, setLabel] = useState("");
  const [snapRadius, setSnapRadius] = useState("9999px");
  const [isSnapped, setIsSnapped] = useState(false);

  // References to keep state without re-attaching event listeners
  const activeSnapElRef = useRef<HTMLElement | null>(null);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // High-stiffness, low-mass springs for zero perceived input lag
  const cursorX = useSpring(mouseX, { stiffness: 900, damping: 40, mass: 0.1 });
  const cursorY = useSpring(mouseY, { stiffness: 900, damping: 40, mass: 0.1 });

  // Spring dimensions for the morphing ring
  const width = useMotionValue(24);
  const height = useMotionValue(24);
  const springWidth = useSpring(width, { stiffness: 600, damping: 32 });
  const springHeight = useSpring(height, { stiffness: 600, damping: 32 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Disable custom cursor on mobile/touch devices
    if ("ontouchstart" in window || window.matchMedia("(max-width: 768px)").matches) {
      return;
    }

    setHidden(false);

    let animationFrameId: number | null = null;

    const updateCursorPosition = (clientX: number, clientY: number) => {
      const activeEl = activeSnapElRef.current;
      if (activeEl) {
        const rect = activeEl.getBoundingClientRect();
        const elCenterX = rect.left + rect.width / 2;
        const elCenterY = rect.top + rect.height / 2;
        const pullFactor = 0.18; // Slight magnetic attraction
        mouseX.set(elCenterX + (clientX - elCenterX) * pullFactor);
        mouseY.set(elCenterY + (clientY - elCenterY) * pullFactor);
      } else {
        mouseX.set(clientX);
        mouseY.set(clientY);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (animationFrameId) return;
      const { clientX, clientY } = e;
      animationFrameId = requestAnimationFrame(() => {
        animationFrameId = null;
        updateCursorPosition(clientX, clientY);
      });
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        "a, button, [data-cursor], [data-cursor-label]"
      ) as HTMLElement | null;

      if (target) {
        setHovered(true);
        const customLabel = target.getAttribute("data-cursor-label") ?? "";
        setLabel(customLabel);

        const shouldSnap =
          target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          target.hasAttribute("data-magnetic");

        if (shouldSnap) {
          activeSnapElRef.current = target;
          setIsSnapped(true);
          const rect = target.getBoundingClientRect();
          const style = window.getComputedStyle(target);
          setSnapRadius(style.borderRadius || "9999px");
          width.set(rect.width + 12);
          height.set(rect.height + 8);
        } else {
          activeSnapElRef.current = null;
          setIsSnapped(false);
          width.set(60);
          height.set(60);
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
        activeSnapElRef.current = null;
        setIsSnapped(false);
        setSnapRadius("9999px");
        width.set(24);
        height.set(24);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("mouseout", handleMouseOut, { passive: true });

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, [mouseX, mouseY, width, height]);

  if (hidden) return null;

  return (
    <>
      {/* Outer morphing glass/gold backdrop */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] transform-gpu will-change-transform"
        style={{
          x: cursorX,
          y: cursorY,
          width: springWidth,
          height: springHeight,
          translateX: "-50%",
          translateY: "-50%",
          borderRadius: snapRadius,
          border: isSnapped
            ? "1px solid rgba(232, 208, 158, 0.55)"
            : hovered
              ? "1.5px solid var(--accent)"
              : "1px solid rgba(232, 208, 158, 0.4)",
          backgroundColor: clicked
            ? "rgba(232, 208, 158, 0.15)"
            : isSnapped
              ? "rgba(232, 208, 158, 0.08)"
              : hovered
                ? "rgba(232, 208, 158, 0.04)"
                : "rgba(232, 208, 158, 0.02)",
          boxShadow: isSnapped
            ? "0 4px 24px rgba(0, 0, 0, 0.25), inset 0 0 12px rgba(232, 208, 158, 0.15)"
            : hovered
              ? "0 0 20px rgba(232, 208, 158, 0.25)"
              : "0 0 8px rgba(232, 208, 158, 0.05)",
          transition: "border 0.2s, background-color 0.2s, box-shadow 0.2s",
        }}
      >
        {/* Floating text inside the ring */}
        <AnimatePresence>
          {label && !isSnapped && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.12 }}
              className="absolute inset-0 flex items-center justify-center text-[9px] font-semibold uppercase tracking-[0.25em]"
              style={{
                color: "var(--accent)",
                textShadow: "0 1px 4px rgba(0,0,0,0.5)",
              }}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Inner precise central gold dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full transform-gpu will-change-transform"
        style={{
          x: mouseX,
          y: mouseY,
          width: isSnapped ? 0 : clicked ? 3 : hovered ? 7 : 4,
          height: isSnapped ? 0 : clicked ? 3 : hovered ? 7 : 4,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: "var(--accent)",
          boxShadow: isSnapped ? "none" : "0 0 10px var(--accent)",
          opacity: isSnapped ? 0 : clicked ? 0.95 : 0.85,
          transition: "width 0.15s, height 0.15s, opacity 0.15s",
        }}
      />
    </>
  );
}
