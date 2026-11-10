'use client';

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Search, Star, Film } from 'lucide-react';

interface MovieResult {
  id: string;
  title: string;
  posterUrl: string;
  rating: number;
  genre: string;
  plot: string;
  reason: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';

const PRESET_TAGS = [
  'Lonely Space Adventure',
  'Hyped Action Fight',
  'Tired Chill Cooking',
  'Bored Epic Fantasy',
  'Scared Dark Ocean Thriller',
];

export default function SearchPortal() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<MovieResult[]>([]);
  const [aiReply, setAiReply] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Ignore slow responses from older searches when a newer one was started.
  const latestRequest = useRef(0);

  const executeSearch = async (searchString: string) => {
    const text = searchString.trim();
    if (!text) return;

    const requestId = ++latestRequest.current;
    setLoading(true);
    setHasSearched(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/search/ai-query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token ?? ''}`,
        },
        body: JSON.stringify({ query: text }),
      });

      if (response.status === 401) {
        localStorage.removeItem('token');
        router.push('/login');
        return;
      }

      const data = await response.json();
      if (requestId !== latestRequest.current) return;

      if (!response.ok || !data.success) {
        setResults([]);
        setAiReply('');
        setError(data.message || 'Search failed. Please try again.');
        return;
      }

      setResults(data.results ?? []);
      setAiReply(data.reply ?? '');
    } catch (err) {
      if (requestId !== latestRequest.current) return;
      console.error('Could not run search:', err);
      setResults([]);
      setAiReply('');
      setError('Could not reach the server. Check that the backend is running.');
    } finally {
      if (requestId === latestRequest.current) setLoading(false);
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
          <p className="text-zinc-400 text-xs mt-1">
            Describe your mood or the kind of story you want. The AI picks movies from our catalog that fit.
          </p>
        </div>

        <form onSubmit={handleFormSubmit} className="relative flex items-center">
          <input
            type="text"
            value={query}
            maxLength={300}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="How are you feeling tonight? (e.g., I feel lonely and want a space adventure)"
            className="w-full bg-zinc-900 border border-zinc-800 text-sm text-white pl-12 pr-28 py-3.5 rounded-xl focus:outline-none focus:border-purple-500 shadow-xl transition-all"
          />
          <Search className="absolute left-4 text-zinc-500" size={18} />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-lg text-xs tracking-wide uppercase transition-all shadow disabled:opacity-50"
          >
            {loading ? 'Thinking...' : 'Ask AI'}
          </button>
        </form>

        {/* Quick mood prompts */}
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

      {/* Results */}
      <div className="border-t border-zinc-900 pt-6">
        {loading ? (
          <div className="text-center py-12 text-zinc-400 font-medium animate-pulse">
            🔮 Finding movies that match your mood...
          </div>
        ) : error ? (
          <div role="alert" className="text-center py-10 bg-rose-950/40 border border-rose-900 rounded-xl text-rose-300 text-sm px-6">
            {error}
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-5">
            {aiReply && <p className="text-sm text-purple-300">{aiReply}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-scale-up">
              {results.map((movie) => (
                <div key={movie.id} className="bg-zinc-900 border border-zinc-800/60 rounded-xl overflow-hidden shadow-lg group">
                  <div className="aspect-[16/10] w-full relative overflow-hidden bg-black">
                    <img
                      src={movie.posterUrl}
                      alt={movie.title}
                      loading="lazy"
                      onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-bold text-white text-base truncate">{movie.title}</h3>
                      <span className="text-xs text-amber-500 font-black flex items-center gap-0.5 mt-0.5">
                        <Star size={12} fill="currentColor" /> {movie.rating}
                      </span>
                    </div>
                    <span className="inline-block bg-zinc-800 text-zinc-400 text-[10px] font-bold px-2 py-0.5 rounded tracking-wide">
                      {movie.genre}
                    </span>
                    {movie.reason && <p className="text-purple-300 text-xs leading-relaxed pt-1">{movie.reason}</p>}
                    <p className="text-zinc-400 text-xs line-clamp-2 leading-relaxed">{movie.plot}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : hasSearched ? (
          <div className="text-center py-16 bg-zinc-950/40 border border-dashed border-zinc-800 rounded-2xl max-w-md mx-auto space-y-4 animate-scale-up">
            <div className="text-4xl">🛸</div>
            <h3 className="text-lg font-black text-white">No matches yet</h3>
            <p className="text-zinc-500 text-xs px-6 leading-relaxed">
              {aiReply || 'Try describing a mood or a genre, like "cozy and relaxed" or "something tense", or pick a quick prompt above.'}
            </p>
          </div>
        ) : (
          <div className="text-center py-16 text-zinc-600 space-y-2">
            <Film size={36} className="mx-auto text-zinc-800 stroke-[1.5]" />
            <p className="text-xs font-medium">Your movie matches will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
