import { motion } from 'framer-motion';
import {
  AnimatedSection,
  AnimatedSlideLeft,
  AnimatedSlideRight,
} from './ui/animated-section';

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
    <div className="relative py-12 bg-transparent text-white overflow-hidden">
      {/* Background Effects with Blur */}
      <div className="absolute inset-0 bg-bodydark backdrop-blur-lg z-0"></div>

      {/* Spinning ProTrader logo in top-left */}
      <div className="absolute top-10 left-[50%] z-2 overflow-hidden w-150 h-150 -translate-x-1/2 opacity-10">
        <motion.img
          src="https://protradercopy.com/wp-content/themes/ProTrader-Copy/images/market-transaction-animation.webp"
          alt="ProTrader Logo"
          className="w-full h-full"
          animate={logoAnimation}
        />
        <div className="absolute top-0 left-0 w-full h-full  bg-gradient-to-b from-[#121f26ac] via-bodydark/90 to-bodydark"></div>
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-20 -left-20 w-60 h-60 bg-brandblue/20 blur-3xl rounded-full" />
      <div className="absolute left-0 bottom-50 w-40 h-40 bg-brandblue/20 blur-3xl rounded-full" />
      <div className="absolute bottom-1/2 left-2/3 w-40 h-40 bg-brandblue/10 blur-3xl rounded-full" />

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
                ProTrader-Copy operates in accordance with the financial
                regulations and compliance standards outlined by the SLIBC (Reg.
                No. 2023-00068) and FSCA (Reg. No. 47490).
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
        <AnimatedSection className="mb-16">
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

        {/* Deposit Section */}
        <AnimatedSection className="my-40 py-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-bold">
              Deposit. Trade. Earn.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex justify-center">
              <div className="relative w-115 h-70">
                <AnimatedSlideLeft delay={0.3}>
                  <video
                    playsInline
                    webkit-playsinline="true"
                    x5-playsinline="true"
                    muted
                    autoPlay
                    width="557"
                    loop
                    style={{ mixBlendMode: 'screen', display: 'block' }}
                    className="w-full h-full"
                  >
                    <source
                      src="https://www.monetamarkets.com/wp-content/themes/Moneta/videos/home-row6-CashBack.mp4"
                      type="video/mp4"
                    />
                    <source
                      src="https://www.monetamarkets.com/wp-content/themes/Moneta/videos/home-row6-CashBack.webm"
                      type="video/webm"
                    />
                  </video>
                </AnimatedSlideLeft>
              </div>
            </div>
            <AnimatedSlideRight delay={0.2}>
              <p className="text-base md:text-lg text-gray-300">
                Now, whenever you fund your live account, we'll give you a{' '}
                <span className="font-bold text-white">bonus</span>. Then, when
                you start copytrading live account of expert traders!
              </p>
            </AnimatedSlideRight>
          </div>
        </AnimatedSection>

        {/* Market Direction Section */}
        <AnimatedSection>
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl max-w-3xl leading-8 mx-auto font-bold bg-gradient-to-r from-gray-200 via-white to-gray-400 text-transparent bg-clip-text">
              Learn How to Trade the Market in Both Directions
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Market Up */}
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-6">
                Market price goes higher
              </h3>
              <div className="relative h-48 w-full">
                <video
                  width="370"
                  muted
                  playsInline
                  webkit-playsinline="true"
                  x5-playsinline="true"
                  style={{ mixBlendMode: 'screen', display: 'block' }}
                  className="w-full"
                >
                  <source
                    src="https://www.monetamarkets.com/wp-content/themes/Moneta/videos/home-row7-buy.mp4?v=1"
                    type="video/mp4"
                  />
                  <source
                    src="https://www.monetamarkets.com/wp-content/themes/Moneta/videos/home-row7-buy.webm?v=1"
                    type="video/webm"
                  />
                </video>
              </div>
            </div>

            {/* Center description */}
            <div className="text-center px-2 py-6">
              <p className="text-gray-300 mb-8">
                All ProTrader-Copy clients are able to profit from the bullish
                and bearish moves of 1000+ tradable instruments, such as Forex,
                Share CFDs, Indices, Commodities and more.
              </p>
              <p className="text-base font-semibold text-brandblue">
                Profit from both up and down market cycles with ProTrader-Copy!
              </p>
            </div>

            {/* Market Down */}
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-6">
                Market price goes lower
              </h3>
              <div className="relative h-48 w-full">
                <video
                  width="370"
                  muted
                  playsInline
                  webkit-playsinline="true"
                  x5-playsinline="true"
                  style={{ mixBlendMode: 'screen', display: 'block' }}
                  className="w-full"
                >
                  <source
                    src="https://www.monetamarkets.com/wp-content/themes/Moneta/videos/home-row7-sell.mp4?v=1"
                    type="video/mp4"
                  />
                  <source
                    src="https://www.monetamarkets.com/wp-content/themes/Moneta/videos/home-row7-sell.webm?v=1"
                    type="video/webm"
                  />
                </video>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Sec8;
