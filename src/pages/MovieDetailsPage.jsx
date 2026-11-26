import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import FavoriteButton from "../components/FavoriteButton";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

// OMDb uses the string "N/A" for missing fields
const display = (value) => (value && value !== "N/A" ? value : "Not available");

function MovieDetailsPage({ isFavorite, onToggleFavorite }) {
  const { id: imdbID } = useParams();

  const { data, loading, error } = useFetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&i=${encodeURIComponent(imdbID)}&plot=full`
  )
  
  const movie = data?.Response === "True" ? data : null
  const message = 
    error || (data?.Response === "False" ? data.Error || "Movie not found" : null)

  const hasPoster = movie && movie.Poster && movie.Poster !== "N/A";

  return (
    <main className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <Link className="inline-flex rounded-full px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-[#73f0a8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#73f0a8]" to="/">← Back to Search</Link>

      {loading && <p className="mt-6 rounded-2xl border border-white/10 bg-[#11141b] p-5 text-slate-300" role="status">Loading movie details…</p>}
      {message && <p className="mt-6 rounded-2xl border border-[#ffb4ab]/20 bg-[#321f24] p-5 text-[#ffd8d2]" role="alert">{message}</p>}

      {movie && (
        <article className="mt-6 flex flex-col gap-7 rounded-3xl border border-white/10 bg-[#11141b] p-4 shadow-2xl shadow-black/20 sm:p-6 lg:flex-row lg:gap-10 lg:p-8">
          {hasPoster ? (
            <img className="mx-auto w-full max-w-sm rounded-2xl object-cover lg:mx-0 lg:w-[34%] lg:shrink-0" src={movie.Poster} alt={`${movie.Title} poster`} />
          ) : (
            <div className="flex aspect-[2/3] w-full max-w-sm items-center justify-center self-center rounded-2xl bg-gradient-to-br from-[#252a35] to-[#171a22] px-5 text-center text-slate-400 lg:self-start lg:w-[34%] lg:shrink-0">No poster available</div>
          )}

          <div className="min-w-0 flex-1">
            <div className="relative flex items-start justify-between gap-4 pr-12">
            <div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#73f0a8]">{display(movie.Year)} · {display(movie.Runtime)}</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">{movie.Title}</h1></div>
            <FavoriteButton
              movie={movie}
              active={isFavorite(movie.imdbID)}
              onToggle={() => onToggleFavorite(movie)}
            />
            </div>
            <p className="mt-3 text-slate-400">Rated {display(movie.Rated)}</p>

            <dl className="mt-7 grid gap-x-6 gap-y-4 border-y border-white/10 py-6 sm:grid-cols-2">
              <div><dt className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Genre</dt><dd className="mt-1 text-slate-200">{display(movie.Genre)}</dd></div>
              <div><dt className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Director</dt><dd className="mt-1 text-slate-200">{display(movie.Director)}</dd></div>
              <div className="sm:col-span-2"><dt className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Actors</dt><dd className="mt-1 text-slate-200">{display(movie.Actors)}</dd></div>
            </dl>

            <h2 className="mt-7 text-lg font-semibold text-white">Plot</h2>
            <p className="mt-2 leading-7 text-slate-300">{display(movie.Plot)}</p>

            <h2 className="mt-7 text-lg font-semibold text-white">Ratings</h2>
            {movie.Ratings && movie.Ratings.length > 0 ? (
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {movie.Ratings.map((r) => (
                  <li className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm text-slate-300" key={r.Source}>
                    {r.Source}: {r.Value}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-slate-400">No ratings available.</p>
            )}
          </div>
        </article>
      )}
    </main>
  );
}

export default MovieDetailsPage;
