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

// TypeScript interfaces
interface Trade {
  _id: string;
  tradeData: { package: string; interest: number };
  amount: number;
  date: string;
}

const TradeHistory = () => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const { user } = contextData();
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  // Function to fetch trades
  const fetchTrades = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${url}/trades/user/${user._id}/trader/${user.traderId}`,
      );
      const data = await res.json();

      if (res.ok) {
        const filteredTrades = data
          .filter(
            (trade: any) => new Date(trade.date) > new Date(user.createdAt),
          )
          .sort(
            (a: any, b: any) =>
              new Date(b.date).getTime() - new Date(a.date).getTime(),
          ); // Newest first

        setTrades(filteredTrades);

        // Set last updated timestamp
        const now = new Date();
        setLastUpdated(
          `${now.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}`,
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

  // Fetch trades on component mount
  useEffect(() => {
    fetchTrades();
  }, []);

  // Filter trades based on search query
  const filteredTrades = trades.filter((trade) => {
    const matchesSearch =
      trade.tradeData.package
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      trade.date.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // Calculate trade amount and shares based on user deposit and trade interest
  const calculateTradeMetrics = (trade: Trade) => {
    const userDeposit = user.deposit || 0;
    const tradeAmount = userDeposit * trade.tradeData.interest;
    const shares = Math.floor(userDeposit / 100);

    return {
      amount: tradeAmount,
      shares: shares,
    };
  };

  return (
    <div className="w-full bg-white dark:bg-gray-950 rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-900">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-800 dark:text-white">
            Trades History
          </h2>
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            {lastUpdated && <span>Updated {lastUpdated}</span>}
            <button
              onClick={fetchTrades}
              disabled={loading}
              className="ml-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            >
              <RefreshCw
                className={`h-3.5 w-3.5 text-gray-400 ${
                  loading ? 'animate-spin' : ''
                }`}
              />
            </button>
          </div>
        </div>

        <div className="mt-2 relative">
          <input
            type="text"
            placeholder="Search symbol or name..."
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
            {filteredTrades.map((trade, i) => {
              const { amount, shares } = calculateTradeMetrics(trade);

              return (
                <li
                  key={i}
                  className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-150 ease-in-out"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`h-8 w-8 flex items-center justify-center rounded-md bg-blue-600/10 `}
                      >
                        <span className="font-bold text-xs text-brandblue">
                          {trade.tradeData.package.slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-800 dark:text-white">
                          {trade.tradeData.package}
                        </h3>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <Clock className="h-3 w-3 mr-1" />
                          {new Date(trade.date).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center justify-end">
                        <span className="text-sm font-medium text-gray-800 dark:text-white">
                          ${amount.toFixed(2)}
                        </span>
                        <span
                          className={`ml-2 flex items-center text-xs font-medium ${
                            trade.tradeData.interest >= 0
                              ? 'text-green-500 dark:text-green-400'
                              : 'text-red-500 dark:text-red-400'
                          }`}
                        >
                          {trade.tradeData.interest >= 0 ? (
                            <TrendingUp className="h-3 w-3 mr-0.5" />
                          ) : (
                            <TrendingDown className="h-3 w-3 mr-0.5" />
                          )}
                          {trade.tradeData.interest >= 0 ? '+' : ''}
                          {trade.tradeData.interest}%
                        </span>
                      </div>
                      <div className="mt-1">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {shares} shares
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="py-12 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
            <BarChart3 className="h-6 w-6 mb-2 text-gray-300 dark:text-gray-600" />
            <p className="text-sm">No trades found</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              Try adjusting your search
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TradeHistory;
