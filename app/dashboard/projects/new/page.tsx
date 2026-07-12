import { createProject } from '@/app/actions/projects';
import Link from 'next/link';

export default function NewProjectPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#222222]">New Project</h1>
        <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-bold">Create a new project to start tracking tasks.</p>
      </div>

      <div className="bg-white border border-[#CCCCCC] rounded-lg p-6">
        <form action={createProject} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-xs font-bold text-[#444444] uppercase mb-2 tracking-wide">Project Name</label>
            <input 
              type="text" 
              name="name" 
              id="name" 
              required
              className="w-full border border-[#CCCCCC] p-3 text-sm rounded bg-gray-50 focus:bg-white focus:outline-none focus:border-[#0079B8] focus:ring-1 focus:ring-[#0079B8] transition-colors"
              placeholder="e.g., Website Redesign"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-xs font-bold text-[#444444] uppercase mb-2 tracking-wide">Description (Optional)</label>
            <textarea 
              name="description" 
              id="description" 
              rows={4}
              className="w-full border border-[#CCCCCC] p-3 text-sm rounded bg-gray-50 focus:bg-white focus:outline-none focus:border-[#0079B8] focus:ring-1 focus:ring-[#0079B8] transition-colors"
              placeholder="Briefly describe the project goals..."
            />
          </div>

          <div className="flex items-center space-x-4 pt-4">
            <button 
              type="submit"
              className="bg-[#0079B8] hover:bg-[#003853] text-white px-6 py-2 rounded text-xs font-bold uppercase tracking-wide transition-colors"
            >
              Create Project
            </button>
            <Link 
              href="/dashboard/projects"
              className="text-[#555555] px-4 py-2 text-xs font-bold uppercase tracking-wide hover:underline"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
