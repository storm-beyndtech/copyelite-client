import { ArrowUpRight, ArrowDownLeft, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BalanceProps {
  user: {
    deposit: number;
    interest: number;
    bonus: number;
    username: string;
  };
  trades: number;
}

export default function Balance({
  trades,
  user = {
    deposit: 5250,
    interest: 738,
    bonus: 100,
    username: 'user123',
  },
}: BalanceProps) {
  const navigate = useNavigate();
  const totalBal = user?.deposit + user?.interest;
  const formattedNumber = (num: number) => num?.toLocaleString('en-US') || '0';

  // Using onClick handlers instead of router links
  const handleWithdraw = () => {
    navigate('/dashboard/withdrawal');
  };

  const handleDeposit = () => {
    navigate('/dashboard/deposit');
  };

  return (
    <div className="w-96 h-56 rounded-3xl overflow-hidden shadow-xl bgRadial">
      <div className="h-full w-full p-6 relative">
        {/* Glass-like pattern overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-white/60 opacity-5 z-0"></div>

        {/* Balance display */}
        <div className="w-full z-10 relative flex justify-between">
          <div className="flex flex-col items-baseline mb-1">
            <p className="text-xs text-gray-400 font-light">Total Balance</p>
            <h1 className="text-4xl font-semibold text-white tracking-tight">
              {formattedNumber(totalBal)}
              <span className="text-lg font-mono text-gray-300 ml-1">$</span>
            </h1>
          </div>

          <img src="/fav.svg" alt="logo" className="w-8" />
        </div>

        {/* Stats section */}
        <div className="flex justify-between mt-5 mb-6 z-10 relative">
          <div className="flex flex-col">
            <div className="flex items-center gap-1 mb-1">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="text-xs text-gray-400">Deposit</span>
            </div>
            <span className="text-sm font-medium text-white">
              ${formattedNumber(user?.deposit)}
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1 mb-1">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="text-xs text-gray-400">Interest</span>
            </div>
            <span className="text-sm font-medium text-white">
              ${formattedNumber(user?.interest)}
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1 mb-1">
              <Activity size={12} className="text-gray-400" />
              <span className="text-xs text-gray-400">Trades</span>
            </div>
            <span className="text-sm font-medium text-white">{trades}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between z-10 relative">
          <button
            onClick={handleWithdraw}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-gray-700 text-white transition-all duration-300"
          >
            <ArrowUpRight size={12} />
            <span className="text-xs font-medium">Withdraw</span>
          </button>

          <button
            onClick={handleDeposit}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-brandblue hover:bg-opacity-20 text-white transition-all duration-300"
          >
            <ArrowDownLeft size={12} />
            <span className="text-xs font-medium">Deposit</span>
          </button>
        </div>
      </div>
    </div>
  );
}
