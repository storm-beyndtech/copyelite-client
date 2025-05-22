import { motion } from 'framer-motion';
import { AnimatedSection } from './ui/animated-section';

// Main component
const Sec8 = () => {
  const logoAnimation = {
    rotate: 360,
    transition: {
      duration: 120,
      ease: 'linear',
      repeat: Infinity,
    },
  };

  return (
    <div className="relative py-15 bg-gray-950 text-white overflow-hidden">
      {/* Spinning Copyelite logo in top-left */}
      <div className="absolute top-10 left-[50%] z-2 overflow-hidden w-150 h-150 -translate-x-1/2 opacity-10">
        <motion.img
          src="https://protradercopy.com/wp-content/themes/ProTrader-Copy/images/market-transaction-animation.webp"
          alt="Copyelite Logo"
          className="w-full h-full"
          animate={logoAnimation}
        />
        <div className="absolute top-0 left-0 w-full h-full  bg-gradient-to-b from-[#121f26ac] via-bodydark/90 to-bodydark"></div>
      </div>

      {/* Content with relative positioning */}
      <div className="relative z-10 max-ctn max-w-5xl px-4 py-10">
        {/* Regulation Section */}
        <AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="text-center px-4">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                We're Regulated
              </h2>
              <p className="text-sm md:text-base text-gray-300">
                Copyelite operates in accordance with the financial regulations
                and compliance standards outlined by the SLIBC (Reg. No.
                2023-00068) and FSCA (Reg. No. 47490).
              </p>
            </div>
            <div className="text-center px-4">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                You're Protected
              </h2>
              <p className="text-sm md:text-base text-gray-300">
                Client funds are held in a segregated account with AA-Rated
                Global Bank and trading accounts have negative balance
                protection. Regular audits and indemnity insurance.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Partners Section */}
        <AnimatedSection>
          <div className="text-center mb-8">
            <h3 className="text-lg font-medium text-cyan-400">OUR PARTNERS</h3>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="h-8 w-24">
              <img
                src="https://protradercopy.com/wp-content/themes/ProTrader-Copy/images/home-row4-img1.webp"
                alt="Trading Central"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="h-8 w-24">
              <img
                src="https://protradercopy.com/wp-content/themes/ProTrader-Copy/images/home-row4-img3.webp"
                alt="oneZero"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="h-8 w-24">
              <img
                src="https://protradercopy.com/wp-content/themes/ProTrader-Copy/images/home-row4-img4.webp"
                alt="ID3global"
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Sec8;
