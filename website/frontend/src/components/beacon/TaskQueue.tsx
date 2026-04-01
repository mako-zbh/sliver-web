import type { Task } from '@/types';
import { Clock, CheckCircle, XCircle, Loader } from 'lucide-react';
import { formatDistanceToNow } from '@/utils/format';

interface TaskQueueProps {
  tasks: Task[];
}

export default function TaskQueue({ tasks }: TaskQueueProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-4 text-sliver-text-secondary text-sm">
        No tasks in queue
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between p-3 bg-sliver-bg-primary rounded border border-sliver-border"
        >
          <div className="flex items-center gap-3">
            {task.status === 'pending' && <Loader size={14} className="text-sliver-text-secondary animate-spin" />}
            {task.status === 'running' && <Loader size={14} className="text-sliver-accent animate-spin" />}
            {task.status === 'completed' && <CheckCircle size={14} className="text-sliver-success" />}
            {task.status === 'failed' && <XCircle size={14} className="text-sliver-warning" />}
            <span className="font-mono text-sm">{task.command}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-sliver-text-secondary">
            <Clock size={12} />
            <span>{formatDistanceToNow(new Date(task.createdAt))}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
