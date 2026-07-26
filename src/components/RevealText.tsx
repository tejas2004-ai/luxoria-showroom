import { motion } from "framer-motion";

type RevealTextProps = {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
  stagger?: boolean;
};

/**
 * RevealText — High-end luxury typography reveal.
 * Word-by-word mask reveal effect with staggered delays and GPU acceleration.
 */
export function RevealText({ text, className = "", delay = 0, as = "h2", stagger = true }: RevealTextProps) {
  const Tag = motion[as];
  const words = text.split(" ");

  if (!stagger || words.length <= 1) {
    return (
      <Tag
        className={className}
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: 1.0,
          delay: delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {text}
      </Tag>
    );
  }

  return (
    <Tag className={`flex flex-wrap gap-x-[0.28em] ${className}`}>
      {words.map((word, index) => (
        <span key={index} className="overflow-hidden inline-block py-1">
          <motion.span
            className="inline-block transform-gpu will-change-transform"
            initial={{ y: "110%", opacity: 0, filter: "blur(6px)" }}
            whileInView={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.9,
              delay: delay + index * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
