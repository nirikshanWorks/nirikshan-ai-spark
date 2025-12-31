import { motion, Variants, useInView } from "framer-motion";
import { ReactNode, useEffect, useState, useRef } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
}

// Fade up animation
const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export const FadeUp = ({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  once = true,
}: ScrollRevealProps) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once, margin: "-50px" }}
    variants={fadeUpVariants}
    transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    className={className}
  >
    {children}
  </motion.div>
);

// Fade in animation
const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const FadeIn = ({
  children,
  className = "",
  delay = 0,
  duration = 0.5,
  once = true,
}: ScrollRevealProps) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once, margin: "-50px" }}
    variants={fadeInVariants}
    transition={{ duration, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

// Slide in from left
const slideLeftVariants: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0 },
};

export const SlideLeft = ({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  once = true,
}: ScrollRevealProps) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once, margin: "-50px" }}
    variants={slideLeftVariants}
    transition={{ duration, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

// Slide in from right
const slideRightVariants: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0 },
};

export const SlideRight = ({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  once = true,
}: ScrollRevealProps) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once, margin: "-50px" }}
    variants={slideRightVariants}
    transition={{ duration, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

// Scale up animation
const scaleUpVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

export const ScaleUp = ({
  children,
  className = "",
  delay = 0,
  duration = 0.5,
  once = true,
}: ScrollRevealProps) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once, margin: "-50px" }}
    variants={scaleUpVariants}
    transition={{ duration, delay, type: "spring", stiffness: 100 }}
    className={className}
  >
    {children}
  </motion.div>
);

// Stagger container for child animations
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}

const staggerContainerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export const StaggerContainer = ({
  children,
  className = "",
  staggerDelay = 0.1,
  once = true,
}: StaggerContainerProps) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once, margin: "-50px" }}
    variants={{
      hidden: { opacity: 1 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: staggerDelay,
        },
      },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <motion.div
    variants={staggerItemVariants}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

// Rotate in animation
const rotateInVariants: Variants = {
  hidden: { opacity: 0, rotate: -10, scale: 0.9 },
  visible: { opacity: 1, rotate: 0, scale: 1 },
};

export const RotateIn = ({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  once = true,
}: ScrollRevealProps) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once, margin: "-50px" }}
    variants={rotateInVariants}
    transition={{ duration, delay, type: "spring", stiffness: 80 }}
    className={className}
  >
    {children}
  </motion.div>
);

// Blur in animation
export const BlurIn = ({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  once = true,
}: ScrollRevealProps) => (
  <motion.div
    initial={{ opacity: 0, filter: "blur(10px)" }}
    whileInView={{ opacity: 1, filter: "blur(0px)" }}
    viewport={{ once, margin: "-50px" }}
    transition={{ duration, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

// Bounce in animation
export const BounceIn = ({
  children,
  className = "",
  delay = 0,
  once = true,
}: ScrollRevealProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.3 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once, margin: "-50px" }}
    transition={{
      delay,
      type: "spring",
      stiffness: 300,
      damping: 15,
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Text reveal word by word
interface TextRevealProps {
  text: string;
  className?: string;
  once?: boolean;
}

export const TextReveal = ({ text, className = "", once = true }: TextRevealProps) => {
  const words = text.split(" ");
  
  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.05 } },
      }}
      className={className}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.4 }}
          className="inline-block mr-1"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

// Counter animation - uses state for smooth counting
interface CounterProps {
  from?: number;
  to: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}

export const Counter = ({
  from = 0,
  to,
  duration = 2,
  className = "",
  suffix = "",
  prefix = "",
}: CounterProps) => {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      const startTime = Date.now();
      const endTime = startTime + duration * 1000;

      const animate = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / (duration * 1000), 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentCount = Math.round(from + (to - from) * easeOut);
        
        setCount(currentCount);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, from, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
};
