import { RefreshCw, Plus } from 'lucide-react';
import { useListenerStore } from '@/stores/listenerStore';
import { formatDistanceToNow } from 'date-fns';

export default function Listeners() {
  const { listeners, isLoading, setLoading } = useListenerStore();

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-sliver-text-primary">Listeners</h1>
        <div className="flex gap-2">
          <button 
            onClick={handleRefresh}
            className="btn btn-secondary flex items-center gap-2"
            disabled={isLoading}
          >
            <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
            Refresh
          </button>
          <button className="btn btn-primary flex items-center gap-2">
            <Plus size={16} />
            New Listener
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {listeners.length === 0 ? (
          <div className="col-span-full card p-8 text-center">
            <p className="text-sliver-text-secondary">No listeners configured</p>
            <button className="btn btn-primary mt-4">
              <Plus size={16} className="mr-2" />
              Create First Listener
            </button>
          </div>
        ) : (
          listeners.map((listener) => (
            <div key={listener.id} className="card p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${listener.isActive ? 'bg-sliver-success' : 'bg-sliver-warning'}`} />
                  <h3 className="font-medium">{listener.name}</h3>
                </div>
                <span className="px-2 py-0.5 text-xs bg-sliver-border rounded">{listener.type}</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-sliver-text-secondary">Address</span>
                  <span className="font-mono">{listener.address}:{listener.port}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sliver-text-secondary">Beacons</span>
                  <span>{listener.beaconCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sliver-text-secondary">Sessions</span>
                  <span>{listener.sessionCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sliver-text-secondary">Started</span>
                  <span className="text-sliver-text-secondary">
                    {formatDistanceToNow(new Date(listener.startedAt), { addSuffix: true })}
                  </span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-sliver-border flex gap-2">
                {listener.isActive ? (
                  <button className="btn btn-secondary flex-1 text-sliver-warning">Stop</button>
                ) : (
                  <button className="btn btn-primary flex-1">Start</button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
