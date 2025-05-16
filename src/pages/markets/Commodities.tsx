import Footer from '@/components/Footer';
import NavBar from '@/components/Navbar';
import { PopularMarkets } from '@/components/PopularMarkets';
import Sec7 from '@/components/Sec7';
import StepsSection from '@/components/StepsSection';

export default function Commodities() {
  return (
    <main className="min-h-screen bg-[#070c1b]">
      <NavBar />
      <PopularMarkets type="commodity" />
      <Sec7 />
      <StepsSection />
      <Footer />
    </main>
  );
}
