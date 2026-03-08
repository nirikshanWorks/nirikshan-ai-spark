"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type InfiniteTextMarqueeProps = {
  text?: string;
  link?: string;
  speed?: number;
  showTooltip?: boolean;
  tooltipText?: string;
  fontSize?: string;
  textColor?: string;
  hoverColor?: string;
};

export const InfiniteTextMarquee: React.FC<InfiniteTextMarqueeProps> = ({
  text = "Let's Get Started",
  link = "/contact",
  speed = 30,
  showTooltip = true,
  tooltipText = "Time to Flex💪",
  fontSize = "8rem",
  textColor = "",
  hoverColor = "",
}) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState(0);
  const maxRotation = 8;

  useEffect(() => {
    if (!showTooltip) return;

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });

      const midpoint = window.innerWidth / 2;
      const distanceFromMidpoint = Math.abs(e.clientX - midpoint);
      const rot = (distanceFromMidpoint / midpoint) * maxRotation;

      setRotation(e.clientX > midpoint ? rot : -rot);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [showTooltip]);

  const repeatedText = Array(10).fill(text).join(" - ") + " -";

  return (
    <>
      {showTooltip && (
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: rotation,
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              style={{
                position: "fixed",
                left: cursorPosition.x + 15,
                top: cursorPosition.y + 15,
                zIndex: 9999,
                pointerEvents: "none",
              }}
              className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg"
            >
              <p>{tooltipText}</p>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      <Link to={link} className="block overflow-hidden whitespace-nowrap">
        <motion.div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          animate={{
            x: [0, -1000],
            transition: {
              repeat: Infinity,
              duration: speed,
              ease: "linear",
            },
          }}
        >
          <span
            className="inline-block font-bold leading-none transition-colors duration-300"
            style={{
              fontSize,
              color: isHovered
                ? hoverColor || "hsl(var(--primary))"
                : textColor || "hsl(var(--foreground))",
            }}
          >
            {repeatedText}
          </span>
        </motion.div>
      </Link>
    </>
  );
};
