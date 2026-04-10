"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations";
import { Button, Input } from "@/components/ui";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-brand-600 dark:bg-brand-950/20" />
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-accent-400 rotate-45 opacity-20 blur-[100px]" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-brand-400 -rotate-45 opacity-20 blur-[100px]" />

      <div className="relative container-wide mx-auto">
        <div className="max-w-4xl mx-auto rounded-[2.5rem] bg-white dark:bg-surface-900 shadow-2xl overflow-hidden">
          <div className="grid lg:grid-cols-5 items-center">
            <div className="lg:col-span-3 p-8 sm:p-12 lg:p-16">
              <FadeIn>
                <h2 className="text-3xl sm:text-4xl font-bold font-display text-surface-900 dark:text-white mb-4">
                  Stay ahead of the <br />
                  <span className="text-brand-500 underline decoration-brand-500/30 underline-offset-8">innovation curve</span>
                </h2>
                <p className="text-surface-600 dark:text-surface-400 text-lg mb-8 max-w-sm">
                  Get monthly insights on cloud infrastructure, cybersecurity, and engineering best practices.
                </p>

                {status === "success" ? (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400"
                  >
                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">Thanks for joining! We'll be in touch.</span>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <Input
                        type="email"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={status === "error" ? errorMessage : null}
                        className="bg-surface-50 dark:bg-surface-800"
                        required
                      />
                    </div>
                    <Button 
                      loading={status === "loading"}
                      className="px-8 whitespace-nowrap"
                    >
                      Subscribe
                    </Button>
                  </form>
                )}
                <p className="mt-4 text-xs text-surface-400 font-medium opacity-70">
                  No spam, ever. Unsubscribe with one click.
                </p>
              </FadeIn>
            </div>
            
            <div className="lg:col-span-2 relative h-full min-h-[300px] bg-brand-50 lg:bg-transparent dark:bg-surface-800/50">
               {/* Decorative art for newsletter */}
               <div className="absolute inset-0 flex items-center justify-center p-8 overflow-hidden">
                  <div className="relative w-full aspect-square max-w-[200px]">
                    <div className="absolute inset-0 bg-brand-500/10 rounded-full animate-pulse" />
                    <div className="absolute top-0 right-0 w-24 h-24 bg-accent-500/20 rounded-2xl rotate-12 blur-xl" />
                    <div className="absolute bottom-4 left-4 w-32 h-32 bg-brand-500/30 rounded-full rotate-45" />
                    <svg className="absolute inset-0 w-full h-full text-brand-500 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
