import { useState, useEffect, useRef } from 'react';
import { LineChart, Line, ResponsiveContainer, YAxis, Area } from 'recharts';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { logoAnimation } from '@/lib/utils';
import { AnimatedSection } from './ui/animated-section';

// Type definitions
interface MarketItem {
  name: string;
  ticker: string;
  change: string;
  color: string;
  logo: string;
  data: number[];
}

interface PlatformItem {
  image: string;
  features: string[];
}

type MarketDataType = {
  [key: string]: MarketItem[];
};

type PlatformDataType = {
  [key: string]: PlatformItem;
};

// Generate realistic chart data with natural patterns
const generateChartData = (
  baseLine: number,
  volatility: number,
  trend: number,
  points = 24,
) => {
  const data = [];
  let value = baseLine;

  for (let i = 0; i < points; i++) {
    // Add random movement
    const noise = (Math.random() - 0.5) * volatility;

    // Add trend component
    const trendComponent = trend * (i / points);

    // Calculate new value with minimum variance to ensure realistic look
    value = value + noise + trendComponent;

    // Avoid negative values
    if (value < 0) value = baseLine * 0.1;

    data.push(value);
  }

  return data;
};

// Calculate percentage change between first and last value
const calculateChange = (data: number[]) => {
  const first = data[0];
  const last = data[data.length - 1];
  const percentChange = ((last - first) / first) * 100;

  // Format with two decimal places and +/- sign
  return (percentChange >= 0 ? '+' : '') + percentChange.toFixed(2) + '%';
};

// Market data for all tabs
const marketData: MarketDataType = {
  'Share CFDs': [
    {
      name: 'Meta',
      ticker: 'META',
      change: '+0.37%',
      color: '#4ade80',
      logo: 'https://logosandtypes.com/wp-content/uploads/2022/03/metaverse.svg',
      data: generateChartData(304.75, 3, 1.5),
    },
    {
      name: 'Netflix',
      ticker: 'NFLX',
      change: '+0.14%',
      color: '#4ade80',
      logo: 'https://play-lh.googleusercontent.com/TBRwjS_qfJCSj1m7zZB93FnpJM5fSpMA_wUlFDLxWAb45T9RmwBvQd5cWR5viJJOhkI=w480-h960-rw',
      data: generateChartData(631.22, 5, 0.7),
    },
    {
      name: 'Amazon',
      ticker: 'AMZN',
      change: '-0.34%',
      color: '#f87171',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png',
      data: generateChartData(181.51, 2, -0.6),
    },
    {
      name: 'Tesla',
      ticker: 'TSLA',
      change: '+0.53%',
      color: '#4ade80',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Tesla_T_symbol.svg/383px-Tesla_T_symbol.svg.png?20170327222004',
      data: generateChartData(175.22, 4, 1.8),
    },
  ],
  Crypto: [
    {
      name: 'Bitcoin',
      ticker: 'BTC/USD',
      change: '+1.24%',
      color: '#4ade80',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png',
      data: generateChartData(67850, 1200, 900),
    },
    {
      name: 'Ethereum',
      ticker: 'ETH/USD',
      change: '+0.87%',
      color: '#4ade80',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/1200px-Ethereum_logo_2014.svg.png',
      data: generateChartData(3570, 80, 60),
    },
    {
      name: 'Solana',
      ticker: 'SOL/USD',
      change: '-0.42%',
      color: '#f87171',
      logo: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png',
      data: generateChartData(142.8, 3.5, -0.7),
    },
    {
      name: 'Cardano',
      ticker: 'ADA/USD',
      change: '+0.33%',
      color: '#4ade80',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Cardano_Logo.png',
      data: generateChartData(0.452, 0.01, 0.004),
    },
  ],
  Forex: [
    {
      name: 'EUR/USD',
      ticker: 'EUR/USD',
      change: '-0.12%',
      color: '#f87171',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/1200px-Flag_of_Europe.svg.png',
      data: generateChartData(1.0848, 0.0015, -0.0013),
    },
    {
      name: 'GBP/USD',
      ticker: 'GBP/USD',
      change: '+0.05%',
      color: '#4ade80',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Flag_of_the_United_Kingdom.svg/1200px-Flag_of_the_United_Kingdom.svg.png',
      data: generateChartData(1.267, 0.0018, 0.0006),
    },
    {
      name: 'USD/JPY',
      ticker: 'USD/JPY',
      change: '+0.23%',
      color: '#4ade80',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/1200px-Flag_of_Japan.svg.png',
      data: generateChartData(149.55, 0.25, 0.35),
    },
    {
      name: 'AUD/USD',
      ticker: 'AUD/USD',
      change: '-0.08%',
      color: '#f87171',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Australia_%28converted%29.svg/1200px-Flag_of_Australia_%28converted%29.svg.png',
      data: generateChartData(0.6565, 0.0028, -0.0006),
    },
  ],
  Indices: [
    {
      name: 'S&P 500',
      ticker: 'US500',
      change: '+0.32%',
      color: '#4ade80',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/S%26P_500_logo.svg/1200px-S%26P_500_logo.svg.png',
      data: generateChartData(5148, 15, 17),
    },
    {
      name: 'Dow Jones',
      ticker: 'US30',
      change: '+0.18%',
      color: '#4ade80',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/DJIA_historical_graph_to_jul11_%28log%29.svg/220px-DJIA_historical_graph_to_jul11_%28log%29.svg.png',
      data: generateChartData(39450, 100, 70),
    },
    {
      name: 'NASDAQ',
      ticker: 'US100',
      change: '+0.47%',
      color: '#4ade80',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Nasdaq_Stock_Market_logo.svg/800px-Nasdaq_Stock_Market_logo.svg.png',
      data: generateChartData(18050, 60, 85),
    },
    {
      name: 'FTSE 100',
      ticker: 'UK100',
      change: '-0.15%',
      color: '#f87171',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/FTSE_Logo.svg/1200px-FTSE_Logo.svg.png',
      data: generateChartData(8012, 28, -12),
    },
  ],
  Commodities: [
    {
      name: 'Gold',
      ticker: 'XAUUSD',
      change: '+0.42%',
      color: '#4ade80',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Gold_bullion_bars.jpg/240px-Gold_bullion_bars.jpg',
      data: generateChartData(2352, 10, 10),
    },
    {
      name: 'Silver',
      ticker: 'XAGUSD',
      change: '+0.38%',
      color: '#4ade80',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Silver_bullion_bars.jpg/240px-Silver_bullion_bars.jpg',
      data: generateChartData(29.18, 0.25, 0.12),
    },
    {
      name: 'Crude Oil',
      ticker: 'USOIL',
      change: '-0.27%',
      color: '#f87171',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Crude_oil_barrel.jpg/180px-Crude_oil_barrel.jpg',
      data: generateChartData(76.22, 0.8, -0.2),
    },
    {
      name: 'Natural Gas',
      ticker: 'NATGAS',
      change: '+0.61%',
      color: '#4ade80',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Natural_Gas_Pipeline.jpg/240px-Natural_Gas_Pipeline.jpg',
      data: generateChartData(2.18, 0.08, 0.015),
    },
  ],
};

// Updated platform data with professional images
const platformData: PlatformDataType = {
  'Metatrader 4': {
    image: 'https://www.icmarkets.com/assets/images/about-meta-trader.webp',
    features: [
      'Powerful Charting and Automated Trading',
      'Servers in New York, London, and more!',
      'Ultra-fast order execution under 15ms',
      'Advanced Market Analysis Tools',
      'Full EA Support with Custom Indicators',
    ],
  },
  'Metatrader 5': {
    image: 'https://www.icmarkets.com/assets/images/mt5.webp',
    features: [
      'Pro Depth and Strategy Tester',
      'Integrated Economic Calendar',
      'Supports Stocks and Futures',
      'Hedging and Netting Accounts',
      'Professional Multi-Asset Platform',
    ],
  },
  ProTrader: {
    image:
      'https://images.pexels.com/photos/6347711/pexels-photo-6347711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    features: [
      'Institutional-Grade Analysis',
      'Advanced Orders & Algorithms',
      'Customizable Trading Interface',
      'Real-time News Integration',
      'One-Click Trading Execution',
    ],
  },
  AppTrader: {
    image:
      'https://images.pexels.com/photos/6347711/pexels-photo-6347711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    features: [
      'Mobile-First Trading Experience',
      'Biometric Security Features',
      'Instant Trade Notifications',
      'Market Overview Dashboard',
      'Commission-Free Trading',
    ],
  },
  'CopyTrader App': {
    image:
      'https://images.pexels.com/photos/6347711/pexels-photo-6347711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    features: [
      'Follow Top Traders Globally',
      'Automated Position Copying',
      'Real-time Performance Analytics',
      'Risk Management Controls',
      'Diversified Portfolio Building',
    ],
  },
};

// Market section component
export const MarketSection: React.FC = () => {
  const [activeMarket, setActiveMarket] = useState<string>('Share CFDs');
  const marketTabs: string[] = Object.keys(marketData);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const indicatorRef = useRef<HTMLDivElement | null>(null);

  // Update data and changes on component load
  useEffect(() => {
    // Update the change percentages based on data
    Object.keys(marketData).forEach((category) => {
      marketData[category].forEach((item) => {
        const data = item.data;
        item.change = calculateChange(data);
        item.color = item.change.startsWith('+') ? '#4ade80' : '#f87171';
      });
    });
  }, []);

  // Update indicator position
  useEffect(() => {
    const updateIndicator = () => {
      const activeIndex = marketTabs.indexOf(activeMarket);
      const activeTab = tabRefs.current[activeIndex];
      const indicator = indicatorRef.current;

      if (activeTab && indicator) {
        // Get tab dimensions and position
        const tabRect = activeTab.getBoundingClientRect();
        const parentRect = activeTab.parentElement?.getBoundingClientRect() || {
          left: 0,
        };

        // Calculate relative position and set indicator position
        const tabLeft = tabRect.left - parentRect.left;

        indicator.style.left = `${tabLeft}px`;
        indicator.style.width = `${tabRect.width}px`;
      }
    };

    updateIndicator();
    // Also update on window resize
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeMarket, marketTabs]);

  return (
    <AnimatedSection delay={1}>
      <div className="max-w-5xl mx-auto py-20 px-4">
        <h2 className="text-center text-2xl font-semibold mb-2">
          Trade Global Markets at the Lowest Costs!
        </h2>
        <p className="text-center text-sm text-white/70 max-w-xl mx-auto mb-8">
          Gain fast and easy access to 1000+ of the most liquid Currencies,
          Indices, Commodities, Share CFDs, ETFs and more with{' '}
          <span className="font-bold text-white">
            PRIME ECN spreads from 0.0 pips!
          </span>
        </p>

        <div className="relative border-b border-white/5 mb-6 max-w-fit mx-auto">
          <div className="flex justify-center space-x-6 overflow-x-auto">
            {marketTabs.map((tab, index) => (
              <button
                key={tab}
                ref={(el) => (tabRefs.current[index] = el)}
                className={`pb-2 px-4 text-sm whitespace-nowrap ${
                  activeMarket === tab
                    ? 'text-cyan-400 font-semibold'
                    : 'text-white/60'
                }`}
                onClick={() => setActiveMarket(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white/20">
            <div
              ref={indicatorRef}
              className="absolute h-0.5 bg-cyan-400 transition-all duration-300 ease-in-out"
            />
          </div>
        </div>

        <div className="bg-[#0D1229]/60 backdrop-blur-md rounded-xl p-4 shadow-lg w-full max-w-4xl mx-auto">
          {marketData[activeMarket]?.map((item: MarketItem, i: number) => (
            <div
              key={i}
              className="flex justify-between items-center py-3 border-b border-white/10 last:border-none"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-3 overflow-hidden">
                  <img
                    src={item.logo}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to first letter if image fails to load
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = `<div class="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">${item.name.charAt(
                        0,
                      )}</div>`;
                    }}
                  />
                </div>
                <div>
                  <h4 className="font-medium text-white">{item.name}</h4>
                  <span className="text-white/50 text-xs">{item.ticker}</span>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-24 h-16 mr-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={item.data.map((value: number) => ({ value }))}
                    >
                      <YAxis domain={['dataMin', 'dataMax']} hide={true} />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={item.color}
                        strokeWidth={1.5}
                        dot={false}
                        isAnimationActive={true}
                        activeDot={{ r: 3 }}
                        fill={`url(#colorFill${i})`}
                      />
                      <defs>
                        <linearGradient
                          id={`colorFill${i}`}
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor={item.color}
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor={item.color}
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="none"
                        fillOpacity={1}
                        fill={`url(#colorFill${i})`}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div
                  className={`text-sm font-medium ${
                    item.change.startsWith('-')
                      ? 'text-red-500'
                      : 'text-green-400'
                  }`}
                >
                  {item.change}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

// Platform section component
export const PlatformSection: React.FC = () => {
  const [activePlatform, setActivePlatform] = useState<string>('Metatrader 4');
  const platformTabs: string[] = Object.keys(platformData);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const indicatorRef = useRef<HTMLDivElement | null>(null);

  // Update indicator position
  useEffect(() => {
    const updateIndicator = () => {
      const activeIndex = platformTabs.indexOf(activePlatform);
      const activeTab = tabRefs.current[activeIndex];
      const indicator = indicatorRef.current;

      if (activeTab && indicator) {
        // Get tab dimensions and position
        const tabRect = activeTab.getBoundingClientRect();
        const parentRect = activeTab.parentElement?.getBoundingClientRect() || {
          left: 0,
        };

        // Calculate relative position and set indicator position
        const tabLeft = tabRect.left - parentRect.left;

        indicator.style.left = `${tabLeft}px`;
        indicator.style.width = `${tabRect.width}px`;
      }
    };

    updateIndicator();
    // Also update on window resize
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activePlatform, platformTabs]);

  return (
    <AnimatedSection>
      <div className="max-w-5xl mx-auto py-20 px-4">
        <h2 className="text-4xl font-bold text-center mb-4">
          Stable. Powerful. <span className="text-white/80">Super-Fast.</span>
        </h2>
        <p className="text-center text-sm leading-7 text-white/60 max-w-3xl mx-auto mb-8">
          Seamlessly integrated and built for high-performance trading, we
          connect your trading platforms to the closest Equinix data centre to
          you,{' '}
          <strong className="text-white/70 font-semibold">
            giving you the fastest possible trade execution
          </strong>{' '}
          to gain the edge you need to stay ahead of the markets.
        </p>

        <div className="relative border-b border-white/5 mb-10 max-w-fit mx-auto">
          <div className="flex justify-center space-x-6 overflow-x-auto">
            {platformTabs.map((tab, index) => (
              <button
                key={tab}
                ref={(el) => (tabRefs.current[index] = el)}
                className={`pb-2 px-4 text-sm whitespace-nowrap ${
                  activePlatform === tab
                    ? 'text-cyan-400 font-semibold'
                    : 'text-white/60'
                }`}
                onClick={() => setActivePlatform(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white/20">
            <div
              ref={indicatorRef}
              className="absolute h-0.5 bg-cyan-400 transition-all duration-300 ease-in-out"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
          <div className="w-full max-w-md rounded-xl shadow-lg overflow-hidden bg-[#0D1229]/60 backdrop-blur-md border border-white/10">
            <div className="w-full h-70 overflow-hidden relative">
              <img
                src={platformData[activePlatform].image}
                alt={activePlatform}
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
              />
            </div>
          </div>

          <ul className="space-y-4 max-w-md">
            {platformData[activePlatform]?.features.map(
              (feat: string, i: number) => (
                <li key={i} className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-cyan-500/30 flex items-center justify-center text-cyan-400">
                    ✓
                  </span>
                  <span className="text-sm text-white/80">{feat}</span>
                </li>
              ),
            )}
            <motion.li className="pt-4" whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="hover:opacity-90 text-white">
                Get Started Now
              </Button>
            </motion.li>
          </ul>
        </div>
      </div>
    </AnimatedSection>
  );
};

// Combined component
const TabbedSections: React.FC = () => {

  return (
    <div className="relative bg-transparent text-white overflow-hidden">
      {/* Background Effects with Blur */}
      <div className="absolute inset-0 bg-bodydark backdrop-blur-lg z-0"></div>

      {/* Spinning Copyelite logo in top-left */}
      <div className="absolute top-150 -left-20 z-2 overflow-hidden w-180 h-180 -translate-x-1/2 -translate-y-1/2 opacity-70">
        <motion.img
          src="https://protradercopy.com/wp-content/themes/ProTrader-Copy/images/market-transaction-animation.webp"
          alt="Copyelite Logo"
          className="w-full h-full"
          animate={logoAnimation}
        />
        <div className="absolute top-0 left-0 w-full h-full  bg-gradient-to-b from-[#1218260d] via-bodydark to-bodydark"></div>
      </div>

      <div className="absolute top-40 -left-40 w-60 h-60 bg-cyan-500/30 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-cyan-500/30 blur-3xl rounded-full" />

      {/* Content with relative positioning */}
      <div className="relative z-10">
        {/* Market Section */}
        <MarketSection />

        {/* Platform Section */}
        <PlatformSection />

        {/* Additional Info Section */}
        <AnimatedSection>
          <div className="max-w-5xl mx-auto py-10 px-4 border-t border-white/10">
            <p className="text-center text-xs text-white/40 mb-2">
              Markets move fast, it takes superior trading platforms to keep up!
            </p>
            <div className="flex justify-center items-center space-x-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">15ms</div>
                <div className="text-xs text-white/60">Order Execution</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">99.9%</div>
                <div className="text-xs text-white/60">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">24/7</div>
                <div className="text-xs text-white/60">Support</div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default TabbedSections;
