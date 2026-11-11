'use client';

import React, { useEffect, useState } from 'react';
import { apiGet } from '@/lib/api';
import type { Movie } from '@/lib/types';
import MovieRow from '@/components/MovieRow';

interface GenreRow {
  genre: string;
  movies: Movie[];
}

export default function GenreRows() {
  const [rows, setRows] = useState<GenreRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    apiGet<{ rows: GenreRow[] }>('/api/movies/by-genre')
      .then((data) => {
        if (!cancelled) setRows(data.rows);
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
    return (
      <div className="space-y-6">
        {[0, 1].map((i) => (
          <div key={i} className="space-y-3">
            <div className="h-6 w-56 rounded bg-zinc-900 animate-pulse" />
            <div className="h-72 rounded-lg bg-zinc-900 animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div role="alert" className="rounded-xl border border-rose-900 bg-rose-950/40 p-6 text-sm text-rose-300">
        Could not load movies: {error}
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-sm text-zinc-400">
        No movies found. Run <code className="text-zinc-200">npm run seed:tmdb</code> in the backend folder.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {rows.map((row) => (
        <MovieRow key={row.genre} title={row.genre} movies={row.movies} />
      ))}

      {/* TMDB's terms of use ask apps to show this credit */}
      <p className="text-[11px] text-zinc-600 pt-4">
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </p>
    </div>
  );
}