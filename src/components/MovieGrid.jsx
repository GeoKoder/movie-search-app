import MovieCard from "./MovieCard";

function MovieGrid({ movies, isFavorite, onToggleFavorite }) {
  return (
    <section className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          isFavorite={isFavorite}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </section>
  );
}

export default MovieGrid;