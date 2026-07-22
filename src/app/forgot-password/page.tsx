'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1); // Step 1: Request code, Step 2: Input code & new password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const router = useRouter();

  // Step 1: Send Request to Backend
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'If an account exists, a recovery code has been sent!' });
        setStep(2); // Advance the UI card layout to password input!
      } else {
        setMessage({ type: 'error', text: data.message });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Could not connect to the server.' });
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Commit Password Reset to Backend
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: data.message });
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setMessage({ type: 'error', text: data.message });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Reset failed. Server connection down.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-opacity-95 px-4">
      <div className="w-full max-w-md p-8 bg-[#181818] rounded-md shadow-2xl border border-zinc-800">
        <h2 className="text-3xl font-bold text-white mb-2">Account Recovery</h2>
        <p className="text-zinc-400 text-sm mb-6">
          {step === 1 ? 'Recover your cinematic account pass key.' : 'Enter your recovery tokens below.'}
        </p>

        {message.text && (
          <div className={`p-3 rounded mb-4 text-sm font-medium ${
            message.type === 'success' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'
          }`}>
            {message.text}
          </div>
        )}

        {step === 1 ? (
          /* VIEW 1: Email Form */
          <form onSubmit={handleRequestOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Your Account Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded text-white focus:outline-none focus:border-[#e50914]"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-4 bg-[#e50914] hover:bg-[#b80710] text-white font-bold rounded transition-colors disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Send Recovery OTP'}
            </button>
          </form>
        ) : (
          /* VIEW 2: Reset Form */
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Verification Code</label>
              <input
                type="text"
                required
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="6-digit code"
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded text-white font-mono text-center tracking-wider focus:outline-none focus:border-[#e50914]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">New Secure Password</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded text-white focus:outline-none focus:border-[#e50914]"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-4 bg-[#e50914] hover:bg-[#b80710] text-white font-bold rounded transition-colors disabled:opacity-50"
            >
              {loading ? 'Updating Password...' : 'Save New Password'}
            </button>
          </form>
        )}

        <p className="mt-6 text-zinc-400 text-sm text-center">
          Remembered it?{' '}
          <Link href="/login" className="text-white hover:underline font-medium">
            Back to Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
