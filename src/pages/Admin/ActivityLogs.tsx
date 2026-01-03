import { useEffect, useMemo, useState } from 'react';
import { RefreshCcw, Search, Filter } from 'lucide-react';
import { contextData } from '@/context/AuthContext';
import { apiGet } from '@/utils/api';

interface ActivityLog {
  _id: string;
  actorEmail?: string;
  actorRole?: string;
  action: string;
  targetCollection?: string;
  targetId?: string;
  metadata?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  location?: {
    city?: string;
    region?: string;
    country?: string;
    lat?: number;
    lng?: number;
  };
  createdAt: string;
}

const ActivityLogs = () => {
  const { user } = contextData();
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('');
  const [limit, setLimit] = useState(50);
  const serverUrl = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const fetchLogs = async () => {
    if (!user?.isAdmin) return;
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ limit: String(limit) });
      if (actionFilter) params.append('action', actionFilter);
      const res = await apiGet(
        `${serverUrl}/activity-logs?${params.toString()}`,
      );
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.message || 'Failed to fetch activity logs');
      setLogs(data.logs || []);
    } catch (err: any) {
      setError(err.message || 'Unable to load logs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [actionFilter, limit]);

  const filteredLogs = useMemo(() => {
    if (!search) return logs;
    const term = search.toLowerCase();
    return logs.filter((log) => {
      return (
        log.action.toLowerCase().includes(term) ||
        (log.actorEmail || '').toLowerCase().includes(term) ||
        (log.targetCollection || '').toLowerCase().includes(term) ||
        (log.targetId || '').toLowerCase().includes(term)
      );
    });
  }, [logs, search]);

  const actionOptions = useMemo(() => {
    return Array.from(new Set(logs.map((log) => log.action))).sort();
  }, [logs]);

  const renderLocation = (log: ActivityLog) => {
    if (!log.location) return 'Unknown location';
    const parts = [
      log.location.city,
      log.location.region,
      log.location.country,
    ].filter(Boolean);
    return parts.join(', ') || 'Unknown location';
  };

  return (
    <div className="text-slate-900 dark:text-gray-300">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold dark:text-white">
            Activity Logs
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Recent actions with IP and device context.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <div className="flex flex-1 min-w-[180px] items-center gap-2 rounded-md bg-white px-3 py-2 border border-slate-200 shadow-sm dark:bg-slate-800 dark:border-slate-700">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </div>
          <div className="dark:text-white flex items-center gap-2 rounded-md bg-white px-3 py-2 border border-slate-200 shadow-sm dark:bg-slate-800 dark:border-slate-700">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="bg-transparent text-sm outline-none"
            >
              <option value="">All</option>
              {actionOptions.map((action) => (
                <option
                  key={action}
                  value={action}
                  className="bg-white text-slate-900 dark:bg-slate-800 dark:text-slate-100"
                >
                  {action}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2 rounded-md bg-white px-3 py-2 border border-slate-200 shadow-sm dark:bg-slate-800 dark:border-slate-700">
            <span className="text-xs text-slate-500 dark:text-slate-300">
              Limit
            </span>
            <select
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="bg-transparent text-sm outline-none"
            >
              {[25, 50, 100, 150, 200].map((value) => (
                <option
                  key={value}
                  value={value}
                  className="bg-white text-slate-900 dark:bg-slate-800 dark:text-slate-100"
                >
                  {value}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={fetchLogs}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:text-slate-900"
          >
            <RefreshCcw
              className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`}
            />
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-500 bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-transparent">
          {error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {loading && (
          <div className="col-span-full text-center opacity-60">
            Loading activity logs...
          </div>
        )}
        {!loading && filteredLogs.length === 0 && (
          <div className="col-span-full text-center opacity-60">
            No activity found for the selected filters.
          </div>
        )}

        {filteredLogs.map((log) => (
          <div
            key={log._id}
            className="rounded-xl bg-white border border-slate-200 p-4 shadow-md flex flex-col gap-3 break-words dark:bg-slate-900/50 dark:border-slate-800 dark:shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] text-amber-500 dark:text-amber-400">
                  {log.action}
                </p>
                <p className="text-sm font-semibold break-words">
                  {log.actorEmail || 'Unknown actor'}{' '}
                  <span className="text-slate-500 dark:text-slate-400">
                    ({log.actorRole || 'user'})
                  </span>
                </p>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {new Date(log.createdAt).toLocaleString()}
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <p className="truncate">
                <span className="text-slate-500 dark:text-slate-400">
                  Target:
                </span>{' '}
                <span className="font-medium break-words">
                  {log.targetCollection || '-'} {log.targetId || ''}
                </span>
              </p>
              <p className="flex flex-wrap gap-1">
                <span className="text-slate-500 dark:text-slate-400">IP:</span>
                <span className="font-mono text-xs bg-slate-100 px-2 py-1 rounded-md dark:bg-slate-800 dark:text-slate-200">
                  {log.ipAddress || 'n/a'}
                </span>
              </p>
              <p className="text-xs">
                <span className="text-slate-500 dark:text-slate-400">
                  Location:
                </span>{' '}
                {renderLocation(log)}
              </p>
              <p className="text-xs break-words">
                <span className="text-slate-500 dark:text-slate-400">UA:</span>{' '}
                <span className="whitespace-pre-wrap">
                  {log.userAgent || 'n/a'}
                </span>
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                Metadata
              </p>
              <div className="rounded-lg bg-slate-100 border border-slate-200 p-3 text-xs max-h-32 overflow-y-auto whitespace-pre-wrap break-words dark:bg-slate-800 dark:border-slate-700">
                {log.metadata ? JSON.stringify(log.metadata, null, 2) : '-'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityLogs;
