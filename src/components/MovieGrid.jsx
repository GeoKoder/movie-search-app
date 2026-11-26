import MovieCard from "./MovieCard";

function MovieGrid({ movies, isFavorite, onToggleFavorite }) {
  return (
    <section aria-label="Movies" className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
