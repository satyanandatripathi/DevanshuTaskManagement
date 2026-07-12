import { db } from '@/lib/db';
import { tasks, projects } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import { format } from 'date-fns';

export default async function TasksPage() {
  const allTasks = await db
    .select({
      task: tasks,
      project: projects
    })
    .from(tasks)
    .leftJoin(projects, eq(tasks.projectId, projects.id))
    .orderBy(tasks.createdAt);

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-[#222222]">All Tasks</h1>
          <p className="text-xs text-[#555555] mt-1 tracking-wide uppercase">Global view of all tasks across projects.</p>
        </div>
      </div>

      <div className="bg-white border border-[#CCCCCC] rounded-lg overflow-hidden flex flex-col flex-1">
        <div className="px-5 py-3 border-b border-[#EEEEEE] bg-gray-50 flex justify-between items-center shrink-0">
          <h2 className="text-sm font-bold text-[#444444]">Tasks List</h2>
        </div>
        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white border-b border-[#DDDDDD] text-[11px] text-gray-500 uppercase">
              <tr>
                <th scope="col" className="px-5 py-3 font-medium tracking-wider">Task</th>
                <th scope="col" className="px-5 py-3 font-medium tracking-wider">Project</th>
                <th scope="col" className="px-5 py-3 font-medium tracking-wider">Priority</th>
                <th scope="col" className="px-5 py-3 font-medium tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {allTasks.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-4 text-center text-xs text-gray-500">No tasks found.</td>
                </tr>
              ) : (
                allTasks.map(({ task, project }) => (
                  <tr key={task.id} className="hover:bg-[#F2F8FA] transition-colors">
                    <td className="px-5 py-4">
                      <div className="text-xs font-medium text-[#222222]">{task.title}</div>
                      <div className="text-xs text-gray-500 mt-1">Added {format(new Date(task.createdAt), 'MMM d, yyyy')}</div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      {project ? (
                        <Link href={`/dashboard/projects/${project.id}`} className="text-xs text-[#0079B8] font-bold hover:underline">
                          {project.name}
                        </Link>
                      ) : (
                        <span className="text-xs text-gray-500">Unknown</span>
                      )}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                        task.priority === 'high' ? 'bg-red-100 text-red-700' :
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {task.priority.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className={`px-2 py-0.5 inline-flex text-[10px] font-bold rounded ${
                        task.status === 'completed' ? 'bg-green-100 text-green-700' :
                        task.status === 'in_progress' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {task.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
