"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { RootState, AppDispatch } from "@/store/redux/store";
import { logout } from "@/store/redux/slices/authSlice";
import { updateProgress, clearEnrollment, EnrolledCourse } from "@/store/redux/slices/enrollmentSlice";
import { courses } from "@/data/courses";
import { cn } from "@/lib/utils";

function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-xl bg-surface-200 dark:bg-surface-800", className)} />;
}
function StatCardSkeleton() {
  return (
    <div className="rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-5">
      <Skeleton className="w-10 h-10 rounded-xl mb-3" />
      <Skeleton className="w-16 h-7 mb-2" />
      <Skeleton className="w-24 h-3" />
    </div>
  );
}
function CourseCardSkeleton() {
  return (
    <div className="rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6">
      <div className="flex gap-4">
        <Skeleton className="w-12 h-12 rounded-xl flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="w-3/4 h-4" />
          <Skeleton className="w-1/2 h-3" />
          <Skeleton className="w-full h-2 mt-3" />
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color, delay }: { label: string; value: number | string; icon: string; color: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="group relative rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-5 overflow-hidden cursor-default hover:border-[var(--sc-border)] hover:shadow-[0_8px_32px_-4px_var(--sc-glow)] transition-all duration-300"
      style={{ "--sc-glow": `${color}35`, "--sc-border": `${color}55` } as React.CSSProperties}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${color}12 0%, transparent 70%)` }} />
      <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-3 transition-transform duration-300 group-hover:scale-110 relative"
        style={{ backgroundColor: `${color}15` }}>{icon}</div>
      <p className="text-2xl font-black text-surface-900 dark:text-white font-display relative">{value}</p>
      <p className="text-xs font-semibold mt-0.5 relative transition-colors duration-300 group-hover:text-[var(--sc-text)]"
        style={{ color: "#94a3b8", "--sc-text": color } as React.CSSProperties}>{label}</p>
    </motion.div>
  );
}

function LessonModal({ course, onClose, onComplete }: {
  course: EnrolledCourse;
  onClose: () => void;
  onComplete: (newCompletedCount: number) => void;
}) {
  const courseData = courses.find((c) => c.id === course.courseId);
  if (!courseData) return null;

  const lessons = courseData.curriculum.flatMap((module, mi) =>
    module.topics.map((topic, ti) => ({
      id: `${mi}-${ti}`,
      module: module.title,
      topic,
      index: courseData.curriculum.slice(0, mi).reduce((a, m) => a + m.topics.length, 0) + ti,
    }))
  );

  const completedCount = course.completedLessons;

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-white dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-800 shadow-2xl overflow-hidden"
      >
        <div className="p-5 border-b border-surface-100 dark:border-surface-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ backgroundColor: `${course.accent}15` }}>📖</div>
            <div>
              <h2 className="font-bold text-surface-900 dark:text-white text-sm leading-tight">{course.courseTitle}</h2>
              <p className="text-xs text-surface-400">{completedCount}/{course.totalLessons} lessons complete</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors text-surface-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-5 pt-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex-1 h-2 bg-surface-100 dark:bg-surface-800 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${course.progress}%`, backgroundColor: course.accent }} />
            </div>
            <span className="text-xs font-bold" style={{ color: course.accent }}>{course.progress}%</span>
          </div>
        </div>

        <div className="px-5 pb-5 max-h-80 overflow-y-auto space-y-1.5">
          {lessons.map((lesson) => {
            const isDone = lesson.index < completedCount;
            const isCurrent = lesson.index === completedCount;
            return (
              <button
                key={lesson.id}
                disabled={isDone || (!isCurrent)}
                onClick={() => { onComplete(lesson.index + 1); onClose(); }}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-150",
                  isDone && "opacity-60 cursor-default",
                  isCurrent && "cursor-pointer hover:opacity-90",
                  !isDone && !isCurrent && "opacity-30 cursor-not-allowed",
                )}
                style={isCurrent ? { backgroundColor: `${course.accent}10`, outline: `2px solid ${course.accent}` } : {}}
              >
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold",
                  isDone ? "bg-emerald-500 text-white" : "bg-surface-200 dark:bg-surface-700 text-surface-400"
                )} style={isCurrent ? { backgroundColor: course.accent, color: "white" } : {}}>
                  {isDone ? "✓" : lesson.index + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <p className={cn("text-xs font-medium truncate", isDone ? "text-surface-400 line-through" : "text-surface-900 dark:text-white")}>{lesson.topic}</p>
                  <p className="text-xs text-surface-400 truncate">{lesson.module}</p>
                </div>
                {isCurrent && (
                  <span className="text-xs font-bold flex-shrink-0 px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: course.accent }}>
                    Start →
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function DashboardClient() {
  const { user } = useSelector((s: RootState) => s.auth);
  const { enrolled } = useSelector((s: RootState) => s.enrollment);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [activeCourse, setActiveCourse] = useState<EnrolledCourse | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearEnrollment());
    router.push("/");
  };

  const handleLessonComplete = (courseId: string, newCompletedLessons: number, totalLessons: number, curriculum: typeof courses[0]["curriculum"]) => {
    const progress = Math.round((newCompletedLessons / totalLessons) * 100);
    const allTopics = curriculum.flatMap((m) => m.topics);
    const nextLesson = allTopics[newCompletedLessons] ?? "Course complete";
    dispatch(updateProgress({ courseId, progress, completedLessons: newCompletedLessons, nextLesson }));
  };

  const completed = enrolled.filter((e) => e.progress >= 100).length;
  const inProgress = enrolled.filter((e) => e.progress > 0 && e.progress < 100).length;
  const totalHours = enrolled.reduce((acc, e) => {
    const weeks = parseInt(e.duration) || 4;
    return acc + Math.round((e.progress / 100) * weeks * 5);
  }, 0);
  const avgProgress = enrolled.length ? Math.round(enrolled.reduce((a, e) => a + e.progress, 0) / enrolled.length) : 0;

  const stats = [
    { label: "Enrolled", value: enrolled.length, icon: "📚", color: "#3b82f6" },
    { label: "Completed", value: completed, icon: "✅", color: "#10b981" },
    { label: "In progress", value: inProgress, icon: "⚡", color: "#f59e0b" },
    { label: "Hours logged", value: totalHours, icon: "⏱️", color: "#a855f7" },
  ];

  const quickLinks = [
    { href: "/courses", label: "Browse courses", icon: "🎓", desc: "Find your next skill", color: "#3b82f6" },
    { href: "/internship", label: "Internship", icon: "🚀", desc: "3-month real-world track", color: "#10b981" },
    { href: "/corporate-training", label: "Corporate training", icon: "🏢", desc: "Train your whole team", color: "#a855f7" },
    { href: "/contact", label: "Get support", icon: "💬", desc: "We reply within 24h", color: "#f59e0b" },
  ];

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950">

      <AnimatePresence>
        {activeCourse && (
          <LessonModal
            course={activeCourse}
            onClose={() => setActiveCourse(null)}
            onComplete={(newCount) => {
              const courseData = courses.find((c) => c.id === activeCourse.courseId);
              if (courseData) handleLessonComplete(activeCourse.courseId, newCount, activeCourse.totalLessons, courseData.curriculum);
            }}
          />
        )}
      </AnimatePresence>

      <div className="relative overflow-hidden bg-gradient-to-br from-surface-900 via-surface-900 to-surface-800 dark:from-surface-800 dark:via-surface-900 dark:to-surface-950">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-accent-500/15 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="relative z-10 container-wide mx-auto py-8 flex items-center justify-between gap-4">
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center text-sm font-black text-white flex-shrink-0 ring-2 ring-white/20">
                {user?.name?.charAt(0).toUpperCase() ?? "?"}
              </div>
              <div>
                <h1 className="text-xl font-black font-display text-white leading-tight">Hey, {user?.name?.split(" ")[0] ?? "there"} 👋</h1>
                <p className="text-xs text-surface-400">
                  {enrolled.length === 0 ? "Start your learning journey today." : `${inProgress} course${inProgress !== 1 ? "s" : ""} in progress · ${avgProgress}% avg completion`}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="flex items-center gap-3">
            <Link href="/courses" className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-semibold hover:bg-white/20 transition-colors">
              + Browse courses
            </Link>
            <button onClick={handleLogout} className="px-4 py-2 rounded-full border border-white/20 text-sm font-medium text-white/70 hover:bg-white/10 transition-colors">
              Log out
            </button>
          </motion.div>
        </div>

        {enrolled.length > 0 && (
          <div className="relative z-10 container-wide mx-auto pb-6">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div className="h-full bg-gradient-to-r from-brand-400 to-accent-400 rounded-full"
                  initial={{ width: 0 }} animate={{ width: `${avgProgress}%` }} transition={{ duration: 1, delay: 0.5, ease: "easeOut" }} />
              </div>
              <span className="text-xs font-bold text-white/60 flex-shrink-0">{avgProgress}% overall</span>
            </div>
          </div>
        )}
      </div>

      <div className="container-wide mx-auto py-8 space-y-8">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {loading ? Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />) : stats.map((s, i) => <StatCard key={s.label} {...s} delay={i * 0.07} />)}
        </div>

        <section>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-black font-display text-surface-900 dark:text-white uppercase tracking-tight">My courses</h2>
            <Link href="/courses" className="text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors">+ Enroll in more</Link>
          </motion.div>

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div key="skeleton" className="space-y-4">
                {Array.from({ length: 2 }).map((_, i) => <CourseCardSkeleton key={i} />)}
              </motion.div>
            ) : enrolled.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl border-2 border-dashed border-surface-200 dark:border-surface-800 p-12 text-center">
                <p className="text-5xl mb-4">🎓</p>
                <h3 className="text-lg font-bold text-surface-900 dark:text-white mb-2">No courses yet</h3>
                <p className="text-sm text-surface-500 mb-6">Browse our catalogue and enroll in your first course.</p>
                <Link href="/courses" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-500 text-white font-bold text-sm hover:bg-brand-600 transition-colors">
                  Browse courses →
                </Link>
              </motion.div>
            ) : (
              <motion.div key="courses" className="space-y-4">
                {enrolled.map((course, i) => {
                  const pct = course.progress;
                  const isComplete = pct >= 100;
                  return (
                    <motion.div key={course.courseId}
                      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{ y: -2, transition: { duration: 0.2 } }}
                      className="group relative rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 overflow-hidden hover:border-[var(--cc-border)] hover:shadow-[0_8px_32px_-4px_var(--cc-glow)] transition-all duration-300"
                      style={{ "--cc-glow": `${course.accent}30`, "--cc-border": `${course.accent}45` } as React.CSSProperties}
                    >
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{ background: `radial-gradient(ellipse at 0% 50%, ${course.accent}10 0%, transparent 60%)` }} />
                      <div className="absolute left-0 top-4 bottom-4 w-1 rounded-r-full transition-all duration-300 group-hover:top-2 group-hover:bottom-2"
                        style={{ backgroundColor: course.accent }} />

                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 pl-4">
                        <div className="flex items-start gap-4 flex-1 min-w-0">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                            style={{ backgroundColor: `${course.accent}15` }}>📖</div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <h3 className="font-bold text-surface-900 dark:text-white truncate">{course.courseTitle}</h3>
                              {isComplete && (
                                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 flex-shrink-0">✓ Complete</span>
                              )}
                            </div>
                            <p className="text-xs text-surface-500 mb-3">by {course.instructor} · {course.duration} · {course.completedLessons}/{course.totalLessons} lessons</p>
                            <div className="flex items-center gap-3">
                              <div className="flex-1 h-2 bg-surface-100 dark:bg-surface-800 rounded-full overflow-hidden">
                                <motion.div className="h-full rounded-full" style={{ backgroundColor: course.accent }}
                                  initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: "easeOut" }} />
                              </div>
                              <span className="text-xs font-bold flex-shrink-0" style={{ color: course.accent }}>{pct}%</span>
                            </div>
                            {!isComplete && (
                              <p className="text-xs text-surface-400 mt-2">
                                Next: <span className="text-surface-600 dark:text-surface-300 font-medium">{course.nextLesson}</span>
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          {!isComplete ? (
                            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                              onClick={() => setActiveCourse(course)}
                              className="px-4 py-2 rounded-xl text-sm font-bold text-white shadow-md transition-shadow hover:shadow-lg"
                              style={{ backgroundColor: course.accent, boxShadow: `0 4px 14px ${course.accent}40` }}>
                              Continue →
                            </motion.button>
                          ) : (
                            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                              className="px-4 py-2 rounded-xl text-sm font-bold border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-colors">
                              View certificate
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 relative overflow-hidden rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-50/50 via-transparent to-accent-50/30 dark:from-brand-950/20 dark:via-transparent dark:to-accent-950/10 pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-xs font-bold uppercase tracking-widest text-surface-400 mb-5">Account</h2>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-400 to-accent-500 flex items-center justify-center text-2xl font-black text-white flex-shrink-0 shadow-lg shadow-brand-500/25">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white dark:border-surface-900" />
                </div>
                <div>
                  <p className="font-bold text-surface-900 dark:text-white text-lg">{user?.name}</p>
                  <p className="text-sm text-surface-500">{user?.email}</p>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 capitalize mt-1.5 inline-block border border-brand-100 dark:border-brand-900/50">
                    {user?.role}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 border-t border-surface-100 dark:border-surface-800 pt-5">
                {[
                  { label: "Member since", value: user?.joinedAt ? new Date(user.joinedAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" }) : "—" },
                  { label: "Enrolled", value: enrolled.length },
                  { label: "Avg progress", value: `${avgProgress}%` },
                ].map((item) => (
                  <div key={item.label} className="text-center p-3 rounded-xl bg-surface-50 dark:bg-surface-800/50">
                    <p className="text-lg font-black text-surface-900 dark:text-white font-display">{item.value}</p>
                    <p className="text-xs text-surface-400 mt-0.5">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {quickLinks.map((item, i) => (
              <motion.div key={item.href} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.45 + i * 0.07 }}>
                <Link href={item.href}
                  className="group flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 hover:border-[var(--ql-border)] hover:shadow-[0_4px_20px_-4px_var(--ql-glow)] transition-all duration-200"
                  style={{ "--ql-glow": `${item.color}30`, "--ql-border": `${item.color}45` } as React.CSSProperties}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                    style={{ backgroundColor: `${item.color}12` }}>{item.icon}</div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-surface-900 dark:text-white transition-colors duration-200 group-hover:text-[var(--ql-text)]"
                      style={{ "--ql-text": item.color } as React.CSSProperties}>{item.label}</p>
                    <p className="text-xs text-surface-400">{item.desc}</p>
                  </div>
                  <svg className="w-4 h-4 text-surface-300 dark:text-surface-600 ml-auto flex-shrink-0 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
