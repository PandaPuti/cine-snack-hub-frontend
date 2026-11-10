'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import AdPopup from '@/components/AdPopup';
import FoodOrderModal from '@/components/FoodOrderModal'; // 1. Import our food prompt modal!
import TrendingCarousel from '@/components/TrendingCarousel';
import MovieRow from '@/components/MovieRow';
import SubscriptionHub from '@/components/SubscriptionHub';
import OrderOnline from '@/components/OrderOnline';
import SearchPortal from '@/components/SearchPortal';


// Mock Datasets mapped for MovieRow items
const ACTION_MOVIES = [
  { id: 101, title: "Velocity Zero", posterUrl: "https://unsplash.com", rating: 8.2, genre: "Action / Thriller", plot: "A runaway high-tech bullet train carrying weaponized core elements gets hijacked by rogue special ops.", cast: ["Liam N.", "Michelle R."] },
  { id: 102, title: "Apex Hunter", posterUrl: "https://unsplash.com", rating: 7.9, genre: "Action / Sci-Fi", plot: "An elite mercenary tracker becomes the ultimate prey while exploring classified radioactive jungle coordinates.", cast: ["Tom H.", "Charlize T."] },
  { id: 103, title: "Shadow Gambit", posterUrl: "https://unsplash.com", rating: 8.5, genre: "Action / Mystery", plot: "A master chess tactician turns international spy to infiltrate an underground black-market cipher node.", cast: ["Cillian M.", "Emily B."] }
];

const SCIFI_MOVIES = [
  { id: 201, title: "Quantum Horizon", posterUrl: "https://unsplash.com", rating: 8.7, genre: "Sci-Fi / Drama", plot: "A group of physicists unintentionally tear open a micro-portal, splitting a coastal town into dual time branches.", cast: ["Oscar I.", "Natalie P."] },
  { id: 202, title: "Bio-Grid 2099", posterUrl: "https://unsplash.com", rating: 7.6, genre: "Sci-Fi / Cyberpunk", plot: "An artificial genetic inspector starts developing memories that belong to the mega-corporation's CEO.", cast: ["Ryan G.", "Ana de A."] },
  { id: 203, title: "Nebula Protocol", posterUrl: "https://unsplash.com", rating: 8.0, genre: "Sci-Fi / Adventure", plot: "Humanity's first deep-range generation vessel approaches a star cluster only to find ancient monuments built by men.", cast: ["Pedro P.", "Zoe S."] }
];


export default function Dashboard() {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState('movies');
  const [isFoodModalOpen, setIsFoodModalOpen] = useState(false);
  
  // ⚡ CONFIGURATION: Set TEST_MODE to true for a 10-second trigger, false for real 45-minute production run
  const TEST_MODE = false;
  const TRIGGER_TIME = TEST_MODE ? 10 * 1000 : 45 * 60 * 1000;

  const [checkingAuth, setCheckingAuth] = useState(true);

  // Runs only in the browser, after the first render
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/login');
      return;
    }
    setCheckingAuth(false);
  }, [router]);

  // ⏱️ TRACKER EFFECT: Monitors total active session duration
  useEffect(() => {
    if (checkingAuth) return;

    const sessionTimer = setTimeout(() => {
      setIsFoodModalOpen(true);
    }, TRIGGER_TIME);

    return () => clearTimeout(sessionTimer); // Clean up container to prevent leaks
  }, [checkingAuth, TRIGGER_TIME]);

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-zinc-400 font-medium">
        ⏳ Securing cinematic tunnel...
      </div>
    );
  }

  // Handle CTA redirection trigger
  const handleRedirectToFood = () => {
    setIsFoodModalOpen(false);
    setActiveMenu('order-online'); // Automatically hops them directly to your food court page!
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'search': 
        // Mount your complete semantic matching console hub layout!
        return <SearchPortal />;
      case 'movies': 
        return (
          <div className="space-y-10 animate-fade-in pb-12">
            {/* Master Highlights Hero */}
            <TrendingCarousel />
            
            {/* 2. Mount your category channels here! */}
            <MovieRow title="Adrenaline Fueled Action Blockbusters" movies={ACTION_MOVIES} />
            <MovieRow title="Mind-Bending Science Fiction" movies={SCIFI_MOVIES} />
          </div>
        );
        
      case 'shows': return <div className="text-2xl font-bold">📺 Binge-Worthy TV Shows</div>;
      case 'subscription': 
        // Mount your multi-card billing center layout platform!
        return <SubscriptionHub />;
      case 'order-online': return <OrderOnline />;
      default: return <div className="text-2xl font-bold">🎬 Genre-Based Movie Library</div>;
    }
  };

  return (
    <div className="flex bg-black min-h-screen text-white relative">
      <AdPopup />
      
      {/* 2. Place the Food Order popup layer inside the layout grid */}
      <FoodOrderModal 
        isOpen={isFoodModalOpen} 
        onClose={() => setIsFoodModalOpen(false)} 
        onOrderClick={handleRedirectToFood} 
      />

      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      
      <main className="flex-1 p-8 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
}
