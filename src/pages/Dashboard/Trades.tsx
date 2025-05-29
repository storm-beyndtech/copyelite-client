import DisplayActiveTrade from '@/components/DisplayActiveTrade';
import TraderGrid from '@/components/TraderGrid';
import Balance from '@/components/Balance';
import { contextData } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import SmallStockChart from '@/components/SmallStockChart';
import CopyTraderErrorModal from '@/components/CopyTraderErrorModal';
import { useNavigate } from 'react-router-dom';
import { Trader } from '@/types/types';

export default function Trades() {
  const [tradeData, setTradeData] = useState<any>([]);
  const { user, fetchUser } = contextData();
  const [traders, setTraders] = useState([]);
  const [copiedTraderId, setCopiedTraderId] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const handleCopyError = (message: string) => {
    setErrorMessage(message);
    setShowError(true);
  };

  const fetchTrades = async () => {
    try {
    const res = await fetch(`${url}/trades/user/${user._id}/trader/${user.traderId}`);
    const data = await res.json();

      if (res.ok) {
        const filteredTrades = data.filter(
          (trade: any) => new Date(trade.date) > new Date(user.createdAt),
        );
        setTradeData(filteredTrades);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error fetching trades:', error);
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

      // Check minimum copy amount requirement
      if (trader.minimumCopyAmount > user.deposit && action !== 'uncopy') {
        handleCopyError(
          `Insufficient balance. You need at least $${trader.minimumCopyAmount} to copy this trader.`,
        );
        return false;
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
      handleCopyError(`Error copying trader: ${error.message}.`);
      return false;
    }
  };

  useEffect(() => {
    fetchTrades();
  }, [user]);

  useEffect(() => {
    fetchTraders();
  }, [user]);

  return (
    <>
      <CopyTraderErrorModal
        isOpen={showError}
        message={errorMessage}
        onClose={() => setShowError(false)}
        onDeposit={() => {
          navigate('/dashboard/deposit');
          setShowError(false);
        }}
      />

      <div className="w-full flex gap-5 my-4 max-[900px]:flex-col">
        <div className="flex-none">
          <Balance user={user} trades={tradeData.length} />
        </div>
        <div className="w-full h-56 flex items-center justify-center mb-4 rounded-3xl shadow-1 bg-white bg-opacity-90 dark:bg-gray-950">
          <SmallStockChart />
        </div>
      </div>

      <div className="py-8">
        <TraderGrid traders={traders} onCopyTrader={copyTrader} />
      </div>

      {tradeData ? (
        <DisplayActiveTrade trades={tradeData} />
      ) : (
        <p>No trade data yet.</p>
      )}
    </>
  );
}
