import { useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieGrid from "../components/MovieGrid";
import useFetch from "../hooks/useFetch";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

function HomePage({ isFavorite, onToggleFavorite }) {
  const [searchTerm, setSearchTerm] = useState("");

  const url = searchTerm
    ? `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}`
    : null;

  const { data, loading, error, refetch } = useFetch(url);

  const movies = data?.Response === "True" ? data.Search : [];
  const handleSearch = (term) => {
    if (term === searchTerm) {
      refetch();
    } else {
      setSearchTerm(term);
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 sm:pt-14 lg:px-8">
      <section className="mx-auto max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#73f0a8]">Find your next favorite</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">Movie Search</h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">Search films and keep the ones you love close.</p>
      <SearchBar onSearch={handleSearch} />
      </section>

      {loading && <p className="mx-auto mt-10 flex max-w-7xl items-center gap-3 rounded-2xl border border-white/10 bg-[#11141b] p-5 text-slate-300" role="status"><span aria-hidden="true" className="size-5 animate-spin rounded-full border-2 border-white/20 border-t-[#73f0a8]" />Searching movies…</p>}
      {error && <p className="mx-auto mt-10 max-w-7xl rounded-2xl border border-[#ffb4ab]/20 bg-[#321f24] p-5 text-[#ffd8d2]" role="alert">{error}</p>}
      {!loading && !error && movies.length > 0 && (
        <MovieGrid
          movies={movies}
          isFavorite={isFavorite}
          onToggleFavorite={onToggleFavorite}
        />
      )}
      {!loading && !error && data?.Response === "False" && (
        <p className="mx-auto mt-10 max-w-7xl rounded-2xl border border-white/10 bg-[#11141b] p-5 text-slate-300" role="status">{data.Error === "Movie not found!" ? "No movies found. Check the title and try again." : data.Error}</p>
      )}
    </main>
  );
}

export default HomePage;
