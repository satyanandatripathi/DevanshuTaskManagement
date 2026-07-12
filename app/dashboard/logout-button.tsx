'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  return (
    <button 
      onClick={handleLogout}
      className="text-gray-300 hover:text-white flex items-center space-x-1 text-sm font-medium transition-colors"
      title="Logout"
    >
      <LogOut className="w-4 h-4" />
      <span className="hidden md:inline">Logout</span>
    </button>
  );
}
