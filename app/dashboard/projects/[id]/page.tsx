import { db } from '@/lib/db';
import { projects, tasks } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import TaskList from './task-list';
import NewTaskForm from './new-task-form';

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Await the params object before using its properties
  const { id } = await params;

  const project = await db.select().from(projects).where(eq(projects.id, id)).get();
  
  if (!project) {
    notFound();
  }

  const projectTasks = await db.select().from(tasks).where(eq(tasks.projectId, id)).orderBy(tasks.createdAt);

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="bg-white border border-[#CCCCCC] rounded-lg p-6 shrink-0">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-[#222222]">{project.name}</h1>
            <p className="text-sm text-gray-600 mt-2">{project.description || 'No description provided.'}</p>
          </div>
          <span className={`px-2 py-0.5 inline-flex text-[10px] font-bold rounded uppercase ${project.status === 'active' ? 'bg-[#E1F1F6] text-[#0079B8]' : 'bg-gray-100 text-gray-700'}`}>
            {project.status}
          </span>
        </div>
        <div className="mt-6 text-xs text-gray-500 font-medium">
          Created on {format(new Date(project.createdAt), 'MMM d, yyyy')}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 flex-1 min-h-0">
        <div className="col-span-12 lg:col-span-8 flex flex-col h-full bg-white border border-[#CCCCCC] rounded-lg overflow-hidden">
          <div className="px-5 py-3 border-b border-[#EEEEEE] bg-gray-50 flex justify-between items-center shrink-0">
            <h2 className="text-sm font-bold text-[#444444]">Tasks</h2>
          </div>
          <div className="flex-1 overflow-auto p-5">
            <TaskList tasks={projectTasks} projectId={id} />
          </div>
        </div>
        
        <div className="col-span-12 lg:col-span-4 flex flex-col h-full bg-[#F9F9F9] border border-[#CCCCCC] rounded-lg overflow-hidden">
          <div className="px-5 py-3 border-b border-[#EEEEEE] bg-gray-50 flex justify-between items-center shrink-0">
            <h2 className="text-sm font-bold text-[#444444]">Add New Task</h2>
          </div>
          <div className="p-5 flex-1 overflow-auto">
            <NewTaskForm projectId={id} />
          </div>
        </div>
      </div>
    </div>
  );
}
