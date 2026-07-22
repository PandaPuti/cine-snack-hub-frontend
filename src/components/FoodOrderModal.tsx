'use client';

import React from 'react';
import { X, Utensils } from 'lucide-react';

interface FoodOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderClick: () => void;
}

export default function FoodOrderModal({ isOpen, onClose, onOrderClick }: FoodOrderModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-zinc-900 to-black border border-zinc-800 p-8 rounded-xl max-w-md w-full relative shadow-2xl text-center border-t-amber-500/30">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        {/* Dynamic Icon */}
        <div className="mx-auto w-16 h-16 bg-amber-500 text-black rounded-full flex items-center justify-center mb-4 animate-bounce shadow-lg shadow-amber-500/20">
          <Utensils size={32} />
        </div>

        {/* Content */}
        <h3 className="text-2xl font-black text-white mb-2">Movie Night Marathon? 🍿🍕</h3>
        <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
          You have been streaming for a while! Do not let your stomach interrupt the climax. Order fresh popcorn, hot burgers, or crispy nachos directly to your seat now.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={onOrderClick}
            className="w-full py-3 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-black font-black rounded-lg transition-colors tracking-wide uppercase text-sm shadow-md"
          >
            Browse Snack Menu 🍔
          </button>
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white font-medium rounded-lg text-xs transition-colors"
          >
            Maybe Later, Keep Watching
          </button>
        </div>
      </div>
    </div>
  );
}
