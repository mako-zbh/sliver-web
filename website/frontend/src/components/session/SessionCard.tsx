import { Monitor, Shield, Wifi, Clock } from 'lucide-react';
import type { Session } from '@/types';
import clsx from 'clsx';
import { formatDistanceToNow } from '@/utils/format';

interface SessionCardProps {
  session: Session;
  isSelected: boolean;
  onClick: () => void;
}

export default function SessionCard({ session, isSelected, onClick }: SessionCardProps) {
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
          <div className={clsx(
            'w-2.5 h-2.5 rounded-full',
            session.isActive ? 'bg-sliver-success' : 'bg-sliver-warning'
          )} />
          <span className="font-medium text-sliver-text-primary">{session.name}</span>
        </div>
        <div className="flex items-center gap-2">
          {session.isElevated && <Shield size={14} className="text-sliver-accent" />}
          <span className="text-xs text-sliver-text-secondary px-2 py-0.5 bg-sliver-bg-secondary rounded">
            {session.transport}
          </span>
        </div>
      </div>

      <div className="space-y-1.5 text-sm">
        <div className="flex items-center gap-2 text-sliver-text-secondary">
          <Monitor size={14} />
          <span>{session.hostname}</span>
        </div>
        <div className="flex items-center gap-2 text-sliver-text-secondary">
          <Wifi size={14} />
          <span className="font-mono text-xs">{session.ipAddress}</span>
        </div>
        <div className="flex items-center gap-2 text-sliver-text-secondary">
          <Clock size={14} />
          <span>{formatDistanceToNow(new Date(session.lastSeen))}</span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-sliver-border">
        <div className="flex items-center justify-between text-xs">
          <span className="text-sliver-text-secondary">
            User: <span className="text-sliver-text-primary">{session.username}</span>
          </span>
          <span className={clsx(
            'px-1.5 py-0.5 rounded text-xs',
            session.isActive ? 'bg-sliver-success bg-opacity-20 text-sliver-success' : 'bg-sliver-warning bg-opacity-20 text-sliver-warning'
          )}>
            {session.isActive ? 'Active' : 'Disconnected'}
          </span>
        </div>
      </div>
    </div>
  );
}
