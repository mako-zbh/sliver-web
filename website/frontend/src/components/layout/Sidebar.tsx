import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Monitor, 
  Radio, 
  Server, 
  Headphones, 
  FileCode,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/sessions', label: 'Sessions', icon: Monitor },
  { path: '/beacons', label: 'Beacons', icon: Radio },
  { path: '/hosts', label: 'Hosts', icon: Server },
  { path: '/listeners', label: 'Listeners', icon: Headphones },
  { path: '/generate', label: 'Generate', icon: FileCode },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={clsx(
        'flex flex-col bg-sliver-bg-secondary border-r border-sliver-border transition-all duration-300',
        collapsed ? 'w-16' : 'w-52'
      )}
    >
      <nav className="flex-1 py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 px-4 py-3 transition-colors',
                isActive
                  ? 'bg-sliver-accent text-white'
                  : 'text-sliver-text-secondary hover:bg-sliver-border hover:text-sliver-text-primary'
              )
            }
          >
            <item.icon size={20} />
            {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
          </NavLink>
        ))}
      </nav>
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center p-4 border-t border-sliver-border text-sliver-text-secondary hover:text-sliver-text-primary"
      >
        {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>
    </aside>
  );
}
