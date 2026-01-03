import { motion } from 'framer-motion';
import { Activity, Zap } from 'lucide-react';
import { AnimatedSection } from './ui/animated-section';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Animation variants matching the logoAnimation from utils
const phoneAnimation = {
  animate: {
    rotate: [0, 3, 0, -3, 0],
    y: [0, -5, 0, -5, 0],
    transition: {
      duration: 5,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'loop',
    },
  },
};

// Feature item type
interface FeatureItem {
  icon: JSX.Element;
  text: string;
}

// Slider images from the reference component
const sliderImages = [
  'https://res.cloudinary.com/ddb1vjioq/image/upload/v1747727915/Adobe_Express_-_file_6_aore83.png',
  'https://res.cloudinary.com/ddb1vjioq/image/upload/v1747727915/Adobe_Express_-_file_6_aore83.png',
];

const Sec9 = () => {
  // Features list with icons
  const features: FeatureItem[] = [
    {
      icon: <Activity size={18} className="text-cyan-400" />,
      text: 'Advanced Charting',
    },
    {
      icon: <Zap size={18} className="text-cyan-400" />,
      text: 'Lightning Fast Trading',
    },
  ];

  // Slider settings
  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dotsClass: 'slick-dots custom-dots',
  };

  return (
    <AnimatedSection>
      <div className="relative bg-transparent text-white overflow-hidden py-24">
        {/* Background effects */}
        <div className="absolute inset-0 bg-bodydark backdrop-blur-lg z-0"></div>
        <div className="absolute top-40 -left-40 w-60 h-60 bg-cyan-500/30 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-cyan-500/30 blur-3xl rounded-full" />

        {/* Content container */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left side content */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Access Global Markets on{' '}
              <span className="text-gray-500">the go with</span> AppTrader
            </h2>

            <p className="text-white/70 text-sm md:text-base mb-10 max-w-lg mx-auto md:mx-0">
              Wherever you are in the world, you can now access 1000+
              Currencies, Indices, Commodities, Share CFDs, ETFs, and Bonds with
              the{' '}
              <span className="text-white font-medium">
                Copyelite AppTrader
              </span>
              .
            </p>

            {/* Feature buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-center gap-2 px-6 py-3 rounded-full border ${
                    index === 0
                      ? 'border-white/20 bg-[#0D1229]/60 backdrop-blur-sm'
                      : 'border-transparent text-white/60'
                  }`}
                >
                  {feature.icon}
                  <span className="text-sm whitespace-nowrap">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right side with phone slider */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <motion.div
              className="relative w-full max-w-xs"
              animate={phoneAnimation}
            >
              {/* Phone device frame */}
              <div className="relative z-10 w-[270px] h-[550px] mx-auto">
                {/* Phone shadow and glow effect */}
                <div className="absolute inset-0 rounded-[40px] bg-black shadow-[0_0_25px_rgba(0,179,255,0.2)] -z-10"></div>

                {/* Phone frame */}
                <div className="relative w-full h-full bg-[#121826] rounded-[40px] overflow-hidden border-4 border-[#232936]">
                  {/* Phone notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-6 bg-black rounded-b-xl z-20"></div>

                  {/* Slider container */}
                  <div className="absolute inset-0 z-10">
                    <Slider {...settings}>
                      {sliderImages.map((src, i) => (
                        <div key={i} className="outline-none">
                          <img
                            src={src}
                            alt={`AppTrader screen-${i}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Sec9;
