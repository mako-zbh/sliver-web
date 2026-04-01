import { useState } from 'react';
import { useHostStore } from '@/stores/hostStore';
import { HostCard, HostDetail } from '@/components/host';

export default function Hosts() {
  const { hosts, selectedHost, setSelectedHost } = useHostStore();
  const [searchTerm, setSearchTerm] = useState('');
  const selectedHostData = hosts.find(h => h.id === selectedHost);

  const filteredHosts = hosts.filter(host =>
    host.hostname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    host.ipAddress.includes(searchTerm) ||
    host.username.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="h-full flex gap-4">
      <div className="w-80 flex-shrink-0">
        <div className="card h-full flex flex-col">
          <div className="p-4 border-b border-sliver-border">
            <input
              type="text"
              placeholder="Search hosts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input w-full"
            />
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {filteredHosts.length === 0 ? (
              <p className="text-sliver-text-secondary text-sm text-center py-4">No hosts found</p>
            ) : (
              filteredHosts.map((host) => (
                <HostCard
                  key={host.id}
                  host={host}
                  isSelected={host.id === selectedHost}
                  onClick={() => setSelectedHost(host.id)}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <div className="flex-1">
        {selectedHostData ? (
          <HostDetail host={selectedHostData} onClose={() => setSelectedHost(null)} />
        ) : (
          <div className="h-full flex items-center justify-center bg-sliver-bg-secondary rounded-lg border border-sliver-border">
            <p className="text-sliver-text-secondary">Select a host to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}
