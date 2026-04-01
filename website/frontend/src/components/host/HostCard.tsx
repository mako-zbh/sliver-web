import { Server, Shield, User, Monitor, Clock } from 'lucide-react';
import type { Host } from '@/types';
import clsx from 'clsx';
import { formatDistanceToNow } from '@/utils/format';

interface HostCardProps {
  host: Host;
  isSelected: boolean;
  onClick: () => void;
}

export default function HostCard({ host, isSelected, onClick }: HostCardProps) {
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
          <Server size={16} className="text-sliver-info" />
          <span className="font-medium text-sliver-text-primary truncate">{host.hostname}</span>
        </div>
        <div className="flex items-center gap-2">
          {host.isElevated && (
            <Shield size={14} className="text-sliver-accent" />
          )}
          <span className="text-xs text-sliver-text-secondary px-2 py-0.5 bg-sliver-bg-secondary rounded">
            {host.architecture}
          </span>
        </div>
      </div>

      <div className="space-y-1.5 text-sm">
        <div className="flex items-center gap-2 text-sliver-text-secondary">
          <Monitor size={14} />
          <span className="font-mono text-xs">{host.ipAddress}</span>
        </div>
        <div className="flex items-center gap-2 text-sliver-text-secondary">
          <User size={14} />
          <span>{host.username}</span>
        </div>
        <div className="flex items-center gap-2 text-sliver-text-secondary">
          <Clock size={14} />
          <span>{formatDistanceToNow(new Date(host.lastSeen))}</span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-sliver-border">
        <div className="flex flex-wrap gap-1">
          {host.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-0.5 text-xs bg-sliver-border rounded">
              {tag}
            </span>
          ))}
          {host.tags.length > 3 && (
            <span className="px-2 py-0.5 text-xs text-sliver-text-secondary">
              +{host.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
