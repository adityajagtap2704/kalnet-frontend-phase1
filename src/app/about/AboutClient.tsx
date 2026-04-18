"use client";

import { type ZentrixTeamMember } from "@/data/team";
import { type STATS } from "@/lib/constants";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations";
import Card from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Props {
  team: ZentrixTeamMember[];
  stats: typeof STATS;
}

export default function AboutClient({ team, stats }: Props) {
  return (
    <>
      {/* Header */}
      <section className="section-padding bg-gradient-to-b from-surface-50 to-white dark:from-surface-900 dark:to-surface-900">
        <div className="container-wide mx-auto">
          <FadeIn>
            <div className="max-w-3xl">
              <span className="text-sm font-medium text-brand-500 dark:text-brand-400 uppercase tracking-wider">
                About Zentrix
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold font-display text-surface-900 dark:text-white mt-2 mb-6">
                We build things that work.
                <br />
                <span className="text-brand-500">Then we make them better.</span>
              </h1>
              <p className="text-lg text-surface-500 dark:text-surface-400 leading-relaxed">
                Zentrix started in 2016 with a straightforward idea: most businesses
                need solid engineering, not a flashy slide deck. We focused on
                shipping real systems — payment platforms, logistics dashboards,
                security audits — and let the results do the talking.
              </p>
              <p className="text-lg text-surface-500 dark:text-surface-400 leading-relaxed mt-4">
                Eight years on, we&apos;re a team of {stats[2].value}+ engineers,
                designers, and cloud architects working out of Hyderabad. We&apos;ve
                shipped {stats[0].value}+ projects for {stats[1].value}+ clients.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container-wide mx-auto">
          <FadeIn>
            <h2 className="text-3xl font-bold font-display text-surface-900 dark:text-white mb-10">
              How we work
            </h2>
          </FadeIn>
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Ship, then optimise", desc: "We get working software in front of users fast. The first version won't be perfect — but it'll be real and tested.", icon: "Rocket", color: "#3b82f6" },
              { title: "Security & Privacy", desc: "Bank-grade encryption and compliance standards protect your data. We don't compromise on safety.", icon: "Shield", color: "#10b981" },
              { title: "No black boxes", desc: "Every architecture decision is documented. Every deployment is repeatable. You own the code.", icon: "Layers", color: "#a855f7" },
            ].map((v) => (
              <StaggerItem key={v.title} className="flex">
                <ValuesCard {...v} />
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-surface-50 dark:bg-surface-900/50">
        <div className="container-wide mx-auto">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="text-sm font-medium text-brand-500 dark:text-brand-400 uppercase tracking-wider">
                The team
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-surface-900 dark:text-white mt-2 mb-4">
                People who build Zentrix
              </h2>
            </div>
          </FadeIn>
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <StaggerItem key={member.id} className="h-full">
                <TeamMemberCard member={member} />
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>
    </>
  );
}

function TeamMemberCard({ member }: { member: ZentrixTeamMember }) {
  const accentColor = member.accentColor || "#3b82f6";
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const spotlightY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <Card
      variant="bordered" padding="none" hoverable
      onMouseMove={handleMouseMove}
      className={cn("h-full group transition-all duration-500 overflow-hidden relative", "hover:-translate-y-1")}
      style={{ "--accent-glow": `${accentColor}30`, "--accent-color": accentColor } as React.CSSProperties}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none" style={{ backgroundColor: accentColor }} />
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: useTransform([spotlightX, spotlightY], ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, ${accentColor}25, transparent 80%)`) }}
      />
      <div className="relative h-full p-8 flex flex-col items-center text-center z-10">
        <div className="relative mb-6">
          <div className="absolute inset-[-8px] rounded-full opacity-0 group-hover:opacity-40 transition-all duration-500 blur-xl" style={{ backgroundColor: accentColor }} />
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-black shadow-lg transition-all duration-500 relative z-10 border-4 border-white/10 group-hover:scale-110"
            style={{ backgroundColor: accentColor }}
          >
            {member.name.split(" ").map((n) => n[0]).join("")}
          </div>
        </div>
        <h3 className="font-black text-surface-900 dark:text-white text-xl mb-1">{member.name}</h3>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-4" style={{ color: accentColor }}>{member.role}</p>
        <p className="text-xs text-surface-500 dark:text-surface-400 leading-relaxed italic opacity-80">
          &ldquo;{member.bio?.slice(0, 100)}&rdquo;
        </p>
      </div>
    </Card>
  );
}

function ValuesCard({ title, desc, icon, color }: { title: string; desc: string; icon: string; color: string }) {
  const Icon = (Icons[icon as keyof typeof Icons] || Icons.HelpCircle) as React.ElementType;
  return (
    <div
      className="group relative h-full p-8 rounded-2xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 flex flex-col cursor-default
        transition-all duration-300 hover:-translate-y-1
        hover:border-[var(--vc-border)] hover:shadow-[0_8px_32px_-4px_var(--vc-glow)]"
      style={{
        "--vc-glow": `${color}35`,
        "--vc-border": `${color}55`,
      } as React.CSSProperties}
    >
      {/* Radial bloom */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${color}14 0%, transparent 70%)` }}
      />
      {/* Icon */}
      <div className="relative mb-5">
        <div
          className="w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-300 group-hover:scale-110 bg-white dark:bg-surface-800 border-surface-200 dark:border-surface-700"
          style={{ color }}
        >
          <Icon size={24} strokeWidth={1.5} />
          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md -z-10"
            style={{ backgroundColor: `${color}30` }} />
        </div>
      </div>
      <h3
        className="relative text-lg font-bold text-surface-900 dark:text-white mb-3 font-display transition-colors duration-300 group-hover:text-[var(--vc-text)]"
        style={{ "--vc-text": color } as React.CSSProperties}
      >
        {title}
      </h3>
      <p className="relative text-sm text-surface-500 dark:text-surface-400 leading-relaxed">{desc}</p>
    </div>
  );
}
