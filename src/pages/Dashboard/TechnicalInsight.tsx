import { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart3,
  Target,
  AlertTriangle,
} from 'lucide-react';
import { contextData } from '@/context/AuthContext';
import { TradingViewWidget } from './PracticeTrade';

export default function TechnicalInsight() {
  const [selectedSymbol, setSelectedSymbol] = useState('AAPL');
  const [timeframe, setTimeframe] = useState('4h');
  const [loading, setLoading] = useState(false);
  const { theme } = contextData();

  // Mock technical analysis data
  const [technicalData, setTechnicalData] = useState({
    signal: 'BUY',
    strength: 75,
    rsi: 62.5,
    macd: 'Bullish',
    support: 45250,
    resistance: 48500,
    trend: 'Upward',
  });

  const symbols = [
    { symbol: 'AAPL', name: 'Apple Inc. (AAPL)' },
    { symbol: 'MSFT', name: 'Microsoft Corp. (MSFT)' },
    { symbol: 'GOOGL', name: 'Alphabet Inc. (GOOGL)' },
    { symbol: 'AMZN', name: 'Amazon.com Inc. (AMZN)' },
    { symbol: 'TSLA', name: 'Tesla Inc. (TSLA)' },
  ];

  const timeframes = ['1m', '5m', '15m', '1h', '4h', '1D', '1W'];

  const handleSymbolChange = (symbol: any) => {
    setLoading(true);
    setSelectedSymbol(symbol);
    setTimeout(() => {
      setTechnicalData({
        ...technicalData,
        signal: Math.random() > 0.5 ? 'BUY' : 'SELL',
        strength: Math.floor(Math.random() * 100),
        rsi: Math.floor(Math.random() * 100),
        support: Math.floor(Math.random() * 50000) + 40000,
        resistance: Math.floor(Math.random() * 55000) + 45000,
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="w-full p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
          Technical Insight Dashboard
        </h1>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 min-w-0">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Select Symbol
            </label>
            <select
              value={selectedSymbol}
              onChange={(e) => handleSymbolChange(e.target.value)}
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            >
              {symbols.map((item) => (
                <option key={item.symbol} value={item.symbol}>
                  {item.name} ({item.symbol})
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 min-w-0">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Timeframe
            </label>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            >
              {timeframes.map((tf) => (
                <option key={tf} value={tf}>
                  {tf}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Technical Analysis Panel */}
          <div className="xl:col-span-1 space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg shadow p-4 sm:p-6 dark:bg-gray-800 dark:border-gray-700">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Activity className="mr-2" size={20} />
                Technical Analysis
              </h3>

              {loading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      Signal:
                    </span>
                    <span
                      className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold ${
                        technicalData.signal === 'BUY'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      }`}
                    >
                      {technicalData.signal === 'BUY' ? (
                        <>
                          <TrendingUp className="inline mr-1" size={14} />
                          BUY
                        </>
                      ) : (
                        <>
                          <TrendingDown className="inline mr-1" size={14} />
                          SELL
                        </>
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      Strength:
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 sm:w-24 bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                        <div
                          className={`h-2 rounded-full ${
                            technicalData.strength > 70
                              ? 'bg-green-600'
                              : technicalData.strength > 40
                                ? 'bg-yellow-600'
                                : 'bg-red-600'
                          }`}
                          style={{ width: `${technicalData.strength}%` }}
                        ></div>
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">
                        {technicalData.strength}%
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        RSI:
                      </span>
                      <span className="font-bold text-gray-900 dark:text-white">
                        {technicalData.rsi}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        MACD:
                      </span>
                      <span className="font-bold text-gray-900 dark:text-white">
                        {technicalData.macd}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-300">
                        Support:
                      </span>
                      <span className="font-bold text-green-600">
                        ${technicalData.support.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-300">
                        Resistance:
                      </span>
                      <span className="font-bold text-red-600">
                        ${technicalData.resistance.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white border border-gray-200 rounded-lg shadow p-4 sm:p-6 dark:bg-gray-800 dark:border-gray-700">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Target className="mr-2" size={20} />
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md border border-emerald-600 hover:border-emerald-700 text-sm sm:text-base">
                  Set Buy Alert
                </button>
                <button className="w-full bg-red-600 hover:bg-rose-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md border border-rose-600 hover:border-rose-700 text-sm sm:text-base">
                  Set Sell Alert
                </button>
              </div>
            </div>
          </div>

          {/* TradingView Chart */}
          <div className="xl:col-span-2">
            <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-full">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                  <BarChart3 className="mr-2" size={20} />
                  Symbol Overview - {selectedSymbol}
                </h3>
              </div>
              <div className="h-full max-h-100">
                <TradingViewWidget theme={theme} symbol={selectedSymbol} />
              </div>
            </div>
          </div>
        </div>

        {/* Market Overview */}
        <div className="mt-6 bg-white border border-gray-200 rounded-lg shadow p-4 sm:p-6 dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <AlertTriangle className="mr-2" size={20} />
            Market Overview
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {symbols.slice(0, 4).map((item, index) => (
              <div
                key={item.symbol}
                className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                    {item.symbol}
                  </span>
                  <span
                    className={`text-xs sm:text-sm ${
                      index % 2 === 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {index % 2 === 0 ? '+2.5%' : '-1.2%'}
                  </span>
                </div>
                <div className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                  ${(Math.random() * 50000 + 10000).toFixed(2)}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  Vol: {(Math.random() * 1000000).toFixed(0)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
