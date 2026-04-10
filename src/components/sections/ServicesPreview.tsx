import { services } from "../../data/services";
import { FadeIn } from "@/components/animations";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid";

export default function ServicesPreview() {
  return (
    <section className="section-padding bg-surface-50 dark:bg-surface-900 overflow-hidden">
      <div className="container-wide mx-auto">
        <FadeIn>
          <div className="text-center mb-16 px-4">
            <h2 className="text-4xl sm:text-5xl font-extrabold font-display text-surface-950 dark:text-white mt-2 mb-6 tracking-tight">
              End-to-end <span className="text-brand-600 dark:text-brand-400">engineering services</span>
            </h2>
            <p className="text-surface-500 dark:text-surface-400 max-w-2xl mx-auto text-lg leading-relaxed">
              Six practice areas. One team. We handle everything from the initial
              architecture through to production monitoring.
            </p>
          </div>
        </FadeIn>

        <BentoGrid className="px-4">
          {services.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={<Skeleton />}
              icon={<IconWrapper slug={item.slug} />}
              className={i === 0 || i === 3 ? "md:col-span-2" : ""}
            />
          ))}
        </BentoGrid>

        <FadeIn delay={0.4}>
          <div className="mt-16 text-center">
            <Link href="/services">
              <Button 
                size="lg" 
                className="bg-surface-950 hover:bg-brand-600 text-white rounded-xl px-10 h-14 font-bold flex items-center gap-2 mx-auto shadow-2xl shadow-brand-500/20"
              >
                EXPLORE ALL SERVICES
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Button>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-2xl bg-gradient-to-br from-surface-200 dark:from-surface-900 to-surface-100 dark:to-surface-800 border border-white/5" />
);

const IconWrapper = ({ slug }: { slug: string }) => {
  // Simple icon selector based on slug
  return (
    <div className="h-4 w-4 text-brand-500">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    </div>
  );
};
