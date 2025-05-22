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
import Sec7 from '@/components/Sec7';
import Sec8 from '@/components/Sec8';
import Sec9 from '@/components/Sec9';
import SpreadSteps from '@/components/SpreadSteps';
import StepsSection from '@/components/StepsSection';
import { testimonies } from '@/lib/utils';

export default function Home() {
  return (
    <main className="min-h-screen bg-bodydark">
      <NavBar />
      <Hero />
      <FeaturesSection />
      <Sec2 />
      <Sec9 />
      <Sec5 />
      <SpreadSteps />
      <TabbedSections />
      <Sec7 />
      <Reviews data={testimonies} />
      <Sec8 />
      <Sec3 />
      <Sec10 />
      <StepsSection />
      <Footer />
    </main>
  );
}
