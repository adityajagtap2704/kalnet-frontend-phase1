"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { Magnetic, TextReveal } from "@/components/animations";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[85vh] lg:min-h-[90vh] flex items-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-95 dark:opacity-100" />

      {/* Floating orbs */}
      <div className="absolute top-20 left-[10%] w-72 h-72 rounded-full bg-brand-500/20 blur-[100px] animate-float" />
      <div className="absolute bottom-20 right-[15%] w-96 h-96 rounded-full bg-accent-400/15 blur-[120px] animate-float animate-delay-300" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-400/10 blur-[150px]" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative container-wide mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50/50 dark:bg-white/10 border border-brand-100 dark:border-white/20 text-sm text-surface-700 dark:text-white/80 mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
              Trusted by 180+ companies across India
            </span>
          </motion.div>

          <div className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-surface-900 dark:text-white leading-[1.1] mb-6">
            <TextReveal>We build the tech</TextReveal>
            <TextReveal className="bg-gradient-to-r from-accent-300 to-brand-300 bg-clip-text text-transparent">that runs your business</TextReveal>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-surface-600 dark:text-white/70 mb-10 max-w-xl leading-relaxed"
          >
            From cloud infrastructure to custom applications — Zentrix delivers
            engineering that scales. No hand-waving, no bloated teams. Just solid
            systems that work.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Magnetic>
              <Link href="/contact">
                <Button size="lg" className="shadow-xl shadow-brand-500/30">
                  Start a Project
                </Button>
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href="/services">
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-surface-700 hover:text-surface-900 hover:bg-surface-200/50 dark:text-white/90 dark:hover:text-white dark:hover:bg-white/10"
                >
                  What We Do
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </Link>
            </Magnetic>
          </motion.div>

          {/* Infinite Marquee for Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 w-full overflow-hidden relative"
          >
            <div className="flex items-center gap-4 mb-6 text-surface-400 dark:text-white/30 text-xs font-bold tracking-widest uppercase">
              <span className="w-12 h-[1px] bg-brand-500/30" />
              Trusted by industry leaders
            </div>
            
            <div className="relative group">
              {/* Gradient masks for smooth edges */}
              <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-surface-50 dark:from-surface-950 to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-surface-50 dark:from-surface-950 to-transparent z-10 pointer-events-none" />
              
              <motion.div 
                className="flex items-center gap-12 w-max"
                animate={{ x: [0, -1035] }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 30,
                    ease: "linear",
                  },
                }}
              >
                {[...Array(3)].map((_, groupIdx) => (
                  <div key={groupIdx} className="flex items-center gap-12">
                    {["FinStack", "MedVault", "RetailEdge", "EduBridge"].map((name) => (
                      <div
                        key={`${groupIdx}-${name}`}
                        className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/50 dark:bg-white/5 border border-surface-200/50 dark:border-white/5 backdrop-blur-sm hover:border-brand-500/50 dark:hover:border-brand-500/50 hover:shadow-xl hover:shadow-brand-500/10 transition-all cursor-pointer group/item"
                      >
                        <div className="w-2 h-2 rounded-full bg-brand-500/40 group-hover/item:bg-brand-500 transition-colors" />
                        <span className="font-display font-bold text-lg text-surface-400 dark:text-white/30 group-hover/item:text-brand-600 dark:group-hover/item:text-brand-400 transition-colors">
                          {name}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Unique Visual Effects: Floating UI Fragments */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none opacity-20 dark:opacity-40">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: [0.2, 0.5, 0.2],
              y: [0, -100, 0],
              x: [0, i % 2 === 0 ? 50 : -50, 0],
              rotate: [0, 45, 0]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5
            }}
            className="absolute p-4 border border-brand-500/20 rounded-xl bg-gradient-to-br from-brand-500/5 to-transparent backdrop-blur-[2px]"
            style={{
              top: `${20 + (i * 15)}%`,
              left: `${10 + (i * 20) % 80}%`,
              width: `${100 + i * 20}px`,
              height: `${60 + i * 10}px`,
            }}
          >
            <div className="w-1/2 h-1 bg-brand-500/20 rounded-full mb-2" />
            <div className="w-3/4 h-1 bg-brand-500/10 rounded-full mb-2" />
            <div className="w-1/4 h-1 bg-brand-100/20 rounded-full" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
