'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      router.push('/dashboard');
    } else {
      const data = await res.json();
      setError(data.error || 'Failed to login');
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-[#F2F2F2] font-sans overflow-hidden text-[#313131]">
      {/* Top Header Placeholder */}
      <header className="h-16 bg-[#002538] flex items-center px-6 shrink-0 border-b border-[#001724]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#0079B8] rounded flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <span className="text-white font-bold tracking-tight text-xl">vControl <span className="font-light opacity-60">| Infrastructure</span></span>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white border border-[#CCCCCC] rounded-lg p-8">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-[#222222] mb-2">System Login</h1>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Authenticate to access</p>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#444444] uppercase mb-1 tracking-wide">Email Address</label>
              <input 
                type="email" 
                required
                className="w-full border border-[#CCCCCC] p-2.5 text-sm rounded bg-gray-50 focus:bg-white focus:outline-none focus:border-[#0079B8] focus:ring-1 focus:ring-[#0079B8] transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#444444] uppercase mb-1 tracking-wide">Password</label>
              <input 
                type="password" 
                required
                className="w-full border border-[#CCCCCC] p-2.5 text-sm rounded bg-gray-50 focus:bg-white focus:outline-none focus:border-[#0079B8] focus:ring-1 focus:ring-[#0079B8] transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-[#0079B8] hover:bg-[#003853] text-white py-2.5 px-4 rounded text-xs font-bold uppercase tracking-widest mt-4 transition-colors"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center text-xs font-bold text-gray-500">
            Don't have an account?{' '}
            <Link href="/register" className="text-[#0079B8] hover:underline uppercase tracking-wide">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
