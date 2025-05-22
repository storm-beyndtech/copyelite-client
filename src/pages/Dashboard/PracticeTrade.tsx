import { useState, useEffect, FC } from 'react';
import { ArrowUp, ArrowDown, ChevronDown } from 'lucide-react';
import RecentDemoTrades from '@/components/RecentDemoTrades';
import { contextData } from '@/context/AuthContext';
import DemoDropdown from '@/components/ui/DemoDropDown';

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
  error?: string;
}

interface TradingViewWidgetProps {
  symbol: string;
  theme: any;
}

// TradingView widget component
export const TradingViewWidget: FC<TradingViewWidgetProps> = ({
  symbol,
  theme,
}) => {
  useEffect(() => {
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

  return <div id="tradingview_widget" className="w-full h-full"></div>;
};

// Dropdown select component
const Dropdown: FC<DropdownProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder,
  error,
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
        className={`flex items-center justify-between w-full px-4 py-2 bg-white dark:bg-gray-950 border rounded-md shadow-sm text-left focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error
            ? 'border-red-500 dark:border-red-400'
            : 'border-gray-300 dark:border-gray-600'
        }`}
      >
        {value || placeholder || 'Select...'}
        <ChevronDown size={18} className="ml-2" />
      </button>

      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className="px-4 py-2 text-xs hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
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

interface ValidationErrors {
  symbol?: string;
  timeframe?: string;
  amount?: string;
}

// Main trading interface component
const PracticeTrade: FC = () => {
  const [symbol, setSymbol] = useState<string>('AAPL');
  const [timeframe, setTimeframe] = useState<string>('30s');
  const [amount, setAmount] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tradePlaced, setTradePlaced] = useState<boolean>(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { user, theme } = contextData();
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

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
    { value: '5s', label: '5 Seconds' },
    { value: '10s', label: '10 Seconds' },
    { value: '15s', label: '15 Seconds' },
    { value: '20s', label: '20 Seconds' },
    { value: '30s', label: '30 Seconds' },
    { value: '40s', label: '40 Seconds' },
    { value: '50s', label: '50 Seconds' },
    { value: '60s', label: '60 Seconds' },
  ];

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!symbol) {
      newErrors.symbol = 'Please select a stock symbol';
    }

    if (!timeframe) {
      newErrors.timeframe = 'Please select a timeframe';
    }

    if (!amount || amount.trim() === '') {
      newErrors.amount = 'Please enter an amount';
    } else {
      const numAmount = parseFloat(amount);
      if (isNaN(numAmount)) {
        newErrors.amount = 'Amount must be a valid number';
      } else if (numAmount <= 0) {
        newErrors.amount = 'Amount must be greater than 0';
      } else if (numAmount < 1) {
        newErrors.amount = 'Minimum amount is $1';
      } else if (numAmount > 10000) {
        newErrors.amount = 'Maximum amount is $10,000';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Clear messages after 5 seconds
  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
        setErrorMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  // Clear errors when user starts typing/selecting
  useEffect(() => {
    if (errors.amount && amount) {
      setErrors((prev) => ({ ...prev, amount: undefined }));
    }
  }, [amount, errors.amount]);

  useEffect(() => {
    if (errors.symbol && symbol) {
      setErrors((prev) => ({ ...prev, symbol: undefined }));
    }
  }, [symbol, errors.symbol]);

  useEffect(() => {
    if (errors.timeframe && timeframe) {
      setErrors((prev) => ({ ...prev, timeframe: undefined }));
    }
  }, [timeframe, errors.timeframe]);

  // Calculate payout (example: 85% payout rate)
  const calculatePayout = (): number => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return 0;
    return numAmount * 1.81; // 85% payout
  };

  async function createDemoTrade(direction: TradeDirection) {
    // Clear previous messages
    setSuccessMessage('');
    setErrorMessage('');

    if (!validateForm()) {
      return;
    }

    if (!user) {
      setErrorMessage('You must be logged in to create a trade');
      return;
    }

    setIsLoading(true);

    try {
      const tradeData = {
        email: user.email,
        symbol,
        direction,
        amount: parseFloat(amount),
        profit: calculatePayout(),
        duration: timeframe,
      };

      const res = await fetch(`${url}/trades/create-demo-trade`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tradeData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to create trade');
      }

      setSuccessMessage(
        `Trade created successfully! Direction: ${direction}, Amount: $${amount}`,
      );

      // Reset form after successful trade
      setAmount('');

      setTradePlaced(true);
    } catch (error: any) {
      console.error('Failed to create demo trade:', error.message);
      setErrorMessage(
        error.message || 'Failed to create trade. Please try again.',
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={`min-h-screen`}>
      <main className="max-ctn px-0 bg-transparent text-gray-900 dark:text-gray-100 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Chart */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-950 shadow overflow-hidden">
            <div className="h-full min-h-[500px]">
              <TradingViewWidget symbol={symbol} theme={theme} />
            </div>
          </div>

          {/* Right column - Trading panel and history */}
          <div className="space-y-6">
            {/* Trading panel */}
            <div className="bg-white dark:bg-gray-950 rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold mb-4">Trade</h2>
                <div className="w-fit">
                  <DemoDropdown />
                </div>
              </div>

              {/* Success/Error Messages */}
              {successMessage && (
                <div className="mb-4 p-3 bg-green-100 dark:bg-green-900 border border-green-400 text-green-700 dark:text-green-100 rounded">
                  {successMessage}
                </div>
              )}

              {errorMessage && (
                <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-100 rounded">
                  {errorMessage}
                </div>
              )}

              <div className="space-y-4">
                {/* Symbol selection */}
                <Dropdown
                  label="Stock"
                  options={stockOptions}
                  value={symbol}
                  onChange={setSymbol}
                  placeholder="Choose Stock..."
                  error={errors.symbol}
                />

                <div className="flex gap-2">
                  {/* Timeframe selection */}
                  <Dropdown
                    label="Time"
                    options={timeframeOptions}
                    value={timeframe}
                    onChange={setTimeframe}
                    placeholder="Choose Time..."
                    error={errors.timeframe}
                  />

                  {/* Amount input */}
                  <div className="flex-shrink-0 max-w-40">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Amount in USD
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 ${
                        errors.amount
                          ? 'border-red-500 dark:border-red-400'
                          : 'border-gray-300 dark:border-gray-800/50'
                      }`}
                      placeholder="0.00"
                      min="1"
                      max="10000"
                      step="0.01"
                      disabled={isLoading}
                    />
                    {errors.amount && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.amount}
                      </p>
                    )}
                  </div>
                </div>

                {/* Payout display */}
                <div className="text-center my-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Your Payout: ${calculatePayout().toFixed(2)}
                  </div>
                </div>

                {/* Trading buttons */}
                <div className="grid grid-cols-2 gap-4 font-semibold">
                  <button
                    onClick={() => createDemoTrade('UP')}
                    disabled={isLoading}
                    className="flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed text-white rounded-md transition-colors"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    ) : (
                      <ArrowUp size={18} className="mr-2" />
                    )}
                    Up
                  </button>
                  <button
                    onClick={() => createDemoTrade('DOWN')}
                    disabled={isLoading}
                    className="flex items-center justify-center px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-red-400 disabled:cursor-not-allowed text-white rounded-md transition-colors"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    ) : (
                      <ArrowDown size={18} className="mr-2" />
                    )}
                    Down
                  </button>
                </div>
              </div>
            </div>

            {/* Trading history */}
            <RecentDemoTrades changes={tradePlaced} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PracticeTrade;
