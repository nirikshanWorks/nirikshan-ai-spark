'use client';

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FlowButton } from '@/components/ui/flow-button';

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.43, 0.13, 0.23, 0.96],
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] },
  },
};

const numberVariants = {
  hidden: (direction: number) => ({
    opacity: 0,
    x: direction * 40,
    y: 15,
    rotate: direction * 5,
  }),
  visible: {
    opacity: 0.7,
    x: 0,
    y: 0,
    rotate: 0,
    transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] },
  },
};

const ghostVariants = {
  hidden: { scale: 0.8, opacity: 0, y: 15, rotate: -5 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] },
  },
  floating: {
    y: [-5, 5],
    transition: {
      y: {
        duration: 2,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'reverse' as const,
      },
    },
  },
};

/* Inline ghost SVG so we don't need Next Image */
function GhostIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M60 8C30.18 8 6 32.18 6 62v72c0 4 3 6 5.5 4l12-10c3-2.5 7.5-2.5 10.5 0l10 8c3 2.5 7.5 2.5 10.5 0l10-8c3-2.5 7.5-2.5 10.5 0l10 8c3 2.5 7.5 2.5 10.5 0l10-8c3-2.5 7.5-2.5 10.5 0l12 10c2.5 2 5.5 0 5.5-4V62c0-29.82-24.18-54-54-54Z"
        fill="currentColor"
        className="text-muted-foreground/20"
      />
      <circle cx="42" cy="62" r="8" fill="currentColor" className="text-foreground" />
      <circle cx="78" cy="62" r="8" fill="currentColor" className="text-foreground" />
      <ellipse cx="60" cy="88" rx="8" ry="6" fill="currentColor" className="text-foreground/40" />
    </svg>
  );
}

export function Ghost404() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        className="flex flex-col items-center text-center max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 4 👻 4 */}
        <motion.div className="flex items-center gap-2 sm:gap-4 mb-6" variants={itemVariants}>
          <motion.span
            className="text-7xl sm:text-9xl font-bold text-foreground/70 select-none"
            custom={-1}
            variants={numberVariants}
          >
            4
          </motion.span>

          <motion.div
            className="w-20 h-28 sm:w-28 sm:h-36"
            variants={ghostVariants}
            animate="floating"
            whileHover={{ scale: 1.1, y: -10, rotate: [0, -5, 5, -5, 0] }}
          >
            <GhostIcon className="w-full h-full" />
          </motion.div>

          <motion.span
            className="text-7xl sm:text-9xl font-bold text-foreground/70 select-none"
            custom={1}
            variants={numberVariants}
          >
            4
          </motion.span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-2xl sm:text-3xl font-bold text-foreground mb-3"
          variants={itemVariants}
        >
          Boo! Page missing!
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xs"
          variants={itemVariants}
        >
          Whoops! This page must be a ghost — it&apos;s not here!
        </motion.p>

        {/* CTA */}
        <motion.div variants={itemVariants}>
          <Link to="/">
            <FlowButton text="Find shelter" />
          </Link>
        </motion.div>

        {/* Subtle help link */}
        <motion.div variants={itemVariants} className="mt-6">
          <Link
            to="/contact"
            className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors underline underline-offset-4"
          >
            What means 404?
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
