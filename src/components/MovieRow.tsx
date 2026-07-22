'use client';

import React from 'react';
import { Star, Play, Plus } from 'lucide-react';

interface MovieCard {
  id: number;
  title: string;
  posterUrl: string;
  rating: number;
  genre: string;
  plot: string;
  cast: string[];
}

interface MovieRowProps {
  title: string;
  movies: MovieCard[];
}

export default function MovieRow({ title, movies }: MovieRowProps) {
  return (
    <div className="space-y-3 select-none px-1">
      {/* Genre Heading Row */}
      <h3 className="text-xl font-bold text-zinc-200 tracking-wide hover:text-white transition-colors cursor-pointer inline-flex items-center gap-2 group">
        {title}
        <span className="text-xs text-zinc-500 font-normal opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          See All →
        </span>
      </h3>

      {/* Horizontal Scroll Deck */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="flex-none w-48 bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden group relative transform hover:scale-105 hover:z-20 transition-all duration-300 shadow-md hover:shadow-black/80"
          >
            {/* Poster Aspect Container */}
            <div className="aspect-[2/3] w-full relative overflow-hidden bg-zinc-950">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              {/* Dark Hover Shade Mask */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 space-y-2" >
                {/* Micro Interactivity Utilities */}
                <div className="flex items-center gap-2">
                  <button className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center hover:bg-zinc-200 transition-colors shadow">
                    <Play size={14} fill="currentColor" className="ml-0.5" />
                  </button>
                  <button className="w-8 h-8 bg-zinc-800/80 text-white rounded-full flex items-center justify-center hover:bg-zinc-700 border border-zinc-700 transition-colors shadow">
                    <Plus size={14} />
                  </button>
                </div>
                
                {/* Meta Micro Fields */}
                <div className="text-[10px] text-amber-500 font-black flex items-center gap-0.5">
                  <Star size={10} fill="currentColor" /> {movie.rating}
                </div>
                <p className="text-[10px] text-zinc-300 line-clamp-2 leading-tight">
                  {movie.plot}
                </p>
              </div>
            </div>

            {/* Base Static Footer Card Layout */}
            <div className="p-2 bg-zinc-900 border-t border-zinc-800/50">
              <h4 className="text-xs font-bold text-zinc-100 truncate group-hover:text-white">
                {movie.title}
              </h4>
              <p className="text-[10px] text-zinc-500 mt-0.5 truncate">
                {movie.genre}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
