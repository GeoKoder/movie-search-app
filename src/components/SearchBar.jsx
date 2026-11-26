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
    <form onSubmit={handleSubmit} className="mt-7 w-full">
        <div className="flex w-full flex-col gap-3 rounded-2xl border border-white/10 bg-[#11141b] p-2 shadow-lg shadow-black/10 sm:flex-row sm:items-center">
        <input 
            type="text"
            value={term}
            onChange={(e) => { setTerm(e.target.value); if (emptyMessage) setEmptyMessage(""); }}
            placeholder="Search for a movie..."
            aria-label="Search for a movie"
            className="min-w-0 flex-1 rounded-xl bg-transparent px-4 py-3 text-base text-white outline-none placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-[#73f0a8] sm:px-5"
        />
        <button type="submit" className="rounded-xl bg-[#73f0a8] px-6 py-3 font-semibold text-[#102016] transition hover:bg-[#98ffc0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#73f0a8]">Search</button>
        </div>
        {emptyMessage && <p className="mt-2 px-2 text-sm text-[#ffb4ab]" role="alert">{emptyMessage}</p>}
    </form>
  )
}

export default SearchBar
