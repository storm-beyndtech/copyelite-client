import { FeaturesSection } from '@/components/Features';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import NavBar from '@/components/Navbar';
import Reviews from '@/components/Reviews';
import Sec10 from '@/components/Sec10';
import Sec2 from '@/components/Sec2';
import Sec3 from '@/components/Sec3';
import TabbedSections from '@/components/Sec4';
import Sec5 from '@/components/Sec5';
import Sec6 from '@/components/Sec6';
import Sec7 from '@/components/Sec7';
import Sec8 from '@/components/Sec8';
import Sec9 from '@/components/Sec9';
import StepsSection from '@/components/StepsSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-bodydark">
      <NavBar />
      <Hero />
      <FeaturesSection />
      <Sec2 />
      <Sec3 />
      <TabbedSections />
      <Sec5 />
      <Sec6 />
      <Reviews />
      <Sec7 />
      <Sec8 />
      <Sec9 />
      <Sec10 />
      <StepsSection />
      <Footer />
    </main>
  );
}
