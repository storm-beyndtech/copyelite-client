import { Link } from 'react-router-dom';
import { AnimatedSection } from './ui/animated-section';
import security from '../assets/Bento/security.webp';
import partner from '../assets/Bento/partner.webp';
import promotions from '../assets/Bento/promotions.webp';
import verification from '../assets/Bento/verification.webp';
import withdrawal from '../assets/Bento/withdrawal.webp';

// Main Features Component
const Sec7 = () => {
  return (
    <div className="bg-bodydark py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <h2 className="text-4xl font-bold text-center mb-12 text-cyan-400">
            Other features at your service
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-8 gap-6">
          {/* Safety and Security */}
          <AnimatedSection
            delay={0.2}
            className="md:col-span-5 col-span-8 h-100 bg-[#d1d7f5] rounded-3xl overflow-hidden"
          >
            <div className="flex h-full">
              <div className="p-6 flex-grow">
                <h3 className="text-4xl font-bold mb-2 text-gray-900">
                  Safety and Security
                </h3>
                <p className="text-gray-700">
                  Since our founding, we've prioritized the safety of your
                  funds. Your account is protected by multi-level security, 2FA,
                  and robust verification.
                </p>
              </div>

              <img
                src={security}
                alt="Safety and Security"
                className="w-auto h-full object-contain"
              />
            </div>
          </AnimatedSection>

          {/* Fast Withdrawal */}
          <AnimatedSection
            delay={0.5}
            className="md:col-span-3 col-span-8 h-100 bg-[#c5e5da] rounded-3xl overflow-hidden"
          >
            <div className="flex flex-col h-full">
              <div className="p-6 flex-grow">
                <h3 className="text-4xl font-bold mb-2 text-gray-900">
                  Fast Withdrawal
                </h3>
                <p className="text-gray-700">
                  30 minutes to withdraw funds. Quick and reliable access to
                  your funds
                </p>
              </div>

              <img
                src={withdrawal}
                alt="Fast Withdrawal"
                className="w-full object-contain"
              />
            </div>
          </AnimatedSection>

          {/* Multi-Level Partner Program */}
          <AnimatedSection
            delay={0.2}
            className="md:col-span-3 col-span-8 h-100 bg-[#d1d7f5] rounded-3xl overflow-hidden"
          >
            <div className="flex flex-col gap-5 h-full p-6">
              <img
                src={partner}
                alt="Multi-Level Partner Program"
                className="w-full object-contain"
              />
              <div>
                <h3 className="text-4xl font-bold mb-2 text-gray-900 w-[90%]">
                  Multi-Level Partner Program
                </h3>
                <p className="text-gray-700">
                  Limitless income. Attract new users, earn more, and grow
                  beyond limits. Partner with us today!
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Fast Verification */}
          <AnimatedSection
            delay={0.6}
            className="md:col-span-5 col-span-8 h-100 bg-gradient-to-b from-[#c5e5da] to-brandblue rounded-3xl overflow-hidden"
          >
            <div className="flex items-end h-full">
              <div className="p-6 flex-grow">
                <h3 className="text-4xl font-bold mb-2 text-white">
                  Fast Verification
                </h3>
                <p className="text-white/90">
                  Get your account verified quickly with our efficient
                  verification process, allowing you to start trading without
                  delay.
                </p>
              </div>

              <img
                src={verification}
                alt="Fast Verification"
                className="w-auto h-full object-contain mr-[-50px]"
              />
            </div>
          </AnimatedSection>

          {/* Best Promotions - Full Width */}
          <AnimatedSection
            delay={0.4}
            className="col-span-8 md:h-100 bg-gradient-to-b from-brandblue via-black to-black rounded-3xl overflow-hidden"
          >
            <div className="h-full flex flex-col md:flex-row md:items-end justify-between">
              <div className="flex-1 px-6 py-8 max-w-100 space-y-10 my-auto">
                <h3 className="text-4xl font-bold text-white">
                  Best Promotions
                </h3>
                <p className="text-white/70">
                  Take advantage of our competitive promotions and bonuses,
                  designed to give you the best value and enhance your trading
                  experience.
                </p>
                <Link to="/register" className="block">
                  <button className="bg-white text-gray-900 text-sm font-bold py-2 px-7 hover:bg-gray-100 transition-colors">
                    Open Account
                  </button>
                </Link>
              </div>

              <img
                src={promotions}
                alt="Promotions"
                className="w-1/2 h-full object-contain"
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default Sec7;
