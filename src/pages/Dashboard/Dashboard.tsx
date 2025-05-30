import { useEffect, useState } from 'react';
import NoDepositAlert from '@/components/NoDepositAlert';
import PageLoader from '@/components/PageLoader';
import TraderGrid from '@/components/TraderGrid';
import { contextData } from '@/context/AuthContext';
import Balance from '@/components/Balance';
import NoKycAlert from '@/components/NoKycAlert';
import StockChart from '@/components/StockChart';
import RecentTrades from '@/components/RecentTrades';
import RecentTransactions from '@/components/RecentTransactions';
import MiniBals from '@/components/MiniBals';
import CopyTraderErrorModal from '@/components/CopyTraderErrorModal';
import { useNavigate } from 'react-router-dom';
import { Trader } from '@/types/types';

const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

export default function Dashboard() {
  const { user, fetchUser } = contextData();
  const [traders, setTraders] = useState([]);
  const [trades, setTrades] = useState([]);
  const [copiedTraderId, setCopiedTraderId] = useState<string | null>(
    user.traderId,
  );
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleCopyError = (message: string) => {
    setErrorMessage(message);
    setShowError(true);
  };

  const combinedBalance = user.deposit + user.interest + user.bonus || 0;
  const balancePlusWithdraw = combinedBalance + (user.withdraw || 0);

  const fetchTrades = async () => {
    try {
      const res = await fetch(
        `${url}/trades/user/${user._id}/trader/${user.traderId}`,
      );
      const data = await res.json();

      if (res.ok) {
        const filteredTrades = data.filter(
          (trade: any) => new Date(trade.date) > new Date(user.createdAt),
        );
        setTrades(filteredTrades || []);
      }
    } catch (error) {
      console.error('Error fetching traders:', error);
    }
  };

  const fetchTraders = async () => {
    try {
      const res = await fetch(`${url}/trader`);
      if (!res.ok) throw new Error('Failed to fetch traders');
      const data = await res.json();
      setTraders(data || []);
    } catch (error) {
      console.error('Error fetching traders:', error);
    }
  };

  const copyTrader = async (trader: Trader) => {
    try {
      const action = trader._id === copiedTraderId ? 'uncopy' : 'copy';
      if (action === 'copy') {
        if (trader.minimumCopyAmount > user.deposit) {
          handleCopyError(
            `Insufficient balance. You need at least $${trader.minimumCopyAmount} to copy this trader.`,
          );
          return false;
        }
      }

      const response = await fetch(`${url}/users/update-user-trader`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          traderId: trader._id,
          action,
          userId: user._id,
        }),
      });

      if (response.ok) {
        setCopiedTraderId(action === 'copy' ? trader._id : null);
        fetchUser(user._id);
        return true;
      }
      return false;
    } catch (error: any) {
      handleCopyError(`Error copying trader ${error.message}.`);
      return false;
    }
  };

  useEffect(() => {
    fetchTraders();
    fetchTrades();
  }, [user]);

  if (!user) return <PageLoader />;

  return (
    <>
      {balancePlusWithdraw === 0 && <NoDepositAlert />}
      {!user.documentNumber && <NoKycAlert />}
      <CopyTraderErrorModal
        isOpen={showError}
        message={errorMessage}
        onClose={() => setShowError(false)}
        onDeposit={() => {
          navigate('/dashboard/deposit');
          setShowError(false);
        }}
      />

      <div className="w-full flex gap-5 my-5 max-[900px]:flex-col">
        <div className="flex-shrink-0">
          <Balance user={user} trades={trades.length} />
        </div>

        <div className="flex-grow overflow-x-auto">
          <TraderGrid traders={traders} onCopyTrader={copyTrader} />
        </div>
      </div>

      <div className="w-full my-5">
        <MiniBals />
      </div>
      <div className="w-full flex flex-wrap gap-5 my-5 max-[900px]:flex-col">
        <div className="w-full flex-1">
          <RecentTrades />
        </div>
        <div className="w-full flex-1">
          <RecentTransactions />
        </div>
      </div>
      <div className="h-125 flex items-center justify-center mb-4 rounded-3xl shadow-1 bg-white bg-opacity-90 dark:bg-gray-950">
        <StockChart />
      </div>
    </>
  );
}
