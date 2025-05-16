import { useState } from 'react';
import BigChart from './BigChart';

const BigChartWrpDB = () => {
  // Available trading pairs
  const availablePairs = [
    { symbol: 'BINANCE:BTCUSDT', name: 'Bitcoin' },
    { symbol: 'BINANCE:ETHUSDT', name: 'Ethereum' },
    { symbol: 'BINANCE:BNBUSDT', name: 'Binance Coin' },
    { symbol: 'BINANCE:DOGEUSDT', name: 'Dogecoin' },
    { symbol: 'BINANCE:SOLUSDT', name: 'Solana' },
  ];

  // State for the currently selected pair
  const [currentPair, setCurrentPair] = useState(availablePairs[0].symbol);

  // Available timeframes
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Trading pairs */}
      <div className="flex flex-wrap gap-2">
        {availablePairs.map((pair) => (
          <button
            key={pair.symbol}
            onClick={() => setCurrentPair(pair.symbol)}
            className={`px-4 py-2 rounded-md transition-colors ${
              currentPair === pair.symbol
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            {pair.name}
          </button>
        ))}
      </div>

      {/* Chart container with responsive sizing */}
      <div className="w-full h-96 md:h-[600px] bg-opacity-0 rounded-lg overflow-hidden shadow-lg">
        <BigChart symbol={currentPair} theme="dark" />
      </div>
    </div>
  );
};

export default BigChartWrpDB;
