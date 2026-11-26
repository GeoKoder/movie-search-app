function FavoriteButton({ movie, active, onToggle }) {
  return (
    <button
        type="button"
        className={`favorite-btn ${active ? "active" : ""}`}
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
