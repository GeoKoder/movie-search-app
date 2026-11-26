import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import FavoriteButton from "../components/FavoriteButton";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

// OMDb uses the string "N/A" for missing fields
const display = (value) => (value && value !== "N/A" ? value : "Not available");

function MovieDetailsPage({ isFavorite, onToggleFavorite }) {
  const { id: imdbID } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false; // set to true if this effect is cleaned up

    async function fetchMovie() {
      setLoading(true);
      setError(null);
      setMovie(null);

      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`,
        );

        if (!res.ok) {
          throw new Error(`Request failed (status ${res.status})`);
        }

        const data = await res.json();
        console.log(data);
        if (ignore) return;

        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError(data.Error || "Movie not found.");
        }
      } catch (err) {
        if (!ignore) {
          setError(
            "Something went wrong. Check your connection and try again.",
          );
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchMovie();

    return () => {
      ignore = true;
    };
  }, [imdbID]);

  const hasPoster = movie && movie.Poster && movie.Poster !== "N/A";

  return (
    <main>
      <Link to="/">← Back to Search</Link>

      {loading && <p>Loading movie details...</p>}
      {error && <p role="alert">{error}</p>}

      {movie && (
        <article className="movie-details">
          {hasPoster ? (
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
          ) : (
            <div className="poster-placeholder">No poster available</div>
          )}

          <div className="title-row">
            <h1>{movie.Title}</h1>
            <FavoriteButton
              movie={movie}
              active={isFavorite(movie.imdbID)}
              onToggle={() => onToggleFavorite(movie)}
            />
            <p>
              {display(movie.Year)} · {display(movie.Rated)} ·{" "}
              {display(movie.Runtime)}
            </p>

            <dl>
              <dt>Genre</dt>
              <dd>{display(movie.Genre)}</dd>
              <dt>Director</dt>
              <dd>{display(movie.Director)}</dd>
              <dt>Actors</dt>
              <dd>{display(movie.Actors)}</dd>
            </dl>

            <h2>Plot</h2>
            <p>{display(movie.Plot)}</p>

            <h2>Ratings</h2>
            {movie.Ratings && movie.Ratings.length > 0 ? (
              <ul>
                {movie.Ratings.map((r) => (
                  <li key={r.Source}>
                    {r.Source}: {r.Value}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No ratings available.</p>
            )}
          </div>
        </article>
      )}
    </main>
  );
}

export default MovieDetailsPage;
