import { Wifi, Radio, Activity } from 'lucide-react';
import { useSessionStore } from '@/stores/sessionStore';

export default function StatusBar() {
  const { sessions } = useSessionStore();
  const activeSessions = sessions.filter(s => s.isActive).length;

  return (
    <footer className="flex items-center justify-between h-8 px-4 bg-sliver-bg-secondary border-t border-sliver-border text-xs text-sliver-text-secondary">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <Wifi size={12} className="text-sliver-success" />
          <span>Connected</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Activity size={12} />
          <span>Active Sessions: {activeSessions}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Radio size={12} />
          <span>Beacons: 0</span>
        </div>
      </div>
      <div>
        <span>Sliver v1.5.0</span>
      </div>
    </footer>
  );
}
