import { useState } from "react"

function SearchBar({ onSearch }) {
    const [term, setTerm] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        const trimmed = term.trim()
        if (!trimmed) return
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
    </form>
  )
}

export default SearchBar
