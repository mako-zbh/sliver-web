import { RefreshCw, Search } from 'lucide-react';
import { useState } from 'react';
import { useHostStore } from '@/stores/hostStore';
import { formatDistanceToNow } from 'date-fns';

export default function Hosts() {
  const { hosts, isLoading, setLoading } = useHostStore();
  const [searchTerm, setSearchTerm] = useState('');

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  const filteredHosts = hosts.filter(host =>
    host.hostname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    host.ipAddress.includes(searchTerm)
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-sliver-text-primary">Hosts</h1>
        <button 
          onClick={handleRefresh}
          className="btn btn-secondary flex items-center gap-2"
          disabled={isLoading}
        >
          <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-sliver-text-secondary" />
        <input
          type="text"
          placeholder="Search hosts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input w-full pl-10"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredHosts.length === 0 ? (
          <div className="col-span-full card p-8 text-center">
            <p className="text-sliver-text-secondary">No hosts found</p>
          </div>
        ) : (
          filteredHosts.map((host) => (
            <div key={host.id} className="card p-4 hover:border-sliver-accent transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium truncate">{host.hostname}</h3>
                {host.isElevated && (
                  <span className="px-2 py-0.5 text-xs bg-sliver-accent text-white rounded">Elevated</span>
                )}
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-sliver-text-secondary">IP Address</span>
                  <span className="font-mono">{host.ipAddress}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sliver-text-secondary">User</span>
                  <span className="truncate ml-2">{host.username}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sliver-text-secondary">OS</span>
                  <span className="truncate ml-2">{host.osVersion}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sliver-text-secondary">Last Seen</span>
                  <span className="text-sliver-text-secondary">
                    {formatDistanceToNow(new Date(host.lastSeen), { addSuffix: true })}
                  </span>
                </div>
              </div>
              {host.tags.length > 0 && (
                <div className="mt-3 pt-3 border-t border-sliver-border flex flex-wrap gap-1">
                  {host.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 text-xs bg-sliver-border rounded">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
