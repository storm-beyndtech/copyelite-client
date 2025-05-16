import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/ui/animated-section';
import { Users, Star } from 'lucide-react';
import { BsLightningFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import ChartSlide from './ChartSlide';
const words = ['Everyone', 'Investors', 'Experts', 'Beginners'];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
      setFadeKey((prev) => prev + 1);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-36 md:pt-40 pb-0 bg-gradient-to-b from-[#004861] via-[#003a4e] to-black overflow-hidden">
      <div className="container px-4 md:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatedSection className="text-left max-w-150" delay={0.1}>
            <div className="flex items-start gap-2">
              <div className="inline-block pt-3">
                <BsLightningFill className="text-6xl text-brandblue" />
              </div>

              <h1 className="text-2xl md:text-4xl font-bold text-white mb-10">
                Innovative Copy Trading Platform for{' '}
                <span
                  key={fadeKey}
                  className="text-sky-300"
                  style={{
                    opacity: 1,
                    animation: 'fadeIn 0.6s ease-out',
                  }}
                >
                  {words[index]}
                </span>
              </h1>
            </div>

            <div className="flex gap-4 mb-8">
              <div className="border-l border-[#004861] pl-4 text-left">
                <p className="text-sm text-white/50 font-semibold">
                  Trade with
                </p>
                <h3 className="text-lg font-bold text-white">Transparency</h3>
              </div>
              <div className="border-l border-[#004861] pl-4 text-left">
                <p className="text-sm text-white/50 font-semibold">Built for</p>
                <h3 className="text-lg font-bold text-white">
                  Endless Opportunities
                </h3>
              </div>
            </div>

            <p className="text-sm text-white/70 mb-6 max-w-xl">
              One broker, many possibilities. When experts trade, you trade.{' '}
              <br className="max-lg:hidden" />
              If they profit, you profit too. Open your account in minutes!
            </p>

            <div className="flex flex-wrap items-center gap-8 text-sm mb-8">
              <div className="flex items-center">
                <div className="p-2 bg-trading-dark-blue rounded-full mr-2">
                  <Users className="h-5 w-5 text-trading-blue" />
                </div>
                <span className="font-semibold">1,007,000+ Active Users</span>
              </div>
              <div className="flex items-center">
                <div className="p-2 bg-trading-dark-blue rounded-full mr-2">
                  <Star className="h-5 w-5 text-yellow-400" />
                </div>
                <span className="font-semibold">4.5 Google Rating</span>
              </div>
            </div>

            <div className="mb-8">
              <Button size="lg" className="hover:opacity-90 text-white">
                Get Started
              </Button>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3} className="relative">
            <div className="relative">
              {/* Main trading graphic */}
              <div className="relative z-10 mb-6 max-w-115">
                <img
                  src="https://cdn.prod.website-files.com/62f65df27a3f5b2af201b1f2/631b033990351411e8dc3cd7_copy_account_graphics.svg"
                  alt="Trading Platform"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Background image */}
        <div className="absolute bottom-0 right-0 z-0 opacity-100 w-[700px]">
          <img
            src="https://xtb.scdn5.secure.raxcdn.com/hp_mb_d/0103/58/6bc44ea0-3330-462a-a9e5-cf3bf72b1e0a/kv-hp-desktop-hu-uac-oss-2024-1140x320.png"
            alt="Trading Background"
            className="w-full h-auto"
          />
        </div>
      </div>
      <ChartSlide />
    </section>
  );
}
