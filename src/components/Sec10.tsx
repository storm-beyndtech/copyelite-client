import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Award, TrendingUp, BarChart2 } from 'lucide-react';
import { AnimatedSection } from './ui/animated-section';

// Logos for review sites
const reviewSites = [
  { name: 'Investing.com', rating: 4.5 },
  { name: 'FX Empire', rating: 4.3 },
  { name: 'DayTrading.com', rating: 4.4 },
  { name: 'BrokerChooser', rating: 4.2 },
  { name: 'ForexBrokers.com', rating: 4.5 },
];

// Tab content type
interface TabContent {
  title: string;
  active: boolean;
}
// Tab content type
interface AnimatedCounterProp {
  delay?: number;
  endValue: number;
}

// Star rating component
const StarRating = ({ rating }: any) => {
  return (
    <div className="flex items-center gap-1">
      <span className="font-semibold text-sm">{rating}</span>
      <div className="flex text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <span key={i}>
            {i < Math.floor(rating)
              ? '★'
              : i < Math.ceil(rating) && i !== Math.floor(rating)
                ? '★'
                : '☆'}
          </span>
        ))}
      </div>
    </div>
  );
};

// Counter animation component
const AnimatedCounter = ({ endValue, delay = 0 }: AnimatedCounterProp) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startCount = 0;
    const duration = 2000; // ms
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameDuration);
    const increment = endValue / totalFrames;

    const timer = setTimeout(() => {
      const counter = setInterval(() => {
        startCount += increment;
        setCount(Math.floor(startCount));

        if (startCount >= endValue) {
          clearInterval(counter);
          setCount(endValue);
        }
      }, frameDuration);

      return () => clearInterval(counter);
    }, delay);

    return () => clearTimeout(timer);
  }, [endValue, delay, isVisible]);

  return <span ref={counterRef}>{count}</span>;
};

// Main trading hero section component
const Sec10 = () => {
  const [activeTab, setActiveTab] = useState('Reviewed');
  const tabRefs = useRef<any>([]);
  const indicatorRef = useRef<any>(null);

  const tabs: TabContent[] = [
    { title: 'Reviewed', active: activeTab === 'Reviewed' },
    { title: 'Featured at', active: activeTab === 'Featured at' },
    { title: 'Awards', active: activeTab === 'Awards' },
  ];

  // Update indicator position
  useEffect(() => {
    const updateIndicator = () => {
      const activeIndex = tabs.findIndex((tab) => tab.title === activeTab);
      const activeTabRef = tabRefs.current[activeIndex];
      const indicator = indicatorRef.current;

      if (activeTabRef && indicator) {
        const tabRect = activeTabRef.getBoundingClientRect();
        const parentRect =
          activeTabRef.parentElement?.getBoundingClientRect() || { left: 0 };
        const tabLeft = tabRect.left - parentRect.left;

        indicator.style.left = `${tabLeft}px`;
        indicator.style.width = `${tabRect.width}px`;
      }
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeTab, tabs]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const logoAnimation = {
    rotate: [0, 360],
    transition: {
      duration: 40,
      repeat: Infinity,
      ease: 'linear',
    },
  };

  return (
    <div className="relative bg-black/95 text-white overflow-hidden pt-16 pb-32">
      {/* Background elements */}
      <div className="absolute top-150 -left-40 w-60 h-60 bg-blue-500/30 blur-3xl rounded-full" />

      {/* Animated logo */}
      <div className="absolute top-150 -left-20 opacity-10 hidden lg:block">
        <motion.div className="w-60 h-60 relative" animate={logoAnimation}>
          <div className="w-full h-full rounded-full border-2 border-blue-400/30"></div>
          <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-blue-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-0 left-1/2 w-2 h-2 bg-blue-400 rounded-full transform -translate-x-1/2"></div>
        </motion.div>
      </div>

      <div className="relative z-10 max-ctn">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 mb-30">
          {/* Left side with glowing thumbs up */}
          <div className="w-115 h-100 rounded">
            <video
              src="https://videos-cdn.capex.com/66195e46-2098-4989-9ae6-27ae88e9b533/play_720p.mp4"
              autoPlay
              muted
              loop
              playsInline
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          </div>

          {/* Right side with counter and text */}
          <div className="w-full lg:max-w-lg">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="space-y-4"
            >
              <motion.h1
                variants={itemVariants}
                className="text-3xl md:text-5xl font-bold !leading-[60px]"
              >
                Find out why over
                <div className="w-fit inline-flex">
                  <div className="flex justify-center space-x-1">
                    <div className="bg-gray-800 p-2 py-0 rounded">
                      <span className="text-3xl md:text-5xl font-bold text-white">
                        <AnimatedCounter endValue={5} />
                      </span>
                    </div>
                    <div className="bg-gray-800 p-2 py-0 rounded">
                      <span className="text-3xl md:text-5xl font-bold text-white">
                        <AnimatedCounter endValue={0} delay={100} />
                      </span>
                    </div>
                    <div className="bg-gray-800 p-2 py-0 rounded">
                      <span className="text-3xl md:text-5xl font-bold text-white">
                        <AnimatedCounter endValue={4} delay={200} />
                      </span>
                    </div>
                    <div className="bg-gray-800 p-2 py-0 rounded">
                      <span className="text-3xl md:text-5xl font-bold text-white">
                        <AnimatedCounter endValue={0} delay={300} />
                      </span>
                    </div>
                    <div className="bg-gray-800 p-2 py-0 rounded">
                      <span className="text-3xl md:text-5xl font-bold text-white">
                        <AnimatedCounter endValue={3} delay={400} />
                      </span>
                    </div>
                    <span className="text-3xl md:text-5xl font-bold">+</span>
                  </div>
                </div>
                <span> traders </span>
                <span className="text-blue-400">are online</span> trading with
                Copyelite
              </motion.h1>
              <motion.div variants={itemVariants} className="w-fit">
                <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition-all">
                  Start Trading Now
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Reviews section */}
        <AnimatedSection delay={0.5}>
          <div className="max-w-5xl mx-auto">
            {/* Tabs */}
            <div className="relative border-b border-white/10 mb-6">
              <div className="flex justify-center">
                {tabs.map((tab, index) => (
                  <button
                    key={tab.title}
                    ref={(el) => (tabRefs.current[index] = el)}
                    className={`pb-4 px-8 text-sm whitespace-nowrap ${
                      tab.active
                        ? 'text-blue-400 font-semibold'
                        : 'text-white/60'
                    }`}
                    onClick={() => setActiveTab(tab.title)}
                  >
                    {tab.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Review logos */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mt-12">
              {reviewSites.map((site, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center space-y-2"
                >
                  <div className="h-12 flex items-center justify-center">
                    <div className="w-32 h-8 bg-gray-800/50 rounded flex items-center justify-center text-sm font-semibold">
                      {site.name}
                    </div>
                  </div>
                  <StarRating rating={site.rating} />
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Stats section */}
        <AnimatedSection delay={0.8}>
          <div className="max-w-5xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-lg border border-gray-600/5 flex flex-col">
              <BarChart2 className="text-blue-400 mb-4" size={36} />
              <h3 className="text-xl font-semibold mb-2">Advanced Analytics</h3>
              <p className="text-white/70 text-sm">
                Track performance metrics with real-time data visualization
              </p>
            </div>

            <div className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-lg border border-gray-600/5 flex flex-col">
              <TrendingUp className="text-blue-400 mb-4" size={36} />
              <h3 className="text-xl font-semibold mb-2">Smart Copy Trading</h3>
              <p className="text-white/70 text-sm">
                Follow top-performing traders with automatic position copying
              </p>
            </div>

            <div className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-lg border border-gray-600/5 flex flex-col">
              <Award className="text-blue-400 mb-4" size={36} />
              <h3 className="text-xl font-semibold mb-2">
                Award-Winning Platform
              </h3>
              <p className="text-white/70 text-sm">
                Recognized by industry experts for reliability and performance
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Sec10;
