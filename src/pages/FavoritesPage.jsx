import { Link } from "react-router-dom";
import MovieGrid from "../components/MovieGrid";

function FavoritesPage({ favorites, isFavorite, onToggleFavorite }) {
  return (
    <main>
      <h1>Your Favorites</h1>

      {favorites.length === 0 ? (
        <div className="empty-state">
          <p>Your watchlist is waiting for its first star. 🌟</p>
          <p>Search for a movie you love and tap the heart to save it here.</p>
          <Link to="/">Start exploring</Link>
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