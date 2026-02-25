import HeroSection from "@/components/HeroSection";
import AboutKingdom from "@/components/AboutKingdom";
import ExploreTopProperty from "@/components/ExploreTopProperty";
import GlobalMap from "@/components/GlobalMap";
import PropertyGrid from "@/components/PropertyGrid";
import WhyKingdom from "@/components/WhyKingdom";
import Testimonials from "@/components/Testimonials";
import EbookDownload from "@/components/EbookDownload";
import CTABanner from "@/components/CTABanner";
import BlogCarousel from "@/components/BlogCarousel";
import EventsSection from "@/components/EventsSection";

interface HomePageProps {
  currency: string;
  language: string;
}

export default function HomePage({ currency, language }: HomePageProps) {
  return (
    <main className="pb-16 lg:pb-0">
      <HeroSection language={language} />
      <div className="pt-24 sm:pt-28" />
      <AboutKingdom />
      <ExploreTopProperty currency={currency} language={language} />
      <PropertyGrid currency={currency} limit={6} language={language} />
      <WhyKingdom language={language} />
      <Testimonials />
      <EbookDownload />
      <CTABanner />
      <BlogCarousel />
      <GlobalMap language={language} />
      <EventsSection />
    </main>
  );
}
