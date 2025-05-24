import { useEffect, useState } from 'react';
import { PiChartBarHorizontalThin } from 'react-icons/pi';

export default function AdminTradeCards() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [totalTrades, setTotalTrades] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [pendingTrades, setPendingTrades] = useState(0);
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const fetchTradeTransactions = async () => {
    try {
      const res = await fetch(`${url}/transactions`);
      const data = await res.json();

      if (res.ok) setTransactions(data);
      else throw new Error(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTradeTransactions();

    if (transactions.length > 0) {
      const tradesTransactions = transactions.filter(
        (transaction: any) => transaction.type === 'trade',
      );

      const tradesSum = tradesTransactions.filter(
        (transaction: any) => transaction.status === 'success',
      ).length;

      const interestSum = tradesTransactions
        .filter((transaction: any) => transaction.status === 'success')
        .reduce(
          (sum: number, transaction: any) =>
            sum + transaction.tradeData.interest,
          0,
        );

      const pendingSum = tradesTransactions.filter(
        (transaction: any) => transaction.status === 'pending',
      ).length;

      setTotalTrades(tradesSum);
      setPendingTrades(pendingSum);
      setTotalInterest(interestSum);
    }
  }, [transactions.length]);

  return (
    <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-4 mb-4">
      <div className="flex flex-col gap-2 p-3 rounded-lg bg-white dark:border-gray-900 border-gray-200 dark:bg-gray-950/70 border shadow-lg">
        <div className="w-full flex flex-row-reverse items-end justify-between">
          <h2 className="text-4xl text-gray-700 dark:text-white">
            {Number(totalTrades)}
          </h2>
          <PiChartBarHorizontalThin className="text-4xl text-blue-600" />
        </div>

        <p className="text-xs font-light flex text-gray-600 dark:text-gray-300">
          All Trades
        </p>
      </div>

      <div className="flex flex-col gap-2 p-3 rounded-lg bg-white dark:border-gray-900 border-gray-200 dark:bg-gray-950/70 border shadow-lg">
        <div className="w-full flex flex-row-reverse items-end justify-between">
          <h2 className="text-4xl text-gray-700 dark:text-white">
            {Number(pendingTrades)}
          </h2>
          <PiChartBarHorizontalThin className="text-4xl text-warning" />
        </div>

        <p className="text-xs font-light flex text-gray-600 dark:text-gray-300">
          Pending Trades
        </p>
      </div>

      <div className="flex flex-col gap-2 p-3 rounded-lg bg-white dark:border-gray-900 border-gray-200 dark:bg-gray-950/70 border shadow-lg">
        <div className="w-full flex flex-row-reverse items-end justify-between">
          <h2 className="text-4xl text-gray-700 dark:text-white">
            {Number(totalInterest).toLocaleString('en-US')}
            <span className="text-xs text-gray-600 pl-[2px]">%</span>
          </h2>
          <PiChartBarHorizontalThin className="text-4xl text-green-500" />
        </div>

        <p className="text-xs font-light flex text-gray-600 dark:text-gray-300">
          Total Interest
        </p>
      </div>
    </div>
  );
}
