import { Metadata } from "next";
import Link from "next/link";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations";

export const metadata: Metadata = {
  title: "Internship Programme",
  description: "3-month paid internship on real client projects with senior mentorship and pre-placement offers.",
};

const timeline = [
  { week: "Week 1–2", title: "Onboarding & Setup", desc: "Meet your mentor, set up your dev environment, and get assigned to a live project." },
  { week: "Week 3–6", title: "First Sprint", desc: "Ship your first feature to production. Daily standups, code reviews, and pair programming." },
  { week: "Week 7–10", title: "Ownership", desc: "Lead a module end-to-end. You own the design, implementation, and deployment." },
  { week: "Week 11–12", title: "Demo & Evaluation", desc: "Present your work to the team. Top performers receive pre-placement offers." },
];

const perks = [
  { icon: "💰", title: "Paid stipend", desc: "₹10,000–₹20,000/month based on skills and performance.", color: "#10b981" },
  { icon: "🚀", title: "Production code", desc: "Your code ships to real users — not a sandbox.", color: "#3b82f6" },
  { icon: "🧑‍💻", title: "Senior mentors", desc: "1:1 weekly sessions with engineers who have 8+ years experience.", color: "#a855f7" },
  { icon: "📄", title: "PPO available", desc: "Top 30% of interns receive a full-time offer.", color: "#f59e0b" },
  { icon: "🏆", title: "Certificate", desc: "Industry-recognised completion certificate with project details.", color: "#ec4899" },
  { icon: "🌐", title: "Remote-first", desc: "Work from anywhere in India. Async-friendly culture.", color: "#06b6d4" },
];

const tracks = [
  { name: "Frontend Engineering", stack: ["React", "Next.js", "TypeScript", "Tailwind"], color: "#3b82f6" },
  { name: "Backend & APIs", stack: ["Node.js", "Prisma", "PostgreSQL", "REST/GraphQL"], color: "#10b981" },
  { name: "Cloud & DevOps", stack: ["AWS", "Docker", "Kubernetes", "Terraform"], color: "#a855f7" },
  { name: "UI/UX Design", stack: ["Figma", "User Research", "Prototyping", "Design Systems"], color: "#ec4899" },
];

const faqs = [
  { q: "Do I need prior experience?", a: "You need to have completed at least one of our courses or have equivalent demonstrable skills. We assess via a short technical task." },
  { q: "Is it remote or in-office?", a: "Fully remote. We use async communication tools and have weekly video syncs." },
  { q: "When does the next batch start?", a: "We run two batches per year — January and July. Applications open 6 weeks before start." },
  { q: "Can I do this alongside college?", a: "Yes. The programme is designed for 30–35 hours/week, which is manageable alongside studies." },
];

export default function InternshipPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-20 md:pb-28">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-[600px] h-[500px] bg-brand-500/6 dark:bg-brand-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/5 dark:bg-emerald-500/8 rounded-full blur-3xl" />
        </div>

        <div className="container-wide mx-auto">
          <FadeIn>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-900/50 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                  Applications open · July 2026 batch
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black font-display text-surface-900 dark:text-white leading-[1.05] tracking-tight mb-6">
                Build real products,{" "}
                <span className="bg-gradient-to-r from-emerald-500 to-brand-500 bg-clip-text text-transparent">
                  not toy projects
                </span>
              </h1>

              <p className="text-xl text-surface-500 dark:text-surface-400 leading-relaxed max-w-2xl mb-10">
                Our 3-month paid internship places you on actual client projects under senior mentorship.
                You&apos;ll write code that ships to production and graduate with experience that matters.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-emerald-500 text-white font-bold text-sm hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/25"
                >
                  Apply now
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
                <Link
                  href="/courses"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-300 font-semibold text-sm hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors"
                >
                  Browse prerequisite courses
                </Link>
              </div>
            </div>
          </FadeIn>

          {/* Key numbers */}
          <FadeIn delay={0.15}>
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-surface-200 dark:bg-surface-800 rounded-2xl overflow-hidden border border-surface-200 dark:border-surface-800">
              {[
                { value: "3 months", label: "Programme duration" },
                { value: "₹20K", label: "Max monthly stipend" },
                { value: "30%", label: "Receive PPO" },
                { value: "20", label: "Seats per batch" },
              ].map((s) => (
                <div key={s.label} className="bg-white dark:bg-surface-900 px-6 py-5 flex flex-col gap-1">
                  <span className="text-3xl font-black text-surface-900 dark:text-white font-display">{s.value}</span>
                  <span className="text-sm text-surface-500 dark:text-surface-400">{s.label}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Perks ── */}
      <section className="py-20 bg-surface-50 dark:bg-surface-900/40 border-y border-surface-100 dark:border-surface-800">
        <div className="container-wide mx-auto">
          <FadeIn>
            <p className="text-xs font-bold uppercase tracking-widest text-surface-400 mb-8">What you get</p>
          </FadeIn>
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {perks.map((p) => (
              <StaggerItem key={p.title}>
                <div
                  className="group relative p-6 rounded-2xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 h-full cursor-default
                    transition-all duration-300 hover:-translate-y-1
                    hover:border-[var(--pk-border)] hover:shadow-[0_8px_32px_-4px_var(--pk-glow)]"
                  style={{
                    "--pk-glow": `${p.color}35`,
                    "--pk-border": `${p.color}55`,
                  } as React.CSSProperties}
                >
                  {/* Radial bloom */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at 50% 0%, ${p.color}14 0%, transparent 70%)` }}
                  />
                  {/* Icon */}
                  <div className="relative mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${p.color}12` }}
                    >
                      {p.icon}
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md -z-10"
                        style={{ backgroundColor: `${p.color}30` }} />
                    </div>
                  </div>
                  <h3
                    className="relative font-bold text-surface-900 dark:text-white mb-2 font-display transition-colors duration-300 group-hover:text-[var(--pk-text)]"
                    style={{ "--pk-text": p.color } as React.CSSProperties}
                  >
                    {p.title}
                  </h3>
                  <p className="relative text-sm text-surface-500 dark:text-surface-400 leading-relaxed">{p.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── Tracks ── */}
      <section className="py-20 md:py-28">
        <div className="container-wide mx-auto">
          <FadeIn>
            <div className="max-w-xl mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-surface-400 mb-3">Specialisation tracks</p>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-surface-900 dark:text-white">
                Pick your track
              </h2>
              <p className="text-surface-500 dark:text-surface-400 mt-3">
                You&apos;ll be placed on a project that matches your chosen track and assessed skill level.
              </p>
            </div>
          </FadeIn>
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {tracks.map((t) => (
              <StaggerItem key={t.name}>
                <div
                  className="p-6 rounded-2xl border h-full"
                  style={{ borderColor: `${t.color}30`, backgroundColor: `${t.color}06` }}
                >
                  <h3 className="font-black text-lg font-display text-surface-900 dark:text-white mb-3">{t.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {t.stack.map((s) => (
                      <span
                        key={s}
                        className="px-3 py-1 text-xs font-semibold rounded-full"
                        style={{ backgroundColor: `${t.color}15`, color: t.color }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-20 bg-surface-50 dark:bg-surface-900/40 border-y border-surface-100 dark:border-surface-800">
        <div className="container-wide mx-auto">
          <FadeIn>
            <div className="max-w-xl mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-surface-400 mb-3">Programme structure</p>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-surface-900 dark:text-white">
                12 weeks, week by week
              </h2>
            </div>
          </FadeIn>
          <div className="relative max-w-2xl">
            <div className="absolute left-5 top-0 bottom-0 w-px bg-surface-200 dark:bg-surface-800" />
            <StaggerChildren className="space-y-8">
              {timeline.map((t, i) => (
                <StaggerItem key={t.week}>
                  <div className="flex gap-6 relative">
                    <div className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center text-white text-sm font-black flex-shrink-0 relative z-10">
                      {i + 1}
                    </div>
                    <div className="pt-1.5 pb-2">
                      <span className="text-xs font-bold text-brand-500 dark:text-brand-400 uppercase tracking-widest">{t.week}</span>
                      <h3 className="font-bold text-surface-900 dark:text-white mt-1 mb-1">{t.title}</h3>
                      <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed">{t.desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 md:py-28">
        <div className="container-wide mx-auto max-w-2xl">
          <FadeIn>
            <h2 className="text-3xl font-black font-display text-surface-900 dark:text-white mb-10">
              Common questions
            </h2>
          </FadeIn>
          <StaggerChildren className="space-y-4">
            {faqs.map((f) => (
              <StaggerItem key={f.q}>
                <div className="p-6 rounded-2xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800">
                  <h3 className="font-bold text-surface-900 dark:text-white mb-2">{f.q}</h3>
                  <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed">{f.a}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="pb-24 md:pb-32">
        <div className="container-wide mx-auto">
          <FadeIn>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-surface-900 via-surface-900 to-surface-800 dark:from-surface-800 dark:via-surface-900 dark:to-surface-950 p-10 sm:p-16 text-center">
              <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-brand-500/15 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />
              <div className="relative z-10 max-w-xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-black font-display text-white mb-4">
                  Ready to build something real?
                </h2>
                <p className="text-surface-400 mb-8">
                  Applications for the July 2026 batch are open. 20 seats available.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/25"
                >
                  Apply now →
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
