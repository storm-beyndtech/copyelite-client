import { useState, useEffect } from 'react';
import {
  TrendingDown,
  TrendingUp,
  Clock,
  Search,
  RefreshCw,
  BarChart3,
} from 'lucide-react';
import { contextData } from '@/context/AuthContext';

// Updated TypeScript interface to match new schema
interface DemoTrade {
  _id: string;
  symbol: string;
  marketDirection: 'buy' | 'sell';
  amount: number;
  profitPercent: number;
  profit: number;
  duration: number;
  createdAt: string;
  updatedAt: string;
}

const DemoTradeHistory = ({ changes }: any) => {
  const [trades, setTrades] = useState<DemoTrade[]>([]);
  const { user } = contextData();
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const fetchTrades = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${url}/trades/demo-trades/${user.email}`);
      const data = await res.json();

      if (res.ok) {
        const sortedTrades = data.trades.sort(
          (a: DemoTrade, b: DemoTrade) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );

        setTrades(sortedTrades);
        setLastUpdated(
          new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        );
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error fetching trades:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrades();
  }, [changes]);

  const filteredTrades = trades.filter((trade) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      trade.symbol.toLowerCase().includes(searchLower) ||
      trade.marketDirection.toLowerCase().includes(searchLower) ||
      new Date(trade.createdAt).toLocaleDateString().includes(searchLower)
    );
  });

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  return (
    <div className="w-full bg-white dark:bg-gray-950 rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-900">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-800 dark:text-white">
            Demo Trades
          </h2>
          {lastUpdated && (
            <div className="flex items-center text-[10px] text-gray-500 dark:text-gray-400">
              <span>Updated {lastUpdated}</span>
              <button
                onClick={fetchTrades}
                disabled={loading}
                className="ml-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none disabled:opacity-50"
              >
                <RefreshCw
                  className={`h-3.5 w-3.5 text-gray-400 ${
                    loading ? 'animate-spin' : ''
                  }`}
                />
              </button>
            </div>
          )}
        </div>

        <div className="mt-2 relative">
          <input
            type="text"
            placeholder="Search symbol, direction, or date..."
            className="w-full pl-8 pr-3 py-1.5 bg-gray-50 dark:bg-transparent border border-gray-200 dark:border-gray-800 rounded-md text-xs text-gray-700 dark:text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-2 top-2 h-3.5 w-3.5 text-gray-400" />
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {loading ? (
          <div className="p-8 flex justify-center items-center">
            <RefreshCw className="h-6 w-6 text-blue-500 animate-spin" />
          </div>
        ) : filteredTrades.length > 0 ? (
          <ul className="divide-y divide-gray-100 dark:divide-gray-700">
            {filteredTrades.map((trade) => (
              <li
                key={trade._id}
                className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-750 transition duration-150 ease-in-out"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`h-6 w-6 flex items-center justify-center rounded ${
                        trade.marketDirection === 'buy'
                          ? 'bg-green-600/10'
                          : 'bg-red-600/10'
                      }`}
                    >
                      <span
                        className={`font-bold text-[10px] ${
                          trade.marketDirection === 'buy'
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {trade.symbol.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center space-x-1.5">
                        <h3 className="text-xs font-medium text-gray-800 dark:text-white">
                          {trade.symbol.toUpperCase()}
                        </h3>
                        <span
                          className={`px-1 py-0 text-[10px] font-medium rounded ${
                            trade.marketDirection === 'buy'
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                              : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                          }`}
                        >
                          {trade.marketDirection.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                        <Clock className="h-2.5 w-2.5 mr-0.5" />
                        {new Date(trade.createdAt).toLocaleDateString('en-US', {
                          month: 'numeric',
                          day: 'numeric',
                        })}{' '}
                        {new Date(trade.createdAt).toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: false,
                        })}
                        <span className="mx-1">•</span>
                        <span>{formatDuration(trade.duration)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      <span className="text-xs font-medium text-gray-800 dark:text-white">
                        ${trade.amount.toFixed(2)}
                      </span>
                      <span
                        className={`flex items-center text-[10px] font-medium ${
                          trade.profit >= 0
                            ? 'text-green-500 dark:text-green-400'
                            : 'text-red-500 dark:text-red-400'
                        }`}
                      >
                        {trade.profit >= 0 ? (
                          <TrendingUp className="h-2.5 w-2.5 mr-0.5" />
                        ) : (
                          <TrendingDown className="h-2.5 w-2.5 mr-0.5" />
                        )}
                        {trade.profit >= 0 ? '+' : ''}${trade.profit.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                      {trade.profitPercent}% rate
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="py-12 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
            <BarChart3 className="h-6 w-6 mb-2 text-gray-300 dark:text-gray-600" />
            <p className="text-sm">
              {searchQuery ? 'No trades match your search' : 'No trades found'}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              {searchQuery
                ? 'Try adjusting your search'
                : 'Start trading to see your history'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DemoTradeHistory;
