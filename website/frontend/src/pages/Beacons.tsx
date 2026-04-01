import { RefreshCw } from 'lucide-react';
import { useBeaconStore } from '@/stores/beaconStore';
import { formatDistanceToNow } from 'date-fns';

export default function Beacons() {
  const { beacons, isLoading, setLoading } = useBeaconStore();

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-sliver-text-primary">Beacons</h1>
        <button 
          onClick={handleRefresh}
          className="btn btn-secondary flex items-center gap-2"
          disabled={isLoading}
        >
          <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      <div className="grid gap-4">
        {beacons.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="text-sliver-text-secondary">No beacons found</p>
          </div>
        ) : (
          beacons.map((beacon) => (
            <div key={beacon.id} className="card p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${beacon.isActive ? 'bg-sliver-accent' : 'bg-sliver-warning'}`} />
                  <div>
                    <h3 className="font-medium">{beacon.name}</h3>
                    <p className="text-sm text-sliver-text-secondary">{beacon.hostname} • {beacon.ipAddress}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm text-sliver-text-secondary">
                  <div>
                    <span className="text-sliver-text-primary font-medium">{beacon.interval}s</span> interval
                  </div>
                  <div>
                    <span className="text-sliver-text-primary font-medium">{beacon.jitter}%</span> jitter
                  </div>
                  <div>
                    {formatDistanceToNow(new Date(beacon.lastSeen), { addSuffix: true })}
                  </div>
                </div>
              </div>
              {beacon.tasks.length > 0 && (
                <div className="mt-4 pt-4 border-t border-sliver-border">
                  <p className="text-sm text-sliver-text-secondary">{beacon.tasks.length} pending tasks</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
