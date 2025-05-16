import Footer from '@/components/Footer';
import Hero2 from '@/components/Hero2';
import NavBar from '@/components/Navbar';
import { PopularMarkets } from '@/components/PopularMarkets';
import Sec7 from '@/components/Sec7';
import StepsSection from '@/components/StepsSection';

export default function ShareCFDs() {
  return (
    <main className="min-h-screen bg-[#070c1b]">
      <NavBar />
      <Hero2
        title="Trade in CFDs on Apple, Tesla
and many more stocks"
        subtitle="Open leveraged long and short positions on your favorite stocks."
      />
      <Sec7 />
      <PopularMarkets type="shareCFDs" />
      <StepsSection />
      <Footer />
    </main>
  );
}
