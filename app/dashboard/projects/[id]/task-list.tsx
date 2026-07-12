'use client';

import { updateTaskStatus } from '@/app/actions/tasks';
import { useTransition } from 'react';
import { format } from 'date-fns';

type Task = {
  id: string;
  title: string;
  description: string | null;
  priority: string;
  status: string;
  createdAt: Date;
};

export default function TaskList({ tasks, projectId }: { tasks: Task[], projectId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (taskId: string, newStatus: string) => {
    startTransition(() => {
      updateTaskStatus(taskId, projectId, newStatus);
    });
  };

  if (tasks.length === 0) {
    return (
      <div className="bg-white border border-[#cccccc] shadow-sm rounded-sm p-8 text-center">
        <p className="text-[#737373] text-sm">No tasks added to this project yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <div key={task.id} className={`bg-white border rounded p-4 transition-opacity ${isPending ? 'opacity-70' : ''} ${task.status === 'completed' ? 'border-[#EEEEEE] opacity-80' : task.priority === 'high' ? 'border-l-4 border-l-red-500 border-[#DDDDDD]' : 'border-[#DDDDDD]'}`}>
          <div className="flex justify-between items-start">
            <div className="flex-1 pr-4">
              <h3 className={`text-sm font-bold ${task.status === 'completed' ? 'text-gray-400 line-through' : 'text-[#222222]'}`}>{task.title}</h3>
              {task.description && (
                <p className="text-xs text-gray-500 mt-1">{task.description}</p>
              )}
              <div className="mt-3 flex items-center space-x-3 text-[10px] font-bold uppercase tracking-wider">
                <span className={`px-2 py-0.5 rounded ${
                  task.priority === 'high' ? 'bg-red-100 text-red-700' :
                  task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {task.priority}
                </span>
                <span className="text-gray-400 font-medium">
                  Added {format(new Date(task.createdAt), 'MMM d')}
                </span>
              </div>
            </div>
            <div>
              <select
                value={task.status}
                onChange={(e) => handleStatusChange(task.id, e.target.value)}
                disabled={isPending}
                className="block w-full pl-3 pr-8 py-1.5 text-xs font-bold uppercase border border-[#CCCCCC] rounded text-[#444444] focus:outline-none focus:ring-1 focus:ring-[#0079B8] focus:border-[#0079B8] bg-white"
              >
                <option value="to_do">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="review">Review</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
