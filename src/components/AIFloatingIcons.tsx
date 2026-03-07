import { motion } from "framer-motion";
import { Brain, Cpu, Database, Eye, Network, Sparkles, Zap, Binary } from "lucide-react";

const icons = [Brain, Cpu, Database, Eye, Network, Sparkles, Zap, Binary];

interface AIFloatingIconsProps {
  count?: number;
  className?: string;
}

export const AIFloatingIcons = ({ count = 6, className = "" }: AIFloatingIconsProps) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {Array.from({ length: count }).map((_, i) => {
        const Icon = icons[i % icons.length];
        const size = 16 + Math.random() * 12;
        return (
          <motion.div
            key={i}
            className="absolute text-primary/10"
            style={{
              left: `${10 + (i * 80) / count + Math.random() * 10}%`,
              top: `${15 + Math.random() * 70}%`,
            }}
            animate={{
              y: [0, -20, 0, 15, 0],
              x: [0, 10, -5, 8, 0],
              rotate: [0, 5, -5, 3, 0],
              opacity: [0.05, 0.15, 0.08, 0.12, 0.05],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.2,
            }}
          >
            <Icon size={size} />
          </motion.div>
        );
      })}
    </div>
  );
};
