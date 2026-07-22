'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: data.message });
        localStorage.setItem('token', data.token);
        
        // Wait 1.5 seconds so the user can read your welcome message, then forward them into the app!
        setTimeout(() => {
          router.push('/');
        }, 1500);
      } else {
        setMessage({ type: 'error', text: data.message || 'Login failed.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Could not connect to the backend server.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-opacity-95 px-4">
      <div className="w-full max-w-md p-8 bg-[#181818] rounded-md shadow-2xl border border-zinc-800">
        <h2 className="text-3xl font-bold text-white mb-6">Sign In</h2>
        
        {message.text && (
          <div className={`p-3 rounded mb-4 text-sm font-medium ${
            message.type === 'success' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded text-white focus:outline-none focus:border-[#e50914] transition-colors"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">Password</label>
              <Link href="/forgot-password" style={{ contentVisibility: 'auto' }} className="text-xs text-zinc-400 hover:text-white hover:underline">
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded text-white focus:outline-none focus:border-[#e50914] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-4 bg-[#e50914] hover:bg-[#b80710] active:bg-[#91050c] text-white font-bold rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Verifying...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-6 text-zinc-400 text-sm text-center">
          New to CineSnackHub?{' '}
          <Link href="/register" className="text-white hover:underline font-medium">
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
}
