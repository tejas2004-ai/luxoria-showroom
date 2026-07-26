import { motion } from "framer-motion";

type RevealTextProps = {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
};

/**
 * RevealText — Premium typography reveal that preserves natural text flow.
 * Uses a smooth upward slide + blur-to-focus transition without breaking
 * line-height, letter-spacing, or word wrapping.
 */
export function RevealText({ text, className = "", delay = 0, as = "h2" }: RevealTextProps) {
  const Tag = motion[as];

  return (
    <div className="overflow-hidden pb-1">
      <Tag
        className={className}
        style={{ display: "block" }}
        initial={{ y: "100%", opacity: 0 }}
        whileInView={{ y: "0%", opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 1.0,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {text}
      </Tag>
    </div>
  );
}
