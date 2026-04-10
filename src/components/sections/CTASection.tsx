"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import { FadeIn } from "@/components/animations";

export default function CTASection() {
  return (
    <section className="section-padding">
      <div className="container-wide mx-auto">
        <FadeIn>
          <div className="relative rounded-[2.5rem] bg-surface-950 p-10 sm:p-14 lg:p-20 overflow-hidden border border-white/5">
            {/* Unique Animated Background: Moving Blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-600/30 blur-[120px] rounded-full animate-float" />
              <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-accent-600/20 blur-[100px] rounded-full animate-float animate-delay-300" />
            </div>

            <div className="relative text-center max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black font-display text-white mb-6 tracking-tight">
                Ready to build <span className="bg-gradient-to-r from-brand-400 to-accent-400 bg-clip-text text-transparent">something great?</span>
              </h2>
              <p className="text-lg text-surface-400 mb-10 leading-relaxed">
                Tell us what you&apos;re working on. We&apos;ll figure out the best way
                to help — whether that&apos;s a full project, a sprint, or extending
                your existing team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-brand-600 text-white hover:bg-brand-700 shadow-2xl shadow-brand-500/20 rounded-full px-8 h-14 font-bold"
                  >
                    Get in Touch Now
                  </Button>
                </Link>
                <Link href="/courses">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="text-white border-white/10 hover:bg-white/5 rounded-full px-8 h-14 font-bold"
                  >
                    Explore Courses
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
