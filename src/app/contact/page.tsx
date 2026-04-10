import { Metadata } from "next";
import { COMPANY } from "@/lib/constants";
import ContactForm from "@/components/features/ContactForm";
import { FadeIn } from "@/components/animations";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Zentrix. We respond within 24 hours on business days.",
};

export default function ContactPage() {
  return (
    <section className="section-padding">
      <div className="container-wide mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left — Info */}
          <div className="lg:col-span-2">
            <FadeIn>
              <span className="text-sm font-medium text-brand-500 dark:text-brand-400 uppercase tracking-wider">
                Contact
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold font-display text-surface-900 dark:text-white mt-2 mb-4">
                Let&apos;s talk
              </h1>
              <p className="text-surface-500 dark:text-surface-400 mb-8">
                Whether it&apos;s a new project, a question about our courses, or
                just a conversation about what&apos;s possible — we&apos;re here. We
                respond within 24 hours on business days.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-surface-900 dark:text-white">Email</p>
                    <a href={`mailto:${COMPANY.email}`} className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400">
                      {COMPANY.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-surface-900 dark:text-white">Phone</p>
                    <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400">
                      {COMPANY.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-surface-900 dark:text-white">Office</p>
                    <p className="text-sm text-surface-500 dark:text-surface-400">
                      {COMPANY.address}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right — Form */}
          <div className="lg:col-span-3">
            <FadeIn delay={0.1}>
              <Card variant="bordered" padding="lg">
                <ContactForm />
              </Card>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
