import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, CheckSquare, FolderGit2, LogOut } from 'lucide-react';
import LogoutButton from './logout-button';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }

  const { user } = session;

  return (
    <div className="h-screen w-full flex flex-col bg-[#F2F2F2] font-sans overflow-hidden text-[#313131]">
      {/* Top Navigation (Clarity Style) */}
      <header className="h-16 bg-[#002538] flex items-center justify-between px-6 shrink-0 border-b border-[#001724]">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#0079B8] rounded flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <span className="text-white font-bold tracking-tight text-xl">vControl <span className="font-light opacity-60">| Infrastructure</span></span>
          </div>
          <nav className="flex gap-6">
            <Link href="/dashboard" className="text-gray-400 hover:text-white text-sm font-medium flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            <Link href="/dashboard/projects" className="text-gray-400 hover:text-white text-sm font-medium flex items-center gap-2">
              <FolderGit2 className="w-4 h-4" />
              <span>Projects</span>
            </Link>
            <Link href="/dashboard/tasks" className="text-gray-400 hover:text-white text-sm font-medium flex items-center gap-2">
              <CheckSquare className="w-4 h-4" />
              <span>Tasks</span>
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-[#003853] px-3 py-1.5 rounded flex items-center gap-2 hidden md:flex">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <span className="text-xs text-white opacity-80 uppercase tracking-widest">{user.name}</span>
          </div>
          <LogoutButton />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Optional Sidebar could go here, but keeping it simple based on existing structure */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto h-full">
            {children}
          </div>
        </main>
      </div>

      {/* Bottom Status Bar */}
      <footer className="h-8 bg-[#E6E6E6] border-t border-[#CCCCCC] flex items-center px-4 gap-6 shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="text-[10px] text-gray-600 font-medium uppercase">System: Nominal</span>
        </div>
        <div className="flex items-center gap-1.5 border-l border-[#CCCCCC] pl-6">
          <span className="text-[10px] text-gray-500">Environment: </span>
          <span className="text-[10px] text-[#0079B8] font-bold">PRODUCTION</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <span className="text-[10px] text-gray-400">vControl Task Management</span>
        </div>
      </footer>
    </div>
  );
}
