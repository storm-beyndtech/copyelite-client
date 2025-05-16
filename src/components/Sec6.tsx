import React, { useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

interface FeatureCardProps {
  title: string;
  description: string;
  cta: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  cta,
}) => {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className="w-full p-8 border border-gray-200 rounded-xl shadow-sm bg-white"
    >
      <h3 className="text-3xl font-bold mb-4 text-bodydark">{title}</h3>
      <p className="text-gray-700 mb-6 text-sm leading-relaxed">
        {description}
      </p>
      <p className="font-medium text-sm text-blue-600">{cta}</p>
    </motion.div>
  );
};

interface StepItemProps {
  text: string;
}

const StepItem: React.FC<StepItemProps> = ({ text }) => {
  return (
    <li className="flex items-center mb-4">
      <div className="mr-3 h-3 w-3 rounded-full bg-green-500"></div>
      <span className="text-sm">{text}</span>
    </li>
  );
};

interface StepSectionProps {
  title: string;
  steps: string[];
  image: string;
  isImageRight?: boolean;
}

const StepSection: React.FC<StepSectionProps> = ({
  title,
  steps,
  image,
  isImageRight,
}) => {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div
      ref={ref}
      className="w-full my-12 flex flex-col md:flex-row items-center gap-8"
    >
      {!isImageRight && (
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.7 }}
          className="w-full md:w-1/2"
        >
          <img
            src={image}
            alt="Trading Interface"
            className="w-full rounded-lg shadow-md"
          />
        </motion.div>
      )}

      <motion.div
        className="w-full md:w-1/2"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.h2 variants={childVariants} className="text-3xl font-bold mb-6">
          {title}
        </motion.h2>
        <ul>
          {steps.map((step, index) => (
            <motion.div key={index} variants={childVariants}>
              <StepItem text={step} />
            </motion.div>
          ))}
        </ul>
      </motion.div>

      {isImageRight && (
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ duration: 0.7 }}
          className="w-full md:w-1/2"
        >
          <img
            src={image}
            alt="Trading Interface"
            className="w-full rounded-lg shadow-md"
          />
        </motion.div>
      )}
    </div>
  );
};

export default function Sec6() {
  return (
    <section className="w-full py-16 bg-gradient-to-b from-gray-100 to-gray-50">
      <div className="max-ctn !max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-bodydark">
            Choose your way!
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <FeatureCard
              title="Copy successful strategies!"
              description="ProTrader Copy Trading will spare you the task of creating your own trading strategy and shielding you from unnecessary stress. With our seamless automated system, you can now embark on a journey of financial prosperity without breaking a sweat! Select from a handpicked array of the strategies in our portfolio and set yourself on the path to limitless earnings!"
              cta="Seize this golden opportunity to start earning with ProTrader today!"
            />

            <FeatureCard
              title="Share strategy and start earning"
              description="ProTrader Copy Trading empowers traders to share their successful trading strategies with others, enabling them to profit from their expertise whenever someone decides to replicate their approach. This innovative platform fosters a community of knowledge-sharing and allows traders to capitalize on their skills!"
              cta="Sharing is caring. Share your successful strategy now!"
            />
          </div>
        </motion.div>

        <StepSection
          title="How to start copying?"
          steps={[
            'Open a trading account and fund your CopyWallet.',
            'Now go to the Copy Trading environment.',
            'Select the trading strategy you want to copy.',
            'Enjoy the success of the strategy you have copied.',
          ]}
          image="https://protradercopy.com/local/templates/weltrade.main/components/wt/static.content/trader.copy.trading/wt/content.detail/default/img/how-copy.jpg"
          isImageRight={true}
        />

        <StepSection
          title="How to start sharing?"
          steps={[
            'Open a trading account and fund your CopyWallet.',
            'Now go to the Copy Trading environment.',
            'Select publish strategy and write a description.',
            'Profit whenever someone uses your strategy.',
          ]}
          image="https://protradercopy.com/local/templates/weltrade.main/components/wt/static.content/trader.copy.trading/wt/content.detail/default/img/how-share.jpg"
        />
      </div>
    </section>
  );
}
