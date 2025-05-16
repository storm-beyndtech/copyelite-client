import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Button } from './ui/button';
import { Coins, Timer, UserRound, UsersRound } from 'lucide-react';

interface TraderProfile {
  id: string;
  name: string;
  avatar: string;
  gainPercentage: number;
  allTimeGain: string;
  risk: 'Low' | 'Medium' | 'High';
  followers: number;
  lastActive: string;
  subtitle?: string;
  profitTrend?: number[];
}

interface CopyTradingProps {
  traders: TraderProfile[];
}

const BenefitCard: React.FC<{ icon: React.ReactNode; title: string }> = ({
  icon,
  title,
}) => (
  <div className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center text-center h-40 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-100 group">
    <div className="bg-green-50 p-4 rounded-full text-green-500 mb-4 group-hover:bg-green-500 group-hover:text-white transition-all duration-300">
      {icon}
    </div>
    <p className="text-gray-600 font-semibold group-hover:text-green-600 transition-colors duration-300">
      {title}
    </p>
  </div>
);

const TraderCard: React.FC<{ trader: TraderProfile; traderIndex: number }> = ({
  trader,
  traderIndex,
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  // Professional avatar URLs based on trader index
  const avatarUrls = [
    'https://randomuser.me/api/portraits/men/32.jpg',
    'https://randomuser.me/api/portraits/women/44.jpg',
    'https://randomuser.me/api/portraits/men/22.jpg',
    'https://randomuser.me/api/portraits/women/68.jpg',
    'https://randomuser.me/api/portraits/men/75.jpg',
    'https://randomuser.me/api/portraits/women/90.jpg',
  ];

  const avatarUrl = `/api/placeholder/80/80`; // Fallback to placeholder

  // Default profit trend data if not provided
  const profitTrend = trader.profitTrend || [
    10, 25, 15, 30, 15, 20, 35, 20, 10, 30, 25, 40,
  ];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
      className="bg-white rounded-2xl p-6 relative overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200"
      whileHover={{ y: -5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-green-100 mr-3">
            <img
              src={avatarUrls[traderIndex] || avatarUrl}
              alt={trader.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium text-sm">{trader.name}</h3>
            {trader.subtitle && (
              <p className="text-xs text-gray-500">{trader.subtitle}</p>
            )}
          </div>
        </div>
        <button className="bg-green-400 hover:bg-green-600 text-white text-[10px] px-4 py-[1px] rounded-full font-semibold transition-colors duration-300">
          COPY
        </button>
      </div>

      <div className="mb-4">
        <div className="flex items-baseline">
          <span className="text-green-500 text-3xl font-bold">
            +{trader.gainPercentage}%
          </span>
        </div>
        <div className="text-xs text-gray-600 font-medium">Gain</div>
        <div className="text-xs text-gray-500">
          +{trader.allTimeGain} All time gain
        </div>
      </div>

      <div className="flex justify-between items-end">
        <div>
          <span
            className={`text-xs px-3 py-1 rounded-full font-medium ${
              trader.risk === 'Low'
                ? 'bg-green-50 text-green-600'
                : trader.risk === 'Medium'
                  ? 'bg-yellow-50 text-yellow-600'
                  : 'bg-red-50 text-red-600'
            }`}
          >
            {trader.risk} risk
          </span>
        </div>
        <div className="text-right">
          <div className="text-xs font-medium">
            {trader.followers} Followers
          </div>
          <div className="text-xs text-gray-500 font-medium">
            {trader.lastActive}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 h-20 overflow-hidden">
        <svg
          viewBox="0 0 100 40"
          className="w-full h-20 text-green-400 opacity-20"
        >
          <defs>
            <linearGradient
              id={`gradient-${trader.id}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.1" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <path
            d={`M0 40 ${profitTrend
              .map((point, i) => {
                const x = (i / (profitTrend.length - 1)) * 100;
                const y = 40 - (point / Math.max(...profitTrend)) * 35;
                return i === 0 ? `L ${x} ${y}` : `L ${x} ${y}`;
              })
              .join(' ')} V 40 H 0`}
            fill={`url(#gradient-${trader.id})`}
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>
    </motion.div>
  );
};

const CopyTrading: React.FC<CopyTradingProps> = ({ traders }) => {
  const headerControls = useAnimation();
  const benefitsControls = useAnimation();
  const leadersControls = useAnimation();
  const headerRef = useRef(null);
  const benefitsRef = useRef(null);
  const leadersRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });
  const benefitsInView = useInView(benefitsRef, { once: true });
  const leadersInView = useInView(leadersRef, { once: true });

  useEffect(() => {
    if (headerInView) {
      headerControls.start('visible');
    }
    if (benefitsInView) {
      benefitsControls.start('visible');
    }
    if (leadersInView) {
      leadersControls.start('visible');
    }
  }, [
    headerControls,
    benefitsControls,
    leadersControls,
    headerInView,
    benefitsInView,
    leadersInView,
  ]);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8">
      {/* Background decorations */}
      <div className="fixed top-0 left-0 right-0 bottom-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-100 rounded-full opacity-10 -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full opacity-10 translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
      </div>

      <motion.div
        ref={headerRef}
        initial="hidden"
        animate={headerControls}
        variants={{
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
        }}
        className="text-center mb-16 max-w-5xl mx-auto"
      >
        <h1 className="text-3xl font-bold my-5 text-bodydark">
          How you can benefit
          <br />
          from Copy Trading?
        </h1>

        <motion.div
          ref={benefitsRef}
          initial="hidden"
          animate={benefitsControls}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
          >
            <BenefitCard
              icon={<Coins />}
              title="Trade with others knowledge for FREE"
            />
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: 0.1 },
              },
            }}
          >
            <BenefitCard
              icon={<UsersRound />}
              title="Join a thriving community of like minded traders"
            />
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: 0.2 },
              },
            }}
          >
            <BenefitCard
              icon={<Timer />}
              title="Save time creating your own strategy"
            />
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: 0.3 },
              },
            }}
          >
            <BenefitCard
              icon={<UserRound />}
              title="Share your own strategy and profit"
            />
          </motion.div>
        </motion.div>

        <motion.div className="text-center mt-12" whileTap={{ scale: 0.95 }}>
          <Button size="md" animate className="hover:opacity-90 text-white">
            Start Copying
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        ref={leadersRef}
        initial="hidden"
        animate={leadersControls}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.7 } },
        }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold mb-3 relative inline-block">
            <span className="text-bodydark">More than 1000 leaders</span>
            <span className="block text-lg md:text-xl font-semibold text-gray-500 mt-2">
              to choose from in Interactive Copyelite Copy
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {traders.map((trader, index) => (
            <TraderCard key={trader.id} trader={trader} traderIndex={index} />
          ))}
        </div>

        <motion.div className="text-center mt-12" whileTap={{ scale: 0.95 }}>
          <Button size="md" animate className="hover:opacity-90 text-white">
            Start Copying
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

// Sample data
const sampleTraders: TraderProfile[] = [
  {
    id: '1',
    name: 'Thinh Ph...',
    avatar: '/avatar1.jpg',
    gainPercentage: 48,
    allTimeGain: '50%',
    risk: 'Medium',
    followers: 62,
    lastActive: '14 last 7d',
  },
  {
    id: '2',
    name: 'Maximuz',
    avatar: '/avatar2.jpg',
    gainPercentage: 122,
    allTimeGain: '295%',
    risk: 'Medium',
    followers: 56,
    lastActive: '12 last 7d',
    subtitle: 'Maximuz',
  },
  {
    id: '3',
    name: 'Axion',
    avatar: '/avatar3.jpg',
    gainPercentage: 35,
    allTimeGain: '236%',
    risk: 'Medium',
    followers: 87,
    lastActive: '11 last 7d',
  },
  {
    id: '4',
    name: 'DT Trading',
    avatar: '/avatar4.jpg',
    gainPercentage: 75,
    allTimeGain: '165%',
    risk: 'Medium',
    followers: 22,
    lastActive: '8 last 7d',
    subtitle: '1-3% daily',
  },
  {
    id: '5',
    name: 'EA TRADE...',
    avatar: '/avatar5.jpg',
    gainPercentage: 41,
    allTimeGain: '108%',
    risk: 'Medium',
    followers: 13,
    lastActive: '7 last 7d',
    subtitle: 'VIP GU Gold HY 500',
  },
  {
    id: '6',
    name: 'Forex Aut...',
    avatar: '/avatar6.jpg',
    gainPercentage: 32,
    allTimeGain: '38%',
    risk: 'Medium',
    followers: 23,
    lastActive: '7 last 7d',
    subtitle: 'Prashant Goutam',
  },
];

// Demo component
export default function Sec5() {
  return <CopyTrading traders={sampleTraders} />;
}
