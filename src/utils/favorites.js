const STORAGE_KEY = "movie-favorites";

export function getFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeFavorites(favorites) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error("Could not save favorites:", error);
  }
}

export function saveFavorite(movie) {
  const favorites = getFavorites();
  if (favorites.some((m) => m.imdbID === movie.imdbID)) return favorites;

  const { imdbID, Title, Year, Type, Poster } = movie;
  const updated = [...favorites, { imdbID, Title, Year, Type, Poster }];

  writeFavorites(updated)
  return updated
}

export function removeFavorites(imdbID) {
    return getFavorites().some((m) => m.imdbID === imdbID)
}