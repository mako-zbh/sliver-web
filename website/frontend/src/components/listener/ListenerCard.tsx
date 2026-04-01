import { Globe, Clock } from 'lucide-react';
import type { Listener } from '@/types';
import clsx from 'clsx';
import { formatDistanceToNow } from '@/utils/format';

interface ListenerCardProps {
  listener: Listener;
  onStart?: () => void;
  onStop?: () => void;
}

export default function ListenerCard({ listener, onStart, onStop }: ListenerCardProps) {
  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={clsx(
            'w-3 h-3 rounded-full',
            listener.isActive ? 'bg-sliver-success' : 'bg-sliver-warning'
          )} />
          <h3 className="font-medium text-sliver-text-primary">{listener.name}</h3>
        </div>
        <span className="px-2 py-0.5 text-xs bg-sliver-border rounded">{listener.type}</span>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-sliver-text-secondary">
          <Globe size={14} />
          <span className="font-mono">{listener.address}:{listener.port}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sliver-text-secondary">
            <span>Beacons: <span className="text-sliver-text-primary">{listener.beaconCount}</span></span>
            <span>Sessions: <span className="text-sliver-text-primary">{listener.sessionCount}</span></span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sliver-text-secondary">
          <Clock size={14} />
          <span>{formatDistanceToNow(new Date(listener.startedAt))}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-sliver-border flex gap-2">
        {listener.isActive ? (
          <button
            onClick={onStop}
            className="btn btn-secondary flex-1 text-sliver-warning"
          >
            Stop
          </button>
        ) : (
          <button
            onClick={onStart}
            className="btn btn-primary flex-1"
          >
            Start
          </button>
        )}
      </div>
    </div>
  );
}
