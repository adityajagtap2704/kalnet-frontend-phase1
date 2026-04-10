"use client";

import Link from "next/link";
import { Service } from "@/types";
import Card from "@/components/ui/Card";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface ServiceCardProps {
  service: Service;
  compact?: boolean;
  disableLink?: boolean;
}

export default function ServiceCard({ service, compact = false, disableLink = false }: ServiceCardProps) {
  const Icon = (Icons[service.icon as keyof typeof Icons] || Icons.HelpCircle) as LucideIcon;
  const accentColor = service.accentColor || "#3b82f6";

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const spotlightX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const spotlightY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const content = (
    <Card 
      variant="bordered" 
      padding="none"
      hoverable={!disableLink} 
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
      {/* 1. Bloom Layer (Static background tint on hover) */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none z-0"
        style={{ backgroundColor: accentColor }}
      />

      {/* 2. Spotlight Layer (Dynamic mouse-following discovery) */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useTransform(
            [spotlightX, spotlightY],
            ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, ${accentColor}25, transparent 80%)`
          ),
        }}
      />

      {/* 3. Border Spotlight Layer (Dynamic border glow) */}
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

      <div className="relative h-full p-10 flex flex-col z-20">
        {/* Icon Container with Aura */}
        <div className="relative mb-6 self-start">
          <div 
            className="absolute inset-[-4px] rounded-xl opacity-0 group-hover:opacity-20 transition-all duration-500 blur-lg"
            style={{ backgroundColor: accentColor }}
          />
          <div 
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-500 relative z-10",
              "bg-surface-50 dark:bg-surface-900 border-surface-200 dark:border-surface-800",
              "group-hover:bg-[var(--accent-color)] group-hover:text-white group-hover:border-transparent group-hover:shadow-lg group-hover:shadow-[var(--accent-glow)]"
            )}
          >
            <Icon size={24} strokeWidth={1.5} className="group-hover:scale-110 transition-transform duration-500" />
          </div>
        </div>

        <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-3 font-display transition-colors duration-300">
          {service.title}
        </h3>
        
        <p className="text-base text-surface-500 dark:text-surface-400 leading-relaxed mb-auto">
          {service.description}
        </p>

        {!compact && (
          <div className="mt-8 flex flex-wrap gap-2">
            {service.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className={cn(
                  "px-3 py-1 text-xs font-semibold rounded-full border transition-all duration-500",
                  "border-surface-100 dark:border-surface-800 bg-surface-50 dark:bg-surface-900 text-surface-600 dark:text-surface-400",
                  "group-hover:bg-[var(--accent-color)] group-hover:text-white group-hover:border-transparent group-hover:shadow-md"
                )}
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div 
          className="mt-6 flex items-center gap-1 text-sm font-black uppercase tracking-wider transition-all duration-300 group-hover:translate-x-1"
          style={{ color: accentColor }}
        >
          <span>Learn more</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Decorative Circuit Pattern (Subtle) */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none z-0 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px] group-hover:opacity-[0.06] transition-opacity duration-700" />
    </Card>
  );

  if (disableLink) return content;

  return (
    <Link href={`/services/${service.slug}`} className="block h-full">
      {content}
    </Link>
  );
}
