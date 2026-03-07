import { motion } from "framer-motion";

export const AIHexagonGrid = ({ className = "" }: { className?: string }) => {
  const hexagons = Array.from({ length: 15 }).map((_, i) => ({
    x: (i % 5) * 22 + (Math.floor(i / 5) % 2 === 0 ? 0 : 11),
    y: Math.floor(i / 5) * 19 + 5,
    delay: i * 0.15,
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg className="w-full h-full" viewBox="0 0 100 60" preserveAspectRatio="none">
        {hexagons.map((hex, i) => (
          <motion.polygon
            key={i}
            points={`${hex.x},${hex.y - 5} ${hex.x + 4.33},${hex.y - 2.5} ${hex.x + 4.33},${hex.y + 2.5} ${hex.x},${hex.y + 5} ${hex.x - 4.33},${hex.y + 2.5} ${hex.x - 4.33},${hex.y - 2.5}`}
            fill="none"
            stroke="hsl(var(--primary) / 0.08)"
            strokeWidth="0.15"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 0.6, 0.3], scale: 1 }}
            transition={{
              duration: 2,
              delay: hex.delay,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 3 + i * 0.3,
            }}
          />
        ))}
      </svg>
    </div>
  );
};
