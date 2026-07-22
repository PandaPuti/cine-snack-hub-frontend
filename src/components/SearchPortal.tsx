'use client';

import React, { useState } from 'react';
import { Sparkles, Search, Star, Film } from 'lucide-react';

interface MovieCard {
  id: number;
  title: string;
  posterUrl: string;
  rating: number;
  genre: string;
  plot: string;
}

// Full application index library mapping array targets
const DISPATCH_CATALOG: MovieCard[] = [
  { id: 1, title: "Interstellar Odyssey", posterUrl: "https://unsplash.com", rating: 8.9, genre: "Sci-Fi / Adventure", plot: "A team of celestial explorers travel through a newly discovered wormhole." },
  { id: 2, title: "The Neon Samurai", posterUrl: "https://unsplash.com", rating: 8.4, genre: "Action / Cyberpunk", plot: "In a dystopian cyberpunk Tokyo, a disgraced swordsman fights corporate lords." },
  { id: 3, title: "Midnight Gourmet", posterUrl: "https://unsplash.com", rating: 7.8, genre: "Drama / Comedy", plot: "A world-renowned chef abruptly leaves his restaurant to start a food truck." },
  { id: 4, title: "Chronicles of Eloria", posterUrl: "https://unsplash.com", rating: 8.1, genre: "Fantasy / Epic", plot: "An ancient prophecy awakens when a young cartographer finds a hidden realm." },
  { id: 5, title: "Deep Sea Protocol", posterUrl: "https://unsplash.com", rating: 7.5, genre: "Thriller / Suspense", plot: "When a deep submarine station loses communications, terrors awaken." }
];

const PRESET_TAGS = ["Lonely Space Adventure", "Hyped Action Fight", "Tired Chill Cooking", "Bored Epic Fantasy", "Scared Dark Ocean Thriller"];

export default function SearchPortal() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<MovieCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const executeSearch = async (searchString: string) => {
    if (!searchString.trim()) return;
    setLoading(true);
    setHasSearched(true);

    try {
      const response = await fetch('http://localhost:5000/api/search/ai-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchString }),
      });
      const data = await response.json();

      if (data.success && data.matchedMovieIds) {
        // Filter out full content items from the catalog mapping index sequence
        const matchingMovies = DISPATCH_CATALOG.filter(movie => 
          data.matchedMovieIds.includes(movie.id)
        );
        setResults(matchingMovies);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error('Could not run query match:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(query);
  };

  const handleTagClick = (tag: string) => {
    setQuery(tag);
    executeSearch(tag);
  };

  return (
    <div className="w-full space-y-8 animate-fade-in text-left max-w-4xl mx-auto">
      {/* Search Bar Block Header */}
      <div className="space-y-4">
        <div>
          <h2 className="text-3xl font-black text-white flex items-center gap-2">
            AI Cinematic Concierge <Sparkles className="text-purple-400 animate-pulse" size={24} />
          </h2>
          <p className="text-zinc-400 text-xs mt-1">Type out your mood, feelings, or plot elements. Our semantic layer will decode the perfect movie pairings.</p>
        </div>

        <form onSubmit={handleFormSubmit} className="relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tell us, how are you feeling tonight? (e.g., I am feeling lonely and want a space adventure...)"
            className="w-full bg-zinc-900 border border-zinc-800 text-sm text-white pl-12 pr-28 py-3.5 rounded-xl focus:outline-none focus:border-purple-500 shadow-xl transition-all"
          />
          <Search className="absolute left-4 text-zinc-500" size={18} />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-lg text-xs tracking-wide uppercase transition-all shadow disabled:opacity-50"
          >
            {loading ? 'Analyzing...' : 'Ask AI'}
          </button>
        </form>

        {/* 1. HORIZONTAL TAG CHIPS LIST */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider mr-1">Quick Prompts:</span>
          {PRESET_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleTagClick(tag)}
              className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 hover:border-purple-500 text-zinc-400 hover:text-white rounded-md text-xs font-medium transition-all"
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Results Deck Grid Viewport */}
      <div className="border-t border-zinc-900 pt-6">
        {loading ? (
          <div className="text-center py-12 text-zinc-400 font-medium animate-pulse">
            🔮 Scanning matching dimensions for mood patterns...
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-scale-up">
            {results.map((movie) => (
              <div key={movie.id} className="bg-zinc-900 border border-zinc-800/60 rounded-xl overflow-hidden shadow-lg group">
                <div className="aspect-[16/10] w-full relative overflow-hidden bg-black">
                  <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-bold text-white text-base truncate">{movie.title}</h3>
                    <span className="text-xs text-amber-500 font-black flex items-center gap-0.5 mt-0.5"><Star size={12} fill="currentColor"/> {movie.rating}</span>
                  </div>
                  <span className="inline-block bg-zinc-800 text-zinc-400 text-[10px] font-bold px-2 py-0.5 rounded tracking-wide">{movie.genre}</span>
                  <p className="text-zinc-400 text-xs line-clamp-2 leading-relaxed pt-1">{movie.plot}</p>
                </div>
              </div>
            ))}
          </div>
        ) : hasSearched ? (
          /* 2. CUTE FUN EMPTY SEARCH SCREEN FALLBACK */
          <div className="text-center py-16 bg-zinc-950/40 border border-dashed border-zinc-800 rounded-2xl max-w-md mx-auto space-y-4 animate-scale-up">
            <div className="text-4xl">🛸</div>
            <h3 className="text-lg font-black text-white">Universal Void Encountered!</h3>
            <p className="text-zinc-500 text-xs px-6 leading-relaxed">
              Our deep-space AI radars scanned every cluster but couldn't find matches for that custom feeling. Try searching for <span className="text-purple-400 font-bold">"space"</span> or click a quick prompt pill above!
            </p>
          </div>
        ) : (
          <div className="text-center py-16 text-zinc-600 space-y-2">
            <Film size={36} className="mx-auto text-zinc-800 stroke-[1.5]" />
            <p className="text-xs font-medium">Your custom cinematic matches will populate here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
