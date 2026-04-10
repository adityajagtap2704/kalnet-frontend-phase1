import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { services } from "@/data/services";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.description,
  };
}

export default function ServiceDetailPage({ params }: Props) {
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  const related = services.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <>
      <section className="section-padding">
        <div className="container-wide mx-auto">
          <FadeIn>
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-surface-400 mb-8">
              <Link href="/services" className="hover:text-brand-500 transition-colors">
                Services
              </Link>
              <span>/</span>
              <span className="text-surface-600 dark:text-surface-300">
                {service.title}
              </span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main content */}
              <div className="lg:col-span-2">
                <div className="text-5xl mb-6">{service.icon}</div>
                <h1 className="text-4xl sm:text-5xl font-bold font-display text-surface-900 dark:text-white mb-4">
                  {service.title}
                </h1>
                <p className="text-lg text-surface-500 dark:text-surface-400 leading-relaxed mb-8">
                  {service.longDescription}
                </p>

                {/* Features */}
                <h2 className="text-xl font-semibold text-surface-900 dark:text-white mb-4 font-display">
                  What&apos;s included
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {service.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3 p-3 rounded-xl bg-surface-50 dark:bg-surface-800/50"
                    >
                      <svg
                        className="w-5 h-5 text-emerald-500 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-sm text-surface-700 dark:text-surface-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <Card variant="bordered" padding="lg" className="sticky top-24">
                  <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 font-display">
                    Tech stack
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.technologies.map((tech) => (
                      <Badge key={tech} variant="brand" size="md">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-surface-200 dark:border-surface-700">
                    <p className="text-sm text-surface-500 mb-4">
                      Interested in this service? Let&apos;s talk about your requirements.
                    </p>
                    <Link href="/contact">
                      <Button className="w-full">Get a Quote</Button>
                    </Link>
                  </div>
                </Card>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Related services */}
      <section className="section-padding bg-surface-50 dark:bg-surface-900/50">
        <div className="container-wide mx-auto">
          <h2 className="text-2xl font-bold font-display text-surface-900 dark:text-white mb-8">
            Other services
          </h2>
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((s) => (
              <StaggerItem key={s.id}>
                <Link href={`/services/${s.slug}`}>
                  <Card variant="bordered" hoverable padding="lg">
                    <div className="text-2xl mb-3">{s.icon}</div>
                    <h3 className="font-semibold text-surface-900 dark:text-white mb-1 font-display">
                      {s.title}
                    </h3>
                    <p className="text-sm text-surface-500 dark:text-surface-400">
                      {s.description}
                    </p>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>
    </>
  );
}
