import { Navbar } from '@/components/ui/Navbar';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { HeroSection } from '@/components/hero/HeroSection';
import { IntroSection } from '@/components/sections/IntroSection';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-void selection:bg-accent-primary/20 selection:text-accent-primary">
      <CustomCursor />
      <Navbar />
      <HeroSection />
      <IntroSection />
    </main>
  );
}
