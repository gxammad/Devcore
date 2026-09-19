import { Navbar } from '@/components/ui/Navbar';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { HeroSection } from '@/components/hero/HeroSection';
import { IntroSection } from '@/components/sections/IntroSection';
import { CapabilitiesSection } from '@/components/sections/CapabilitiesSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { WorkSection } from '@/components/sections/WorkSection';
import { TechSection } from '@/components/sections/TechSection';
import { WhySection } from '@/components/sections/WhySection';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-void selection:bg-accent-primary/20 selection:text-accent-primary overflow-x-hidden">
      <CustomCursor />
      <Navbar />
      <HeroSection />
      <IntroSection />
      <CapabilitiesSection />
      <ProcessSection />
      <WorkSection />
      <TechSection />
      <WhySection />
      <FinalCtaSection />
      <Footer />
    </main>
  );
}
