import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burntamber focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 rounded-none",
  {
    variants: {
      variant: {
        default: "bg-charcoal text-ivory border border-charcoal hover:bg-burntamber hover:border-burntamber hover:text-white transition-all font-mono uppercase tracking-wider",
        destructive: "bg-burntamber text-white hover:bg-burntamber/90 transition-all font-mono uppercase tracking-wider",
        outline: "border border-concrete/50 bg-transparent text-charcoal dark:text-ivory hover:border-burntamber hover:text-burntamber hover:bg-burntamber/5 transition-all font-mono uppercase tracking-wider",
        secondary: "bg-sage text-charcoal border border-sage hover:bg-burntamber hover:border-burntamber hover:text-white transition-all font-mono uppercase tracking-wider",
        ghost: "hover:bg-concrete/15 hover:text-burntamber transition-colors font-mono uppercase tracking-wider",
        link: "text-sage hover:text-burntamber underline-offset-4 hover:underline font-mono",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
