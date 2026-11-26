import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";

function MovieCard({ movie, isFavorite, onToggleFavorite }) {
  const hasPoster = movie.Poster && movie.Poster !== "N/A";

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#11141b] shadow-lg shadow-black/10 transition duration-200 hover:-translate-y-1 hover:border-[#73f0a8]/50 hover:shadow-xl hover:shadow-black/25">
      <Link to={`/movie/${movie.imdbID}`} className="block focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#73f0a8]">
        {hasPoster ? (
          <img className="aspect-[2/3] w-full bg-[#252a35] object-cover transition duration-300 group-hover:scale-[1.02]" src={movie.Poster} alt={`${movie.Title} poster`} />
        ) : (
          <div className="flex aspect-[2/3] w-full items-center justify-center bg-gradient-to-br from-[#252a35] to-[#171a22] px-5 text-center text-sm text-slate-400">No poster available</div>
        )}
        <div className="px-4 pb-4 pt-3 pr-14">
        <h3 className="line-clamp-2 min-h-12 font-semibold leading-6 text-white">{movie.Title}</h3>
        <p className="mt-1 text-sm capitalize text-slate-400">
          {movie.Year} · {movie.Type}
        </p>
        </div>
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
