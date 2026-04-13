"use client";

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/redux/store";
import { loadCourses, setFilter } from "@/store/redux/slices/coursesSlice";
import { CourseLevel } from "@/types";
import CourseCard from "@/components/features/CourseCard";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations";
import Spinner from "@/components/ui/Spinner";

const FILTERS = ["all", CourseLevel.Beginner, CourseLevel.Intermediate, CourseLevel.Advanced];

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
    <section className="section-padding">
      <div className="container-wide mx-auto">
        <FadeIn>
          <div className="max-w-2xl mb-10">
            <span className="text-sm font-medium text-brand-500 dark:text-brand-400 uppercase tracking-wider">
              Courses & Training
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold font-display text-surface-900 dark:text-white mt-2 mb-4">
              Learn from practitioners
            </h1>
            <p className="text-lg text-surface-500 dark:text-surface-400">
              Every course is designed and taught by engineers who do this work
              daily — not career trainers. Small cohorts, real projects, actual feedback.
            </p>
          </div>
        </FadeIn>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => dispatch(setFilter(f))}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filter === f
                  ? "bg-brand-500 text-white shadow-lg shadow-brand-500/25"
                  : "bg-surface-100 text-surface-600 hover:bg-surface-200 dark:bg-surface-800 dark:text-surface-400 dark:hover:bg-surface-700"
              }`}
            >
              {f === "all" ? "All Levels" : f}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Spinner size="lg" />
          </div>
        ) : (
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <StaggerItem key={course.id}>
                <CourseCard course={course} />
              </StaggerItem>
            ))}
          </StaggerChildren>
        )}

        {!loading && filteredCourses.length === 0 && (
          <div className="text-center py-16">
            <p className="text-surface-400">No courses found for this filter.</p>
          </div>
        )}

        {/* Internship section */}
        <FadeIn>
          <div id="internship" className="mt-20 rounded-2xl bg-gradient-to-r from-brand-50 to-accent-50 dark:from-brand-950/30 dark:to-accent-950/30 border border-brand-100 dark:border-brand-900/30 p-8 sm:p-12">
            <div className="max-w-2xl">
              <span className="text-sm font-medium text-brand-500 dark:text-brand-400 uppercase tracking-wider">
                Internship Programme
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-surface-900 dark:text-white mt-2 mb-4">
                Build real products, not toy projects
              </h2>
              <p className="text-surface-600 dark:text-surface-400 mb-6">
                Our 3-month internship places you on actual client projects under senior mentorship.
                You&apos;ll write code that ships to production and graduate with experience that matters.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-surface-500">
                {["3 months duration", "Paid stipend", "Pre-placement offers"].map((item) => (
                  <span key={item} className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
