import { useState, useMemo } from 'react';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import type { Session } from '@/types';
import SessionCard from './SessionCard';

interface SessionListProps {
  sessions: Session[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

type SortField = 'name' | 'hostname' | 'lastSeen' | 'username';
type SortOrder = 'asc' | 'desc';

export default function SessionList({ sessions, selectedId, onSelect }: SessionListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('lastSeen');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [showActiveOnly, setShowActiveOnly] = useState(false);

  const filteredAndSorted = useMemo(() => {
    let result = sessions;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(s =>
        s.name.toLowerCase().includes(term) ||
        s.hostname.toLowerCase().includes(term) ||
        s.ipAddress.includes(term) ||
        s.username.toLowerCase().includes(term)
      );
    }

    if (showActiveOnly) {
      result = result.filter(s => s.isActive);
    }

    result.sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'hostname':
          comparison = a.hostname.localeCompare(b.hostname);
          break;
        case 'lastSeen':
          comparison = new Date(a.lastSeen).getTime() - new Date(b.lastSeen).getTime();
          break;
        case 'username':
          comparison = a.username.localeCompare(b.username);
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [sessions, searchTerm, sortField, sortOrder, showActiveOnly]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-sliver-border space-y-3">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-sliver-text-secondary" />
          <input
            type="text"
            placeholder="Search sessions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input w-full pl-10"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowActiveOnly(!showActiveOnly)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm transition-colors ${
              showActiveOnly
                ? 'bg-sliver-accent text-white'
                : 'bg-sliver-bg-primary text-sliver-text-secondary hover:text-sliver-text-primary'
            }`}
          >
            <Filter size={14} />
            Active Only
          </button>

          <div className="flex-1" />

          <button
            onClick={() => toggleSort('lastSeen')}
            className="flex items-center gap-1 px-2 py-1 text-xs text-sliver-text-secondary hover:text-sliver-text-primary"
          >
            <ArrowUpDown size={12} />
            Last Seen
          </button>
          <button
            onClick={() => toggleSort('name')}
            className="flex items-center gap-1 px-2 py-1 text-xs text-sliver-text-secondary hover:text-sliver-text-primary"
          >
            <ArrowUpDown size={12} />
            Name
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredAndSorted.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sliver-text-secondary">No sessions found</p>
          </div>
        ) : (
          filteredAndSorted.map((session) => (
            <SessionCard
              key={session.id}
              session={session}
              isSelected={session.id === selectedId}
              onClick={() => onSelect(session.id)}
            />
          ))
        )}
      </div>

      <div className="p-3 border-t border-sliver-border text-xs text-sliver-text-secondary">
        {filteredAndSorted.length} of {sessions.length} sessions
      </div>
    </div>
  );
}
