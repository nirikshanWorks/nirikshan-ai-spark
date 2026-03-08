import { motion } from "framer-motion";

interface AIParticleRingProps {
  className?: string;
  size?: number;
  particleCount?: number;
}

export const AIParticleRing = ({ className = "", size = 300, particleCount = 40 }: AIParticleRingProps) => {
  const radius = size * 0.4;

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Rotating ring */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(particleCount)].map((_, i) => {
          const angle = (i * 360) / particleCount;
          const rad = (angle * Math.PI) / 180;
          const x = Math.cos(rad) * radius + size / 2;
          const y = Math.sin(rad) * radius + size / 2;
          const particleSize = 1 + Math.random() * 2;

          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary"
              style={{
                width: particleSize,
                height: particleSize,
                left: x,
                top: y,
                boxShadow: `0 0 ${particleSize * 3}px hsl(var(--primary) / 0.5)`,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [0.8, 1.5, 0.8],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.05,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </motion.div>

      {/* Second ring, opposite rotation */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(Math.floor(particleCount / 2))].map((_, i) => {
          const angle = (i * 360) / (particleCount / 2);
          const rad = (angle * Math.PI) / 180;
          const innerRadius = radius * 0.6;
          const x = Math.cos(rad) * innerRadius + size / 2;
          const y = Math.sin(rad) * innerRadius + size / 2;

          return (
            <motion.div
              key={`inner-${i}`}
              className="absolute w-1 h-1 rounded-full bg-accent"
              style={{
                left: x,
                top: y,
                boxShadow: `0 0 4px hsl(var(--accent) / 0.5)`,
              }}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{
                duration: 1.5 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          );
        })}
      </motion.div>

      {/* Center glow */}
      <div
        className="absolute rounded-full"
        style={{
          width: size * 0.15,
          height: size * 0.15,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, hsl(var(--primary) / 0.4), transparent)",
          filter: "blur(6px)",
        }}
      />
    </div>
  );
};
