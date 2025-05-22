import { useEffect, useState } from 'react';
import {
  Calendar,
  Clock,
  TrendingUp,
  AlertCircle,
  Filter,
  RefreshCw,
  Globe,
} from 'lucide-react';

export default function EconomicCalendar() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0],
  );
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedImpact, setSelectedImpact] = useState('all');
  const [loading, setLoading] = useState(false);

  // Mock economic events data
  const [events] = useState([
    {
      id: 1,
      time: '08:30',
      country: 'US',
      event: 'Non-Farm Payrolls',
      impact: 'high',
      forecast: '180K',
      previous: '175K',
      actual: '185K',
      currency: 'USD',
    },
    {
      id: 2,
      time: '10:00',
      country: 'EU',
      event: 'CPI Flash Estimate y/y',
      impact: 'high',
      forecast: '2.1%',
      previous: '2.0%',
      actual: null,
      currency: 'EUR',
    },
    {
      id: 3,
      time: '14:15',
      country: 'UK',
      event: 'Bank of England Rate Decision',
      impact: 'high',
      forecast: '5.25%',
      previous: '5.25%',
      actual: null,
      currency: 'GBP',
    },
    {
      id: 4,
      time: '09:45',
      country: 'US',
      event: 'Services PMI',
      impact: 'medium',
      forecast: '52.1',
      previous: '51.8',
      actual: '52.3',
      currency: 'USD',
    },
    {
      id: 5,
      time: '12:00',
      country: 'CA',
      event: 'GDP m/m',
      impact: 'medium',
      forecast: '0.2%',
      previous: '0.1%',
      actual: null,
      currency: 'CAD',
    },
  ]);

  const countries = [
    { code: 'all', name: 'All Countries', flag: '🌍' },
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'EU', name: 'European Union', flag: '🇪🇺' },
    { code: 'UK', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'JP', name: 'Japan', flag: '🇯🇵' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦' },
    { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  ];

  const impactLevels = [
    { value: 'all', label: 'All Impact Levels' },
    { value: 'high', label: 'High Impact' },
    { value: 'medium', label: 'Medium Impact' },
    { value: 'low', label: 'Low Impact' },
  ];

  const getImpactColor = (impact: any) => {
    switch (impact) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getActualColor = (actual: any, forecast: any) => {
    if (!actual || !forecast) return 'text-gray-500';
    const actualNum = parseFloat(actual.replace(/[^0-9.-]/g, ''));
    const forecastNum = parseFloat(forecast.replace(/[^0-9.-]/g, ''));
    if (actualNum > forecastNum) return 'text-green-600';
    if (actualNum < forecastNum) return 'text-red-600';
    return 'text-gray-600';
  };

  const filteredEvents = events.filter((event) => {
    const countryFilter =
      selectedCountry === 'all' || event.country === selectedCountry;
    const impactFilter =
      selectedImpact === 'all' || event.impact === selectedImpact;
    return countryFilter && impactFilter;
  });

  const refreshData = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    // Load TradingView Economic Calendar widget
    const script = document.createElement('script');
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-events.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      colorTheme: 'light',
      isTransparent: false,
      width: '100%',
      height: '400',
      locale: 'en',
      importanceFilter: '-1,0,1',
      countryFilter: 'US,EU,JP,GB,AU,CA,CN,DE,IT,NZ,SG,FR,HK,SE,CH,ES',
    });

    const widgetContainer = document.getElementById('tradingview_events');
    if (widgetContainer) {
      widgetContainer.innerHTML = '';
      widgetContainer.appendChild(script);
    }
  }, []);

  return (
    <div className="w-full p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <Calendar className="mr-3" size={32} />
            Economic Calendar
          </h1>
          <button
            onClick={refreshData}
            className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            disabled={loading}
          >
            <RefreshCw
              className={`mr-2 ${loading ? 'animate-spin' : ''}`}
              size={16}
            />
            Refresh
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white border border-gray-200 rounded-lg shadow p-6 dark:bg-gray-800 dark:border-gray-700 mb-6">
          <div className="flex items-center mb-4">
            <Filter className="mr-2" size={20} />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Filters
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Country
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Impact Level
              </label>
              <select
                value={selectedImpact}
                onChange={(e) => setSelectedImpact(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              >
                {impactLevels.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Event List */}
          <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                <Clock className="mr-2" size={20} />
                Today's Events ({filteredEvents.length})
              </h3>
            </div>

            <div className="p-4 max-h-96 overflow-y-auto">
              {loading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredEvents.map((event) => (
                    <div
                      key={event.id}
                      className="border-l-4 border-blue-500 pl-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-r-lg"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-bold text-gray-900 dark:text-white">
                            {event.time}
                          </span>
                          <span className="text-lg">
                            {
                              countries.find((c) => c.code === event.country)
                                ?.flag
                            }
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(
                              event.impact,
                            )}`}
                          >
                            {event.impact.toUpperCase()}
                          </span>
                        </div>
                      </div>

                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {event.event}
                      </h4>

                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <span className="text-gray-600 dark:text-gray-300">
                            Forecast:
                          </span>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {event.forecast}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-300">
                            Previous:
                          </span>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {event.previous}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-300">
                            Actual:
                          </span>
                          <div
                            className={`font-medium ${getActualColor(
                              event.actual,
                              event.forecast,
                            )}`}
                          >
                            {event.actual || 'TBD'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* TradingView Events Widget */}
          <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                <Globe className="mr-2" size={20} />
                Global Economic Events
              </h3>
            </div>
            <div id="tradingview_events" className="rounded-b-lg"></div>
          </div>
        </div>

        {/* Market Impact Summary */}
        <div className="mt-6 bg-white border border-gray-200 rounded-lg shadow p-6 dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <TrendingUp className="mr-2" size={20} />
            Market Impact Summary
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-lg border border-red-200 dark:border-red-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-red-800 dark:text-red-200">
                  High Impact
                </span>
                <AlertCircle className="text-red-600" size={16} />
              </div>
              <div className="text-2xl font-bold text-red-900 dark:text-red-100">
                {events.filter((e) => e.impact === 'high').length}
              </div>
              <div className="text-sm text-red-700 dark:text-red-300">
                Events today
              </div>
            </div>

            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg border border-yellow-200 dark:border-yellow-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  Medium Impact
                </span>
                <AlertCircle className="text-yellow-600" size={16} />
              </div>
              <div className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">
                {events.filter((e) => e.impact === 'medium').length}
              </div>
              <div className="text-sm text-yellow-700 dark:text-yellow-300">
                Events today
              </div>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-green-800 dark:text-green-200">
                  Positive Surprise
                </span>
                <TrendingUp className="text-green-600" size={16} />
              </div>
              <div className="text-2xl font-bold text-green-900 dark:text-green-100">
                {
                  events.filter(
                    (e) =>
                      e.actual &&
                      parseFloat(e.actual.replace(/[^0-9.-]/g, '')) >
                        parseFloat(e.forecast.replace(/[^0-9.-]/g, '')),
                  ).length
                }
              </div>
              <div className="text-sm text-green-700 dark:text-green-300">
                Above forecast
              </div>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-200 dark:border-blue-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  Pending
                </span>
                <Clock className="text-blue-600" size={16} />
              </div>
              <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                {events.filter((e) => !e.actual).length}
              </div>
              <div className="text-sm text-blue-700 dark:text-blue-300">
                Awaiting results
              </div>
            </div>
          </div>
        </div>

        {/* Currency Impact Analysis */}
        <div className="mt-6 bg-white border border-gray-200 rounded-lg shadow p-6 dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Currency Impact Analysis
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-900 dark:text-white">
                  USD Events
                </span>
                <span className="text-lg">🇺🇸</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {events.filter((e) => e.currency === 'USD').length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                High impact:{' '}
                {
                  events.filter(
                    (e) => e.currency === 'USD' && e.impact === 'high',
                  ).length
                }
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-900 dark:text-white">
                  EUR Events
                </span>
                <span className="text-lg">🇪🇺</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {events.filter((e) => e.currency === 'EUR').length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                High impact:{' '}
                {
                  events.filter(
                    (e) => e.currency === 'EUR' && e.impact === 'high',
                  ).length
                }
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-900 dark:text-white">
                  GBP Events
                </span>
                <span className="text-lg">🇬🇧</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {events.filter((e) => e.currency === 'GBP').length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                High impact:{' '}
                {
                  events.filter(
                    (e) => e.currency === 'GBP' && e.impact === 'high',
                  ).length
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
