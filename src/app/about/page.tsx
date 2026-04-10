"use client";

import { Metadata } from "next";
import { team, ZentrixTeamMember } from "@/data/team";
import { COMPANY, STATS } from "@/lib/constants";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations";
import Card from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";
import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

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
      variant="bordered" 
      padding="none" 
      hoverable 
      onMouseMove={handleMouseMove}
      className={cn(
        "h-full group transition-all duration-500 overflow-hidden relative border-brand-100/50 dark:border-brand-900/20",
        "hover:shadow-[0_0_50px_-12px_var(--accent-glow),_0_0_20px_var(--accent-glow)] hover:border-[var(--accent-color)] hover:-translate-y-1"
      )}
      style={{ 
        '--accent-glow': `${accentColor}30`,
        '--accent-color': accentColor
      } as any}
    >
      {/* 1. Bloom Layer */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none z-0"
        style={{ backgroundColor: accentColor }}
      />

      {/* 2. Spotlight Layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useTransform(
            [spotlightX, spotlightY],
            ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, ${accentColor}25, transparent 80%)`
          ),
        }}
      />

      {/* 3. Border Spotlight Layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useTransform(
            [spotlightX, spotlightY],
            ([x, y]) => `radial-gradient(200px circle at ${x}px ${y}px, ${accentColor}60, transparent 80%)`
          ),
          maskImage: "linear-gradient(black, black), linear-gradient(black, black)",
          maskClip: "content-box, border-box",
          maskComposite: "exclude",
          padding: "2px",
        }}
      />

      <div className="relative h-full p-8 flex flex-col items-center text-center z-20">
        <div className="relative mb-6">
          {/* Digital Aura Effect */}
          <div 
            className="absolute inset-[-8px] rounded-full opacity-0 group-hover:opacity-40 transition-all duration-500 blur-xl"
            style={{ backgroundColor: accentColor }}
          />
          
          <div 
            className={cn(
              "w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-black shadow-lg transition-all duration-500 relative z-10 border-4 border-white/10",
              "group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_0_30px_-5px_var(--accent-glow)]"
            )}
            style={{ backgroundColor: accentColor }}
          >
            {member.name.split(" ").map((n) => n[0]).join("")}
          </div>
        </div>

        <div>
          <h3 className="font-black text-surface-900 dark:text-white text-xl mb-1 group-hover:translate-y-[-2px] transition-transform duration-300">
            {member.name}
          </h3>
          <p 
            className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 transition-colors duration-300"
            style={{ color: accentColor }}
          >
            {member.role}
          </p>
          <p className="text-xs text-surface-500 dark:text-surface-400 leading-relaxed italic opacity-80 group-hover:opacity-100 transition-opacity">
            "{member.bio?.slice(0, 100)}..."
          </p>
        </div>
      </div>

      {/* Decorative Circuit Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none z-0 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px] group-hover:opacity-[0.1] transition-opacity duration-700" />
    </Card>
  );
}

export default function AboutPage() {
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
                <span className="text-gradient">Then we make them better.</span>
              </h1>
              <p className="text-lg text-surface-500 dark:text-surface-400 leading-relaxed">
                Zentrix started in 2016 with a straightforward idea: most businesses
                need solid engineering, not a flashy slide deck. We focused on
                shipping real systems — payment platforms, logistics dashboards,
                security audits — and let the results do the talking.
              </p>
              <p className="text-lg text-surface-500 dark:text-surface-400 leading-relaxed mt-4">
                Eight years on, we&apos;re a team of {STATS[2].value}+ engineers,
                designers, and cloud architects working out of Hyderabad. We&apos;ve
                shipped {STATS[0].value}+ projects for {STATS[1].value}+ clients.
                No offshore arbitrage play — just people who are good at what they do
                and care about getting it right.
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
              {
                title: "Ship, then optimise",
                desc: "We get working software in front of users fast. The first version won't be perfect — but it'll be real and tested.",
                icon: "Rocket",
                color: "#3b82f6", // Blue
              },
              {
                title: "Security & Privacy",
                desc: "Bank-grade encryption and compliance standards protect your data. We don't compromise on safety.",
                icon: "Shield",
                color: "#10b981", // Emerald
              },
              {
                title: "No black boxes",
                desc: "Every architecture decision is documented. Every deployment is repeatable. You own the code.",
                icon: "Layers",
                color: "#a855f7", // Purple
              },
            ].map((v, i) => {
              const Icon = (Icons[v.icon as keyof typeof Icons] || Icons.HelpCircle) as any;
              return (
                <StaggerItem key={v.title} className="flex">
                  <ValuesCard title={v.title} desc={v.desc} icon={v.icon} color={v.color} />
                </StaggerItem>
              );
            })}
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

function ValuesCard({ title, desc, icon, color }: { title: string; desc: string; icon: string; color: string }) {
  const Icon = (Icons[icon as keyof typeof Icons] || Icons.HelpCircle) as any;
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
      variant="bordered" 
      padding="none" 
      hoverable 
      onMouseMove={handleMouseMove}
      className={cn(
        "h-full group transition-all duration-500 overflow-hidden relative border-brand-100/50 dark:border-brand-900/20",
        "hover:shadow-[0_0_50px_-12px_var(--accent-glow),_0_0_20px_var(--accent-glow)] hover:border-[var(--accent-color)] hover:-translate-y-1"
      )}
      style={{ 
        '--accent-glow': `${color}30`,
        '--accent-color': color
      } as any}
    >
      {/* 1. Bloom Layer */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none z-0"
        style={{ backgroundColor: color }}
      />

      {/* 2. Spotlight Layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useTransform(
            [spotlightX, spotlightY],
            ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, ${color}25, transparent 80%)`
          ),
        }}
      />

      {/* 3. Border Spotlight Layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useTransform(
            [spotlightX, spotlightY],
            ([x, y]) => `radial-gradient(200px circle at ${x}px ${y}px, ${color}60, transparent 80%)`
          ),
          maskImage: "linear-gradient(black, black), linear-gradient(black, black)",
          maskClip: "content-box, border-box",
          maskComposite: "exclude",
          padding: "2px",
        }}
      />

      <div className="relative h-full p-10 flex flex-col bg-surface-50 dark:bg-surface-900/40 z-20">
        <div className="relative z-10 flex flex-col h-full">
          <div 
            className={cn(
              "w-14 h-14 rounded-2xl border flex items-center justify-center mb-6 transition-all duration-500 relative z-10",
              "bg-white dark:bg-surface-800 border-surface-200 dark:border-surface-700 text-surface-400",
              "group-hover:bg-[var(--accent-color)] group-hover:text-white group-hover:border-transparent group-hover:shadow-lg group-hover:shadow-[var(--accent-glow)]"
            )}
          >
            <Icon size={28} strokeWidth={1.5} />
          </div>

          <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-4 font-display">
            {title}
          </h3>
          <p className="text-base text-surface-500 dark:text-surface-400 leading-relaxed mb-auto">
            {desc}
          </p>
        </div>
      </div>
    </Card>
  );
}
