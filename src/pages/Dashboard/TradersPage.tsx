// components/TradersPage.tsx
import { contextData } from '@/context/AuthContext';
import { Trader } from '@/types/types';
import React, { useState, useMemo } from 'react';
import { Wallet, Users, Search, Filter } from 'lucide-react';

interface TradersPageProps {
  traders: Trader[];
  onCopy: (trader: Trader) => Promise<boolean>;
}

type SortOption =
  | 'name'
  | 'profitMonthly'
  | 'profitYearly'
  | 'winRate'
  | 'experience'
  | 'copiers';
type FilterOptions = {
  riskLevel: string[];
  status: string[];
  specialization: string[];
  minProfit: number;
  maxFee: number;
};

const TradersPage: React.FC<TradersPageProps> = ({ traders, onCopy }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('profitMonthly');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTrader, setSelectedTrader] = useState<string | null>(null);

  const [filters, setFilters] = useState<FilterOptions>({
    riskLevel: [],
    status: ['active'], // Default to active traders
    specialization: [],
    minProfit: 0,
    maxFee: 100,
  });

  const { user } = contextData();

  // Get unique values for filter options
  const filterOptions = useMemo(() => {
    const riskLevels = [...new Set(traders.map((t) => t.riskLevel))];
    const statuses = [...new Set(traders.map((t) => t.status))];
    const specializations = [...new Set(traders.map((t) => t.specialization))];

    return { riskLevels, statuses, specializations };
  }, [traders]);

  // Filter and sort traders
  const filteredAndSortedTraders = useMemo(() => {
    let filtered = traders.filter((trader) => {
      // Search filter
      const matchesSearch =
        trader.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trader.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trader.specialization.toLowerCase().includes(searchTerm.toLowerCase());

      // Risk level filter
      const matchesRisk =
        filters.riskLevel.length === 0 ||
        filters.riskLevel.includes(trader.riskLevel);

      // Status filter
      const matchesStatus =
        filters.status.length === 0 || filters.status.includes(trader.status);

      // Specialization filter
      const matchesSpecialization =
        filters.specialization.length === 0 ||
        filters.specialization.includes(trader.specialization);

      // Profit filter
      const matchesProfit =
        trader.profitPercentage.monthly >= filters.minProfit;

      // Fee filter
      const matchesFee = trader.copierFee <= filters.maxFee;

      return (
        matchesSearch &&
        matchesRisk &&
        matchesStatus &&
        matchesSpecialization &&
        matchesProfit &&
        matchesFee
      );
    });

    // Sort traders
    filtered.sort((a, b) => {
      let aValue: number | string;
      let bValue: number | string;

      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'profitMonthly':
          aValue = a.profitPercentage.monthly;
          bValue = b.profitPercentage.monthly;
          break;
        case 'profitYearly':
          aValue = a.profitPercentage.yearly;
          bValue = b.profitPercentage.yearly;
          break;
        case 'winRate':
          aValue = a.winRate;
          bValue = b.winRate;
          break;
        case 'experience':
          aValue = a.experience;
          bValue = b.experience;
          break;
        case 'copiers':
          aValue = a.totalCopiers;
          bValue = b.totalCopiers;
          break;
        default:
          return 0;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortOrder === 'asc'
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });

    return filtered;
  }, [traders, searchTerm, sortBy, sortOrder, filters]);

  const handleCopy = async (trader: Trader) => {
    setSelectedTrader(trader._id);
    try {
      setIsLoading(true);
      await onCopy(trader);
    } finally {
      setIsLoading(false);
      setSelectedTrader(null);
    }
  };

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      riskLevel: [],
      status: ['active'],
      specialization: [],
      minProfit: 0,
      maxFee: 100,
    });
  };

  const getTagColor = (type: string, value: string) => {
    if (type === 'risk') {
      return value === 'Low'
        ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20 dark:bg-green-950/50 dark:text-green-300 dark:ring-green-400/30'
        : value === 'Medium'
          ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/20 dark:bg-amber-950/50 dark:text-amber-300 dark:ring-amber-400/30'
          : value === 'High'
            ? 'bg-red-50 text-red-700 ring-1 ring-red-600/20 dark:bg-red-950/50 dark:text-red-300 dark:ring-red-400/30'
            : 'bg-slate-50 text-slate-700 ring-1 ring-slate-600/20 dark:bg-slate-900/50 dark:text-slate-300 dark:ring-slate-400/30';
    }
    if (type === 'status') {
      return value === 'active'
        ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20 dark:bg-green-950/50 dark:text-green-300 dark:ring-green-400/30'
        : value === 'paused'
          ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/20 dark:bg-amber-950/50 dark:text-amber-300 dark:ring-amber-400/30'
          : value === 'terminated'
            ? 'bg-red-50 text-red-700 ring-1 ring-red-600/20 dark:bg-red-950/50 dark:text-red-300 dark:ring-red-400/30'
            : 'bg-slate-50 text-slate-700 ring-1 ring-slate-600/20 dark:bg-slate-900/50 dark:text-slate-300 dark:ring-slate-400/30';
    }
    return 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20 dark:bg-blue-950/50 dark:text-blue-300 dark:ring-blue-400/30';
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Copy Traders
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Choose from {traders.length} professional traders and copy their
          strategies
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search traders by name, bio, or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Sort */}
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="profitMonthly">Monthly Profit</option>
              <option value="profitYearly">Yearly Profit</option>
              <option value="winRate">Win Rate</option>
              <option value="experience">Experience</option>
              <option value="copiers">Copiers</option>
              <option value="name">Name</option>
            </select>

            <button
              onClick={() =>
                setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'))
              }
              className="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700"
            >
              {sortOrder === 'desc' ? '↓' : '↑'}
            </button>
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900/50">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Filters
              </h3>
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Clear All
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Risk Level */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Risk Level
                </label>
                <div className="space-y-1">
                  {filterOptions.riskLevels.map((level) => (
                    <label key={level} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.riskLevel.includes(level)}
                        onChange={(e) => {
                          const newRiskLevels = e.target.checked
                            ? [...filters.riskLevel, level]
                            : filters.riskLevel.filter((r) => r !== level);
                          handleFilterChange('riskLevel', newRiskLevels);
                        }}
                        className="mr-2"
                      />
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        {level}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Status
                </label>
                <div className="space-y-1">
                  {filterOptions.statuses.map((status) => (
                    <label key={status} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.status.includes(status)}
                        onChange={(e) => {
                          const newStatuses = e.target.checked
                            ? [...filters.status, status]
                            : filters.status.filter((s) => s !== status);
                          handleFilterChange('status', newStatuses);
                        }}
                        className="mr-2"
                      />
                      <span className="text-sm text-slate-600 dark:text-slate-400 capitalize">
                        {status}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Specialization */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Specialization
                </label>
                <div className="space-y-1">
                  {filterOptions.specializations.map((spec) => (
                    <label key={spec} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.specialization.includes(spec)}
                        onChange={(e) => {
                          const newSpecs = e.target.checked
                            ? [...filters.specialization, spec]
                            : filters.specialization.filter((s) => s !== spec);
                          handleFilterChange('specialization', newSpecs);
                        }}
                        className="mr-2"
                      />
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        {spec}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Min Profit */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Min Monthly Profit (%)
                </label>
                <input
                  type="number"
                  value={filters.minProfit}
                  onChange={(e) =>
                    handleFilterChange('minProfit', Number(e.target.value))
                  }
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

              {/* Max Fee */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Max Fee (%)
                </label>
                <input
                  type="number"
                  value={filters.maxFee}
                  onChange={(e) =>
                    handleFilterChange('maxFee', Number(e.target.value))
                  }
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Showing {filteredAndSortedTraders.length} of {traders.length} traders
        </p>
      </div>

      {/* Traders Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedTraders.map((trader) => (
          <div key={trader._id} className="h-fit">
            <div
              className={`relative rounded-xl shadow-sm transition-all duration-200 overflow-hidden h-full border
                ${
                  user.traderId === trader._id
                    ? 'border-green-500 dark:border-green-400 shadow-green-100 dark:shadow-green-900/20 ring-1 ring-green-500/20'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md'
                } bg-white dark:bg-gray-900/30`}
            >
              {/* Status Badge */}
              <div className="absolute top-3 right-3 z-10">
                <span
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg uppercase tracking-wide ${getTagColor(
                    'status',
                    trader.status,
                  )}`}
                >
                  {trader.status}
                </span>
              </div>

              {/* Trader Content */}
              <div className="p-4">
                {/* Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-900 flex-shrink-0 ring-1 ring-slate-200 dark:ring-slate-700">
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
                    <h3 className="text-base font-bold text-slate-900 dark:text-white truncate">
                      {trader.name}
                    </h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      <span
                        className={`px-1.5 py-0.5 text-xs font-semibold rounded ${getTagColor(
                          'risk',
                          trader.riskLevel,
                        )}`}
                      >
                        {trader.riskLevel}
                      </span>
                      <span className="px-1.5 py-0.5 text-xs font-semibold rounded bg-blue-50 text-blue-700 ring-1 ring-blue-600/20 dark:bg-blue-950/50 dark:text-blue-300 dark:ring-blue-400/30">
                        {trader.specialization}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Performance Stats */}
                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
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
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-4">
                  {trader.bio}
                </p>

                {/* Bottom Stats and Copy Button */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex flex-col gap-1 text-xs">
                    <div className="flex items-center gap-1">
                      <span className="text-slate-500 dark:text-slate-400">
                        Fee:
                      </span>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {trader.copierFee}%
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Wallet className="w-3 h-3 text-blue-500" />
                        <span className="font-bold text-slate-900 dark:text-white">
                          ${trader.minimumCopyAmount}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-blue-500" />
                        <span className="font-bold text-slate-900 dark:text-white">
                          {trader.totalCopiers > 999
                            ? `${(trader.totalCopiers / 1000).toFixed(1)}k`
                            : trader.totalCopiers}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(trader)}
                    disabled={
                      (isLoading && trader._id === selectedTrader) ||
                      trader.status !== 'active'
                    }
                    className={`px-3 py-2 rounded-lg font-semibold text-xs transition-all duration-200 min-w-[70px]
                      ${
                        user.traderId === trader._id
                          ? 'bg-green-600 hover:bg-green-700 text-white shadow-sm'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-900 shadow-sm dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white'
                      }
                      ${
                        trader.status !== 'active' ||
                        (isLoading && trader._id === selectedTrader)
                          ? 'opacity-50 cursor-not-allowed'
                          : 'hover:shadow-md'
                      }`}
                  >
                    {isLoading && trader._id === selectedTrader ? (
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
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
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
        ))}
      </div>

      {/* No Results */}
      {filteredAndSortedTraders.length === 0 && (
        <div className="text-center py-12">
          <div className="text-slate-400 dark:text-slate-500 mb-4">
            <Search className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-400 mb-2">
              No traders found
            </h3>
            <p className="text-slate-500 dark:text-slate-500">
              Try adjusting your search terms or filters
            </p>
          </div>
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default TradersPage;
