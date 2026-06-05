import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RotatingKeywordsProps {
  keywords: string[];
  interval?: number;
  className?: string;
}

export function RotatingKeywords({
  keywords,
  interval = 2800,
  className = "",
}: RotatingKeywordsProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % keywords.length);
    }, interval);
    return () => clearInterval(timer);
  }, [keywords.length, interval]);

  return (
    <span className={`inline-block relative ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={keywords[index]}
          initial={{ y: 24, opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -24, opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="inline-block text-gradient"
        >
          {keywords[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
