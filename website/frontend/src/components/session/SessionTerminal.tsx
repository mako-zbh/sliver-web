import { useState, useRef, useEffect } from 'react';
import { Send, Terminal as TerminalIcon } from 'lucide-react';
import type { Session } from '@/types';
import clsx from 'clsx';

interface Message {
  id: string;
  type: 'input' | 'output' | 'error';
  content: string;
  timestamp: Date;
}

interface SessionTerminalProps {
  session: Session;
}

export default function SessionTerminal({ session }: SessionTerminalProps) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'output',
      content: `Connected to ${session.name} (${session.hostname})\n`,
      timestamp: new Date(),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages: Message[] = [
      ...messages,
      {
        id: Date.now().toString(),
        type: 'input',
        content: input,
        timestamp: new Date(),
      },
    ];

    if (input.toLowerCase() === 'clear') {
      setMessages([]);
    } else {
      setMessages([
        ...newMessages,
        {
          id: (Date.now() + 1).toString(),
          type: 'output',
          content: `[Command executed: ${input}]`,
          timestamp: new Date(),
        },
      ]);
    }

    setInput('');
  };

  return (
    <div className="flex flex-col h-full bg-black rounded-lg">
      <div className="flex items-center justify-between px-4 py-2 bg-sliver-bg-secondary border-b border-sliver-border rounded-t-lg">
        <div className="flex items-center gap-2">
          <TerminalIcon size={16} className="text-sliver-accent" />
          <span className="text-sm font-medium">{session.name}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-sliver-text-secondary">
          <span className="font-mono">{session.ipAddress}</span>
          <span className="text-sliver-border">|</span>
          <span>{session.username}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 font-mono text-sm">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={clsx(
              'whitespace-pre-wrap mb-1',
              msg.type === 'input' && 'text-sliver-success',
              msg.type === 'output' && 'text-sliver-text-primary',
              msg.type === 'error' && 'text-sliver-warning'
            )}
          >
            {msg.type === 'input' && <span className="text-sliver-accent">$ </span>}
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-3 border-t border-sliver-border">
        <div className="flex items-center gap-2">
          <span className="text-sliver-accent font-mono">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent text-sliver-text-primary font-mono text-sm focus:outline-none"
            placeholder="Enter command..."
            autoFocus
          />
          <button
            type="submit"
            className="p-2 text-sliver-accent hover:bg-sliver-bg-secondary rounded transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}
