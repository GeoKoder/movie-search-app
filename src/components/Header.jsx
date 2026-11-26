import { NavLink } from "react-router-dom";

function Header({ favoritesCount }) {
  return (
    <header className="site-header">
      <NavLink to="/" className="logo">🎬 Movie Search</NavLink>
      <nav>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/favorites">
          Favorites
          {favoritesCount > 0 && (
            <span className="badge" aria-label={`${favoritesCount} favorites`}>
              {favoritesCount}
            </span>
          )}
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;