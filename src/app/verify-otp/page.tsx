'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function VerifyOtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ⚡ OPTIMIZATION: Extract parameter directly into initial state setup
  // This completely eliminates cascading renders!
  const [email, setEmail] = useState(() => searchParams.get('email') || '');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: data.message });
        // Wait 1.5 seconds so they can celebrate, then send them to login!
        setTimeout(() => {
          router.push('/login');
        }, 1500);
      } else {
        setMessage({ type: 'error', text: data.message || 'Verification failed.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Could not connect to the server.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-opacity-95 px-4">
      <div className="w-full max-w-md p-8 bg-[#181818] rounded-md shadow-2xl border border-zinc-800">
        <h2 className="text-3xl font-bold text-white mb-2">Verify Email</h2>
        <p className="text-zinc-400 text-sm mb-6">Enter the 6-digit activation code sent to your inbox.</p>
        
        {message.text && (
          <div className={`p-3 rounded mb-4 text-sm font-medium ${
            message.type === 'success' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-4">
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
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">6-Digit OTP</label>
            <input
              type="text"
              required
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="123456"
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded text-white font-mono text-center text-xl tracking-[10px] focus:outline-none focus:border-[#e50914] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-4 bg-[#e50914] hover:bg-[#b80710] text-white font-bold rounded transition-colors disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Activate Account'}
          </button>
        </form>
      </div>
    </div>
  );
}

// Next.js App Router requires useSearchParams to be wrapped in a Suspense boundary
export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-zinc-400">Loading layout...</div>}>
      <VerifyOtpForm />
    </Suspense>
  );
}
