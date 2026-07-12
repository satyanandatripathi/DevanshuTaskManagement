'use client';

import { createTask } from '@/app/actions/tasks';
import { useRef } from 'react';

export default function NewTaskForm({ projectId }: { projectId: string }) {
  const formRef = useRef<HTMLFormElement>(null);

  const action = async (formData: FormData) => {
    await createTask(projectId, formData);
    formRef.current?.reset();
  };

  return (
    <form ref={formRef} action={action} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-xs font-bold text-[#444444] uppercase mb-1 tracking-wide">Task Title</label>
        <input 
          type="text" 
          name="title" 
          id="title" 
          required
          className="w-full border border-[#CCCCCC] p-2.5 text-sm rounded bg-gray-50 focus:bg-white focus:outline-none focus:border-[#0079B8] focus:ring-1 focus:ring-[#0079B8] transition-colors"
          placeholder="What needs to be done?"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-xs font-bold text-[#444444] uppercase mb-1 tracking-wide">Description</label>
        <textarea 
          name="description" 
          id="description" 
          rows={3}
          className="w-full border border-[#CCCCCC] p-2.5 text-sm rounded bg-gray-50 focus:bg-white focus:outline-none focus:border-[#0079B8] focus:ring-1 focus:ring-[#0079B8] transition-colors"
          placeholder="Details..."
        />
      </div>

      <div>
        <label htmlFor="priority" className="block text-xs font-bold text-[#444444] uppercase mb-1 tracking-wide">Priority</label>
        <select 
          name="priority" 
          id="priority"
          className="w-full border border-[#CCCCCC] p-2.5 text-sm rounded bg-gray-50 focus:bg-white focus:outline-none focus:border-[#0079B8] focus:ring-1 focus:ring-[#0079B8] transition-colors"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <button 
        type="submit"
        className="w-full bg-[#0079B8] hover:bg-[#003853] text-white py-2.5 px-4 rounded text-xs font-bold uppercase tracking-widest mt-2 transition-colors"
      >
        Add Task
      </button>
    </form>
  );
}
