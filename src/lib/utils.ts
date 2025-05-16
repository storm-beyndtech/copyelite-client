// Logo spinning animation
export const logoAnimation = {
  rotate: [0, 360],
  transition: {
    duration: 20,
    ease: 'linear',
    repeat: Infinity,
  },
};

// Infinite bounce animation
export const bounceAnimation = {
  y: [0, -20, 0], // move up then down
  transition: {
    duration: 3,
    ease: 'easeInOut',
    repeat: Infinity,
  },
};

export interface MenuItem {
  label: string;
  to: string;
}

export const marketDropDownLinks: MenuItem[] = [
  {
    label: 'Bonds',
    to: '/bonds',
  },
  {
    label: 'Commodities',
    to: '/commodities',
  },
  {
    label: 'Crypto',
    to: '/crypto',
  },
  {
    label: 'ETFs',
    to: '/etfs',
  },
  {
    label: 'Forex',
    to: '/fx',
  },
  {
    label: 'Indices',
    to: '/indices',
  },
  {
    label: 'Share CFDs',
    to: '/share-cfds',
  },
  {
    label: 'Spreads',
    to: '/spreads',
  },
  {
    label: 'Trading Hours',
    to: '/trading-hours',
  },
];

export const companyDropDownLinks: MenuItem[] = [
  {
    label: 'About Us',
    to: '/about',
  },
  {
    label: 'Awards',
    to: '/awards',
  },
  {
    label: 'Careers',
    to: '/careers',
  },
  {
    label: 'Support',
    to: '/contact',
  },
  {
    label: 'Compare Account',
    to: '/compare-account',
  },
  {
    label: 'Expert Trader',
    to: '/expert-trader',
  },
  {
    label: 'FAQ',
    to: '/faq',
  },
  {
    label: 'Insurance',
    to: '/insurance',
  },
  {
    label: 'Leverage',
    to: '/leverage',
  },
];

export const toolsDropDownLinks: MenuItem[] = [
  {
    label: 'AI Market Buzz',
    to: '/ai-market-buzz',
  },
  {
    label: 'Economic Canledar',
    to: '/economic-canledar',
  },
  {
    label: 'Forex Sentiment',
    to: '/forex-sentiment',
  },
  {
    label: 'Market News',
    to: '/market-news',
  },
  {
    label: 'Premium Economic Canledar',
    to: '/premium-economic-canledar',
  },
  {
    label: 'Technical Views',
    to: '/technical-views',
  },
  {
    label: 'Trade Signals',
    to: '/trade-signals',
  },
  {
    label: 'Trade Vps',
    to: '/trade-vps',
  },
];

export const bonds = {
  title: 'Popular Bonds',
  type: 'bonds',
  markets: [
    {
      symbol: 'FGBL',
      name: 'Euro-Bund Futures',
      exchange: 'Euro-Bund Futures',
      image:
        'https://protradercopy.com/wp-content/themes/ProTrader-Copy/images/popular-bonds-img01.webp',
    },
    {
      symbol: 'FLG',
      name: 'Euronext',
      exchange: 'Euronext',
      image:
        'https://protradercopy.com/wp-content/themes/ProTrader-Copy/images/popular-bonds-img2.webp',
    },
    {
      symbol: 'TY',
      name: 'CBOT',
      exchange: 'CBOT',
      image:
        'https://protradercopy.com/wp-content/themes/ProTrader-Copy/images/popular-bonds-img3.webp',
    },
    {
      symbol: 'FEI',
      name: 'ICE',
      exchange: 'ICE',
      image:
        'https://protradercopy.com/wp-content/themes/ProTrader-Copy/images/popular-bonds-img4.webp',
    },
  ],
};

export const shareCFDs = {
  title: 'Popular Share CFDs',
  type: 'shareCFDs',
  markets: [
    {
      symbol: 'AAPL',
      name: 'Apple',
      exchange: 'Apple',
      image:
        'https://protradercopy.com/wp-content/themes/ProTrader-Copy/images/popular-shares-icon1.webp',
    },
    {
      symbol: 'GOOGL',
      name: 'Google',
      exchange: 'Google',
      image:
        'https://protradercopy.com/wp-content/themes/ProTrader-Copy/images/popular-shares-icon2.webp',
    },
    {
      symbol: 'META',
      name: 'Meta',
      exchange: 'Meta',
      image:
        'https://protradercopy.com/wp-content/themes/ProTrader-Copy/images/popular-shares-icon3.webp',
    },
    {
      symbol: 'NFLX',
      name: 'Netflix',
      exchange: 'Netflix',
      image:
        'https://protradercopy.com/wp-content/themes/ProTrader-Copy/images/popular-shares-icon4.webp',
    },
  ],
};

export const forex = {
  title: 'Popular Forex Pairs',
  type: 'forex',
  markets: [
    {
      symbol: 'EURUSD',
      name: 'EUR/USD',
      exchange: 'EUR / USD',
      image:
        'https://protradercopy.com/wp-content/themes/ProTrader-Copy/images/popular-forex-icon1.webp',
    },
    {
      symbol: 'AUDUSD',
      name: 'AUD/USD',
      exchange: 'AUD / USD',
      image:
        'https://protradercopy.com/wp-content/themes/ProTrader-Copy/images/popular-forex-icon2.webp',
    },
    {
      symbol: 'GBPUSD',
      name: 'GBP/USD',
      exchange: 'GBP / USD',
      image:
        'https://protradercopy.com/wp-content/themes/ProTrader-Copy/images/popular-forex-icon3.webp',
    },
    {
      symbol: 'USDJPY',
      name: 'USD/JPY',
      exchange: 'USD / JPY',
      image:
        'https://protradercopy.com/wp-content/themes/ProTrader-Copy/images/popular-forex-icon4.webp',
    },
  ],
};

export const commodity = {
  title: 'Popular Commodity Markets',
  type: 'commodity',
  markets: [
    {
      symbol: 'XAUUSD',
      name: 'Gold',
      exchange: 'Gold',
      image:
        'https://protradercopy.com/wp-content/themes/ProTrader-Copy/images/popular-commodities-icon1%EF%B9%96v=1.webp',
    },
    {
      symbol: 'CL-OIL',
      name: 'Oil',
      exchange: 'Oil',
      image:
        'https://protradercopy.com/wp-content/themes/ProTrader-Copy/images/popular-commodities-icon2%EF%B9%96v=1.webp',
    },
    {
      symbol: 'XAGUSD',
      name: 'Silver',
      exchange: 'Silver',
      image:
        'https://protradercopy.com/wp-content/themes/ProTrader-Copy/images/popular-commodities-icon3%EF%B9%96v=1.webp',
    },
    {
      symbol: 'NATGAS',
      name: 'Natural Gas',
      exchange: 'Natural Gas',
      image:
        'https://protradercopy.com/wp-content/themes/ProTrader-Copy/images/popular-commodities-icon4%EF%B9%96v=1.webp',
    },
  ],
};

export const crypto = {
  title: 'Popular Crypto Markets',
  type: 'crypto',
  markets: [
    {
      symbol: 'BTCUSD',
      name: 'Bitcoin',
      exchange: 'Bitcoin',
      image: 'https://assets.coincap.io/assets/icons/btc@2x.png',
    },
    {
      symbol: 'ETHUSD',
      name: 'Ethereum',
      exchange: 'Ethereum',
      image: 'https://assets.coincap.io/assets/icons/eth@2x.png',
    },
    {
      symbol: 'LTCUSD',
      name: 'Litecoin',
      exchange: 'Litecoin',
      image: 'https://assets.coincap.io/assets/icons/ltc@2x.png',
    },
    {
      symbol: 'XRPUSD',
      name: 'Ripple',
      exchange: 'Ripple',
      image: 'https://assets.coincap.io/assets/icons/xrp@2x.png',
    },
  ],
};

export const indices = {
  title: 'Popular Indices',
  type: 'indices',
  markets: [
    {
      symbol: 'US500',
      name: 'S&P 500',
      exchange: 'S&P 500',
      image:
        'https://protradercopy.com/wp-content/themes/ProTrader-Copy/images/popular-indices-icon1.webp',
    },
    {
      symbol: 'NASDAQ',
      name: 'NASDAQ',
      exchange: 'NASDAQ',
      image:
        'https://protradercopy.com/wp-content/themes/ProTrader-Copy/images/popular-indices-icon1.webp',
    },
    {
      symbol: 'UK100',
      name: 'FTSE 100',
      exchange: 'FTSE 100',
      image:
        'https://protradercopy.com/wp-content/themes/ProTrader-Copy/images/popular-indices-icon3.webp',
    },
    {
      symbol: 'GER40',
      name: 'DAX',
      exchange: 'DAX',
      image:
        'https://protradercopy.com/wp-content/themes/ProTrader-Copy/images/popular-indices-icon2.webp',
    },
  ],
};

export const etfs = {
  title: 'Popular ETFs',
  type: 'etfs',
  markets: [
    {
      symbol: 'SPY',
      name: 'SPDR S&P 500',
      exchange: 'SPDR S&P 500',
      image:
        'https://protradercopy.com/wp-content/themes/ProTrader-Copy/images/popular-etfs-icon1.webp',
    },
    {
      symbol: 'QQQ',
      name: 'Invesco QQQ',
      exchange: 'Invesco QQQ',
      image:
        'https://protradercopy.com/wp-content/themes/ProTrader-Copy/images/popular-etfs-icon2.webp',
    },
    {
      symbol: 'GLD',
      name: 'SPDR Gold',
      exchange: 'SPDR Gold',
      image:
        'https://protradercopy.com/wp-content/themes/ProTrader-Copy/images/popular-etfs-icon3.webp',
    },
    {
      symbol: 'VTI',
      name: 'Vanguard Total',
      exchange: 'Vanguard Total',
      image:
        'https://protradercopy.com/wp-content/themes/ProTrader-Copy/images/popular-etfs-icon4.webp',
    },
  ],
};


export const testimonies = [
  {
    title: 'Product Manager | Capsule',
    name: 'Josh Tyson',
    imgUrl:
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80',
    message:
      "Ameritrades has made navigating the complex world of finance a breeze. Their extensive range of services reflects their expertise. Ameritrades's friendly demeanor and organized approach have made managing my investments effortless. For all things related to copy trading and financial planning, they're the ones I trust.",
  },
  {
    title: 'Senior Director of Operations | Fitbit',
    name: 'Luisa',
    imgUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80',
    message:
      "Ameritrades epitomizes excellence in copy trading services. Their unwavering dedication to ensuring customer satisfaction sets them apart. With a secure approach, authentic insights, and swift responsiveness, every interaction is seamless. If you're looking for a copy trading platform that delivers results, I wholeheartedly recommend Ameritrades!",
  },
  {
    title: 'Financial Analyst | Nova',
    name: 'Alisa Williams',
    imgUrl:
      'https://images.unsplash.com/photo-1579017331263-ef82f0bbc748?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=900&h=900&q=80',
    message:
      "I've had the privilege of working with Ameritrades for some time now, and their professionalism and knowledge continue to impress me. They provide thoughtful advice tailored to my financial goals and risk tolerance. Ameritrades's commitment to their clients' success is truly remarkable.",
  },
  {
    title: 'Tech Entrepreneur | Quantum',
    name: 'Michael',
    imgUrl:
      'https://images.pexels.com/photos/3932542/pexels-photo-3932542.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    message:
      "Ameritrades's financial expertise has been a game-changer for me. Their insights into market trends and their ability to explain complex concepts in simple terms have empowered me to make better financial decisions. Their services have exceeded my expectations in every way.",
  },
  {
    title: 'Investment Strategist | Luna',
    name: 'Sarah Thompson',
    imgUrl: 'https://source.unsplash.com/320x320/?woman',
    message:
      "Ameritrades's commitment to their clients is truly commendable. Their dedication to achieving financial goals is evident in every interaction. Their insights have helped me navigate volatile markets with confidence, and their friendly approach makes discussing finances a breeze.",
  },
  {
    title: 'Wealth Manager | Quantum',
    name: 'Anderson',
    imgUrl:
      'https://plus.unsplash.com/premium_photo-1682000321215-a061fd738095?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODV8fHdoaXRlJTIwbWFsZXxlbnwwfHwwfHx8MA%3D%3D',
    message:
      "Working with Ameritrades has been enlightening. Their advice extends beyond mere financial matters; they're a holistic wealth advisor. Their personalized approach and genuine care for their clients' financial well-being are what set them apart. I'm grateful for their guidance.",
  },
  {
    title: 'Entrepreneur | Happy customer',
    name: 'Clark',
    imgUrl:
      'https://images.unsplash.com/photo-1554260570-9140fd3b7614?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fHdoaXRlJTIwbWFsZXxlbnwwfHwwfHx8MA%3D%3D',
    message:
      "Ameritrades's expertise stands out in a crowded financial landscape. Their knowledge of investment opportunities and risk management is unparalleled. They've not only helped me make informed decisions but also educated me along the way. I highly recommend their services.",
  },
  {
    title: 'Crypto Enthusiast | Cosmos',
    name: 'Miller',
    imgUrl:
      'https://images.unsplash.com/photo-1514851947871-97fd1e04b2e5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjR8fHdoaXRlJTIwbWFsZXxlbnwwfHwwfHx8MA%3D%3D',
    message:
      "Ameritrades is a financial wizard. Their ability to foresee market trends and recommend timely actions is remarkable. I've achieved significant growth in my investments under their guidance. They're not just financial advisors; they're strategic partners in wealth-building.",
  },
  {
    title: 'Retirement Planner | Nebula',
    name: 'Yousaf',
    imgUrl:
      'https://images.unsplash.com/photo-1610611803787-7cd04238196f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fHdoaXRlJTIwbWFsZXxlbnwwfHwwfHx8MA%3D%3D',
    message:
      "I've been a client of Ameritrades for years, and their dedication to my financial success has never wavered. Their well-rounded expertise covers everything from retirement planning to tax-efficient investing. They're an invaluable asset in securing my financial future.",
  },
  {
    title: 'Socially Responsible Investor | Quantum',
    name: 'Nathan',
    imgUrl:
      'https://images.unsplash.com/photo-1590086782957-93c06ef21604?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2hpdGUlMjBtYWxlfGVufDB8fDB8fHww',
    message:
      "Ameritrades's commitment to ethical financial practices is inspiring. Their recommendations are always aligned with my values, and their transparency in explaining financial strategies is refreshing. With their guidance, I've been able to achieve my financial goals while staying socially responsible.",
  },
];