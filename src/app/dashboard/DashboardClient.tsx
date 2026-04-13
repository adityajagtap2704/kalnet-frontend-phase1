"use client";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState, AppDispatch } from "@/store/redux/store";
import { logout } from "@/store/redux/slices/authSlice";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations";

const STATS = [
  { label: "Enrolled Courses", value: "3", icon: "📚" },
  { label: "Completed", value: "1", icon: "✅" },
  { label: "Certificates", value: "1", icon: "🏆" },
  { label: "Hours Logged", value: "47", icon: "⏱️" },
];

const COURSES = [
  { title: "Frontend Engineering Bootcamp", progress: 65, nextLesson: "React Hooks Deep Dive", dueDate: "Mar 28" },
  { title: "Full-Stack TypeScript", progress: 22, nextLesson: "Prisma Schema Design", dueDate: "Apr 3" },
  { title: "Cloud & DevOps Professional", progress: 8, nextLesson: "AWS VPC Setup", dueDate: "Apr 10" },
];

export default function DashboardClient() {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <section className="section-padding">
      <div className="container-wide mx-auto">
        <FadeIn>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
            <div>
              <h1 className="text-3xl font-bold font-display text-surface-900 dark:text-white">
                Hey, {user?.name || "there"}
              </h1>
              <p className="text-surface-500 text-sm mt-1">
                Here&apos;s what&apos;s happening in your account.
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>Log out</Button>
          </div>
        </FadeIn>

        {/* Stats */}
        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {STATS.map((stat) => (
            <StaggerItem key={stat.label}>
              <Card variant="bordered" padding="md">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{stat.icon}</span>
                  <div>
                    <p className="text-2xl font-bold text-surface-900 dark:text-white font-display">{stat.value}</p>
                    <p className="text-xs text-surface-500">{stat.label}</p>
                  </div>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>

        {/* Active courses */}
        <FadeIn>
          <h2 className="text-xl font-semibold text-surface-900 dark:text-white mb-4 font-display">Active courses</h2>
        </FadeIn>
        <StaggerChildren className="space-y-4 mb-10">
          {COURSES.map((course) => (
            <StaggerItem key={course.title}>
              <Card variant="bordered" padding="md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-surface-900 dark:text-white">{course.title}</h3>
                      <Badge variant="brand">{course.progress}%</Badge>
                    </div>
                    <p className="text-xs text-surface-500">Next: {course.nextLesson} · Due {course.dueDate}</p>
                    <div className="mt-2 w-full bg-surface-100 dark:bg-surface-700 rounded-full h-1.5">
                      <div className="bg-brand-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${course.progress}%` }} />
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Continue</Button>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>

        {/* Account info */}
        <FadeIn>
          <Card variant="bordered" padding="lg">
            <h2 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 font-display">Account details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              {[
                { label: "Name", value: user?.name },
                { label: "Email", value: user?.email },
                { label: "Role", value: user?.role },
                {
                  label: "Member since",
                  value: user?.joinedAt
                    ? new Date(user.joinedAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" })
                    : "—",
                },
              ].map(({ label, value }) => (
                <div key={label}>
                  <span className="text-surface-400">{label}</span>
                  <p className="text-surface-900 dark:text-white font-medium capitalize">{value}</p>
                </div>
              ))}
            </div>
          </Card>
        </FadeIn>

        {/* CTA */}
        <FadeIn>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl bg-surface-900 dark:bg-surface-800 border border-white/10 px-8 py-6">
            <div>
              <h3 className="text-lg font-black text-white uppercase tracking-tight">Ready to build?</h3>
              <p className="text-sm text-surface-400 mt-0.5">Join 150+ companies transformed by Zentrix engineering.</p>
            </div>
            <a href="/contact" className="flex-shrink-0 px-7 py-3 bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-brand-500/20 uppercase tracking-wide">
              Start a project
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
