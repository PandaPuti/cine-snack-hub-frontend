'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play, Info, ChevronLeft, ChevronRight, Star } from 'lucide-react';

// Structured to match production TMDB payloads
interface Movie {
  id: number;
  title: string;
  backdropUrl: string;
  posterUrl: string;
  rating: number;
  plot: string;
  cast: string[];
  genre: string;
}

const TRENDING_MOVIES: Movie[] = [
  {
    id: 1,
    title: "Interstellar Odyssey",
    backdropUrl: "https://unsplash.com",
    posterUrl: "https://unsplash.com",
    rating: 8.9,
    plot: "A team of celestial explorers travel through a newly discovered wormhole in an effort to transcend human boundaries and secure humanity's survival among the stars.",
    cast: ["Matthew M.", "Anne H.", "Jessica C."],
    genre: "Sci-Fi / Adventure"
  },
  {
    id: 2,
    title: "The Neon Samurai",
    backdropUrl: "https://unsplash.com",
    posterUrl: "https://unsplash.com",
    rating: 8.4,
    plot: "In a dystopian cyberpunk Tokyo, a disgraced cyber-enhanced swordsman uncovers a corporate conspiracy that threatens to wipe clean the digital consciousness of the underground.",
    cast: ["Ken W.", "Hiroyuki S.", "Rinko K."],
    genre: "Action / Cyberpunk"
  },
  {
    id: 3,
    title: "Midnight Gourmet",
    backdropUrl: "https://unsplash.com",
    posterUrl: "https://unsplash.com",
    rating: 7.8,
    plot: "A world-renowned chef abruptly leaves his high-profile restaurant to start an underground food truck, rediscovering his passion for culinary arts and human connections.",
    cast: ["Jon F.", "Scarlett J.", "Robert D."],
    genre: "Drama / Comedy"
  },
  {
    id: 4,
    title: "Chronicles of Eloria",
    backdropUrl: "https://unsplash.com",
    posterUrl: "https://unsplash.com",
    rating: 8.1,
    plot: "An ancient prophecy awakens when a young cartographer discovers a hidden realm beneath the mountains, sparking an epic battle between magic guilds and technological empires.",
    cast: ["Timothée C.", "Zendaya M.", "Florence P."],
    genre: "Fantasy / Epic"
  },
  {
    id: 5,
    title: "Deep Sea Protocol",
    backdropUrl: "https://unsplash.com",
    posterUrl: "https://unsplash.com",
    rating: 7.5,
    plot: "When an underwater research station loses all communication at the deepest point of the Mariana Trench, an elite rescue team is deployed only to find something has followed them up.",
    cast: ["Jason S.", "Jessica B.", "Idris E."],
    genre: "Thriller / Suspense"
  }
];

export default function TrendingCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMovie = TRENDING_MOVIES[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TRENDING_MOVIES.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TRENDING_MOVIES.length) % TRENDING_MOVIES.length);
  };

  return (
    <div className="w-full space-y-6 select-none relative">
      
      {/* 1. MAIN LARGE BANNER DISPLAY SECTION */}
      <div className="w-full h-[480px] rounded-xl overflow-hidden relative border border-zinc-800 shadow-2xl transition-all duration-500">
        
        {/* Background Image with Dark Vignette Gradients */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out transform scale-105"
          style={{ backgroundImage: `url(${activeMovie.backdropUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent" />

        {/* Content Overlays */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 max-w-2xl space-y-4">
          <span className="text-xs bg-[#e50914] text-white px-2.5 py-1 rounded-md font-bold uppercase tracking-widest w-max animate-pulse">
            🔥 Trending #1
          </span>
          
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-md">
            {activeMovie.title}
          </h2>

          <div className="flex items-center gap-4 text-sm font-semibold text-zinc-300">
            <span className="flex items-center gap-1 text-amber-500">
              <Star size={16} fill="currentColor" /> {activeMovie.rating}
            </span>
            <span>•</span>
            <span className="bg-zinc-800/80 px-2 py-0.5 rounded text-xs tracking-wide">{activeMovie.genre}</span>
          </div>

          <p className="text-zinc-300 text-sm md:text-base leading-relaxed line-clamp-3 drop-shadow">
            {activeMovie.plot}
          </p>

          <p className="text-xs text-zinc-400 font-medium">
            <span className="text-zinc-500 font-bold uppercase tracking-wider mr-1">Cast:</span> {activeMovie.cast.join(', ')}
          </p>

          {/* Interactive Play/Info Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button className="flex items-center gap-2 px-6 py-3 bg-white text-black font-black text-sm rounded-lg hover:bg-zinc-200 transition-colors shadow-lg">
              <Play size={16} fill="currentColor" /> Play Now
            </button>
            <button className="flex items-center gap-2 px-5 py-3 bg-zinc-800/80 text-white font-bold text-sm rounded-lg hover:bg-zinc-700 transition-colors border border-zinc-700 backdrop-blur-sm">
              <Info size={16} /> More Info
            </button>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button 
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 border border-zinc-800 text-white flex items-center justify-center backdrop-blur-sm transition-all opacity-0 hover:opacity-100 group-hover:opacity-100 md:opacity-100"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 border border-zinc-800 text-white flex items-center justify-center backdrop-blur-sm transition-all opacity-0 hover:opacity-100 md:opacity-100"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* 2. LOWER HORIZONTAL TRENDING SLIDER CAROUSEL ROW */}
      <div>
        <h3 className="text-xl font-extrabold text-white mb-4 tracking-wide px-1 flex items-center gap-2">
          Top Trending Collections <span className="text-zinc-500 text-xs font-normal">({TRENDING_MOVIES.length} titles)</span>
        </h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {TRENDING_MOVIES.map((movie, index) => {
            const isSelected = index === activeIndex;

            return (
              <div
                key={movie.id}
                onClick={() => setActiveIndex(index)}
                className={`relative rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 border-2 ${
                  isSelected ? 'border-[#e50914] scale-102 shadow-lg shadow-[#e50914]/20' : 'border-zinc-800 hover:border-zinc-500'
                }`}
              >
                {/* Number Badge Overlay */}
                <div className="absolute top-2 left-2 w-7 h-7 bg-black/80 font-black font-mono text-sm text-white border border-zinc-700 flex items-center justify-center rounded-full z-10">
                  {index + 1}
                </div>

                {/* Poster Thumbnail */}
                <div className="aspect-[2/3] w-full relative">
                  <Image 
                    src={movie.posterUrl} 
                    alt={movie.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-80" />
                </div>

                {/* Mini Meta Text Footer Card */}
                <div className="p-2 bg-zinc-900 text-left">
                  <h4 className="text-xs font-bold text-white truncate">{movie.title}</h4>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] text-zinc-400 truncate max-w-[70%]">{movie.genre}</span>
                    <span className="text-[10px] text-amber-500 font-bold flex items-center gap-0.5">
                      ★{movie.rating}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
