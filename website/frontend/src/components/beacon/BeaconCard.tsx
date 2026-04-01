import { Radio, Clock, Activity } from 'lucide-react';
import type { Beacon } from '@/types';
import clsx from 'clsx';
import { formatDistanceToNow } from '@/utils/format';

interface BeaconCardProps {
  beacon: Beacon;
  isSelected: boolean;
  onClick: () => void;
}

export default function BeaconCard({ beacon, isSelected, onClick }: BeaconCardProps) {
  const pendingTasks = beacon.tasks.filter(t => t.status === 'pending').length;

  return (
    <div
      onClick={onClick}
      className={clsx(
        'p-4 rounded-lg cursor-pointer transition-all border',
        isSelected
          ? 'bg-sliver-accent bg-opacity-10 border-sliver-accent'
          : 'bg-sliver-bg-primary border-sliver-border hover:border-sliver-accent'
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Radio size={16} className={beacon.isActive ? 'text-sliver-accent' : 'text-sliver-warning'} />
          <span className="font-medium text-sliver-text-primary">{beacon.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-sliver-text-secondary px-2 py-0.5 bg-sliver-bg-secondary rounded">
            {beacon.transport}
          </span>
        </div>
      </div>

      <div className="space-y-1.5 text-sm">
        <div className="flex items-center gap-2 text-sliver-text-secondary">
          <Activity size={14} />
          <span>{beacon.hostname} / {beacon.ipAddress}</span>
        </div>
        <div className="flex items-center gap-2 text-sliver-text-secondary">
          <Clock size={14} />
          <span>{formatDistanceToNow(new Date(beacon.lastSeen))}</span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-sliver-border">
        <div className="flex items-center justify-between text-xs">
          <span className="text-sliver-text-secondary">
            Interval: <span className="text-sliver-text-primary">{beacon.interval}s</span>
            {' | Jitter: '}
            <span className="text-sliver-text-primary">{beacon.jitter}%</span>
          </span>
          {pendingTasks > 0 && (
            <span className="px-2 py-0.5 bg-sliver-accent bg-opacity-20 text-sliver-accent rounded">
              {pendingTasks} pending
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
