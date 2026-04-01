import { Settings, HelpCircle, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex items-center justify-between h-14 px-6 bg-sliver-bg-secondary border-b border-sliver-border">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-sliver-accent flex items-center justify-center">
          <span className="text-white font-bold text-sm">S</span>
        </div>
        <h1 className="text-lg font-semibold text-sliver-text-primary">Sliver WebUI</h1>
      </div>
      <div className="flex items-center gap-2">
        <button className="p-2 text-sliver-text-secondary hover:text-sliver-text-primary hover:bg-sliver-border rounded">
          <User size={18} />
        </button>
        <button className="p-2 text-sliver-text-secondary hover:text-sliver-text-primary hover:bg-sliver-border rounded">
          <Settings size={18} />
        </button>
        <button className="p-2 text-sliver-text-secondary hover:text-sliver-text-primary hover:bg-sliver-border rounded">
          <HelpCircle size={18} />
        </button>
      </div>
    </header>
  );
}
