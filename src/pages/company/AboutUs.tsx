import Footer from '@/components/Footer';
import Hero2 from '@/components/Hero2';
import NavBar from '@/components/Navbar';
import Sec7 from '@/components/Sec7';
import StepsSection from '@/components/StepsSection';

export default function AboutUs() {
  return (
    <main className="min-h-screen bg-[#070c1b]">
      <NavBar />
      <Hero2 title="About Us" subtitle="Dive down the history of copyelite" />
      <Sec7 />
      <StepsSection />
      <Footer />
    </main>
  );
}
