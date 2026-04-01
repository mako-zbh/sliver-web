import { Activity, Monitor, Radio, Server } from 'lucide-react';
import { useSessionStore } from '@/stores/sessionStore';
import { useBeaconStore } from '@/stores/beaconStore';
import { useHostStore } from '@/stores/hostStore';

export default function Dashboard() {
  const { sessions } = useSessionStore();
  const { beacons } = useBeaconStore();
  const { hosts } = useHostStore();
  
  const activeSessions = sessions.filter(s => s.isActive).length;
  const activeBeacons = beacons.filter(b => b.isActive).length;

  const stats = [
    { label: 'Active Sessions', value: activeSessions, icon: Monitor, color: 'text-sliver-success' },
    { label: 'Active Beacons', value: activeBeacons, icon: Radio, color: 'text-sliver-accent' },
    { label: 'Total Hosts', value: hosts.length, icon: Server, color: 'text-sliver-info' },
    { label: 'Tasks Completed', value: 0, icon: Activity, color: 'text-sliver-success' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-sliver-text-primary">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-sliver-text-secondary">{stat.label}</p>
                <p className="text-3xl font-bold text-sliver-text-primary mt-1">{stat.value}</p>
              </div>
              <stat.icon size={32} className={stat.color} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-4">
          <h2 className="text-lg font-semibold mb-4">Recent Sessions</h2>
          <div className="space-y-2">
            {sessions.length === 0 ? (
              <p className="text-sliver-text-secondary text-sm">No active sessions</p>
            ) : (
              sessions.slice(0, 5).map((session) => (
                <div key={session.id} className="flex items-center justify-between p-2 bg-sliver-bg-primary rounded">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${session.isActive ? 'bg-sliver-success' : 'bg-sliver-warning'}`} />
                    <span className="text-sm font-medium">{session.name}</span>
                  </div>
                  <span className="text-xs text-sliver-text-secondary">{session.hostname}</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="card p-4">
          <h2 className="text-lg font-semibold mb-4">Active Beacons</h2>
          <div className="space-y-2">
            {beacons.length === 0 ? (
              <p className="text-sliver-text-secondary text-sm">No active beacons</p>
            ) : (
              beacons.slice(0, 5).map((beacon) => (
                <div key={beacon.id} className="flex items-center justify-between p-2 bg-sliver-bg-primary rounded">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${beacon.isActive ? 'bg-sliver-accent' : 'bg-sliver-warning'}`} />
                    <span className="text-sm font-medium">{beacon.name}</span>
                  </div>
                  <span className="text-xs text-sliver-text-secondary">{beacon.interval}s</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
