import { Metadata } from "next";
import { services } from "@/data/services";
import ServiceCard from "@/components/features/ServiceCard";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Six practice areas covering web development, mobile apps, cloud infrastructure, cybersecurity, data engineering, and design.",
};

export default function ServicesPage() {
  return (
    <section className="section-padding">
      <div className="container-wide mx-auto">
        <FadeIn>
          <div className="max-w-2xl mb-14">
            <span className="text-sm font-medium text-brand-500 dark:text-brand-400 uppercase tracking-wider">
              Services
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold font-display text-surface-900 dark:text-white mt-2 mb-4">
              What we build
            </h1>
            <p className="text-lg text-surface-500 dark:text-surface-400">
              Each practice area is led by a senior engineer with at least a decade
              in the field. We don&apos;t staff juniors on your project and hope for
              the best.
            </p>
          </div>
        </FadeIn>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <StaggerItem key={service.id} className="h-full">
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
