import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'

export default function Navbar() {
  return (
    <header className="navbar">
      <img src={logo} alt="Grand Atlas" />
      <nav className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/units">Units</NavLink>
        <NavLink to="/zones">Zones</NavLink>
        <NavLink to="/developers">Developers</NavLink>
        <NavLink to="/contact">Contact Us</NavLink>
      </nav>
      <button className="register">Register</button>
    </header>
  )
}