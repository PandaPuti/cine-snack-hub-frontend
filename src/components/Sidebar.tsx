'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  Film, 
  Tv, 
  CreditCard, 
  Utensils, 
  LogOut, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

interface SidebarProps {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
}

export default function Sidebar({ activeMenu, setActiveMenu }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();

  const menuItems = [
    { id: 'search', label: 'Search', icon: Search },
    { id: 'movies', label: 'Movies', icon: Film },
    { id: 'shows', label: 'Shows', icon: Tv },
    { id: 'subscription', label: 'Subscription', icon: CreditCard },
    { id: 'order-online', label: 'Order Online', icon: Utensils },
  ];

  const handleLogout = () => {
    // 1. Wipe out the browser session wristband (JWT)
    localStorage.removeItem('token');
    
    // 2. Alert the user with your goodbye message and redirect
    alert('Good bye! Logging out securely... See you soon! 👋🍿');
    router.push('/login');
  };

  return (
    <aside 
      className={`h-screen bg-[#141414] border-r border-zinc-800 flex flex-col justify-between p-4 transition-all duration-300 ease-in-out sticky top-0 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Top Section: App Title & Toggle Button */}
      <div>
        <div className="flex items-center justify-between mb-8 px-2">
          {!isCollapsed && (
            <h1 className="text-xl font-black text-[#e50914] tracking-wider transition-opacity duration-200">
              CINE<span className="text-white font-medium">SNACKHUB</span>
            </h1>
          )}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors ml-auto"
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Navigation Menus */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeMenu === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`w-full flex items-center gap-4 px-3 py-3 rounded text-sm font-medium transition-all group ${
                  isActive 
                    ? 'bg-[#e50914] text-white' 
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                {/* Icon wrapper with hover color transformation rules */}
                <IconComponent 
                  size={20} 
                  className={`transition-colors duration-200 ${
                    isActive ? 'text-white' : 'text-zinc-400 group-hover:text-[#e50914]'
                  }`}
                />
                {!isCollapsed && (
                  <span className="transition-opacity duration-200">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Logout Action */}
      <div className="pt-4 border-t border-zinc-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-3 py-3 rounded text-sm font-medium text-zinc-400 hover:text-red-500 hover:bg-zinc-900/50 transition-all group"
        >
          <LogOut 
            size={20} 
            className="text-zinc-400 group-hover:text-red-500 transition-colors duration-200" 
          />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
