'use client';

import React, { useState } from 'react';
import { Check, CreditCard, ShieldCheck, Sparkles } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price: string;
  billing: string;
  icon: React.ComponentType<any>;
  color: string;
  features: string[];
}

const PLANS: Plan[] = [
  {
    id: 'basic',
    name: 'Basic Streamer',
    price: '₹199',
    billing: 'per month',
    icon: CreditCard,
    color: 'border-zinc-800 bg-zinc-900 text-zinc-400',
    features: ['720p Standard Definition', 'Watch on 1 Screen at a time', 'Unlimited Movies & Shows', 'Ad-Supported Streaming']
  },
  {
    id: 'pro',
    name: 'Cinematic Pro',
    price: '₹499',
    billing: 'per month',
    icon: ShieldCheck,
    color: 'border-zinc-700 bg-zinc-900 text-white shadow-lg shadow-red-950/20 relative',
    features: ['1080p Full HD Clarity', 'Watch on 2 Screens together', 'Completely Ad-Free Experience', 'Download to Watch Offline', '1 Free Midnight Movie Snack Combo Voucher / mo']
  },
  {
    id: 'max',
    name: 'Theater Max',
    price: '₹799',
    billing: 'per month',
    icon: Sparkles,
    color: 'border-amber-500/40 bg-gradient-to-b from-zinc-900 to-black text-amber-400 shadow-xl shadow-amber-950/10',
    features: ['4K Ultra HD + Dolby Atmos Sound', 'Watch on 4 Screens together', 'Completely Ad-Free Experience', 'Priority Food Delivery dispatch priority', 'Unlimited 10% Off on Food Ordering section']
  }
];

export default function SubscriptionHub() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate a secure Razorpay API order creation loop signature delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center animate-fade-in my-12 shadow-2xl">
        <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-scale-up">
          <Check size={32} strokeWidth={3} />
        </div>
        <h3 className="text-2xl font-black text-white mb-2">Subscription Active! 🎉</h3>
        <p className="text-zinc-400 text-sm mb-6">
          Welcome to the elite tier! Your account has been upgraded to <span className="text-white font-bold">{selectedPlan?.name}</span>. Secure checkout payload authorized via Razorpay.
        </p>
        <button 
          onClick={() => { setIsSuccess(false); setSelectedPlan(null); }}
          className="px-6 py-2.5 bg-zinc-800 text-white text-xs font-bold rounded-lg hover:bg-zinc-700 transition-all uppercase tracking-wider"
        >
          Return to Hub
        </button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-12 animate-fade-in pb-12">
      {/* 1. THREE COLUMN TIER PRICING GRID CARDS */}
      {!selectedPlan ? (
        <div>
          <div className="text-center max-w-lg mx-auto mb-10 space-y-2">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">Choose Your Stream Profile Tiers</h2>
            <p className="text-zinc-400 text-sm">Flexible premium setups crafted specifically for cinematic marathons paired with delicious side cravings.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
            {PLANS.map((plan) => {
              const Icon = plan.icon;
              const isPro = plan.id === 'pro';

              return (
                <div 
                  key={plan.id}
                  className={`border rounded-xl p-6 flex flex-col justify-between transform hover:scale-[1.02] transition-all duration-300 ${plan.color}`}
                >
                  {isPro && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#e50914] text-white px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                      Most Popular Choice
                    </span>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-black text-white">{plan.name}</h3>
                      <Icon size={20} className={plan.id === 'max' ? 'text-amber-400' : 'text-zinc-400'} />
                    </div>

                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-4xl font-black text-white">{plan.price}</span>
                      <span className="text-zinc-500 text-xs font-medium">{plan.billing}</span>
                    </div>

                    <ul className="space-y-3 border-t border-zinc-800/80 pt-4 text-left">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-xs text-zinc-300 leading-tight">
                          <Check size={14} className="text-[#e50914] flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => setSelectedPlan(plan)}
                    className={`w-full py-3 mt-8 font-black rounded-lg text-xs uppercase tracking-wider transition-all shadow-md ${
                      plan.id === 'max' 
                        ? 'bg-amber-500 hover:bg-amber-600 text-black' 
                        : 'bg-[#e50914] hover:bg-[#b80710] text-white'
                    }`}
                  >
                    Select {plan.name}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* 2. RECONCILED PAYMENT CHECKOUT SCREEN WINDOW */
        <div className="max-w-xl mx-auto bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl animate-scale-up">
          <div className="p-4 bg-zinc-950 border-b border-zinc-800 flex justify-between items-center">
            <div className="text-left">
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Review Order Gateway</span>
              <h3 className="text-sm font-bold text-white">Upgrading to {selectedPlan.name}</h3>
            </div>
            <button 
              onClick={() => setSelectedPlan(null)}
              className="text-xs text-zinc-400 hover:text-white underline cursor-pointer"
            >
              Change Plan
            </button>
          </div>

          <form onSubmit={handleCheckout} className="p-6 space-y-6 text-left">
            {/* Order Total Readout */}
            <div className="flex justify-between items-center bg-black/40 border border-zinc-800 p-4 rounded-lg">
              <span className="text-zinc-400 text-sm">Razorpay Order Total due now:</span>
              <span className="text-xl font-black text-white">{selectedPlan.price} <span className="text-xs text-zinc-500 font-normal">/mo</span></span>
            </div>

            {/* Payment Method Selector Tab bar */}
            <div className="flex bg-black p-1 rounded-lg border border-zinc-800/80">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`flex-1 py-2 text-center text-xs font-bold rounded transition-all ${paymentMethod === 'card' ? 'bg-zinc-800 text-white shadow' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                💳 Credit / Debit Cards
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`flex-1 py-2 text-center text-xs font-bold rounded transition-all ${paymentMethod === 'upi' ? 'bg-zinc-800 text-white shadow' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                📱 Secure UPI ID / App
              </button>
            </div>

            {/* Dynamic Inputs Render Panel */}
            {paymentMethod === 'card' ? (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wide mb-1.5">Card Number</label>
                  <input required type="text" placeholder="4321 •••• •••• 9876" maxLength={19} className="w-full bg-black border border-zinc-800 px-4 py-2.5 rounded text-sm text-white focus:outline-none focus:border-[#e50914]" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wide mb-1.5">Expiry Date</label>
                    <input required type="text" placeholder="MM / YY" maxLength={5} className="w-full bg-black border border-zinc-800 px-4 py-2.5 rounded text-sm text-white text-center focus:outline-none focus:border-[#e50914]" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wide mb-1.5">CVV Security Code</label>
                    <input required type="password" placeholder="•••" maxLength={3} className="w-full bg-black border border-zinc-800 px-4 py-2.5 rounded text-sm text-white text-center focus:outline-none focus:border-[#e50914]" />
                  </div>
                </div>
              </div>
              ) : (
                <div className="space-y-4 animate-fade-in">
                </div>
              )
            }
          </form>
        </div>
      )
    }
  </div>
  )
}