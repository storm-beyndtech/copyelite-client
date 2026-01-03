import { useEffect, useMemo, useState } from 'react';
import { RefreshCw, Search, Shield, Target, MapPin, Clock } from 'lucide-react';
import { contextData } from '@/context/AuthContext';

type ActivityLog = {
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
  createdAt?: string;
};

export default function ActivityLogs() {
  const { token } = contextData();
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('');
  const [limit, setLimit] = useState(50);
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const fetchLogs = async () => {
    if (!token) {
      setError('Authentication required');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const query = new URLSearchParams();
      query.set('limit', String(limit));
      if (actionFilter) query.set('action', actionFilter);

      const res = await fetch(`${url}/activity-logs?${query.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch activity logs');

      setLogs(data.logs || []);
    } catch (err: any) {
      setError(err.message || 'Unable to load activity logs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [actionFilter, limit, token]);

  const filteredLogs = useMemo(() => {
    if (!search) return logs;
    const term = search.toLowerCase();
    return logs.filter((log) => {
      const metadataText = JSON.stringify(log.metadata || {});
      return (
        log.action?.toLowerCase().includes(term) ||
        log.actorEmail?.toLowerCase().includes(term) ||
        log.targetCollection?.toLowerCase().includes(term) ||
        String(log.targetId || '').toLowerCase().includes(term) ||
        log.ipAddress?.toLowerCase().includes(term) ||
        metadataText.toLowerCase().includes(term)
      );
    });
  }, [logs, search]);

  const uniqueActions = useMemo(() => {
    return Array.from(new Set(logs.map((log) => log.action))).sort();
  }, [logs]);

  const formatDate = (value?: string) => {
    if (!value) return 'Unknown time';
    return new Date(value).toLocaleString();
  };

  const buildLocationLabel = (log: ActivityLog) => {
    if (!log.location) return 'Location: unknown';
    const { city, region, country, lat, lng } = log.location;
    const place = [city, region, country].filter(Boolean).join(', ');
    const coords = lat && lng ? ` (${lat}, ${lng})` : '';
    return place ? `${place}${coords}` : 'Location: unknown';
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <Shield className="text-emerald-400" />
            <div>
              <h1 className="text-2xl font-semibold">Activity Logs</h1>
              <p className="text-sm text-slate-400">
                Trace critical actions with IP, device, and geo context.
              </p>
            </div>
          </div>
          <button
            onClick={fetchLogs}
            className="ml-auto inline-flex items-center gap-2 rounded-lg bg-emerald-500/10 border border-emerald-400/40 px-3 py-2 text-sm text-emerald-100 hover:bg-emerald-500/20 transition w-full sm:w-auto"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4 shadow-lg shadow-black/30 space-y-3">
          <div className="flex flex-col md:flex-row md:flex-wrap gap-3">
            <div className="flex-1 min-w-[240px]">
              <label className="text-xs text-slate-400 flex items-center gap-2 mb-1">
                <Search className="h-4 w-4" /> Search
              </label>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filter by action, user, target, IP, metadata"
                className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
              />
            </div>

            <div className="min-w-[200px] md:w-60">
              <label className="text-xs text-slate-400 mb-1 block">Action</label>
              <select
                value={actionFilter}
                onChange={(e) => setActionFilter(e.target.value)}
                className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
              >
                <option value="">All actions</option>
                {uniqueActions.map((action) => (
                  <option value={action} key={action}>
                    {action}
                  </option>
                ))}
              </select>
            </div>

            <div className="min-w-[160px] md:w-40">
              <label className="text-xs text-slate-400 mb-1 block">Limit</label>
              <select
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
              >
                {[20, 50, 100, 150, 200].map((option) => (
                  <option key={option} value={option}>
                    Last {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {error && <p className="text-sm text-red-300">{error}</p>}
        </div>

        {loading ? (
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center text-slate-300">
            Loading activity logs...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredLogs.map((log) => (
              <div
                key={log._id}
                className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3 shadow-lg shadow-black/30 backdrop-blur-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col gap-1">
                    <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-emerald-200">
                      <Target className="h-4 w-4" />
                      {log.action}
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {formatDate(log.createdAt)}
                    </div>
                  </div>
                  <span className="text-[11px] px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-100 capitalize">
                    {log.actorRole || 'unknown'}
                  </span>
                </div>

                <div className="space-y-1 text-sm">
                  <p className="break-words">
                    <span className="text-slate-400">Actor:</span>{' '}
                    {log.actorEmail || 'Unknown'}
                  </p>
                  <p className="break-words">
                    <span className="text-slate-400">Target:</span>{' '}
                    {[log.targetCollection || 'n/a', log.targetId || '']
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                  <p className="break-words">
                    <span className="text-slate-400">IP:</span> {log.ipAddress || 'unknown'}
                  </p>
                  <p className="break-words text-slate-300">
                    <span className="text-slate-400">Location:</span> {buildLocationLabel(log)}
                  </p>
                  <p className="break-words text-xs text-slate-400">
                    UA: {log.userAgent || 'unknown'}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400 mb-1">Metadata</p>
                  <pre className="bg-black/40 border border-white/10 rounded-lg p-3 text-xs text-emerald-100 overflow-auto max-h-32 whitespace-pre-wrap break-words">
                    {JSON.stringify(log.metadata || {}, null, 2)}
                  </pre>
                </div>
              </div>
            ))}

            {!filteredLogs.length && (
              <div className="col-span-full bg-white/5 border border-white/10 rounded-xl p-6 text-center text-slate-300">
                No activity logs found with current filters.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
