import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import FavoritesPage from "./pages/FavoritesPage";
import Header from "./components/Header";
import { useState } from "react";
import { getFavorites, saveFavorite, removeFavorites } from "./utils/favorites";

function App() {
  const [favorites, setFavorites] = useState(getFavorites);

  const isFavorite = (imdbID) => favorites.some((m) => m.imdbID === imdbID);

  const toggleFavorite = (movie) => {
    if (isFavorite(movie.imdbID)) {
      setFavorites(removeFavorites(movie.imdbID));
    } else {
      setFavorites(saveFavorite(movie));
    }
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#20232d] text-[#f4f5f7]">
      <Header favoritesCount={favorites.length} />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
            />
          }
        />
        <Route
          path="/movie/:id"
          element={
            <MovieDetailsPage
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <FavoritesPage
              favorites={favorites}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
            />
          }
        />
        <Route
          path="*"
          element={
            <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
              <div className="rounded-3xl border border-white/10 bg-[#11141b] p-8 shadow-2xl shadow-black/20">
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#73f0a8]">404 · Not found</p>
                <h1 className="text-3xl font-bold tracking-tight">Page not found</h1>
                <Link className="mt-6 inline-flex rounded-full bg-[#73f0a8] px-5 py-3 font-semibold text-[#102016] transition hover:bg-[#98ffc0] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#73f0a8]" to="/">Back to Search</Link>
              </div>
            </main>
          }
        />
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
