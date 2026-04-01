import { RefreshCw } from 'lucide-react';
import { useSessionStore } from '@/stores/sessionStore';
import { formatDistanceToNow } from 'date-fns';

export default function Sessions() {
  const { sessions, isLoading, setLoading } = useSessionStore();

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-sliver-text-primary">Sessions</h1>
        <button 
          onClick={handleRefresh}
          className="btn btn-secondary flex items-center gap-2"
          disabled={isLoading}
        >
          <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full">
          <thead className="bg-sliver-bg-primary">
            <tr className="text-left text-sm text-sliver-text-secondary">
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Hostname</th>
              <th className="px-4 py-3">IP Address</th>
              <th className="px-4 py-3">Transport</th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Last Seen</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sliver-border">
            {sessions.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-sliver-text-secondary">
                  No sessions found
                </td>
              </tr>
            ) : (
              sessions.map((session) => (
                <tr 
                  key={session.id} 
                  className="hover:bg-sliver-bg-primary cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className={`w-3 h-3 rounded-full ${session.isActive ? 'bg-sliver-success' : 'bg-sliver-warning'}`} />
                  </td>
                  <td className="px-4 py-3 text-sm font-medium">{session.name}</td>
                  <td className="px-4 py-3 text-sm">{session.hostname}</td>
                  <td className="px-4 py-3 text-sm font-mono">{session.ipAddress}</td>
                  <td className="px-4 py-3 text-sm">{session.transport}</td>
                  <td className="px-4 py-3 text-sm">{session.username}</td>
                  <td className="px-4 py-3 text-sm text-sliver-text-secondary">
                    {formatDistanceToNow(new Date(session.lastSeen), { addSuffix: true })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
