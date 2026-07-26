import { useMemo } from "react";

type ParticlesProps = {
  count?: number;
  tone?: "frost" | "cyan" | "ember" | "neutral";
  className?: string;
};

const toneClass: Record<NonNullable<ParticlesProps["tone"]>, string> = {
  frost: "bg-frost",
  cyan: "bg-accent",
  ember: "bg-gold",
  neutral: "bg-silver",
};

export function Particles({ count = 28, tone = "cyan", className = "" }: ParticlesProps) {
  const motes = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const seed = (i * 9301 + 49297) % 233280;
        const r = seed / 233280;
        const r2 = ((i * 4523 + 7919) % 997) / 997;
        return {
          left: `${(r * 100).toFixed(2)}%`,
          top: `${(r2 * 100).toFixed(2)}%`,
          size: 1 + r2 * 3.2,
          delay: `${(r * 12).toFixed(2)}s`,
          duration: `${(11 + r2 * 16).toFixed(2)}s`,
          opacity: 0.15 + r * 0.5,
        };
      }),
    [count],
  );

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden motion-reduce:hidden ${className}`}
    >
      {motes.map((m, i) => (
        <span
          key={i}
          className={`absolute rounded-full blur-[0.5px] animate-drift ${toneClass[tone]}`}
          style={{
            left: m.left,
            top: m.top,
            width: m.size,
            height: m.size,
            opacity: m.opacity,
            animationDelay: m.delay,
            animationDuration: m.duration,
          }}
        />
      ))}
    </div>
  );
}
