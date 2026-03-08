import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type Button23Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string;
  className?: string;
};

export const Button23: React.FC<Button23Props> = ({
  label = "Button",
  className,
  disabled,
  ...props
}) => {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      className={cn(
        "btn23-wrapper group relative select-none outline-none",
        "inline-grid place-items-center",
        "font-black uppercase tracking-wide",
        "border overflow-hidden",
        "rounded-full px-12 py-3",
        "bg-background text-foreground border-border",
        "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring focus-visible:ring-offset-background",
        disabled
          ? "cursor-not-allowed opacity-60"
          : "cursor-pointer active:scale-[0.99]",
        "font-sans",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "absolute inset-0 grid place-items-center",
          "transition-opacity duration-200 ease-linear",
          "btn23-text"
        )}
      >
        {label}
      </span>

      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 grid place-items-center",
          "opacity-0",
          "btn23-marquee"
        )}
      >
        {label}
      </span>
      <span
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      />
      {/* Invisible sizer */}
      <span className="invisible">{label}</span>
    </motion.button>
  );
};
