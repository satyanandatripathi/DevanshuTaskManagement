import { getSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { projects, tasks } from '@/lib/db/schema';
import { eq, count } from 'drizzle-orm';
import Link from 'next/link';

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) return null;

  const totalProjects = await db.select({ count: count() }).from(projects);
  const totalTasks = await db.select({ count: count() }).from(tasks);
  
  const tasksToDo = await db.select({ count: count() }).from(tasks).where(eq(tasks.status, 'to_do'));
  const tasksInProgress = await db.select({ count: count() }).from(tasks).where(eq(tasks.status, 'in_progress'));
  const tasksCompleted = await db.select({ count: count() }).from(tasks).where(eq(tasks.status, 'completed'));

  const recentProjects = await db.select().from(projects).orderBy(projects.createdAt).limit(5);

  return (
    <div className="grid grid-cols-12 gap-6 h-full auto-rows-min">
      {/* Card 1: Overview stats */}
      <div className="col-span-12 md:col-span-8 bg-white border border-[#CCCCCC] rounded-lg p-5 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-lg font-bold text-[#222222]">Project & Task Overview</h2>
          <span className="px-2 py-0.5 bg-green-100 text-green-800 text-[10px] font-bold rounded uppercase">All Systems Nominal</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
          <div className="bg-gray-50 border border-gray-100 rounded p-4 text-center">
            <div className="text-2xl font-bold text-[#0079B8]">{totalProjects[0].count}</div>
            <div className="text-[11px] text-gray-500 uppercase tracking-tighter mt-1">Total Projects</div>
          </div>
          <div className="bg-gray-50 border border-gray-100 rounded p-4 text-center">
            <div className="text-2xl font-bold text-[#0079B8]">{tasksToDo[0].count}</div>
            <div className="text-[11px] text-gray-500 uppercase tracking-tighter mt-1">Tasks To Do</div>
          </div>
          <div className="bg-gray-50 border border-gray-100 rounded p-4 text-center">
            <div className="text-2xl font-bold text-[#0079B8]">{tasksInProgress[0].count}</div>
            <div className="text-[11px] text-gray-500 uppercase tracking-tighter mt-1">In Progress</div>
          </div>
          <div className="bg-gray-50 border border-gray-100 rounded p-4 text-center">
            <div className="text-2xl font-bold text-[#0079B8]">{tasksCompleted[0].count}</div>
            <div className="text-[11px] text-gray-500 uppercase tracking-tighter mt-1">Completed</div>
          </div>
        </div>
      </div>

      {/* Card 2: Quick actions / User */}
      <div className="col-span-12 md:col-span-4 bg-[#F9F9F9] border border-[#CCCCCC] rounded-lg p-5 flex flex-col">
        <h2 className="text-sm font-bold text-[#555555] mb-4 uppercase tracking-wider">Quick Actions</h2>
        <div className="flex-1 flex flex-col justify-between space-y-3">
          <Link href="/dashboard/projects/new" className="block w-full py-2 bg-[#0079B8] text-white text-center text-xs font-bold rounded uppercase tracking-wide">
            New Project
          </Link>
          <div className="pt-2 border-t border-gray-200 mt-auto">
            <div className="flex items-center justify-between text-xs py-1">
               <span className="text-gray-500">Database Engine</span>
               <span className="text-green-600 font-bold">CONNECTED</span>
            </div>
            <div className="flex items-center justify-between text-xs py-1">
               <span className="text-gray-500">Worker Status</span>
               <span className="text-green-600 font-bold">ACTIVE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card 3: Recent Projects */}
      <div className="col-span-12 bg-white border border-[#CCCCCC] rounded-lg overflow-hidden flex flex-col">
          <div className="px-5 py-3 border-b border-[#EEEEEE] bg-gray-50 flex justify-between items-center">
            <h2 className="text-sm font-bold text-[#444444]">Recent Projects</h2>
            <Link href="/dashboard/projects" className="text-xs text-[#0079B8] font-bold hover:underline">View All</Link>
          </div>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white border-b border-[#DDDDDD] text-[11px] text-gray-500 uppercase">
                <tr>
                  <th className="px-5 py-3">Project Name</th>
                  <th className="px-5 py-3 hidden sm:table-cell">Description</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentProjects.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-5 py-4 text-center text-xs text-gray-500">No projects found.</td>
                  </tr>
                ) : (
                  recentProjects.map(project => (
                    <tr key={project.id} className="hover:bg-[#F2F8FA] transition-colors">
                      <td className="px-5 py-4 font-medium text-xs text-[#222222]">{project.name}</td>
                      <td className="px-5 py-4 text-gray-500 text-xs hidden sm:table-cell truncate max-w-md">{project.description || '-'}</td>
                      <td className="px-5 py-4">
                        <span className={`px-2 py-0.5 text-[10px] rounded ${project.status === 'active' ? 'bg-[#E1F1F6] text-[#0079B8]' : 'bg-gray-100 text-gray-700'}`}>
                          {project.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Link href={`/dashboard/projects/${project.id}`} className="text-[#0079B8] hover:underline text-xs font-bold">
                          Manage
                        </Link>
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
