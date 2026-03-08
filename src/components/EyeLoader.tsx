import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const EyeLoader = ({ onComplete }: { onComplete?: () => void }) => {
  const [phase, setPhase] = useState<"closed" | "opening" | "open">("closed");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("opening"), 300);
    const t2 = setTimeout(() => setPhase("open"), 1800);
    const t3 = setTimeout(() => onComplete?.(), 2300);
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
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Eye container */}
          <div className="relative w-48 h-28 sm:w-64 sm:h-36">
            {/* Eye outline shape */}
            <div
              className="absolute inset-0 flex items-center justify-center overflow-hidden"
              style={{
                borderRadius: "50% / 50%",
              }}
            >
              {/* Sclera (white of eye) */}
              <motion.div
                className="absolute inset-0 bg-card border-2 border-primary/30"
                style={{ borderRadius: "50% / 50%" }}
                initial={{ scaleY: 0 }}
                animate={phase === "opening" ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* Iris */}
              <motion.div
                className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary"
                initial={{ scale: 0 }}
                animate={phase === "opening" ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              >
                {/* Iris inner ring */}
                <div className="absolute inset-1 rounded-full border-2 border-primary-foreground/20" />

                {/* Pupil */}
                <motion.div
                  className="absolute inset-0 m-auto w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-foreground"
                  initial={{ scale: 0 }}
                  animate={phase === "opening" ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
                >
                  {/* Light reflection */}
                  <div className="absolute top-1 right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white/90" />
                  <div className="absolute bottom-2 left-1.5 w-1.5 h-1.5 rounded-full bg-white/50" />
                </motion.div>
              </motion.div>
            </div>

            {/* Upper eyelid */}
            <motion.div
              className="absolute top-0 left-0 right-0 bg-background z-10 origin-top"
              style={{ height: "50%" }}
              initial={{ scaleY: 1 }}
              animate={phase === "opening" ? { scaleY: 0 } : { scaleY: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Lower eyelid */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-background z-10 origin-bottom"
              style={{ height: "50%" }}
              initial={{ scaleY: 1 }}
              animate={phase === "opening" ? { scaleY: 0 } : { scaleY: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Eyelid edges (lash lines) */}
            <motion.div
              className="absolute top-1/2 left-0 right-0 h-0.5 bg-primary/60 z-20 origin-center"
              initial={{ scaleX: 1, opacity: 1 }}
              animate={phase === "opening" ? { scaleX: 0, opacity: 0 } : { scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
            />

            {/* Scanning pulse */}
            <motion.div
              className="absolute inset-0 z-30 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={
                phase === "opening"
                  ? { opacity: [0, 0.4, 0] }
                  : { opacity: 0 }
              }
              transition={{ duration: 1.2, delay: 0.6 }}
            >
              <div className="w-full h-full rounded-full border-2 border-primary/40 animate-ping" />
            </motion.div>
          </div>

          {/* Glow effect */}
          <motion.div
            className="absolute w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-primary/10 blur-3xl pointer-events-none"
            initial={{ scale: 0, opacity: 0 }}
            animate={
              phase === "opening"
                ? { scale: [0, 1.5, 1.2], opacity: [0, 0.3, 0.15] }
                : { scale: 0, opacity: 0 }
            }
            transition={{ duration: 1, delay: 0.2 }}
          />

          {/* Brand text */}
          <motion.p
            className="mt-8 text-sm sm:text-base font-semibold tracking-[0.2em] uppercase text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={
              phase === "opening"
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 10 }
            }
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Nirikshan AI
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const EyeLoaderInline = () => {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 300);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
      <div className="relative w-32 h-20">
        {/* Eye shape */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ borderRadius: "50% / 50%" }}
        >
          <div
            className="absolute inset-0 bg-card border-2 border-primary/30"
            style={{ borderRadius: "50% / 50%" }}
          />
          {/* Iris */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-primary relative">
              <div className="absolute inset-0 m-auto w-6 h-6 rounded-full bg-foreground">
                <div className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-white/90" />
              </div>
            </div>
          </div>
        </div>

        {/* Blinking eyelids */}
        <motion.div
          className="absolute top-0 left-0 right-0 bg-background z-10 origin-top"
          style={{ height: "50%" }}
          animate={{ scaleY: blink ? 1 : 0 }}
          transition={{ duration: 0.15, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-background z-10 origin-bottom"
          style={{ height: "50%" }}
          animate={{ scaleY: blink ? 1 : 0 }}
          transition={{ duration: 0.15, ease: "easeInOut" }}
        />
      </div>
      <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground animate-pulse">
        Loading...
      </p>
    </div>
  );
};
