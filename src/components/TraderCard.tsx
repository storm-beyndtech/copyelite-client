// components/TraderCard.tsx
import { contextData } from '@/context/AuthContext';
import { Trader } from '@/types/types';
import React, { useState } from 'react';
import { Wallet, Users } from 'lucide-react';

interface TraderCardProps {
  traders: Trader[];
  onCopy: (traderId: string) => Promise<any>;
}

const TraderCard: React.FC<TraderCardProps> = ({ traders, onCopy }) => {
  const [isSelected, setIsSelected] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = contextData();

  const handleCopy = async (traderId: string) => {
    setIsSelected(traderId);
    try {
      setIsLoading(true);
      await onCopy(traderId);
    } finally {
      setIsLoading(false);
    }
  };

  const getTagColor = (type: string, value: string) => {
    if (type === 'risk') {
      return value === 'Low'
        ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20 dark:bg-green-950 dark:text-green-300 dark:ring-green-400/30'
        : value === 'Medium'
          ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/20 dark:bg-amber-950 dark:text-amber-300 dark:ring-amber-400/30'
          : value === 'High'
            ? 'bg-red-50 text-red-700 ring-1 ring-red-600/20 dark:bg-red-950 dark:text-red-300 dark:ring-red-400/30'
            : 'bg-slate-50 text-slate-700 ring-1 ring-slate-600/20 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-400/30';
    }
    if (type === 'status') {
      return value === 'active'
        ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20 dark:bg-green-950 dark:text-green-300 dark:ring-green-400/30'
        : value === 'paused'
          ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/20 dark:bg-amber-950 dark:text-amber-300 dark:ring-amber-400/30'
          : value === 'terminated'
            ? 'bg-red-50 text-red-700 ring-1 ring-red-600/20 dark:bg-red-950 dark:text-red-300 dark:ring-red-400/30'
            : 'bg-slate-50 text-slate-700 ring-1 ring-slate-600/20 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-400/30';
    }
    return 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20 dark:bg-blue-950 dark:text-blue-300 dark:ring-blue-400/30';
  };

  return (
    <div className="max-ctn flex overflow-x-auto no-scrollbar">
      {traders.map((trader) => {
        return (
          <div key={trader._id} className="w-100 h-fit px-2 flex-shrink-0">
            <div
              className={`relative rounded-xl shadow-sm transition-all duration-200 overflow-hidden h-full border
                  ${
                    user.traderId === trader._id
                      ? 'border-green-500 dark:border-green-400 shadow-green-100 dark:shadow-green-900/20 ring-1 ring-green-500/20'
                      : isSelected === trader._id
                        ? 'transform scale-[1.01] shadow-md border-slate-300 dark:border-slate-600'
                        : 'border-slate-200 dark:border-slate-700'
                  } bg-white dark:bg-slate-900/50`}
            >
              {/* Status Badge */}
              <div className="absolute top-3 right-3">
                <span
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg uppercase tracking-wide ${getTagColor(
                    'status',
                    trader.status,
                  )}`}
                >
                  {trader.status}
                </span>
              </div>

              {/* Trader Header */}
              <div className="p-4 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0 ring-1 ring-slate-200 dark:ring-slate-700">
                    {trader.profileImage ? (
                      <img
                        src={trader.profileImage}
                        alt={trader.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-lg font-bold text-slate-500 dark:text-slate-400">
                        {trader.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-base font-bold text-slate-900 dark:text-white truncate">
                      {trader.name}
                    </h2>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      <span
                        className={`px-1.5 py-0.5 text-xs font-semibold rounded ${getTagColor(
                          'risk',
                          trader.riskLevel,
                        )}`}
                      >
                        {trader.riskLevel}
                      </span>
                      <span className="px-1.5 py-0.5 text-xs font-semibold rounded bg-blue-50 text-blue-700 ring-1 ring-blue-600/20 dark:bg-blue-950 dark:text-blue-300 dark:ring-blue-400/30">
                        {trader.specialization}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Performance Stats Grid */}
                <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">
                      Monthly
                    </span>
                    <span className="font-bold text-green-400">
                      {trader.profitPercentage.monthly > 0 ? '+' : ''}
                      {trader.profitPercentage.monthly}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">
                      Yearly
                    </span>
                    <span className="font-bold text-green-400">
                      {trader.profitPercentage.yearly > 0 ? '+' : ''}
                      {trader.profitPercentage.yearly}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">
                      Win Rate
                    </span>
                    <span className="font-bold text-green-400">
                      {trader.winRate}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">
                      Experience
                    </span>
                    <span className="font-bold text-green-400">
                      {trader.experience}{' '}
                      {trader.experience === 1 ? 'Yr' : 'Yrs'}
                    </span>
                  </div>
                </div>

                {/* Bio */}
                <div className="mt-3">
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {trader.bio}
                  </p>
                </div>

                {/* Bottom Section with Stats and Copy Button */}
                <div className="mt-4 flex items-center justify-between gap-3">
                  {/* Left side - Quick Stats in single line */}
                  <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1">
                      Fee:
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {trader.copierFee}%
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Wallet
                        className={`w-3.5 h-3.5 stroke-1 ${
                          user.traderId === trader._id
                            ? 'text-green-400'
                            : 'text-blue-500'
                        }`}
                      />
                      Min:
                      <span className="font-bold text-slate-900 dark:text-white">
                        ${trader.minimumCopyAmount}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users
                        className={`w-3.5 h-3.5 stroke-1 ${
                          user.traderId === trader._id
                            ? 'text-green-400'
                            : 'text-blue-500'
                        }`}
                      />
                      <span className="font-bold text-slate-900 dark:text-white">
                        {trader.totalCopiers > 999
                          ? `${(trader.totalCopiers / 1000).toFixed(1)}k`
                          : trader.totalCopiers}
                      </span>
                    </div>
                  </div>

                  {/* Right side - Copy Button */}
                  <div className="flex-shrink-0">
                    <button
                      onClick={() => handleCopy(trader._id)}
                      disabled={
                        (isLoading && trader._id === isSelected) ||
                        trader.status !== 'active'
                      }
                      className={`px-3 py-2 rounded-lg font-semibold text-xs transition-all duration-200 min-w-[70px]
                        ${
                          user.traderId === trader._id
                            ? 'bg-green-600 hover:bg-green-700 text-white shadow-sm dark:bg-green-600 dark:hover:bg-green-700'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-900 shadow-sm dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white'
                        }
                        ${
                          trader.status !== 'active' ||
                          (isLoading && trader._id === isSelected)
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:shadow-md'
                        }`}
                    >
                      {isLoading && trader._id === isSelected ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="animate-spin h-3 w-3 text-current"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        </span>
                      ) : user.traderId === trader._id ? (
                        '✓ Copied'
                      ) : (
                        'Copy'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TraderCard;
