import ManageWithdrawalModal from '@/components/ManageWithdrawalModal';
import { useEffect, useState } from 'react';
import { Search, CheckCircle2, RefreshCw, Wallet } from 'lucide-react';

export default function ApprovedWithdrawals() {
  const [withdrawals, setWithdrawals] = useState<ITransaction[]>([]);
  const [filteredWithdrawals, setFilteredWithdrawals] = useState<
    ITransaction[]
  >([]);
  const [singleWithdrawal, setSingleWithdrawal] = useState<null | ITransaction>(
    null,
  );
  const [toggle, setToggle] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const withdrawalsPerPage = 10;
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const toggleModal = (e: boolean) => {
    setToggle(e);
  };

  const manageWithdrawal = (e: ITransaction) => {
    setSingleWithdrawal(e);
    toggleModal(true);
  };

  const fetchWithdrawals = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${url}/withdrawals`);
      const data = await res.json();

      if (res.ok) {
        const approvedWithdrawals = data.filter(
          (wth: any) => wth.status === 'success',
        );
        setWithdrawals(approvedWithdrawals);
        setFilteredWithdrawals(approvedWithdrawals);
      } else throw new Error(data.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, [toggle]);

  const handleSearch = (search: string) => {
    setSearchQuery(search);
    const filtered = withdrawals.filter(
      (withdrawal) =>
        withdrawal.user.name.toLowerCase().includes(search.toLowerCase()) ||
        withdrawal.user.email.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredWithdrawals(filtered);
    setCurrentPage(1);
  };

  const getUserAvatar = (user: User) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user.name,
    )}&background=E5E7EB&color=374151&size=40`;
  };

  // Sort by date (newest first)
  const sortedWithdrawals = filteredWithdrawals.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  // Pagination
  const totalPages = Math.ceil(sortedWithdrawals.length / withdrawalsPerPage);
  const startIndex = (currentPage - 1) * withdrawalsPerPage;
  const endIndex = startIndex + withdrawalsPerPage;
  const currentWithdrawals = sortedWithdrawals.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm overflow-hidden">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Approved Withdrawals ({filteredWithdrawals.length})
              </h2>
            </div>

            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  onChange={(e) => handleSearch(e.target.value)}
                  type="text"
                  value={searchQuery}
                  className="pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 w-64"
                  placeholder="Search withdrawals..."
                />
              </div>

              <button
                onClick={fetchWithdrawals}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <RefreshCw className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="bg-white dark:bg-gray-950 divide-y divide-gray-200 dark:divide-gray-800">
              {currentWithdrawals.length > 0 ? (
                currentWithdrawals.map((withdrawal: ITransaction) => (
                  <tr
                    key={withdrawal._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={getUserAvatar(withdrawal.user)}
                          alt={withdrawal.user.name}
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {withdrawal.user.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {withdrawal.user.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Wallet className="h-4 w-4 text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {withdrawal.walletData.coinName}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {withdrawal.walletData.network || 'N/A'}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        ${withdrawal.amount.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {withdrawal.walletData.convertedAmount}{' '}
                        {withdrawal.walletData.coinName}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(withdrawal.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                        {withdrawal.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => manageWithdrawal(withdrawal)}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
                  >
                    No approved withdrawals found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm border rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-sm border rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {toggle && (
        <ManageWithdrawalModal
          toggleModal={toggleModal}
          withdrawal={singleWithdrawal}
        />
      )}
    </>
  );
}

interface User {
  id: string;
  email: string;
  name: string;
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
  _id: string;
  type: string;
  user: User;
  status: 'pending' | 'success' | 'failed';
  amount: number;
  date: string;
  walletData: WalletData;
  tradeData: TradeData;
}
