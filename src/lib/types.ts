// The movie shape returned by the backend (see toDto in movieRoutes.ts).
export interface Movie {
  id: string;
  title: string;
  genre: string; // "Action / Thriller", ready to display
  genres: string[];
  posterUrl: string;
  backdropUrl: string;
  rating: number;
  plot: string;
  cast: string[];
  year: number | null;
}