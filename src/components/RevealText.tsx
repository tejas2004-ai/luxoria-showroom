import { motion } from "framer-motion";

export type RevealVariant = "rise" | "slideLeft" | "slideRight" | "scaleUp" | "rotateIn" | "cinematic";

type RevealTextProps = {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
  variant?: RevealVariant;
};

const variants: Record<RevealVariant, { initial: object; animate: object }> = {
  rise: {
    initial: { opacity: 0, y: 40, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  slideLeft: {
    initial: { opacity: 0, x: -60, filter: "blur(6px)" },
    animate: { opacity: 1, x: 0, filter: "blur(0px)" },
  },
  slideRight: {
    initial: { opacity: 0, x: 60, filter: "blur(6px)" },
    animate: { opacity: 1, x: 0, filter: "blur(0px)" },
  },
  scaleUp: {
    initial: { opacity: 0, scale: 0.85, filter: "blur(10px)" },
    animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
  },
  rotateIn: {
    initial: { opacity: 0, y: 30, rotateX: 25, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" },
  },
  cinematic: {
    initial: { opacity: 0, scaleX: 0.7, scaleY: 1.1, filter: "blur(12px)" },
    animate: { opacity: 1, scaleX: 1, scaleY: 1, filter: "blur(0px)" },
  },
};

/**
 * RevealText — Premium typography reveal with multiple animation variants.
 * Each variant provides a unique entrance feel for different product sections.
 */
export function RevealText({
  text,
  className = "",
  delay = 0,
  as = "h2",
  variant = "rise",
}: RevealTextProps) {
  const Tag = motion[as];
  const v = variants[variant];

  return (
    <Tag
      className={className}
      initial={v.initial}
      whileInView={v.animate}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 1.2,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ display: "block", willChange: "transform, opacity, filter", transformPerspective: 800 }}
    >
      {text}
    </Tag>
  );
}
