import React from 'react';
import { Monitor, Smartphone, Tablet, MapPin, Clock } from 'lucide-react';

interface LoginEntry {
  id: string;
  device: string;
  deviceType: 'desktop' | 'mobile' | 'tablet';
  location: string;
  ipAddress: string;
  timestamp: string;
  status: 'success' | 'failed';
}

const LoginHistory: React.FC = () => {
  // Sample data - replace with your actual data source
  const loginHistory: LoginEntry[] = [
    {
      id: '1',
      device: 'Chrome on Windows',
      deviceType: 'desktop',
      location: 'New York, NY',
      ipAddress: '192.168.1.1',
      timestamp: '2024-05-22T10:30:00Z',
      status: 'success',
    },
    {
      id: '2',
      device: 'Safari on iPhone',
      deviceType: 'mobile',
      location: 'San Francisco, CA',
      ipAddress: '10.0.0.1',
      timestamp: '2024-05-21T15:45:00Z',
      status: 'success',
    },
    {
      id: '3',
      device: 'Firefox on Ubuntu',
      deviceType: 'desktop',
      location: 'Austin, TX',
      ipAddress: '172.16.0.1',
      timestamp: '2024-05-21T09:15:00Z',
      status: 'failed',
    },
    {
      id: '4',
      device: 'Chrome on iPad',
      deviceType: 'tablet',
      location: 'Miami, FL',
      ipAddress: '203.0.113.1',
      timestamp: '2024-05-20T14:20:00Z',
      status: 'success',
    },
    {
      id: '5',
      device: 'Edge on Windows',
      deviceType: 'desktop',
      location: 'Seattle, WA',
      ipAddress: '198.51.100.1',
      timestamp: '2024-05-19T11:00:00Z',
      status: 'success',
    },
  ];

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'mobile':
        return <Smartphone className="w-5 h-5" />;
      case 'tablet':
        return <Tablet className="w-5 h-5" />;
      default:
        return <Monitor className="w-5 h-5" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  };

  const getStatusColor = (status: string) => {
    return status === 'success'
      ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20'
      : 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20';
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800/50 dark:border-gray-700 p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Login History
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Recent login attempts and device information
        </p>
      </div>

      <div className="space-y-4">
        {loginHistory.map((entry) => (
          <div
            key={entry.id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              {/* Device and Status */}
              <div className="flex items-center gap-3">
                <div className="text-gray-500 dark:text-gray-400">
                  {getDeviceIcon(entry.deviceType)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-medium text-gray-900 dark:text-white truncate">
                      {entry.device}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        entry.status,
                      )}`}
                    >
                      {entry.status === 'success' ? 'Success' : 'Failed'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Timestamp */}
              <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 sm:ml-auto">
                <Clock className="w-4 h-4" />
                <span className="whitespace-nowrap">
                  {formatTimestamp(entry.timestamp)}
                </span>
              </div>
            </div>

            {/* Location and IP */}
            <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{entry.location}</span>
              </div>
              <div className="sm:ml-2">
                <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">
                  {entry.ipAddress}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {loginHistory.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-600 mb-2">
            <Monitor className="w-12 h-12 mx-auto" />
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            No login history available
          </p>
        </div>
      )}
    </div>
  );
};

export default LoginHistory;
