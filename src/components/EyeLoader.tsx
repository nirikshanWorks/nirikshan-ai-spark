import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const EyeLoader = ({ onComplete }: { onComplete?: () => void }) => {
  const [phase, setPhase] = useState<"closed" | "opening" | "open">("closed");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("opening"), 400);
    const t2 = setTimeout(() => setPhase("open"), 1600);
    const t3 = setTimeout(() => onComplete?.(), 2200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "open" && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="relative w-40 h-40 sm:w-52 sm:h-52 flex items-center justify-center">
            {/* Eye shape container */}
            <svg
              viewBox="0 0 200 120"
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Upper eyelid */}
              <motion.path
                d="M 10 60 Q 100 60 190 60"
                fill="hsl(var(--primary))"
                initial={{ d: "M 10 60 Q 100 60 190 60" }}
                animate={
                  phase === "opening"
                    ? { d: "M 10 60 Q 100 -10 190 60" }
                    : { d: "M 10 60 Q 100 60 190 60" }
                }
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
              {/* Lower eyelid */}
              <motion.path
                d="M 10 60 Q 100 60 190 60"
                fill="hsl(var(--primary))"
                initial={{ d: "M 10 60 Q 100 60 190 60" }}
                animate={
                  phase === "opening"
                    ? { d: "M 10 60 Q 100 130 190 60" }
                    : { d: "M 10 60 Q 100 60 190 60" }
                }
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />

              {/* Eye white (sclera) - revealed as lids open */}
              <motion.ellipse
                cx="100"
                cy="60"
                rx="80"
                ry="0"
                fill="hsl(var(--card))"
                initial={{ ry: 0 }}
                animate={phase === "opening" ? { ry: 35 } : { ry: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />

              {/* Iris */}
              <motion.circle
                cx="100"
                cy="60"
                r="0"
                fill="hsl(var(--primary))"
                initial={{ r: 0, opacity: 0 }}
                animate={
                  phase === "opening"
                    ? { r: 22, opacity: 1 }
                    : { r: 0, opacity: 0 }
                }
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              />

              {/* Iris gradient ring */}
              <motion.circle
                cx="100"
                cy="60"
                r="0"
                fill="none"
                stroke="hsl(var(--primary) / 0.5)"
                strokeWidth="4"
                initial={{ r: 0, opacity: 0 }}
                animate={
                  phase === "opening"
                    ? { r: 18, opacity: 1 }
                    : { r: 0, opacity: 0 }
                }
                transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
              />

              {/* Pupil */}
              <motion.circle
                cx="100"
                cy="60"
                r="0"
                fill="hsl(var(--foreground))"
                initial={{ r: 0, opacity: 0 }}
                animate={
                  phase === "opening"
                    ? { r: 10, opacity: 1 }
                    : { r: 0, opacity: 0 }
                }
                transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
              />

              {/* Light reflection */}
              <motion.circle
                cx="108"
                cy="52"
                r="0"
                fill="white"
                initial={{ r: 0, opacity: 0 }}
                animate={
                  phase === "opening"
                    ? { r: 4, opacity: 0.9 }
                    : { r: 0, opacity: 0 }
                }
                transition={{ duration: 0.3, delay: 0.7, ease: "easeOut" }}
              />

              {/* Second smaller reflection */}
              <motion.circle
                cx="93"
                cy="67"
                r="0"
                fill="white"
                initial={{ r: 0, opacity: 0 }}
                animate={
                  phase === "opening"
                    ? { r: 2, opacity: 0.6 }
                    : { r: 0, opacity: 0 }
                }
                transition={{ duration: 0.3, delay: 0.75, ease: "easeOut" }}
              />

              {/* Scanning line effect */}
              <motion.line
                x1="20"
                y1="60"
                x2="180"
                y2="60"
                stroke="hsl(var(--primary))"
                strokeWidth="1"
                strokeOpacity="0.6"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={
                  phase === "opening"
                    ? { pathLength: 1, opacity: [0, 0.8, 0] }
                    : { pathLength: 0, opacity: 0 }
                }
                transition={{ duration: 1, delay: 0.6, ease: "easeInOut" }}
              />
            </svg>

            {/* Pulsing glow behind eye */}
            <motion.div
              className="absolute inset-0 rounded-full bg-primary/20 blur-2xl"
              initial={{ scale: 0, opacity: 0 }}
              animate={
                phase === "opening"
                  ? { scale: [0, 1.2, 1], opacity: [0, 0.4, 0.2] }
                  : { scale: 0, opacity: 0 }
              }
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>

          {/* Brand text */}
          <motion.p
            className="absolute bottom-1/3 text-sm sm:text-base font-semibold tracking-widest uppercase text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={
              phase === "opening"
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 10 }
            }
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            Nirikshan AI
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const EyeLoaderInline = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="relative w-32 h-32 flex items-center justify-center">
      <svg viewBox="0 0 200 120" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {/* Blinking eye animation */}
        <ellipse cx="100" cy="60" rx="80" ry="35" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2" />
        <circle cx="100" cy="60" r="22" fill="hsl(var(--primary))" />
        <circle cx="100" cy="60" r="10" fill="hsl(var(--foreground))" />
        <circle cx="108" cy="52" r="4" fill="white" opacity="0.9" />

        {/* Upper eyelid blink */}
        <motion.path
          d="M 10 60 Q 100 -10 190 60"
          fill="hsl(var(--background))"
          animate={{
            d: [
              "M 10 60 Q 100 -10 190 60",
              "M 10 60 Q 100 60 190 60",
              "M 10 60 Q 100 -10 190 60",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
        />
        {/* Lower eyelid blink */}
        <motion.path
          d="M 10 60 Q 100 130 190 60"
          fill="hsl(var(--background))"
          animate={{
            d: [
              "M 10 60 Q 100 130 190 60",
              "M 10 60 Q 100 60 190 60",
              "M 10 60 Q 100 130 190 60",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
        />
      </svg>
    </div>
  </div>
);
