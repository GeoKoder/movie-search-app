import SearchBar from "../components/SearchBar";
import MovieGrid from "../components/MovieGrid";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
import { useState } from "react";

function HomePage() {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleSearch = async (term) => {
        setLoading(true)
        setError(null)
        setMovies([])

        try {
            const res = await fetch (
                `https://www.omdbapi.com/?apikey=${API_KEY}&s=${term}`
            )

           
            if (!res.ok) {
                throw new Error(`Request failed (status ${res.status})`)
            }

            const data = await res.json()
            if (data.Response === "True") {
                setMovies(data.Search)
            } else {
                setError(data.Error || "No movies found.")
            }
        } catch (err) {
            setError("Something went wrong. Check your connection and try again.")
        } finally {
            setLoading(false)
        }
    }


    return (
        <div>
            <h1>Movie Search</h1>
            <SearchBar onSearch={handleSearch} />

            {loading && <p>Loading ...</p>}
            {error && <p role="alert">{error}</p>}
            {!loading && !error && movies.length > 0 && <MovieGrid movies={movies} />}
        </div>
    )
}

export default HomePage;