function MovieCard({ movie }) {
  const hasPoster = movie.Poster && movie.Poster !== "N/A";

  return (
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
  );
}

export default MovieCard;
