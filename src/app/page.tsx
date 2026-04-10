import { 
  HeroSection, 
  ServicesPreview, 
  StatsSection, 
  TestimonialsSection, 
  CTASection,
  FAQSection,
  NewsletterSection
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesPreview />
      <StatsSection />
      <FAQSection />
      <TestimonialsSection />
      <NewsletterSection />
      <CTASection />
    </>
  );
}
