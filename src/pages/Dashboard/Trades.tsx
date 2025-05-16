import DisplayActiveTrade from '@/components/DisplayActiveTrade';
import TraderGrid from '@/components/TraderGrid';
import UsdChart from '@/components/UsdChart';
import Balance from '@/components/balance/Balance';
import { contextData } from '@/context/AuthContext';
import { useEffect, useState } from 'react';

export default function Trades() {
  const [tradeData, setTradeData] = useState<any>([]);
  const { user, fetchUser } = contextData();
  const [traders, setTraders] = useState([]);
  const [copiedTraderId, setCopiedTraderId] = useState<string | null>(null);
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const fetchTrades = async () => {
    try {
      const res = await fetch(`${url}/trades`);
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
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTrades();
    console.log(tradeData);
  }, [tradeData.length]);

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

  const copyTrader = async (traderId: string) => {
    try {
      const action = traderId === copiedTraderId ? 'uncopy' : 'copy';

      const response = await fetch(`${url}/users/update-user-trader`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ traderId, action, userId: user._id }),
      });

      if (response.ok) {
        setCopiedTraderId(action === 'copy' ? traderId : null);
        fetchUser(user._id);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error copying trader:', error);
      return false;
    }
  };

  useEffect(() => {
    fetchTraders();
  }, [user]);

  return (
    <>
      <div className="w-full flex gap-5 my-4 max-[900px]:flex-col">
        <div className="flex-none">
          <Balance type="trade" user={user} />
        </div>
        <div className="flex-auto shadow-1">
          <UsdChart />
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
