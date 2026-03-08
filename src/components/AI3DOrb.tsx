import { motion } from "framer-motion";

interface AI3DOrbProps {
  className?: string;
  size?: number;
}

export const AI3DOrb = ({ className = "", size = 200 }: AI3DOrbProps) => {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Outer rotating rings with 3D perspective */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={`ring-${i}`}
          className="absolute inset-0 rounded-full border border-primary/20"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${60 + i * 15}deg) rotateY(${i * 45}deg)`,
          }}
          animate={{ rotateZ: [0, 360] }}
          transition={{
            duration: 10 + i * 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Pulsing core glow */}
      <motion.div
        className="absolute inset-[20%] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.6) 0%, hsl(var(--accent) / 0.3) 50%, transparent 70%)",
          filter: "blur(8px)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Inner solid core */}
      <motion.div
        className="absolute inset-[30%] rounded-full bg-gradient-to-br from-primary/70 to-accent/50"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Orbiting particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1.5 h-1.5 rounded-full bg-primary shadow-lg"
          style={{
            top: "50%",
            left: "50%",
            boxShadow: "0 0 6px hsl(var(--primary))",
          }}
          animate={{
            x: [
              Math.cos((i * Math.PI * 2) / 8) * (size * 0.4),
              Math.cos((i * Math.PI * 2) / 8 + Math.PI) * (size * 0.4),
              Math.cos((i * Math.PI * 2) / 8) * (size * 0.4),
            ],
            y: [
              Math.sin((i * Math.PI * 2) / 8) * (size * 0.4),
              Math.sin((i * Math.PI * 2) / 8 + Math.PI) * (size * 0.4),
              Math.sin((i * Math.PI * 2) / 8) * (size * 0.4),
            ],
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: 6 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Radial connection lines */}
      {[...Array(12)].map((_, i) => {
        const angle = (i * 360) / 12;
        return (
          <motion.div
            key={`line-${i}`}
            className="absolute top-1/2 left-1/2 h-px origin-left"
            style={{
              width: size * 0.45,
              transform: `rotate(${angle}deg)`,
              background: "linear-gradient(90deg, hsl(var(--primary) / 0.4), transparent)",
            }}
            animate={{ opacity: [0.1, 0.5, 0.1], scaleX: [0.4, 1, 0.4] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
};
