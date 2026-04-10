"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface SlideInProps {
  children: React.ReactNode;
  from?: "left" | "right";
  delay?: number;
  duration?: number;
  className?: string;
}

export default function SlideIn({
  children,
  from = "left",
  delay = 0,
  duration = 0.6,
  className,
}: SlideInProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        x: from === "left" ? -60 : 60,
      }}
      animate={
        isVisible
          ? { opacity: 1, x: 0 }
          : { opacity: 0, x: from === "left" ? -60 : 60 }
      }
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
