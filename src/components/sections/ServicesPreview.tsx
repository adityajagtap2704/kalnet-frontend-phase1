"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { services } from "@/data/services";
import { FadeIn } from "@/components/animations";



/* ─── Main ────────────────────────────────────────────────────────────────── */
export default function ServicesPreview() {
  const [active, setActive] = useState(0);
  const current = services[active];
  const Icon = (Icons[current.icon as keyof typeof Icons] ?? Icons.Zap) as LucideIcon;

  return (
    <section className="bg-surface-50 dark:bg-surface-950 relative overflow-hidden transition-colors duration-500">

      {/* Noise texture — dark only */}
      <div
        className="absolute inset-0 opacity-0 dark:opacity-[0.025] pointer-events-none transition-opacity duration-500"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Dynamic accent glow — subtle in light, vivid in dark */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.accentColor}
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            background: `radial-gradient(ellipse 60% 50% at 80% 50%, ${current.accentColor}10, transparent 70%)`,
          }}
        />
      </AnimatePresence>

      <div className="container-wide mx-auto pt-16 relative z-10">
        {/* Header */}
        <FadeIn>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-6 h-[2px] bg-brand-500" />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-500 dark:text-brand-400">
                Services
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-surface-900 dark:text-white leading-[1.1] tracking-tight">
                What we{" "}
                <span className="transition-colors duration-700" style={{ color: current.accentColor }}>
                  engineer
                </span>
              </h2>
              <p className="text-sm text-surface-500 dark:text-surface-400 max-w-[220px] leading-relaxed sm:text-right shrink-0">
                Six practice areas, one team.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Split layout */}
      <div className="container-wide mx-auto pb-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start max-w-5xl">

          {/* LEFT — numbered list */}
          <div className="space-y-0">
            {services.map((service, i) => {
              const SIcon = (Icons[service.icon as keyof typeof Icons] ?? Icons.Zap) as LucideIcon;
              const isActive = active === i;
              return (
                <motion.button
                  key={service.id}
                  onClick={() => setActive(i)}
                  onHoverStart={() => setActive(i)}
                  className="w-full text-left group relative"
                  whileTap={{ scale: 0.99 }}
                >
                  {/* Active bar */}
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full"
                    animate={{
                      backgroundColor: isActive ? service.accentColor : "transparent",
                      opacity: isActive ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  <div
                    className={`flex items-center gap-5 px-6 py-4 transition-all duration-300 rounded-r-xl ${
                      isActive
                        ? "bg-surface-100 dark:bg-white/[0.04]"
                        : "hover:bg-surface-100/60 dark:hover:bg-white/[0.02]"
                    }`}
                  >
                    {/* Number */}
                    <span
                      className="text-[11px] font-black tabular-nums transition-colors duration-300 w-6 flex-shrink-0"
                      style={{
                        color: isActive
                          ? service.accentColor
                          : undefined,
                      }}
                    >
                      <span className={isActive ? "" : "text-surface-300 dark:text-white/15"}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </span>

                    {/* Icon */}
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300"
                      style={{
                        backgroundColor: isActive
                          ? `${service.accentColor}20`
                          : undefined,
                        color: isActive ? service.accentColor : undefined,
                      }}
                    >
                      <SIcon
                        size={16}
                        strokeWidth={2}
                        className={
                          isActive
                            ? ""
                            : "text-surface-400 dark:text-white/30"
                        }
                      />
                    </div>

                    {/* Title */}
                    <span
                      className={`text-base font-bold transition-colors duration-300 flex-1 ${
                        isActive
                          ? "text-surface-950 dark:text-white"
                          : "text-surface-400 dark:text-white/40"
                      }`}
                    >
                      {service.title}
                    </span>

                    {/* Arrow */}
                    <motion.div
                      animate={{ x: isActive ? 0 : -6, opacity: isActive ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        style={{ color: current.accentColor }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Divider */}
                  <div className="h-[1px] bg-surface-200 dark:bg-white/[0.04] mx-6" />
                </motion.button>
              );
            })}

            {/* CTA below list */}
            <div className="px-6 pt-8 flex gap-3">
              <Link
                href="/services"
                className="px-5 py-2.5 rounded-xl border border-surface-300 dark:border-white/10 text-sm font-semibold text-surface-600 dark:text-white/60 hover:text-surface-900 dark:hover:text-white hover:border-surface-400 dark:hover:border-white/20 transition-all"
              >
                All services
              </Link>
              <Link
                href="/contact"
                className="px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all shadow-lg"
                style={{
                  backgroundColor: current.accentColor,
                  boxShadow: `0 8px 30px ${current.accentColor}40`,
                }}
              >
                Start a project →
              </Link>
            </div>
          </div>

          {/* RIGHT — detail panel */}
          <div className="hidden lg:block sticky top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {/* Big icon */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                  style={{
                    backgroundColor: `${current.accentColor}15`,
                    boxShadow: `0 0 40px ${current.accentColor}20`,
                  }}
                >
                  <Icon size={26} strokeWidth={1.5} style={{ color: current.accentColor }} />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-surface-950 dark:text-white font-display mb-3 leading-tight">
                  {current.title}
                </h3>

                {/* Long description */}
                <p className="text-surface-500 dark:text-surface-400 text-sm leading-relaxed mb-6">
                  {current.longDescription}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {current.features.map((f) => (
                    <div
                      key={f}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 border border-surface-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.03]"
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: current.accentColor }}
                      />
                      <span className="text-xs font-medium text-surface-700 dark:text-white/70">{f}</span>
                    </div>
                  ))}
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {current.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded-full text-xs font-semibold border"
                      style={{
                        borderColor: `${current.accentColor}40`,
                        color: current.accentColor,
                        backgroundColor: `${current.accentColor}10`,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <Link
                  href={`/services/${current.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-bold transition-opacity hover:opacity-70"
                  style={{ color: current.accentColor }}
                >
                  Explore {current.title}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* Stats bar — removed */}
    </section>
  );
}
