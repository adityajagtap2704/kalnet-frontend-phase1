import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { services } from "@/data/services";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ServiceCard from "@/components/features/ServiceCard";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return {};
  return { title: service.title, description: service.description };
}

export default function ServiceDetailPage({ params }: Props) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) notFound();

  const Icon = (Icons[service.icon as keyof typeof Icons] || Icons.HelpCircle) as LucideIcon;
  const accent = service.accentColor ?? "#3b82f6";
  const related = services.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-16 pb-16 md:pt-20 md:pb-20">
        {/* Ambient glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-3xl opacity-10 pointer-events-none -z-10"
          style={{ backgroundColor: accent }}
        />

        <div className="container-wide mx-auto">
          <FadeIn>
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-surface-400 mb-10">
              <Link href="/services" className="hover:text-brand-500 transition-colors">
                Services
              </Link>
              <svg className="w-3.5 h-3.5 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-surface-600 dark:text-surface-300">{service.title}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
              {/* ── Left: main content ── */}
              <div className="lg:col-span-3">
                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-lg"
                  style={{ backgroundColor: `${accent}18`, color: accent }}
                >
                  <Icon size={32} strokeWidth={1.5} />
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display text-surface-900 dark:text-white leading-[1.05] tracking-tight mb-5">
                  {service.title}
                </h1>

                <p className="text-xl text-surface-500 dark:text-surface-400 leading-relaxed mb-10">
                  {service.longDescription}
                </p>

                {/* Features */}
                <h2 className="text-lg font-bold text-surface-900 dark:text-white mb-5 font-display uppercase tracking-wide">
                  What&apos;s included
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
                  {service.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3 p-4 rounded-xl bg-surface-50 dark:bg-surface-800/50 border border-surface-100 dark:border-surface-800"
                    >
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${accent}18`, color: accent }}
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-surface-700 dark:text-surface-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Process steps */}
                <h2 className="text-lg font-bold text-surface-900 dark:text-white mb-5 font-display uppercase tracking-wide">
                  How we work
                </h2>
                <div className="space-y-4">
                  {["Discovery & scoping", "Architecture & planning", "Build & iterate", "Ship & support"].map(
                    (step, i) => (
                      <div key={step} className="flex items-center gap-4">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 text-white"
                          style={{ backgroundColor: accent }}
                        >
                          {i + 1}
                        </div>
                        <div className="flex-1 h-px bg-surface-200 dark:bg-surface-700" />
                        <span className="text-sm font-semibold text-surface-700 dark:text-surface-300 flex-shrink-0">
                          {step}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* ── Right: sticky sidebar ── */}
              <div className="lg:col-span-2">
                <div className="sticky top-24 space-y-4">
                  {/* Tech stack card */}
                  <div className="rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 shadow-sm">
                    <h3 className="text-sm font-bold text-surface-900 dark:text-white mb-4 uppercase tracking-widest">
                      Tech stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 text-xs font-semibold rounded-full border"
                          style={{
                            backgroundColor: `${accent}10`,
                            borderColor: `${accent}30`,
                            color: accent,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA card */}
                  <div
                    className="rounded-2xl p-6 text-white relative overflow-hidden"
                    style={{ backgroundColor: accent }}
                  >
                    <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/10 blur-2xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
                    <div className="relative z-10">
                      <h3 className="text-lg font-black mb-2 font-display">
                        Ready to start?
                      </h3>
                      <p className="text-sm text-white/80 mb-5 leading-relaxed">
                        Tell us about your project and we&apos;ll get back within one business day.
                      </p>
                      <Link href="/contact">
                        <button className="w-full py-3 rounded-xl bg-white font-bold text-sm transition-opacity hover:opacity-90" style={{ color: accent }}>
                          Get a free quote
                        </button>
                      </Link>
                    </div>
                  </div>

                  {/* Trust signals */}
                  <div className="rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 shadow-sm">
                    <div className="space-y-3">
                      {[
                        { icon: "🔒", text: "NDA signed before kickoff" },
                        { icon: "⚡", text: "First draft in 5 business days" },
                        { icon: "🔄", text: "Unlimited revisions in scope" },
                        { icon: "📞", text: "Weekly progress calls" },
                      ].map((item) => (
                        <div key={item.text} className="flex items-center gap-3 text-sm text-surface-600 dark:text-surface-400">
                          <span className="text-base">{item.icon}</span>
                          {item.text}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Related services ─────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-surface-50 dark:bg-surface-900/40 border-t border-surface-100 dark:border-surface-800">
        <div className="container-wide mx-auto">
          <FadeIn>
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-surface-400 dark:text-surface-500">
                  Explore more
                </span>
                <h2 className="text-2xl sm:text-3xl font-black font-display text-surface-900 dark:text-white mt-1">
                  Other services
                </h2>
              </div>
              <Link
                href="/services"
                className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors"
              >
                View all
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </FadeIn>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((s) => (
              <StaggerItem key={s.id} className="h-full">
                <ServiceCard service={s} />
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>
    </>
  );
}
