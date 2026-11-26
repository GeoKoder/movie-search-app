import { useState } from "react"

function SearchBar({ onSearch }) {
    const [term, setTerm] = useState("")
    const [emptyMessage, setEmptyMessage] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        const trimmed = term.trim()
        if (!trimmed) {
            setEmptyMessage("Enter a movie title to start your search.")
            return
        }
        setEmptyMessage("")
        onSearch(trimmed)
    }
  return (
    <form onSubmit={handleSubmit}>
        <input 
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search for a movie..."
            aria-label="Search for a movie"
        />
        <button type="submit">Submit</button>
        {emptyMessage && <p role="alert">{emptyMessage}</p>}
    </form>
  )
}

export default SearchBar
