import HeroSection from '@/components/hero-section';
import ToolsSection from '@/components/tools-section';
import FeaturesSection from '@/components/features-section';
import CTASection from '@/components/cta-section';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <ToolsSection />
      <FeaturesSection />
      <CTASection />
    </div>
  );
}