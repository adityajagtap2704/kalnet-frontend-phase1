"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RootState, AppDispatch } from "@/store/redux/store";
import { enroll } from "@/store/redux/slices/enrollmentSlice";
import { courses } from "@/data/courses";
import { formatCurrency, cn } from "@/lib/utils";
import { FadeIn } from "@/components/animations";

// Deterministic accent (same logic as CourseCard)
const accentPalette = ["#3b82f6", "#10b981", "#a855f7", "#f59e0b", "#06b6d4", "#ec4899"];
function courseAccent(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash);
  return accentPalette[Math.abs(hash) % accentPalette.length];
}

interface Props {
  courseId: string;
}

export default function EnrollClient({ courseId }: Props) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, user } = useSelector((s: RootState) => s.auth);
  const enrolled = useSelector((s: RootState) => s.enrollment.enrolled);

  const course = courses.find((c) => c.id === courseId);
  const accent = course ? courseAccent(course.id) : "#3b82f6";
  const alreadyEnrolled = enrolled.some((e) => e.courseId === courseId);

  const [enrolling, setEnrolling] = useState(false);
  const [done, setDone] = useState(false);

  // Redirect to login if not authenticated, preserving return URL
  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=/enroll/${courseId}`);
    }
  }, [isAuthenticated, courseId, router]);

  if (!course) {
    return (
      <section className="section-padding flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-4xl mb-4">🔍</p>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white mb-2">Course not found</h1>
          <Link href="/courses" className="text-brand-500 hover:underline text-sm">Browse all courses</Link>
        </div>
      </section>
    );
  }

  if (!isAuthenticated) {
    return (
      <section className="section-padding flex items-center justify-center min-h-[60vh]">
        <p className="text-surface-400 text-sm">Redirecting to login…</p>
      </section>
    );
  }

  const handleEnroll = async () => {
    if (alreadyEnrolled) { router.push("/dashboard"); return; }
    setEnrolling(true);
    await new Promise((r) => setTimeout(r, 1200));
    dispatch(
      enroll({
        courseId: course.id,
        courseTitle: course.title,
        enrolledAt: new Date().toISOString(),
        progress: 0,
        nextLesson: course.curriculum[0]?.topics[0] ?? "Introduction",
        instructor: course.instructor,
        accent,
        duration: course.duration,
        completedLessons: 0,
        totalLessons: course.curriculum.reduce((acc, m) => acc + m.topics.length, 0),
      })
    );
    setEnrolling(false);
    setDone(true);
  };

  return (
    <section className="relative overflow-hidden pt-16 pb-24 md:pt-20 min-h-[80vh]">
      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-3xl opacity-10 pointer-events-none -z-10"
        style={{ backgroundColor: accent }}
      />

      <div className="container-wide mx-auto max-w-2xl">
        <FadeIn>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-surface-400 mb-10">
            <Link href="/courses" className="hover:text-brand-500 transition-colors">Courses</Link>
            <svg className="w-3.5 h-3.5 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-surface-600 dark:text-surface-300 truncate">{course.title}</span>
            <svg className="w-3.5 h-3.5 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-surface-600 dark:text-surface-300">Enroll</span>
          </nav>

          {done ? (
            /* ── Success state ── */
            <div className="text-center py-12">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl"
                style={{ backgroundColor: `${accent}18` }}
              >
                🎉
              </div>
              <h1 className="text-3xl font-black font-display text-surface-900 dark:text-white mb-3">
                You&apos;re enrolled!
              </h1>
              <p className="text-surface-500 dark:text-surface-400 mb-8 text-lg">
                Welcome to <span className="font-semibold text-surface-700 dark:text-surface-200">{course.title}</span>.
                Your learning journey starts now.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-white font-bold text-sm transition-opacity hover:opacity-90"
                  style={{ backgroundColor: accent }}
                >
                  Go to Dashboard →
                </Link>
                <Link
                  href="/courses"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-300 font-semibold text-sm hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors"
                >
                  Browse more courses
                </Link>
              </div>
            </div>
          ) : (
            /* ── Enrollment card ── */
            <div className="rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 overflow-hidden shadow-xl shadow-black/5">
              {/* Accent header */}
              <div className="h-2" style={{ background: `linear-gradient(90deg, ${accent}, ${accent}80)` }} />

              <div className="p-8 sm:p-10">
                {/* Course info */}
                <div className="flex items-start gap-4 mb-8">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ backgroundColor: `${accent}15` }}
                  >
                    📚
                  </div>
                  <div>
                    <h1 className="text-2xl font-black font-display text-surface-900 dark:text-white leading-tight mb-1">
                      {course.title}
                    </h1>
                    <p className="text-sm text-surface-500 dark:text-surface-400">
                      by {course.instructor} · {course.duration}
                    </p>
                  </div>
                </div>

                {/* What you get */}
                <div className="mb-8">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-surface-400 mb-4">
                    What&apos;s included
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      `${course.curriculum.reduce((a, m) => a + m.topics.length, 0)} lessons`,
                      `${course.duration} programme`,
                      "Certificate on completion",
                      "Lifetime access",
                      "Real project work",
                      "Mentor feedback",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2.5 text-sm text-surface-700 dark:text-surface-300">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${accent}18`, color: accent }}
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-surface-100 dark:border-surface-800 mb-8" />

                {/* Logged in as */}
                <div className="flex items-center gap-3 mb-8 p-4 rounded-xl bg-surface-50 dark:bg-surface-800/50 border border-surface-100 dark:border-surface-800">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black text-white flex-shrink-0"
                    style={{ backgroundColor: accent }}
                  >
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-surface-900 dark:text-white truncate">{user?.name}</p>
                    <p className="text-xs text-surface-400 truncate">{user?.email}</p>
                  </div>
                  <span className="ml-auto text-xs font-medium text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-1 rounded-full flex-shrink-0">
                    ✓ Logged in
                  </span>
                </div>

                {/* Price + CTA */}
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-3xl font-black text-surface-900 dark:text-white font-display">
                      {formatCurrency(course.price)}
                    </p>
                    <p className="text-xs text-surface-400">one-time · no subscription</p>
                  </div>

                  <button
                    onClick={handleEnroll}
                    disabled={enrolling || alreadyEnrolled}
                    className={cn(
                      "flex items-center gap-2 px-8 py-3.5 rounded-full text-white font-bold text-sm transition-all",
                      "disabled:opacity-70 disabled:cursor-not-allowed",
                      "hover:opacity-90 active:scale-95"
                    )}
                    style={{ backgroundColor: accent }}
                  >
                    {enrolling ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Processing…
                      </>
                    ) : alreadyEnrolled ? (
                      "Already enrolled →"
                    ) : (
                      "Confirm enrollment →"
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
