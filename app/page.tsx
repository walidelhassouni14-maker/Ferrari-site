import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { ModelsSection } from "@/components/models-section";
import { PerformanceSection } from "@/components/performance-section";
import { HeritageSection } from "@/components/heritage-section";
import { GallerySection } from "@/components/gallery-section";
import { CTASection } from "@/components/cta-section";
import { FooterSection } from "@/components/footer-section";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ModelsSection />
        <PerformanceSection />
        <HeritageSection />
        <GallerySection />
        <CTASection />
      </main>
      <FooterSection />
    </>
  );
}
