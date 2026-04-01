import { useBeaconStore } from '@/stores/beaconStore';
import { BeaconCard, TaskQueue } from '@/components/beacon';

export default function Beacons() {
  const { beacons, selectedBeacon, setSelectedBeacon, tasks } = useBeaconStore();
  const selectedBeaconData = beacons.find(b => b.id === selectedBeacon);
  const beaconTasks = selectedBeacon ? (tasks.get(selectedBeacon) || []) : [];

  return (
    <div className="h-full flex gap-4">
      <div className="w-80 flex-shrink-0">
        <div className="card h-full flex flex-col">
          <div className="p-4 border-b border-sliver-border">
            <h2 className="font-semibold text-sliver-text-primary">Beacons</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {beacons.length === 0 ? (
              <p className="text-sliver-text-secondary text-sm text-center py-4">No beacons found</p>
            ) : (
              beacons.map((beacon) => (
                <BeaconCard
                  key={beacon.id}
                  beacon={beacon}
                  isSelected={beacon.id === selectedBeacon}
                  onClick={() => setSelectedBeacon(beacon.id)}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <div className="flex-1 card p-4">
        <h2 className="font-semibold text-sliver-text-primary mb-4">Task Queue</h2>
        {selectedBeaconData ? (
          <div className="space-y-4">
            <div className="p-3 bg-sliver-bg-primary rounded border border-sliver-border">
              <div className="text-sm text-sliver-text-secondary">
                Selected: <span className="text-sliver-text-primary font-medium">{selectedBeaconData.name}</span>
                {' | '}
                Interval: <span className="text-sliver-text-primary">{selectedBeaconData.interval}s</span>
              </div>
            </div>
            <TaskQueue tasks={beaconTasks} />
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 text-sliver-text-secondary">
            Select a beacon to view tasks
          </div>
        )}
      </div>
    </div>
  );
}
