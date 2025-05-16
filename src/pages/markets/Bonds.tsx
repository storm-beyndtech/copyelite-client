import Footer from '@/components/Footer';
import Hero2 from '@/components/Hero2';
import NavBar from '@/components/Navbar';
import { PopularMarkets } from '@/components/PopularMarkets';
import Sec7 from '@/components/Sec7';
import StepsSection from '@/components/StepsSection';

export default function Bonds() {
  return (
    <main className="min-h-screen bg-[#070c1b]">
      <NavBar />
      <Hero2
        title="Bonds"
        subtitle="Start trading futures of bond markets"
        backgroundUrl="https://protradercopy.com/wp-content/themes/ProTrader-Copy/images/bonds-banner-bg1.webp"
      />
      <Sec7 />
      <PopularMarkets type="bonds" />
      <StepsSection />
      <Footer />
    </main>
  );
}
