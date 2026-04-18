"use client";

import Link from "next/link";
import { Course, CourseLevel } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface CourseCardProps {
  course: Course;
}

const levelConfig: Record<CourseLevel, { label: string; color: string; bg: string; dot: string }> = {
  [CourseLevel.Beginner]: {
    label: "Beginner",
    color: "#10b981",
    bg: "#10b98115",
    dot: "bg-emerald-400",
  },
  [CourseLevel.Intermediate]: {
    label: "Intermediate",
    color: "#f59e0b",
    bg: "#f59e0b15",
    dot: "bg-amber-400",
  },
  [CourseLevel.Advanced]: {
    label: "Advanced",
    color: "#a855f7",
    bg: "#a855f715",
    dot: "bg-purple-400",
  },
};

// Deterministic accent per course id
const accentPalette = [
  "#3b82f6", "#10b981", "#a855f7", "#f59e0b", "#06b6d4", "#ec4899",
];
function courseAccent(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash);
  return accentPalette[Math.abs(hash) % accentPalette.length];
}

export default function CourseCard({ course }: CourseCardProps) {
  const level = levelConfig[course.level];
  const accent = courseAccent(course.id);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const spotY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative h-full rounded-2xl border border-surface-200 dark:border-surface-800",
        "bg-white dark:bg-surface-900 overflow-hidden",
        "transition-all duration-300 hover:-translate-y-1",
        "hover:shadow-[0_8px_40px_-8px_var(--card-glow)] hover:border-[var(--card-accent)]"
      )}
      style={{
        "--card-glow": `${accent}35`,
        "--card-accent": `${accent}50`,
      } as React.CSSProperties}
    >
      {/* Mouse-follow spotlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useTransform(
            [spotX, spotY],
            ([x, y]) =>
              `radial-gradient(350px circle at ${x}px ${y}px, ${accent}18, transparent 75%)`
          ),
        }}
      />

      {/* Accent top bar */}
      <div
        className="h-1 w-full transition-all duration-300 group-hover:h-1.5"
        style={{ background: `linear-gradient(90deg, ${accent}, ${accent}80)` }}
      />

      <div className="relative z-10 p-6 flex flex-col h-[calc(100%-4px)]">
        {/* Level + duration row */}
        <div className="flex items-center justify-between mb-4">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold"
            style={{ backgroundColor: level.bg, color: level.color }}
          >
            <span className={cn("w-1.5 h-1.5 rounded-full", level.dot)} />
            {level.label}
          </span>
          <span className="text-xs font-medium text-surface-400 dark:text-surface-500 flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {course.duration}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-surface-900 dark:text-white mb-2 font-display leading-snug group-hover:text-[var(--card-accent-text)] transition-colors">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed mb-4 line-clamp-3">
          {course.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {course.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 border border-surface-200 dark:border-surface-700"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Instructor */}
        <div className="flex items-center gap-2 mb-5 mt-auto">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0"
            style={{ backgroundColor: accent }}
          >
            {course.instructor.charAt(0)}
          </div>
          <span className="text-xs text-surface-500 dark:text-surface-400">
            by <span className="font-semibold text-surface-700 dark:text-surface-300">{course.instructor}</span>
          </span>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-surface-100 dark:border-surface-800 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-black text-surface-900 dark:text-white font-display">
              {formatCurrency(course.price)}
            </span>
            <span className="text-xs text-surface-400">one-time</span>
          </div>

          <div className="flex items-center gap-3 text-xs text-surface-500">
            {/* Rating */}
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-semibold text-surface-700 dark:text-surface-300">{course.rating}</span>
            </span>
            {/* Enrolled */}
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {course.enrolledCount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Enroll CTA — appears on hover */}
        <div className="mt-4 overflow-hidden max-h-0 group-hover:max-h-14 transition-all duration-300 ease-in-out">
          <Link href={`/enroll/${course.id}`}>
            <button
              className="w-full py-2.5 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: accent }}
            >
              Enroll now →
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
