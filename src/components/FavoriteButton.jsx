function FavoriteButton({ movie, active, onToggle }) {
  return (
    <button
        type="button"
        className={`absolute right-3 top-3 inline-flex size-10 items-center justify-center rounded-full border shadow-lg backdrop-blur transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#73f0a8] ${active ? "border-[#73f0a8] bg-[#73f0a8] text-[#102016]" : "border-white/15 bg-[#171a22]/90 text-white hover:border-[#73f0a8] hover:text-[#73f0a8]"}`}
        onClick={onToggle}
        aria-pressed={active}
        aria-label={
            active
                ? `Remove ${movie.Title} from favorites`   
                : `Add ${movie.Title} to favorites`
        }
    >
        {active ? "♥" : "♡"}
    </button>
  )
}

export default FavoriteButton
