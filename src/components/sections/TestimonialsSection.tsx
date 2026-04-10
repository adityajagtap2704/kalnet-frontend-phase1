"use client";

import { testimonials } from "@/data/testimonials";
import TestimonialCard from "@/components/features/TestimonialCard";
import { FadeIn } from "@/components/animations";

import { motion } from "framer-motion";

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-surface-50 dark:bg-surface-900 overflow-hidden relative">
      <div className="container-wide mx-auto">
        <FadeIn>
          <div className="text-center mb-14">
            <span className="text-sm font-medium text-brand-500 dark:text-brand-400 uppercase tracking-wider">
              Client feedback
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-surface-900 dark:text-white mt-2 mb-4">
              What our clients say
            </h2>
            <p className="text-surface-500 dark:text-surface-400 max-w-2xl mx-auto">
              We let the work speak for itself. Here&apos;s what the people we&apos;ve
              built for think.
            </p>
          </div>
        </FadeIn>
      </div>

      {/* Infinite Horizontal Marquee */}
      <div className="w-full relative py-4">
        {/* Gradients for fading effect on the edges */}
        <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-surface-50 dark:from-surface-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-surface-50 dark:from-surface-900 to-transparent z-10 pointer-events-none" />
        
        <motion.div 
          className="flex gap-6 w-max items-stretch"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 40,
          }}
        >
          {/* Double the array for infinite scroll illusion */}
          {[...testimonials, ...testimonials].map((t, idx) => (
            <div key={`${t.id}-${idx}`} className="w-[320px] sm:w-[400px] flex px-2">
              <TestimonialCard testimonial={t} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
