'use client';

import React, { useEffect, useState } from 'react';
import { Play, Info, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { apiGet } from '@/lib/api';
import type { Movie } from '@/lib/types';

export default function TrendingCarousel() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false; // stops state updates if the page unmounts mid-request

    apiGet<{ movies: Movie[] }>('/api/movies/trending')
      .then((data) => {
        if (!cancelled) setMovies(data.movies);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return <div className="w-full h-[480px] rounded-xl bg-zinc-900 animate-pulse" />;
  }

  if (error) {
    return (
      <div role="alert" className="w-full rounded-xl border border-rose-900 bg-rose-950/40 p-6 text-sm text-rose-300">
        Could not load trending movies: {error}
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-sm text-zinc-400">
        No trending movies yet. Run <code className="text-zinc-200">npm run seed:tmdb</code> in the backend folder.
      </div>
    );
  }

  const activeMovie = movies[activeIndex];
  const handleNext = () => setActiveIndex((prev) => (prev + 1) % movies.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + movies.length) % movies.length);

  return (
    <div className="w-full space-y-6 select-none relative">
      {/* Main banner */}
      <div className="w-full h-[480px] rounded-xl overflow-hidden relative border border-zinc-800 shadow-2xl">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out"
          style={{ backgroundImage: `url(${activeMovie.backdropUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 max-w-2xl space-y-4">
          <span className="text-xs bg-[#e50914] text-white px-2.5 py-1 rounded-md font-bold uppercase tracking-widest w-max">
            🔥 Trending #{activeIndex + 1}
          </span>

          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-md">
            {activeMovie.title}
          </h2>

          <div className="flex items-center gap-4 text-sm font-semibold text-zinc-300">
            <span className="flex items-center gap-1 text-amber-500">
              <Star size={16} fill="currentColor" /> {activeMovie.rating}
            </span>
            {activeMovie.year && (
              <>
                <span>•</span>
                <span>{activeMovie.year}</span>
              </>
            )}
            <span>•</span>
            <span className="bg-zinc-800/80 px-2 py-0.5 rounded text-xs tracking-wide">{activeMovie.genre}</span>
          </div>

          <p className="text-zinc-300 text-sm md:text-base leading-relaxed line-clamp-3 drop-shadow">
            {activeMovie.plot}
          </p>

          {activeMovie.cast.length > 0 && (
            <p className="text-xs text-zinc-400 font-medium">
              <span className="text-zinc-500 font-bold uppercase tracking-wider mr-1">Cast:</span>
              {activeMovie.cast.join(', ')}
            </p>
          )}

          <div className="flex items-center gap-3 pt-2">
            <button className="flex items-center gap-2 px-6 py-3 bg-white text-black font-black text-sm rounded-lg hover:bg-zinc-200 transition-colors shadow-lg">
              <Play size={16} fill="currentColor" /> Play Now
            </button>
            <button className="flex items-center gap-2 px-5 py-3 bg-zinc-800/80 text-white font-bold text-sm rounded-lg hover:bg-zinc-700 transition-colors border border-zinc-700 backdrop-blur-sm">
              <Info size={16} /> More Info
            </button>
          </div>
        </div>

        <button
          onClick={handlePrev}
          aria-label="Previous movie"
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 border border-zinc-800 text-white flex items-center justify-center backdrop-blur-sm transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={handleNext}
          aria-label="Next movie"
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 border border-zinc-800 text-white flex items-center justify-center backdrop-blur-sm transition-all"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Top 10 thumbnails */}
      <div>
        <h3 className="text-xl font-extrabold text-white mb-4 tracking-wide px-1 flex items-center gap-2">
          Top 10 Trending This Week
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {movies.map((movie, index) => {
            const isSelected = index === activeIndex;
            return (
              <div
                key={movie.id}
                onClick={() => setActiveIndex(index)}
                className={`relative rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 border-2 ${
                  isSelected
                    ? 'border-[#e50914] shadow-lg shadow-[#e50914]/20'
                    : 'border-zinc-800 hover:border-zinc-500'
                }`}
              >
                <div className="absolute top-2 left-2 w-7 h-7 bg-black/80 font-black font-mono text-sm text-white border border-zinc-700 flex items-center justify-center rounded-full z-10">
                  {index + 1}
                </div>

                <div className="aspect-[2/3] w-full relative bg-zinc-950">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.visibility = 'hidden';
                    }}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-80" />
                </div>

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