import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/ui/animated-section';
import { Users, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import ChartSlide from './ChartSlide';
import { Link } from 'react-router-dom';
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
    <section className="pb-0 bg-black overflow-hidden">
      <div className="max-ctn flex max-lg:flex-wrap items-center justify-between gap-8 pt-60 pb-20">
        <AnimatedSection className="text-left max-w-180" delay={0.1}>
          <h1 className="text-3xl md:text-7xl font-bold text-white mb-10">
            Innovative Copy Trading Platform for{' '}
            <span
              key={fadeKey}
              className="text-blue-400"
              style={{
                opacity: 1,
                animation: 'fadeIn 0.6s ease-out',
              }}
            >
              {words[index]}
            </span>
          </h1>

          <div className="flex flex-wrap items-center gap-8 text-sm mb-8">
            <div className="flex items-center">
              <div className="p-2 bg-trading-dark-blue rounded-full mr-2">
                <Users className="h-5 w-5 text-brandblue" />
              </div>
              <span className="font-semibold text-gray-400">
                1,007,000+ Active Users
              </span>
            </div>
            <div className="flex items-center">
              <div className="p-2 bg-trading-dark-blue rounded-full mr-2">
                <Star className="h-5 w-5 text-yellow-400" />
              </div>
              <span className="font-semibold text-gray-400">
                4.5 Google Rating
              </span>
            </div>
          </div>

          <p className="text-gray-500 text-lg mb-6 max-w-lg">
            A Platform With Endless Possibilities. When Experts trade, you
            trade. If they profit, you profit too. Open your account in minutes!
          </p>

          <Link to="/register" className="mb-8">
            <Button
              size="lg"
              className="w-60 hover:opacity-90 text-white px-20 py-3 text-lg"
            >
              Get Started
            </Button>
          </Link>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          {/* Main trading graphic */}
          <div className="relative z-10 max-w-[540px]">
            <video
              src="https://videos-cdn.capex.com/cf93e618-11b1-47f2-9b10-9b9adabaa2a5/play_720p.mp4"
              autoPlay
              muted
              loop
              playsInline
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </AnimatedSection>
      </div>
      <ChartSlide />
    </section>
  );
}
