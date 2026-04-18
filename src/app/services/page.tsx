import { Metadata } from "next";
import Link from "next/link";
import { services } from "@/data/services";
import ServiceCard from "@/components/features/ServiceCard";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Six practice areas covering web development, mobile apps, cloud infrastructure, cybersecurity, data engineering, and design.",
};

const stats = [
  { value: "120+", label: "Projects delivered" },
  { value: "98%", label: "Client satisfaction" },
  { value: "10+", label: "Years average experience" },
  { value: "6", label: "Practice areas" },
];

export default function ServicesPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-20 md:pb-28">
        {/* Background mesh */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-500/5 dark:bg-brand-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent-500/5 dark:bg-accent-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container-wide mx-auto">
          <FadeIn>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/50 border border-brand-100 dark:border-brand-900/50 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
                <span className="text-xs font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-widest">
                  What we build
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black font-display text-surface-900 dark:text-white leading-[1.05] tracking-tight mb-6">
                Engineering that{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-brand-500 to-accent-500 bg-clip-text text-transparent">
                    ships
                  </span>
                  <span className="absolute bottom-1 left-0 right-0 h-3 bg-brand-100 dark:bg-brand-900/40 -z-0 rounded" />
                </span>
              </h1>

              <p className="text-xl text-surface-500 dark:text-surface-400 leading-relaxed max-w-2xl">
                Each practice area is led by a senior engineer with at least a decade in the field.
                We don&apos;t staff juniors on your project and hope for the best.
              </p>
            </div>
          </FadeIn>

          {/* Stats row */}
          <FadeIn delay={0.15}>
            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px bg-surface-200 dark:bg-surface-800 rounded-2xl overflow-hidden border border-surface-200 dark:border-surface-800">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-white dark:bg-surface-900 px-6 py-5 flex flex-col gap-1"
                >
                  <span className="text-3xl font-black text-surface-900 dark:text-white font-display">
                    {s.value}
                  </span>
                  <span className="text-sm text-surface-500 dark:text-surface-400">{s.label}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Services grid ────────────────────────────────────────────────── */}
      <section className="pb-24 md:pb-32">
        <div className="container-wide mx-auto">
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <StaggerItem key={service.id} className="h-full">
                <ServiceCard service={service} />
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── CTA band ─────────────────────────────────────────────────────── */}
      <section className="pb-24 md:pb-32">
        <div className="container-wide mx-auto">
          <FadeIn>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-surface-900 via-surface-900 to-surface-800 dark:from-surface-800 dark:via-surface-900 dark:to-surface-950 p-10 sm:p-16">
              {/* Glow orbs */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-accent-500/15 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                <div className="max-w-xl">
                  <h2 className="text-3xl sm:text-4xl font-black font-display text-white mb-3 leading-tight">
                    Not sure which service fits?
                  </h2>
                  <p className="text-surface-400 text-lg">
                    Book a free 30-minute scoping call. We&apos;ll map your problem to the right solution — no sales pitch.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-surface-900 font-bold text-sm hover:bg-surface-100 transition-colors shadow-lg"
                  >
                    Book a call
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                  <Link
                    href="/courses"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
                  >
                    Browse courses
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
