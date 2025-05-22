import { useState, useEffect, FC } from 'react';
import { ArrowUp, ArrowDown, ChevronDown } from 'lucide-react';
import RecentDemoTrades from '@/components/RecentDemoTrades';
import { contextData } from '@/context/AuthContext';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  label: string;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

interface TradingViewWidgetProps {
  symbol: string;
  theme: any;
}

// TradingView widget component
const TradingViewWidget: FC<TradingViewWidgetProps> = ({ symbol, theme }) => {
  useEffect(() => {
    console.log("i'm here");
    const createWidget = () => {
      if (
        document.getElementById('tradingview_widget') &&
        (window as any).TradingView
      ) {
        new (window as any).TradingView.widget({
          autosize: true,
          symbol: symbol,
          interval: 'D',
          timezone: 'Etc/UTC',
          theme: theme === 'dark' ? 'dark' : 'light',
          backgroundColor: theme === 'dark' ? '#030712' : '#ffffff',
          style: '1',
          locale: 'en',
          toolbar_bg: theme === 'dark' ? '#030712' : '#ffffff',
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: 'tradingview_widget',
        });
      }
    };

    if (!(window as any).TradingView) {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/tv.js';
      script.async = true;
      script.onload = createWidget;
      document.body.appendChild(script);
    } else {
      createWidget();
    }

    return () => {
      // Optional: clear widget content on unmount
      const container = document.getElementById('tradingview_widget');
      if (container) container.innerHTML = '';
    };
  }, [symbol, theme]);

  return (
    <div id="tradingview_widget" className="w-full h-full min-h-[500px]"></div>
  );
};

// Dropdown select component
const Dropdown: FC<DropdownProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="relative w-full">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {value || placeholder || 'Select...'}
        <ChevronDown size={18} className="ml-2" />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Define trade direction type
type TradeDirection = 'UP' | 'DOWN';

// Main trading interface component
const PracticeTrade: FC = () => {
  const [symbol, setSymbol] = useState<string>('AAPL');
  const [timeframe, setTimeframe] = useState<string>('1D');
  const [amount, setAmount] = useState<string>('');
  const { user, theme } = contextData();

  // Stock options
  const stockOptions: DropdownOption[] = [
    { value: 'AAPL', label: 'Apple Inc. (AAPL)' },
    { value: 'MSFT', label: 'Microsoft Corp. (MSFT)' },
    { value: 'GOOGL', label: 'Alphabet Inc. (GOOGL)' },
    { value: 'AMZN', label: 'Amazon.com Inc. (AMZN)' },
    { value: 'TSLA', label: 'Tesla Inc. (TSLA)' },
  ];

  // Timeframe options
  const timeframeOptions: DropdownOption[] = [
    { value: '1m', label: '1 Minute' },
    { value: '5m', label: '5 Minutes' },
    { value: '15m', label: '15 Minutes' },
    { value: '1h', label: '1 Hour' },
    { value: '4h', label: '4 Hours' },
    { value: '1D', label: '1 Day' },
    { value: '1W', label: '1 Week' },
  ];

  // Mock trade function
  const placeTrade = (direction: TradeDirection): void => {
    const tradeAmount = parseFloat(amount);

    if (!amount || isNaN(tradeAmount) || tradeAmount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    if (tradeAmount > user.demo) {
      alert('Insufficient balance');
      return;
    }

    // Simulate trade processing
    alert(`Placed ${direction} trade for ${symbol} with $${tradeAmount}`);
    // In a real app, you would make an API call here
  };

  return (
    <div className={`min-h-screen`}>
      <main className="max-ctn px-0 bg-transparent text-gray-900 dark:text-gray-100 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Chart */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-950 shadow overflow-hidden">
            <div className="h-full">
              <TradingViewWidget symbol={symbol} theme={theme} />
            </div>
          </div>

          {/* Right column - Trading panel and history */}
          <div className="space-y-6">
            {/* Trading panel */}
            <div className="bg-white dark:bg-gray-950 rounded-lg shadow p-6">
              <h2 className="text-lg font-bold mb-4">Trade</h2>

              <div className="space-y-4">
                {/* Symbol selection */}
                <Dropdown
                  label="Stock"
                  options={stockOptions}
                  value={symbol}
                  onChange={setSymbol}
                  placeholder="Choose Stock..."
                />

                <div className="flex gap-2">
                  {/* Timeframe selection */}
                  <Dropdown
                    label="Time"
                    options={timeframeOptions}
                    value={timeframe}
                    onChange={setTimeframe}
                    placeholder="Choose Time..."
                  />

                  {/* Amount input */}
                  <div className="flex-shrink-0 max-w-40">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Amount in usd
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-800/50 dark:bg-gray-900 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* Payout display */}
                <div className="text-center my-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Your Payout: 0 $
                  </div>
                </div>

                {/* Trading buttons */}
                <div className="grid grid-cols-2 gap-4 font-semibold">
                  <button
                    onClick={() => placeTrade('UP')}
                    className="flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-600 text-white rounded-md"
                  >
                    <ArrowUp size={18} className="mr-2" />
                    Up
                  </button>
                  <button
                    onClick={() => placeTrade('DOWN')}
                    className="flex items-center justify-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
                  >
                    <ArrowDown size={18} className="mr-2" />
                    Down
                  </button>
                </div>
              </div>
            </div>

            {/* Trading history */}
            <RecentDemoTrades />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PracticeTrade;
