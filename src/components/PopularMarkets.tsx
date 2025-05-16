import {
  bonds,
  commodity,
  etfs,
  forex,
  indices,
  shareCFDs,
  crypto,
} from '@/lib/utils';
import { AnimatedSection } from './ui/animated-section';
interface Market {
  name: string;
  exchange: string;
  symbol: string;
  image: string;
}
interface MarketData {
  title: string;
  type: string;
  markets: Market[];
}

// Market card component
const MarketCard = ({ market, index }: { index: number; market: Market }) => {
  return (
    <AnimatedSection
      delay={0.3 * index}
      className="bg-gray-600/10 rounded-2xl p-6 flex flex-col items-center h-70 w-full max-w-60"
    >
      <img
        src={market.image}
        className="object-cover mb-4 rounded-full w-18 h-18 mt-[-50px]"
      />

      <div className="mt-auto">
        <div className="text-gray-600 text-sm text-center mb-2 font-semibold">
          {market.exchange}
        </div>
        <div className="text-white font-semibold text-xl mb-4 text-center">
          {market.symbol}
        </div>

        <div className="flex w-full justify-between mb-4 font-bold text-sm">
          <div className="text-gray-600">BID</div>
          <div className="text-gray-600">ASK</div>
        </div>

        <button className="bg-red-600 hover:bg-red-700 text-white font-semibold text-sm px-4 py-2 rounded-lg w-full text-center transition-colors duration-300">
          Trade Now
        </button>
      </div>
    </AnimatedSection>
  );
};

export const PopularMarkets = ({ type = 'forex' }) => {
  const marketData: MarketData =
    type === 'forex'
      ? forex
      : type === 'bonds'
        ? bonds
        : type === 'shareCFDs'
          ? shareCFDs
          : type === 'crypto'
            ? crypto
            : type === 'commodity'
              ? commodity
              : type === 'indices'
                ? indices
                : etfs;

  return (
    <div className="w-full py-20 bg-bodydark relative overflow-x-hidden">
      <div className="absolute top-40 -left-40 w-60 h-60 bg-cyan-500/30 blur-3xl rounded-full" />
      <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient from-white via-white/70 to-white/30">
        {marketData.title}
      </h2>
      <div className="max-ctn flex items-center justify-center gap-6 flex-wrap">
        {marketData.markets.map((market: Market, i: number) => (
          <MarketCard market={market} index={i} />
        ))}
      </div>
    </div>
  );
};
