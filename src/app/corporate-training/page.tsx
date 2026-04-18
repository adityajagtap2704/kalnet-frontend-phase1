import { Metadata } from "next";
import Link from "next/link";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations";

export const metadata: Metadata = {
  title: "Corporate Training",
  description: "Upskill your entire engineering team with custom training programmes designed around your stack and goals.",
};

const offerings = [
  {
    icon: "🎯",
    title: "Custom curriculum",
    desc: "We build the syllabus around your actual tech stack, not a generic template.",
    color: "#3b82f6",
  },
  {
    icon: "👥",
    title: "Team cohorts",
    desc: "Train 5 to 500 engineers together. Cohort learning accelerates adoption.",
    color: "#10b981",
  },
  {
    icon: "🏢",
    title: "On-site or remote",
    desc: "We come to your office or run fully remote sessions — your choice.",
    color: "#a855f7",
  },
  {
    icon: "📊",
    title: "Progress reporting",
    desc: "Weekly reports for managers showing completion rates and skill assessments.",
    color: "#f59e0b",
  },
  {
    icon: "🔄",
    title: "Ongoing support",
    desc: "Post-training Slack channel with our engineers for 90 days.",
    color: "#06b6d4",
  },
  {
    icon: "🏆",
    title: "Certificates",
    desc: "Every participant receives a verified completion certificate.",
    color: "#ec4899",
  },
];

// Glow card component used for offerings
function GlowCard({ icon, title, desc, color }: { icon: string; title: string; desc: string; color: string }) {
  return (
    <div
      className="group relative p-6 rounded-2xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 h-full cursor-default
        transition-all duration-300
        hover:-translate-y-1
        hover:border-[var(--glow-border)]
        hover:shadow-[0_8px_32px_-4px_var(--glow-shadow)]"
      style={{
        "--glow-border": `${color}55`,
        "--glow-shadow": `${color}35`,
      } as React.CSSProperties}
    >
      {/* Radial bloom behind content */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${color}14 0%, transparent 70%)` }}
      />

      {/* Icon bubble */}
      <div className="relative mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: `${color}12` }}
        >
          {icon}
          {/* Blurred glow behind icon on hover */}
          <div
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md -z-10"
            style={{ backgroundColor: `${color}30` }}
          />
        </div>
      </div>

      <h3
        className="relative font-bold text-surface-900 dark:text-white mb-2 font-display transition-colors duration-300 group-hover:text-[var(--glow-text)]"
        style={{ "--glow-text": color } as React.CSSProperties}
      >
        {title}
      </h3>
      <p className="relative text-sm text-surface-500 dark:text-surface-400 leading-relaxed">{desc}</p>
    </div>
  );
}

const programmes = [
  {
    name: "Engineering Foundations",
    duration: "4 weeks",
    size: "Up to 30",
    desc: "Modern web development, TypeScript, testing, and CI/CD for teams moving to a new stack.",
    color: "#3b82f6",
    topics: ["TypeScript", "React", "Testing", "CI/CD"],
  },
  {
    name: "Cloud & DevOps Uplift",
    duration: "6 weeks",
    size: "Up to 20",
    desc: "AWS, containerisation, and infrastructure-as-code for teams migrating to the cloud.",
    color: "#10b981",
    topics: ["AWS", "Docker", "Kubernetes", "Terraform"],
  },
  {
    name: "Security Awareness",
    duration: "2 weeks",
    size: "Up to 100",
    desc: "OWASP, secure coding, and compliance fundamentals for the whole engineering org.",
    color: "#f43f5e",
    topics: ["OWASP", "Secure Coding", "Compliance", "Pen Testing"],
  },
  {
    name: "Data Engineering",
    duration: "8 weeks",
    size: "Up to 15",
    desc: "Build production data pipelines with Python, Spark, and modern orchestration tools.",
    color: "#06b6d4",
    topics: ["Python", "Spark", "Airflow", "dbt"],
  },
];

const process = [
  { step: "01", title: "Discovery call", desc: "We understand your team's current skills, goals, and timeline." },
  { step: "02", title: "Curriculum design", desc: "We build a custom syllabus and share it for your approval." },
  { step: "03", title: "Pilot session", desc: "A free 2-hour pilot with a sample of your team before full commitment." },
  { step: "04", title: "Full programme", desc: "Delivery begins. Weekly check-ins with your engineering lead." },
  { step: "05", title: "Assessment & report", desc: "Final skills assessment and a detailed report for management." },
];

const logos = ["Startup A", "Enterprise B", "Scale-up C", "Agency D", "Fintech E", "SaaS F"];

export default function CorporateTrainingPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-20 md:pb-28">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 right-1/3 w-[600px] h-[500px] bg-brand-500/6 dark:bg-brand-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-purple-500/5 dark:bg-purple-500/8 rounded-full blur-3xl" />
        </div>

        <div className="container-wide mx-auto">
          <FadeIn>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/50 border border-brand-100 dark:border-brand-900/50 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
                <span className="text-xs font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-widest">
                  Corporate Training
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black font-display text-surface-900 dark:text-white leading-[1.05] tracking-tight mb-6">
                Upskill your{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-brand-500 to-purple-500 bg-clip-text text-transparent">
                    entire team
                  </span>
                  <span className="absolute bottom-1 left-0 right-0 h-3 bg-brand-100 dark:bg-brand-900/40 -z-0 rounded" />
                </span>
              </h1>

              <p className="text-xl text-surface-500 dark:text-surface-400 leading-relaxed max-w-2xl mb-10">
                Custom training programmes built around your stack, your goals, and your timeline.
                Delivered by engineers who do this work daily — not career trainers.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-brand-500 text-white font-bold text-sm hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/25"
                >
                  Request a proposal
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
                <Link
                  href="#programmes"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-300 font-semibold text-sm hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors"
                >
                  View programmes
                </Link>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-surface-200 dark:bg-surface-800 rounded-2xl overflow-hidden border border-surface-200 dark:border-surface-800">
              {[
                { value: "50+", label: "Companies trained" },
                { value: "2,000+", label: "Engineers upskilled" },
                { value: "4.9★", label: "Average rating" },
                { value: "Free", label: "Pilot session" },
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

      {/* ── What's included ── */}
      <section className="py-20 bg-surface-50 dark:bg-surface-900/40 border-y border-surface-100 dark:border-surface-800">
        <div className="container-wide mx-auto">
          <FadeIn>
            <p className="text-xs font-bold uppercase tracking-widest text-surface-400 mb-8">Every programme includes</p>
          </FadeIn>
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {offerings.map((o) => (
              <StaggerItem key={o.title}>
                <GlowCard {...o} />
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── Programmes ── */}
      <section id="programmes" className="py-20 md:py-28">
        <div className="container-wide mx-auto">
          <FadeIn>
            <div className="max-w-xl mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-surface-400 mb-3">Ready-made tracks</p>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-surface-900 dark:text-white">
                Start with a template
              </h2>
              <p className="text-surface-500 dark:text-surface-400 mt-3">
                Or we build something entirely custom. These are starting points, not constraints.
              </p>
            </div>
          </FadeIn>
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {programmes.map((p) => (
              <StaggerItem key={p.name}>
                <div className="p-7 rounded-2xl border bg-white dark:bg-surface-900 border-surface-200 dark:border-surface-800 h-full hover:shadow-md transition-shadow group">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className="font-black text-xl font-display text-surface-900 dark:text-white">{p.name}</h3>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: `${p.color}15`, color: p.color }}>
                        {p.duration}
                      </span>
                      <span className="text-xs text-surface-400">{p.size} engineers</span>
                    </div>
                  </div>
                  <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed mb-5">{p.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.topics.map((t) => (
                      <span key={t} className="px-2.5 py-1 text-xs font-semibold rounded-full" style={{ backgroundColor: `${p.color}12`, color: p.color }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="py-20 bg-surface-50 dark:bg-surface-900/40 border-y border-surface-100 dark:border-surface-800">
        <div className="container-wide mx-auto">
          <FadeIn>
            <div className="max-w-xl mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-surface-400 mb-3">How it works</p>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-surface-900 dark:text-white">
                From enquiry to delivery
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {process.map((p, i) => (
              <FadeIn key={p.step} delay={i * 0.08}>
                <div className="relative p-5 rounded-2xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 h-full">
                  <span className="text-4xl font-black text-surface-100 dark:text-surface-800 font-display block mb-3">{p.step}</span>
                  <h3 className="font-bold text-surface-900 dark:text-white mb-2 text-sm">{p.title}</h3>
                  <p className="text-xs text-surface-500 dark:text-surface-400 leading-relaxed">{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 md:py-32">
        <div className="container-wide mx-auto">
          <FadeIn>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-surface-900 via-surface-900 to-surface-800 dark:from-surface-800 dark:via-surface-900 dark:to-surface-950 p-10 sm:p-16">
              <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-purple-500/15 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

              <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
                <div className="max-w-xl">
                  <h2 className="text-3xl sm:text-4xl font-black font-display text-white mb-4 leading-tight">
                    Let&apos;s build a programme for your team
                  </h2>
                  <p className="text-surface-400 text-lg">
                    Tell us your team size, current stack, and goals. We&apos;ll send a proposal within 48 hours.
                  </p>
                </div>
                <div className="flex flex-col gap-3 flex-shrink-0">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-surface-900 font-bold text-sm hover:bg-surface-100 transition-colors shadow-lg whitespace-nowrap"
                  >
                    Request a proposal →
                  </Link>
                  <p className="text-xs text-surface-500 text-center">Free pilot session included</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
