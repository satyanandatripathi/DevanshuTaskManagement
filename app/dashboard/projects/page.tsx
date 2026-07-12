import { db } from '@/lib/db';
import { projects } from '@/lib/db/schema';
import Link from 'next/link';
import { format } from 'date-fns';
import { Plus } from 'lucide-react';

export default async function ProjectsPage() {
  const allProjects = await db.select().from(projects).orderBy(projects.createdAt);

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-[#222222]">Projects</h1>
          <p className="text-xs text-[#555555] mt-1 tracking-wide uppercase">Manage and monitor all your projects.</p>
        </div>
        <Link 
          href="/dashboard/projects/new" 
          className="bg-[#0079B8] hover:bg-[#003853] text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-wide flex items-center transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Link>
      </div>

      <div className="bg-white border border-[#CCCCCC] rounded-lg overflow-hidden flex flex-col flex-1">
        <div className="px-5 py-3 border-b border-[#EEEEEE] bg-gray-50 flex justify-between items-center shrink-0">
          <h2 className="text-sm font-bold text-[#444444]">All Projects</h2>
        </div>
        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white border-b border-[#DDDDDD] text-[11px] text-gray-500 uppercase">
              <tr>
                <th scope="col" className="px-5 py-3 font-medium tracking-wider">Project Name</th>
                <th scope="col" className="px-5 py-3 font-medium tracking-wider">Status</th>
                <th scope="col" className="px-5 py-3 font-medium tracking-wider">Created</th>
                <th scope="col" className="px-5 py-3 font-medium tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {allProjects.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-4 text-center text-xs text-gray-500">No projects found.</td>
                </tr>
              ) : (
                allProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-[#F2F8FA] transition-colors">
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="text-xs font-medium text-[#222222]">{project.name}</div>
                      <div className="text-xs text-gray-500 mt-1 truncate max-w-xs">{project.description}</div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className={`px-2 py-0.5 inline-flex text-[10px] font-bold rounded ${project.status === 'active' ? 'bg-[#E1F1F6] text-[#0079B8]' : project.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                        {project.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-xs text-gray-500">
                      {format(new Date(project.createdAt), 'MMM d, yyyy')}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-right font-medium">
                      <Link href={`/dashboard/projects/${project.id}`} className="text-xs text-[#0079B8] hover:underline font-bold">
                        View
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
