'use client';

import React, { useState, useEffect } from 'react';
import { X, Pizza } from 'lucide-react';

export default function AdPopup() {
  const [isOpen, setIsOpen] = useState(true);
  const [timeLeft, setTimeLeft] = useState(5); // Countdown tracker

  useEffect(() => {
    if (!isOpen) return;

    // 1. Countdown interval to update the text seconds remaining
    const countdownInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // 2. Main timeout safety switch to auto-close the modal after exactly 5 seconds
    const autoCloseTimeout = setTimeout(() => {
      setIsOpen(false);
    }, 5000);

    // Clean up timers if the user closes the modal early manually
    return () => {
      clearInterval(countdownInterval);
      clearTimeout(autoCloseTimeout);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg max-w-sm w-full relative shadow-2xl text-center">
        
        {/* Manual Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-zinc-400 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>

        {/* Ad Branding Context */}
        <span className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded font-bold uppercase tracking-widest">
          Sponsored Announcement
        </span>

        {/* Ad Creative Payload Content */}
        <div className="my-5 flex flex-col items-center">
          <div className="w-12 h-12 bg-amber-500/20 text-amber-500 rounded-full flex items-center justify-center mb-3">
            <Pizza size={26} />
          </div>
          <h3 className="text-xl font-bold text-white mb-1">CineSnack VIP Combo! 🍿🍔</h3>
          <p className="text-zinc-400 text-sm">
            Unlock unlimited hot butter popcorn and large beverages for your streaming marathon tonight. 
          </p>
        </div>

        {/* Visual Countdown Badge Indicator */}
        <div className="text-xs text-zinc-500 border-t border-zinc-800 pt-3">
          Closing automatically in <span className="text-[#e50914] font-bold font-mono">{timeLeft}s</span>...
        </div>
      </div>
    </div>
  );
}
