import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";

function MovieCard({ movie, isFavorite, onToggleFavorite }) {
  const hasPoster = movie.Poster && movie.Poster !== "N/A";

  return (
    <article className="movie-card">
      <Link to={`/movie/${movie.imdbID}`} className="movie-card-link">
        {hasPoster ? (
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
        ) : (
          <div className="poster-placeholder">No poster available</div>
        )}
        <h3>{movie.Title}</h3>
        <p>
          {movie.Year} · {movie.Type}
        </p>
      </Link>
      <FavoriteButton
        movie={movie}
        active={isFavorite(movie.imdbID)}
        onToggle={() => onToggleFavorite(movie)}
      />
    </article>
  );
}

export default MovieCard;