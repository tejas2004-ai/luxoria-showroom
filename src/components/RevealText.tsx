import { motion } from "framer-motion";

type RevealTextProps = {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
};

/**
 * RevealText — High-end luxury typography reveal.
 * Animates opacity, y-offset, and blur-to-focus for an extremely premium transition,
 * avoiding word-splitting layout shifts or jitter.
 */
export function RevealText({ text, className = "", delay = 0, as = "h2" }: RevealTextProps) {
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 1.1,
        delay: delay,
        ease: [0.16, 1, 0.3, 1], // Premium Apple-style cubic-bezier curve
      }}
      style={{ display: "block" }}
    >
      {text}
    </Tag>
  );
}
