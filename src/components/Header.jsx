import { NavLink } from "react-router-dom"

function Header() {
  return (
    <nav>
        <NavLink to="/">Home</NavLink>  |  <NavLink to="/favorites">Favorites</NavLink>
    </nav>
  )
}

export default Header