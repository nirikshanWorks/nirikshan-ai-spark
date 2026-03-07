import { motion } from "framer-motion";

export const AIBrainOrb = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Outer rotating rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border border-primary/20"
          style={{
            transform: `rotateX(${60 + i * 20}deg) rotateY(${i * 30}deg)`,
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 8 + i * 4,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Core glow */}
      <motion.div
        className="absolute inset-[15%] rounded-full bg-gradient-to-br from-primary/40 via-accent/30 to-primary/20 blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Inner pulsing core */}
      <motion.div
        className="absolute inset-[25%] rounded-full bg-gradient-to-br from-primary/60 to-accent/40"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Orbiting dots */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute w-2 h-2 rounded-full bg-primary shadow-lg shadow-primary/50"
          style={{
            top: "50%",
            left: "50%",
          }}
          animate={{
            x: [
              Math.cos((i * Math.PI * 2) / 6) * 80,
              Math.cos((i * Math.PI * 2) / 6 + Math.PI) * 80,
              Math.cos((i * Math.PI * 2) / 6) * 80,
            ],
            y: [
              Math.sin((i * Math.PI * 2) / 6) * 80,
              Math.sin((i * Math.PI * 2) / 6 + Math.PI) * 80,
              Math.sin((i * Math.PI * 2) / 6) * 80,
            ],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 5 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Connection lines radiating out */}
      {[...Array(8)].map((_, i) => {
        const angle = (i * 360) / 8;
        return (
          <motion.div
            key={`line-${i}`}
            className="absolute top-1/2 left-1/2 h-px bg-gradient-to-r from-primary/40 to-transparent origin-left"
            style={{
              width: "120px",
              transform: `rotate(${angle}deg)`,
            }}
            animate={{ opacity: [0.2, 0.6, 0.2], scaleX: [0.5, 1, 0.5] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
};
