import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { AnimatedSection } from './ui/animated-section';

const StepsSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.98 },
  };

  return (
    <div className="relative bg-[#050a17] text-white py-32 overflow-hidden">
      {/* Background light effects */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-4xl h-full relative">
          {/* Horizontal light beam */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent blur-sm"></div>

          {/* Radial glow in center */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl"></div>

          {/* Light beams expanding outward */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-[1000px] h-[500px] border-2 border-blue-400/5 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] border-2 border-blue-400/10 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] border-2 border-blue-400/15 rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="max-w-4xl mx-auto"
          >
            {/* Heading */}
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-center mb-20"
            >
              Start Trading in <span className="text-white">3 Simple</span>{' '}
              <span className="text-gray-600">Steps</span>
            </motion.h2>

            {/* Steps */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 md:gap-4 mb-16">
              {/* Step 1 */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-4 md:w-1/4"
              >
                <div className="text-9xl font-bold text-blue-400">1</div>
                <div className="h-fit">
                  <h3 className="text-lg font-bold uppercase mb-1">REGISTER</h3>
                  <p className="text-sm text-gray-600">
                    Open a live account and start trading in just minutes.
                  </p>
                </div>
              </motion.div>

              {/* Arrow */}
              <motion.div variants={itemVariants} className="hidden md:block">
                <ArrowRight size={32} className="text-blue-500" />
              </motion.div>

              {/* Step 2 */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-4 md:w-1/4"
              >
                <div className="text-9xl font-bold text-blue-400">2</div>
                <div className="h-fit">
                  <h3 className="text-lg font-bold uppercase mb-1">FUND</h3>
                  <p className="text-sm text-gray-600">
                    Fund your account using a wide range of funding methods.
                  </p>
                </div>
              </motion.div>

              {/* Arrow */}
              <motion.div variants={itemVariants} className="hidden md:block">
                <ArrowRight size={32} className="text-blue-500" />
              </motion.div>

              {/* Step 3 */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-4 md:w-1/4"
              >
                <div className="text-9xl font-bold text-blue-400">3</div>
                <div className="h-fit">
                  <h3 className="text-lg font-bold uppercase mb-1">TRADE</h3>
                  <p className="text-sm text-gray-600">
                    Access 1000+ instruments across all asset classes
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Button */}
            <motion.div variants={itemVariants} className="flex justify-center">
              <motion.button
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-12 rounded-md transition-colors shadow-lg shadow-blue-500/30"
              >
                Get Started
              </motion.button>
            </motion.div>
          </motion.div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default StepsSection;
