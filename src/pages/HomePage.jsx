import { useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieGrid from "../components/MovieGrid";
import useFetch from "../hooks/useFetch";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

function HomePage({ isFavorite, onToggleFavorite }) {
  const [searchTerm, setSearchTerm] = useState("");

  const url = searchTerm
    ? `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}`
    : null;

  const { data, loading, error, refetch } = useFetch(url);

  const movies = data?.Response === "True" ? data.Search : [];
  const message = error || (data?.Response === "False" ? data.Error : null);

  const handleSearch = (term) => {
    if (term === searchTerm) {
      refetch();
    } else {
      setSearchTerm(term);
    }
  };

  return (
    <div>
      <h1>Movie Search</h1>
      <SearchBar onSearch={handleSearch} />

      {loading && <p>Loading ...</p>}
      {error && <p role="alert">{error}</p>}
      {!loading && !error && movies.length > 0 && (
        <MovieGrid
          movies={movies}
          isFavorite={isFavorite}
          onToggleFavorite={onToggleFavorite}
        />
      )}
    </div>
  );
}

export default HomePage;
