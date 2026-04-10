"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn, StaggerChildren } from "@/components/animations";

const FAQS = [
  {
    question: "What industries do you specialize in?",
    answer: "We specialize in Fintech, Healthcare, E-commerce, and EdTech. Our team has deep experience in high-compliance environments and scalable consumer platforms.",
  },
  {
    question: "How do you handle project management?",
    answer: "We use an Agile methodology with weekly sprints and bi-weekly demos. You'll have access to a dedicated Slack channel and a real-time dashboard to track progress.",
  },
  {
    question: "Do you offer post-launch support?",
    answer: "Yes, we provide ongoing maintenance and support packages tailored to your needs, ranging from 24/7 reliability monitoring to feature expansion.",
  },
  {
    question: "Can you work with our existing internal team?",
    answer: "Absolutely. We often act as an extension of internal engineering teams, helping with architecture, specialized features, or scaling existing systems.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-padding bg-white dark:bg-surface-900 border-y border-surface-200 dark:border-white/5">
      <div className="container-wide mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          <div>
            <FadeIn>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-surface-900 dark:text-white mb-6">
                Frequently Asked <br />
                <span className="text-brand-500">Questions</span>
              </h2>
              <p className="text-lg text-surface-600 dark:text-surface-400 max-w-md">
                Find answers to common questions about our process, expertise, and how we work with our partners.
              </p>
            </FadeIn>
          </div>

          <StaggerChildren className="space-y-4">
            {FAQS.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </StaggerChildren>
        </div>
      </div>
    </section>
  );
}

function FAQItem({
  faq,
  isOpen,
  onClick,
}: {
  faq: (typeof FAQS)[0];
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      className={`rounded-2xl border transition-all duration-300 ${
        isOpen
          ? "bg-white dark:bg-surface-900 border-brand-500/30 shadow-xl shadow-brand-500/5"
          : "bg-surface-100/50 dark:bg-white/5 border-transparent hover:border-surface-200 dark:hover:border-white/10"
      }`}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
      >
        <span className="font-bold text-surface-900 dark:text-white lg:text-lg">
          {faq.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="ml-4 text-brand-500"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 text-surface-600 dark:text-surface-400 leading-relaxed">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
