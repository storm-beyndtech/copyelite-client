import { useState, useEffect } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  Search,
  RefreshCw,
  FileText,
} from 'lucide-react';
import { contextData } from '@/context/AuthContext';

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState<ITransaction[] | any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const { user } = contextData();
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const fetchUserTransactions = async () => {
    try {
      const res = await fetch(`${url}/transactions/user/${user.email}`);
      const data = await res.json();

      if (res.ok) {
        // Sort by createdAt (newest first) and take last 5
        const sortedTransactions = data.sort(
          (a: any, b: any) =>
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime(),
        );
        setTransactions(sortedTransactions.slice(0, 4));
      } else {
        throw new Error(data.message);
      }

      // Set last updated timestamp
      const now = new Date();
      setLastUpdated(
        `${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      );
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch transactions on component mount
  useEffect(() => {
    fetchUserTransactions();
  }, []);

  // Filter transactions based on search term
  const filteredTransactions = transactions.filter((transaction) =>
    transaction.type.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="w-full bg-white dark:bg-gray-950 rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-900">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-800 dark:text-white">
            All Transactions
          </h2>
          {lastUpdated && (
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <span>Updated {lastUpdated}</span>
              <button
                onClick={fetchUserTransactions}
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
          )}
        </div>
        <div className="mt-2 relative">
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full pl-8 pr-3 py-1.5 bg-gray-50 dark:bg-transparent border border-gray-200 dark:border-gray-900 rounded-md text-xs text-gray-700 dark:text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-2 top-2 h-3.5 w-3.5 text-gray-400" />
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {loading ? (
          <div className="p-8 flex justify-center items-center">
            <RefreshCw className="h-6 w-6 text-blue-500 animate-spin" />
          </div>
        ) : filteredTransactions.length > 0 ? (
          <ul className="divide-y divide-gray-100 dark:divide-gray-700">
            {filteredTransactions.map((transaction, i) => (
              <li
                key={i}
                className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-150 ease-in-out"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-1.5 rounded-full ${
                        transaction.type === 'deposit'
                          ? 'bg-green-50 dark:bg-green-900/30'
                          : 'bg-red-50 dark:bg-red-900/30'
                      }`}
                    >
                      {transaction.type === 'deposit' ? (
                        <ArrowDownRight className="h-4 w-4 text-green-500 dark:text-green-400" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4 text-red-500 dark:text-red-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-800 dark:text-white">
                        Executed
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(transaction.date).toLocaleString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-sm font-medium ${
                        transaction.type === 'deposit'
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}
                    >
                      {transaction.type === 'deposit' ? '+' : '-'}$
                      {transaction.amount.toFixed(2)}
                    </span>
                    <p className="text-xs mt-0.5">
                      <span
                        className={`inline-block px-1.5 py-0.5 rounded-sm text-xs ${
                          transaction.status === 'success'
                            ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                            : transaction.status === 'pending'
                              ? 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                              : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                        }`}
                      >
                        {transaction.status.charAt(0).toUpperCase() +
                          transaction.status.slice(1)}
                      </span>
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="py-12 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
            <FileText className="h-6 w-6 mb-2 text-gray-300 dark:text-gray-600" />
            <p className="text-sm">No transactions found</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              Try adjusting your search
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionsTable;

interface User {
  id?: string;
  email?: string;
  name?: string;
}

interface WalletData {
  address?: string;
  network?: string;
  coinName?: string;
  convertedAmount?: number;
}

interface TradeData {
  package?: string;
  interest?: string;
}

interface ITransaction {
  type: string;
  user: User;
  status: 'pending' | 'success' | 'failed';
  amount: number;
  date: string;
  walletData: WalletData;
  tradeData: TradeData;
}
