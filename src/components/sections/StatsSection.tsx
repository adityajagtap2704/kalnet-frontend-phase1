"use client";

import { STATS } from "@/lib/constants";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";
import { FadeIn } from "@/components/animations";
import { motion } from "framer-motion";

export default function StatsSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1] 
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-0 -translate-y-1/2 w-[40rem] h-[40rem] bg-brand-500/10 blur-[120px] rounded-full pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          scale: [1.1, 1, 1.1],
          opacity: [0.1, 0.15, 0.1] 
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[40rem] h-[40rem] bg-accent-500/10 blur-[120px] rounded-full pointer-events-none" 
      />

      <div className="container-wide mx-auto">
        <FadeIn>
          <div className="relative rounded-[3rem] bg-surface-950 p-12 sm:p-16 lg:p-20 border border-white/5 overflow-hidden group">
            {/* Animated accent gradient background */}
            <motion.div 
              style={{
                background: "radial-gradient(circle at center, var(--brand-600), transparent 70%)"
              }}
              animate={{
                opacity: [0.1, 0.2, 0.1],
                scale: [0.8, 1, 0.8],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 pointer-events-none" 
            />
            
            <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 divide-x divide-white/5">
              {STATS.map((stat) => (
                <StatItem key={stat.label} stat={stat} />
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function StatItem({ stat }: { stat: (typeof STATS)[number] }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });
  const count = useCountUp({ end: stat.value, enabled: isVisible, duration: 2500 });

  return (
    <div ref={ref} className="text-center px-4">
      <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white mb-2 tracking-tight">
        {stat.prefix}
        {count}
        {stat.suffix}
      </div>
      <div className="text-xs font-bold text-surface-400 uppercase tracking-[0.2em]">{stat.label}</div>
    </div>
  );
}
