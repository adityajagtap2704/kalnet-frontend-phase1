"use client";

import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface CardProps extends Omit<HTMLMotionProps<"div">, "variant"> {
  variant?: "default" | "glass" | "bordered" | "glow" | "glow-blue" | "glow-green" | "glow-purple" | "glow-pink";
  hoverable?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const variantStyles = {
  default: "bg-white dark:bg-surface-800 shadow-sm",
  glass: "glass",
  bordered:
    "bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700",
  glow: "bg-emerald-50/50 dark:bg-emerald-950/20 border-2 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.2)]",
  "glow-blue": "bg-blue-50/50 dark:bg-blue-950/20 border-2 border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.2)]",
  "glow-green": "bg-emerald-50/50 dark:bg-emerald-950/20 border-2 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.2)]",
  "glow-purple": "bg-purple-50/50 dark:bg-purple-950/20 border-2 border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.2)]",
  "glow-pink": "bg-rose-50/50 dark:bg-rose-950/20 border-2 border-rose-500/50 shadow-[0_0_30px_rgba(244,63,94,0.2)]",
};

const paddingStyles = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = "default",
      hoverable = false,
      padding = "md",
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        whileHover={hoverable ? { scale: 1.02, y: -4 } : undefined}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={cn(
          "rounded-2xl overflow-hidden",
          variantStyles[variant],
          paddingStyles[padding],
          hoverable && "card-hover cursor-pointer",
          className
        )}
        {...props}
      >
        {children as React.ReactNode}
      </motion.div>
    );
  }
);

Card.displayName = "Card";
export default Card;
