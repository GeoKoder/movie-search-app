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
            <main>
              <h1>Page not found</h1>
              <Link to="/">Back to Search</Link>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
