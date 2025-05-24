import Footer from '@/components/Footer';
import Hero2 from '@/components/Hero2';
import NavBar from '@/components/Navbar';
import Sec7 from '@/components/Sec7';
import StepsSection from '@/components/StepsSection';

export default function Awards() {
  return (
    <main className="min-h-screen bg-[#070c1b]">
      <NavBar />
      <Hero2 title="Awards" subtitle="We appreciate them" />
      <Sec7 />
      <StepsSection />
      <Footer />
    </main>
  );
}
