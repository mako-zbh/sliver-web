import { useSessionStore } from '@/stores/sessionStore';
import { SessionList, SessionTerminal } from '@/components/session';

export default function Sessions() {
  const { sessions, activeSession, setActiveSession } = useSessionStore();
  const selectedSession = sessions.find(s => s.id === activeSession);

  return (
    <div className="h-full flex gap-4">
      <div className="w-80 flex-shrink-0">
        <SessionList
          sessions={sessions}
          selectedId={activeSession}
          onSelect={setActiveSession}
        />
      </div>
      <div className="flex-1">
        {selectedSession ? (
          <SessionTerminal session={selectedSession} />
        ) : (
          <div className="h-full flex items-center justify-center bg-sliver-bg-secondary rounded-lg border border-sliver-border">
            <p className="text-sliver-text-secondary">Select a session to interact</p>
          </div>
        )}
      </div>
    </div>
  );
}
