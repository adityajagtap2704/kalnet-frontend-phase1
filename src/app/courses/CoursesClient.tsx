"use client";

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/redux/store";
import { loadCourses, setFilter } from "@/store/redux/slices/coursesSlice";
import { CourseLevel } from "@/types";
import CourseCard from "@/components/features/CourseCard";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations";
import Spinner from "@/components/ui/Spinner";
import Link from "next/link";
import { cn } from "@/lib/utils";

const FILTERS: { value: string; label: string }[] = [
  { value: "all", label: "All Levels" },
  { value: CourseLevel.Beginner, label: "Beginner" },
  { value: CourseLevel.Intermediate, label: "Intermediate" },
  { value: CourseLevel.Advanced, label: "Advanced" },
];

const stats = [
  { value: "1,300+", label: "Students enrolled" },
  { value: "4.8★", label: "Average rating" },
  { value: "6", label: "Live courses" },
  { value: "100%", label: "Practitioner-taught" },
];

const outcomes = [
  { icon: "🎯", title: "Job-ready skills", desc: "Curriculum built around what hiring managers actually test for." },
  { icon: "🛠️", title: "Real projects", desc: "Every course ships something to production — no toy apps." },
  { icon: "👥", title: "Small cohorts", desc: "Max 20 students per batch so you get actual feedback." },
  { icon: "♾️", title: "Lifetime access", desc: "Pay once, access forever including all future updates." },
];

export default function CoursesClient() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, filter } = useSelector((state: RootState) => state.courses);

  useEffect(() => {
    if (items.length === 0) dispatch(loadCourses());
  }, [dispatch, items.length]);

  const filteredCourses = useMemo(
    () => (filter === "all" ? items : items.filter((c) => c.level === filter)),
    [items, filter]
  );

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-16 pb-16 md:pt-20 md:pb-20">
        {/* Ambient blobs */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-brand-500/6 dark:bg-brand-500/10 rounded-full blur-3xl" />
          <div className="absolute top-20 right-1/4 w-[350px] h-[350px] bg-accent-500/5 dark:bg-accent-500/8 rounded-full blur-3xl" />
        </div>

        <div className="container-wide mx-auto">
          <FadeIn>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/50 border border-brand-100 dark:border-brand-900/50 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
                <span className="text-xs font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-widest">
                  Courses & Training
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black font-display text-surface-900 dark:text-white leading-[1.05] tracking-tight mb-6">
                Learn from{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-brand-500 to-accent-500 bg-clip-text text-transparent">
                    practitioners
                  </span>
                  <span className="absolute bottom-1 left-0 right-0 h-3 bg-brand-100 dark:bg-brand-900/40 -z-0 rounded" />
                </span>
              </h1>

              <p className="text-xl text-surface-500 dark:text-surface-400 leading-relaxed max-w-2xl">
                Every course is designed and taught by engineers who do this work daily —
                not career trainers. Small cohorts, real projects, actual feedback.
              </p>
            </div>
          </FadeIn>

          {/* Stats */}
          <FadeIn delay={0.15}>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-surface-200 dark:bg-surface-800 rounded-2xl overflow-hidden border border-surface-200 dark:border-surface-800">
              {stats.map((s) => (
                <div key={s.label} className="bg-white dark:bg-surface-900 px-6 py-5 flex flex-col gap-1">
                  <span className="text-3xl font-black text-surface-900 dark:text-white font-display">{s.value}</span>
                  <span className="text-sm text-surface-500 dark:text-surface-400">{s.label}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Why learn here ───────────────────────────────────────────────── */}
      <section className="py-12 md:py-16 bg-surface-50 dark:bg-surface-900/40 border-y border-surface-100 dark:border-surface-800">
        <div className="container-wide mx-auto">
          <FadeIn>
            <p className="text-xs font-bold uppercase tracking-widest text-surface-400 dark:text-surface-500 mb-8">
              Why learn here
            </p>
          </FadeIn>
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {outcomes.map((o, i) => {
              const glowColors = ["#3b82f6", "#10b981", "#a855f7", "#f59e0b"];
              const glow = glowColors[i % glowColors.length];
              return (
                <StaggerItem key={o.title}>
                  <div
                    className="group relative p-6 rounded-2xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 h-full cursor-default
                      transition-all duration-300
                      hover:-translate-y-1
                      hover:border-[var(--card-border)]
                      hover:shadow-[0_8px_32px_-4px_var(--card-glow)]"
                    style={{
                      "--card-glow": `${glow}35`,
                      "--card-border": `${glow}50`,
                    } as React.CSSProperties}
                  >
                    {/* Glow background bloom */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{ background: `radial-gradient(ellipse at 50% 0%, ${glow}12 0%, transparent 70%)` }}
                    />

                    {/* Icon with colored ring on hover */}
                    <div
                      className="relative w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 transition-all duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${glow}12` }}
                    >
                      {o.icon}
                      <div
                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"
                        style={{ backgroundColor: `${glow}30` }}
                      />
                    </div>

                    <h3
                      className="relative font-bold text-surface-900 dark:text-white mb-2 font-display transition-colors duration-300"
                      style={{ color: undefined }}
                    >
                      <span className="group-hover:text-[var(--card-text)] transition-colors duration-300"
                        style={{ "--card-text": glow } as React.CSSProperties}>
                        {o.title}
                      </span>
                    </h3>
                    <p className="relative text-sm text-surface-500 dark:text-surface-400 leading-relaxed">{o.desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerChildren>
        </div>
      </section>

      {/* ── Course grid ──────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="container-wide mx-auto">
          <FadeIn>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black font-display text-surface-900 dark:text-white">
                  {filter === "all" ? "All courses" : `${filter} courses`}
                  <span className="ml-2 text-lg font-medium text-surface-400">
                    ({filteredCourses.length})
                  </span>
                </h2>
              </div>

              {/* Filter pills */}
              <div className="flex flex-wrap gap-2">
                {FILTERS.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => dispatch(setFilter(f.value))}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200",
                      filter === f.value
                        ? "bg-brand-500 text-white shadow-lg shadow-brand-500/25 scale-105"
                        : "bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-700"
                    )}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <Spinner size="lg" />
              <p className="text-sm text-surface-400">Loading courses…</p>
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-24">
              <span className="text-5xl mb-4 block">🔍</span>
              <p className="text-lg font-semibold text-surface-700 dark:text-surface-300 mb-1">No courses found</p>
              <p className="text-sm text-surface-400">Try a different level filter.</p>
            </div>
          ) : (
            <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <StaggerItem key={course.id} className="h-full">
                  <CourseCard course={course} />
                </StaggerItem>
              ))}
            </StaggerChildren>
          )}
        </div>
      </section>

      {/* ── Internship band ──────────────────────────────────────────────── */}
      <section className="pb-10 md:pb-12">
        <div className="container-wide mx-auto">
          <FadeIn>
            <div
              id="internship"
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-surface-900 via-surface-900 to-surface-800 dark:from-surface-800 dark:via-surface-900 dark:to-surface-950 p-10 sm:p-16"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-500/15 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

              <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
                <div className="max-w-xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 mb-5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-semibold text-white/80 uppercase tracking-widest">
                      Internship Programme
                    </span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-black font-display text-white mb-4 leading-tight">
                    Build real products,<br />not toy projects
                  </h2>

                  <p className="text-surface-400 text-lg leading-relaxed mb-8">
                    Our 3-month internship places you on actual client projects under senior mentorship.
                    You&apos;ll write code that ships to production and graduate with experience that matters.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { icon: "📅", label: "3 months", sub: "Duration" },
                      { icon: "💰", label: "Paid stipend", sub: "Monthly" },
                      { icon: "🚀", label: "PPO available", sub: "Pre-placement" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                        <span className="text-xl">{item.icon}</span>
                        <div>
                          <p className="text-sm font-bold text-white">{item.label}</p>
                          <p className="text-xs text-surface-500">{item.sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3 flex-shrink-0 w-full lg:w-auto">
                  <Link
                    href="/internship"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-emerald-500 text-white font-bold text-sm hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/25 whitespace-nowrap"
                  >
                    Learn more & apply →
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition-colors whitespace-nowrap"
                  >
                    Talk to us
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Corporate Training band ───────────────────────────────────────── */}
      <section className="pb-24 md:pb-32">
        <div className="container-wide mx-auto">
          <FadeIn>
            <div className="relative overflow-hidden rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-10 sm:p-16">
              <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

              <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
                <div className="max-w-xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/50 border border-brand-100 dark:border-brand-900/50 mb-5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                    <span className="text-xs font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-widest">
                      Corporate Training
                    </span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-black font-display text-surface-900 dark:text-white mb-4 leading-tight">
                    Upskill your entire team
                  </h2>

                  <p className="text-surface-500 dark:text-surface-400 text-lg leading-relaxed mb-6">
                    Custom training programmes built around your stack and goals.
                    Delivered on-site or remote, with progress reporting for management.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {["Custom curriculum", "5–500 engineers", "Free pilot session", "90-day support"].map((tag) => (
                      <span key={tag} className="flex items-center gap-1.5 text-sm text-surface-600 dark:text-surface-400">
                        <svg className="w-4 h-4 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3 flex-shrink-0 w-full lg:w-auto">
                  <Link
                    href="/corporate-training"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-brand-500 text-white font-bold text-sm hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/25 whitespace-nowrap"
                  >
                    View programmes →
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-300 font-semibold text-sm hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors whitespace-nowrap"
                  >
                    Request a proposal
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
