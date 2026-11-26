import { NavLink } from "react-router-dom";

function Header({ favoritesCount }) {
  return (
    <header className="border-b border-white/10 bg-[#171a22]/95">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
      <NavLink to="/" className="inline-flex items-center gap-2 text-lg font-bold tracking-tight text-white transition hover:text-[#73f0a8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#73f0a8] sm:text-xl"><span aria-hidden="true" className="text-[#73f0a8]">✦</span> Movie Search</NavLink>
      <nav aria-label="Main navigation" className="flex items-center gap-2 text-sm font-medium sm:text-base">
        <NavLink to="/" end className={({ isActive }) => `rounded-full px-4 py-2 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#73f0a8] ${isActive ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5 hover:text-white"}`}>Home</NavLink>
        <NavLink to="/favorites" className={({ isActive }) => `inline-flex items-center gap-2 rounded-full px-4 py-2 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#73f0a8] ${isActive ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5 hover:text-white"}`}>
          Favorites
          {favoritesCount > 0 && (
            <span className="rounded-full bg-[#73f0a8] px-2 py-0.5 text-xs font-bold text-[#102016]" aria-label={`${favoritesCount} favorites`}>
              {favoritesCount}
            </span>
          )}
        </NavLink>
      </nav>
      </div>
    </header>
  );
}

export default Header;
