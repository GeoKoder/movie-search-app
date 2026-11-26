import { Link } from "react-router-dom";
import MovieGrid from "../components/MovieGrid";

function FavoritesPage({ favorites, isFavorite, onToggleFavorite }) {
  return (
    <main className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 sm:pt-14 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#73f0a8]">Your collection</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">Your Favorites</h1>

      {favorites.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-white/10 bg-[#11141b] px-6 py-12 text-center sm:px-10">
          <div aria-hidden="true" className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#73f0a8]/10 text-2xl text-[#73f0a8]">♡</div>
          <p className="mt-5 text-xl font-semibold text-white">Your watchlist is waiting for its first star.</p>
          <p className="mx-auto mt-2 max-w-md text-slate-400">Search for a movie you love and tap the heart to save it here.</p>
          <Link className="mt-6 inline-flex rounded-full bg-[#73f0a8] px-5 py-3 font-semibold text-[#102016] transition hover:bg-[#98ffc0] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#73f0a8]" to="/">Start exploring</Link>
        </div>
      ) : (
        <MovieGrid
          movies={favorites}
          isFavorite={isFavorite}
          onToggleFavorite={onToggleFavorite}
        />
      )}
    </main>
  );
}

export default FavoritesPage;
