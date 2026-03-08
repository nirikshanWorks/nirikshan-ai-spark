import { motion } from "framer-motion";

interface AI3DCubeProps {
  className?: string;
  size?: number;
}

export const AI3DCube = ({ className = "", size = 120 }: AI3DCubeProps) => {
  const half = size / 2;
  const faceStyle = (transform: string): React.CSSProperties => ({
    position: "absolute",
    width: size,
    height: size,
    border: "1px solid hsl(var(--primary) / 0.25)",
    background: "hsl(var(--primary) / 0.04)",
    backdropFilter: "blur(2px)",
    transform,
  });

  return (
    <div className={`${className}`} style={{ perspective: 800 }}>
      <motion.div
        style={{
          width: size,
          height: size,
          position: "relative",
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateX: [0, 360],
          rotateY: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* 6 faces of the cube */}
        <div style={faceStyle(`translateZ(${half}px)`)}>
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-primary/30 animate-pulse" />
          </div>
        </div>
        <div style={faceStyle(`rotateY(180deg) translateZ(${half}px)`)} />
        <div style={faceStyle(`rotateY(90deg) translateZ(${half}px)`)} />
        <div style={faceStyle(`rotateY(-90deg) translateZ(${half}px)`)} />
        <div style={faceStyle(`rotateX(90deg) translateZ(${half}px)`)} />
        <div style={faceStyle(`rotateX(-90deg) translateZ(${half}px)`)} />

        {/* Wireframe edges glow */}
        {[0, 90, 180, 270].map((deg) => (
          <motion.div
            key={deg}
            className="absolute top-0 left-1/2 w-px origin-bottom"
            style={{
              height: size,
              background: "linear-gradient(to top, hsl(var(--primary) / 0.5), transparent)",
              transform: `rotateY(${deg}deg) translateZ(${half}px)`,
              transformStyle: "preserve-3d",
            }}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: deg / 360 }}
          />
        ))}
      </motion.div>
    </div>
  );
};
