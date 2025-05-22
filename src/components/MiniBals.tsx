import { contextData } from '@/context/AuthContext';
import { Wallet, TrendingUp, ArrowDownCircle, BarChart2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function MiniBals() {
  const [trades, setTrades] = useState([]);
  const { user } = contextData();

  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  // Function to fetch trades
  const fetchTrades = async () => {
    try {
      const res = await fetch(`${url}/trades`);
      const data = await res.json();

      if (res.ok) {
        const filteredTrades = data.filter(
          (trade: any) => new Date(trade.date) > new Date(user.createdAt),
        );

        setTrades(filteredTrades);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error fetching trades:', error);
    }
  };

  // Fetch trades on component mount
  useEffect(() => {
    fetchTrades();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
      <div className="flex flex-col gap-2 p-4 rounded-lg bg-white bgRadialDark shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Deposit
          </p>
          <Wallet size={18} className="text-green-500" />
        </div>

        <h2 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-gray-100">
          {user?.deposit?.toLocaleString('en-US')}
          <span className="font-mono font-normal text-base ml-1">$</span>
        </h2>
      </div>

      <div className="flex flex-col gap-2 p-4 rounded-lg bg-white bgRadialDark shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Interest
          </p>
          <TrendingUp size={18} className="text-sky-500" />
        </div>

        <h2 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-gray-100">
          {user?.interest?.toLocaleString('en-US')}
          <span className="font-mono font-normal text-base ml-1">$</span>
        </h2>
      </div>

      <div className="flex flex-col gap-2 p-4 rounded-lg bg-white bgRadialDark shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Withdrawal
          </p>
          <ArrowDownCircle size={18} className="text-rose-500" />
        </div>

        <h2 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-gray-100">
          {user?.withdraw?.toLocaleString('en-US')}
          <span className="font-mono font-normal text-base ml-1">$</span>
        </h2>
      </div>

      <div className="flex flex-col gap-2 p-4 rounded-lg bg-white bgRadialDark shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Total Trades
          </p>
          <BarChart2 size={18} className="text-blue-600" />
        </div>

        <h2 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-gray-100">
          {trades.length || '0'}
        </h2>
      </div>
    </div>
  );
}
