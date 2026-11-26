import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const hasPoster = movie.Poster && movie.Poster !== "N/A";

  return (
    <Link to={`/movie/${movie.imdbID}`} className="movie-card-link">
      <article>
        {hasPoster ? (
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
        ) : (
          <div className="poster-placeholder">No poster available</div>
        )}
        <h3>{movie.Title}</h3>
        <p>
          {movie.Year} · {movie.Type}
        </p>
      </article>
    </Link>
  );
}

export default MovieCard;